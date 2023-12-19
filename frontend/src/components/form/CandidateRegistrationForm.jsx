import React from "react";
import { useFormik } from "formik";
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Delay of ${ms} milliseconds completed`);
    }, ms);
  });
}

const CandidateRegistrationForm = ({ setRegistrationProgress }) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { fullName: "", location: "" },
    onSubmit: (values) => {
      setLoading(true);

      delay(1000).then(() => {
        alert(JSON.stringify(values, null, 4));
        setRegistrationProgress(true);
        setLoading(false);
      });
    },
  });

  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Create An Account</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={6}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
          </FormControl>
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

export default CandidateRegistrationForm;
