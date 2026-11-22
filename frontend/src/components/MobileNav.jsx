import { navLinks } from "../constants";
import ArrowButton from "./ArrowLink";
import { motion } from "motion/react";

const MobileNav = ({ onClose, onLogin }) => {
  const navAnimate = {
    hidden: {
      scaleX: 0,
    },
    show: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      width: 0,
      transition: {
        delay: 0.4,
      },
    },
  };

  const animateLink = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.5,
      },
    },
  };

  const linkStagger = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      key="slidebox"
      variants={navAnimate}
      initial="hidden"
      animate="show"
      exit="exit"
      className="md:hidden"
    >
      <motion.ul
        variants={animateLink}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-0 flex flex-col gap-3 overflow-y-auto
          bg-white px-8 pt-24 pb-8 text-gray-900
          md:static md:flex md:flex-row md:items-center md:gap-5
          md:rounded-full md:py-1 md:pl-5 md:pr-1"
      >
        {navLinks.map((item) => (
          <motion.li key={item.label} variants={linkStagger}>
            <a href={item.href} onClick={onClose}>
              {item.label}
            </a>
          </motion.li>
        ))}

        <li>
          <ArrowButton onClick={onLogin}>Login</ArrowButton>
        </li>
      </motion.ul>
    </motion.div>
  );
};

export default MobileNav;
