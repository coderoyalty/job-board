import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box
        as="footer"
        bg="gray.800"
        color="white"
        py={3}
        mt={12}
        textAlign="center"
        borderTop="1px"
        borderTopColor="gray.700"
      >
        <Text fontSize="sm">
          © {new Date().toISOString().substring(0, 4)} Joard. All rights
          reserved.
        </Text>
      </Box>
    </>
  );
};
export default Footer;
