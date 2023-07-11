import jwt from "jsonwebtoken"

export default class JwtService {
	sign(id: string, username: string) {
		try {
			const token = jwt.sign({ id, username }, "secret", {
				expiresIn: "1h",
			})

			return { token, error: null }
		} catch (e) {
			return { error: e, token: null }
		}
	}

	verify(token: string) {
		try {
			const decoded = jwt.verify(token, "secret")

			return { decoded, error: null }
		} catch (e) {
			return { error: e as jwt.VerifyErrors, decoded: null }
		}
	}

	decode(token: string) {
		return jwt.decode(token)
	}
}
