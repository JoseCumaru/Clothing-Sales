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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // O usuário está autenticado
        console.log("Usuário está autenticado:", user);

        // Preenche os campos do formulário com os dados do usuário
        document.getElementById('email').value = user.email || '';
        
        // Recupera outros dados do usuário do Firestore (se disponível)
        const userDocRef = firebase.firestore().collection('usuarios').doc(user.uid);
        userDocRef.get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                document.getElementById('username').value = data.nome || '';
                document.getElementById('endereco').value = data.endereco || '';
                document.getElementById('cpf').value = data.cpf || '';
                document.getElementById('telefone').value = data.telefone || '';
            }
        }).catch(error => {
            console.error('Erro ao recuperar dados do usuário:', error);
        });

    } else {
        // O usuário não está autenticado
        console.log("Usuário não está autenticado.");
    }
});

function updateUserProfile(event) {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    if (user) {
        const userDocRef = firebase.firestore().collection('usuarios').doc(user.uid);
        const formData = new FormData(event.target);

        // Atualize os dados do usuário no Firestore
        userDocRef.update({
            nome: formData.get('nome'),
            endereco: formData.get('endereco'),
            cpf: formData.get('cpf'),
            telefone: formData.get('telefone')
        }).then(() => {
            console.log('Dados do usuário atualizados com sucesso.');
            window.location.href = '../index.html';
        }).catch(error => {
            console.error('Erro ao atualizar dados do usuário:', error);
        });
    } else {
        console.log('Usuário não autenticado.');
    }
}
