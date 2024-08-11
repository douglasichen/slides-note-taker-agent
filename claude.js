import Anthropic from "@anthropic-ai/sdk";
import dotenv from 'dotenv';
import { readFile, writeFile, jsonCut, newLineInStrFix } from './util.js';

dotenv.config();

// Constants for prompts
let counter = 0;
const SYSTEM_PROMPT = readFile('./hidden_prompts/system_prompt.txt');

/**
 * Send a base64 encoded image to Claude and get a detailed analysis response.
 * 
 * @param {string} base64EncodedImage - The base64 encoded image data.
 * @returns {Promise<string>} Claude's detailed analysis of the image.
 * @throws {Error} If there's an issue with the API call or the response.
 */
async function askClaude(base64EncodedImage, prefix='{') {
    if (!base64EncodedImage) {
        throw new Error("No image data provided");
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error("ANTHROPIC_API_KEY is not set in the environment variables");
    }

    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    try {
        const payload = {
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 8192,
            temperature: 0,
            system: SYSTEM_PROMPT,
            messages: [{
                role: "user",
                content: [{
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: "image/png",
                        data: base64EncodedImage
                    }
                }]
            }]
        };
        
        // ensure json output
        payload.messages.push({
            role: "assistant",
            content: [{
                type: "text",
                text: prefix
            }]
        });

        const options = {
            headers: {
                "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15"
            }
        }
        const msg = await anthropic.messages.create(payload, options);

        if (!msg.content || msg.content.length === 0) {
        throw new Error("Received empty response from Claude API");
        }

        let stringResponse = `${prefix}${msg.content[0].text}`;
        stringResponse = newLineInStrFix(jsonCut(stringResponse));
        writeFile(`./outputs/api_calls_log/api_call_${counter++}.json`, stringResponse)
        try {
            const jsonResponse = JSON.parse(stringResponse);
            return jsonResponse;
        } catch (error) {
            throw new Error('Invalid JSON');
        }
    } catch (error) {
        throw new Error(`Unexpected error occurred: ${error.message}`);
    }
}

export { askClaude };

// Example usage:
// import fs from 'fs';
// import { askClaude } from './askClaude.js';
//
// try {
//   const base64Image = fs.readFileSync('path/to/your/image.jpg', { encoding: 'base64' });
//   const result = await askClaude(base64Image);
//   console.log(result);
// } catch (error) {
//   console.error('Error:', error.message);
// }