import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Link,
  Avatar,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children, to }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("teal.50", "teal.900"),
    }}
    to={to}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  
  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4} boxShadow="sm">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box fontWeight="bold" fontSize="xl" color="teal.500">
            <RouterLink to="/">Quiz App</RouterLink>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink to={"/"}>Home</NavLink>
            {token && role === "admin" && (
              <NavLink to={"/add-quiz"}>Add Quiz</NavLink>
            )}
            {token && role === "admin" && (
              <NavLink to={"/admin"}>Admin Panel</NavLink>
            )}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={4}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          
          {token ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  bg="teal.500"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem as={RouterLink} to="/my-quizzes">My Quizzes</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={2}>
              <Button as={RouterLink} to="/login" variant="ghost" colorScheme="teal">
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/signup"
                colorScheme="teal"
                variant="solid"
              >
                Sign Up
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <NavLink to={"/"}>Home</NavLink>
            {token && role === "admin" && (
              <NavLink to={"/add-quiz"}>Add Quiz</NavLink>
            )}
            {token && role === "admin" && (
              <NavLink to={"/admin"}>Admin Panel</NavLink>
            )}
            {!token && (
              <>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/signup"}>Sign Up</NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
