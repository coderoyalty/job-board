/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";
import "./appreciation.css";

const Appreciation = ({ text, name }) => {
  return (
    <Box
      maxW="md"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      m={4}
      className="appreciation__preview bg-slate-900 text-sky-200"
    >
      <Text className="text">{text}</Text>
      <span className="block text-right text-base font-semibold">{name}.</span>
    </Box>
  );
};

export default Appreciation;
