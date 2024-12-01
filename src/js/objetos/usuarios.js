//Objeto criado para passar os parâmetros para busca no JSON. os valores são atribuidos como vazios e deppois abaixo foi criada um método com o this para atribuir os valores aos objetos.
const usuario = {
    avatarUrl: '',
    nome: '',
    nomeUsuario: '',
    followers: '',
    following:'',
    repositorios: [],
    eventos: [],
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url
        this.nome = gitHubUser.name
        this.bio = gitHubUser.bio
        this.nomeUsuario = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositorios(repositories) {
        this.repositories = repositories
    },
    setEvents (events) {
        this.events = events
    }
}

export { usuario }