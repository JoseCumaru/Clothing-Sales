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

 function registerUser(event) {
     event.preventDefault(); // Impede o envio padrão do formulário
     
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const username = document.getElementById('username').value;
     const endereco = document.getElementById('endereco').value;
     const cpf = document.getElementById('cpf').value;
     const telefone = document.getElementById('telefone').value;
     const role = 2;

     // Verifica se as senhas coincidem
     const confirmPassword = document.getElementById('confirmPassword').value;
     if (password !== confirmPassword) {
         alert("As senhas não coincidem!");
         return;
     }

     // Cria o usuário no Firebase Authentication
     firebase.auth().createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
             // Sucesso no cadastro
             const user = userCredential.user;
             console.log('Usuário cadastrado:', user);

             // Salva os dados adicionais no Firestore
             return db.collection('usuarios').doc(user.uid).set({
                 username: username,
                 email: email,
                 endereco: endereco,
                 cpf: cpf,
                 telefone: telefone,
                 role: role
             });
         })
         .then(() => {
             // Redireciona para a página de login após o cadastro
             window.location.href = "../view/login.html";
         })
         .catch((error) => {
             // Trata erros de cadastro
             const errorCode = error.code;
             const errorMessage = error.message;
             console.error('Erro no cadastro:', errorMessage);
             alert(errorMessage);
         });
 }