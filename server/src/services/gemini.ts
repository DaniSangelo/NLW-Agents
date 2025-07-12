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

export async function generateEmbedding(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{
            text
        }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT',
        }
    })

    if (!response.embeddings?.[0].values) {
        throw new Error('Error when generating embedding')
    }

    return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join('\n\n')

    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: `Answer the question based on the context below. If the answer is not in the context, say "I don't know".\n\nContext: ${context}\n\nQuestion: ${question}`
            }
        ]
    })

    if (!response.text) {
        throw new Error('Error when generating answer')
    }

    return response.text
}