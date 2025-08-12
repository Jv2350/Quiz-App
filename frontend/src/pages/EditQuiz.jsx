import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  SimpleGrid,
  IconButton,
  Select,
  Card,
  CardBody,
  CardHeader,
  Divider,
  useToast,
  Spinner,
  Center,
  Text
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/quizzes/${id}`);
        const quiz = res.data.data;
        
        setTitle(quiz.title);
        setDescription(quiz.description || "");
        setQuestions(quiz.questions.map(q => ({
          _id: q._id,
          questionText: q.questionText,
          options: [...q.options],
          correctOption: q.correctOption
        })));
      } catch (error) {
        toast({
          title: "Error fetching quiz",
          description: error.response?.data?.message || "Could not load quiz data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/admin");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id, navigate, toast]);
  
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "questionText") {
      updatedQuestions[index].questionText = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };
  
  const handleCorrectOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = parseInt(value);
    setQuestions(updatedQuestions);
  };
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };
  
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (questions.length === 0) {
      toast({
        title: "No questions added",
        description: "Please add at least one question to the quiz",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        toast({
          title: "Empty question",
          description: `Question ${i + 1} has no text`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          toast({
            title: "Empty option",
            description: `Option ${j + 1} in question ${i + 1} is empty`,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }
    }
    
    try {
      await api.put(`/quizzes/${id}`, { title, description, questions });
      toast({
        title: "Quiz updated",
        description: "The quiz has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Error updating quiz",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" color="teal.600">Edit Quiz</Heading>
        
        <Card bg="white" shadow="md">
          <CardHeader>
            <Heading size="md">Quiz Information</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Quiz Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  bg="white"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter quiz description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  bg="white"
                />
              </FormControl>
              
              <Divider my={4} />
              
              <Heading size="md" alignSelf="flex-start">Questions</Heading>
              
              {questions.length === 0 ? (
                <Text color="gray.500">No questions added yet. Add your first question below.</Text>
              ) : (
                questions.map((q, idx) => (
                  <Card key={idx} w="full" variant="outline" mb={4}>
                    <CardHeader bg="gray.50" p={3}>
                      <Heading size="sm" display="flex" justifyContent="space-between">
                        Question {idx + 1}
                        <IconButton
                          aria-label="Remove question"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeQuestion(idx)}
                        />
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <FormControl isRequired>
                          <FormLabel>Question Text</FormLabel>
                          <Input
                            type="text"
                            placeholder={`Enter question ${idx + 1}`}
                            value={q.questionText}
                            onChange={(e) =>
                              handleQuestionChange(idx, "questionText", e.target.value)
                            }
                          />
                        </FormControl>
                        
                        <SimpleGrid columns={2} spacing={4}>
                          {q.options.map((opt, oIdx) => (
                            <FormControl key={oIdx} isRequired>
                              <FormLabel>Option {oIdx + 1}</FormLabel>
                              <Input
                                type="text"
                                placeholder={`Enter option ${oIdx + 1}`}
                                value={opt}
                                onChange={(e) =>
                                  handleQuestionChange(idx, oIdx, e.target.value)
                                }
                              />
                            </FormControl>
                          ))}
                        </SimpleGrid>
                        
                        <FormControl isRequired>
                          <FormLabel>Correct Answer</FormLabel>
                          <Select
                            value={q.correctOption}
                            onChange={(e) => handleCorrectOptionChange(idx, e.target.value)}
                          >
                            {q.options.map((_, oIdx) => (
                              <option key={oIdx} value={oIdx}>
                                Option {oIdx + 1}: {q.options[oIdx]}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </VStack>
                    </CardBody>
                  </Card>
                ))
              )}
              
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={addQuestion}
                alignSelf="flex-start"
                mb={4}
              >
                Add Question
              </Button>
              
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                mt={4}
              >
                Update Quiz
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default EditQuiz;