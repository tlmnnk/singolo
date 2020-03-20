window.onload = function() {
    //DOMContentLoaded - when dom loaded
    //window.onload - when all loaded including styles
  
    headerOnScrollResize();

    sliderArrowClickHandler();

    iphoneClickHandler();

    addTagsClickHandler();

    portfolioItemClickHandler();

    addSubmitHandler();
   
};

const headerOnScrollResize = () => {
    const header = document.querySelector('.header__block');
    window.addEventListener('scroll', () => {
        window.scrollY > 70 ? header.classList.add('header__block--resize') : header.classList.remove('header__block--resize');
        navMenuItemSelectedOnScroll();
	});
};

const navMenuHandler = () => {
    const navMenu = document.getElementById('menu');
    
    navMenu.addEventListener('click', (event) => {
        document.querySelectorAll('.nav__item-link').forEach(item => item.classList.remove('nav__item-link--active'));
        event.target.classList.add('nav__item-link--active');
    });
};

const navMenuItemSelectedOnScroll = () => {
    const curPos = window.scrollY;
    const sections = document.querySelectorAll('body > section');
    const navLinks = document.querySelectorAll('.nav__item-link');
    sections.forEach(section => {
        if((section.offsetTop - 200) <= curPos && (section.offsetTop + section.offsetHeight - 200) > curPos) {
            navLinks.forEach(link => {
                link.classList.remove('nav__item-link--active');
                if(section.getAttribute('id') === link.getAttribute('href').substr(1)) {
                    link.classList.add('nav__item-link--active');
                }
            });
            document.querySelectorAll('.nav__item-link');
        }
        if(curPos >= 2400) {
            navLinks.forEach(link => {
                link.classList.remove('nav__item-link--active');});
            navLinks[4].classList.add('nav__item-link--active');
        }
        if(curPos >= 2400) {
            navLinks.forEach(link => {
                link.classList.remove('nav__item-link--active');});
            navLinks[4].classList.add('nav__item-link--active');
        }
    });
};

const sliderArrowClickHandler = () => {
    const slider = document.getElementById('home');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideIndex = 0;

    const nextSlide = () => {
        let sliderStyles = window.getComputedStyle(slider);
      
        //const activeSlide = 
        //sliderStyles.backgroundColor === 'rgb(240, 108, 100)' ? slider.style.backgroundColor = 'rgb(100, 139, 240)' : slider.style.backgroundColor = 'rgb(240, 108, 100)';
        //move slides[slideIndex] to the right
        slides[slideIndex].classList.add('slide-right');
        slides[slideIndex].classList.add('slide-hide');
        //slides[slideIndex].classList.add('slide-left');
        slideIndex++;
        if(slideIndex === totalSlides) {slideIndex = 0;}
        //move slides[slideIndex] to left and then to center;
        //slides[slideIndex].classList.add('slide-left');
        
        setTimeout(() => slides[slideIndex].classList.remove('slide-hide'), 300);
        setTimeout(() => slides[slideIndex].classList.add('slide-center'), 500);
        setTimeout(() => slides[slideIndex].classList.remove('slide-left'), 500);
        setTimeout(() => slides[slideIndex - 1].classList.remove('slide-right'), 600);
        console.log(slideIndex);
        
        
        //smoothClassChange(slides[slideIndex], 'slide--active');
        //slides[slideIndex].classList.add('slide--active'); 
    };
    
    const prevSlide = () => {
        let sliderStyles = window.getComputedStyle(slider);
        sliderStyles.backgroundColor === 'rgb(240, 108, 100)' ? slider.style.backgroundColor = 'rgb(100, 139, 240)' : slider.style.backgroundColor = 'rgb(240, 108, 100)';
    
        if(slideIndex === 0) {slideIndex = totalSlides;}
        slideIndex--;
        for(let i = 0; i < totalSlides; i++) {
            slides[i].classList.remove('slide--active');
        }
        slides[slideIndex].classList.add('slide--active');
        //smoothClassChange(slides[slideIndex], 'slide--active');
    };

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);
};

const smoothClassChange = (element, classToAdd) => {
    element.classList.add(classToAdd);
    setTimeout(() => element.classList.remove(classToAdd), 300);
};

const iphoneClickHandler = () => {
    document.querySelectorAll('.slider__item-img').forEach(item => {
        item.addEventListener('click', iphoneDisplaySwitch);
    });
};

const iphoneDisplaySwitch = (e) => {
    const wallpaper = e.target.parentNode.querySelector('.slider__item-wallpaper--blackening');
    const iphoneStyles = window.getComputedStyle(wallpaper);
    iphoneStyles.backgroundColor === 'rgba(0, 0, 0, 0)' ? wallpaper.style.backgroundColor = 'rgba(0, 0, 0)' : wallpaper.style.backgroundColor = 'rgba(0, 0, 0, 0)';
};

const addTagsClickHandler = () => {
    document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
        if(e.target.classList.contains('tag')) {
            let target = e.target;
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

const portfolioItemClickHandler = () => {
    const portfolioGridItems = document.querySelectorAll('.portfolio__item');
    portfolioGridItems.forEach(item => {
        item.addEventListener('click', portfolioItemBorder);
    });

    function portfolioItemBorder(e) {
        
        const targetClasses = e.target.parentNode.classList;
        if(targetClasses.contains('portfolio__item--border')) {
            targetClasses.remove('portfolio__item--border');
        } else {
            portfolioGridItems.forEach(item => {
                item.classList.remove('portfolio__item--border');
            });
            targetClasses.add('portfolio__item--border');
        }  
    }
};

const addSubmitHandler = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', modalOnSubmitShow);
};

const modalOnSubmitShow = (e) => {
    e.preventDefault();
    const topic = document.getElementById('subject').value ? document.getElementById('subject').value : 'Без темы';
    const description = document.getElementById('area').value ? document.getElementById('area').value : 'Без описания';
   
    renderModal(topic, description);

    closeModal();
};

const renderModal = (topic, description) => {
    document.querySelector('#modal__topic').innerText = topic;
    document.querySelector('#modal__description').innerText = description;
    document.querySelector('.overlay').classList.remove('overlay--hidden');
    document.querySelector('body').classList.add('scroll-hidden');
};

const closeModal = () => {
    document.querySelector('.modal__btn').addEventListener('click', () => {
        document.querySelector('.overlay').classList.add('overlay--hidden');
        document.querySelector('body').classList.remove('scroll-hidden');
    });
    resetInputValues();
};

const resetInputValues = () => {

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    
    if(document.getElementById('subject').value) document.getElementById('subject').value = '';

    if(document.getElementById('area').value) document.getElementById('area').value = '';
};