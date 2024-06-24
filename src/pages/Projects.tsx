import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";
import projects from "../assets/projects.json";
import MobileNav from "../components/MobileNav";
import Card from "../components/Card";
import ProjectDetails from "../components/ProjectDetails";

const Projects = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <h1 className="text-4xl text-yellow-400 uppercase font-semibold">
        Projects
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
        {projects.map((project) => (
          <Card
            title={project.title}
            img={project.banner}
            subtitle={project.subtitle}
            key={project.title}
            expandable
            expandedComponent={<ProjectDetails {...project} />}
          />
        ))}
      </div>
    </div>
  );
};

export default pageTransition(Projects);
