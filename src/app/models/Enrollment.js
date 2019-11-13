import Sequelize, { Model } from 'sequelize'

class Enrollment extends Model {
	static init(sequelize) {
		super.init(
			{
				start_date: Sequelize.DATE,
				end_date: Sequelize.DATE,
				price: Sequelize.FLOAT
			},
			{
				sequelize
			}
		)

		return this
	}

	/** Chamado automaticamente pelo loader de models em "database/index.js", um constructor
	 * Para associar os models em um relacionamento, pois o aluno faz a matrícula e tem um
	 * plano de matrícula.
	 */
	static associate(models) {
		this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
		this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' })
	}
}

export default Enrollment
