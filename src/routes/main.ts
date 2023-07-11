import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import MainController from "../controllers/main.js"
import privateRoute from "../middlewares/privateRoute.js"

export class MainRoute implements expressRoute {
	router: Router
	path = "/"
	private controller = new MainController()

	constructor() {
		this.router = express.Router()
		this.registerRoutes()
	}

	private registerRoutes() {
		this.router.post("/register", this.controller.register)
		this.router.post("/", this.controller.login)
		this.router.get("/", privateRoute, this.controller.authenticate)
		this.router.delete("/", privateRoute, this.controller.delete)
	}
}
