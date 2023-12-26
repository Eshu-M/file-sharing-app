'use client'
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react'
import MyModal from './MyModal';

function UploadForm() {
    const [file,setFile]=useState(null);
    const [error,setError]=useState(false);
    const { toast } = useToast()
    const onFileSelect=(files)=>{
        if(!files){
            return;
        }else{

            if(files.size>2000000){
                setError(true);
            }
            setFile(files);
        }
    }
  return (  
    <div className='p-10 text-center flex flex-col items-center justify-center px-8 md:p-28 space-y-5'>
            <h1 className='text-3xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 font-bold'>Start <span className='text-blue-500'>uploading</span> and <span className='text-blue-500'> sharing</span> your files</h1>
        <div className="flex items-center justify-center w-full">
          <label for="dropzone-file" className="flex flex-col items-center justify-center w-[70%] h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-blue-500 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to <span className='text-blue-500'>upload</span> or <span className='text-blue-500'> Drag</span> and <span className='text-blue-500'> Drop</span> your files</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept='image/*'  onChange={(e)=>(onFileSelect(e.target.files[0]))}/>
          </label>
      </div> 
      {error ? 
      (toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "The size of the file selected is bigger than allowed.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      }) ,setError(false) , setFile(null)) : null}
      {file ? <MyModal file={file} removeFile={()=>setFile(null)}/> :null}
    </div>      
  )
}

export default UploadForm