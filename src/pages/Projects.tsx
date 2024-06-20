import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";

const Projects = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative p-16">
      <Navbar />
      Projects
    </div>
  );
};

export default pageTransition(Projects);
