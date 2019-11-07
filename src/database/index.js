import Sequelize from 'sequelize'

/** Importação dos "models" para conexão com o BD enviando a variável "connection",
 * através do método "init()" */
import User from '../app/models/User'
import Student from '../app/models/Student'
import Plan from '../app/models/Plan'

/** Importação das configurações do BD PostgreSQL */
import databaseConfig from '../config/database'

/** Array com os "models" da aplicação */
const models = [User, Student, Plan]

class Database {
	constructor() {
		this.init()
	}

	/** Responsável pela conexão com o BD */
	init() {
		/** Variável connection */
		this.connection = new Sequelize(databaseConfig)

		/** Percorrendo o array de models, retorna cada uma das classes dos models.
		 * Chama o métodos "init" dentro de cada model passando a conexão "sequelize".
		 */
		models.map(model => model.init(this.connection))
	}
}

export default new Database()
