import React from "react";
import ReactQuillWrapper from "../ReactQuillWrapper";
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

import EditorForm from "./EditorForm";

export default function Editor() {
  const [text, setText] = React.useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const resetDescription = () => {
    setText("");
  };
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
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditorForm
              description={text}
              resetDescription={resetDescription}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
