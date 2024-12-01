//Arquivo criado dentro da pasta servicos (services), para conter o metodo que acessa o banco de dados ou API, como o fetch abaixo.

//Importando arquivo de variaveis para atribuir nas funções
import { urlBase, quantidadeRepos } from "../variaveis.js"

//Criando função assincrona para buscar a API e obter o json, e coletar os repositorios do GitHub do usuário
async function repos (nomeUsuario) {
    const resposta = await fetch (`${urlBase}${nomeUsuario}/repos?per_page=${quantidadeRepos}`);
    return await resposta.json()
}

export {repos}