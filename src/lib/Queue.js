import Bee from 'bee-queue'
import EnrollmentMail from '../app/jobs/EnrollmentMail'
import AnswerMail from '../app/jobs/AnswerMail'
import redisConfig from '../config/redis'

/** Cada novo job será importado e colocado no vetor abaixo */
const jobs = [EnrollmentMail, AnswerMail]

class Queue {
	constructor() {
		this.queues = {}

		this.init()
	}

	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				/** "bee" armazena a fila com a conexão ao BD */
				bee: new Bee(key, {
					redis: redisConfig
				}),
				/** Responsável por processar o job -> vem de jobs/CancellationMail.js ou qualquer outra
				 * tarefa em background
				 */
				handle
			}
		})
	}

	/** Método para adicionar novos trabalhos dentro de cada fila
	 * Adiciona a fila "queues[queue]" e passa os dados do job (appoinment no caso) para
	 * "bee.createJob(job)"
	 */
	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save()
	}

	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key]

			bee.on('failed', this.handleFailure).process(handle)
		})
	}

	/** Monitorar erros no processo acima */
	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err)
	}
}

export default new Queue()
