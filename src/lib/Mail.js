import nodemailer from 'nodemailer'
import { resolve } from 'path'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import mailConfig from '../config/mail'

class Mail {
	constructor() {
		const { host, port, secure, auth } = mailConfig

		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: auth.user ? auth : null
		})

		this.configureTemplates()
	}

	/** Localização e configuração dos templates de e-mail */
	configureTemplates() {
		const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

		/** O "exphbs" atua no "compile" para mostrar os templates de e-mail */
		this.transporter.use(
			'compile',
			nodemailerhbs({
				viewEngine: exphbs.create({
					layoutsDir: resolve(viewPath, 'layouts'),
					partialsDir: resolve(viewPath, 'partials'),
					defaultLayout: 'default',
					extname: '.hbs'
				}),
				viewPath,
				extName: '.hbs'
			})
		)
	}

	/** Responsável por enviar o email
	 * Pega todos os dados da mensagem e soma com os do controller
	 */
	sendMail(message) {
		return this.transporter.sendMail({
			...mailConfig.default,
			...message
		})
	}
}

export default new Mail()
