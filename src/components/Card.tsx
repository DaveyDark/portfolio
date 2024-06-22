import { motion } from "framer-motion";
import { cardAnimation } from "../constants";
import { useState } from "react";
import { X } from "react-feather";

interface CardProps {
  title: string;
  subtitle: string;
  img: string;
  expandable?: boolean;
  expandedComponent?: React.ReactNode;
}

const Card = ({
  title,
  img,
  subtitle,
  expandable,
  expandedComponent,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm flex flex-col gap-6 cursor-pointer"
        {...cardAnimation}
        onClick={() => setIsOpen(true)}
      >
        <motion.img
          src={img}
          alt={title}
          className="aspect-square object-cover rounded-md"
          layoutId={`${title}-img`}
        />
        <span className="text-center">
          <h1 className="text-xl md:text-2xl font-mono">{title}</h1>
          <span className="text-gray-400 font-mono">{subtitle}</span>
        </span>
      </motion.div>
      {isOpen && expandable && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-40"
          onClick={() => setIsOpen(false)}
        >
          {expandedComponent}
          <button
            className="fixed top-4 right-4 text-white bg-gray-800 rounded-full aspect-square p-2 z-50 border border-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <X color="white" />
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
