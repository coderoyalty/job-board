import {
  Container,
  Box,
  Heading,
  Text,
  Center,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Container as="section" mt={4}>
      <Box mt={{ md: 36, base: 24 }}>
        <Heading
          color="white"
          className="text-center"
          fontSize={{ md: "xxx-large", base: "xx-large" }}
        >
          Find your Dream Job
        </Heading>
        <Text
          fontSize={{ md: "x-large", base: "large" }}
          className="text-center text-sky-300 mt-2"
        >
          Let us find your dream job for you. Over 10k+ employees had appreciate
          us. We provide Internships, Contracts, Full-Time, Part-Time and
          Freelancing opportunity.
        </Text>
        <Center>
          <ButtonGroup mt={8}>
            <Button
              colorScheme="whatsapp"
              onClick={() => navigate("/signup?role=employer")}
            >
              Post Jobs
            </Button>
            <Button
              colorScheme="twitter"
              onClick={() => navigate("/signup?role=candidate")}
            >
              Apply For Jobs
            </Button>
          </ButtonGroup>
        </Center>
      </Box>
    </Container>
  );
};

export default HeroSection;
