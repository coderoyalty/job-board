import {
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
  Text,
  Container,
  Box,
  Input,
  InputGroup,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Collapse,
  Button,
} from "@chakra-ui/react";

import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";

const jobTypes = {
  default: "default",
  full: "full-time",
  part: "part-time",
  contract: "contract",
  intern: "intern",
};

const experience = {
  default: "default",
  fresh: "fresh",
  lvl1: "lvl-1",
  lvl2: "lvl-2",
  lvl3: "lvl-3",
};

const JobFilterForm = () => {
  const size = useWindowSize();
  const widthLimit = 768;
  const [isFormOpen, setFormOpen] = React.useState(false);

  const JobTypeGroup = () => {
    return (
      <FormControl>
        <FormLabel>
          <Text className="font-bold">Job Types</Text>
        </FormLabel>
        <RadioGroup colorScheme="teal" defaultValue={jobTypes.default}>
          <Stack direction={"column"} spacing={2} className="font-semibold">
            <Radio id="default" value={jobTypes.default}>
              All
            </Radio>
            <Radio id={jobTypes.full} value={jobTypes.full}>
              Full-Time
            </Radio>
            <Radio value={jobTypes.part} id={jobTypes.part}>
              Part-Time
            </Radio>
            <Radio value={jobTypes.contract} id={jobTypes.contract}>
              Contractor
            </Radio>
            <Radio value={jobTypes.intern} id={jobTypes.intern}>
              Intern
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    );
  };

  const JobExperienceGroup = () => {
    return (
      <FormControl>
        <FormLabel>
          <Text className="font-bold">Experience Level</Text>
        </FormLabel>
        <RadioGroup
          colorScheme="teal"
          defaultValue={experience.default}
          className="font-semibold"
        >
          <Stack direction={"column"} spacing={2}>
            <Radio value={experience.default}>All</Radio>
            <Radio value={experience.fresh} id="experience-fresh">
              Fresh
            </Radio>
            <Radio value={experience.lvl1} id={experience.lvl1}>
              1-2 years
            </Radio>
            <Radio value={experience.lvl2} id={experience.lvl2}>
              2-5 years
            </Radio>
            <Radio value={experience.lvl3} id={experience.lvl3}>
              5+ years
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Box as="aside" className="w-[324px] sm:w-[424px] md:max-w-[482px] mx-2">
      <Container className="bg-white p-4 rounded-md">
        {/* Search input */}
        <FormControl mb={4}>
          <FormLabel>Search:</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Search Jobs by titles, location..."
            />
          </InputGroup>
        </FormControl>

        {size.width < widthLimit ? (
          <>
            <Button
              w="100%"
              colorScheme="twitter"
              onClick={() => setFormOpen(!isFormOpen)}
            >
              {isFormOpen ? "Close" : "Open"} Filter Menu
            </Button>
            <Collapse in={isFormOpen}>
              {/* Tabs for different sections on smaller screens */}
              <Tabs isFitted>
                <TabList>
                  <Tab>Job Types</Tab>
                  <Tab>Experience Level</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* Job type radio group */}
                    <JobTypeGroup />
                  </TabPanel>
                  <TabPanel>
                    {/* Experience level radio group */}
                    <JobExperienceGroup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Collapse>
          </>
        ) : (
          <>
            <JobTypeGroup />
            <JobExperienceGroup />
          </>
        )}
      </Container>
    </Box>
  );
};

export default JobFilterForm;
