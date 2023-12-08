import React from "react";
import {
  Stack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import UserRegistrationContext from "../../contexts/UserRegistrationContext";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Delay of ${ms} milliseconds completed`);
    }, ms);
  });
}

const UserRegistrationForm = () => {
  const context = React.useContext(UserRegistrationContext);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { contactName: "", companyName: "", companyLocation: "" },
    onSubmit: (values) => {
      setLoading(true);

      delay(1000).then(() => {
        alert(JSON.stringify(values, null, 4));
        context.setRegistrationStep(1);
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

export default UserRegistrationForm;
