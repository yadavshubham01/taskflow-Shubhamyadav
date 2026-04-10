import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  projectSchema,
  type ProjectInputType,
} from "@/lib/schema/project.schema"

import { createProject } from "@/api/api"
import { useState } from "react"
import { toast } from "sonner"

type AddProject = {
  onSuccess : () => void
}
export default function AddProjectDialog({ onSuccess }: AddProject) {
  const [open, setOpen] = useState(false)

  const form = useForm<ProjectInputType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (data: ProjectInputType) => {
    try {
      await createProject(data)
      toast.success("Project created")

      onSuccess()
      setOpen(false)
      form.reset()
    } catch {
      toast.error("Failed to create project")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ New Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Creating..."
                : "Create Project"}
            </Button>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}