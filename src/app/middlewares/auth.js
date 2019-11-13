import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

export default async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({
			error:
				'Token not provided. If you are a provider, please sign in to your account'
		})
	}

	/** Retorna um array desestruturado sem o "Baerer" e o token */
	const [, token] = authHeader.split(' ')

	try {
		/** Utilizando o promisify não há necessidade de passar o callback */
		const decoded = await promisify(jwt.verify)(token, authConfig.secret)

		/** O Id foi fornecido no Controller: SessionController.js, ao retornar o token no
		 * token: jwt.sign({ id }, juntamente com a senha criptografada.
		 */
		req.userId = decoded.id
	} catch (err) {
		return res.status(401).json({ error: 'Token invalid' })
	}

	return next()
}
