/** Estrutura da aplicacao toda */
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import 'express-async-errors'
import Youch from 'youch'

import routes from './routes'
import sentryConfig from './config/sentry'

/** Abre a conexão com o BD PostgreSQL, pegará o "index.js automaticamente" */
import './database'

/** App será executado sempre que a aplicação for chamada */
class App {
	constructor() {
		this.server = express()

		/** Configuração do Sentry para tratamento de excessões */
		Sentry.init(sentryConfig)

		/** Necessita chamar os middlewares e as rotas para serem executadas */
		this.middlewares()
		this.routes()

		/** Tratamento de excessões */
		this.exceptionHandler()
	}

	middlewares() {
		/** Sentry, configuração de middleware */
		this.server.use(Sentry.Handlers.requestHandler())
		this.server.use(cors())
		/** Aplicacao preparada para receber JSON */
		this.server.use(express.json())
	}

	/** As rotas ficarao no arquivo routes.js, importado acima, e funciona como middlewares,
	 * por isso o uso do ".use"
	 */
	routes() {
		this.server.use(routes)
		this.server.use(Sentry.Handlers.errorHandler())
	}

	/** Middleware para tratamento de excessões via sentry */
	exceptionHandler() {
		this.server.use(async (err, req, res, next) => {
			if (process.env.NODE_ENV === 'development') {
				const errors = await new Youch(err, req).toJSON()

				return res.status(500).json(errors)
			}

			return res.status(500).json({ error: 'Internal server error' })
		})
	}
}

export default new App().server
