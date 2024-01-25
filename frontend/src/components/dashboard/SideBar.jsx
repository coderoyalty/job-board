import { forwardRef } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { MdOutlineCreate } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = forwardRef(({ showNav }, ref) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {showNav && (
        <motion.div
          ref={ref}
          className="fixed w-56 h-full bg-[#b2c061] shadow-sm z-[100]"
          initial={{ x: -56 }}
          animate={{ x: 0 }}
          exit={{ x: -56, transition: { delay: 0.2 } }}
        >
          <div className="flex justify-center mt-6 mb-14">
            <Avatar size="xl" name="John Doe" src="" />
          </div>

          <div className="flex flex-col font-semibold">
            <Link
              to="/dashboard"
              className={`pl-6 py-3 mx-5 text-xl rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                location.pathname === "/"
                  ? "bg-orange-100 text-orange-500"
                  : "text-cyan-700 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="mr-2">
                <HomeIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Home</p>
              </div>
            </Link>
            <Link
              to="/profile"
              className={`pl-6 py-3 mx-5 text-xl  rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                location.pathname === "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-cyan-700 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="mr-2">
                <FaUserCircle className="h-5 w-5" />
              </div>
              <div>
                <p>Profile</p>
              </div>
            </Link>
            <Link
              to="/dashboard/create"
              className={`pl-6 py-3 mx-5 text-xl  rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                location.pathname === "/account"
                  ? "bg-orange-100 text-orange-500"
                  : "text-cyan-700 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="mr-2">
                <MdOutlineCreate className="h-5 w-5" />
              </div>
              <div>
                <p>Create Job</p>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
