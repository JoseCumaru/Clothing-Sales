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

  // Verifica se o usuário está autenticado
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      listarProdutosCarrinho(user.uid);
    } else {
      window.location.href = 'login.html';
    }
  });


// Função para listar os produtos no carrinho do usuário
function listarProdutosCarrinho(userId) {
  const carrinhoRef = db.collection('usuarios').doc(userId).collection('carrinho');

  carrinhoRef.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      // O carrinho está vazio
      exibirCarrinhoVazio();
    } else {
      // O carrinho contém produtos
      const produtosPromises = [];
      querySnapshot.forEach((doc) => {
        const produtoId = doc.data().produtoId;
        const quantidade = doc.data().quantidade;
        // Para cada produto no carrinho, obtem os detalhes do produto do banco de dados
        const produtoPromiseMasculino = db.collection('Roupas').doc('Masculino').collection('Adulto').doc(produtoId).get();
        const produtoPromiseFeminino = db.collection('Roupas').doc('Feminino').collection('Adulto').doc(produtoId).get();

        produtosPromises.push(produtoPromiseMasculino);
        produtosPromises.push(produtoPromiseFeminino);
      });

      // Aguarde todas as consultas serem resolvidas
      Promise.all(produtosPromises).then((produtosSnapshots) => {
        const produtos = [];
        produtosSnapshots.forEach((produtoSnapshot) => {
          if (produtoSnapshot.exists) { // Verifica se o documento existe
            produtos.push(produtoSnapshot.data());
          } else {
            console.error('Erro ao obter detalhes dos produtos:', 'Documento não encontrado');
          }
        });
        // Exibe os produtos na página
        exibirProdutosNoCarrinho(produtos);
      }).catch((error) => {
        console.error('Erro ao obter detalhes dos produtos:', error);
        
      });
    }
  }).catch((error) => {
    console.error('Erro ao obter produtos do carrinho:', error);

  });
}



// Função para exibir os produtos no carrinho na página
function exibirProdutosNoCarrinho(produtos) {
const container = document.querySelector('.container');

container.innerHTML = '';

// Itera sobre os produtos e os exibe na página
produtos.forEach((produto) => {
    const produtoHTML = `
      <div class="product-list">
        <div class="product-item">
          <img src="${produto.img}" alt="${produto.img}">
          <div class="product-info">
            <h2>${produto.nome}</h2>
            <p>Preço: ${produto.valor}</p>
            <div class="product-controls">
              <button class="quantity-btn" onclick="diminuirQuantidade('${produto.id}')">-</button>
              <span class="quantity">1</span>
              <button class="quantity-btn" onclick="aumentarQuantidade('${produto.id}')">+</button>
              <button class="remove-btn" onclick="removerDoCarrinho('${produto.id}')">Remover</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += produtoHTML;

    // Calcula o total do carrinho
    const precoProdutos = document.querySelectorAll('.product-price');
    let total = 0;
    precoProdutos.forEach(preco => {
        total += parseFloat(preco.textContent.replace('Preço: R$ ', '').replace(',', '.'));
    });

    // Atualiza o total na página
    const totalElement = document.querySelector('#box-products footer span:last-child');
    totalElement.textContent = `R$ ${total.toFixed(2)}`;

    const classBox = document.getElementById('box-products');
    classBox.style.display = 'block';
    const btn_finalizar = document.getElementById('btn-finalizar');
    btn_finalizar.style.display = 'block';
   
  });
}
