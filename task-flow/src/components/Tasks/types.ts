
export type Task = {
  id: string
  title: string
  description?:string
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  assignee_id?: string
  due_date?: string
}

export type TaskStatus = Task["status"]
export type TaskPriority = Task["priority"]

export type CreateTaskInput = Omit<Task, "id">

export type UpdateTaskInput = Partial<Omit<Task, "id">> & {
  id: string
}

export type EditTaskProps = {
  task: Task
  onClose: () => void
  onSuccess: () => void
}

export type AddTaskProps = {
  projectId: string
  onSuccess: () => void
}

export type Column = {
  id: string
  tasks: Task[]
  onUpdate: () => void
}