/** Configuração do banco de dados MySQL via Sequelize
 * Link: https://sequelize.org/v5/manual/dialects.html#postgresql
 */

module.exports = {
	dialect: 'mysql',
	host: 'localhost',
	username: 'mysql',
	password: 'docker',
	database: 'gympoint',
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
