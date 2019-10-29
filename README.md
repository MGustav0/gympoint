<strong>Projeto GoBarber</strong>

Descrição: Projeto de treinamento para Bootcamp 2019 da Rocketseat.

<strong>Configuração do VSCode para o Bootcamp</strong>

```javascript
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
        95,
        120
    ],
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
    "editor.renderLineHighlight": "all",
    "editor.tabSize": 4,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx"
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "breadcrumbs.enabled": true,
    "window.titleBarStyle": "custom",
}
```
<p>Para usar o Eslint para arrumar todos os arquivos de uma so vez, basta utilizar o comando abaixo, pode-se modificar a pasta "src" por outra e o tipo de extensao:</p>

<code>yarn eslint --fix src --ext .js</code>


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