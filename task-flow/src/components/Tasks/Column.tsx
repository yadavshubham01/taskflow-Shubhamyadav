import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"

const titles: any = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
}
export default function Column({ id, tasks , onUpdate }: any) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 min-h-[300px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100">
          {titles[id]}
        </h3>

        <span className="text-xs text-gray-500 dark:text-gray-100">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-2 flex-1">
        {tasks.length === 0 && (
          <p className="text-xs text-gray-600 dark:text-gray-100 text-center mt-6">
            No tasks
          </p>
        )}
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  )
}