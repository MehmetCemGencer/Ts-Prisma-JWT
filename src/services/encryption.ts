import bcrypt from "bcrypt"

export default class EncryptionService {
	async encrypt(password: string) {
		try {
			const hash = await bcrypt.hash(password, 10)

			return { hash, error: null }
		} catch (e) {
			return { error: e, hash: null }
		}
	}

	async check(password: string, hash: string) {
		try {
			const isMatch = await bcrypt.compare(password, hash)

			return { isMatch, error: null }
		} catch (e) {
			return { error: e, isMatch: false }
		}
	}
}
