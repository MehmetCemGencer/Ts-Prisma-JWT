import express, { Express } from "express"
import { expressRoute } from "./interfaces.js"

export class App {
	private app: Express
	private readonly port: number

	constructor(port: number, routes: expressRoute[]) {
		this.app = express()
		this.port = port
		this.config()
		this.registerRoutes(routes)
	}

	private registerRoutes(routes: expressRoute[]) {
		routes.map((route) => {
			this.app.use(route.path, route.router)
		})
	}

	private config() {
		this.app.use(express.json())
	}

	start() {
		this.app.listen(this.port, () => {
			console.log("Server listening on port ", this.port)
		})
	}
}
