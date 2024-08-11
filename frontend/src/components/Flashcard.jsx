import { useState } from "react";

export default function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div
      onClick={toggleCard}
      className="cursor-pointer w-80 h-96 mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:text-white flex flex-col justify-center"
    >
      <div className="text-center overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {showAnswer ? "Answer" : "Question"}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {showAnswer ? answer : question}
        </p>
      </div>
    </div>
  );
}
