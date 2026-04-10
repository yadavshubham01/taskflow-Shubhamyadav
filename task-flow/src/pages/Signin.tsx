import { SigninForm } from "@/components/Auth/signin.form";
import { Link } from "react-router-dom";


export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border">
        
        <h1 className="text-2xl font-semibold text-black text-center">
          Welcome back
        </h1>
        <p className="text-sm text-gray-900 text-center mt-2">
          Enter your credentials to continue
        </p>

        <div className="mt-6">
          <SigninForm />
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-black font-medium hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}