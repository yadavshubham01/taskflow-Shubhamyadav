import { useEffect, useState } from "react"
import { getProjects } from "@/api/api"
import Navbar from "@/components/Navbar"
import AddProjectDialog from "@/components/Projects/AddProject"
import { ProjectCard } from "@/components/Projects/ProjectCard"
import type { Project } from "@/components/Projects/EditProject"


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 6

  const fetchProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch {
      console.error("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const paginatedProjects = projects.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#09111C]">
      <Navbar />

      <div className="px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Your Projects
          </h2>

          <AddProjectDialog onSuccess={fetchProjects} />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-gray-500 dark:text-gray-100">Loading projects...</p>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No projects yet
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              fetchProjects={fetchProjects}
            />
          ))}
        </div>

      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded bg-gray-600 text-white dark:bg-slate-700 disabled:dark:bg-slate-900 cursor-pointer"
        >
          Prev
        </button>

        <span className="text-sm pt-2">
          Page {page}
        </span>

        <button
          disabled={page * pageSize >= projects.length}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded bg-gray-600 text-white dark:bg-slate-700 disabled:dark:bg-slate-900 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  )
}