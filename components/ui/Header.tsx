"use client";
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AnimatedTooltip } from './AnimatedToolTip';
//import { people } from '@/data';

interface ItemUpdate {
    id: number;
    name: string;
    designation?: string;
    image: string;
  }[]

const Header = () => {
    const session = useSession();
    const userprofile: ItemUpdate = {
      id: 0,
      name: "test",
      designation: "",
      image: ""
    }
    const [profile, setProfile] = useState(userprofile);
    const status = session.status;
    
    useEffect(() => {
      if(session.status == "authenticated"){
        const updatedItem = {
          ...profile,
          id: Math. floor(Math. random()*10) + 1,
          name: session.data.user?.name || "",
          description: "",
          image: session.data.user?.image || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        };
        setProfile(updatedItem)
      }
    },[session.status])
    
  return (
    <>
    <nav className="flex items-center py-3 justify-between gap-8 mr-4">
      <Link href='/' className='ml-5 text-xl'>
        Home
      </Link>
      <div className='flex justify-between gap-4'>
      {status == "authenticated" ? 
      <>
      <div className="flex flex-row items-center justify-end my-2 ">
      <AnimatedTooltip items={[profile]} />
    </div>
      <button onClick={() => signOut()}>Logout</button>
      </> : 
      <>
      <Link href="/login" className='button'>Login</Link>
      <Link href="/register" className='button'>Register</Link>
      </>
      
}
</div>
    </nav>
    <h2 className="text-center font-semibold text-2xl text-white">
          Task Management System
        </h2>
    </>
  )
}

export default Header