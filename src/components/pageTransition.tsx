import { motion } from "framer-motion";
import React from "react";

const transitionVariants = {
  hiddenTop: {
    y: "-100%",
  },
  hiddenBottom: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
  },
};

const pageTransition = <P extends object>(OgComponent: React.FC<P>) => {
  return (props: P) => (
    <>
      <OgComponent {...props} />
      <motion.div
        className="fixed top-0 left-0 w-[100%] h-[100%] bg-[url('./assets/transition.svg')] z-50 origin-center"
        variants={transitionVariants}
        initial="hiddenTop"
        animate="hiddenTop"
        exit="visible"
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[100%] h-[100%] bg-[url('./assets/transition.svg')] z-50 origin-center"
        variants={transitionVariants}
        initial="visible"
        animate="hiddenBottom"
        exit="hiddenBottom"
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          opacity: {
            delay: 1,
          },
        }}
      />
    </>
  );
};

export default pageTransition;
