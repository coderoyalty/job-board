import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import axios from "../../api/axios";

// eslint-disable-next-line react/prop-types
function EditorForm({ description, resetDescription }) {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast({
    status: "loading",
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const toastId = toast({
      title: "Create a new job listing",
      description: "Creating job-listing",
    });

    const body = {
      ...values,
      description,
    };

    try {
      await axios.post("/jobs", body);
      toast.close(toastId);
      toast({
        isClosable: true,
        status: "success",
        description: "Job-listing creation is successful",
      });
      formik.resetForm({
        title: "",
        company: "",
        location: "",
        salary: "",
      });

      resetDescription();
    } catch (err) {
      toast.close(toastId);

      toast({
        status: "error",
        description: "Couldn't create the job-listing",
      });
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Stack direction="column" spacing={6} className="p-4">
        <Heading textAlign="center">Candidate Information</Heading>
        <Box as="form" onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Company</FormLabel>
              <Input
                type="text"
                name="company"
                id="company"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                id="location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Salary</FormLabel>
              <Input
                type="number"
                name="salary"
                id="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
              />
              <FormHelperText>
                <TbCurrencyNaira />
                Salary in naira (I-LUV-9JA)
              </FormHelperText>
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
    </>
  );
}

export default EditorForm;
