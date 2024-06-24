import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import blog from "./assets/blog.json";
import Post from "./pages/Post";

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
          <Route path="/contact" element={<Contact />} />
          {blog.map((post) => (
            <Route
              key={post.slug}
              path={`/blog/${post.slug}`}
              element={<Post {...post} />}
            />
          ))}
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
