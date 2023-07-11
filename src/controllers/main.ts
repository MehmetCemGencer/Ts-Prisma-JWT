import { Request, Response } from "express"
import JwtService from "../services/jwtservice.js"
import EncryptionService from "../services/encryption.js"
import { PrismaClient } from "@prisma/client"

export default class MainController {
	private jwt = new JwtService()
	private db = new PrismaClient()
	private encryption = new EncryptionService()

	register = async (req: Request, res: Response) => {
		const { email, name, password } = req.body
		const isUserExists = await this.db.user.findUnique({ where: { email } })

		if (isUserExists)
			return res.status(400).json({ message: "User already exists" })

		const { hash, error: err } = await this.encryption.encrypt(password)

		if (err) return res.status(500).json({ message: err })

		const user = await this.db.user.create({
			data: {
				name,
				email,
				password: hash,
				profile: { create: {} },
			},
			select: {
				id: true,
				email: true,
			},
		})

		const { token, error } = this.jwt.sign(user.id, user.email)
		if (error) return res.status(500).json({ error: "Server Error" })

		return res.status(201).json({ token, message: "User created" })
	}

	login = async (req: Request, res: Response) => {
		const { email, password } = req.body

		const user = await this.db.user.findUnique({ where: { email } })
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" })

		const { isMatch, error: e } = await this.encryption.check(
			password,
			user.password
		)

		if (e) return res.status(500).json({ message: e })
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" })

		const { token, error: err } = await this.jwt.sign(user.id, user.email)
		if (err) return res.status(500).json({ message: err })

		return res.json({ token })
	}

	authenticate = async (req: Request, res: Response) => {
		const decoded = this.jwt.decode(req.headers.authorization)

		const user = await this.db.user.findUnique({
			where: { id: decoded["id"] },
		})

		delete user["password"]

		return res.json({ user })
	}

	delete = async (req: Request, res: Response) => {
		const password = req.body.password
		const decoded = this.jwt.decode(req.headers.authorization)

		const user = await this.db.user.findUnique({
			where: { id: decoded["id"] },
		})

		const { isMatch, error: e } = await this.encryption.check(
			password,
			user.password
		)

		if (e) return res.status(500).json({ message: e })
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" })

		await this.db.user.delete({ where: { id: user.id } })

		return res.json({ message: "User deleted" })
	}
}
