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

// Referência ao Firestore
const db = firebase.firestore();
const docSnap =  getDoc(docRef);


function mostrarDadosUsuaria(userId) {
    const userRef = db.collection('usuarios').doc(userId);
    const docSnap = getDoc(userRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
}

//3

class usuarios {
    constructor (username, email, endereco, cpf, telefone) {
        this.username = username;
        this.email = email;
        this.endereco = endereco;
        this.cpf = cpf;
        this.telefone = telefone;
    }
    toString() {
        return this.username + ', ' + this.email + ', ' + this.endereco + ', ' + this.cpf + ', ' + this.telefone;
    }
}

// Firestore data converter
const usuariosConvertido = {
    toFirestore: (usuarios) => {
        return {
            username: usuarios.username,
            email: usuarios.email,
            endereco: usuarios.endereco,
            cpf: usuarios.cpf,
            telefone: usuarios.telefone
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new usuarios(data.username, data.email, data.endereco, data.cpf, data.telefone);
    }
};