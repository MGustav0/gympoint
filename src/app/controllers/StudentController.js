import * as Yup from 'yup' /** Importa tudo de dentro do arquivo da biblioteca */
import Student from '../models/Student'

class StudentController {
	/** Possui a mesma face de um middleware dentro do nodejs, recebe os dados de criação do
	 * usuário e cria um novo registro dentro do BD.
	 */
	async store(req, res) {
		/** O Yup segue o "schema validation" */
		/** Valida o objeto req.body, com um formato e tipos específicos e realiza validação
		 * automática de um email, verifica se existe "@", ".com", etc. A senha de ni mínimo
		 * 6 dígitos.
		 */
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			age: Yup.number()
				.positive()
				.integer()
				.required(),
			weight: Yup.number()
				.positive()
				.required(),
			height: Yup.number()
				.positive()
				.required()
		})

		/** Se bater com a validação acima, retorna "true" */
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' })
		}

		/** Verificação de existencia de usuário */
		const studentExists = await Student.findOne({
			where: { email: req.body.email }
		})

		if (studentExists) {
			return res
				.status(400)
				.json({ error: 'Student already exists with this email address.' })
		}

		/** Recebe todo o body, pois o model define o que será utilizado.
		 * Mas retornará apenas o que está desestruturado nos {}
		 */
		const { id, name, email, age, weight, height } = await Student.create(
			req.body
		)

		return res.json({
			id,
			name,
			email,
			age,
			weight,
			height
		})
	}

	/** Listagem geral dos estudantes */
	async index(req, res) {
		const { name } = req.query

		/** Receber "name" como Query -> adicionar rota no routes.js */
		if (name) {
			const student = await Student.findAll({
				where: { name: req.body.name }
			})

			return res.status(200).json(student)
		}

		/** Listagem Geral - Sem Query */
		const student = await Student.findAll()

		return res.status(200).json(student)
	}

	/** Altera dados do Aluno
	 * O id é disponibilizado pelo SessionController.js através do Middleware: auth.js
	 */
	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			age: Yup.number()
				.positive()
				.integer(),
			weight: Yup.number().positive(),
			height: Yup.number().positive()
		})

		/** Verificar se a validação está de acordo com as regras do "schema" */
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' })
		}

		/** Necessita passar o ID no parâmetro da URL para que o aluno seja encontrado no banco */
		const { id } = req.params
		const { email } = req.body

		/** Consulta no BD através da Primary Key fornecida na session. */
		const student = await Student.findByPk(id)

		if (email !== undefined && email !== student.email) {
			const studentExists = await Student.findOne({ where: { email } })

			if (studentExists) {
				return res.status(400).json({ error: 'This email is already in use' })
			}
		}

		/** Atualiza o usuário com as informações passadas */
		const { name, age, weight, height } = await student.update(req.body)

		/** Podemos passar a variável "student" no lugar da constante desestruturada acima em conjunto
		 * com o resultado abaixo, se retirar o objeto JSON e colocar a variável "(student)" receberemos
		 *  todos os dados do banco, como o "createdAt" e o "updatedAt" no corpo da requisição.
		 */

		return res.json({
			id,
			name,
			email,
			age,
			weight,
			height
		})
	}
}

export default new StudentController()
