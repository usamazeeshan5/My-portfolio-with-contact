
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
{/* 
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05]">
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              {text}
            </span>
          </h1> */}
          {/* Change this part in your "LEFT SIDE" section */}

<h1 className="text-4xl md:text-7xl font-black leading-[1.1]">
  Building <br />
  {/* The 'grid' container here acts as a "box" with a reserved height.
    h-[2.4em] ensures space for 2 lines on mobile so the layout never moves.
    md:h-[1.2em] switches to 1 line space for desktop.
  */}
  <span className="grid grid-cols-1 items-start h-[2.4em] md:h-[1.2em] overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
    <span className="block">
      {text}
      <span className="inline-block w-[4px] h-[1em] bg-emerald-400 ml-2 align-middle animate-pulse" />
    </span>
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
              ["7+", "Years Leadership"],
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
              className="absolute top-0 -left-10 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl"
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