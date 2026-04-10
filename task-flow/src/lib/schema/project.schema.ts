import z from "zod";

export const projectSchema = z.object({
    name:z.string().min(2,"Project name is required"),
    description:z.string().optional()
});

export type ProjectInputType = z.infer<typeof projectSchema>