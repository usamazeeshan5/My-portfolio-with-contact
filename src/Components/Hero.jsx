
// import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
// import { useRef } from "react";
// import ceoImage from "../assets/u3-removebg-preview.png";

// export function Hero() {
//   const containerRef = useRef(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const springConfig = { damping: 25, stiffness: 100 };
//   const imageScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.4]), springConfig);
//   const textScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.8]), springConfig);
//   const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     const { innerWidth, innerHeight } = window;
//     mouseX.set((clientX / innerWidth - 0.5) * 40);
//     mouseY.set((clientY / innerHeight - 0.5) * 40);
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="min-h-[100vh] md:h-[120vh] flex items-center justify-center bg-black text-white relative overflow-hidden perspective-1000 px-4"
//     >
//       {/* BACKGROUND TEXT */}
//       <motion.div
//         style={{
//           scale: textScale,
//           opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
//         }}
//         className="absolute z-0 select-none pointer-events-none text-center"
//       >
//         <h1 className="text-[14vw] md:text-[10vw] font-black text-white/5 leading-none uppercase italic">
//           INARTIA Product Manager
//         </h1>
//       </motion.div>

//       {/* GLOW */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{ duration: 4, repeat: Infinity }}
//         className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-green-500/20 blur-[120px] md:blur-[180px] rounded-full z-10"
//       />

//       {/* IMAGE */}
//       <motion.div
//         style={{
//           scale: imageScale,
//           y: imageY,
//           x: mouseX,
//           y: mouseY,
//           rotateY: useTransform(mouseX, [-20, 20], [-10, 10]),
//           rotateX: useTransform(mouseY, [-20, 20], [10, -10]),
//         }}
//         className="relative z-20 w-full max-w-4xl h-[50vh] sm:h-[60vh] md:h-[80vh] flex items-center justify-center"
//       >
//         <img
//           src={ceoImage}
//           alt="Usama Zeeshan"
//           className="h-full object-contain drop-shadow-[0_0_40px_rgba(34,197,94,0.4)] md:drop-shadow-[0_0_80px_rgba(34,197,94,0.4)] transition-all duration-300"
//         />

//         {/* BADGE */}
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute right-[5%] md:right-[10%] top-[20%] md:top-1/4 p-3 md:p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hidden sm:block"
//         >
//           <p className="text-green-400 font-mono text-xs md:text-sm">
//             7+ Years Exp.
//           </p>
//           <p className="text-[10px] md:text-xs text-gray-400">
//             Mastering Tech
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* TEXT */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         className="absolute bottom-16 md:bottom-32 z-30 text-center px-2"
//       >
//         <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-2">
//           USAMA ZEESHAN
//         </h2>

//         <div className="flex flex-wrap gap-2 md:gap-4 justify-center text-green-500 font-mono text-sm sm:text-base md:text-lg">
//           <span>DEVELOPER</span>
//           <span>•</span>
//           <span>ARCHITECT</span>
//           <span>•</span>
//           <span>Product Manager</span>
//         </div>
//       </motion.div>

//       {/* SCROLL INDICATOR */}
//       <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40">
//         <div className="w-[2px] h-10 md:h-16 bg-gradient-to-b from-green-500 to-transparent animate-pulse" />
//       </div>
//     </section>
//   );
// }

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ceoImage from "../assets/u3-removebg-preview.png";

// ---------------- TYPEWRITER ----------------
const useTypewriter = (words, speed = 90) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  return words[index].substring(0, subIndex);
};

export function Hero() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 18 });

  const text = useTypewriter([
    "Scalable Systems.",
    "Modern Web Apps.",
    "Smart UI/UX.",
    "Digital Products.",
  ]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 40);
    mouseY.set((e.clientY / innerHeight - 0.5) * 40);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#070A0F] text-white overflow-hidden px-6 pt-24"
    >

      {/* ---------------- BACKGROUND ---------------- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[140px]" />

        <motion.h1
          style={{ x: smoothX }}
          className="absolute inset-0 flex items-center justify-center text-[18vw] font-black text-white/[0.03] tracking-widest select-none"
        >
          CEO
        </motion.h1>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-400 tracking-[0.3em] uppercase text-xs mb-6">
             Product Manager
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05]">
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              {text}
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-lg leading-relaxed">
            I am the <span className="text-white font-semibold">Product Manager</span> of a modern software house,
            leading innovative digital solutions, scalable products, and high-performance systems
            for global clients.
          </p>

          {/* CTA */}
          {/* <div className="flex gap-4 mt-8">
            <button className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold hover:scale-105 transition">
              Contact Me
            </button>
            <button href="#projects" className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
              View Projects
            </button>
          </div> */}

          <div className="flex gap-4 mt-8">
  {/* Contact Button */}
  <button className="px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
    Contact Me
  </button>

  {/* View Projects Link (Changed to 'a' tag) */}
  <a 
    href="#projects" 
    className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center text-white font-medium hover:border-white/30"
  >
    View Projects
  </a>
</div>

          {/* STATS */}
          <div className="flex gap-10 mt-12 border-t border-white/10 pt-8">
            {[
              ["5+", "Years Leadership"],
              ["50+", "Projects Delivered"],
              ["100%", "Client Trust"],
            ].map(([val, label], i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold">{val}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center z-10">
          <motion.div style={{ x: smoothX, y: smoothY }} className="relative">

            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-2xl rounded-full" />

            {/* Image */}
            <img
              src={ceoImage}
              className="relative w-[380px] md:w-[450px] drop-shadow-2xl"
            />

            {/* BADGES */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-10 -left-10 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl"
            >
              👑 Technical Product Manager
            </motion.div>

            {/* <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-16 -right-10 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl"
            >
              
            </motion.div> */}

          </motion.div>
        </div>
      </div>
    </section>
  );
}