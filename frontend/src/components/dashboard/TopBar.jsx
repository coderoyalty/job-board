import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, Flex } from "@chakra-ui/react";

export default function TopBar({ showNav, setShowNav }) {
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] bg-[#C08261] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
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
            <Link
              href="#"
              className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <Link
              href="#"
              className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
            >
              <CreditCardIcon className="h-4 w-4 mr-2" />
              Billing
            </Link>
            <Link
              href="#"
              className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
            >
              <UserIcon className="h-5 w-5" />
              Account
            </Link>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
