"use client";
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AnimatedTooltip } from './AnimatedToolTip';
//import { people } from '@/data';
//import profile from "./profiledummy.png"

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
          name: session.data.user?.name || session.data.user?.email || "Guest",
          description: "",
          image: session.data.user?.image || "/profiledummy.png",
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
      <div className='flex gap-8 items-center'>
      <div className="flex flex-row items-center justify-end my-2 ">
      <AnimatedTooltip items={[profile]} />
    </div>
      <button onClick={() => signOut()}>Logout</button>
      </div> : 
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