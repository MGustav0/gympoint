# Pasta "seeds"

**Descrição:** Contém os registros automatizados da base de dados.
  
**Instruções**

1. Essa funcionalidade do Sequelize serve para criarmos registros na base de dados de forma automatizada.
2. Para criar um seed (registro): ```yarn sequelize seed:generate --name admin-user```. Pode-se trocar o nome ```admin-user``` por outro que faça sentido par ao objetivo do registro, no caso, o nome **na** tabela. __Obs.: O servidor do banco ou a imagem Docker devem estar ativas, o banco criado e as tabelas criadas, de acordo com o arquivo >Migrations.md.__
3. No arquivo gerado na pasta ```src/database/seeds``` adicione o código referente à criação de um usuário administrador:
```javascript
const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@gympoint.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
```
4. Para semear a configuração acima no __BD__, execute o comando: ```yarn sequelize db:seed:all```

## Arquivos

* **[data+codigo]-[registro_do_seed].js:** O nome com data e horas relativos ao registro.
