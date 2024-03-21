// Configurações do Firebase
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

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // O usuário está autenticado.
    console.log("Usuário está logado:", user);
    setUserName();
    const btnSignOut = document.getElementById('btnSignOut');
    btnSignOut.textContent = "Sair"
} else {
    // O usuário não está autenticado.
    console.log("Usuário não está logado.");
   
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
            produtoId: produtoId, 
            quantidade: 1, 
            
        });

        alert('Produto adicionado ao carrinho com sucesso!');

        console.error('id do produto:', produtoId);
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        alert('Erro ao adicionar produto ao carrinho. Por favor, tente novamente mais tarde.');
    }
}

function setUserName() {
    const user = firebase.auth().currentUser;
    if (user) {
        const usuariosRef = db.collection('usuarios').doc(user.uid);

        // Obtém os dados do usuário do Firestore
        usuariosRef.get().then(doc => {
            if (doc.exists) {
                const username = doc.data().nome;
                const firstLetter = username.charAt(0).toUpperCase(); // Obtém a primeira letra do nome e converte para maiúscula
                const imageModal = document.getElementById('image-user');
                imageModal.style.display = 'none';
                const userImage = document.getElementById('user-image');
                userImage.style.display = 'grid';
                userImage.textContent = firstLetter; // Define o conteúdo da div como a primeira letra do nome do usuário
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
    
    
    const snapshot = await produtosRef.limit(4).get(); // Limita a 3 produtos para cada categoria
    
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

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Usuário deslogado com sucesso');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Erro ao deslogar:', error);
        });
}




// Funcao pata chamar no whatsapp
function chamarWhatsapp(){
    var number = "+5597984398480"

    var url = "https://api.whatsapp.com/send?phone=" + number;

    window.location.href = url;
}


//Inicializa o Slidder
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    const slideWidth = imageList.querySelector("img").clientWidth;

    let currentSlide = 0;

    const nextSlide = () => {
        const nextSlideIndex = (currentSlide + 1) % imageList.children.length;
        const nextScrollLeft = nextSlideIndex * slideWidth;

        if (nextSlideIndex === 0) {
            imageList.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            imageList.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
        }

        currentSlide = nextSlideIndex;
    };
    // Define o intervalo para a troca automática de slides (a cada 3 segundos, por exemplo)
    const intervalId = setInterval(nextSlide, 3000);

    /*sliderScrollbar.addEventListener("mouseover", () => {
        clearInterval(intervalId);
    });

    sliderScrollbar.addEventListener("mouseout", () => {
        intervalId = setInterval(nextSlide, 3000);
    });*/

    
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

