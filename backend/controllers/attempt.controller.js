// import Attempt from "../models/attempt.model.js";
// import Quiz from "../models/quiz.model.js";
// import apiResponse from "../utils/apiResponse.js";

// export const submitAttempt = async (req, res) => {
//   try {
//     const { quizId, userName, answers, timeTaken } = req.body;
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) return apiResponse.error(res, "Quiz not found", 404);

//     let score = 0;
//     const detailedAnswers = answers.map((ans) => {
//       const question = quiz.questions.id(ans.questionId);
//       const correct = question && question.correctOption === ans.selectedOption;
//       if (correct) score += 1;
//       return { ...ans, correct };
//     });

//     const newAttempt = new Attempt({
//       quizId,
//       userName,
//       score,
//       timeTaken,
//       answers: detailedAnswers,
//     });

//     await newAttempt.save();

//     return apiResponse.success(
//       res,
//       {
//         score,
//         total: quiz.questions.length,
//         timeTaken,
//         answers: detailedAnswers,
//       },

//       "Attempt submitted"
//     );
//     // console.log(state);
//   } catch (error) {
//     return apiResponse.error(res, "Failed to submit attempt", 500);
//   }
// };

import Attempt from "../models/attempt.model.js";
import Quiz from "../models/quiz.model.js";
<<<<<<< HEAD
=======
import apiResponse from "../utils/apiResponse.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96

export const submitAttempt = async (req, res, next) => {
  try {
    const { quizId, userName, answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // answers: [{ questionIndex, selectedOption }]
    let score = 0;
    const detailed = answers.map((a) => {
      const q = quiz.questions[a.questionIndex];
      const correct = q && q.correctOption === a.selectedOption;
      if (correct) score++;
      return {
        questionIndex: a.questionIndex,
        selectedOption: a.selectedOption,
        correct,
      };
    });

    const attempt = await Attempt.create({
      quizId,
      userId: req.user ? req.user.id : undefined,
      userName,
      answers: detailed,
      score,
      timeTaken,
    });

    res
      .status(201)
      .json({
        attemptId: attempt._id,
        score,
        total: quiz.questions.length,
        answers: detailed,
      });
  } catch (err) {
    next(err);
  }
};

export const getAttemptsByQuiz = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ quizId: req.params.quizId });
    res.json(attempts);
  } catch (err) {
    next(err);
  }
};

// Get all attempts (admin only)
export const getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find().populate('quizId', 'title');
    
    // Format the data to include quiz title
    const formattedAttempts = attempts.map(attempt => {
      return {
        _id: attempt._id,
        userName: attempt.userName,
        score: attempt.score,
        total: attempt.answers.length,
        timeTaken: attempt.timeTaken,
        quizTitle: attempt.quizId ? attempt.quizId.title : 'Unknown Quiz',
        quizId: attempt.quizId ? attempt.quizId._id : null,
        answers: attempt.answers
      };
    });
    
    return apiResponse.success(res, formattedAttempts, "Attempts fetched successfully");
  } catch (error) {
    return apiResponse.error(res, "Failed to fetch attempts", 500);
  }
};
