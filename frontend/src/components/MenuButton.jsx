// import { useState } from "react";
import { motion, MotionConfig } from "motion/react";

const MenuButton = ({ active, onToggle, className = "" }) => {
  return (
    <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
      <motion.button
        initial={false}
        onClick={onToggle}
        className={`relative cursor-pointer h-11 w-11 rounded-full bg-white/0 transition-colors hover:bg-white/20 z-10 md:hidden ${className}`}
        animate={active ? "open" : "closed"}
      >
        <motion.span
          style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
          className={`menu-btn w-7 ${className}`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
        />
        <motion.span
          style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
          className={`menu-btn w-7 ${className}`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
        />
        <motion.span
          style={{
            left: "calc(50% + 7px)",
            bottom: "35%",
            x: "-50%",
            y: "50%",
          }}
          className={`menu-btn w-3.5 ${className}`}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              left: "50%",
              bottom: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              left: "calc(50% + 7px)",
              bottom: ["50%", "50%", "35%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default MenuButton;
