import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm";

export const UploadAudioRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms/:roomId/audio', {
        schema: {
            params: z.object({
                roomId: z.string(),
            }),
        }
    }, async(request, reply) => {
        const { roomId } = request.params
        const audio = await request.file()

        if (!audio) {
            return reply.status(400).send({ error: 'Missing audio file' })
        }

        
    })
}