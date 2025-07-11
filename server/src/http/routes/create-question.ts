import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm";

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

        const room = db.select().from(schema.rooms).where(eq(schema.rooms.id, roomId))

        if (!room) {
            return reply.status(404).send({
                message: 'Room does not exist'
            })
        }

        const newQuestion = await db
            .insert(schema.questions)
            .values({roomId, question})
            .returning()

        const insertedQuestion = newQuestion[0]

        if (!insertedQuestion) {
            return reply.status(500).send({
                message: 'Could not create question'
            })
        }

        return reply.status(201).send({
            question: newQuestion
        })
    })
}