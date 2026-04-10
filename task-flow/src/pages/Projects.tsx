import { useEffect, useState } from "react"
import { getProjects } from "@/api/api"
import Navbar from "@/components/Navbar"
import AddProjectDialog from "@/components/Projects/AddProject"
import { ProjectCard } from "@/components/Projects/ProjectCard"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              fetchProjects={fetchProjects}
            />
          ))}
        </div>

      </div>
    </div>
  )
}