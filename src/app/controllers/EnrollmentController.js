import * as Yup from 'yup'
import { parseISO, addMonths, subDays, format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Enrollment from '../models/Enrollment'
import Plan from '../models/Plan'
import Student from '../models/Student'

import EnrollmentMail from '../jobs/EnrollmentMail'
import Queue from '../../lib/Queue'

const { Op } = require('sequelize')

class EnrollmentController {
	async store(req, res) {
		const schema = Yup.object().shape({
			student_id: Yup.number().required(),
			plan_id: Yup.number().required(),
			start_date: Yup.date().required()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		const { student_id, plan_id, start_date } = req.body

		/** Cálculo do preço total do plano */
		const studentPlan = await Plan.findByPk(plan_id)
		const { duration, price } = studentPlan
		const totalPrice = duration * price

		/** Calcular a data final (end_date) do plano de matrícula (enrollment) */
		/** Para se inscrever no mesmo dia, foi necessário subtrair por 1 */
		const parsedStartDate = parseISO(start_date)
		const parsedEndDate = subDays(addMonths(parsedStartDate, duration), 1)

		/** Obter dados para verificar se o aluno possui matrícula vigente */
		const enrollmentValid = await Enrollment.findOne({
			where: {
				student_id,
				/** "Op.get" é um operador, utiliza o ">=", no caso para relacionar com o último dia
				 * ser maior que o início da matrícula
				 */
				end_date: {
					[Op.gte]: parsedStartDate
				}
			},
			/** Utiliza uma matriz de itens para ordenar a consulta ou um método de sequenciação */
			order: ['end_date'],
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['id', 'name', 'email']
				}
			]
		})

		/** Verificar se o aluno possui matrícula vigente */
		if (enrollmentValid !== null) {
			const { end_date, student } = enrollmentValid
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
			price: totalPrice,
			start_date,
			end_date: parsedEndDate
		})

		/** Pegar os dados completos para enviar o email */
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

		/** Enviar o email de matrícula */
		await Queue.add(EnrollmentMail.key, { enrollment })

		return res.json(enrollment)
	}

	/** Listagem das Matrículas */
	async list(req, res) {
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
