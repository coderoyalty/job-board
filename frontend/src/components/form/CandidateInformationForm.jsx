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
} from "@chakra-ui/react";

const CandidateInformationForm = () => {
  const FormField1 = () => {
    return (
      <>
        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input type="text" name="location" id="location" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="resume">Resume</FormLabel>
          <Input type="file" name="resume" id="resume" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="skills">Skills</FormLabel>
          <Textarea resize={"none"} type="text" name="skills" id="skills" />
          <FormHelperText>Use comma to seperate your skills.</FormHelperText>
        </FormControl>
      </>
    );
  };

  return (
    <Stack direction="column" spacing={6} className="p-4">
      <Heading textAlign="center">Additional Information</Heading>
      <Box as="form">
        <Stack direction={"column"} spacing={4}>
          {/* {!showAdditionalFields ? <FormField1 /> : <FormField2 />} */}

          <FormField1 />

          {/* <ButtonGroup> */}
          {/* <HStack>
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
          </HStack> */}
          <Button
            colorScheme="twitter"
            type="submit"
            // isDisabled={!showAdditionalFields}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CandidateInformationForm;
