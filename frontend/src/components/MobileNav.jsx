import { navLinks } from "../constants";
import ArrowButton from "./ArrowLink";
import { motion, stagger } from "motion/react";

const panelVariants = {
  hidden: { y: "-100%" },
  show: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      delay: 0.4,
      ease: "easeIn",
      delay: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const MobileNav = ({ onClose, onLogin }) => {
  return (
    <motion.ul
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 flex flex-col gap-3 overflow-y-auto bg-white px-8 pt-24 pb-8 text-gray-900 md:hidden"
    >
      {navLinks.map((item) => (
        <motion.li key={item.label} variants={linkVariants}>
          <a href={item.href} onClick={onClose}>
            {item.label}
          </a>
        </motion.li>
      ))}

      {/* <li>
        <ArrowButton onClick={onLogin}>Login</ArrowButton>
      </li> */}
    </motion.ul>
  );
};

export default MobileNav;
