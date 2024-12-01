//Objeto criado para receber as propriedades do que será imbedado (inserido) no HTML atraves do JS

const tela = {
    //Passando valor da chave "perfilUsuario", a classe da div onde a informação deve ser exibida
    perfilUsuario: document.querySelector('.profile-data'),
    //Criando método para aprensentar (renderizar) as informações do objeto "usuario"
    renderizarUsuario(usuario){
            //Utilizando uma função com o this para passar as tags HTML como valor do objeto
              this.perfilUsuario.innerHTML  = `<div class="info">
                                                <img src="${usuario.avatarUrl}" alt="Foto do perfil do usuario"/>
                                                <div class= "data">
                                                    <h1>${usuario.nome  ?? 'Não possui nome cadastrado 😢'}</h1>
                                                    <p>${usuario.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                                    <div class="follow">
                                                        <div class="followers">
                                                            <h3>Followers</h3>
                                                            <p>👥${usuario.followers}</p>
                                                        </div>
                                                        <div class="following">
                                                                <h3>Following</h3>
                                                        <p>👥${usuario.following}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;

       
        //Criando uma variável vazia, e atribuindo como valor para ela o retorno do array percorrido com o "forEach", concatenando (+=) com as informações do usuário para não sobrescrever
        let reposItens = ''
        usuario.repositories.forEach(repo => reposItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} </br> <p>🍴${repo.forks_count} ⭐${repo.stargazers_count} 👀${repo.watchers_count} 👨‍💻${repo.language}</p></a></li>`);
        
        //Laço if (se), para saber se caso não existir repositórios, não exibir o HTML com eles.
        if(usuario.repositories.length > 0) {
            this.perfilUsuario.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${reposItens}</ul>
                                            </div>`;
        }

        //Criando variável e setando os events
       const eventType = usuario.events.filter(function(typeEvent) {
        return typeEvent.type === 'CreateEvent' || typeEvent.type === 'PushEvent';
       });

       //Variável para adicionar apenas os eventos únicos, e com o "Set()" ignorar os eventos que possam estar duplicados
       const seenEvents = new Set();
       //Variável para armazenar os eventos únicos
       const eventsList = [];

       //Utilizando o forEach para procurar dentro de cada objeto os eventos selecionados
       eventType.forEach(exibeEvent => {
        //if (se) o obejto for type "PushEvent", buscar o nome do repositorio e a mensagem de commit
        if (exibeEvent.type === 'PushEvent') {
            const commit = exibeEvent.payload.commits;
    
            // Criando a string com as mensagens de commit (sem duplicação)
            const textMessage = commit.map(function(text) {
                // Verificando se a mensagem do commit existe; se não, colocando a mensagem padrão
                return text.message;
            }).join(', ');  // Unindo as mensagens em uma única string separada por vírgulas
    
            // Verificando se o evento já foi adicionado (evitando duplicação)
            if (!seenEvents.has(exibeEvent.id)) {
                seenEvents.add(exibeEvent.id);  // Marcar como já exibido
                eventsList.push({ name: exibeEvent.repo.name, messages: textMessage });  // Armazenar o evento e a mensagem
            }}
            //else if ( ou se) o obejto for type "CreateEvent", buscar o nome do repositorio e a mensagem padrão
            else if (exibeEvent.type === 'CreateEvent') {
                if (exibeEvent.repo && exibeEvent.repo.name) {
                    const repoName = exibeEvent.repo.name; // Nome do repositório
                    const createEventMessage = ` Sem Mensagem de Commit`; //Mensagem exibida com o "CreateEvent"

                    // Verificando se o evento já foi adicionado (evitando duplicação)
                    if (!seenEvents.has(exibeEvent.id)) {
                        seenEvents.add(exibeEvent.id);
                        eventsList.push({ name: repoName, messages: createEventMessage });
                    }
            } 
        }
    });
    
    // Gerando o HTML com todos os eventos únicos
    let eventsItens = eventsList.map(event => `<li>${event.name} - ${event.messages}</li>`).join('');
    
    // Atualizando o HTML de uma vez só, após o loop
    if (eventsItens) {
        this.perfilUsuario.innerHTML += `
        <div class="event section">
            <h2>Eventos</h2>
            <ul>${eventsItens}</ul>
        </div>`
    }},

    // //Método para caso não exista o nome do usuário, exibir mensagem na tela 
    renderizarNotFound() {
          this.perfilUsuario.innerHTML = "<h3>Usuário Não Encontrado</h3>"
        }
    }


export { tela }