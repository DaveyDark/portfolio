import { motion } from "framer-motion";
import { cardAnimation } from "../constants";
import { useState } from "react";
import { X } from "react-feather";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  subtitle: string;
  img: string;
  href?: string;
  expandable?: boolean;
  expandedComponent?: React.ReactNode;
  orientation?: "v" | "h";
}

const Card = (props: CardProps) => {
  const { expandable } = props;
  if (expandable) {
    return <CardContent {...props} />;
  } else {
    return (
      <Link to={props.href!}>
        <CardContent {...props} />
      </Link>
    );
  }
};

export const CardContent = ({
  title,
  img,
  subtitle,
  expandable,
  orientation = "v",
  expandedComponent,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div
        className={`bg-gray-800 border border-gray-700 rounded-2xl p-4 md:p-6 flex md:gap-6 
                      cursor-pointer ${orientation === "v" ? "flex-col max-w-sm" : "max-w-2xl items-center"}`}
        {...cardAnimation}
        onClick={() => setIsOpen(true)}
      >
        <motion.img
          src={img}
          alt={title}
          className={`aspect-square object-cover rounded-md h-full ${orientation === "v" ? "mb-4 w-full" : "mr-4 w-1/4"}`}
        />
        <span className={`${orientation == "h" ? "w-3/4" : "test-center"}`}>
          <h1 className="sm:text-xl md:text-2xl font-mono text-sm mb-2 line-clamp-2">
            {title}
          </h1>
          <span className="text-gray-400 sm:text-lg text-sm md:line-clamp-3 lg:line-clamp-3 line-clamp-2">
            {subtitle}
          </span>
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
