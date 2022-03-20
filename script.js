//json-server --watch db.json
const arrayDosFuncionario = [];
class Usuario {
    tipo;
    nome;
    dataNascimento;
    email;
    senha;
    candidatura;

    constructor(tipo, nome, dataNascimento, email, senha) {
        this.tipo = tipo;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.candidatura = [];
    }
}
class Candidatura {
    idVaga;
    idCandidato;
    reprovado;
    constructor(idVaga, idCandidato, reprovado) {
        this.idVaga = idVaga;
        this.idCandidato = idCandidato;
        this.reprovado = reprovado;
    }
}

class Vaga {
    titulo;
    descricao;
    remuneracao;
    candidatos = [];

    constructor(titulo, descricao, remuneracao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.remuneracao = remuneracao;

    }
}

var booleanDoEmail = false;
var booleanDoData = false;
var booleanDaSenha = false;
var booleanNome = false;
let usuarioDoSite = [];
var usuarioArray = [];
const validarEmail = (event) => {

    const input = event ? event.target : document.getElementById('email-input');
    const email = input.value;

    let caractereEmail = [...email];
    let primeiroCaractere = caractereEmail.toString().charAt(0);
    let validacaoCaractere = primeiroCaractere.toLowerCase !== primeiroCaractere.toUpperCase();
    let existeArroba = caractereEmail.some(el => el === '@');
    let arroba = caractereEmail.lastIndexOf('@')
    let dominioEmail = email.slice(arroba + 1)
    let pontoDepoisArroba = dominioEmail.indexOf('.') > (dominioEmail.indexOf('@') + 1) 
    let ultimoCaractere = caractereEmail.lastIndexOf('.') < caractereEmail.length - 2

    let dominioDBC = dominioEmail.includes('dbccompany')

    const ehValido = validacaoCaractere && existeArroba && pontoDepoisArroba && ultimoCaractere && dominioDBC;
    booleanDoEmail = ehValido;
}
const validarSenha = (event) => {
    const input = event ? event.target : document.getElementById('senha-input');
    const { value: senha } = input;
    input.value = input.value.replaceAll(' ', '');
    let caracteresSenha = [...senha];
    let possuiLetraMinuscula = caracteresSenha.some(c => c.toLowerCase() === c);
    let possuiLetraMaiuscula = caracteresSenha.some(c => c.toUpperCase() === c);
    let possuiEspecial = caracteresSenha.some(c => c.toUpperCase() === c.toLowerCase() && isNaN(c));
    let possuiNumero = caracteresSenha.some(c => c.toUpperCase() === c.toLowerCase() && !isNaN(c));
    let peloMenosOito = senha.length >= 8;
    const ehValido = possuiLetraMinuscula && possuiLetraMaiuscula && possuiEspecial && possuiNumero && peloMenosOito;
    booleanDoData = ehValido;
}
const adicionarMascaraData = (event) => {
    const dataDomEvent = event.target.value;
    const campoInput = document.getElementById('data-input');
    if (dataDomEvent.length === 2 || dataDomEvent.length === 5) {
        campoInput.value = campoInput.value + '/';
    }
    validarData(dataDomEvent);
}
const validarData = (data) => {
    let hoje = moment(new Date);
    let testaData = moment(data, 'DD/MM/YYYY');
    let testaDataFutura = testaData.isBefore(hoje);
    let dezoitoAnosAtras = moment().subtract(18, 'years')
    let vinteEhSeisAnosAtras = moment().subtract(26, 'years')
    let verificacaoIdade = (testaData.isBetween(vinteEhSeisAnosAtras, dezoitoAnosAtras)) ? true : false;
    const validadorGeralData = testaDataFutura && verificacaoIdade;
    booleanDaSenha = validadorGeralData;
}
const validaNome = (event) => {
    const input = event ? event.target : document.getElementById('nome-input');
    const nome = input.value;
    let nomeSemEspaco = nome.replaceAll(' ', '')

    let validaNomeArr = [...nomeSemEspaco]
    let somenteLetras = validaNomeArr.every(el => el.toString().toLowerCase() !== el.toString().toUpperCase())
    booleanNome = somenteLetras;
}

const validarCadastro = (event) => {
    if (booleanDoEmail && booleanDoData && booleanDaSenha && booleanDaSenha) {
        console.log('Este Cadastro é Válido Sr(a)')
        cadastrarUsuario();
    } else {
        console.log('Este Cadastro é Inválido Sr(a)')
    }
}

