import { SignupFrom } from "@/components/Auth/signup.form";
import { Link } from "react-router-dom";


export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">

        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Create an account
        </h1>
        <p className="text-sm text-gray-800 text-center mt-2">
          Start your journey with us
        </p>

        <div className="mt-6">
          <SignupFrom />
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline cursor-pointer">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}