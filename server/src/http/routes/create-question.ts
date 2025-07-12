import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { and, eq, sql } from "drizzle-orm";
import { generateAnswer, generateEmbedding } from "../../services/gemini.ts";

const SIMILARITY_LEVEL = 0.7

export const CreateQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms/:roomId/questions', {
        schema: {
            params: z.object({
                roomId: z.string(),
            }),
            body: z.object({
                question: z.string().min(1)
            })
        }
    }, async(request, reply) => {
        const { roomId } = request.params;
        const { question } = request.body;
        const embeddings = await generateEmbedding(question)
        const embeddingsAsString = `[${embeddings.join(',')}]`
        const chunks = await db
            .select({
                id: schema.audioChunks.id,
                transcription: schema.audioChunks.transcription,
                similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`
            })
            .from(schema.audioChunks)
            .where(
                and(
                    eq(schema.audioChunks.roomId, roomId),
                    // <=> it is the operator to search by similarity
                    sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > ${SIMILARITY_LEVEL}`
                )
            )
            .orderBy(sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`)
            .limit(3)

        let answer: string | null = null
        if(chunks.length > 0) {
            const transcriptions = chunks.map(chunk => chunk.transcription)
            answer = await generateAnswer(question, transcriptions)
        }

        const room = db.select().from(schema.rooms).where(eq(schema.rooms.id, roomId))

        if (!room) {
            return reply.status(404).send({
                message: 'Room does not exist'
            })
        }

        const newQuestion = await db
            .insert(schema.questions)
            .values({roomId, question, answer})
            .returning()

        const insertedQuestion = newQuestion[0]

        if (!insertedQuestion) {
            return reply.status(500).send({
                message: 'Could not create question'
            })
        }

        return reply.status(201).send({
            question: newQuestion,
            answer,
        })
    })
}