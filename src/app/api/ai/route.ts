// app/api/ai/route.ts
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const response = await client.responses.create({
        model: "gpt-4.1-mini",
          temperature: 0.7,
          input: [
            {
              role: "system",
              content: `
        Return ONLY the final answer.
        No prefixes, no suffixes, no markdown, no explanations.
        Just one clean paragraph.
              `,
            },
            {
              role: "user",
              content: `${prompt} Output must be a single paragraph.
              `,
            },
          ],
        });
  
      return Response.json({
        result: response.output_text, // ✅ clean & safe
      });
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  }