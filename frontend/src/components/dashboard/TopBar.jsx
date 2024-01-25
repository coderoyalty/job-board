import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { IoExitOutline } from "react-icons/io5";
import axios from "../../api/axios";

const MenuComponent = () => {
  const navigate = useNavigate();
  const toast = useToast({
    id: "#menu_component_toast",
    duration: 2500,
  });

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await axios.get("/auth/logout");

      toast({
        title: "You've logged out.",
        description: "You'll be redirected soon!",
        status: "success",
        onCloseComplete: () => {
          navigate("/", { replace: true });
        },
      });
    };

    logout();
  };

  return (
    <>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu>
          <MenuButton>
            <Flex align={"center"} gap={2}>
              <Avatar size={"sm"} name="John Doe" src="" />
              <span className="hidden md:block font-medium text-gray-700">
                Akanni
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Flex>
          </MenuButton>
          <MenuList>
            <Link className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center">
              <UserIcon className="h-5 w-5 mr-1" />
              Account
            </Link>
            <Link
              className="flex hover:bg-red-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
              onClick={handleLogout}
            >
              <IoExitOutline className="h-5 w-5 mr-1" /> Logout
            </Link>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
export default function TopBar({ showNav, setShowNav }) {
  return (
    <div
      className={`fixed top-0 left-0 z-[99] w-full h-16 flex justify-between items-center transition-all duration-[400ms] bg-[#C08261] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <MenuComponent />
    </div>
  );
}
