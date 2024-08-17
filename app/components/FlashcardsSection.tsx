"use client";

import { useState, useEffect } from "react";
import { fetchFlashcards } from "../lib/api";

interface Flashcard {
  question: string;
  answer: string;
}

const FlashcardsSection = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (topic) {
      const loadFlashcards = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await fetchFlashcards(topic);
          setFlashcards(data);
        } catch (err) {
          setError("Failed to load flashcards");
        } finally {
          setLoading(false);
        }
      };

      loadFlashcards();
    }
  }, [topic]);

  const getVisibleFlashcards = () => {
    if (flashcards.length === 0) return [];
    
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentCardIndex + i) % flashcards.length;
      cards.push(flashcards[index]);
    }
    return cards;
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 3) % flashcards.length);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 3 + flashcards.length) % flashcards.length);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTopic(input);
  };

  const visibleFlashcards = getVisibleFlashcards();

  return (
    <section className="p-4 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter topic"
          className="border p-2 rounded-lg mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Fetch Flashcards
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex gap-4 overflow-x-auto">
            {visibleFlashcards.length > 0 ? (
              visibleFlashcards.map((flashcard, index) => (
                <div
                  key={index}
                  className={`w-80 p-6 rounded-lg shadow-md text-center ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : 'bg-yellow-100'}`}
                >
                  <div className="text-xl font-bold mb-2">Question:</div>
                  <p className="text-lg mb-4">{flashcard.question}</p>
                  <div className="text-xl font-bold mb-2">Answer:</div>
                  <p className="text-lg">{flashcard.answer}</p>
                </div>
              ))
            ) : (
              <p>No flashcards available for this topic.</p>
            )}
          </div>
          {flashcards.length > 0 && (
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handlePreviousCard}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleNextCard}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FlashcardsSection;
