import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import MainController from "../controllers/main.js"
import { ProtectRoutes } from "../middlewares/privateRoute.js"

export class MainRoute implements expressRoute {
	router: Router
	path = "/"
	private controller: MainController
	private protector: ProtectRoutes

	constructor() {
		this.router = express.Router()
		this.controller = new MainController()
		this.protector = new ProtectRoutes()
		this.registerRoutes()
	}

	private registerRoutes() {
		this.router.post("/register", this.controller.register)
		this.router.post("/", this.controller.login)
		this.router.get(
			"/",
			this.protector.privateRoute,
			this.controller.authenticate
		)
		this.router.delete(
			"/",
			this.protector.privateRoute,
			this.controller.delete
		)
	}
}
