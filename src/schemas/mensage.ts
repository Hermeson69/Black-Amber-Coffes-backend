import * as z from "zod";

export const MessageSchema = z.object({
    success: z.boolean(),
    detail: z.string()
});

export type Message = z.infer<typeof MessageSchema>;