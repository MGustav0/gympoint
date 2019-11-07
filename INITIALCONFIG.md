# Configurações do projeto e dependências

## Configuração do VSCode

```javascript
{
    {
    // Configurações do Git
    "git.autofetch": true,
    "git.enableSmartCommit": true,
    // Configurações de Aparência
    "workbench.startupEditor": "newUntitledFile",
    "workbench.colorTheme": "Dracula",
    // Configura a fonte do VSCode
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "workbench.iconTheme": "material-icon-theme",
    // Aplica linhas verticais para lembrar de quebrar linha em codigo muito grande
    "editor.rulers": [
        100,
        100
    ],
    "editor.renderLineHighlight": "all",
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    // Configurações do eslint
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    // Configurar autocomplete para javascript e react
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx"
    },
    // Desabilita importações erradas do VSCode
    "javascript.updateImportsOnFileMove.enabled": "never",
    // Desabilita dica dos parâmetros
    "editor.parameterHints.enabled": false,
    "breadcrumbs.enabled": true,
    // Desabilita dica de possíveis importações erradas do VSCode
    "javascript.suggest.autoImports": false,
    "window.titleBarStyle": "custom",
    }
}
```
## Dependências instaladas via Yarn:

**Front-end**  
```node
yarn add express
```

**Desenvolvimento**  
```node
yarn add typescript sucrase sequelize sequelize-cli prettier nodemon eslint -D
```

## ESLint

**Inicialização:** Após instalação dar o comando para iniciar a configuração 
```node
yarn eslint --init
```
Eu utilizo o padrão **Standard** de estilo do javascript  
Caso esteja utilizando o Yarn, após inicializar a configuração do ESLint, exclua o arquivo package-lock.json. Para reconfigurar as dependencias no yarn.lock, no terminal rode o comando: 
```node
yarn
```

**Criar o arquivo de configuração:** ```.eslinc.js```

```javascript
module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": ['standard', 'prettier', 'plugin:prettier/recommended'],
	"plugins": ['prettier'],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		// Nem todo metodo usara a palavra "this"
		"class-methods-use-this": "off",
		// (IMPORTANTE) Permite que receba o parametro e faca alteracoes nele, usado pelo Sequelize
		"no-param-reassign": "off",
		// Nem todas as variaveis estarao em camelCase, poderao ter "-" ou "_" como separacao
		"camelcase": "off",
		// (IMPORTANTE) Permite a declacao da variavel "next", mesmo sem utilizar
		"no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
		// Identacao por com 2 espacos"TAB"
		"indent": [2, "tab"],
		// Faz com que o "prettier" retorne uma menssagem de erro quando houver
		"prettier/prettier": "error",
	}
};
```

Para usar o Eslint para arrumar todos os arquivos de uma só vez, basta utilizar o comando abaixo, pode-se modificar a pasta **_src_** por outra e o tipo de extensão:
```node
yarn eslint --fix src --ext .js
```

## Pretier

**Instalação:**
```node
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

**Criar arquivo de configuração:** ```.prettierrc```  

```json
{
    "singleQuote": true,
    "semi": false,
    "useTabs": true,
    "tabWidth": 2,
}
```

## Sequelize  

Permite criar, buscar, alterar e remover dados do banco usando objetos e métodos em JS, além de fazer alterações na estrutura das tabelas.  

**Criar arquivo de configuração:** ```.sequelizerc```  

Exporta os caminhos onde estão os caminhos e pastas criados, como o caminho até a pasta config, migrations, models, etc.  

```javascript
const { resolve } = require('path')

