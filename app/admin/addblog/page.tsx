"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface BlogData {
  title: string;
  description: string;
  category: string;
  author: string;
  authorImage: string;
}

const AdminPanel: React.FC = () => {
  const [image, setImage] = useState<File | false>(false);
  const [data, setData] = useState<BlogData>({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImage: "/author_img.png",
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImage", data.authorImage);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImage: "/author_img.png",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="p-6 md:p-10">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="mb-6">
            <label className="block text-md font-medium mb-2">Upload thumbnail</label>
            <label htmlFor="image">
              <Image
                src={
                  image ? URL.createObjectURL(image) : assets.upload_area
                }
                alt="upload"
                width={160}
                height={128}
                className="w-40 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                e.target.files?.[0] && setImage(e.target.files[0])
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Blog title</label>
            <input
              name="title"
              onChange={onChangeHandler}
              value={data.title}
              type="text"
              placeholder="Type here"
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Blog Description</label>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              rows={5}
              placeholder="Write content here"
              className="w-full border border-gray-300 px-4 py-2 rounded resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Blog category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            >
              <option>Startup</option>
              <option>Technology</option>
              <option>Education</option>
              <option>Lifestyle</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded shadow-md hover:bg-gray-800"
          >
            Add
          </button>
        </form>
      </main>

      <ToastContainer theme="dark" />
    </>
  );
};

export default AdminPanel;
