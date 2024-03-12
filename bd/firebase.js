
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

// Get a list of cities from your database
async function getRoupas(db) {
  const roupasCol = collection(db, 'Roupas', 'Feminino', 'Adulto');
  const roupasSnapshot = await getDocs(roupasCol);
  const roupasList = roupasSnapshot.docs.map(doc => doc.data());
  return roupasList;
}


// Função para recuperar e exibir roupas femininas para adultos
async function getRoupasFemininasAdulto() {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ''; // Limpa o conteúdo anterior
  
  const roupasRef = collection(db, 'Roupas', 'Feminino', 'Adulto');
  const snapshot = await getDocs(roupasRef);
  
  snapshot.forEach(doc => {
    // Crie elementos HTML para exibir os dados
    const roupaDiv = document.createElement('div');
    roupaDiv.innerHTML = `
      <h3>${doc.data().nome}</h3>
      <p>valor: ${doc.data().valor}</p>
      <!-- Adicione mais campos conforme necessário -->
    `;
    
    // Adicione o elemento da roupa à div de resultados
    resultadosDiv.appendChild(roupaDiv);
  });
}

// Chame a função para recuperar e exibir as roupas quando necessário
getRoupasFemininasAdulto();