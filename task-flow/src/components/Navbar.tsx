import { getUser, clearAuth } from "@/lib/storage"
import { useTheme } from "@/utils/theme"
import { Moon,Sun } from "lucide-react"

import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const user = getUser()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    clearAuth()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-sm border-b px-3 sm:px-6 py-1 border-slate-200 dark:bg-gray-900 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 h-14">

        {/* Logo */}
        <div
          onClick={() => navigate("/projects")}
          className="text-base font-semibold cursor-pointer"
        >
          TaskFlow
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

         <button
          onClick={toggleTheme}
          className="text-sm px-2 py-1 border rounded-md"
           >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
           </button>

          <span className="text-sm px-3 py-1 text-gray-600 dark:text-gray-100 hidden sm:block border rounded-full">
            {user?.name[0]}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  )
}