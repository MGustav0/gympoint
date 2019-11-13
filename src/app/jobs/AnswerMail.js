import Mail from '../../lib/Mail'

class AnswerHelpOrderMail {
	get key() {
		return 'AnswerHelpOrderMail'
	}

	async handle({ data }) {
		const { response } = data

		await Mail.sendMail({
			to: `${response.student.name} <${response.student.email}>`,
			subject: 'Solicitação Respondida',
			template: 'answerHelpOrder',
			context: {
				student: response.student.name,
				question: response.question,
				answer: response.answer
			}
		})
	}
}

export default new AnswerHelpOrderMail()
