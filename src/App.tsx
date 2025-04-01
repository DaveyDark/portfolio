import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Post from "./pages/Post";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NewBlogPost from "./pages/NewBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import NewBlogGroup from "./pages/NewBlogGroup";
import EditBlogGroup from "./pages/EditBlogGroup";
import BlogGroup from "./pages/BlogGroup";

function App() {
  const location = useLocation();
  return (
    <main className="bg-[url('./assets/bg.svg')] text-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/group/:slug" element={<BlogGroup />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog/new" element={<NewBlogPost />} />
          <Route path="/admin/blog/edit/:id" element={<EditBlogPost />} />
          <Route path="/admin/group/new" element={<NewBlogGroup />} />
          <Route path="/admin/group/edit/:id" element={<EditBlogGroup />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
