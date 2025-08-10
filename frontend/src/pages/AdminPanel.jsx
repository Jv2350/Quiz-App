import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Card,
  CardBody,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import API from "../api/api.js";

export default function AdminPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalUsers: 0,
    totalAttempts: 0,
    averageScore: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [quizToDelete, setQuizToDelete] = useState(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch quizzes
        const quizzesRes = await API.get("/quizzes");
        setQuizzes(quizzesRes.data.data || []);
        
        // Fetch users (this endpoint would need to be implemented in the backend)
        try {
          const usersRes = await API.get("/auth/users");
          setUsers(usersRes.data.data || []);
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        }
        
        // Fetch attempts (this endpoint would need to be implemented in the backend)
        try {
          const attemptsRes = await API.get("/attempt");
          setAttempts(attemptsRes.data.data || []);
        } catch (error) {
          console.error("Error fetching attempts:", error);
          setAttempts([]);
        }
        
        // Calculate stats
        const totalQuizzes = quizzesRes.data.data?.length || 0;
        const totalUsers = users.length || 0;
        const totalAttempts = attempts.length || 0;
        
        // Calculate average score if there are attempts
        let averageScore = 0;
        if (totalAttempts > 0) {
          const totalScore = attempts.reduce(
            (acc, attempt) => acc + (attempt.score / attempt.total) * 100,
            0
          );
          averageScore = Math.round(totalScore / totalAttempts);
        }
        
        setStats({
          totalQuizzes,
          totalUsers,
          totalAttempts,
          averageScore,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast({
          title: "Error fetching data",
          description: error.response?.data?.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;
    
    try {
      await API.delete(`/quizzes/${quizToDelete}`);
      
      // Update the quizzes list
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizToDelete));
      
      toast({
        title: "Quiz deleted",
        description: "The quiz has been successfully deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting quiz",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setQuizToDelete(null);
      onClose();
    }
  };

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

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={8} color="teal.600">
        Admin Dashboard
      </Heading>
      
      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontSize="lg">Total Quizzes</StatLabel>
              <StatNumber fontSize="3xl" color="teal.500">{stats.totalQuizzes}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontSize="lg">Total Users</StatLabel>
              <StatNumber fontSize="3xl" color="purple.500">{stats.totalUsers}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontSize="lg">Quiz Attempts</StatLabel>
              <StatNumber fontSize="3xl" color="blue.500">{stats.totalAttempts}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontSize="lg">Average Score</StatLabel>
              <StatNumber fontSize="3xl" color="orange.500">{stats.averageScore}%</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Main Content Tabs */}
      <Tabs colorScheme="teal" variant="enclosed" isLazy>
        <TabList>
          <Tab fontWeight="semibold">Quizzes</Tab>
          <Tab fontWeight="semibold">Users</Tab>
          <Tab fontWeight="semibold">Attempts</Tab>
        </TabList>
        
        <TabPanels>
          {/* Quizzes Tab */}
          <TabPanel>
            <Flex justifyContent="flex-end" mb={4}>
              <Button
                as={RouterLink}
                to="/add-quiz"
                colorScheme="teal"
                leftIcon={<AddIcon />}
              >
                Add New Quiz
              </Button>
            </Flex>
            
            <Box overflowX="auto">
              <Table variant="simple" bg="white" boxShadow="sm" borderRadius="md">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Questions</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                      <Tr key={quiz._id}>
                        <Td fontWeight="medium">{quiz.title}</Td>
                        <Td>
                          <Badge colorScheme="purple">
                            {quiz.category || "General"}
                          </Badge>
                        </Td>
                        <Td>{quiz.questions?.length || 0}</Td>
                        <Td>
                          <Flex>
                            <IconButton
                              aria-label="Edit quiz"
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="blue"
                              variant="ghost"
                              as={RouterLink}
                              to={`/edit-quiz/${quiz._id}`}
                              mr={2}
                            />
                            <IconButton
                              aria-label="Delete quiz"
                              icon={<DeleteIcon />}
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => {
                                setQuizToDelete(quiz._id);
                                onOpen();
                              }}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={4} textAlign="center" py={4}>
                        No quizzes found
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          
          {/* Users Tab */}
          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" bg="white" boxShadow="sm" borderRadius="md">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <Tr key={user._id}>
                        <Td fontWeight="medium">{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          <Badge
                            colorScheme={user.role === "admin" ? "red" : "green"}
                          >
                            {user.role}
                          </Badge>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={3} textAlign="center" py={4}>
                        No users found
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          
          {/* Attempts Tab */}
          <TabPanel>
            <Box overflowX="auto">
              <Table variant="simple" bg="white" boxShadow="sm" borderRadius="md">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>User</Th>
                    <Th>Quiz</Th>
                    <Th>Score</Th>
                    <Th>Time Taken</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attempts.length > 0 ? (
                    attempts.map((attempt) => (
                      <Tr key={attempt._id}>
                        <Td fontWeight="medium">{attempt.userName || "Anonymous"}</Td>
                        <Td>{attempt.quizTitle}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              (attempt.score / attempt.total) * 100 >= 70
                                ? "green"
                                : (attempt.score / attempt.total) * 100 >= 40
                                ? "yellow"
                                : "red"
                            }
                          >
                            {attempt.score}/{attempt.total}
                            {" "}
                            ({Math.round((attempt.score / attempt.total) * 100)}%)
                          </Badge>
                        </Td>
                        <Td>{attempt.timeTaken} seconds</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={4} textAlign="center" py={4}>
                        No attempts found
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Quiz
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this quiz? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteQuiz} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
