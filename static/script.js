// script.js

// Mapear funções por setor
const FUNCOES_POR_SETOR = {
    Operacao: ["Auxiliar Administrativo", "Técnico de Enfermagem Atendimento", "Técnico de Enfermagem Plantonista", "Enfermeiro Atendimento (Case)", "Enfermeiro Plantonista", "Enfermeiro Visitador", "Enfermeiro Gestor de Escala", "Enfermeiro Especialista", "Fisioterapeuta", "Nutricionista", "Fonoaudiólogo", "Assistente Social", "Médico Visitador", "Médico Plantonista", "Médico Paliativista", "Motorista"],
    Farmacia: ["Auxiliar Administrativo", "Auxiliar de Farmácia", "Gestor de Insumos", "Farmacêutico"],
    Administrativo: ["Recepcionista", "Assistente Administrativo", "Assistente de Recursos Humanos", "Assistente de Compras", "Assistente de Contabilidade", "Analista de Recursos Humanos", "Analista de Contabilidade", "Analista de Compras", "Assistente de Departamento Pessoal", "Analista de Departamento Pessoal", "Contador"],
    Auditoria: ["Enfermeiro Auditor Interno", "Enfermeiro Auditor Externo", "Médico Auditor Interno", "Médico Auditor Externo", "Assistente de Recurso de Glosa"],
    Gestao: ["Gerente de Operações", "Gerente Administrativo", "Gerente de Auditoria", "Coordenador de Enfermagem", "Coordenador de Medicina", "Coordenador de Farmácia", "Coordenador de Recursos Humanos e Departamento Pessoal", "Coordenador Financeiro"]
  };
  
  // Função para carregar as opções de funções com base no setor
  function carregarFuncoesPorSetor(setor) {
    const funcaoSelect = document.getElementById("funcao");
    funcaoSelect.innerHTML = "<option selected>Selecione...</option>";
  
    if (FUNCOES_POR_SETOR[setor]) {
      FUNCOES_POR_SETOR[setor].forEach((funcao) => {
        const option = document.createElement("option");
        option.value = funcao;
        option.textContent = funcao;
        funcaoSelect.appendChild(option);
      });
    } else {
      funcaoSelect.innerHTML = "<option value=''>Nenhuma função disponível</option>";
    }
  }
  
  // Navegação entre páginas
  function navegarPara(pagina) {
    const app = document.getElementById("app");
    switch (pagina) {
      case "index":
        app.innerHTML = montarPaginaInicial();
        break;
      case "usuarios":
        app.innerHTML = montarPaginaUsuarios();
        exibirUsuarios();
        break;
      case "cadastro_usuarios":
        app.innerHTML = montarPaginaCadastroUsuarios();
        configurarEventosCadastro();
        break;
      default:
        console.error("Página não encontrada:", pagina);
    }
    history.pushState({ pagina }, "", `#${pagina}`);
  }
  
  // Páginas HTML
  function montarPaginaInicial() {
    return `
      <section class="row text-center">
                <article class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow">
                        <header class="card-header">
                            <h2 class="card-title text-primary">Usuários</h2>
                        </header>
                        <div class="card-body">
                            <p class="card-text">Gerencie o cadastro e edição de usuários do sistema.</p>
                            <button class="btn btn-primary" onclick="navegarPara('usuarios')">Acessar</button>
                        </div>
                    </div>
                </article>
                <article class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow">
                        <header class="card-header">
                            <h2 class="card-title text-success">Farmácia</h2>
                        </header>
                        <div class="card-body">
                            <p class="card-text">Controle de insumos e medicamentos.</p>
                            <button class="btn btn-success">Acessar</button>
                        </div>
                    </div>
                </article>
                <article class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow">
                        <header class="card-header">
                            <h2 class="card-title text-danger">Pacientes</h2>
                        </header>
                        <div class="card-body">
                            <p class="card-text">Gerencie informações dos pacientes.</p>
                            <button class="btn btn-danger">Acessar</button>
                        </div>
                    </div>
                </article>
                <article class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow">
                        <header class="card-header">
                            <h2 class="card-title text-warning">Relatórios</h2>
                        </header>
                        <div class="card-body">
                            <p class="card-text">Visualize e gere relatórios de saúde.</p>
                            <button class="btn btn-warning">Acessar</button>
                        </div>
                    </div>
                </article>
            </section>`;
  }
  
  function montarPaginaUsuarios() {
    return `
      <h2 class="text-center mb-4">Bem-vindo à Gestão de Usuários</h2>
        <section class="row justify-content-center text-center">
            <!-- Card Cadastro de Usuários -->
            <article class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow">
                    <header class="card-header">
                        <h2 class="card-title text-primary">Cadastro de Usuários</h2>
                    </header>
                    <div class="card-body">
                        <p class="card-text">Realize o cadastro de novos usuários no sistema.</p>
                        <button class="btn btn-primary" onclick="navegarPara('cadastro_usuarios')">Acessar</button>
                    </div>
                </div>
            </article>
            <h2 class="text-center mt-5">Lista de Usuários</h2>
            <table id="tabela-usuarios" class="table table-striped">
              
            </table>
        </section>
         <!-- Botão para voltar para a Home -->
     <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-primary" onclick="navegarPara('index')">Voltar à Página Inicial</button>
      </div> `;
  }
  
  function montarPaginaCadastroUsuarios() {
    return `
      <form id="form-cadastro" class="form-user p-4 shadow rounded">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome Completo</label>
          <input type="text" id="nome" class="form-control" placeholder="Digite o nome completo" required>
        </div>
        <div class="mb-3">
          <label for="cpf" class="form-label">CPF</label>
          <input type="text" id="cpf" class="form-control" placeholder="Digite o CPF" required>
        </div>
        <div class="mb-3">
          <label for="endereco" class="form-label">Endereço</label>
          <input type="text" id="endereco" class="form-control" placeholder="Digite o endereço completo">
        </div>
        <div class="mb-3">
          <label for="setor" class="form-label">Setor</label>
          <select id="setor" class="form-select" required>
            <option selected>Selecione...</option>
            <option value="Operacao">Operação</option>
            <option value="Farmacia">Farmácia</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Auditoria">Auditoria</option>
            <option value="Gestao">Gestão</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="funcao" class="form-label">Função</label>
          <select id="funcao" class="form-select" required>
            <option selected>Selecione...</option>
          </select>
        </div>
        <div class="mb-3 d-none" id="campo-especialidade">
          <label for="especialidade" class="form-label">Especialidade</label>
          <input type="text" id="especialidade" class="form-control" placeholder="Digite a especialidade">
        </div>
        <div class="mb-3" id="campo-registro-categoria">
          <label for="registro" class="form-label">Número de Registro de Categoria</label>
          <input type="text" id="registro" class="form-control" placeholder="Digite o número de registro">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Salvar</button>
          <button type="reset" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
      <button class="btn btn-secondary mt-4" onclick="navegarPara('usuarios')">Voltar</button>`;
  }
  
  // Configuração do formulário de cadastro
  function configurarEventosCadastro() {
    const form = document.getElementById("form-cadastro");
    form.addEventListener("submit", cadastrarUsuario);
  
    const setorSelect = document.getElementById("setor");
    const funcaoSelect = document.getElementById("funcao");
    const campoEspecialidade = document.getElementById("campo-especialidade");
    const campoRegistroCategoria = document.getElementById("campo-registro-categoria");
  
    setorSelect.addEventListener("change", () => {
      const setorSelecionado = setorSelect.value;
      carregarFuncoesPorSetor(setorSelecionado);
  
      if (["Operacao", "Gestao", "Auditoria", "Farmacia"].includes(setorSelecionado)) {
        campoRegistroCategoria.classList.remove("d-none");
      } else {
        campoRegistroCategoria.classList.add("d-none");
      }
  
      campoEspecialidade.classList.add("d-none");
    });
  
    funcaoSelect.addEventListener("change", () => {
      const funcaoSelecionada = funcaoSelect.value;
      if (["Enfermeiro Especialista", "Médico Especialista"].includes(funcaoSelecionada)) {
        campoEspecialidade.classList.remove("d-none");
      } else {
        campoEspecialidade.classList.add("d-none");
      }
  
      if (["Auxiliar Administrativo", "Recepcionista"].includes(funcaoSelecionada)) {
        campoRegistroCategoria.classList.add("d-none");
      } else {
        campoRegistroCategoria.classList.remove("d-none");
      }
    });
  }
  
  // CRUD Usuários
  async function exibirUsuarios() {
    const tabela = document.getElementById("tabela-usuarios");
    try {
      const response = await fetch("/api/exibe_usuarios");
      const usuarios = await response.json();
      tabela.innerHTML = usuarios.length
        ? usuarios.map((u) => `
        <tr>
        <td>${u.nome}</td>
        <td>${u.cpf}</td>
        <td>${u.setor}</td>
        <td>${u.funcao}</td>
        <td><button class='btn btn-danger' onclick="removerUsuario(${u.cpf})">Excluir</button></td>
        </tr>`)
        .join(''):
        "<tr><td colspan='3'>Nenhum usuário encontrado.</td></tr>";
    } catch (error) {
      console.error("Erro ao exibir usuários:", error);
    }
  }
  
  async function cadastrarUsuario(event) {
    event.preventDefault();
  
    const usuario = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      endereco: document.getElementById("endereco").value,
      setor: document.getElementById("setor").value,
      funcao: document.getElementById("funcao").value,
      especialidade: document.getElementById("especialidade").value || "",
      registro_categoria: document.getElementById("registro").value || ""
    };
  
    try {
      const response = await fetch("/api/criar_usuario", {
        method: "POST", // Método correto
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
  
      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navegarPara("usuarios");
      } else {
        console.error("Erro ao cadastrar usuário:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
  
  async function removerUsuario(cpf) {
    try {
      
      const response = await fetch(`/api/excluir_usuario/${cpf}`, { method: "DELETE" });
      if (response.ok) {
        alert("Usuário removido com sucesso!");
        exibirUsuarios();
      } else {
        console.error("Erro ao remover usuário:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  }
  
  // Inicialização
  document.addEventListener("DOMContentLoaded", () => navegarPara("index"));
  window.onpopstate = (e) => navegarPara(e.state?.pagina || "index");
  