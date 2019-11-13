import {
	startOfDay,
	endOfDay,
	subDays,
	addDays,
	format,
	parseISO
} from 'date-fns'
import pt from 'date-fns/locale/pt'

import CheckinStudent from '../schemas/StudentCheckin'
import Student from '../models/Student'
import Enrollment from '../models/Enrollment'
const { Op } = require('sequelize')

class CheckinController {
	async store(req, res) {
		/** Valida se há este estudante */
		const student = await Student.findByPk(req.params.id)

		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists." })
		}

		/** Validar limite de checkins */
		/** Pegar a data atual */
		const isToday = new Date()

		console.log(`ESSE É O ESTUDANTE ==============> ${student.id}`)
		console.log(`ESSA É A DATA ==============> ${isToday}`)
		console.log(`ESSA É A DATA ==============> ${parseISO(isToday)}`)

		/** Ir no banco SQL e recuperar os dados da matrícula "enrollment" para validação posterior.
		 * O "id" será recebido via parâmetro da constante "student"
		 */
		const enrollmentIsValid = await Enrollment.findOne({
			where: {
				student_id: student.id,
				/** "Op.lte" é um operador do sequelize, utiliza o "<=" para verificar se a data
				 * inicial da matrícula é maior que a data atual, se não for, ele preenche a variável com
				 * "IS NULL", se for ele preenche com a data atual */
				start_date: {
					[Op.lte]: isToday
				},
				/** "Op.gte" é um operador do sequelize, utiliza o ">=" para verificar se a data
				 * final da matrícula é maior que o a data atual, se não for, ele preenche a variável com
				 * "IS NULL" */
				end_date: {
					[Op.gte]: isToday
				}
			},
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['name']
				}
			]
		})

		/** Validação de matrícula vigente */
		if (!enrollmentIsValid) {
			const { end_date, student } = enrollmentIsValid
			const formattedDate = format(end_date, "dd 'de' MMMM 'de' yyyy", {
				locale: pt
			})
			return res.status(401).json({
				error: `The student ${student.name} don't have an active subscription since ${formattedDate}.`
			})
		}

		/** Calcular qual foi o primeiro check-in nos últimos 7 dias */
		const firstDayCheckin = subDays(isToday, 7)

		/** Validação do número máximo de check-ins = 5 por 7 dias corridos */
		const checkins = await CheckinStudent.find({
			student_id: student.id
		})
			/** Aponta o dia em que foi gerado o documento/check-in 7 dias atrás da data atual */
			.gte('createdAt', startOfDay(firstDayCheckin))
			/** Aponta o dia em que foi gerado o documento/check-in na data atual */
			.lte('createdAt', endOfDay(isToday))
			/** Conta a quantidade de documentos/check-ins gerados entre o "gte" e o "lte" */
			.countDocuments()

		if (checkins >= 5) {
			return res.status(400).json({
				error: `Limit check-ins exceeded. The student can only do 5 check-ins within 7 calendar days. Next checkin avaliable in ${addDays(
					firstDayCheckin,
					8
				)}`
			})
		}

		/** Inserção do checkin, caso não tenha ultrapassado o limite */
		const createCheckin = await CheckinStudent.create({
			student_id: student.id
		})

		return res.json(createCheckin)
	}

	/** Listar todos os check-ins */
	async index(req, res) {
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists." })
		}

		return res.status(200).json({})
	}
}

export default new CheckinController()
