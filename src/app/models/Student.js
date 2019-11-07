import Sequelize, { Model } from 'sequelize'

class Student extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				age: Sequelize.INTEGER,
				weight: Sequelize.FLOAT,
				height: Sequelize.FLOAT
			},
			{
				sequelize
			}
		)

		/** Retorna o model que foi inicializado */
		return this
	}
}

export default Student
