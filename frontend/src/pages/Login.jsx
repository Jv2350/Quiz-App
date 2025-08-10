import React, { useState } from "react";
import API from "../api/api.js";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  Link as ChakraLink,
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name || 'User'}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
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
          Welcome Back
        </Heading>
        
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
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
                placeholder="Enter your password"
                focusBorderColor="teal.400"
              />
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
              loadingText="Logging In"
              w="100%"
              mt={2}
            >
              Log In
            </Button>
          </Stack>
        </form>
        
        <Text textAlign="center">
          Don't have an account?{" "}
          <ChakraLink as={RouterLink} to="/signup" color="teal.500" fontWeight="bold">
            Sign Up
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}
