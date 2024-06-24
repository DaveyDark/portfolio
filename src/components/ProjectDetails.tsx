import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, GitHub, Globe } from "react-feather";
import { projectDetailsAnimation } from "../constants";

interface ProjectDetailsProps {
  title: string;
  banner: string;
  images: string[];
  description: string;
  subtitle: string;
  date: string;
  tags: string[];
  logo: string;
  repo?: string;
  website?: string;
}

const ProjectDetails = ({
  title,
  banner,
  images,
  description,
  subtitle,
  date,
  tags,
  logo,
  repo,
  website,
}: ProjectDetailsProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <motion.div
      className="max-w-[90%] max-h-[90%] bg-gray-800 p-4 rounded-3xl z-50 flex"
      onClick={(e) => e.stopPropagation()}
      {...projectDetailsAnimation}
    >
      <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-scroll p-4">
        <div className="flex-1 max-w-md md:max-w-fit relative aspect-square flex items-center bg-gray-700 rounded-lg">
          <img
            src={banner}
            className="object-contain cursor-zoom-in opacity-0"
          />
          <img
            src={currentImage === 0 ? banner : images[currentImage - 1]}
            className="object-contain cursor-zoom-in absolute top-0 left-0 h-full w-full"
            onClick={() =>
              window.open(
                currentImage === 0 ? website : images[currentImage - 1],
                "_blank",
              )
            }
          />
          {currentImage < images.length && (
            <button
              className="bg-gray-800 rounded-full aspect-square p-2 right-0.5 top-1/2 -translate-y-1/2 absolute"
              onClick={() =>
                setCurrentImage((prev) => Math.min(images.length, prev + 1))
              }
            >
              <ChevronRight color="white" />
            </button>
          )}
          {currentImage > 0 && (
            <button
              className="bg-gray-800 rounded-full aspect-square p-2 left-0.5 top-1/2 -translate-y-1/2 absolute"
              onClick={() => setCurrentImage((prev) => Math.max(0, prev - 1))}
            >
              <ChevronLeft color="white" />
            </button>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <div className="flex flex-col flex-shrink-0">
              <h2 className="text-3xl font-mono text-yellow-400">{title}</h2>
              <h3 className="text-lg font-mono text-gray-400">{subtitle}</h3>
              <h3 className="text-sm font-mono text-gray-400">{date}</h3>
            </div>
            <div className="flex-grow flex ml-6">
              <img
                src={logo}
                className="aspect-square object-contain max-h-20 ml-auto my-auto"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                className="bg-gray-700 rounded-full px-2 py-0.5 text-sm"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 my-4">
            {repo && (
              <a
                href={repo}
                target="_blank"
                className="bg-yellow-400 rounded-lg p-1 text-center text-gray-800 h-fit flex items-center justify-center gap-1"
              >
                <GitHub color="black" size={20} />
                Code
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                className="bg-yellow-400 rounded-lg p-1 text-center text-gray-800 h-fit flex items-center justify-center gap-1"
              >
                <Globe color="black" size={20} />
                Website
              </a>
            )}
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
