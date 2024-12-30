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
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(() => {});
  }, []);
  return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        setBlog(response.data);
        setLoading(false);
      })
      .catch(() => {});
  }, [id]);
  return { loading, blog };
};

export const useMyBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(() => {});
  }, []);
  return { loading, blogs };
};

export const useAuth = () => {
  const token = localStorage.getItem("token") || "";
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/check`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          setLoading(false);
        }
      })
      .catch(() => {});
  }, []);
  return { loggedIn, loading };
};

const heightAdjust = (curr: HTMLTextAreaElement | null) => {
  if (curr) {
    curr.style.height = "auto";
    curr.style.height = `${curr.scrollHeight}px`;
  }
};

export const useDynamicTextArea = (
  curr: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    heightAdjust(curr);
  }, [value]);
};
