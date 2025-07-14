import mongoose, { Schema } from "mongoose";
//answerSchema :questionId,selectedOption,correct

const answerSchema = new mongoose.Schema({
  questionId: String,
  selectedOption: Number,
  correct: Boolean,
});

//attemptSchema:answers,timeTaken,score,userName,quizId

const attemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  userName: String,
  score: Number,
  timeTaken: Number,
  answers: [answerSchema],
});

const Attempt = mongoose.model("Attempt", attemptSchema);
export default Attempt;
