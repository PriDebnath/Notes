// not in use
import { useMutation, useQuery } from "@tanstack/react-query";


const VITE_GROQ_API_KEY =  import.meta.env.VITE_GROQ_API_KEY

if (!VITE_GROQ_API_KEY) {
    // console.warn("GROQ API KEY not found, ai powered features may not work")
}

const getSummarize = async (content: string) => {
      const prompt = `Summarize this note:\n${content}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            max_completion_tokens: 200,
            messages: [{ role: "user", content: prompt }]
        })
    });
    return await response.json()
}

export const useGetSummarize = () => {
    const mutation = useMutation({
        mutationFn: getSummarize
    })
    return {
        ...mutation,
        getSummarize: mutation.mutateAsync,
    }
}