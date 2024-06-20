import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { navbarAnimation } from "../constants";

interface NavLinkProps {
  href: string;
  side?: "left" | "right" | "";
  text?: string;
  center?: boolean;
}

const MotionLink = motion(Link);

const NavLink = ({ href, side = "", text = href, center }: NavLinkProps) => {
  const location = useLocation();

  return (
    <MotionLink
      to={`/${href}`}
      className={`${center ? "bg-gray-800 -mx-4 col-span-2" : "bg-yellow-400"} p-4 flex-1 
                  ${side === "left" && "md:-skew-x-12"}  ${side === "right" && "md:skew-x-12"}`}
      {...navbarAnimation}
    >
      <h3
        className={`text-center uppercase font-semibold text-xl ${center ? "text-white" : "text-gray-800"} ${location.pathname === `/${href}` && "font-extrabold underline"}
                  ${side === "left" && "md:skew-x-12"}  ${side === "right" && "md:-skew-x-12"}`}
      >
        {text}
      </h3>
    </MotionLink>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="w-[102%] absolute top-0 justify-between items-center overflow-x-hidden gap-0.5 hidden md:flex">
        <NavLink href="about" side="left" />
        <NavLink href="projects" side="left" />
        <NavLink href="" text="Home" center />
        <NavLink href="blog" side="right" />
        <NavLink href="contact" side="right" />
      </nav>
    </>
  );
};

export default Navbar;
