
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

var booleanDoEmail = false;
var booleanDoData = false;
var booleanDaSenha = false;
var booleanNome = false;

const validarEmail = (event) => {
    
    const email = event.target.value;
    console.log(email);
    let arrEmail = [...email] 
    let validaPrimeiraLetra = (email[0] === email[0].toLowerCase())  ? true : false;
    let validaArroba = arrEmail.some(x => x === '@' );
    let validaPontoDepoisDoArroba = arrEmail.slice('@').some(x => x === '.');
    let validaPontoNoFim = (arrEmail[arrEmail.length-1] === '.') ? false : true ;
    let validaDominio = arrEmail.join('').includes('dbccompany')?true:false;
    let testeDaFuncao = validaPrimeiraLetra && validaArroba && validaPontoDepoisDoArroba && validaPontoNoFim && validaDominio;
    booleanDoEmail = testeDaFuncao;
}
const validarSenha = (event) => {
    const input = event ? event.target : document.getElementById('senha-input');
    const { value: senha } = input;
    input.value = input.value.replaceAll(' ', '');
    let caracteresSenha = [...senha];
    let possuiLetraMinuscula = caracteresSenha.some( c => c.toLowerCase() === c);
    let possuiLetraMaiuscula = caracteresSenha.some( c => c.toUpperCase() === c);
    let possuiEspecial = caracteresSenha.some( c => c.toUpperCase() === c.toLowerCase() && isNaN(c));
    let possuiNumero = caracteresSenha.some( c => c.toUpperCase() === c.toLowerCase() && !isNaN(c));
    let peloMenosOito = senha.length >= 8;
    const ehValido = possuiLetraMinuscula && possuiLetraMaiuscula && possuiEspecial && possuiNumero && peloMenosOito;
    booleanDoData = ehValido;
}
const adicionarMascaraData = (event) => {
    const dataDomEvent = event.target.value;
        const campoInput = document.getElementById('data-input');
        if(dataDomEvent.length === 2 ||dataDomEvent.length === 5){
            campoInput.value = campoInput.value + '/';
        }
        validarData(dataDomEvent);
}
const validarData = (data) => {
        let hoje = moment(new Date); 
        let testaData = moment(data , 'DD/MM/YYYY');
        let testaDataFutura = testaData.isBefore(hoje);
        let dezoitoAnosAtras = moment().subtract(18 , 'years')
        let vinteEhSeisAnosAtras = moment().subtract(26 , 'years')
        let verificacaoIdade = (testaData.isBetween(vinteEhSeisAnosAtras , dezoitoAnosAtras))?true :false;
        const validadorGeralData = testaDataFutura && verificacaoIdade;
        booleanDaSenha = validadorGeralData;
    }
const validaNome = (event) =>{
    let nome = event.target.value;
    let str = [...nome];
    
    let validaNomeArr = str.some(a => !isNaN(a));
    let validaNomeParteDois = str.some(a => a.toLowerCase() === a.toUpperCase());
    let validadorNome = !validaNomeArr && !validaNomeParteDois;
    booleanNome = validadorNome;
}
const validarCadastro = (event) => {
    if( booleanDoEmail && booleanDoData && booleanDaSenha && booleanDaSenha){
        console.log('Este Cadastro é Válido Sr(a)')
        cadastrarUsuario();

    }else{
        console.log('Este Cadastro é Inválido Sr(a)')
    }
}

const cadastrarUsuario = () =>{
    const tipoUsuario = document.getElementById('select-input').value;
    const nome = document.getElementById('nome-input').value;
    const dataNascimento = document.getElementById('data-input').value;
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('senha-input').value;

    const intaciaUsuario = new Usuario(tipoUsuario , nome ,dataNascimento ,email ,senha)
    axios.post('http://localhost:3000/Usuarios' ,intaciaUsuario)
    .then( (resolve) =>{
        alert('Usuario Cadastrado Com Sucesso!')
    }
    ).catch((erro) => {
        console.log('Ops , um erro foi encontrado')
    })
}

const loginNoSistema = () =>{
    let loginValid = false;
    const emailLog = document.getElementById('').value;
    const senhaLog = document.getElementById('').value;
    let funcaoDoUsuario = '';
    axios.get('http://localhost:3000/Usuarios')
    .then((sucesso) =>{
        sucesso.data.forEach(element => {
            if(emailLog === element.email && senhaLog === element.senhaLog){
                loginValid = true;
                funcaoDoUsuario = element.tipo;

            }            
        });    
    }
    )
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



