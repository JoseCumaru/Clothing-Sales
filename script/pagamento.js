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
      // O usuário está autenticado
      console.log("Usuário está autenticado:", user);
    } else {
      // O usuário não está autenticado
      console.log("Usuário não está autenticado");
    }
  });


async function limparCarrinhoDoUsuario() {
    const user = firebase.auth().currentUser;
    if (user) {
        const userDocRef = db.collection('usuarios').doc(user.uid);
        const carrinhoRef = userDocRef.collection('carrinho');

        try {
            // Obter todos os documentos do carrinho
            const snapshot = await carrinhoRef.get();
            
            // Verificar se existem documentos no carrinho
            if (!snapshot.empty) {
                // Excluir cada documento do carrinho
                const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
                await Promise.all(deletePromises);
                console.log('Todos os documentos do carrinho excluídos com sucesso.');
            } else {
                console.log('Não há documentos na subcoleção "carrinho" para excluir.');
            }
        } catch (error) {
            console.error('Erro ao limpar o carrinho do usuário:', error);
            throw error; // Propagar o erro para o chamador
        }
    } else {
        console.log('Usuário não autenticado.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const botaoFinalizar = document.querySelector('button[type="submit"]');
    botaoFinalizar.addEventListener('click', async function (event) {
        event.preventDefault(); 

        try {
            
            await limparCarrinhoDoUsuario();
            
         
            alert('Compra finalizada!')
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Erro ao finalizar a compra:', error);
          
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Adicione um manipulador de evento para os botões de opção de pagamento
    const opcoesPagamento = document.querySelectorAll('input[name="opcao-pag"]');
    opcoesPagamento.forEach(opcao => {
        opcao.addEventListener('change', function () {
            const opcaoSelecionada = this.value; // Obtém o valor da opção selecionada

            // Mostre ou oculte o conteúdo correspondente com base na opção selecionada
            const pixImg = document.getElementById('pix-img');
            const cartaoImg = document.getElementById('cartao-img');

            if (opcaoSelecionada === 'pix') {
                pixImg.style.display = 'block';
                cartaoImg.style.display = 'none';
            } else if (opcaoSelecionada === 'cartao') {
                pixImg.style.display = 'none';
                cartaoImg.style.display = 'block';
            }
        });
    });
});
