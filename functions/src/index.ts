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

const GPT_API_KEY = defineSecret('new-gpt-key')

export const generateTopics = onCall(
    { secrets: [GPT_API_KEY] }, 
    async () => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: GPT_API_KEY.value(),
            model: "gpt-4o-mini",
            temperature: 1.0,
        })

        const topics = z.object({
            one: z.string().describe("A two word scenario for a rude email"),
            two: z.string().describe("A two word scenario for a rude email"),
            three: z.string().describe("A two word scenario for a rude email"),
        });

        const structuredLlm = model.withStructuredOutput(topics);

        const result = await structuredLlm.invoke("Generate 3 funny wacky quirky two word scenarios for a rude email generator app")

        return {
            success: true,
            newTopics: result
        }
    } catch (e) {
        logger.warn(e)
        throw new HttpsError("internal", "Failed to generate topics")
    }
})

export const generateEmail = onCall(
    { secrets: [GPT_API_KEY] }, 
    async (request) => {
    try {
        const params = request.data
        const topics = params?.topics

        if (!topics || topics?.length == 0) {
            throw new HttpsError("invalid-argument", "bad args passed")
        }

        const model = new ChatOpenAI({
            openAIApiKey: GPT_API_KEY.value(),
            model: "gpt-4o-mini",
            temperature: 1.0,
        })

        const bodyFormat = z.object({
            body: z.string().describe("A paragraph of a rude snarky sarcastic email")
        })

        const structuredLlm = model.withStructuredOutput(bodyFormat);

        const stringTopics = topics.join(", ")

        const result = await structuredLlm.invoke(`Generate ONLY a paragraph of a rude snarky sarcastic email (with NO subject, NO salutation greeting and NO email sign off) based on these topics: ${stringTopics}`)

        return {
            success: true,
            newEmail: result
        }
    } catch (e) {
        logger.warn(e)
        throw new HttpsError("internal", "Failed to generate topics")
    }
})