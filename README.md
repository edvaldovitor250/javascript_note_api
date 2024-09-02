<h1 align="center">JavaScript Note API</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version" />
  <img src="https://img.shields.io/badge/status-active-success" alt="status" />
  <img src="https://img.shields.io/github/license/EdnaldoLuiz/alura-flix" alt="license" />
</p>

<p align="center">
  Projeto desenvolvido para a aquisição de habilidades em React e Express.
</p>

---

<p align="left">
  📝 <strong>Título:</strong> Defina o título da nota<br/>
  🔗 <strong>Estilização:</strong> Personalize a formatação da nota conforme necessário<br/>
  🗂️ <strong>Tamanho do Texto:</strong> Escolha o tamanho apropriado do texto<br/>
  📄 <strong>Descrição da Nota:</strong> Insira uma descrição detalhada da nota<br/>
  🔐 <strong>Criptografia de Token:</strong> Cada usuário possui um token único para autenticação<br/>
</p>

---

<section>
  <h2>🚀 Instruções de Inicialização do Projeto</h2>
  <ol>
    <li>
      Clone o repositório utilizando o comando Git:
      <code>git clone https://github.com/edvaldovitor250/javascript_note_api.git</code>
    </li>
    <li>
      Acesse o diretório clonado e instale as dependências necessárias:
      <code>npm install</code>
    </li>
    <li>
      Inicie o servidor de desenvolvimento utilizando o comando:
      <code>nodemon run</code>
    </li>
    <li>
      Acesse a aplicação via navegador na porta <code>3001</code>. 🎉
    </li>
  </ol>
</section>

---

<h2 align="center">📄 Funcionalidades e Endpoints</h2>

<p align="left">
  Esta API oferece um conjunto completo de operações CRUD (Create, Read, Update, Delete) para gerenciar usuários e notas. Abaixo estão as funcionalidades principais e os respectivos endpoints:
</p>

<h3>📋 Funcionalidades</h3>
<ul>
  <li><strong>Criação de Usuário:</strong> Registre novos usuários no sistema com o endpoint <code>POST /register</code>.</li>
  <li><strong>Autenticação:</strong> Realize login no sistema utilizando o endpoint <code>POST /login</code>, que retorna um token de autenticação.</li>
  <li><strong>Atualização de Senha:</strong> Modifique a senha de um usuário existente através do endpoint <code>PUT /password</code>.</li>
  <li><strong>Gerenciamento de Notas:</strong> Crie, leia, atualize e delete notas associadas ao usuário autenticado. As operações são realizadas por meio de endpoints específicos, garantindo a integridade e a segurança dos dados.</li>
</ul>

<h3>🔗 Endpoints Principais</h3>
<ul>
  <li><code>POST /register</code> - Cria um novo usuário.</li>
  <li><code>POST /login</code> - Realiza login do usuário e gera um token de autenticação.</li>
  <li><code>PUT /password</code> - Atualiza a senha do usuário autenticado.</li>
  <li><code>GET /notes</code> - Retorna todas as notas do usuário autenticado.</li>
  <li><code>POST /notes</code> - Cria uma nova nota para o usuário autenticado.</li>
  <li><code>PUT /notes/:id</code> - Atualiza uma nota existente do usuário autenticado.</li>
  <li><code>DELETE /notes/:id</code> - Exclui uma nota do usuário autenticado.</li>
</ul>

---

<h2 align="center">💻 Desenvolvedor</h2>

<div align="center">
  <a href="https://github.com/edvaldovitor250">
    <img src="https://github.com/edvaldovitor250.png" width="170" alt="Edvaldo Vitor" /><br>
    <sub>Edvaldo Vitor</sub>
  </a>
</div>

---

<h2 align="center">🛠️ Tech Stack Utilizada</h2>

<table align="center">
  <thead>
    <tr>
      <th><img src="https://skillicons.dev/icons?i=js" width="100px" height="100px" alt="JavaScript" /></th>
      <th><img src="https://skillicons.dev/icons?i=react" width="100px" height="100px" alt="React" /></th>
      <th><img src="https://skillicons.dev/icons?i=npm" width="100px" height="100px" alt="NPM" /></th>
      <th><img src="https://skillicons.dev/icons?i=express" width="100px" height="100px" alt="Express" /></th>
      <th><img src="https://skillicons.dev/icons?i=mongodb" width="100px" height="100px" alt="MongoDB" /></th>
    </tr>
  </thead>
  <tbody align="center">
    <tr>
      <td>JavaScript</td>
      <td>React</td>
      <td>NPM</td>
      <td>Express</td>
      <td>MongoDB</td>
    </tr>
    <tr>
      <td>JavaScript (ECMAScript 2024)</td>
      <td>React (^18.3.1)</td>
      <td>NPM (9.0.0)</td>
      <td>Express (^4.19.2)</td>
      <td>MongoDB (^8.5.1)</td>
    </tr>
  </tbody>
</table>

---

<h2 align="center">📄 Licença</h2>

<p align="center">
  Este projeto está licenciado sob a Licença MIT. Veja o arquivo <a href="https://github.com/EdnaldoLuiz/alura-flix/blob/main/LICENSE">LICENSE</a> para mais detalhes.
</p>
