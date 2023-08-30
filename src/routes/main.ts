import express, { Router } from "express"
import { expressRoute } from "../interfaces.js"
import MainController from "../controllers/main.js"
import { ProtectRoutes } from "../middlewares/privateRoute.js"

export class MainRoute implements expressRoute {
	router: Router
	path = "/"
	private controller: MainController
	private protector: ProtectRoutes
	/**
	 * @swagger
	 * tags:
	 *   - name: Auth
	 */

	constructor() {
		this.router = express.Router()
		this.controller = new MainController()
		this.protector = new ProtectRoutes()
		this.registerRoutes()
	}

	private registerRoutes() {
		/**
		 * @swagger
		 * /register:
		 *   post:
		 *     tags: [Auth]
		 *     summary: Register
		 *     description: Register new user
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             example:
		 *                email: e@mail.com
		 *                name: name
		 *                password: password
		 *     responses:
		 *       200:
		 *         description:
		 * /:
		 *   post:
		 *     tags: [Auth]
		 *     summary: Login
		 *     description: Login with email and password
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             example:
		 *               email: e@mail.com
		 *               password: password
		 *     responses:
		 *       200:
		 *         description:
		 *   get:
		 *     tags: [Auth]
		 *     security:
		 *       - ApiKeyAuth: []
		 *     summary: Authenticate
		 *     description: Authenticate user and get user details
		 *     produces:
		 *       - application/json
		 *     responses:
		 *         200:
		 *           description:
		 *   delete:
		 *     tags: [Auth]
		 *     security:
		 *       - ApiKeyAuth: []
		 *     summary: Delete
		 *     description: Delete user
		 *     produces:
		 *       - application/json
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             example:
		 *               password: password
		 *     responses:
		 *         200:
		 *           description:
		 */
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
