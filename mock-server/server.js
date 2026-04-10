
const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Fake JWT generator
const generateToken = (user) => {
  return "fake-jwt-token-" + user.id
}

// REGISTER
server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body

  const db = router.db
  const existing = db.get("users").find({ email }).value()

  if (existing) {
    return res.status(400).json({ error: "User already exists" })
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  }

  db.get("users").push(newUser).write()

  res.status(201).json({
    token: generateToken(newUser),
    user: { id: newUser.id, name, email },
  })
})

// LOGIN
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body

  const db = router.db
  const user = db.get("users").find({ email, password }).value()

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  res.json({
    token: generateToken(user),
    user: { id: user.id, name: user.name, email: user.email },
  })
})

// PROTECTED ROUTES
server.use((req, res, next) => {
  if (req.path.startsWith("/projects")) {
    const auth = req.headers.authorization
    if (!auth) {
      return res.status(401).json({ error: "unauthorized" })
    }
  }
  next()
})

server.use(router)
server.listen(4000, () => {
  console.log("Mock API running on http://localhost:4000")
})