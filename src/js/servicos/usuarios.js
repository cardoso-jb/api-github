//Arquivo criado dentro da pasta servicos (services), para conter o metodo que acessa o banco de dados ou API, como o fetch abaixo.

//Importando arquivo de variaveis para atribuir nas funções
import { urlBase } from "../variaveis.js"

//Função assincrona para buscar a API e obter o json (objeto), para coletar os dados.
async function pegarUsuario (nomeUsuario) {
    const resposta = await fetch (`${urlBase}${nomeUsuario}`);
    return await resposta.json()
}


export { pegarUsuario } 