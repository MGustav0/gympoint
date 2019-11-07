import * as Yup from 'yup'
import Plan from '../models/Plan'

class PlanController {
	async store(req, res) {
		/** Validação do Schema */
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.number().required(),
			price: Yup.number().required()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		/** Verificar se o plano já existe baseado no título */
		const planTitleExists = await Plan.findOne({
			where: { title: req.body.title }
		})
		if (planTitleExists) {
			return res.status(400).json({
				error: `Plan ${planTitleExists.title} already uses that title.`
			})
		}

		/** Verificar se o plano já existe baseado no preço */
		const planPriceExists = await Plan.findOne({
			where: { price: req.body.price }
		})
		if (planPriceExists) {
			return res.status(400).json({
				error: `Plan ${planPriceExists.title} already uses that price.`
			})
		}

		/** Criação do plano */
		const { id, title, duration, price } = await Plan.create(req.body)

		return res.json({
			id,
			title,
			duration,
			price
		})
	}

	/** Listagem dos planos */
	async list(req, res) {
		const plan = await Plan.findAll()

		return res.status(200).json(plan)
	}

	/** Alteração dos planos */
	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string(),
			duration: Yup.number(),
			price: Yup.number()
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validations fails' })
		}

		const { id } = req.params
		const { price } = req.body

		let plan = await Plan.findByPk(id)

		if (price !== undefined && price !== plan.price) {
			/** Verificar se o plano já existe baseado no título */
			const planTitleExists = await Plan.findOne({
				where: { title: req.body.title }
			})
			if (planTitleExists) {
				return res.status(400).json({
					error: `Plan ${planTitleExists.title} already uses that title.`
				})
			}

			/** Verificar se o plano já existe baseado no preço */
			const planPriceExists = await Plan.findOne({
				where: { price: req.body.price }
			})
			if (planPriceExists) {
				return res.status(400).json({
					error: `Plan ${planPriceExists.title} already uses that price.`
				})
			}
		}

		plan = await plan.update(req.body)

		return res.status(200).json(plan)
	}

	/** Remoção dos planos */
	async delete(req, res) {
		const { id } = req.params

		const planExists = await Plan.findByPk(id)
		if (!planExists) {
			return res.status(400).json({ error: "That plan doesn't exists." })
		}

		await Plan.destroy({ where: { id } })
		return res.status(200).json({ message: 'Plan deleted.' })
	}
}

export default new PlanController()
