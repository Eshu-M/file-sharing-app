
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaBoltLightning } from "react-icons/fa6";
import { Input } from '/components/ui/input';
import { Button } from '/components/ui/button';
import { FaDownload } from "react-icons/fa6";
function FileItem({file,user}) {
    const [password,setPassword]=useState(null);
    const [isPasswordProtected,setIsPasswordProtected]=useState(false);
  return file&&(
    <div className='text-black bg-white w-fit h-fit p-5 rounded-md flex flex-col items-center gap-3'>
        <p><span className='text-blue-500 text-lg font-bold'>{user}</span> Shared the file with you</p>
        <p className='text-sm'>Find file content below</p>
        <Image className='mt-5 mb-5' src='/download.png' height={100} width={100}/>
        <p className='flex items-center gap-1'>{file?.fileName}<FaBoltLightning className='text-yellow-400'/>{file?.fileType}<FaBoltLightning className='text-yellow-400'/>{(file?.fileSize/1024/1024).toFixed(2)} MB</p>
        <div className={'flex flex-col gap-3'}>
            {file.password.length>3 ? 
            (<Input type="password" placeholder="Enter password to access file" onChange={(e)=>setPassword(e.target.value)}/>,
            setIsPasswordProtected(true))
            :null}
            <Button variant={isPasswordProtected ? !password ?'ghost':file.password!==password ?'ghost':'default':'default'} onClick={()=>window.open(file?.fileUrl)}> <FaDownload className='mr-3'/> Download</Button>
        </div>
        <p className='text-sm'>* Terms and Conditions will apply</p>
    </div>
  )
}

export default FileItem