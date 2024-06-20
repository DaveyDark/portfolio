import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { landingLinkAnimation } from "../constants";

interface LandingLinkProps {
  to: string;
  initialX: number;
  hoverY: number;
  hoverRotate: number;
}

const LandingLink = ({
  to,
  initialX,
  hoverY,
  hoverRotate,
}: LandingLinkProps) => {
  return (
    <Link to={`/${to}`}>
      <motion.div
        className="p-link-container"
        key={to}
        {...landingLinkAnimation(initialX, hoverY, hoverRotate)}
      >
        <p className="p-link-text z-30">{to}</p>
        <p className="p-link-text z-20">{to}</p>
        <p className="p-link-text z-10">{to}</p>
      </motion.div>
    </Link>
  );
};

export default LandingLink;
