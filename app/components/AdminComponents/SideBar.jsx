import Image from "next/image";
import { assets } from '../../assets/assets';
import React from 'react'
import Link from "next/link";

const SideBar = () => {
  return (
    <>
    <div className="flex w-full md:w-80"> 
      <aside className="bg-gray-100 w-full md:w-64 p-4 ">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-black">
           <Link href="/">
            <Image
            src={assets.logo}
            alt="logo"
            width={120}
            className=""
            />
           </Link>
            </span> 
        </h1>
        <div className="flex flex-col gap-4">
          <Link href="/admin/addblog" className="border border-black px-4 py-2 text-left font-medium shadow-[-5px_5px_0px_#000000]">
            ➕ Add blogs
          </Link>
          <Link href="/admin/BlogList" className="border border-black px-4 py-2 text-left font-medium shadow-[-5px_5px_0px_#000000]">
            📝 Blog lists
          </Link>
          <Link href="/admin/Subscription" className="border border-black px-4 py-2 text-left font-medium shadow-[-5px_5px_0px_#000000]">
            ✉️ Subscriptions
          </Link>
        </div>
      </aside>
      
      
     
        </div>
      </>
  )
}

export default SideBar