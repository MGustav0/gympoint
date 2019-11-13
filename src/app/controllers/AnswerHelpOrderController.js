import * as Yup from 'yup'
import { Op } from 'sequelize'
import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail'
import Queue from '../../lib/Queue'

class AnswerHelpOrderController {
	/** Criação da resposta */
	async store(req, res) {
		/** Validação do schema */
		const schema = Yup.object().shape({
			student_id: Yup.number().required(),
			answer: Yup.string().required()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		/** Validar se aluno existe */
		const { student_id } = req.body

		const isStudent = await Student.findOne({ where: { id: student_id } })

		if (!isStudent) {
			return res.status(400).json({ error: "Student doesn't exists" })
		}

		/** Validar se o pedido de ajuda existe */
		const { id } = req.params
		req.body.answer_at = new Date()

		const helpOrderExists = await HelpOrder.findByPk(id, {
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['name', 'email']
				}
			]
		})

		if (!helpOrderExists) {
			return res.status(400).json({ error: "Help Order doesn't exists" })
		}

		const response = await helpOrderExists.update(req.body)

		/** Enviar email com a resposta da academia para o aluno */
		await Queue.add(AnswerHelpOrderMail.key, { response })

		return res.status(200).json(response)
	}

	/** Listar todas as respostas */
	async index(req, res) {
		/** Listar pedidos de ajuda sem resposta */
		/** Caso não tenha nenhuma parâmetro sendo passado na query (URL) ele retorna a lista */
		if (req.query.history === undefined) {
			const response = await HelpOrder.findAll({
				where: {
					answer: null
				}
			})

			return res.status(200).json(response)
		}

		/** Listar pedidos de ajuda com resposta */
		const response = await HelpOrder.findAll({
			where: {
				answer: {
					[Op.ne]: null
				}
			},
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['id', 'name']
				}
			]
		})

		return res.status(200).json(response)
	}
}

export default new AnswerHelpOrderController()
