import React from "react";
import { Box, Container } from "@chakra-ui/react";
import RegistrationForm from "../components/form/RegistrationForm";

const CandidateSignup = () => {
  const role = "candidate";

  return (
    <Box
      as="section"
      className="w-full min-h-screen flex justify-center items-center"
    >
      <Container
        maxW="sm"
        className="text-white bg-[#292e23] rounded-lg shadow-md px-4 py-8"
      >
        <RegistrationForm role={role} />
      </Container>
    </Box>
  );
};

export default CandidateSignup;
