"use client";

import Image from "next/image";
import { assets } from "../../assets/assets";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import axios from "axios";

type BlogData = {
  title?: string;
  author?: string;
  image?: string;
  authorImage?: string;
  description?: string;
};

const UserCard = () => {
  const params = useParams();
  const id = params?.id;
  const [userdata, setUserData] = useState<BlogData>({});

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/blog", { params: { id } });
      setUserData(response.data.blog);
    } catch (error) {
      console.error("Failed to fetch blog data", error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (Object.keys(userdata).length === 0) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <>
      {/* Header Section */}
      <div className="p-4 sm:p-5 md:px-12 lg:px-28 min-h-110 h-40 bg-gray-200">
        <div className="flex justify-between items-center gap-4">
          <Link href="/">
            <Image
              src={assets.logo || ""}
              alt="logo"
              className="h-8 sm:h-9 md:h-10 w-auto"
            />
          </Link>
          <button className="px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2 flex items-center gap-2 font-medium border border-black shadow-[-5px_5px_0px_#000000]">
            Get Started
            <Image
              src={assets.arrow || ""}
              alt="arrow"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>
        </div>

        {/* Title & Author */}
        <div className="flex flex-col gap-6 items-center justify-center mt-12 relative">
          <h1 className="font-semibold text-center text-lg sm:text-2xl md:text-4xl w-full sm:w-[600px] px-2">
            {userdata.title}
          </h1>
          <div className="flex flex-col items-center">
            <div className="rounded-full w-14 h-14 overflow-hidden border-2 border-white">
              <Image
                src={userdata?.authorImage || "https://placehold.co/600x400"}
                alt="profile"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm sm:text-base mt-2">{userdata?.author}</p>
          </div>
        </div>

        {/* Main Blog Image */}
        <div className="flex justify-center">
          <div className="absolute top-[75%] border-4 border-white shadow-lg">
            <Image
              src={userdata?.image || "https://placehold.co/600x400"}
              alt="blog"
              width={650}
              height={600}
              className="object-cover border border-white"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-4 sm:p-6 md:p-10 text-sm md:w-[720px] mx-auto mt-[300px] text-gray-800">
        <div
          className="blog-content leading-relaxed"
          dangerouslySetInnerHTML={{ __html: userdata?.description || "" }}
        />
        <p className="mt-16 font-semibold">Share this article on social media</p>
        <div className="flex gap-3 mt-4">
          <FaFacebookF
            size={30}
            className="p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]"
          />
          <FaTwitter
            size={30}
            className="p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]"
          />
          <FaGoogle
            size={30}
            className="p-2 rounded-full shadow-[-4px_1px_4px_#D3D3D3]"
          />
        </div>
      </div>
    </>
  );
};

export default UserCard;
