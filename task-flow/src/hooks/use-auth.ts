import { useNavigate } from "react-router-dom";
import { signin, signup } from "../api/api"
import { setAuth } from "@/lib/storage"

export const useAuth = () => {
  const navigate = useNavigate();
  const handleSignup = async (data: any) => {
    const res = await signup(data)
    setAuth(res)
    return res
  }

  const handleSignin = async (data: any) => {
    const res = await signin(data)
    console.log(res.token)
    setAuth(res)
    return res
  }

  return { handleSignup, handleSignin ,navigate }
}