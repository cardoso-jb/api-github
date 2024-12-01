//Importando arquivo de serviços, que contem as funções assíncronas que fazem o fetch (busca), na API do GitHub, para usar nas funções
import { pegarUsuario } from "./servicos/usuarios.js";
import { repos } from "./servicos/repositorios.js";
import { events } from "./servicos/eventos.js"; 

//Importando objeto com as informações filtradas que queremos que venha da API, assim como objeto que conterá as propriedades para inserção dessas informações no HTML
import {usuario} from "./objetos/usuarios.js"
import {tela} from "./objetos/tela.js"


//Pegando o botão no HTML e adicionando um event listener ao botão, para que quando clickado ele retorne as informações
document.getElementById('btn-search').addEventListener("click", ()=> {
    //Passando uma variável para buscar o valor passado pelo usuário para fazer a busca
    const nomeUsuario = document.getElementById('input-search').value

    //Chamando função de validar usuario para verificar se o nome foi preenchido, caso o retorno vazio da função seja "true", ela da um return
    if(validarSeUsuarioVazio(nomeUsuario)) return
  
    //Utilizando a função criada para exibir o resultado da busca
    retornoDadosUsuario(nomeUsuario)
})


//Criando um event listener para o input, para poder usar a tecla "enter" para realizar a busca, dentro do parâmtro da função de event listener, é obrigatório passar o "e" antes da arrow function
document.getElementById('input-search').addEventListener("keyup", (e)=> {
    //Passando uma variável para buscar o valor passado pelo usuário para fazer a busca utilizando "e", que é o evento e buscando o valor com o target.value
    const nomeUsuario = e.target.value
    // Utilizando uma variável para pegar o código da chave que virá ao apertar o enter
    const tecla = e.which || e.keyCode
    //criando variável para verificar se a tecla apertada foi a tecla enter (ela tem chave 13 no JS)
    const enterPressionado = tecla === 13

    //Chamando função de validar usuario para verificar se o nome foi preenchido, caso o retorno vazio da função seja "true", ela da um return
    if(validarSeUsuarioVazio(nomeUsuario)) return
    
    //Utiliazando a condicional if, para verificar se a tecla pressionada foi a que queremos, ai retorna o valor pedido
    if (enterPressionado) {
        retornoDadosUsuario(nomeUsuario)
    }
})

//Função criada para verificar se o campo do nome do usuário, fazendo ela retornar um buleano "true"
function validarSeUsuarioVazio (nomeUsuario) {
    if(nomeUsuario.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

//Função para pegar o json e capturar os dados necessários do usuário
async function retornoDadosUsuario (nomeUsuario) {

    //Variável para receber a resposta da função de serviço de retornar os dados do usuario de acordo com o nome passado
    const respostaUsuario = await pegarUsuario(nomeUsuario);

    //Criando laço if (se), para retornar vazio caso o usuario não exista
    if(respostaUsuario.message === "Not Found"){
        tela.renderizarNotFound()
        return
    }

    //Variável para receber a resposta da função de serviço de retornar os repositorios do usuario de acordo com o nome passado
    const respostaRepositorios = await repos (nomeUsuario);

    //Variável para receber a resposta da função de serviço de retornar os repositorios do usuario de acordo com o nome passado
    const respostaEventos = await events (nomeUsuario);

    //Colocando as informações recebidas da função de serviço dentro do objeto usuario no "setInfo"
    usuario.setInfo(respostaUsuario)


    //Colocando as informaçõoes recebidas da função de serviço dentro do objeto usuario no "setRepositorios"
    usuario.setRepositorios(respostaRepositorios)

    //Colocando as informaçõoes recebidas da função de serviço dentro do objeto usuario no "setRepositorios"
    usuario.setEvents(respostaEventos)

    //Colocando as informaçõoes recebidas da função de serviço dentro do objeto tela no "renderizarUsuario"
    tela.renderizarUsuario(usuario)
}

