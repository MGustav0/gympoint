import * as Yup from 'yup'
import {
	parseISO,
	addMonths,
	format,
	startOfDay,
	compareDesc,
	subHours
} from 'date-fns'
import pt from 'date-fns/locale/pt'
import Enrollment from '../models/Enrollment'
import Plan from '../models/Plan'
import Student from '../models/Student'

import EnrollmentCreatedMail from '../jobs/EnrollmentCreatedMail'
import Queue from '../../lib/Queue'

const { Op } = require('sequelize')

class EnrollmentController {
	async store(req, res) {
		const schema = Yup.object().shape({
			student_id: Yup.number().required(),
			plan_id: Yup.number().required(),
			start_date: Yup.date().required()
		})

		/** Validação do schema */
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Invalid enrollment' })
		}

		const { student_id, plan_id, start_date } = req.body

		/** Cálculo do preço total do plano */
		const { duration, price } = await Plan.findByPk(plan_id)
		const planPrice = duration * price

		const parsedStartDate = parseISO(start_date)

		/** Fazer com que a hora seja resetada para 00:00 */
		const startDay = startOfDay(parsedStartDate)

		/** Permitir se matricular no mesmo dia */
		const endDate = addMonths(startDay, duration)

		/** Evitar que o aluno se matricule para uma data anterior a atual */
		if (await (compareDesc(new Date(), startDay) === -1)) {
			/** Se o resultado for true, ele não poderá se matricular */
			return res.status(401).json({
				error: 'Registration date cannot be earlier than current date'
			})
		}

		/** Obter dados da tabela para verificar se o aluno possui matrícula vigente */
		const enrollmentIsValid = await Enrollment.findOne({
			where: {
				student_id,
				end_date: {
					[Op.gte]: startDay
				}
			},
			order: ['end_date'],
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['id', 'name', 'email']
				}
			]
		})

		/** Verificar se o aluno possui matrícula vigente, a chamada acima retorna um "boolean" */
		if (enrollmentIsValid !== null) {
			const { end_date, student } = enrollmentIsValid
			const formattedDate = format(end_date, "dd 'de' MMMM 'de' yyyy", {
				locale: pt
			})
			return res.json({
				message: `The student ${student.name} already has an active enrollment until ${formattedDate}.`
			})
		}

		/** Criar uma matrícula */
		const enrollmentSave = await Enrollment.create({
			student_id,
			plan_id,
			price: planPrice,
			start_date: subHours(startDay, 5),
			end_date: endDate
		})

		/** Pega os dados do cadastro da matrícula, inclui os dados do aluno "student" e do
		 * plano "plan" os guardando em "enrollment" para enviar o email em seguida */
		const enrollment = await Enrollment.findByPk(enrollmentSave.id, {
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['id', 'name', 'email']
				},
				{
					model: Plan,
					as: 'plan',
					attributes: ['id', 'title']
				}
			]
		})

		/** Enviar o email de confirmação de matrícula */
		await Queue.add(EnrollmentCreatedMail.key, { enrollment })

		return res.json(enrollmentSave)
	}

	/** Listagem das Matrículas */
	async index(req, res) {
		const enrollment = await Enrollment.findAll()

		return res.status(200).json(enrollment)
	}

	async details(req, res) {
		const { id } = req.params

		const enrollment = await Enrollment.findByPk(id, {
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['name', 'email']
				}
			]
		})

		return res.status(200).json(enrollment)
	}

	/** Atualização de Matrículas */
	async update(req, res) {
		const schema = Yup.object().shape({
			student_id: Yup.number(),
			plan_id: Yup.number(),
			start_date: Yup.date(),
			end_date: Yup.date(),
			price: Yup.number()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		const { id } = req.params

		let enrollment = await Enrollment.findByPk(id, {
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['name', 'email']
				}
			]
		})

		enrollment = await enrollment.update(req.body)

		return res.status(200).json(enrollment)
	}

	/** Remoção de Matrículas */
	async delete(req, res) {
		const { id } = req.params

		const enrollmentExists = await Enrollment.findByPk(id)
		if (!enrollmentExists) {
			return res.status(400).json({ error: "That enrollment doesn't exists." })
		}

		await Enrollment.destroy({ where: { id } })
		return res.status(200).json({ message: 'Enrollment deleted.' })
	}
}

export default new EnrollmentController()
