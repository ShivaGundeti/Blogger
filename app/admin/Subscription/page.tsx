"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import {useBlogContext} from "../../components/Context/BlogProvider"
import Image from 'next/image';
import { toast,ToastContainer } from 'react-toastify';
const BlogList =  () => {
  const [emails, setemails] = useState([])
  const mails = async ()=>{
      const response = await axios.get('/api/email');
      setemails(response.data.emails);
      console.log("🚀🚀🚀--",response.data.emails);
      
  }
  useEffect(()=>{
    mails();
  },[])

  const deletemail = async (mailid:unknown) =>{
    const response = await axios.delete('/api/email',{
      params:{
        id:mailid
      }
    })
    if(response.data.success){
      toast.success(response.data.msg)
    }else{
      toast.success("error deleting mail")
    }
    mails();
  }

 function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

  return (
    <div className="p-4 sm:p-6 ">
      <div className="overflow-y-auto shadow-md  h-100 overflow-y-scroll">
        <table className="min-w-full bg-white text-sm  ">
          <thead className="text-gray-700 text-left hidden sm:table-header-group ">
            <tr className='  border-b border-gray-200'>
              <th className="px-4 py-3 font-semibold uppercase">Email Subscription</th>
              <th className="px-4 py-3 font-semibold uppercase">Date</th>
              <th className="px-4 py-3 font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200  ">
          {emails.map((data)=>(
             <tr key={data._id} className="block sm:table-row border-b border-gray-200   shadow-sm sm:shadow-none mb-4 sm:mb-0">
             
              <td className="flex md:flex items-center gap-3 px-4 py-4 sm:table-cell sm:px-6 sm:py-4">
                
                <span className="text-sm font-medium text-gray-800 ">{data.email}</span>
            
              </td>
             

            
              <td className="px-4 py-2 text-gray-600 sm:table-cell sm:px-6">{formatDate(data?.date)}</td>

            
              <td className="px-4 py-2 sm:px-6 text-gray-600 cursor-pointer sm:table-cell">
                <RxCross2 size={18} className="hover:text-red-500 transition" onClick={()=>{deletemail(data?._id)}} />
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