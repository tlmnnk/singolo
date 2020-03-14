document.addEventListener('DOMContentLoaded', () => {
    //DOMContentLoaded - when dom loaded
    //window.onload - when all loaded including styles
    const navMenu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('li a');

    const slider = document.getElementById('slider');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let index = 0;

    const iphone =  document.querySelectorAll('.slider__item-img');

    const portfolioGridItems = document.querySelectorAll('.portfolio__item');

    const form = document.querySelector('.form');
    console.log(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = document.getElementById('subject').value ? document.getElementById('subject').value : 'Без темы';
        const description = document.getElementById('area').value ? document.getElementById('area').value : 'Без описания';
        //Modal window opens over body....
    });


    //portfolio item border
    portfolioGridItems.forEach(item => {
        item.addEventListener('click', portfolioItemBorder);
    });
    iphone.forEach(item => {
        item.addEventListener('click', blackDisplayIphone);
    });

    function portfolioItemBorder(e) {
        
        const targetClasses = e.target.parentNode.classList;
        console.log(e);
        if(targetClasses.contains('portfolio__item--border')) {
            targetClasses.remove('portfolio__item--border');
        } else {
            portfolioGridItems.forEach(item => {
                item.classList.remove('portfolio__item--border');
            });
            targetClasses.add('portfolio__item--border');
        } 
       
    }

    function blackDisplayIphone(e) {

        const wallpaper = e.target.parentNode.querySelector('.slider__item-wallpaper--blackening');
        const iphoneStyles = window.getComputedStyle(wallpaper);
        iphoneStyles.backgroundColor === 'rgba(0, 0, 0, 0)' ? wallpaper.style.backgroundColor = 'rgba(0, 0, 0)' : wallpaper.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    //Navigation
    navMenu.addEventListener('click', (event) => {
        menuItems.forEach(item => item.classList.remove('nav__item-link--active'));
        event.target.classList.add('nav__item-link--active');
    });

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);

    function nextSlide() {
        let sliderStyles = window.getComputedStyle(slider);
        sliderStyles.backgroundColor === 'rgb(240, 108, 100)' ? slider.style.backgroundColor = 'rgb(100, 139, 240)' : slider.style.backgroundColor = 'rgb(240, 108, 100)';
        index++;
        if(index === totalSlides) {index = 0;}

        for(let i = 0; i < totalSlides; i++) {
            slides[i].classList.remove('slide--active');
        }
        slides[index].classList.add('slide--active');

        
    }

    function prevSlide() {
        let sliderStyles = window.getComputedStyle(slider);
        sliderStyles.backgroundColor === 'rgb(240, 108, 100)' ? slider.style.backgroundColor = 'rgb(100, 139, 240)' : slider.style.backgroundColor = 'rgb(240, 108, 100)';

        if(index === 0) {index = totalSlides;}
        index--;
        for(let i = 0; i < totalSlides; i++) {
            slides[i].classList.remove('slide--active');
        }
        slides[index].classList.add('slide--active');
    }

    addTagsClickHandler();
   
}); 

const addTagsClickHandler = () => {
    document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
        if(e.target.classList.contains('tag')) {
            let target = e.target;
            //console.log(e);
            removeSelectedTags();
            selectClickedTag(target);
            if(target.innerText === 'All') {
                showAllPortfolioItems();
            } else {
                filterPortfolioItemsBySelectedTag(target.innerText);
            }
        }
    });
};

const removeSelectedTags = (target) => {
    let tags = document.querySelectorAll('.portfolio__tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag--selected');  
    });
    
};

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag--selected');
};

const showAllPortfolioItems = () => {
    let portfolioItems = document.querySelectorAll('.portfolio__layout .portfolio__item');
    portfolioItems.forEach(portfolioItem => {
        portfolioItem.classList.remove('portfolio__item--hidden');
    });
};

const filterPortfolioItemsBySelectedTag = (selectedTag) => {
    let portfolioItems = document.querySelectorAll('.portfolio__layout .portfolio__item');
    portfolioItems.forEach(portfolioItem => {
        portfolioItem.classList.add('portfolio__item--hidden');
        if(portfolioItem.dataset.tags.includes(selectedTag)) {
            portfolioItem.classList.remove('portfolio__item--hidden');
        }
    });
};
