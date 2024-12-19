import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blogs";
import FullBlog from "./pages/FullBlog";
import Publish from "./pages/Publish";
import MyBlogs from "./pages/MyBlogs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
