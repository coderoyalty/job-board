import React from "react";
import { Box, Container } from "@chakra-ui/react";
import CandidateRegistrationForm from "../components/form/CandidateRegistrationForm";
import CandidateInformationForm from "../components/form/CandidateInformationForm";

const CandidateSignup = () => {
  const [progress, setRegistrationProgress] = React.useState(false);

  return (
    <Box
      as="section"
      className="w-full min-h-screen flex justify-center items-center"
    >
      <Container
        maxW="sm"
        className="text-white bg-[#292e23] rounded-lg shadow-md px-4 py-8"
      >
        {progress !== true ? (
          <CandidateRegistrationForm
            setRegistrationProgress={setRegistrationProgress}
          />
        ) : (
          <CandidateInformationForm />
        )}
      </Container>
    </Box>
  );
};

export default CandidateSignup;
