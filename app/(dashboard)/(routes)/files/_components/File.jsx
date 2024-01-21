'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

function File({doc}) {
  const router=useRouter();
  const viewFile=(id)=>{
    router.push('/file-preview/'+id);
  }
  return (
    <div className='border shadow-sm rounded-md w-56 mx-auto p-5 m-2 flex flex-col justify-between items-center overflow-hidden hover:bg-slate-200 hover:cursor-pointer' onClick={()=>viewFile(doc.id)}>
        <Image className='' src={doc.fileUrl} width={150} height={100}/>
        <p className=''>Name: {doc.fileName}</p>
        <p className=''>Size: {(doc.fileSize/1024/1024).toFixed(2)} MB</p>
        <p className=''>Type: {doc.fileType}</p>
    </div>
  )
}

export default File