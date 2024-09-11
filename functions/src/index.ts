/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineSecret } from "firebase-functions/params";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const GPT_API_KEY = defineSecret('new-gpt-key')

export const generateTopics = onCall(
    { secrets: [GPT_API_KEY] }, 
    async () => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: GPT_API_KEY.value(),
            model: "gpt-4o-mini",
            temperature: 0,
        })

        const topics = z.object({
            one: z.string().describe("A two word topic for a rude email"),
            two: z.string().describe("A two word topic for a rude email"),
            three: z.string().describe("A two word topic for a rude email"),
        });

        const structuredLlm = model.withStructuredOutput(topics);

        const result = await structuredLlm.invoke("Generate 3 two word topics for a rude email generator app")

        return {
            success: true,
            newTopics: result
        }
    } catch (e) {
        logger.warn(e)
        throw new HttpsError("internal", "Failed to generate topics")
    }
})