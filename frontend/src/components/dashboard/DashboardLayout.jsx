/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(innerWidth <= 640);
      setShowNav(innerWidth > 640 || !isMobile);
    }

    // handleResize(); // Initial check

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
      <AnimatePresence mode="wait">
        {showNav && (
          <motion.div
            initial={{ x: 0 }}
            animate={showNav ? "open" : "closed"}
            transition={{ duration: 0.5 }}
            variants={variants}
            exit={{ x: 0 }}
          >
            <SideBar showNav={showNav} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className={`pt-14 ${showNav && !isMobile ? "pl-[15rem]" : ""}`}
        initial={{ paddingLeft: 0 }}
        animate={{ paddingLeft: showNav && !isMobile ? "15rem" : 0 }}
        transition={{ duration: 0.15 }} // Animation duration
      >
        <div className="px-4 md:px-16 py-4">{children}</div>
      </motion.main>
    </>
  );
}
