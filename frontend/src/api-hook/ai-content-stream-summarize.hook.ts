import { useState, useRef } from "react";

interface Param {
  userQuery: string;
  content: string;
}

const VITE_GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const useStreamSummarize = () => {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const startStream = async (
    param: Param,
    onChunk: (chunk: string) => void
  ) => {
    setLoading(true);

    controllerRef.current?.abort();
    const { userQuery, content } = param
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: `${userQuery}:\n${content}`,
              },
            ],
            stream: true,
          }),
          signal: controller.signal,
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      if (!reader) return

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;

          if (trimmed.startsWith("data: ")) {
            const json = JSON.parse(trimmed.replace("data: ", ""));
            const token = json?.choices?.[0]?.delta?.content;

            if (token) {
              onChunk(token);
            }
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { startStream, loading };
};