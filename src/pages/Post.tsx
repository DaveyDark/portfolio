import { useEffect } from "react";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import { useRemark } from "react-remark";
import pageTransition from "../components/pageTransition";

interface PostProps {
  title: string;
  subtitle: string;
  date: string;
  file: string;
  tags: string[];
  banner: string;
}

const Post = ({ title, date, file, banner, subtitle, tags }: PostProps) => {
  const [markdown, setMarkdown] = useRemark();

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <div className="bg-gray-800 flex flex-col justify-center gap-4 max-w-4xl pt-4 p-12 rounded-lg">
        <span className="flex flex-col w-full justify-between my-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
            {title}
          </h1>
          <p className="font-mono text-gray-400">{date}</p>
          <div className="flex gap-2 flex-wrap my-2">
            {tags.map((tag) => (
              <span className="bg-gray-700 rounded-full px-2 py-0.5 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </span>
        <img src={banner} className="max-h-72 object-contain mb-4" />
        <p className="text-lg text-gray-400 mb-4">{subtitle}</p>
        <p className="prose prose-invert md:prose-lg lg:prose-xl prose-neutral prose-img:max-h-72 prose-img:mx-auto">
          {markdown}
        </p>
      </div>
    </div>
  );
};

export default pageTransition(Post);
