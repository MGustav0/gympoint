/** Configuração do banco de dados MySQL via Sequelize
 * Link: https://sequelize.org/v5/manual/dialects.html#postgresql
 */
require('dotenv/config')

module.exports = {
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	define: {
		/** Garante que teremos uma coluna createdAt e UpdatedAt dentro de cada tabela do BD */
		timestamps: true,
		/** Garante, passando para o sequelize, que será utilizada a nomeclatura de colunas
		 * através do padrão "underscored" -> NoCamelCase */
		underscored: true,
		/** Faz o mesmo, mas para as colunas e relacionamentos */
		underscoredAll: true
	}
}
