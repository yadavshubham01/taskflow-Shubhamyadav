export const setAuth = (data: any) => {
  localStorage.setItem("token", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))
}

export const getToken = () => localStorage.getItem("token")
export const getUser = () => {
  const u = localStorage.getItem("user")
  console.log("u",u)
  return u ? JSON.parse(u) : null
}

export const clearAuth = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}