import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        });
    } catch (error) {}
  }, []);
  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          setBlog(response.data);
          setLoading(false);
        });
    } catch (error) {}
  }, [id]);
  return { loading, blog };
};

export const useMyBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          setBlogs(response.data);
          setLoading(false);
        });
    } catch (error) {}
  }, []);
  return { loading, blogs };
};
