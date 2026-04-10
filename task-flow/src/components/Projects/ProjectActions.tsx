import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { deleteProject } from "@/api/api"
import { toast } from "sonner"

export default function ProjectActions({ project, onDelete, onEdit }: any) {
  const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete?")

  if (!confirmDelete) return

  try {
    await deleteProject(project.id)
    toast.success("Project deleted")
    onDelete()
  } catch {
    toast.error("Delete failed")
  }
}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="w-4 h-4 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onEdit(project)}>
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}