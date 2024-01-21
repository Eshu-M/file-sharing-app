'use client'
import React, { useEffect, useState } from 'react'
import { app } from '/firebaseConfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import FileItem from './_component/FileItem.jsx'
import Link from 'next/link.js';
import Image from 'next/image.js';

function FileView({params}) {
  const [file,setFile]=useState();
  const name=params.userName.replace("%20"," ");
  const db = getFirestore(app);
    useEffect(()=>{
        params.id&&fetchData();
    },[]);
    const fetchData = async () => {
      const docPath = `files/users/${name}`;
      const docRef = doc(db, docPath, params.id);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
  return (
    <div className='bg-gray-200 h-screen w-full flex justify-center items-center flex-col gap-4'>
        <Link href={''}>
            <Image src={'/logo.svg'} width={150} height={100} />
        </Link>
        <FileItem file={file} user={name}/>
    </div>
  )
}

export default FileView