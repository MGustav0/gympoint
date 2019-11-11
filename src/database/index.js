import Sequelize from 'sequelize'

/** Importação dos "models" para conexão com o BD enviando a variável "connection",
 * através do método "init()" */
import User from '../app/models/User'
import Student from '../app/models/Student'
import Plan from '../app/models/Plan'
import Enrollment from '../app/models/Enrollment'
import Checkin from '../app/models/Checkin'
import HelpOrder from '../app/models/HelpOrder'

/** Importação das configurações do BD PostgreSQL */
import databaseConfig from '../config/database'

/** Array com os "models" da aplicação */
const models = [User, Student, Plan, Enrollment, Checkin, HelpOrder]

class Database {
	constructor() {
		this.init()
	}

	/** Responsável pela conexão com o BD */
	init() {
		/** Variável connection */
		this.connection = new Sequelize(databaseConfig)

		models
			/** Percorrendo o array de models, retorna cada uma das classes dos models.
			 * Chama o métodos "init" dentro de cada model passando a conexão "sequelize".
			 */
			.map(model => model.init(this.connection))
			/** Chama o model.associate, somente se ele existir com a condição, executando dentro de
			 * "this.connection.models"
			 */
			.map(model => model.associate && model.associate(this.connection.models))
	}
}

export default new Database()
