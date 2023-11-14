"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const router=useRouter();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try
    {
        const res=await signIn('credentials',{
          email,
          password,
          redirect:false,
        });
        if(res.error)
        {
          setError("Invalid credentials");
          return;
        }
        router.replace("dashboard");
    }catch(error)
    {
  console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className=" w-[30%] flex flex-col border-black border-4  rounded-lg p-4 shadow-lg">
        <h1 className="font-bold text-2xl mb-4">Login</h1>
        <input onChange={(e)=>setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Enter Email"
          className="border rounded-lg p-2 mb-2"
        />
        <input onChange={(e)=>setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter Password"
          className="border rounded-lg p-2 mb-4"
        />
        
        <button  className="bg-black text-white px-3 py-2 rounded-3xl text-center text-xl shadow-gray-box mt-1">
          Login
        </button>
{
  error &&(
<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-3'>
  {error}
</div>
  )
}

<div className="flex justify-end mt-3">
  <div className="text-sm">
    Don&apos;t have an account? <Link href="/" className="underline cursor-pointer">Register</Link>
  </div>
</div>
      </form>
    </div>
  );
};

export default Login;
