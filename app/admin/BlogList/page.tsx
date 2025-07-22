"use client";

import axios from "axios";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useBlogContext, Blog } from "../../components/Context/BlogProvider";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";


const BlogList = () => {
  const Userdata = useBlogContext() as { blogs: Blog[] };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const DeleteData = async (blogid: string) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id: blogid,
        },
      });
      toast.success(response.data.msg || "Blog deleted!");
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto shadow-md rounded-md">
        <table className="min-w-full bg-white text-sm text-center">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Userdata.blogs.map((data: Blog) => (
              <tr key={data._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-10 h-10 overflow-hidden">
                      <Image
                        src={data?.image || "https://placehold.co/600x400"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{data.author}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-left text-gray-700">{data?.title}</td>

                <td className="px-6 py-4 text-left text-gray-600">{formatDate(data?.date)}</td>

                <td className="px-6 py-4 text-center">
                  <RxCross2
                    size={18}
                    className="mx-auto hover:text-red-500 transition cursor-pointer"
                    onClick={() => DeleteData(data._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default BlogList;
