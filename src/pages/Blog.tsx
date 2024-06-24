import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";
import blog from "../assets/blog.json";
import Card from "../components/Card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Blog = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <h1 className="text-4xl text-yellow-400 uppercase font-semibold">Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
        {blog.slice((page - 1) * pageSize, page * pageSize).map((post) => (
          <Card
            title={post.title}
            img={post.banner}
            subtitle={post.subtitle}
            key={post.title}
            href={`/blog/${post.slug}`}
            orientation="h"
          />
        ))}
      </div>
      <div className={`flex gap-2 ${blog.length <= pageSize && "hidden"}`}>
        <button
          onClick={() => setPage(page - 1)}
          className={`bg-yellow-400 rounded-md p-1 flex-1 ${page <= 1 && "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft color="black" size={32} />
        </button>
        <span className="bg-gray-700 aspect-square h-full flex-1 px-5 rounded-md py-1 text-xl grid place-items-center font-mono">
          {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          className={`bg-yellow-400 rounded-md p-1 flex-1 ${page >= blog.length / pageSize && "opacity-0 pointer-events-none"}`}
        >
          <ChevronRight color="black" size={32} />
        </button>
      </div>
    </div>
  );
};

export default pageTransition(Blog);
