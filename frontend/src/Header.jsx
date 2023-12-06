import {
  Box,
  Stack,
  Flex,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

const HeaderContext = React.createContext();

const HeaderProvider = ({ children }) => {
  const menuDisclosure = useDisclosure();
  const navigate = useNavigate();
  const size = useWindowSize();
  const widthLimit = 780;
  React.useEffect(() => {
    if (size.width >= widthLimit && menuDisclosure.isOpen) {
      menuDisclosure.onToggle();
    }
  }, [size, menuDisclosure.isOpen]);
  return (
    <HeaderContext.Provider
      value={{ menuDisclosure, navigate, size, widthLimit }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

const DefaultHeader = () => {
  const { size, navigate, menuDisclosure, widthLimit } =
    React.useContext(HeaderContext);

  const NavigationLinks = () => {
    return (
      <Box>
        <Stack
          direction={size.width < widthLimit ? "column" : "row"}
          spacing={4}
        >
          <Link
            to="/"
            className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/job-offer"
            className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-white"
          >
            Browse Job
          </Link>
          <Link
            to="/"
            className="transition-all text-xl font-semibold text-[#9A3B3B] hover:text-white"
          >
            Contact
          </Link>
        </Stack>
      </Box>
    );
  };

  const CTAButtons = () => {
    return (
      <Box>
        <ButtonGroup>
          <Stack direction={size.width < widthLimit ? "column" : "row"}>
            <Button variant="solid" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              colorScheme="whatsapp"
              variant="solid"
              onClick={() => navigate("/employer-signup")}
            >
              Post a Job
            </Button>
          </Stack>
        </ButtonGroup>
      </Box>
    );
  };

  return (
    <Box as="nav" w={"100%"}>
      <Flex justify="space-between" align="center">
        <Heading className="max-md:text-2xl text-3xl text-[#F2ECBE] font-bold uppercase">
          Joard
        </Heading>
        {/*  */}
        {size.width >= widthLimit ? (
          <>
            <NavigationLinks />
            <CTAButtons />
          </>
        ) : (
          <>
            <IconButton
              colorScheme="whatsapp"
              icon={<HamburgerIcon />}
              onClick={menuDisclosure.onToggle}
            />
          </>
        )}
      </Flex>
      <Drawer
        isOpen={menuDisclosure.isOpen}
        placement="right"
        size={"xs"}
        onClose={menuDisclosure.onClose}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="#C08261">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex
              height="100%"
              direction="column"
              justify="center"
              align="space-between"
              gap={4}
            >
              <NavigationLinks />
              <CTAButtons />
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const Header = () => {
  return (
    <Box as="header" className="sticky top-0 bg-[#C08261] z-50 font-poppins">
      <Box className=" mx-auto max-w-[85%] px-2 py-4 flex items-center justify-between">
        <DefaultHeader />
      </Box>
    </Box>
  );
};

const HeaderComponent = () => {
  return (
    <HeaderProvider>
      <Header />
    </HeaderProvider>
  );
};

export default HeaderComponent;
