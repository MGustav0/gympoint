# Pasta "jobs"
  
**Descrição:** Aqui estão os jobs da aplicação. Cada arquivo é um trabalho para ser realizado via _background job_, são exportados para a fila em _lib/Queue.js_ e executados em segundo plano.
  
Pega todas as informações do respectivo controller, faz seu processamento e envia para a fila.
  
## Arquivos

* **AnswerMail.js:** Envia um e-mail com a resposta da academia ao seu pedido de auxílo.
* **EnrollmentCreatedMail.js:** Envia um e-mail com a as informações referentes à matrícula do aluno em algum plano.
* **.js:** 