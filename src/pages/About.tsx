import pageTransition from "../components/pageTransition";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import aboutImage from "../assets/about.jpeg";

const About = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative pt-16 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <div className="w-full max-w-5xl h-full bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h1 className="text-4xl uppercase font-semibold text-yellow-400 mb-2">
          About Me
        </h1>
        <div className="flex w-full items-center justify-center gap-12 md:flex-row flex-col-reverse">
          <p className="text-lg font-light text-gray-300">
            I am a B.Tech student majoring in Information Technology from
            Ludhiana, Punjab, India. My passion for technology began in my
            school years, and I have developed interests in various technical
            fields such as game development, Linux, web development, audio/video
            editing, 3D modeling, music production, graphic design, image
            editing, and more.
            <br />
            Over time, I discovered that web development aligns best with my
            <br />
            skills and interests. Since then, I have delved into numerous web
            technologies, including React, Next.js, Node.js, Axum, Flask,
            Express, Tailwind, TypeScript, PHP, AR.js, MongoDB, Vercel, and
            others. With two years of dedicated learning and hands-on experience
            with various projects, I confidently identify as a full stack
            developer.
            <br />
            I have the expertise to create full stack web applications from
            scratch, manage and maintain them, including their APIs, databases,
            and deployment processes. Additionally, I have worked on projects
            involving web sockets, augmented reality (AR), 3D technologies, and
            other advanced fields.
            <br />
            As a Free and Open Source Software (FOSS) enthusiast and a Linux
            user for the past two years, I am well-versed in Linux server
            environments, which I use daily for both personal and professional
            projects.
          </p>
          <img src={aboutImage} alt="About Me" className="w-80 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default pageTransition(About);
