import express from 'express';
import Exam from '../models/Exam.js';

const router = express.Router();

// Get all exams
router.get('/exams', async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});


// Submit answers
router.post('/submit', async (req, res) => {
  const { examId, answers } = req.body;
  const exam = await Exam.findById(examId);
  let score = 0;
  answers.forEach((ans, i) => {
    if (exam.questions[i].correctOption === ans) score++;
  });
  res.json({ score, total: exam.questions.length });
});

router.post('/exams', async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET single exam
router.get('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE exam
router.delete('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


//mongodb+srv://mdnsmi2442:eQfuV7AVbryFRcsZ@ottomen.tzjf38c.mongodb.net/?retryWrites=true&w=majority&appName=ottomen
// mdnsmi2442
// eQfuV7AVbryFRcsZ