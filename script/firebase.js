const firebaseConfig = {
    apiKey: "AIzaSyDKROCfYUdEzG8gCkjVYGfHwDHsGhvu7ZA",
    authDomain: "clothingsales-2ace7.firebaseapp.com",
    projectId: "clothingsales-2ace7",
    storageBucket: "clothingsales-2ace7.appspot.com",
    messagingSenderId: "856958563843",
    appId: "1:856958563843:web:7758d4e8948316a5e44036"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // O usuário está autenticado.
        console.log("Usuário está logado:", user);
        setUserName();
        // Você pode redirecionar o usuário para outra página, por exemplo:
        // window.location.href = "pagina_logada.html";
    } else {
        // O usuário não está autenticado.
        console.log("Usuário não está logado.");
        // Você pode redirecionar o usuário para a página de login, por exemplo:
        // window.location.href = "pagina_login.html";
    }
});

// Referência ao Firestore
const db = firebase.firestore();


async function adicionarAoCarrinho(produtoId) {
    // Verificar se o usuário está autenticado
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = './view/login.html';
        return;
    }

    try {
        // Referência ao documento do usuário no Firestore
        const userDocRef = db.collection('usuarios').doc(user.uid);

        // Referência à coleção "carrinho" dentro do documento do usuário
        const carrinhoRef = userDocRef.collection('carrinho');

        // Adicionar o produto ao carrinho
        await carrinhoRef.add({
            produtoId: produtoId, // Usando o ID do produto como referência
            quantidade: 1, // Por padrão, adicionamos apenas 1 item ao carrinho

        });

        alert('Produto adicionado ao carrinho com sucesso!');

        console.error('id do produto:', produtoId);
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        alert('Erro ao adicionar produto ao carrinho. Por favor, tente novamente mais tarde.');
    }
}

function setUserName() {
    // Verifica se o usuário está autenticado
    const user = firebase.auth().currentUser;

    if (user) {
        // Referência ao documento do usuário no Firestore
        const usuariosRef = db.collection('usuarios').doc(user.uid);

        // Obtém os dados do usuário do Firestore
        usuariosRef.get().then(doc => {
            if (doc.exists) {
                // Define o nome de usuário na interface do usuário
                const name_user = document.getElementById('name-user');
                name_user.textContent = doc.data().username;
                console.log("nome do usuario:", doc.data().username);
            } else {
                console.log('Documento do usuário não encontrado.');
            }
        }).catch(error => {
            console.log('Erro ao obter dados do usuário:', error);
        });
    }
}





// Função para recuperar produtos aleatórios
async function getProdutosAleatorios(categoria) {
    const produtosRef = db.collection('Roupas').doc(categoria).collection('Adulto');

    // Executa a consulta para obter produtos aleatórios
    const snapshot = await produtosRef.limit(3).get(); // Limita a 3 produtos para cada categoria

    // Converte o snapshot em uma matriz de objetos de produtos
    const produtos = [];
    snapshot.forEach(doc => {
        produtos.push(doc.data());
    });

    return produtos;
}


// Função para exibir produtos aleatórios na página principal
async function exibirProdutosAleatorios() {

    const produtosMasculinos = await getProdutosAleatorios('Masculino');


    const produtosFemininos = await getProdutosAleatorios('Feminino');
    const produtosAleatorios = produtosMasculinos.concat(produtosFemininos);
    produtosAleatorios.sort(() => Math.random() - 0.5);
    const produtosContainer = document.getElementById('produtos-container');
    produtosContainer.innerHTML = '';


    produtosAleatorios.forEach(produto => {
        console.log('Dados do produto:', produto); // Adiciona esta linha
        const produtoElement = document.createElement('div');
        produtoElement.classList.add('produto');

        // Adiciona informações do produto ao elemento
        produtoElement.innerHTML = `
    <img src="${produto.img}" alt="Imagem da roupa">
    <h3>${produto.nome}</h3>
    <p>Preço: ${produto.valor}</p>
    <button class="btn-adicionar" onClick="adicionarAoCarrinho('${produto.id}')">Adicionar ao Carrinho</button>
    <!-- Adicionem mais informações conforme necessário -->
`;

        // Adiciona o elemento do produto ao container de produtos
        produtosContainer.appendChild(produtoElement);
    });

}
exibirProdutosAleatorios();