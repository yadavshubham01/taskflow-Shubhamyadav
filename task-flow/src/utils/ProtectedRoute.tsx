import { Navigate } from "react-router-dom"
import { getToken } from "@/lib/storage"

export default function ProtectedRoute({ children }: any) {
  if (!getToken()) return <Navigate to="/login" />
  return children
}