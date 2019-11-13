import { startOfDay, endOfDay, subDays, addDays, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Enrollment from '../models/Enrollment'
import StudentCheckin from '../schemas/StudentCheckin'
import Student from '../models/Student'
const { Op } = require('sequelize')

class CheckinController {
	async store(req, res) {
		/** Valida se há este aluno */
		const student = await Student.findByPk(req.params.id)

		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists." })
		}

		/** Validar limite de checkins */
		/** Pegar a data atual */
		const isToday = new Date()

		/** Ir no banco SQL e recuperar os dados da matrícula "enrollment" para validação posterior.
		 * O "id" será recebido via parâmetro da constante "student"
		 */
		const enrollmentIsValid = await Enrollment.findOne({
			where: {
				student_id: student.id,
				start_date: {
					[Op.lte]: isToday
				},
				end_date: {
					[Op.gte]: isToday
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

		/** Validação de matrícula vigente */
		if (await (enrollmentIsValid === null)) {
			const { end_date, student } = enrollmentIsValid
			const formattedDate = format(end_date, "dd 'de' MMMM 'de' yyyy", {
				locale: pt
			})
			return res.status(401).json({
				error: `The student ${student.name} don't have an active subscription since ${formattedDate}.`
			})
		}

		/** Calcular qual foi o primeiro check-in nos últimos 7 dias */
		const pastSevenDays = subDays(isToday, 7)
		const startDay = startOfDay(pastSevenDays)
		const endDay = endOfDay(isToday)

		/** Validação do número máximo de check-ins = 5 por 7 dias corridos */
		const checkins = await StudentCheckin.find({
			student_id: student.id,
			/** gte -> createdAt <= startDay
			 * AND
			 * lte -> createdAt >= endDay */
			createdAt: { $gte: startDay, $lte: endDay }
		}).countDocuments()

		if (checkins > 4) {
			const availableCheckin = addDays(endDay, 3)
			const formattedDate = format(availableCheckin, "dd 'de' MMMM 'de' yyyy", {
				locale: pt
			})
			return res.status(401).json({
				error: `Limit check-in exceeded. The student can only do 5 check-ins within 7 calendar days. Next checkin avaliable in ${formattedDate}`
			})
		}

		/** Inserção do checkin no BD, caso não tenha ultrapassado o limite */
		const createCheckin = await StudentCheckin.create({
			student_id: student.id
		})

		return res.status(200).json(createCheckin)
	}

	/** Listar todos os check-ins */
	async index(req, res) {
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists." })
		}

		const checkins = await StudentCheckin.find({
			student_id: student.id
		})
			.sort('createdAt')
			.limit(30)

		return res.status(200).json(checkins)
	}
}

export default new CheckinController()
