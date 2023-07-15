import { NextFunction, Request, Response } from "express"
import JwtService from "../services/jwtservice.js"

export class ProtectRoutes {
	private jwt = new JwtService()

	privateRoute = (req: Request, res: Response, next: NextFunction) => {
		const { decoded, error } = this.jwt.verify(req.headers.authorization)

		if (error) return res.status(401).json({ error })

		return next()
	}
}
