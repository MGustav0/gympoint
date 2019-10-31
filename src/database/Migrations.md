# Pasta "migrations"

**Descrição:** As migracões serão ordenadas e versionadas por data, qualquer alteracao no BD requer a criacao de uma nova migration.
  
**Instruções**

1. Para criar a migrate: ```yarn sequelize migration:create --name=create-users```. Pode-se trocar o nome ```users``` por outro que faça sentido par ao objetivo da migration. __Obs.: O servidor do banco ou a imagem Docker devem estar ativas e o banco criado.__
2. Para rodar a migrate: ```yarn sequelize db:migrate```
3. Para desfazer a ultima migration: ```yarn sequelize db:migrate:undo```
4. Para desfazer todas as migrations: ```yarn sequelize db:migrate:undo:all```

## Arquivos

* **[data+codigo]-[funcao_da_migration].js:** O nome com data e horas relativos à migração mais atual.
