// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "./dashboard/DashboardLayout";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  // Button,
  useDisclosure,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import CandidateInformationForm from "./form/CandidateInformationForm";
import EmployerInformationForm from "./form/EmployerInformationForm";

const Dashboard = () => {
  const { userData } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  React.useEffect(() => {
    if (!userData) {
      return;
    }
    const role = userData.user.role;
    console.log(role);
    if (userData[role] === null) {
      onOpen();
    }
    console.log(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <>
      <DashboardLayout>
        <Outlet />
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          onCloseComplete={() => {
            console.log(userData);
          }}
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {userData?.user.role === "candidate" && (
                <CandidateInformationForm />
              )}
              {userData?.user.role === "employer" && (
                <EmployerInformationForm />
              )}
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
