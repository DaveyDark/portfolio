import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Code, Home, Info, Mail, Menu, X } from "react-feather";
import { mobileNavAnimation } from "../constants";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="absolute top-0 left-0 right-0 bg-yellow-400 md:hidden p-4 flex gap-4 items-center ">
      <Menu color="black" size={32} onClick={() => setIsOpen(true)} />
      <h3 className="text-gray-800 font-bold text-xl uppercase">
        Devesh Sharma
      </h3>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="fixed left-0 top-0 bottom-0 bg-gray-800 flex flex-col origin-left min-w-80 max-w-screen"
            {...mobileNavAnimation}
          >
            <span className="flex justify-between items-center gap-4 p-4">
              <p className="uppercase text-lg font-semibold">Navigation</p>
              <button className="bg-gray-700 aspect-square p-2 rounded-full">
                <X color="white" size={32} onClick={() => setIsOpen(false)} />
              </button>
            </span>
            <Link
              to="/"
              className={`p-4 text-white flex font-semibold font-mono items-center gap-2 
                          rounded-md m-2 ${location.pathname === "/" && "bg-gray-700"}`}
            >
              <Home color="white" size={24} />
              Home
            </Link>
            <Link
              to="/about"
              className={`p-4 text-white flex font-semibold font-mono items-center gap-2 
                          rounded-md m-2 ${location.pathname === "/about" && "bg-gray-700"}`}
            >
              <Info color="white" size={24} />
              About
            </Link>
            <Link
              to="/projects"
              className={`p-4 text-white flex font-semibold font-mono items-center gap-2 
                rounded-md m-2 ${location.pathname === "/projects" && "bg-gray-700"}`}
            >
              <Code color="white" size={24} />
              Projects
            </Link>
            <Link
              to="/blog"
              className={`p-4 text-white flex font-semibold font-mono items-center gap-2 
                rounded-md m-2 ${location.pathname === "/blog" && "bg-gray-700"}`}
            >
              <BookOpen color="white" size={24} />
              Blog
            </Link>
            <Link
              to="/contact"
              className={`p-4 text-white flex font-semibold font-mono items-center gap-2 
                rounded-md m-2 ${location.pathname === "/contact" && "bg-gray-700"}`}
            >
              <Mail color="white" size={24} />
              Contact
            </Link>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
