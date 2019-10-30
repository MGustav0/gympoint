/** Estrutura da aplicacao toda */

import express from 'express'
import routes from './routes'

/** Abre a conexão com o BD PostgreSQL, pegará o "index.js automaticamente" */
import './database'

/** App será executado sempre que a aplicação for chamada */
class App {
	constructor() {
		this.server = express()
		/** Necessita chamar os middlewares e as rotas para serem executadas */
		this.middlewares()
		this.routes()
	}

	middlewares() {
		/** Aplicacao preparada para receber JSON */
		this.server.use(express.json())
	}

	/** As rotas ficarao no arquivo routes.js, importado acima, e funciona como middlewares,
	 * por isso o uso do ".use"
	 */
	routes() {
		this.server.use(routes)
	}
}

export default new App().server
