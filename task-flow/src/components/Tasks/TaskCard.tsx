import { deleteTask } from "@/api/api"
import { useDraggable } from "@dnd-kit/core"
import { useState } from "react"
import { toast } from "sonner"
import EditTaskDialog from "./EditTask"
import type { Task } from "./types"

type Props = {
  task: Task
  onUpdate: () => void
}
export default function TaskCard({ task, onUpdate }:Props) {
  const [openEdit, setOpenEdit] = useState(false)
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: String(task.id),
    })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  const handleDelete = async (e: React.MouseEvent) => {
     e.stopPropagation()
    if (!confirm("Delete task?")) return

    await deleteTask(task.id)
    toast.success("Deleted")
    onUpdate()
  }

  return (
    <div
  ref={setNodeRef}
  style={style}
  className="bg-neutral-100 dark:bg-slate-900 border border-slate-200 dark:border-gray-700 rounded-lg  p-3 hover:shadow-sm transition"
>
  {/* DRAG HANDLE */}
  <div
    {...listeners}
    {...attributes}
    className="cursor-grab active:cursor-grabbing text-gray-400 mb-2"
    onClick={(e) => e.stopPropagation()}
  >
    ⋮⋮
  </div>

  {/* CLICKABLE CONTENT */}
  <div
    className="cursor-pointer"
    onClick={(e) => {
      e.stopPropagation()
      setOpenEdit(true)
    }}
  >
    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>

    <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {task.priority}
        </span>

         {task.due_date && (
          <span className="text-xs text-gray-400 pl-3">
            {task.due_date}
          </span>
        )}
  </div>

  {/* ACTIONS */}
  <div className="flex justify-end mt-2">
    <button
      onClick={(e) => {
        e.stopPropagation()
        handleDelete(e)
      }}
      className="text-red-500 text-xs cursor-pointer"
    >
      Delete
    </button>
  </div>

  {/* EDIT DIALOG */}
  {openEdit && (
    <EditTaskDialog
      task={task}
      onClose={() => setOpenEdit(false)}
      onSuccess={() => {
        onUpdate()
        setOpenEdit(false)
      }}
    />
  )}
</div>
  )
}