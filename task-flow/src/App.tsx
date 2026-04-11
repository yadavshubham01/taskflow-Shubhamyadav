import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProjectsPage from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={<Signup />} />
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          } />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
