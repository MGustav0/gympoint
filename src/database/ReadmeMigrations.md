# Pasta "migrations"

<strong>Descrição: </strong><p>As migracoes serao ordenadas e versionadas por data, qualquer alteracao no BD requer a criacao de uma nova migration.<p>

<stron>Instrucoes</strong>

1. Para criar a migrate: <code>yarn sequelize migration:create --name=create-users</code>. Pode-se trocar o nome "create-users" por outro que faça sentido no que a migration faz. Obs.: O servidor do banco ou a imagem Docker devem estar ativas e o banco criado.
2. Para rodar a migrate: <code>yarn sequelize db:migrate</code>
3. Para desfazer a ultima migration: <code>yarn sequelize db:migrate:undo</code>
4. Para desfazer todas as migrations: <code>yarn sequelize db:migrate:undo:all</code>

<strong>Arquivos</strong>

<ol>
    <li><strong>[data+codigo]-[funcao_da_migration].js: </strong></p>O nome e autoexplicativo.</p></li>
</ol>
