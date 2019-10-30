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
<strong><h2>Dependências instaladas via Yarn:</h2></strong>

<p>Usuário</p>
<code>yarn add express</code>

<p>Desenvolvimento</p>
<code>yarn add typescript sucrase sequelize sequelize-cli prettier nodemon eslint -D</code>

<strong><h2>ESLint</h2></strong>

<strong>Inicialização: </strong><p>Após instalação dar o comando para iniciar a configuração <code>yarn eslint --init</code></p>
<p>Eu utilizo o padrão Standar de estilo do javascript</p>
<p>Após inicializar, exclua o arquivo package-lock.json, caso esteja utilizando o Yarn, no terminal rode o comando: <code>yarn</code> para reconfigurar as dependencias no yarn.lock</p>

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

<Strong>Arquivo de configuração: <Strong>Criar o arquivo: <code>.eslinc.js</code>

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
<p>Para usar o Eslint para arrumar todos os arquivos de uma só vez, basta utilizar o comando abaixo, pode-se modificar a pasta "src" por outra e o tipo de extensão:</p>

<code>yarn eslint --fix src --ext .js</code>

<strong><h2>Pretier</h2></strong>

<strong>Instalação: </strong><code>yarn add prettier eslint-config-prettier eslint-plugin-prettier -D</code>

<Strong>Arquivo de configuração: <Strong>Criar o arquivo: <code>.prettierrc</code>

```json
{
    "singleQuote": true,
    "semi": false,
    "useTabs": true,
    "tabWidth": 2,
}
```

<strong><h2>Sequelize</h2></strong>

<p>Permite criar, buscar, alterar e remover dados do banco usando objetos e métodos em JS, além de fazer alterações na estrutura das tabelas.</p>

<strong>Arquivo .sequelizerc</strong><p>Exporta os caminhos onde estão os caminhos e pastas criados, como o caminho até a pasta config, migrations, models, etc.</p>

```javascript
const { resolve } = require('path')

module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}
```

## Sucrase/Nodemon
<strong>Criar o arquivo nodemon.json</strong>
<p>Executa o arquivo do sucrase para não dar erro com o nodemon nas últimas configurações do ECMAScript</p>

```json
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}
```

<strong>Docker: </strong><p>Para criar um container Docker é necessário o seguinte comando necessáriamente nesta ordem.</p>

* docker run --name nome_da_imagem -e POSTGRES_PASSWORD=senha_do_BD -d -p porta_da_imagem:porta_de_saída_do_SO nome_da_imagem_no_HUB-Docker

<p>Para criar uma imagem do <strong>PostgreSQL</strong>, basta colocar o comando no terminal:</p>

* docker run --name database -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres
* Verificar se a imagem está rodando: docker ps
* Verificar os logs da imagem: docker logs nome_da_imagem

<p>Para criar uma imagem do <strong>PGAdmin4</strong>, basta colocar o comando no terminal:</p>

* docker run -p 5555:80 --name pgadmin -e 'PGADMIN_DEFAULT_EMAIL=postgres'-e 'PGADMIN_DEFAULT_PASSWORD=docker' dpage/pgadmin4
* Coloque a porta que estiver livre, no caso a 5555.
* O terminal ficará ocupado até o final da operação.
* Acesse pelo browser <code>http://localhost:5555/</code>
* Nas configurações iniciais o "host name/address" deverá ser: <code>host.docker.internal</code>#


# GitHub
Create a new repository on the command line
echo "# gympoint" >> README.md
git init
git add README.md
git commit -m "first commit"
## Pushing
git remote add origin git@github.com:MGustav0/gympoint.git
git push -u origin master