const cadastrarUsuario = () => {
    const tipoUsuario = document.getElementById('select-input').value;
    const nome = document.getElementById('nome-input').value;
    const dataNascimento = document.getElementById('data-input').value;
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('senha-input').value;

    const intaciaUsuario = new Usuario(tipoUsuario, nome, dataNascimento, email, senha)
    axios.post('http://localhost:3000/Usuarios', intaciaUsuario)
        .then((resolve) => {
            alert('Usuario Cadastrado Com Sucesso!')
        }
        ).catch((erro) => {
            console.log('Ops , um erro foi encontrado')
        })
}
let trabalhador = false;
let recrutador = false;
const loginNoSistema = () => {
    let loginValid = false;
    const emailLog = document.getElementById('email-input-login').value;
    const senhaLog = document.getElementById('password-input-login').value;
    let funcaoDoUsuario = '';
    axios.get('http://localhost:3000/Usuarios')
        .then((sucesso) => {
            sucesso.data.forEach(element => {
                if (emailLog === element.email && senhaLog === element.senha) {
                    loginValid = true;
                    funcaoDoUsuario = element.tipo;
                    usuarioDoSite.push(element.id);
                }
                if (funcaoDoUsuario === 'Trabalhador') {
                    trabalhador = true;
                    redirecionaPag('tela-de-login', 'tela-inicial-trabalhador');
                    mostrarVagas();
                } else if (funcaoDoUsuario === 'Recrutador') {
                    recrutador = true;
                    redirecionaPag('tela-de-login', 'tela-inicial-recrutador');
                    mostrarVagas();
                }
            }
            )
        }
        ).catch((reject) => {
            console.log('ops!Um erro foi encontrado')
        }
        )

}

const esqueciSenha = () => {
    let regulaFunc = true;
    const emailLog = document.getElementById('email-input-login').value;
    const senhaLog = document.getElementById('password-input-login').value;
    let funcaoDoUsuario = '';
    axios.get(`http://localhost:3000/Usuarios`)
        .then((sucesso) => {
            sucesso.data.forEach(element => {
                if (emailLog === element.email && regulaFunc) {
                    alert('Sua senha é ' + element.senha)
                    regulaFunc = false;
                }
            });
        }
        ).catch((reject) => {
            console.log('ops!Um erro foi encontrado')
        }
        )
}
const redirecionaPag = (atual, direciona) => {
    const pagAtual = document.getElementById(atual);
    const pagDireciona = document.getElementById(direciona);
    pagAtual.classList.toggle('d-none');
    pagDireciona.classList.toggle('d-none');
}
const cadastrarVagas = (event) => {
    event.preventDefault();
    const tituloVaga = document.getElementById('titulo-input').value;
    const descricaoVaga = document.getElementById('descricao-input').value;
    let remunuceracaoVaga = document.getElementById('remuneracao-input').value;

    if (tituloVaga === '' || descricaoVaga === '' || isNaN(remunuceracaoVaga.replaceAll(',', '')) || remunuceracaoVaga.replaceAll(',', '') < 0) {
        alert('Ops, Preencha os campos corretamente');
    } else {
        remunuceracaoVaga = 'R$' + remunuceracaoVaga;
        const instaciaVaga = new Vaga(tituloVaga, descricaoVaga, remunuceracaoVaga);
        axios.post('http://localhost:3000/Vagas', instaciaVaga)
            .then((sucesso) => {
                console.log('Vaga Cadastrada Com sucesso');
                redirecionaPag('tela-cadastro-de-vaga', 'tela-inicial-recrutador');
            })
            .catch((erro) => {
                console.log('Ops , não foi possível cadastrar a vaga');
            })
    }
}
/* <div class="d-flex justify-content-between w-75 border border-secondary rounded p-3" id="div-id1" >
                    <div>
                        <span class="fw-bold">Título: Desenvolvedor Full-stack</span>
                    </div>
                    <div>
                        <span class="fw-bold">Remuneração</span><span>: R$ 5.500,00</span>
                    </div>
</div> */
const mostrarVagas = () => {
    const listaDeVagas = trabalhador ? document.getElementById('vagas-lista-trabalhador') : document.getElementById('vagas-lista-recrutador')
    axios.get('http://localhost:3000/Vagas')
        .then((sucess) => {
            sucess.data.forEach((element) => {
                const divPai = document.createElement('div');
                const divTitulo = document.createElement('div');
                const divRemuneracao = document.createElement('div');
                const spanTitulo = document.createElement('span');
                const spanRemuneracao = document.createElement('span');

                divPai.classList.add("d-flex", "justify-content-between", "w-90", "border", "border-secondary", "rounded", "p-3", "mt-2", "list-group-item", "list-group-item-action", "list-group-item-light");
                divPai.setAttribute('id', element.id);
                spanTitulo.classList.add('fw-bold');
                spanRemuneracao.classList.add('fw-bold');
                listaDeVagas.classList.add('w-75');

                spanTitulo.textContent = 'Título: ' + element.titulo;
                spanRemuneracao.textContent = 'Remuneração: ' + element.remuneracao;

                divTitulo.append(spanTitulo);
                divRemuneracao.append(spanRemuneracao);
                divPai.append(divTitulo, divRemuneracao);
                listaDeVagas.append(divPai);
                divPai.addEventListener('click', detalhesDaVaga)
                // divPai.addEventListener('click', mostrarUsuariosRecrutador)
            })
        }
        ).catch((erro) => {
            console.log('Ocorreu um erro')
        }

        )
}
// <p id="titulo-detalhe-vaga">Título: </p>
//                 <p id="descricao-detalhe-vaga">Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Doloremque, nemo necessitatibus eligendi iste</p>
//                 <p id="remuneracao-detalhe-vaga">Remuneração: </p>
const detalhesDaVaga = (event) => {
    let idDaVaga = event.target.id;
    usuarioDoSite.push(idDaVaga);
    axios.get('http://localhost:3000/Vagas')
        .then((sucess) => {
            let arr = sucess.data.find((element) => {
                return element.id === parseInt(idDaVaga);
            })
            if (recrutador) {
                redirecionaPag('tela-inicial-recrutador', 'tela-de-detalhe-recrutador');
                const pTituloDaVaga = document.getElementById('titulo-detalhe-vaga');
                const pDescricaoDeVaga = document.getElementById('descricao-detalhe-vaga');
                const pRemuneracao = document.getElementById('remuneracao-detalhe-vaga');
                pTituloDaVaga.textContent = "Título:" + arr.titulo;
                pDescricaoDeVaga.textContent = "Descrição:" + arr.descricao;
                pRemuneracao.textContent = "Remuneração:" + arr.remuneracao;
            }
            if (trabalhador) {
                redirecionaPag('tela-inicial-trabalhador', 'tela-de-detalhe-trabalhador');
                const pTituloDaVaga = document.getElementById('titulo-detalhe-vaga-t');
                const pDescricaoDeVaga = document.getElementById('descricao-detalhe-vaga-t');
                const pRemuneracao = document.getElementById('remuneracao-detalhe-vaga-t');
                pTituloDaVaga.textContent = "Título:" + arr.titulo;
                pDescricaoDeVaga.textContent = "Descrição:" + arr.descricao;
                pRemuneracao.textContent = "Remuneração:" + arr.remuneracao;
            }


        }).catch((erro) => {
            console.log('Ops , ocorreu um erro')
        })
}

