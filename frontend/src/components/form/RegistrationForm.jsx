import React from "react";
import {
  Stack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetchData } from "../../api";

const RegistrationForm = ({ role }) => {
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      setLoading(true);

      const body = {
        ...values,
        role,
      };

      const response = await fetchData("/auth/register", "POST", body);

      if (!response.ok) {
        formik.values = { email: "", password: "" };

        toast({
          title: "Account Creation Failed",
          description: response.data.message,
          status: "error",
          isClosable: true,
          duration: 3000,
          onCloseComplete: () => {},
          id: "signupFormToast",
        });
      } else {
        toast({
          title: "Account Created",
          description: "We've created an account for you.",
          status: "success",
          isClosable: true,
          duration: 3000,
          onCloseComplete: () => {},
        });
      }

      setLoading(false);
    },
  });

  return (
    <Stack direction="column" spacing={6} className="p-4">
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

export default RegistrationForm;
