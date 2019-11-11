import Sequelize, { Model, DataTypes } from 'sequelize'
import {} from 'date-fns'

class Enrollment extends Model {
	static init(sequelize) {
		super.init(
			{
				student_id: Sequelize.INTEGER,
				plan_id: Sequelize.INTEGER,
				start_date: Sequelize.DATE,
				end_date: Sequelize.DATE,
				price: Sequelize.FLOAT,
				/** Para o plano estar ativo, deve se encontrar entre os períodos de início e fim */
				active: {
					type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, [
						'start-date',
						'end-date'
					]),
					get() {
						const today = new Date()
						if (
							today >= this.get('start_date') &&
							today <= this.get('end_date')
						) {
							return true
						}
						return false
					}
				}
			},
			{
				sequelize
			}
		)

		return this
	}

	/** Chamado automaticamente pelo loader de models em "database/index.js", um constructor
	 * Para associar os models em um relacionamento, pois o estudante faz a matrícula e tem um
	 * plano de matrícula.
	 */
	static associate(models) {
		this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
		this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' })
	}
}

export default Enrollment
