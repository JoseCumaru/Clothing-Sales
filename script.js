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

