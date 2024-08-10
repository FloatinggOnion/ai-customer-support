import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import { NextApiRequest } from 'next';

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = "You are a customer support agent for a tech company. The user is asking for help with a technical issue. Respond in a friendly and professional manner. Don't send any messages in markdown format";

// POST function to handle incoming requests

export async function POST(req: NextApiRequest & { json: () => Promise<any> }) {
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the Gemini API
  const chat = model.startChat({
      history: [
            {
              role: "user",
              parts: [{ text: data }],
            },
        {
          role: "model",
          parts: [{ text: systemPrompt }],
        },
    ],
  });

  // Create a ReadableStream to handle the streaming response
  const result = await chat.sendMessage(data); // Send the user's message to the chat completion model
  console.log(result);

  return new NextResponse(result?.response?.text()) // Return the stream as the response
}