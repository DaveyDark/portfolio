// LANDING
export const LANDING_TITLES = [
  "Game Developer",
  "Web Developer",
  "Full Stack Developer",
  "FOSS Enthusiast",
  "Linux Expert",
  "Software Engineer",
];

export const sidelinkBarAnimation = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.5,
    delay: 0.75,
  },
};

export const resumeDownloadAnimation = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.75,
    },
  },
  whileHover: {
    scale: 1.05,
  },
  transition: {
    duration: 0.2,
  },
};

export const landingImageAnimation = {
  initial: {
    rotate: 180,
    opacity: 0,
    scale: 0.75,
  },
  animate: {
    rotate: 0,
    opacity: 1,
    scale: 1,
  },
  transition: {
    ease: "easeInOut",
    duration: 1,
    scale: {
      delay: 0.7,
      duration: 0.3,
    },
    rotate: {
      delay: 0.3,
      duration: 0.4,
    },
  },
};

export const landingLinkAnimation = (
  initialX: number,
  hoverY: number,
  hoverRotate: number,
) => {
  return {
    initial: {
      x: initialX,
      scaleX: 0,
    },
    animate: {
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.75,
        delay: 1,
      },
    },
    whileHover: {
      scale: 1.05,
      rotate: hoverRotate,
      y: hoverY,
    },
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  };
};

// NAVBAR
export const navbarAnimation = {
  initial: {
    flex: 1,
  },
  animate: {
    flex: 1,
  },
  whileHover: {
    flex: 1.2,
  },
};

export const mobileNavAnimation = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
  },
  exit: {
    scaleX: 0,
  },
};
