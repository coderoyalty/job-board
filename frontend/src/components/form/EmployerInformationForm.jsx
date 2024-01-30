import {
  Stack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { AxiosError } from "axios";

// eslint-disable-next-line react/prop-types
const EmployerInformationForm = ({ onClose }) => {
  const { userData, login } = useAuth();
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    const userId = userData.user.id;

    try {
      await axios.post(`/users/${userId}/role`, { ...values });
      onClose();
      login(userData.data.data);
    } catch (err) {
      if (err instanceof AxiosError);
    }

    formik.resetForm({
      contactName: "",
      companyName: "",
      companyLocation: "",
      companyDescription: "",
    });
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      contactName: "",
      companyName: "",
      companyLocation: "",
      companyDescription: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Employer Information</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Contact Name</FormLabel>
            <Input
              type="text"
              name="contactName"
              id="contactName"
              value={formik.values.contactName}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="companyName">Company Location</FormLabel>
            <Input
              type="text"
              name="companyLocation"
              id="companyLocation"
              value={formik.values.companyLocation}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="companyDesc">Company Description</FormLabel>
            <Textarea
              name="companyDescription"
              id="companyDescription"
              value={formik.values.companyDescription}
              onChange={formik.handleChange}
            />
          </FormControl>

          <Button
            colorScheme="twitter"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default EmployerInformationForm;
