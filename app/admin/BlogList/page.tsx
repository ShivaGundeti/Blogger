"use client"
import axios from 'axios';
import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import {useBlogContext} from "../../components/Context/page"
import Image from 'next/image';
import { toast,ToastContainer } from 'react-toastify';
const BlogList =  () => {
  
 const Userdata =  useBlogContext()

 function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
 const DeleteData = async (blogid: string)=>{
  const response = await axios.delete('/api/blog',{
    params:{
      id:blogid
    }
  })
  toast.success(response.data.msg);
 }
  return (
    <div className="p-4 sm:p-6 ">
      <div className="overflow-y-auto shadow-md  h-100 overflow-y-scroll">
        <table className="min-w-full bg-white text-sm text-center ">
          <thead className="text-gray-700 text-left hidden sm:table-header-group ">
            <tr className='text-center  border-b border-gray-200'>
              <th className="px-4 py-3 font-semibold uppercase">Author Name</th>
              <th className="px-4 py-3 font-semibold uppercase">Blog Title</th>
              <th className="px-4 py-3 font-semibold uppercase">Date</th>
              <th className="px-4 py-3 font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {Userdata.blogs.map((data)=>(
             <tr key={data._id} className="block sm:table-row border-b border-gray-200   shadow-sm sm:shadow-none mb-4 sm:mb-0">
             
              <td className="flex md:flex items-center gap-3 px-4 py-4 sm:table-cell sm:px-6 sm:py-4">
                <div className="rounded-full w-10 h-10 overflow-hidden ">
                  <img
                        src={data?.image ||"https://placehold.co/600x400"}
                        alt="profile"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="text-sm font-medium text-gray-800 ">{data.author}</span>
            
              </td>
              <td className="px-4 py-2 text-gray-600 sm:table-cell sm:px-6">{data?.title}</td>

            
              <td className="px-4 py-2 text-gray-600 sm:table-cell sm:px-6">{formatDate(data?.date)}</td>

            
              <td className="px-4 py-2 sm:px-6 text-gray-600 cursor-pointer sm:table-cell">
                <RxCross2 size={18} className="hover:text-red-500 transition" onClick={()=>DeleteData(data?._id)} />
              </td>
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default BlogList