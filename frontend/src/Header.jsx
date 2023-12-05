import { Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 bg-[#C08261] z-50 font-poppins">
      <div className=" mx-auto max-w-[800px] px-2 py-4 flex items-center justify-between">
        <h1 className="text-3xl text-[#F2ECBE] font-bold">Joard</h1>
        <nav>
          <Stack direction="row" spacing={2}>
            <Link
              to="/"
              className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-[#E2C799]"
            >
              Home
            </Link>
            <Link
              to="/job-offer"
              className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-[#E2C799]"
            >
              Jobs
            </Link>
            <Link
              to="/"
              className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-[#E2C799]"
            >
              Sign-Up
            </Link>
          </Stack>
        </nav>
      </div>
    </header>
  );
};

export default Header;
