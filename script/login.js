// Configurações do Firebase
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

// Função de login com e-mail/senha
function signInWithEmailAndPassword(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sucesso no login
            const user = userCredential.user;
            alert("Usuário logado!");
            console.log('Usuário logado:', user);
            
            // Verificar o campo 'role' do usuário
            checkUserRole(user);
        })
        .catch((error) => {
            // Trata erros de login
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro no login");
            console.error('Erro no login:', errorMessage);
        });
}


function checkUserRole(user) {
    db.collection('usuarios').doc(user.uid).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const role = userData.role;
             
                if (role === 1) {
                    window.location.href = "admin.html"; 
                } else if (role === 2) {
                    window.location.href = "../index.html"; 
                } else {
                    alert("Papel de usuário desconhecido");
                    console.error("Papel de usuário desconhecido:", role);
                }
            } else {
                alert("Dados do usuário não encontrados");
                console.error("Dados do usuário não encontrados");
            }
        })
        .catch((error) => {
            alert("Erro ao verificar o papel do usuário");
            console.error("Erro ao verificar o papel do usuário:", error);
        });
}
