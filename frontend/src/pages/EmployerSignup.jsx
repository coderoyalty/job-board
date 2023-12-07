import {
  Container,
  Stack,
  HStack,
  Heading,
  Text,
  Button,
  Checkbox,
  Divider,
  Link,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Delay of ${ms} milliseconds completed`);
    }, ms);
  });
}

const BaseLoginForm = () => {
  const context = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { contactName: "", companyName: "", companyLocation: "" },
    onSubmit: (values) => {
      setLoading(true);

      delay(1000).then(() => {
        alert(JSON.stringify(values, null, 4));
        context.setStep(1);
        setLoading(false);
      });
    },
  });

  return (
    <Stack direction="column" spacing={8} className="p-4">
      <Heading textAlign="center">Create An Account</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={6}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <Button colorScheme="whatsapp" type="submit" isLoading={loading}>
            Create Account
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

const EmployerDetailForm = () => {
  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Your Information</Heading>
      <Box as="form">
        <Stack direction={"column"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Contact Name</FormLabel>
            <Input type="text" name="contactName" id="contactName" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <Input type="text" name="companyName" id="companyName" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="companyName">Company Location</FormLabel>
            <Input type="text" name="companyLocation" id="companyLocation" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="companyLocation">Company Description</FormLabel>
            <Textarea name="companyLocation" id="companyLocation" />
          </FormControl>
          <Button colorScheme="twitter" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

const Context = React.createContext({
  step: 0,
  /**
   *
   * @param {React.SetStateAction<number>} value
   */
  setStep: (value) => {},
});

const EmployerSignup = () => {
  const [step, setStep] = React.useState(1);

  return (
    <Box
      as="section"
      className="w-full min-h-screen flex justify-center items-center"
    >
      <Container
        maxW="sm"
        className="text-white bg-[#292e23] rounded-lg shadow-md px-4 py-8"
      >
        <Context.Provider value={{ step, setStep }}>
          {step === 0 ? <BaseLoginForm /> : <EmployerDetailForm />}
        </Context.Provider>
      </Container>
    </Box>
  );
};

export default EmployerSignup;
