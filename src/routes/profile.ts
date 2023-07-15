import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import ProfileController from "../controllers/profile.js"
import { ProtectRoutes } from "../middlewares/privateRoute.js"

export class ProfileRoute implements expressRoute {
	router: Router
	path = "/profile"
	private controller: ProfileController
	private protector: ProtectRoutes

	constructor() {
		this.router = express.Router()
		this.controller = new ProfileController()
		this.protector = new ProtectRoutes()
		this.registerRoutes()
	}

	private registerRoutes() {
		this.router.get(
			"/:id",
			this.protector.privateRoute,
			this.controller.getProfile
		)
		this.router.put(
			"/:id",
			this.protector.privateRoute,
			this.controller.updateProfile
		)
	}
}
