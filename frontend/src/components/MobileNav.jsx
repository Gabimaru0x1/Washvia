import { navLinks } from "../constants";
import { motion } from "motion/react";

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
      ease: "easeIn",
      delay: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const MobileNav = ({ onClose }) => {
  return (
    <motion.ul
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 flex flex-col items-center space-y-5 overflow-y-auto bg-white pt-24 text-gray-900 md:hidden"
    >
      {navLinks.map((item) => (
        <motion.li key={item.label} variants={linkVariants}>
          <a
            href={item.href}
            onClick={onClose}
            className="text-2xl font-medium"
          >
            {item.label}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default MobileNav;
