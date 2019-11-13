import * as Yup from 'yup'
import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

class HelpOrderController {
	async store(req, res) {
		/** Validate Schema */
		const schema = Yup.object().shape({
			question: Yup.string().required()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		/** Validar studentId */
		const student = await Student.findByPk(req.params.id)

		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists" })
		}

		/** Após a validação, criar o Pedido de Auxílio */
		const help_order = await HelpOrder.create({
			student_id: student.id,
			question: req.body.question
		})

		return res.json(help_order)
	}

	/** Listagem dos pedidos de auxílio do aluno */
	async index(req, res) {
		/** Validar se aluno existe */
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(400).json({ error: "Student doesn't exists." })
		}

		/** Listar os pedidos de auxílio */
		const help_order = await HelpOrder.findAll({
			where: {
				student_id: req.params.id
			}
		})

		return res.status(200).json({ student: student.name, help_order })
	}
}

export default new HelpOrderController()
