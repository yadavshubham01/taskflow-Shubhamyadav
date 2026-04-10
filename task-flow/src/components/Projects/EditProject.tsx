import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from "@/lib/schema/project.schema"
import { updateProject } from "@/api/api"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

export default function EditProjectDialog({ project, onSuccess, onClose }: any) {
    const form = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: project,
    })

    const onSubmit = async (data: any) => {
    try {
      await updateProject(project.id, data)
      toast.success("Project updated")
      onSuccess()
    } catch {
      toast.error("Update failed")
    }
  }

    return (
        <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <input
            {...form.register("name")}
            className="border p-2 w-full rounded"
          />
          <textarea
            {...form.register("description")}
            className="border p-2 w-full rounded"
          />

          <button
            disabled={form.formState.isSubmitting}
            className="bg-black text-white w-full py-2 rounded"
          >
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
    )
}