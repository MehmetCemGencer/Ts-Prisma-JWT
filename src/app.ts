import express, { Express } from "express"
import { expressRoute } from "./interfaces.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

export class App {
	private app: Express
	private readonly port: number

	constructor(port: number, routes: expressRoute[]) {
		this.app = express()
		this.port = port
		this.config()
		this.registerRoutes(routes)
		this.setupSwagger()
	}

	private registerRoutes(routes: expressRoute[]) {
		routes.map((route) => {
			this.app.use(route.path, route.router)
		})
	}

	private config() {
		this.app.use(express.json())
	}

	private setupSwagger() {
		const options = {
			definition: {
				openapi: "3.1.0",
				info: {
					title: "Typescript Express",
					version: "1.0.0",
				},
				servers: [
					{
						url: "http://localhost:8000/",
					},
				],
				components: {
					securitySchemes: {
						ApiKeyAuth: {
							type: "apiKey",
							in: "header",
							name: "Authorization",
						},
					},
				},
			},
			apis: ["./src/routes/*.ts"],
		}

		let specs = swaggerJsdoc(options)

		this.app.use(
			"/api-docs",
			swaggerUi.serve,
			swaggerUi.setup(specs, {
				explorer: true,
			})
		)
	}

	start() {
		this.app.listen(this.port, () => {
			console.log("Server listening on port ", this.port)
		})
	}
}
