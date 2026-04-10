
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signupSchema, type SignupInput } from "@/lib/schema/auth.schema"
import { toast } from "sonner"

export const SignupFrom = () => {
  const { handleSignup ,navigate} = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupInput) => {
    try {
     const res= await handleSignup(data)
      if(res){
        navigate('/projects')
      }
      toast.success("Signup successful")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input placeholder="Name" {...register("name")} />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  )
}