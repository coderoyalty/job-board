import {
  Container,
  Stack,
  HStack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React from "react";
import UserRegistrationContext from "../contexts/UserRegistrationContext";
import UserRegistrationForm from "../components/form/UserRegistrationForm";

const AdditionalInformationForm = () => {
  const [showAdditionalFields, setShow] = React.useState(false);
  const FormField1 = () => {
    return (
      <>
        <FormControl isRequired>
          <FormLabel>Contact Name</FormLabel>
          <Input type="text" name="contactName" id="contactName" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="companyName">Company Name</FormLabel>
          <Input type="text" name="companyName" id="companyName" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="companyWebsite">Company Website</FormLabel>
          <Input type="url" name="companyWebsite" id="companyWebsite" />
          <FormHelperText>
            Use the company LinkedIn URL if there's no website.
          </FormHelperText>
        </FormControl>
      </>
    );
  };

  const FormField2 = () => {
    return (
      <>
        <FormControl isRequired>
          <FormLabel htmlFor="companyName">Company Location</FormLabel>
          <Input type="text" name="companyLocation" id="companyLocation" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="companyDesc">Company Description</FormLabel>
          <Textarea name="companyDesc" id="companyDesc" />
        </FormControl>
      </>
    );
  };
  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Additional Information</Heading>
      <Box as="form">
        <Stack direction={"column"} spacing={4}>
          {!showAdditionalFields ? <FormField1 /> : <FormField2 />}

          {/* <ButtonGroup> */}
          <HStack>
            <IconButton
              isDisabled={!showAdditionalFields}
              icon={<ArrowLeftIcon />}
              id="leftNavBtn"
              w={"50%"}
              variant={"outline"}
              colorScheme="telegram"
              onClick={() => {
                setShow(false);
              }}
            />
            <IconButton
              isDisabled={showAdditionalFields}
              icon={<ArrowRightIcon />}
              id="rightNavBtn"
              w={"50%"}
              variant={"outline"}
              colorScheme="telegram"
              onClick={() => {
                setShow(true);
              }}
            />
          </HStack>
          <Button
            colorScheme="twitter"
            type="submit"
            isDisabled={!showAdditionalFields}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

const EmployerSignup = () => {
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
          {isSecondStep === 0 ? (
            <UserRegistrationForm />
          ) : (
            <AdditionalInformationForm />
          )}
        </UserRegistrationContext.Provider>
      </Container>
    </Box>
  );
};

export default EmployerSignup;
