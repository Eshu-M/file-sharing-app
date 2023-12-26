import { Progress } from '@/components/ui/progress';
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { app } from '@/firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useToast } from '@/components/ui/use-toast';
import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '@/lib/GenerateRandomString';
import { useRouter } from 'next/navigation';

export default function MyModal({file,removeFile}) {
  const router=useRouter();
  const {user}=useUser();
  const storage=getStorage(app);
  const db = getFirestore(app);
  const { toast } = useToast();
  let [isOpen, setIsOpen] = useState(true)
  const [selectedImage, setSelectedImage] = useState();
  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);
  
  function closeModal() {
    setIsOpen(false);
    removeFile();
  }

  function openModal() {
    setIsOpen(true)
  }
  const [progress,setProgress]=useState(0);
  const metadata = {
    contentType: file.type
  };

  const uploadFileToDB=(file)=>{
    const storageRef = ref(storage, '/file-upload/'+file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        progress==100&&getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveToFireStore(file,downloadURL);
        });
      }, 
    )
  }
  const saveToFireStore=async(file,fileUrl)=>{
    const docPath = `files/users/${user?.fullName}`;
    const id=generateRandomString();
    try {
      await setDoc(doc(db, docPath, id), {
        fileName:file?.name,
        fileSize:file?.size,
        fileType:file?.type,
        fileUrl:fileUrl,
        userEmail:user?.primaryEmailAddress.emailAddress,
        userName:user?.fullName,
        password:'',
        id:id,
        shortUrl:process.env.NEXT_PUBLIC_BASE_URL+id,
      })
      toast({
        description: "Your File have been Uploaded Successfully.",
        variant:'success',
      });
      router.push('/file-preview/'+id);
    } catch (error) {
      console.log(error);
    }
  }  
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Selected File
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col space-y-6">
                    <Image src={selectedImage} width={400} height={400} alt='Selected Image' className='rounded-xl object-contain'/>
                    <div>
                        <p><span>Name: </span> {file.name}</p>
                        <p><span>Type: </span> {file?.type}</p>
                        <p><span>Size: </span> {(file.size/1024/1024).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className={`mt-4 flex space-x-5 ${progress>=1 ? 'hidden' : 'block'}`}>
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-600 disabled:hover:cursor-not-allowed ${progress>0?'disabled:' : null}`}
                      onClick={()=>(
                        uploadFileToDB(file)
                        )}
                    >
                      Upload
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>closeModal()}
                    >
                      Cancel
                    </button>
                  </div>
                  <Progress value={progress} className={` w-[100%] mt-6 ${progress==0 ? 'hidden' : 'block'}`}/>
                  {progress==100 ? (
                    closeModal(),
                    setProgress(0)
                    ) :null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
