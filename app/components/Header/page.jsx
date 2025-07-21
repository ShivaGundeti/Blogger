"use client"
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import CardSection from '../CardSection/page';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Header = () => {
    const [active, setActive] = useState("All")
    const [email, setemail] = useState("")

    const OnSubmitHandler= async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",email)
      try {
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
        toast.success(response.data.msg);
        setemail("");
        console.log("🚀🚀---email",email);
        
    } else {
        toast.error(response.data.msg || "Something went wrong");
    }
} catch (err) {
    console.error("❌ Axios error:", err);
    toast.error(err.response?.data?.msg || "Network/server error");
}

    }
return (
    <div className="p-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center ">
            <Link href="/">
                <Image 
                    src={assets.logo}
                    alt="logo"
                    width={200}
                    height={200}
                    className="h-[30px] sm:h-[35px] md:h-[40px] w-auto"
                />
             </Link>
            <Link href="/admin" className="px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2 flex items-center gap-2 font-medium border border-solid border-black shadow-[-5px_5px_0px_#000000]">
                Add Blogs
                <Image 
                    src={assets.arrow} 
                    alt="arrow" 
                     width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                />
            </Link>
        </div>
        {/*latest blog div*/}
        <div className='min-h-70  flex flex-col space-y-6 items-center justify-center text-center mt-6'>
            <h1 className='text-4xl font-semibold'>Latest Blogs</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <form onSubmit={OnSubmitHandler} className="flex sm:flex-row items-center  w-full max-w-md shadow-[-5px_5px_0px_#000000] border border-solid border-black ">
                <input
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
                    type="text"
                    placeholder="Enter your email"
                    className=" text-sm px-3 py-2 sm:px-4 sm:py-3 flex-1 min-w-0 h-10 sm:h-12  "
                />
                <button
                    className=" border-l px-3 py-2 sm:px-4 sm:py-3 h-10 sm:h-12  text-sm sm:text-base font-medium
                    active:bg-gray-800 active:text-white"
                    type="submit"

                >
                    Subscribe
                </button>
            </form>
            <div className='flex gap-3'>
               {["All","Technology","Startup","Lifestyle"].map((category,index)=>(
                <div key={index} className='mt-5'>
                    <button className={`${active == category ? "bg-black text-white": ""} p-2 text-sm sm:text-[16px]`} onClick={()=>setActive(category)
                    }>{category}</button>
                </div>
               ))}  
            </div>
        </div>
<CardSection active= {active}/>
<ToastContainer theme='dark'/>
    </div>
);
};

export default Header;
