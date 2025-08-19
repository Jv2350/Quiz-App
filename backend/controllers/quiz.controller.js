import Quiz from "../models/quiz.model.js";

export const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find()
      .select("-questions")
      .sort({ createdAt: -1 }); // list without questions
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;
    const created = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user.id,
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// export const updateQuiz = async (req, res, next) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

//     // Optional: ensure only admin or creator edits
//     // if (req.user.role !== 'admin' && quiz.createdBy.toString() !== req.user.id) {...}

//     quiz.title = req.body.title ?? quiz.title;
//     quiz.description = req.body.description ?? quiz.description;
//     quiz.questions = req.body.questions ?? quiz.questions;
//     await quiz.save();
//     res.json(quiz);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteQuiz = async (req, res, next) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });
//     await quiz.remove();
//     res.json({ message: "Quiz removed" });
//   } catch (err) {
//     next(err);
//   }
// };

//delete Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return apiResponse.error(res, "Quiz not found", 404);
    }

    await Quiz.findByIdAndDelete(req.params.id);
    return apiResponse.success(res, {}, "Quiz deleted successfully");
  } catch (error) {
    return apiResponse.error(res, "Failed to delete quiz", 500);
  }
};

//update Quiz
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return apiResponse.error(res, "Quiz not found", 404);
    }
    
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true }
    );
    
    return apiResponse.success(res, updatedQuiz, "Quiz updated successfully");
  } catch (error) {
    return apiResponse.error(res, "Failed to update quiz", 500);
  }
};
