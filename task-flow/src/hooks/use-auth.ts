import { useNavigate } from "react-router-dom";
import { signin, signup } from "../api/api"
import { setAuth } from "@/lib/storage"

export type SigninInput = {
  email: string
  password: string
}

export type SignupInput = {
  name: string
  email: string
  password: string
}
export const useAuth = () => {
  const navigate = useNavigate();
  const handleSignup = async (data:SignupInput) => {
    const res = await signup(data)
    setAuth(res)
    return res
  }

  const handleSignin = async (data: SigninInput) => {
    const res = await signin(data)
    console.log(res.token)
    setAuth(res)
    return res
  }

  return { handleSignup, handleSignin ,navigate }
}