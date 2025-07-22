"use client";
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const CardSection = ({ active }:{ active: string }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(); 
  }, []);

  return (
    <div className='min-h-screen w-full py-6'>
      <div className='grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4'>
        {blogs
          .filter((item) => item.category === active || active === "All")
          .map((data, index) => (
            <div key={index} className='border border-solid border-black text-left hover:shadow-[-5px_5px_0px_#000000]'>
              <Link href={`/blog/${data._id}`}>
                <Image 
                  src={data.image}
                  alt={`card-${index}`}
                  height={100}
                  width={100}
                  className='w-full h-[180px] object-cover'
                />
                <div className='px-3 py-4 space-y-4'>
                  <p className='bg-black text-white w-18 text-[12px] text-center font-semibold p-1'>
                    {data.category}
                  </p>
                  <h1 className='text-sm font-semibold'>{data.title}</h1>
                  <p className='text-gray-600 text-sm' dangerouslySetInnerHTML={{ __html: data.description.slice(0, 120) }}></p>
                  <button className='flex gap-2 items-center font-medium text-sm cursor-pointer'>
                    Read More <Image src={assets.arrow} alt='arrow' width={12} height={12} className='h-[12px]' />
                  </button>
                </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
