"use client"
import Image from 'next/image'
import { assets,blog_data } from '../../assets/assets'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaFacebookF,FaTwitter,FaGoogle  } from "react-icons/fa";
import axios from 'axios'
import { set } from 'mongoose'



const UserCard = () => {
  const params = useParams();
  const id = params?.id;
  const [userdata, setUserData] = useState({});

  const fetchData = async ()=>{
    const response = await axios.get("/api/blog",{
      params:{id}
    })
    setUserData(response.data.blog)
  }
  
  useEffect(()=>{
    if(id) fetchData();
    
  },[id])

    if(!userdata){
        return <div>loading.....</div>
    }
   

return (
    <>
    <div className="p-4 sm:p-5 md:px-12 lg:px-28  min-h-110 h-40 bg-gray-200">
        <div className="flex  sm:flex-row justify-between items-center gap-4">
            <Link href="/">
                <Image
                    src={assets.logo ||""}
                    alt="logo"
                    className="h-8 sm:h-9 md:h-10 w-auto"
                />
            </Link>
            <button className="px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2 flex items-center gap-2 font-medium border border-solid border-black shadow-[-5px_5px_0px_#000000]">
                Get Started
                <Image
                    src={assets.arrow ||""}
                    alt="arrow"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                />
            </button>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center mt-15 sm:mt-12  relative">
            <h1 className="font-semibold text-lg sm:text-2xl md:text-4xl w-full sm:w-[600px] text-center px-2">
                {userdata?.title}
            </h1>
            <div className="flex flex-col justify-center items-center w-full sm:w-auto">
                <div className="rounded-full w-14 h-14 overflow-hidden border border-solid border-white border-2 font-medium">
                  <img
                        src={userdata?.authorImage ||"https://placehold.co/600x400"}
                        alt="profile"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                    />
                </div>
                <p className="text-sm sm:text-base mt-2">{userdata?.author}</p>
            </div>
        </div>
    <div className='flex justify-center'>
        <div className='absolute top-75 border border-white  border-4 '>
        <img
        src={userdata?.image||"https://placehold.co/600x400"}
        alt='profile image'
        width={650}
        height={600}
        className='border border-solid border-white'
        />
    </div>
    </div>
     <div className="p-4 sm:p-6 md:p-10  text-sm md:w-180 mx-auto  text-gray-800 md:mt-95 mt-60">
     
     <div className='blog-content' dangerouslySetInnerHTML={{__html:userdata?.description}}>

     </div>
      {/* <p className="text-base mb-4">


      </p>

      <h2 className="text-xl font-semibold mb-3">Introduction:</h2>
      <p className="text-base mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..
      </p>

      <h3 className="text-lg font-bold mb-2">Step 1: Self-Reflection and Goal Setting</h3>
      <p className="mb-2">
        Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. 
        Start by reflecting on your values, aspirations, and long-term goals.
      </p>
      <p className="mb-6">
        Write down your goals and prioritize them based on their significance to you. 
        This will serve as a roadmap for your lifestyle management journey.
      </p>

      <h3 className="text-lg font-bold mb-2">Step 2: Time Management</h3>
      <p className="mb-2">
        Time blocking is a strategy where you dedicate specific time periods to particular tasks or categories. 
        For example, you might block out 9 am to 11 am for focused work, 1 pm to 2 pm for meetings, 
        and 3 pm to 4 pm for personal development.
      </p>
      <p className="mb-6">
        There are various time management tools and apps available to help you streamline your schedule and tasks. 
        Some popular options include Trello, Asana, Todoist, and Google Calendar. 
        These tools often offer features like task reminders, project tracking, and collaboration capabilities.
      </p>

      <h3 className="text-lg font-bold mb-2">Step 3: Financial Management</h3>
      <p className='mb-6'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt nemo suscipit, eum voluptatibus id ipsa assumenda molestias iste nesciunt similique.
      </p>
     <h3 className="text-lg font-bold mb-2">Step 4: conclusion</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt nemo suscipit, eum voluptatibus id ipsa assumenda molestias iste nesciunt similique.
      </p> */}

  
      <p className='mt-25 font-semibold'>
        Share this article on social media
      </p>
      <div className='flex gap-3 mt-5'>
            <FaFacebookF size={30} className=' p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]'/>
            <FaTwitter size={30} className=' p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]' />
            <FaGoogle size={30} className=' p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]' />
      </div>

    </div>
        </div>
    
  </>
)
}

export default UserCard