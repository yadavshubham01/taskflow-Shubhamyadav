import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, "Title required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  assignee_id: z.string().optional(),
  due_date: z.string().optional(),
})

export type TaskInput = z.infer<typeof taskSchema>
