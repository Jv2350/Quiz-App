import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Box, Heading, Text, Button, Grid, GridItem, Badge } from "@chakra-ui/react";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get("/quizzes");
        setQuizzes(res.data.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);
  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={8} color="teal.600">
        Available Quizzes
      </Heading>

      <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
        {quizzes.map((quiz) => (
          <GridItem
            key={quiz._id}
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
            transition="all 0.2s"
          >
            <Heading size="md" mb={2} color="teal.500">
              {quiz.title}
            </Heading>
            <Badge colorScheme="purple" mb={3}>
              {quiz.category || "General"}
            </Badge>
            <Text noOfLines={3} mb={4}>
              {quiz.description || "No description available."}
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => alert(`Starting quiz: ${quiz.title}`)}
            >
              Start Quiz
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
