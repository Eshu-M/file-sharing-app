'use client'
import { app } from '@/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
function FilePreview({params}) {
  const {user}=useUser();
  const router=useRouter();
  const db = getFirestore(app);
  const [file,setFile]=useState();
  const [enablePassword,setEnablePassword]=useState(false);
  const [password,setPassword]=useState(null);
  const { toast } = useToast();
  useEffect(() => {
    fetchData(); // Invoke the async function
  }, [params, user?.fullName]);
  const fetchData = async () => {
    const docPath = `files/users/${user?.fullName}`;
    const docRef = doc(db, docPath, params.id);
    
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFile(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  function formatFileSize(size) {
    if (size === null || size === undefined) {
      return 'N/A';
    }
  
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return size.toFixed(2) + ' ' + units[unitIndex];
  }
  const onPasswordSaved=async(passwords)=>{
    if(passwords.length<3){
      toast({
        description: "Password Must Be More Than 3 Characters.",
        variant:'destructive',
      });
      return;
    }
    const docPath = `files/users/${user?.fullName}`;
    const docRef = doc(db, docPath, params.id);
    await updateDoc(docRef,{
      password:passwords
    })
    toast({
      description: "Password have been Added Successfully.",
      variant:'success',
    });
    setPassword(null);
  }
  return (
    <div className='md:h-[90%] md:w-[90%] h-fit flex mt-5 justify-center items-center'>
      <Card className="w-[60%] h-[70%] ">
      <CardHeader>
        <div className="flex items-center space-x-1">
          <IoMdArrowRoundBack className='hover:cursor-pointer' onClick={()=>router.push('/upload')}/>
          <span>Go to upload</span>
        </div>
      </CardHeader>
      <CardContent>
      <div className='md:flex md:flex-row gap-5 flex flex-col'>
         <div className='border-2 border-gray-300 p-10 w-[50]  rounded-lg flex flex-col items-center justify-center'>
            <Image src={file?.fileUrl} alt='image' height={200} width={200} />
            <p>Name: {file?.fileName}</p>
            <p>Type: {file?.fileType}</p>
            <p>Size: {formatFileSize(file?.fileSize)}</p>
          </div>
          <div className='md:w-[50%] w-full flex flex-col space-y-10'>
             <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="name">Short Url</Label>
              <Input className="" id="name" placeholder="Short Url" value={file?.shortUrl}/>
            </div>
             <div className="flex flex-col space-y-1.5 w-full">
             <div className='flex space-x-3'>
                 <Checkbox onClick={()=>setEnablePassword(!enablePassword)}/>
                 <Label htmlFor="name">Enable Password?</Label>
                </div>
              <div className={`flex space-x-5 ${enablePassword?'inline-block':'hidden'}`}>
                <Input type="password" placeholder="Short Url" onChange={(e)=>setPassword(e.target.value)}/>
                <Button variant="default" onClick={()=>onPasswordSaved(password)}>Save</Button>
              </div>
            </div>
            <div className='border rounded-md p-2 flex flex-col space-y-2'>
               <div className="flex flex-col space-y-1.5 w-full">
                 <Label htmlFor="name">Send File To Email</Label>
                 <Input type="email" id="name" placeholder="example@gmail.com" />
               </div>
               <Button variant="default" className="w-full">Send Email</Button>
            </div>
          </div>
       </div>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
    </div>
  )
}

export default FilePreview