const funcaoRecarrega = () => {
    document.location.reload(true);
}
// constructor(idVaga ,idCandidato,reprovado){
//     this.idVaga = idVaga;
//     this.idCandidato = idCandidato;
//     this.reprovado = reprovado;
// }
// const seCandidar = async () => {
//     const btnCadastrar = document.getElementById('btn-cadastro');
//     const instaciaVaga = new Candidatura(usuarioDoSite[1],usuarioDoSite[0],false);
//     usuarioArray.push(instaciaVaga);
//     let temp = await axios.get(`http://localhost:3000/Usuarios/${usuarioDoSite[1]}`) 
//         .then((sucess) => {
//             let tempAlgumacoisa = sucess.data.candidaturas
//             tempAlgumacoisa.push(usuarioArray)
//             console.log(sucess.data)
//             })
//     axios.put(`http://localhost:3000/Usuarios/${usuarioDoSite[1]}`, temp)
//     .then((success) =>{
//         alert('Sucesso! Candidatura aceita')
var validaBtnCandidatura = false;

const seCandidar = async () => {
    const btnCadastrar = document.getElementById('btn-cadastro');
    const btnSairCandidatura = document.getElementById('btn-sair-candidatura');

    let retornoUsuarioComCandidatura = [];
    const instaciaVaga = new Candidatura(usuarioDoSite[1], usuarioDoSite[0], false);
    await axios.get(`http://localhost:3000/Usuarios/${usuarioDoSite[0]}`)
        .then((success) => {
            // const instaciaVaga = new Candidatura(usuarioDoSite[1],usuarioDoSite[0],false);
            let vagaComInstacia = [];
            vagaComInstacia.push(instaciaVaga)
            let dadosUsuario = success.data;
            // success.data.candidatura = vagaComInstacia;
            let verificaVaga = dadosUsuario.candidatura.some((element) => element.idVaga === usuarioDoSite[1]);
            retornoUsuarioComCandidatura = { ...dadosUsuario };
            if (!verificaVaga) {
                retornoUsuarioComCandidatura.candidatura.push(instaciaVaga);
                validaBtnCandidatura = true;
            } else {
                alert('Voce ja esta cadastrado nessa vaga deseja sair dela');
            }
            btnCadastrar.classList.toggle('d-none');
            btnSairCandidatura.classList.toggle('d-none');
        })

    await axios.put(`http://localhost:3000/Usuarios/${usuarioDoSite[0]}`, retornoUsuarioComCandidatura)
        .then((success) => {
            console.log(success)
        })

    let vagasComCandidatos = [];
    await axios.get(`http://localhost:3000/Vagas/${usuarioDoSite[1]}`)
        .then((success) => {
            let vaga = success.data;
            let candidatosVaga = [success.data.canditados];
            candidatosVaga.push(instaciaVaga)
            vagasComCandidatos = { ...vaga, candidatos: candidatosVaga }
        })
    await axios.put(`http://localhost:3000/Vagas/${usuarioDoSite[1]}`, vagasComCandidatos)
        .then((success) => {
            console.log('Sucesso! Usuario cadastrado na vaga')
        })
}
const cancelarCandidatura = async () => {
    const btnCadastrar = document.getElementById('btn-cadastro');
    const btnSairCandidatura = document.getElementById('btn-sair-candidatura');
    let retornoUsuarioSemCandidatura = [];
    await axios.get(`http://localhost:3000/Usuarios/${usuarioDoSite[0]}`)
        .then((success) => {

            let verificaVaga = [success.data.candidatura]

            verificaVaga = verificaVaga.filter((element) =>
                parseInt(element.idVaga) != usuarioDoSite[1]
            );
            let conteudo = { ...success.data };
            conteudo.candidatura.

                console.log(retornoUsuarioSemCandidatura);

            btnCadastrar.classList.toggle('d-none');
            btnSairCandidatura.classList.toggle('d-none');

        })
    // axios.put(`http://localhost:3000/Usuarios/${usuarioDoSite[0]}`, retornoUsuarioSemCandidatura)
    //     .then((success) =>{
    //         //teste
    //     })


}

