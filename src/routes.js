import { Router } from 'express'
/** Roteamento do express separado neste arquivo, importando somente o Router */

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import EnrollmentController from './app/controllers/EnrollmentController'
import CheckinController from './app/controllers/CheckinController'
import AnswerController from './app/controllers/AnswerController'
import HelpOrderController from './app/controllers/HelpOrderController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

/** Rota de criação de sessão */
routes.post('/sessions', SessionController.store)

/** Rotas de checkin dos alunos */
routes.post('/students/:id/checkins', CheckinController.store)
routes.get('/students/:id/checkins', CheckinController.list)

/** Rotas de pedido de ajuda dos alunos */
routes.post('/students/:id/help-orders', HelpOrderController.store)
routes.get('/students/:id/help-orders', HelpOrderController.list)

/** Middleware de autenticação -> Vale apenas para rotas abaixo dele. */
routes.use(authMiddleware)

/** Rotas com uso de autenticação */

/** Rotas de criação e atualização de usuários administradores */
routes.post('/users', UserController.store)
routes.put('/users', UserController.update)

/** Rotas de criação e atualização de alunos */
routes.post('/student', StudentController.store)
routes.get('/student', StudentController.list)
routes.put('/student/:id', StudentController.update)

/** Rotas dos planos de matrícula */
routes.post('/plans', PlanController.store)
routes.get('/plans', PlanController.index)
routes.put('/plans/:id', PlanController.update)
routes.delete('/plans/:id', PlanController.delete)

/** Rotas de gestão dos planos */
routes.post('/enrollments', EnrollmentController.store)
routes.get('/enrollments', EnrollmentController.index)
routes.get('/enrollments/:id', EnrollmentController.details)
routes.put('/enrollments/:id', EnrollmentController.update)
routes.delete('/enrollments/:id', EnrollmentController.delete)

/** */
routes.post('/help-orders/:id/answer', AnswerController.store)
routes.get('/help-orders/', AnswerController.list)

export default routes
