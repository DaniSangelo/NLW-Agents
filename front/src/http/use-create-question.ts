import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data: CreateQuestionRequest) => {
            const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result: CreateQuestionResponse = await response.json()
            return result
        },

        onMutate({ question }) {
            const previousQuestions = queryClient.getQueryData<GetRoomQuestionsResponse>([
                'get-questions',
                roomId
            ])

            const questionsArray = previousQuestions ?? []
            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString()
            }

            queryClient.setQueryData<GetRoomQuestionsResponse>(
                [
                    'get-questions',
                    roomId
                ],
                [newQuestion, ...questionsArray,]
            )

            return { newQuestion, previousQuestions }
        },
    
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData<GetRoomQuestionsResponse>(
                [
                    'get-questions',
                    roomId
                ],
                (previousQuestions) => {
                    if (!previousQuestions) return previousQuestions
                    if (!context.newQuestion) return previousQuestions

                    return previousQuestions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...question,
                                answer: data.answer
                            }
                        }

                        return question
                    })
                }
            )
        },

        onError(_error, _variables, context) {
            if (context?.previousQuestions) {
                queryClient.setQueryData<GetRoomQuestionsResponse>(
                    [
                        'get-questions',
                        roomId
                    ],
                    context.previousQuestions
                )
            }
        },

    })
}