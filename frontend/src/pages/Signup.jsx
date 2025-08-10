import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data } = await API.post("/auth/register", { 
        name, 
        email, 
        password,
        role 
      });
      
      toast({
        title: "Account created successfully",
        description: "You can now login with your credentials",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      p={8} 
      maxWidth="500px" 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="lg" 
      mx="auto" 
      mt={10}
      bg="white"
    >
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center" size="xl" color="teal.500">
          Create Account
        </Heading>
        
        <form onSubmit={handleSignup}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your full name"
                focusBorderColor="teal.400"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                focusBorderColor="teal.400"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create a password"
                focusBorderColor="teal.400"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm your password"
                focusBorderColor="teal.400"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <RadioGroup value={role} onChange={setRole}>
                <HStack spacing={6}>
                  <Radio value="user" colorScheme="teal">User</Radio>
                  <Radio value="admin" colorScheme="teal">Admin</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
              loadingText="Creating Account"
              w="100%"
              mt={2}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        
        <Text textAlign="center">
          Already have an account?{" "}
          <ChakraLink as={Link} to="/login" color="teal.500" fontWeight="bold">
            Log In
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}