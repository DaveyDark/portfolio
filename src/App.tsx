import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";

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
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
