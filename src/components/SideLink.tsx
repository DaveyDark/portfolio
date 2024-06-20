import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

interface SideLinkProps {
  icon: React.ReactNode;
  href: string;
  tooltip: string;
}

const SideLink = ({ icon, href, tooltip }: SideLinkProps) => {
  return (
    <Link to={href}>
      <motion.div
        className="side-link"
        animate={{
          scale: 1,
          x: 0,
          y: 0,
          boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
        }}
        whileHover={{
          x: -2,
          y: -2,
          scale: 1.05,
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.3)",
        }}
        title={tooltip}
      >
        {icon}
      </motion.div>
    </Link>
  );
};

export default SideLink;
