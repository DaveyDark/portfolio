import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";
import contactImage from "../assets/contact.svg";
import { motion } from "framer-motion";
import SideLinks from "../components/SideLinks";

const Contact = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative px-16 overflow-x-hidden py-8">
      <Navbar />
      <MobileNav />
      <div className="flex w-full h-full justify-center items-center gap-6 mt-6 flex-col md:flex-row">
        <motion.img
          src={contactImage}
          className="w-[60%] aspect-square max-w-xl"
          animate={{
            y: [0, 10, 0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
        <form className="h-full flex-1 flex flex-col justify-center items-center w-full max-w-xl gap-6">
          <h1 className="text-4xl font-bold">Contact Me</h1>
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-700 text-white p-2 w-full rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-700 text-white p-2 w-full rounded-md"
          />
          <textarea
            placeholder="Message"
            className="bg-gray-700 text-white p-2 w-full rounded-md"
          />
          <button className="bg-yellow-400 p-2 w-full rounded-md font-bold">
            Send
          </button>
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-semibold">Find me on</h2>
            <div className="flex gap-2">
              <SideLinks />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default pageTransition(Contact);
