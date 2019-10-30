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
  
1. Para criar um container __Docker__ digite o seguinte comando necessariamente nesta ordem:

```node
docker run --name nome_da_imagem -e POSTGRES_PASSWORD=senha_do_BD -d -p porta_da_imagem:porta_de_saída_do_SO nome_da_imagem_no_HUB-Docker
```

Para criar uma imagem do **PostgreSQL**, basta colocar o seguinte comando no terminal:  

* ```node
docker run --name database -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres
```
* Verificar se a imagem está rodando: docker ps
* Verificar os logs da imagem: docker logs nome_da_imagem
  
Para criar uma imagem do **PGAdmin4**, basta colocar o comando no terminal:
  
* docker run -p 5555:80 --name pgadmin -e 'PGADMIN_DEFAULT_EMAIL=postgres'-e 'PGADMIN_DEFAULT_PASSWORD=docker' dpage/pgadmin4
* Coloque a porta que estiver livre, no caso a 5555.
* O terminal ficará ocupado até o final da operação.
* Acesse pelo browser o [localhost](http://localhost:5555/ "localhost")
* Nas configurações iniciais o **_host name/address_** deverá ser: ```host.docker.internal```


# GitHub
1. Create a new repository on the command line
2. echo "# gympoint" >> README.md
3. git init
4. git add README.md
5. git commit -m "first commit"

## Pushing
1. git remote add origin git@github.com:MGustav0/gympoint.git
2. git push -u origin master
