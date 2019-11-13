# Pasta "views"
  
**Descrição:** Aqui estão todos os arquivos de views da aplicação. Contém os _Templates_ _Engines_ que recebem variáveis do NodeJS e pode-se ter views de várias coisas.

É utilizado o handlebars para a criação dos templates de e-mail.

## Pastas e Arquivos
  
+ **emails:** Pasta contendo as pastas e arquivos de estilização e moldes para envio de e-mails no formato HTML.
* **answerHelpOrder.hbs:** Molde HTML utilizado para enviar a resposta da academia aos pedidos de ajuda do aluno.
* **enrollmentCreated.hbs:** Molde HTML utilizado para enviar a confirmação e os dados da matrícula do aluno.
* **.hbs:** 
  
-- **layouts:** Pasta contendo os layouts padrão das mensagens.
** **default.hbs:** Contém o padrão de estilo de envio de e-mails (fonte, espaçamento, etc.)
  
-- **partials:** Pasta contendo as partes (módulos) que modem ser implementadas em um e-mail, pode conter pedaços como header e footer, por exemplo.
** **footer.hbs:** Contém o footer que pode ser adicionado ao layout dos e-mails (em default.hbs).