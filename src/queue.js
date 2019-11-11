import 'dotenv/config'

import Queue from './lib/Queue'

/** Não iremos executar a aplicação no mesmo node/execução que iremos rodar a fila
 * Colocar em outro terminal/servidor "node: node src/queue.js"
 * Se utilizar o sucrase: yarn queue
 */
Queue.processQueue()
