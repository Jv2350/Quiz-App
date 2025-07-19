import Attempt from "../models/attempt.model.js";
import Quiz from "../models/quiz.model.js";
import apiResponse from "../utils/apiResponse.js";
export const submitAttempt = async (req, res) => {
  try {
    const { quizId, userName, answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return apiResponse.error(res, "Quiz not fond", 404);

    //score logic
    let score = 0;
    const detailedAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId);
      const correct = question && question.correctOption === ans.selectedOption;
      if (correct) score += 1;
      return { ...ans, correct };
    });

    //to save document in the database
    const newAttempt = new Attempt({
      quizId,
      userName,
      score,
      timeTaken,
      answers: detailedAnswers,
    });
    await newAttempt.save();
    return apiResponse.success(
      res,
      {
        score,
        total: quiz.questions.length,
        timeTaken,
        answers: detailedAnswers,
      },
      "Attempt submited"
    );
  } catch (error) {
    return apiResponse.error(res, "Failed to submit attempt", 500);
  }
};
