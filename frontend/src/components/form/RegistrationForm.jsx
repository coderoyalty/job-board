import React from "react";
import {
  Stack,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
  RadioGroup,
  Radio,
  Divider,
  Text,
  Link as ChakraLink,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetchData } from "../../api";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

const InfoIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={"w-5 h-5 inline-block " + className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  );
};

const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
  <span ref={ref} {...rest} className="inline">
    {children}
  </span>
));

const CustomToolTip = ({ children, label = "hello 😹" }) => (
  <Tooltip
    hasArrow
    label={label}
    placement="auto"
    openDelay={350}
    closeDelay={500}
  >
    <CustomCard>{children}</CustomCard>
  </Tooltip>
);

const RegistrationForm = ({ role = "candidate" }) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async (values) => {
    setLoading(true);

    const body = {
      ...values,
    };

    try {
      const response = await fetchData("/auth/register", "POST", body);

      formik.resetForm({ email: "", password: "", role });

      if (!response.ok) {
        toast({
          title: "Account Creation Failed",
          description: response.data.message,
          status: "error",
          isClosable: true,
          duration: 2000,
          id: "signupFormToast",
        });
      } else {
        toast({
          title: "Account Created",
          description: "We've created an account for you.",
          status: "success",
          isClosable: true,
          duration: 3000,
          onCloseComplete: () => {
            navigate("/login", {
              replace: true,
            });
          },
        });
      }
    } catch (err) {
      toast({
        title: "Account Creation Failed",
        description: "Couldn't communicate with the backend",
        status: "error",
        isClosable: true,
        duration: 3000,
        onCloseComplete: () => {},
        id: "signupFormToast",
      });
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", role: role },
    onSubmit: handleSubmit,
  });

  return (
    <Stack direction="column" spacing={4} className="px-4 py-0">
      <Heading textAlign="center">Create Account</Heading>
      <Box as="form" onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="role">Role</FormLabel>

            <RadioGroup
              value={formik.values.role}
              onChange={(value) => {
                formik.handleChange("role")(value);
              }}
            >
              <Stack direction="row" justifyContent={"space-between"}>
                <Radio value="candidate" flexGrow={1}>
                  <CustomToolTip label="candidates can only apply for jobs">
                    Candidate
                  </CustomToolTip>
                </Radio>
                <Radio value="employer" flexGrow={1}>
                  <CustomToolTip label="employers cannot apply but post jobs">
                    Employer
                  </CustomToolTip>
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button colorScheme="whatsapp" type="submit" isLoading={loading}>
            Create Account
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Text className="text-center">
        Already have an account?{" "}
        <ChakraLink color="teal.500" as={ReactRouterLink} to="/login">
          login.
        </ChakraLink>
      </Text>
    </Stack>
  );
};

export default RegistrationForm;
