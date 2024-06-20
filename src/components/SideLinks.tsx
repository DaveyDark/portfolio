import { GitHub, Instagram, Linkedin, Mail } from "react-feather";
import leetcodeLogo from "../assets/leetcode.svg";
import SideLink from "./SideLink";

const SideLinks = () => {
  return (
    <>
      <SideLink
        href="mailto:devesh97531@gmai.com"
        icon={<Mail color="white" />}
        tooltip="Mail"
      />
      <SideLink
        href="https://www.github.com/daveydark"
        icon={<GitHub color="white" />}
        tooltip="GitHub"
      />
      <SideLink
        href="https://www.linkedin.com/in/devesh-sharma04/"
        icon={<Linkedin color="white" />}
        tooltip="LinkedIn"
      />
      <SideLink
        href="https://www.instagram.com/davey.dark/"
        icon={<Instagram color="white" />}
        tooltip="Instagram"
      />
      <SideLink
        href="https://leetcode.com/u/DaveyDark/"
        icon={<img className="h-6 w-6 invert" src={leetcodeLogo} />}
        tooltip="LeetCode"
      />
    </>
  );
};

export default SideLinks;
