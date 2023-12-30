import React from "react";
import ReactQuillWrapper from "./ReactQuillWrapper";
import {
  Container,
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
export default function () {
  const [text, setText] = React.useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Container>
        <h1 className="text-3xl font-semibold py-4 text-center">
          Quill React Editor
        </h1>
        <ReactQuillWrapper {...{ text, setText }} className="bg-slate-400" />
        <div className="m-8">
          <Center>
            <Button onClick={onOpen}>Submit</Button>
          </Center>
        </div>
      </Container>
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
