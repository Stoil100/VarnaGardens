import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const ANIMATION_COLORS = ["#F0B429","#A7C957","#329836","#0E5814"];

interface Props {
  children: JSX.Element;
}

export const RevealSection = ({ children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView,mainControls, slideControls]);

  return (
    <div ref={ref} style={{position:"relative",overflow:"hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, },
          visible: { opacity: 1, },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0 }}
      >
        {children}
      </motion.div>
      {ANIMATION_COLORS.map((colour,index)=>(
        <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{delay:(index*0.3), duration: 0.7, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: `${index*25}%`, 
          bottom: 0,
          left: 0,
          right: 0,
          height:"25%",
          width:"100vw",
          backgroundColor: colour,
          zIndex: 20,
        }}
      />
      ))}
      
          
    </div>
  );
};

