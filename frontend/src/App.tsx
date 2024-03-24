import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Blog } from "./pages/blog";
import { Blogs } from "./pages/blogs";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { Publish } from "./pages/publish";
import { Landing } from "./pages/landing";
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/publish" element={<Publish/>}/>
        <Route path="/blogs/blog/:id" element={<Blog/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
     
}

export default App
