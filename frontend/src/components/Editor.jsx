import React from "react";
import ReactQuillWrapper from "./ReactQuillWrapper";
import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

// TODO:
export default function Editor() {
  const [text, setText] = React.useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Box>
        <ReactQuillWrapper {...{ text, setText }} />
        <div className="m-2">
          <Center>
            <Button onClick={onOpen}>Submit</Button>
          </Center>
        </div>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
