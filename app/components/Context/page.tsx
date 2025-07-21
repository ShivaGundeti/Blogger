"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
}

interface BlogContextType {
  blogs: Blog[];
}

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);


  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      setBlogs(res.data.blogs);
    
      
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
 
    }
  };

  useEffect(() => {
    fetchBlogs();
  },[]);

  return (
    <BlogContext.Provider value={{ blogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
