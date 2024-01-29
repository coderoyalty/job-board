import {
  Stack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Tag,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const CandidateInformationForm = ({ onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const { userData, login } = useAuth();
  const [skills, setSkills] = useState([]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      location: "",
      skills: "",
    },
    onSubmit: async (values) => {
      setLoading(true);

      let skills = values.skills.split(/[,;\n]+/);
      skills = skills.map((skill) => skill.trim()).filter(Boolean);

      const userId = userData.user.id;

      try {
        await axios.post(`/users/${userId}/role`, {
          ...values,
          skills,
        });

        onClose();
        login(userData.data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response);
        }
      }

      formik.resetForm({
        fullName: "",
        location: "",
        skills: "",
      });
      setLoading(false);
    },
  });
  const debounceSkills = useDebounce(formik.values.skills, 300);

  React.useEffect(() => {
    if (debounceSkills) {
      // split the skills using either ',' "\n", ";" as the splitter
      let skills = debounceSkills.split(/[,;\n]+/);
      // remove unnecessary whitespaces from the items
      // then filter by removing empty items
      skills = skills.map((skill) => skill.trim()).filter(Boolean);
      // convert the filtered-data to a tag
      setSkills(
        skills.map((tag, idx) => (
          <Tag colorScheme="whatsapp" key={`${tag}-${idx}`} size={"md"}>
            {tag}
          </Tag>
        ))
      );
    } else {
      // reset as empty
      setSkills([]);
    }
  }, [debounceSkills]);

  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Candidate Information</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={4}>
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
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              id="location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="skills">Skills</FormLabel>
            <Textarea
              resize={"none"}
              type="text"
              name="skills"
              id="skills"
              placeholder="React, Technical Writing, C++ etc."
              value={formik.values.skills}
              onChange={formik.handleChange}
            />
            <FormHelperText>Use comma to seperate your skills.</FormHelperText>
            <Flex mt={4} gap={2} flexWrap={"wrap"} alignItems={"center"}>
              {skills.map((skill) => skill)}
            </Flex>
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

export default CandidateInformationForm;
