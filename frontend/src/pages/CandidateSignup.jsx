import React from "react";
import { Box, Container } from "@chakra-ui/react";
import UserRegistrationForm from "../components/form/UserRegistrationForm";
import UserRegistrationContext from "../contexts/UserRegistrationContext";

const CandidateSignup = () => {
  const [isSecondStep, setRegistrationStep] = React.useState(0);

  return (
    <Box
      as="section"
      className="w-full min-h-screen flex justify-center items-center"
    >
      <Container
        maxW="sm"
        className="text-white bg-[#292e23] rounded-lg shadow-md px-4 py-8"
      >
        <UserRegistrationContext.Provider
          value={{ isSecondStep, setRegistrationStep }}
        >
          <UserRegistrationForm />
        </UserRegistrationContext.Provider>
      </Container>
    </Box>
  );
};

export default CandidateSignup;
