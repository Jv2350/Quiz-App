import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Center, Spinner, useToast } from "@chakra-ui/react";

export default function AdminRoute({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const location = useLocation();
  const toast = useToast();
  
  React.useEffect(() => {
    const checkAdminAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      if (!token) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      if (role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      
      setIsAdmin(role === "admin");
      setIsLoading(false);
    };
    
    checkAdminAuth();
  }, [toast]);
  
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Center>
    );
  }
  
  return isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
