import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import ProfileController from "../controllers/profile.js"
import privateRoute from "../middlewares/privateRoute.js"

export class ProfileRoute implements expressRoute {
	router: Router
	path = "/profile"
	private controller = new ProfileController()

	constructor() {
		this.router = express.Router()
		this.registerRoutes()
	}

	private registerRoutes() {
		this.router.get("/:id", privateRoute, this.controller.getProfile)
		this.router.put("/:id", privateRoute, this.controller.updateProfile)
	}
}
