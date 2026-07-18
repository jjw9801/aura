import { NextRequest, NextResponse } from "next/server";

async function callOpenAI(messages: { role: string; content: string }[]) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are AURA AI, a helpful assistant. Be concise and professional. Respond in the same language the user uses.",
        },
        ...messages,
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}

async function callClaude(messages: { role: string; content: string }[]) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "You are AURA AI, a helpful assistant. Be concise and professional. Respond in the same language the user uses.",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

async function callGemini(messages: { role: string; content: string }[]) {
  const geminiMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: "You are AURA AI, a helpful assistant. Be concise and professional. Respond in the same language the user uses.",
            },
          ],
        },
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates[0].content.parts[0].text;
}

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();

  try {
    let content: string;

    switch (model) {
      case "Claude":
        content = await callClaude(messages);
        break;
      case "Gemini":
        content = await callGemini(messages);
        break;
      case "GPT-4":
      default:
        content = await callOpenAI(messages);
        break;
    }

    return NextResponse.json({ content });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to connect to AI";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}