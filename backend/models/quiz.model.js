import mongoose, { Schema } from "mongoose";
//questionText,options,correctOption

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctOption: { type: Number, required: true },
});

//title,description,questions
const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
