import { NextFunction, Request, Response } from "express"
import JwtService from "../services/jwtservice.js"

const jwt = new JwtService()
export default function (req: Request, res: Response, next: NextFunction) {
	const { decoded, error } = jwt.verify(req.headers.authorization)

	if (error) return res.status(401).json({ error })

	return next()
}
