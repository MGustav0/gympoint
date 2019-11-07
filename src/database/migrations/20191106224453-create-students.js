/** Cria a tabela de Alunos */
module.exports = {
	/** Executa a migration */
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('students', {
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
			age: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			weight: {
				type: Sequelize.DOUBLE,
				allowNull: false
			},
			height: {
				type: Sequelize.DOUBLE,
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
		return queryInterface.dropTable('students')
	}
}
