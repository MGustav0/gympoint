import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				/** VIRTUAL -> Não existirá no BD, apenas no código */
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				administrator: Sequelize.BOOLEAN
			},
			{
				sequelize
			}
		)

		/** Hook -> Trechos de código executados de forma automática baseado em ações que
		 * acontecem no model.
		 * Neste caso, ateraremos o usuário antes de salvar.
		 */
		this.addHook('beforeSave', async user => {
			if (user.password) {
				/** Criptografar a senha sempre que gerar uma nova. */
				user.password_hash = await bcrypt.hash(user.password, 8)
			}
		})

		/** Retorna o model que foi inicializado */
		return this
	}

	checkPassword(password) {
		/** Compara a senha fornecida com a senha do BD, retornando "true" or "false" */
		return bcrypt.compare(password, this.password_hash)
	}
}

export default User
