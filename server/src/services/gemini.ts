import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcribe the audio to Brazilian Portuguese. Be precise and natural when transcribing. Keep proper punctuation and split the text in paragraphs as necessary',
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                }
            }
        ]
    })

    if (!response.text) {
        throw new Error('Error when transcribing audio')
    }

    return response.text
}