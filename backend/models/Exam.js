import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: String,
  questions: [{ 
    text: String, 
    options: [String], 
    correctOption: Number 
  }]
});

export default mongoose.model('Exam', examSchema);