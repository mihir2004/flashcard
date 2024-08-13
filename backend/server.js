import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Add a new question
app.post("/api/questions", async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).send("Please provide both question and answer.");
  }
  try {
    const newQuestion = await prisma.question.create({
      data: { question, answer },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update an existing question
app.put("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).send("Please provide both question and answer.");
  }
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id) },
      data: { question, answer },
    });
    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a question
app.delete("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await prisma.question.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
