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

const CandidateInformationForm = () => {
  const [content, setContent] = useState("");
  const [skills, setSkills] = useState([]);
  const debounceContent = useDebounce(content, 300);

  const handleTextareaChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  React.useEffect(() => {
    if (debounceContent) {
      let skills = debounceContent.split(/[,;\n]+/);
      skills = skills.map((skill) => skill.trim()).filter(Boolean);
      setSkills(skills);
    }
  }, [debounceContent]);

  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Candidate Information</Heading>
      <Box as="form">
        <Stack direction={"column"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" id="location" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="skills">Skills</FormLabel>
            <Textarea
              resize={"none"}
              type="text"
              name="skills"
              id="skills"
              placeholder="React, Technical Writing, C++ etc."
              value={content}
              onChange={handleTextareaChange}
            />
            <FormHelperText>Use comma to seperate your skills.</FormHelperText>
            <Flex mt={4} gap={2} flexWrap={"wrap"} alignItems={"center"}>
              {skills.map((tag, idx) => (
                <Tag colorScheme="whatsapp" key={`${tag}-${idx}`} size={"md"}>
                  {tag}
                </Tag>
              ))}
            </Flex>
          </FormControl>
          <Button colorScheme="twitter" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CandidateInformationForm;