module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}
```
### Sequelize: Uso

* Criação da migration: ```yarn sequelize migration:create --name=create-students```
* Inserir migration no BD: ```yarn sequelize db:migrate```
* Desfazer última migration: ```yarn sequelize db:migrate:undo```
* Desfazer todas as migrations: ```yarn sequelize db:migrate:undo:all```
* Criar seeds para o BD: ```yarn sequelize seed:generate --name admin-user```
* Executar o seed: ```yarn sequelize db:seed:all```
* Executar um seed específico: ```yarn sequelize db:seed:all```

## Sucrase/Nodemon  

**Criar arquivo de configuração:** ```nodemon.json```  

Executa o arquivo do sucrase para não dar erro com o nodemon nas últimas configurações do ECMAScript  

```json
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}
```

## Docker
  
1. Para criar um container __Docker__ digite o seguinte comando necessariamente nesta ordem (__postgres usado como exemplo__):
  
Alterar o __PASSWORD_OPTION__ pela opção do seu banco de dados:
* Postgres: ```POSTGRES_PASSWORD```
* MySQL: ```MYSQL_ROOT_PASSWORD```
  
```docker run --name nome_da_imagem -e PASSWORD_OPTION=senha_do_BD -d -p porta_da_imagem:porta_de_saída_do_SO nome_da_imagem_no_HUB-Docker nome_usuario_root```
  
### PostgreSQL

Para criar uma imagem do **PostgreSQL**, basta colocar o seguinte comando no terminal:  
  
* ```docker run --name postgres01 -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário: postgres
* Senha: docker
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```
  
#### PGAdmin  
Para criar uma imagem do **PGAdmin4**, basta colocar o comando no terminal:
  
* ```docker run -p 5555:80 --name pgadmin01 -e 'PGADMIN_DEFAULT_EMAIL=postgres'-e 'PGADMIN_DEFAULT_PASSWORD=docker' dpage/pgadmin4```
* Coloque a porta que estiver livre, no caso a **5555**.
* O terminal ficará ocupado até o final da operação/uso.
* Acesse pelo browser o [localhost](http://localhost:5555/ "localhost")
* Nas configurações iniciais o **_host name/address_** deverá ser: ```host.docker.internal```

### MongoDB

Para criar uma imagem do **MongoDB**, basta colocar o seguinte comando no terminal:  
  
* Criar sem senha (recomendável para desenvolvimento): ```docker run --name mongobarber -p 27017:27017 -t mongo```
* Criar com senha: ```docker run --name nome_de_producao -p 27017:27017 -e MONGODB_PASS="mypass" -t mongo```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário: 
* Senha: 
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```
  
### Redis - Banco performático de chave/valor

Para criar uma imagem do **Redis**, basta colocar o seguinte comando no terminal:  
  
* ```docker run --name redisbarber -p 6379:6379 -d -t redis:alpine```
* O comando ```redis:apine``` traz as features mais essenciais do linux.
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Usuário: 
* Senha: 
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```

### MySQL

Para criar uma imagem do **MySQL**, basta colocar o seguinte comando no terminal:  
  
* ```docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=docker -d -p 3306:3306 mysql```
* Verificar se a imagem está rodando: ```docker ps```
* Verificar os logs da imagem (nome_da_imagem = database): ```docker logs nome_da_imagem```
* Acesso pelo terminal: ```docker exec -it nome_do_container bash```
  
#### phpMyAdmin  
Para criar uma imagem do **phpMyAdmin4**, basta colocar o seguinte comando no terminal:
  
* ```docker run --name phpmyadmin01 -d --link mysql01:db -p 8080:80 phpmyadmin/phpmyadmin```
* Coloque a porta que estiver livre, no caso a **8080**.
* Acesse pelo browser o [localhost](http://localhost:8080/ "localhost")
* Nas configurações iniciais o **_host name/address_** deverá ser: ```host.docker.internal```
  
**Obs.:** Caso não consiga acessar o phpMyAdmin por causa desses erros:
  
* ```#2054 - The server requested authentication method unknown to the client```
* ```mysqli_real_connect(): The server requested authentication method unknown to the client [caching_sha2_password]```
* ```mysqli_real_connect(): (HY000/2054): The server requested authentication method unknown to the client```
  
Acesse a imagem utilizando o terminal e o comando de acesso pelo docker e execute esta sequência de comandos:

1. ```docker exec -it mysql01 bash``` - ```mysql01``` pode ser substituído pelo nome da imagem em uso.
2. ```mysql -u root -p```
3. ```ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'docker';```
  
## GitHub

Create a new repository on the command line:
  
1. echo "# gympoint" >> README.md
2. git init
3. git add README.md
4. git commit -m "first commit"

Pushing:
  
1. git remote add origin git@github.com:MGustav0/gympoint.git
2. git push -u origin master
