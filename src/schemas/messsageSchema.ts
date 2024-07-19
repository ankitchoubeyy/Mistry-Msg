import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(10, "content be atleast 10 characters")
    .max(200, "content should be under 200 characters")
})