{/* <div id="lista-candidatos-recrutador" class="d-flex w-75 p-2 justify-content-between align-items-center">
<div id="nome-candidato-detalhe-recrutador">
    <p>Teste</p>
</div>
<div id="data-candidato-detalhe-recrutador">
    <p>01/01/1997</p>
</div>
<div id="botao-reprovar-recrutador">
    <button type="button" class="btn btn-danger">Reprovar</button>
</div>
</div> */}

// const mostrarUsuariosRecrutador = async () => {
//     const listadeCandidatos = document.getElementById('lista-candidatos-recrutador')
//     await axios.get(`http://localhost:3000/Vagas`)
//         .then((sucess) => {
//             sucess.data.forEach((element) => {
//                 if (element.id === usuarioDoSite[1]) {

//                     const divNome = document.createElement('div');
//                     const divData = document.createElement('div');
//                     const divButton = document.createElement('div')
//                     const spanNome = document.createElement('span');
//                     const spanData = document.createElement('span');
//                     const buttonReprove = document.createElement('button')

//                     divNome.setAttribute('id', element.id);
//                     buttonReprove.classList.add('btn', 'btn-danger')
//                     buttonReprove.setAttribute('id', 'botao-reprovar-recrutador')
//                     buttonReprove.addEventListener('click', reprovarCandidato)

//                     spanNome.textContent = 'teste'
//                     spanData.textContent = '1099'

//                     divButton.append(buttonReprove)
//                     divNome.append(spanNome);
//                     divData.append(spanData);
//                     listadeCandidatos.append(divNome, divData, divButton);
//                 }
//             })
//         }
//         ).catch((erro) => {
//             console.log('Ocorreu um erro')
//         }

//         )
// }

const reprovarCandidato = () => {
    //aqui fazer a função que está sendo chamada no botão criado na funcao mostrarUsuariosRecrutador
}
// const candidaturaDoUsuario = {candidatura: instaciaVaga};
// axios.put(`http://localhost:3000/Usuarios/${usuarioDoSite[0]}`,candidaturaDoUsuario)
// .then((success) =>{
//    console.log(success.data)
//     })    
// ECMAScript - async await




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