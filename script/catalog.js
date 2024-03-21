const title_1 = document.querySelector(".title-1");

const firebaseConfig = {
    apiKey: "AIzaSyDKROCfYUdEzG8gCkjVYGfHwDHsGhvu7ZA",
    authDomain: "clothingsales-2ace7.firebaseapp.com",
    projectId: "clothingsales-2ace7",
    storageBucket: "clothingsales-2ace7.appspot.com",
    messagingSenderId: "856958563843",
    appId: "1:856958563843:web:7758d4e8948316a5e44036"
};


firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      console.log("Usuário está autenticado:", user);
    } else {
    
      console.log("Usuário não está autenticado");
    }
});
  


// Obtém a categoria da URL e chama a função correspondente
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    if (categoria) {
        title_1.textContent = categoria;
        getRoupas(categoria);
    } else {
        console.error('Nenhuma categoria selecionada.');
    }
});

// Função para recuperar e exibir roupas de acordo com a categoria selecionada
async function getRoupas(categoria) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    let roupasRef;

    // Escolha a referência correta com base na categoria selecionada
    switch (categoria) {
        case 'masculina':
            roupasRef = db.collection('Roupas').doc('Masculino').collection('Adulto');
            break;
        case 'masculina-infantil':
            roupasRef = db.collection('Roupas').doc('Masculino').collection('Infantil');
            break;
        case 'feminina':
            roupasRef = db.collection('Roupas').doc('Feminino').collection('Adulto');
            break;
        case 'feminina-infantil':
            roupasRef = db.collection('Roupas').doc('Feminino').collection('Infantil');
            break;
        default:
            console.error('Categoria inválida:', categoria);
            return;
    }

    // Obtem os dados do Firestore
    const snapshot = await roupasRef.get();

    // Exibe os resultados
    snapshot.forEach(doc => {
        const roupaDiv = document.createElement('div');
        roupaDiv.innerHTML = `
                     <img src="${doc.data().img}" alt="Imagem da Roupa">
                     <h3>${doc.data().nome}</h3>
                     <p>R$: ${doc.data().valor}</p>
                     <button class="btn-adicionar" onClick="adicionarAoCarrinho('${doc.data().id}')">Adicionar ao Carrinho</button>
                 `;
        resultadosDiv.appendChild(roupaDiv);
    });
}


async function adicionarAoCarrinho(produtoId) {
    // Verifica se o usuário está autenticado
    const user = firebase.auth().currentUser;
    try {
        if (!user) {
            window.location.href = 'login.html';
            throw new Error('Usuário não autenticado');
        }

        // Referência ao documento do usuário no Firestore
        const userDocRef = db.collection('usuarios').doc(user.uid);

        // Referência à coleção "carrinho" dentro do documento do usuário
        const carrinhoRef = userDocRef.collection('carrinho');

        // Adiciona o produto ao carrinho
        await carrinhoRef.add({
            produtoId: produtoId, 
            quantidade: 1, 
        });

        alert('Produto adicionado ao carrinho com sucesso!');

        console.error('id do produto:', produtoId);
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
       
    }
}
