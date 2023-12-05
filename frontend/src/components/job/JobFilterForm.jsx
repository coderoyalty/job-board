import {
  FormControl,
  FormLabel,
  Stack,
  VStack,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";

const JobFilterForm = () => {
  return (
    <>
      <aside className="w-[282px] h-[400px] bg-white sticky max-sm:relative sm:top-16 max-sm:hidden p-4">
        <Text className="text-base font-bold">Filter</Text>
        <VStack spacing={2}>
          <FormControl>
            <FormLabel className="text-slate-700 font-semibold mb-2">
              Job Types
            </FormLabel>
            <RadioGroup colorScheme="teal" defaultValue={"all"}>
              <Stack direction={"column"} spacing={2}>
                <Radio value={"all"}>All</Radio>
                <Radio value={"full-time"}>Full-Time</Radio>
                <Radio value={"part-time"}>Part-Time</Radio>
                <Radio value={"contractor"}>Contractor</Radio>
                <Radio value={"intern"}>Intern</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Experience Level</FormLabel>
            <RadioGroup colorScheme="teal" defaultValue="fresh">
              <Stack direction={"column"} spacing={2}>
                <Radio value={"fresh"}>Fresh</Radio>
                <Radio value={"level-1"}>1-2 years</Radio>
                <Radio value={"level-2"}>2-5 years</Radio>
                <Radio value={"level-3"}>5+ years</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </VStack>
      </aside>
    </>
  );
};

export default JobFilterForm;
