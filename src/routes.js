import { Router } from 'express'
/** Roteamento do express separado neste arquivo, importando somente o Router */

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

/** Este middleware de autenticação vale apenas para rotas abaixo dele. */
routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.post('/student', StudentController.store)
routes.put('/student/:id', StudentController.update)

export default routes
