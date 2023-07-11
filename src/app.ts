import express, { Express } from "express"
import { expressRoute } from "./interfaces.js"

export class App {
	private app: Express
	private readonly port: number

	constructor(port: number, routes: expressRoute[]) {
		this.app = express()
		this.port = port
		this.parseJson()
		this.registerRoutes(routes)
	}

	start() {
		this.app.listen(this.port, () => {
			console.log("Server listening on port ", this.port)
		})
	}

	private registerRoutes(routes: expressRoute[]) {
		routes.map((route) => {
			this.app.use(route.path, route.router)
		})
	}

	private parseJson() {
		this.app.use(express.json())
	}
}
