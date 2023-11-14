"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
    const router=useRouter();
    const handlesubmit=async(e)=>{
      e.preventDefault();
      if(!name||!email||!password)
      {
        setError("All fields are necessary");
      
       
        return;
      }
      try { 
        const res1=await fetch("api/userExists",{
          method:"POST",
          Headers:{
            "Content-Type":"application/json",
          },
          
            body:JSON.stringify({
                   email
            }),
          
        });
        const {user}=await res1.json();//here we destructure the email
        if(user)
        {
          setError("User already exists");
          return;
        }

        const res=await fetch("api/register",{
          method:"POST",
          Headers:{
            "Content-Type":"application/json",
          },
          
            body:JSON.stringify({
                    name,
                    email,
                    password,
            }),
          
        });
        if(res.ok)
        {
          const form=e.target;
          form.reset();
          router.push("/Login");
        }
        else{
          console.log("User Registeration failed");
        }
        
      } catch (error) {
        console.log("Error during registeration:",error);
      }
       
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handlesubmit} className=" w-[30%] flex flex-col border-black border-4  rounded-lg p-4">
        <h1 className="font-bold text-2xl mb-4">Register</h1>
        <input onChange={(e)=>setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Enter Name"
          className="border rounded-lg p-2 mb-2"
        />
        <input onChange={(e)=>setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Enter Email"
          className="border rounded-lg p-2 mb-2"
        />
        <input onChange={(e)=>setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="Enter Password"
          className="border rounded-lg p-2 mb-4"
        />
        
        <button className="bg-black text-white px-3 py-2 rounded-3xl text-center text-xl shadow-gray-box mt-4">
         Register
        </button>
        { error &&(
                   
                   <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-3'>
                   {error}
                 </div>
        )
        }
       
        <div className="flex justify-end mt-3">
  <div className="text-xs">
    Already have an account? <Link href="/Login" className="underline underline-offset-1 cursor-pointer">Login</Link>
  </div>
</div>
      </form>
    </div>
  );
};

export default Register;
