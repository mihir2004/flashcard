import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ question: "", answer: "" });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://flashcard-xlwk.onrender.com/api/questions"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle editing a question
  const handleEdit = (question) => {
    setEditingQuestion({ ...question });
    setError("");
  };

  // Handle saving edited question
  const handleSave = async () => {
    if (!editingQuestion.question.trim() || !editingQuestion.answer.trim()) {
      setError("Please fill out both question and answer.");
      return;
    }

    try {
      const response = await axios.put(
        `https://flashcard-xlwk.onrender.com/api/questions/${editingQuestion.id}`,
        {
          question: editingQuestion.question,
          answer: editingQuestion.answer,
        }
      );
      setQuestions(
        questions.map((q) => (q.id === response.data.id ? response.data : q))
      );
      setEditingQuestion(null);
      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle adding a new question
  const handleAdd = async () => {
    if (!newQuestion.question.trim() || !newQuestion.answer.trim()) {
      setError("Please fill out both question and answer.");
      return;
    }

    try {
      const response = await axios.post(
        "https://flashcard-xlwk.onrender.com/api/questions",
        newQuestion
      );
      setQuestions([...questions, response.data]);
      setNewQuestion({ question: "", answer: "" }); // Reset state
      setIsAddingQuestion(false); // Close the add question modal
      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a question
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://flashcard-xlwk.onrender.com/api/questions/${id}`
      );
      setQuestions(questions.filter((q) => q.id !== id)); // Update state after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Close edit/add modal
  const handleCloseModal = () => {
    setEditingQuestion(null);
    setNewQuestion({ question: "", answer: "" });
    setIsAddingQuestion(false); // Close the add question modal
    setError("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => {
            setEditingQuestion(null); // Ensure no editing is happening
            setIsAddingQuestion(true); // Show the add question modal
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Question
        </button>
      </div>
      <div className="space-y-4">
        {questions
          .filter((q) =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((question) => (
            <div
              key={question.id}
              className="p-4 border border-gray-200 rounded shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">
                {question.question}
              </h3>
              <p className="mb-2">{question.answer}</p>
              <button
                onClick={() => handleEdit(question)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(question.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {/* Modal for editing a question */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Question"
              value={editingQuestion.question}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  question: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <input
              placeholder="Answer"
              value={editingQuestion.answer}
              onChange={(e) =>
                setEditingQuestion({
                  ...editingQuestion,
                  answer: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding a new question */}
      {isAddingQuestion && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <input
              placeholder="Answer"
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, answer: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
