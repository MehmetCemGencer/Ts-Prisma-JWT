import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import ProfileController from "../controllers/profile.js"
import { ProtectRoutes } from "../middlewares/privateRoute.js"

export class ProfileRoute implements expressRoute {
	router: Router
	path = "/profile"
	private controller: ProfileController
	private protector: ProtectRoutes
	/**
	 * @swagger
	 * tags:
	 *   - name: Profile
	 */

	/**
	 * @swagger
	 * /profile/{id}:
	 *   get:
	 *     security:
	 *       - ApiKeyAuth: []
	 *     tags: [Profile]
	 *     summary: Get Profile
	 *     description: Get profile details
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: User id
	 *         type: string
	 *         required: true
	 *     responses:
	 *       200:
	 *         description:
	 *   put:
	 *     security:
	 *       - ApiKeyAuth: []
	 *     tags: [Profile]
	 *     summary: Update Profile
	 *     description: Update profile fields
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: User id
	 *         type: string
	 *         required: true
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             example:
	 *               fname:
	 *               lname:
	 *               country:
	 *               city:
	 *     responses:
	 *       200:
	 *         description:
	 */
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
