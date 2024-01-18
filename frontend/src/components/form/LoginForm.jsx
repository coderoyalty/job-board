/* eslint-disable react/no-unescaped-entities */
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
  Divider,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async (values) => {
    setLoading(true);
    const body = {
      ...values,
    };

    try {
      // const response = await fetchData("/auth/login", "POST", body);
      const response = await axios.post("/auth/login", body);
      console.log(response.data);
      toast({
        title: "Sign-In Success",
        description: "We've logged you in.",
        status: "success",
        isClosable: true,
        duration: 3000,
        onCloseComplete: () => {
          navigate("/dashboard", { replace: true });
        },
      });
    } catch (err) {
      toast({
        title: "Sign-In Failed",
        description: "We couldn't sign-in",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }

    formik.resetForm({ email: "", password: "" });
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
  });

  return (
    <Stack direction="column" spacing={4} className="px-4 py-2">
      <Heading textAlign="center">Sign In</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={4}>
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
            Login
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Text className="text-center">
        Don't have an account?
        <ChakraLink color="teal.500" as={ReactRouterLink} to="/signup">
          register.
        </ChakraLink>
      </Text>
    </Stack>
  );
};

export default LoginForm;
