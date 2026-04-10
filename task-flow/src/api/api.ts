import type { SigninInput, SignupInput } from '@/lib/schema/auth.schema'
import  api  from './axios'
import type { ProjectInputType } from '@/lib/schema/project.schema'
import type { TaskInput } from '@/lib/schema/task.schema'


/**
 * PROJECT API 
 */
export const signup = async (data: SignupInput) => {
  const res = await api.post("/auth/register", data)
  console.log(res)
  return res.data
}

export const signin = async (data: SigninInput) => {
  const res = await api.post("/auth/login", data)
  console.log(res)
  return res.data
}

/**
 * PROJECT API 
 */
export const getProjects = async() => {
  const res = await api.get("/projects")
  return res.data.projects ||  res.data;
}

export const getProjectById = async (id: string) => {
  const res = await api.get(`/projects/${id}`)
  return res.data
}

export const createProject = async (data: ProjectInputType) => {
  const res = await api.post("/projects", {
    ...data,
    created_at: new Date().toISOString(),
  })
  return res.data
}

export const updateProject = async (id: string, data: TaskInput) => {
  const res = await api.patch(`/projects/${id}`, data)
  return res.data
}

export const deleteProject = async (id: string) => {
  await api.delete(`/projects/${id}`)
}


/**
 * TASK API 
 */

export const getTasks = async (projectId: string) => {
  const res = await api.get(`/tasks?project_id=${projectId}`)
  return res.data
}

export const createTask = async (projectId: string, data: TaskInput) => {
  const res = await api.post(`/tasks`, {
    ...data,
    project_id: projectId,
    created_at: new Date().toISOString(),
  })
  return res.data
}

type UpdateTaskInput = Partial<TaskInput>
export const updateTask = async (id: string, data: UpdateTaskInput) => {
  const res = await api.patch(`/tasks/${id}`, data)
  return res.data
}

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`)
}