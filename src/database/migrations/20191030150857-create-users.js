/** Cria a tabela de usuarios */
module.exports = {
	/** Executa a migration */
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				/** Nao permite nulo */
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			/** Senha criptografada */
			password_hash: {
				type: Sequelize.STRING,
				allowNull: false
			},
			/** Se cliente = false || Se prestador: true */
			administrator: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		})
	},

	/** Faz o rollback da migration */
	down: queryInterface => {
		return queryInterface.dropTable('users')
	}
}
