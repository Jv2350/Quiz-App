import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";

export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const location = useLocation();
  
  React.useEffect(() => {
    // Simulate checking authentication
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
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
  
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
