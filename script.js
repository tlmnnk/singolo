document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('li a');

    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let index = 0;

    //Navigation
    navMenu.addEventListener('click', (event) => {
        menuItems.forEach(item => item.classList.remove('nav__item-link--active'));
        event.target.classList.add('nav__item-link--active');
    });

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);

    
    function nextSlide() {
        index++;
        if(index === totalSlides) {index = 0;}

        for(let i = 0; i < totalSlides; i++) {
            slides[i].classList.remove('slide--active');
        }
        slides[index].classList.add('slide--active');
    }

    function prevSlide() {
        
        if(index === 0) {index = totalSlides;}
        index--;
        for(let i = 0; i < totalSlides; i++) {
            slides[i].classList.remove('slide--active');
        }
        slides[index].classList.add('slide--active');
    }
});