import Quiz from "../models/quiz.model.js";
import apiResponse from "../utils/apiResponse.js";
//getAllQuizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    return apiResponse.success(res, quizzes, "Feteched quizzes");
  } catch (error) {
    return apiResponse.error(res, "Failed to fetch quizzes", 500);
  }
};

//getQuizById

export const getQuizbyId = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return apiResponse.error(res, "Quiz not found", 404);
    }

    return apiResponse.success(res, quiz, "Fetched quiz");
  } catch (error) {
    return apiResponse.error(res, "failed to fetch quiz by Id", 500);
  }
};

//create Quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const newQuiz = new Quiz({
      title,
      description,
      questions,
    });

    await newQuiz.save();
    return apiResponse.success(res, newQuiz, "Quiz created succesfully");
  } catch (error) {
    return apiResponse.error(res, "Failed to create quiz", 500);
  }
};
