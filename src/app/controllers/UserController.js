import * as Yup from 'yup' /** Importa tudo de dentro do arquivo da biblioteca */
import User from '../models/User'

class UserController {
	/** Possui a mesma face de um middleware dentro do nodejs, recebe os dados de criação do
	 * usuário e cria um novo registro dentro do BD.
	 */
  async store(req, res) {
    /** O Yup segue o "schema validation" */
		/** Valida o objeto req.body, com um formato e tipos específicos e realiza validação
		 * automática de um email, verifica se existe "@", ".com", etc.
		 */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    })

    /** Se bater com a validação acima, retorna "true" */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    /** Verificação de existencia de usuário */
    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' })
    }

		/** Recebe todo o body, pois o model define o que será utilizado.
		 * Mas retornará apenas o que está desestruturado nos {}
		 */
    const { id, name, email, provider } = await User.create(req.body)

    return res.json({
      id,
      name,
      email,
      provider
    })
  }

	/** Altera dados do usuário
	 * O id é disponibilizado pelo SessionController.js através do Middleware: auth.js
	 */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
			/** Se o usuário digitar o oldPassword, o novo password será obrigatório
			 * Passa uma função para garantir que passe a senha.
			 * Se "oldPassword" estiver preenchida, o field vai ser requerido, se não
			 * retorna como estava antes.
			 */
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      /** "oneOf([Yup.ref('password")]) está referenciando ao campo "password" acima */
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    /** Se bater com a validação acima, retorna "true" */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email, oldPassword } = req.body

    /** Consulta no BD através da Primary Key fornecida na session. */
    const user = await User.findByPk(req.userId)

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    /** Se informar a senha antiga, atualiza para a nova */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    /** Atualiza o usuário com as informações passadas */
    const { id, name, provider } = await user.update(req.body)

    return res.json({
      id,
      name,
      email,
      provider
    })
  }
}

export default new UserController()
