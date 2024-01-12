import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(innerWidth <= 640);
      setShowNav(innerWidth > 640 || !isMobile);
    }

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      {/* <AnimatePresence> */}
      {showNav && (
        <motion.div
          initial={{ x: 0 }}
          animate={showNav ? "open" : "closed"}
          transition={{ delayChildren: 0.8, duration: 1.2 }}
          variants={variants}
        >
          <SideBar showNav={showNav} />
        </motion.div>
      )}
      {/* </AnimatePresence> */}
      <main
        className={`pt-14 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16 py-4">{children}</div>
      </main>
    </>
  );
}
