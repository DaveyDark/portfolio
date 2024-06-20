import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";

const Blog = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative p-16">
      <Navbar />
      <MobileNav />
      Blog
    </div>
  );
};

export default pageTransition(Blog);
