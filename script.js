const arrayDosFuncionario = [];
class Usuario{
      tipo;
      nome;
      dataNascimento;
      email;
      senha;
      candidaturas = []; 

    constructor(tipo ,nome,dataNascimento,email,senha){
        this.tipo = tipo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        
    }
}
class Candidatura {
      idVaga;
      idCandidato;
      reprovado; 
        constructor(idVaga ,idCandidato,reprovado){
            this.idVaga = idVaga;
            this.idCandidato = idCandidato;
            this.reprovado = reprovado;
        }
    }

class Vaga {
    titulo;
    descrição;
    remuneracao;
    candidatos = [];

    constructor(titulo , descrição , remuneracao ,candidatos){
        this.titulo = titulo;
        this.descrição = descrição;
        this.remuneracao = remuneracao;
        this.candidatos = candidatos;
    }
}

  // AQUI PARA BAIXO SÃO SÓ EXEMPLOS DE COMO UTILIZAR O AXIOS
    // // PARA PUT E DELETE PRECISAMOS PASSAR TAMBÉM UM ID 
    // axios.put(`http://localhost:3000/colaboradores/1`, colaboradorAlterado)
    //   .then( (sucesso) => {
    //     debugger
    //   }, (erro) => {
    //     debugger
    //   } );
  
    // // DELETE exemplo
    // axios.delete(`http://localhost:3000/colaboradores/1`)
    //   .then( (sucesso) => {
    //     debugger
    //   }, (erro) => {
    //     debugger
    //   } );
  
  
//     axios.post(`http://localhost:3000/colaboradores`, colaborador)
//       .then( (sucesso) => {
//         // data possui o objeto inserido, no caso do post
//         sucesso.data.id
  
//         const li = document.createElement('li');
//         li.setAttribute('id', `colab-${sucesso.data.id}`);
//         // debugger
//       }, (erro) => {
//         // debugger
//       } );
//   }; 
  
  
  
//   // VOU FAZER UM GET INICIAL AQUI
//   axios.get(`http://localhost:3000/colaboradores`)
//     .then( (sucesso) => {
//       sucesso.data.forEach( elemento => {
//         const div = document.createElement('div');
//         div.textContent = elemento.nome;
//         const container = document.getElementById('container');
//         container.append(div)
//       } )
//     }, (erro) => {
//       debugger
//     } );



