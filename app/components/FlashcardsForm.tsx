"use client";

import { useState } from "react";
import { fetchFlashcards } from "../../lib/api"; 
import FlashcardsSection from "./FlashcardsSection";

const FlashcardsForm = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFlashcards(inputText);
      setFlashcards(data);
    } catch (err) {
      setError("Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to generate flashcards"
          rows={4}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {flashcards.length > 0 && <FlashcardsSection flashcards={flashcards} />}
    </div>
  );
};

export default FlashcardsForm;
