import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import EditProjectDialog, { type Project } from "./EditProject"
import ProjectActions from "./ProjectActions"
import { useNavigate } from "react-router-dom"

export const ProjectCard = ({ project, fetchProjects }: any) => {
  const [editProject, setEditProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  return (
    <>
      <Card
        onClick={() => navigate(`/projects/${project.id}`)}
        className="cursor-pointer bg-white border-slate-200 dark:bg-slate-800 transition hover:shadow-md border dark:border-gray-700"
      >
        <CardContent className="p-4 flex flex-col justify-between h-[120px]">

          {/* Project */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
              {project.name}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2">
              {project.description || "No description"}
            </p>
          </div>

          {/* Footer */}
          <div
            className="flex justify-between items-center mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Created Date */}
            <span className="text-xs text-gray-400">
              {project.created_at
                ? new Date(project.created_at).toLocaleDateString()
                : ""}
            </span>

            {/* Actions */}
            <ProjectActions
              project={project}
              onDelete={fetchProjects}
              onEdit={(p: any) => setEditProject(p)}
            />
          </div>

        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editProject && (
        <EditProjectDialog
          project={editProject}
          onSuccess={() => {
            fetchProjects()
            setEditProject(null)
          }}
          onClose={() => setEditProject(null)}
        />
      )}
    </>
  )
}