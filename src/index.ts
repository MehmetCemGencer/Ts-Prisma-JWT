import { App } from "./app.js"
import { routes } from "./routes/index.js"

const app = new App(8000, routes)

app.start()
