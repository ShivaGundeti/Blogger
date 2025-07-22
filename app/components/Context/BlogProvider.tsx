// components/Context/BlogProvider.tsx

"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Blog {
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

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogContext must be used within a BlogProvider");
  return context;
};
