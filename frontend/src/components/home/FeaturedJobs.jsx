import { Container, Heading, Box } from "@chakra-ui/react";
import JobCard from "../job/JobCard";

const FeaturedJobs = () => {
  return (
    <>
      <Container as="section" mt={24}>
        <Heading className="text-center text-neutral-200">
          Featured Jobs
        </Heading>
        <Box className="mt-5 flex flex-col justify-center items-center gap-3 flex-wrap">
          <JobCard />
          <JobCard />
          <JobCard />
        </Box>
      </Container>
    </>
  );
};

export default FeaturedJobs;
