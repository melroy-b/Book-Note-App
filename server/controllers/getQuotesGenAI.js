import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

const quoteSchema = {
  type: "object",
  properties: {
    quote: { type: "string" },
    author: { type: "string" },
    source: { type: "string" },
  },
  required: ["quote", "author", "source"],
};

const quotePrompt =
  "Return one concise quote about books or reading. Include the quote text, author name, and source. If the source is not known, use an empty string.";

const fallbackQuote = {
  quote: "Reading is a conversation. All books talk. But a good book listens as well.",
  author: "Mark Haddon",
  source: "",
};

const retryDelays = [500, 1500];
const retryableStatuses = new Set([429, 500, 503, 504]);
const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const fallbackModels = (
  process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite"
)
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);
const quoteModels = [...new Set([primaryModel, ...fallbackModels])];

let cachedQuote = null;
let cachedQuoteExpiresAt = 0;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getErrorStatus = (error) => {
  const message = error?.message || "";
  const match = message.match(/"code":\s*(\d+)/);

  return error?.status || error?.code || Number(match?.[1]);
};

const isRetryableError = (error) => {
  const status = getErrorStatus(error);

  return (
    retryableStatuses.has(status) ||
    /UNAVAILABLE|RESOURCE_EXHAUSTED|INTERNAL|DEADLINE_EXCEEDED|high demand|overloaded/i.test(
      error?.message || ""
    )
  );
};

const parseQuote = (response) => {
  const generatedQuote = JSON.parse(response.text);

  if (!generatedQuote?.quote) {
    throw new Error("Gemini response did not include a quote");
  }

  return {
    quote: generatedQuote.quote,
    author: generatedQuote.author || "Unknown",
    source: generatedQuote.source || "",
  };
};

const generateQuote = async (model) => {
  const response = await ai.models.generateContent({
    model,
    contents: quotePrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: quoteSchema,
    },
  });

  return parseQuote(response);
};

const generateQuoteWithRetry = async (model) => {
  for (let attempt = 0; attempt <= retryDelays.length; attempt += 1) {
    try {
      return await generateQuote(model);
    } catch (error) {
      if (!isRetryableError(error) || attempt === retryDelays.length) {
        throw error;
      }

      await wait(retryDelays[attempt]);
    }
  }
};

const getQuotes = async (req, res) => {
  if (!process.env.GENAI_API_KEY) {
    return res.status(500).json({ error: "GENAI_API_KEY is not configured" });
  }

  if (cachedQuote && cachedQuoteExpiresAt > Date.now()) {
    return res.json({
      ...cachedQuote,
      generated: true,
      cached: true,
    });
  }

  let lastError = null;

  for (const model of quoteModels) {
    try {
      const generatedQuote = await generateQuoteWithRetry(model);
      cachedQuote = generatedQuote;
      cachedQuoteExpiresAt = Date.now() + 60 * 60 * 1000;

      return res.json({
        ...generatedQuote,
        generated: true,
        cached: false,
        model,
      });
    } catch (error) {
      lastError = error;
      console.warn(`Quote generation failed with ${model}:`, error.message);
    }
  }

  console.error("Error generating quote:", lastError);

  res.json({
    ...fallbackQuote,
    generated: false,
    cached: false,
  });
};

export default getQuotes;
