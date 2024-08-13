import { useState, useEffect } from "react";
import axios from "axios";

export default function FlashcardCarousel() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(
          "https://flashcard-xlwk.onrender.com/api/questions"
        );
        console.log(response.data);
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false); // Reset to question side
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setShowAnswer(false); // Reset to question side
  };

  const toggleCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {flashcards.length > 0 ? (
        <div
          onClick={toggleCard}
          className="cursor-pointer w-80 h-96 mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:text-white flex flex-col justify-center"
        >
          <div className="text-center overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {showAnswer ? "Answer" : "Question"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {showAnswer
                ? flashcards[currentIndex].answer
                : flashcards[currentIndex].question}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading flashcards...</p>
      )}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
