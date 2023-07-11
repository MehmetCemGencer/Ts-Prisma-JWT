import { Request, Response } from "express"
import JwtService from "../services/jwtservice.js"
import { PrismaClient } from "@prisma/client"
import { Profile } from "../types.js"

export default class ProfileController {
	private jwt = new JwtService()
	private db = new PrismaClient()

	getProfile = async (req: Request, res: Response) => {
		const decode = this.jwt.decode(req.headers.authorization)

		const profile = await this.db.profile.findUnique({
			where: { id: decode["id"] },
		})

		res.json({ data: profile })
	}

	updateProfile = async (req: Request, res: Response) => {
		const id = req.params.id
		const { fname, lname, country, city }: Profile = req.body
		const decode = this.jwt.decode(req.headers.authorization)

		if (id != decode["id"])
			return res.status(400).json({
				message: "Check id",
			})

		const profile = await this.db.profile.update({
			where: { id },
			data: { fname, lname, country, city },
		})

		res.json({ data: profile, message: "Profile updated" })
	}
}
