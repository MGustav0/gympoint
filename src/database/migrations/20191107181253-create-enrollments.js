module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('enrollments', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			student_id: {
				/** Referencia apenas o ID do aluno como FK - chave estrangeira */
				type: Sequelize.INTEGER,
				allowNull: true,
				/** Chave estrangeira, referencia a tabela appointments por ID, todo "avatar_id" da tabela
				 * "users" vai ser uma "id" contido na tabela "appointments"
				 */
				references: {
					model: 'students',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			},
			/** Referencia apenas o ID do plano como FK - chave estrangeira */
			plan_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'plans',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			price: {
				type: Sequelize.FLOAT,
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

	down: queryInterface => {
		return queryInterface.dropTable('enrollments')
	}
}
