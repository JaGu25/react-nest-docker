import { z } from "zod";

export const formNoteSchema = z.object({
    title: z.string().min(1, { message: "Field is required" }),
    description: z.string().min(1, { message: "Field is required" }),
});