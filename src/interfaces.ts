import { Router } from "express"

export interface expressRoute {
	router: Router
	path: string
}
