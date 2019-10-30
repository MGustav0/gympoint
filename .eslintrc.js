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