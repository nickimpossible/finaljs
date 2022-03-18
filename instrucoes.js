/*
  LINK PARA O FIGMA DO NOSSO PROJETO: https://www.figma.com/file/HJtiHR3UvBggALqWJxzD7j/Untitled?node-id=0%3A1


  +----------------------------------------------------------------------------------+
  |                                 SISTEMA DE VAGAS                                 |
  +----------------------------------------------------------------------------------+


  Especificações:

  1) Tela de login (primeira tela ao abrir);
      a) Botão para Logar (limpa os campos digitados no login);

      b) Botão de "Não possui cadastro?";

      c) Botão "Esqueceu sua senha?" (pede um email por prompt e simplesmente retorna a senha em um alert se o email existir no servidor e caso não exista informa mensagem de erro);


  2) Tela de cadastro de usuário:
      2a) Precisamos ter um "select" com as opções "Recrutador" e "Trabalhador" para sabermos que tipo de usuário está se cadastrando;
      
      2b) Teremos os seguintes campos no cadastro:
          a) Nome Completo (validar se possui somente letras);
          b) Data de Nascimento (validação de data que havíamos feito);
          c) Email (validação de formato de email);
          d) Senha (validação de senha que havíamos feito);
      
      2c) Teremos 2 botões, um para "Voltar" (limpa os campos do cadastro e volta para login) 
          e outro para "Cadastrar" (cadastra, limpa os campos, retorna para o login e dá mensagem de cadastro concluído);
 

  3) Tela de Início (após login):
      a) Mostrar listagem de vagas cadastradas;
      
      b) Precisamos poder acessar o detalhamento da vaga (tela de detalhamento) clicando na "linha/bloco" da vaga (dependendo de como for feito);

      c) Botão de "Sair" (logout);

  
  3.2) Se o usuário logado for "Recrutador":
      a) Terá um botão de "Cadastrar Vaga";

      3.2b) Teremos os seguintes campos no cadastro:
          a) Título (validar se não é uma string vazia apenas);
          b) Descrição (validar se não é uma string vazia apenas);
          c) Remuneração (aceitar somente número, validar se é maior que zero e adicionar máscara com R$ na frente);
      
      3.2c) Teremos 2 botões, um para "Voltar" (limpa os campos do cadastro e volta para home) 
            e outro para "Cadastrar" (cadastra, limpa os campos, retorna para a home e dá mensagem de cadastro concluído);



  4) Tela de Detalhamento de Vaga:
      a) Mostrar informações da vaga;

      b) Mostrar listagem de trabalhadores que se candidataram à vaga;

      c) Botão de Voltar para a Home;
      

  
  4.2) Se o usuário logado for "Recrutador":
      a) Poderá reprovar um candidato;

      b) Poderá excluir a vaga (após excluir volta para home );
  

  4.3) Se o usuário logado for "Trabalhador":
      a) Poderá se candidatar à vaga (caso não esteja ainda);
      
      b) Cancelar candidatura (caso esteja candidatado e não esteja reprovado); 




  Teremos as seguintes classes:

  class Usuario {
      id; (automático json-server)
      tipo;
      nome;
      dataNascimento;
      email;
      senha;
      candidaturas = []; // lista de Candidatura
  }

  class Candidatura {
      idVaga;
      idCandidato;
      reprovado; // true or false
  }

  class Vaga {
      id; (automático json-server)
      titulo;
      descrição;
      remuneracao; (salvar no formato: R$ 3.200,50)
      candidatos = []; // lista de Trabalhadores candidatados na vaga
  }        
*/