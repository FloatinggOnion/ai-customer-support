const GEMINI_API_KEY = '';
const GEMINI_API_URL = '';

export async function fetchFlashcards(topic: string) {
  const prompt = `Generate 3 flashcards for the topic: ${topic}. Each flashcard should have a question and answer. Format them as follows:\nQuestion: [question]\nAnswer: [answer]`;

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GEMINI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'Gemini 1.5 Flash', 
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }

  const data = await response.json();
  const flashcards: { question: string; answer: string }[] = [];

  const text = data.choices?.[0]?.text || '';
  const flashcardEntries = text.split('\n').filter(line => line.trim() !== '');

  for (const entry of flashcardEntries) {
    const [question, answer] = entry.split('Answer:').map(part => part.trim());
    if (question && answer) {
      flashcards.push({ question, answer });
    }
  }

  return flashcards;
}
