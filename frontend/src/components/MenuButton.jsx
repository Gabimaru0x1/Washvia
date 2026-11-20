import { useState } from "react";
import { motion, MotionConfig } from "motion/react";

const AnimatedHambugerButton = () => {
  const [active, setActive] = useState(false);

  return (
    <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
      <motion.button
        initial={false}
        onClick={() => setActive((pv) => !pv)}
        className="relative cursor-pointer h-15 w-15 rounded-full bg-white/0 transition-colors hover:bg-white/20"
        animate={active ? "open" : "closed"}
      >
        <motion.span
          style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
          className="absolute h-1 w-8 bg-white rounded-full"
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
          className="absolute h-1 w-8 bg-white rounded-full"
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
            left: "calc(50% + 8px)",
            bottom: "35%",
            x: "-50%",
            y: "50%",
          }}
          className="absolute h-1 w-4 bg-white rounded-full"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              left: "50%",
              bottom: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              left: "calc(50% + 8px)",
              bottom: ["50%", "50%", "35%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default AnimatedHambugerButton;
