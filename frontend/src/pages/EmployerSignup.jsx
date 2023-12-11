import { Container, Box } from "@chakra-ui/react";
import React from "react";
import EmployerRegistrationForm from "../components/form/EmployerRegistrationForm";
import EmployerInformationForm from "../components/form/EmployerInformationForm";

const EmployerSignup = () => {
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
          <EmployerRegistrationForm
            setRegistrationProgress={setRegistrationProgress}
          />
        ) : (
          <EmployerInformationForm />
        )}
      </Container>
    </Box>
  );
};

export default EmployerSignup;
