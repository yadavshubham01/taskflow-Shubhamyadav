import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import { getProjectById, getTasks, updateTask } from "@/api/api"
import AddTaskDialog from "@/components/Tasks/AddTask"
import { DndContext, closestCenter } from "@dnd-kit/core"
import Column from "@/components/Tasks/Column"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const columns = ["todo", "in_progress", "done"]

export default function ProjectDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState<any>(null)
    const [tasks, setTasks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [statusFilter, setStatusFilter] = useState("all")
    const [assigneeFilter, setAssigneeFilter] = useState("all")

    const fetchData = async () => {
        try {
            const [tasksData, projectData] = await Promise.all([
                getTasks(id!),
                getProjectById(id!),
            ])

            setTasks(tasksData)
            setProject(projectData)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDragEnd = async (event: any) => {
        const { active, over } = event
        if (!over) return

        const taskId = active.id
        const newStatus = over.id

        const current = tasks.find((t) => String(t.id) === String(taskId))
        if (!current || current.status === newStatus) return

        setTasks((prev) =>
            prev.map((t) =>
                String(t.id) === String(taskId)
                    ? { ...t, status: newStatus }
                    : t
            )
        )

        try {
            await updateTask(taskId, { status: newStatus })
        } catch {
            fetchData()
        }
    }


    const filteredTasks = tasks.filter((t) => {
        const statusMatch =
            statusFilter === "all" || t.status === statusFilter

        const assigneeMatch =
            assigneeFilter === "all" || t.assignee_id === assigneeFilter

        return statusMatch && assigneeMatch
    })

    const grouped = columns.reduce((acc: any, col) => {
        acc[col] = filteredTasks.filter((t) => t.status === col)
        return acc
    }, {})

    return (
        <div className="flex-1 bg-neutral-100 dark:bg-[#09111C]">
            <Navbar />

            <div className="p-4 space-y-4">

                {/* Breadcrumb */}
                <Breadcrumb className="text-sm text-gray-500">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                onClick={() => navigate("/projects")}
                                className="cursor-pointer"
                            >
                                Projects
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {project?.name || "Loading..."}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="flex justify-between items-start bg-neutral-100 dark:bg-gray-900  p-4">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {project?.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            {project?.description}
                        </p>
                    </div>

                    <AddTaskDialog projectId={id} onSuccess={fetchData} />
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap bg-neutral-100 dark:bg-gray-900 p-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm "
                    >
                        <option value="all" className="text-gray-700">All Status</option>
                        <option value="todo" className="text-gray-700">Todo</option>
                        <option value="in_progress" className="text-gray-700">In Progress</option>
                        <option value="done" className="text-gray-700">Done</option>
                    </select>

                    <select
                        value={assigneeFilter}
                        onChange={(e) => setAssigneeFilter(e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm"
                    >
                        <option value="all" className="text-gray-700">All Assignees</option>

                        {[...new Set(tasks.map((t) => t.assignee_id))]
                            .filter(Boolean)
                            .map((id) => (
                                <option key={id} value={id} className="text-gray-800">
                                    {id}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-sm text-gray-500">Loading...</p>
                )}

                {/* Empty */}
                {!loading && tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400 ">
                        <p>No tasks yet</p>
                        <span className="text-xs">Create your first task</span>
                    </div>
                )}

                {/* Board */}
                {!loading && tasks.length > 0 && (
                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                        <div className="grid md:grid-cols-3 gap-3">
                            {columns.map((col) => (
                                <Column key={col} id={col} tasks={grouped[col] || []} onUpdate={fetchData} />
                            ))}
                        </div>
                    </DndContext>
                )}
            </div>
        </div>
    )
}