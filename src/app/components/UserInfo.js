"use client";
import { signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";





import React from 'react'

const UserInfo = () => {
   const handleLogOut=async()=>{
     await signOut();
   }
    
  
    const {data:session,status}=useSession();
  return (
    <div className='grid place-items-center h-screen'>
        <div className=' w-[17%] shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6'>
            <div>
                Name:<span className='font-bold'>{session?.user?.name}</span>
            </div>
            <div>
                Email:<span className='font-bold'>{session?.user?.email}</span>
            </div>
            {
                   status==="authenticated" &&(
                    <button onClick={handleLogOut}className='bg-red-500 text-white font-bold px-6 py-2 rounded-md mt-3 '>
                    Log Out
                </button>
                   )
            }
            
        
        </div>
     </div>
  )
}

export default UserInfo;