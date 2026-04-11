import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"
import type { Column, Task } from "./types"
import { useState } from "react"

const titles: any = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
}
export default function Column({ id, tasks, onUpdate }: Column) {
  const [visibleCount, setVisibleCount] = useState(5)
  const { setNodeRef } = useDroppable({ id })

  const visibleTasks = tasks.slice(0, visibleCount)

  return (
    <div
      ref={setNodeRef}
      className="bg-white dark:bg-gray-800 rounded-xl p-3 min-h-[300px] flex flex-col"
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
        {visibleTasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
        ))}
      </div>

      {/* Load More */}
      {visibleCount < tasks.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="text-xs text-gray-500 mt-2 hover:underline"
        >
          Load more
        </button>
      )}

      {visibleCount > 5 && (
        <button
          onClick={() => setVisibleCount(5)}
          className="text-xs text-gray-400"
        >
          Show less
        </button>
      )}
    </div>
  )
}