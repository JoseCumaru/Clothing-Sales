
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

// Obtenha uma referência para o Firestore
const db = firebase.firestore();

// Função para recuperar e exibir roupas femininas para adultos
async function getRoupasFemininasAdulto() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    const roupasRef = db.collection('Roupas').doc('Feminino').collection('Adulto');
    const snapshot = await roupasRef.get();

    snapshot.forEach(doc => {
        // Crie elementos HTML para exibir os dados
        const roupaDiv = document.createElement('div');
        roupaDiv.innerHTML = `
            <img src="${doc.data().img} alt="Imagem da Roupa">
            <h3>${doc.data().nome}</h3>
            <p>R$: ${doc.data().valor}</p>
            <!-- Adicione mais campos conforme necessário -->
            `;

            // Adicione o botão "Adicionar ao Carrinho"
            const btnAdicionar = document.createElement('button');
            btnAdicionar.textContent = 'Adicionar ao Carrinho';
            btnAdicionar.classList.add('btn-adicionar');
            roupaDiv.appendChild(btnAdicionar);

            // Adicione o elemento da roupa à div de resultados
            resultadosDiv.appendChild(roupaDiv);
            });
        }

        // Chame a função para recuperar e exibir as roupas quando necessário
        getRoupasFemininasAdulto();


async function getRoupasFemininasAdulto() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    const roupasRef = db.collection('Roupas').doc('Feminino').collection('Adulto');
    const snapshot = await roupasRef.get();

    snapshot.forEach(doc => {
        // Crie elementos HTML para exibir os dados
        const roupaDiv = document.createElement('div');
        roupaDiv.innerHTML = `
            <img src="${doc.data().img} alt="Imagem da Roupa">
            <h3>${doc.data().nome}</h3>
            <p>R$: ${doc.data().valor}</p>
            <!-- Adicione mais campos conforme necessário -->
            `;

            // Adicione o botão "Adicionar ao Carrinho"
            const btnAdicionar = document.createElement('button');
            btnAdicionar.textContent = 'Adicionar ao Carrinho';
            btnAdicionar.classList.add('btn-adicionar');
            roupaDiv.appendChild(btnAdicionar);

            // Adicione o elemento da roupa à div de resultados
            resultadosDiv.appendChild(roupaDiv);
      });
}

async function getRoupasMasculinosAdulto() {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ''; // Limpa o conteúdo anterior

  const roupasRef = db.collection('Roupas').doc('Masculinos').collection('Adulto');
  const snapshot = await roupasRef.get();

  snapshot.forEach(doc => {
      // Crie elementos HTML para exibir os dados
      const roupaDiv = document.createElement('div');
      roupaDiv.innerHTML = `
          <img src="${doc.data().img} alt="Imagem da Roupa">
          <h3>${doc.data().nome}</h3>
          <p>R$: ${doc.data().valor}</p>
          <!-- Adicione mais campos conforme necessário -->
          `;

          // Adicione o botão "Adicionar ao Carrinho"
          const btnAdicionar = document.createElement('button');
          btnAdicionar.textContent = 'Adicionar ao Carrinho';
          btnAdicionar.classList.add('btn-adicionar');
          roupaDiv.appendChild(btnAdicionar);

          // Adicione o elemento da roupa à div de resultados
          resultadosDiv.appendChild(roupaDiv);
    });
}