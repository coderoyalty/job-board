/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";

const Appreciation = ({ text, name }) => {
  return (
    <Box
      maxW="md"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      m={4}
      className="bg-slate-900 text-sky-200"
    >
      <Text>
        {text}
        <span className="block text-right text-base font-semibold">
          {name}.
        </span>
      </Text>
    </Box>
  );
};

export default Appreciation;
