import { useEffect, useRef } from "react";
import ProfilePic from "../assets/me.jpeg";
import Typed from "typed.js";
import LandingLink from "../components/LandingLink";
import {
  LANDING_TITLES,
  landingImageAnimation,
  resumeDownloadAnimation,
  sidelinkBarAnimation,
} from "../constants";
import { Download } from "react-feather";
import { motion } from "framer-motion";
import { AnimatedText } from "../components/AnimatedText";
import pageTransition from "../components/pageTransition";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import SideLinks from "../components/SideLinks";

const Landing = () => {
  const typedRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      startDelay: 1000,
      typeSpeed: 50,
      shuffle: true,
      backSpeed: 25,
      backDelay: 1000,
      strings: LANDING_TITLES,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative p-24 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <div>
        <AnimatedText
          el="p"
          text="Hello! My name is"
          className="font-mono text-yellow-400"
          once
        />
        <AnimatedText
          el="h2"
          text="Devesh Sharma"
          className="font-sans text-5xl uppercase"
          once
        />
      </div>
      <motion.a
        className="absolute left-5 bottom-5 my-auto h-fit bg-yellow-400 p-4 
        rounded-full justify-center items-center lg:flex-col gap-4 lg:w-14 flex lg:top-5 "
        href="/Resume.pdf"
        {...resumeDownloadAnimation}
      >
        <Download color="black" />
        <p className="lg:vertical-text uppercase font-mono lg:text-2xl text-gray-800 font-semibold">
          Resume
        </p>
      </motion.a>
      <motion.div
        className="absolute right-5 lg:top-5 bottom-5 my-auto h-fit bg-yellow-400 px-2 py-2 lg:py-6
        rounded-full justify-center items-center lg:flex-col gap-2 lg:gap-4 z-50 flex"
        {...sidelinkBarAnimation}
      >
        <SideLinks />
      </motion.div>
      <div className="flex w-full justify-center items-center relative md:flex-row flex-col gap-1 md:gap-0">
        <div className="p-link md:rotate-6 md:-mr-20 order-2 md:order-1">
          <LandingLink initialX={200} to="about" hoverY={-6} hoverRotate={2} />
          <LandingLink
            initialX={200}
            to="projects"
            hoverY={6}
            hoverRotate={-2}
          />
        </div>
        <motion.img
          className="w-80 rounded-full z-10 border-white border-4 outline outline-black order-1 md:order-2 mb-4 aspect-square"
          src={ProfilePic}
          {...landingImageAnimation}
        />
        <div className="p-link md:-rotate-6 md:-ml-20 order-3">
          <LandingLink initialX={-200} to="blog" hoverY={-6} hoverRotate={-2} />
          <LandingLink
            initialX={-200}
            to="contact"
            hoverY={6}
            hoverRotate={2}
          />
        </div>
      </div>
      <div>
        <AnimatedText
          el="p"
          text="I am a "
          className="font-mono text-center md:-mb-2 text-yellow-400"
          speed={0.3}
          once
        />
        <span className="text-2xl md:text-5xl uppercase" ref={typedRef}></span>
      </div>
    </div>
  );
};

export default pageTransition(Landing);
