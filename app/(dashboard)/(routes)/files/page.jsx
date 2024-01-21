'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { app } from '/firebaseConfig';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import File from './_components/File';
function Files() {
  const {user}=useUser();
  const db = getFirestore(app);
  const [docs,setDocs]=useState([]);
  const listRef=`files/users/${user?.fullName}`;
  const colRef = collection(db, listRef);
  useEffect(()=>{
    user?.fullName&&fetchData();
  },[user?.fullName])
  const fetchData=async()=>{
   const snapshorts=await getDocs(colRef);
   const documents=snapshorts.docs.map(doc=>doc.data())
   setDocs(documents);
  }
  return (
    <div className='md:grid sm:flex sm:flex-row md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {docs.map((doc)=>(
        <File key={doc.id} doc={doc}/>
      ))}
    </div>
  )
}

export default Files