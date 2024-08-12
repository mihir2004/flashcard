import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

// PostgreSQL configuration
const db = new pg.Client({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to PostgreSQL
db.connect().catch((err) => console.error("Connection error", err.stack));

app.use(cors());
app.use(express.json());

// Get all questions
app.get("/api/questions", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM questions");
    res.json(result.rows);
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
    const result = await db.query(
      "INSERT INTO questions (question, answer) VALUES ($1, $2) RETURNING *",
      [question, answer]
    );
    res.status(201).json(result.rows[0]);
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
    const result = await db.query(
      "UPDATE questions SET question = $1, answer = $2 WHERE id = $3 RETURNING *",
      [question, answer, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Question not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a question
app.delete("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM questions WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Question not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
