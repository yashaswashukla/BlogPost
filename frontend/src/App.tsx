import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blogs";
import FullBlog from "./pages/FullBlog";
import Publish from "./pages/Publish";
import MyBlogs from "./pages/MyBlogs";
import UpdateBlog from "./pages/UpdateBlog";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Blog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/updateblog/:id" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
