window.onload = function() {
    //DOMContentLoaded - when dom loaded
    //window.onload - when all loaded including styles
    navMenuHandler();

    burgerClickHandler();
  
    headerOnScrollResize();

    sliderArrowClickHandler();

    iphoneClickHandler();

    addTagsClickHandler();

    portfolioItemClickHandler();

    addSubmitHandler();
   
};

const burgerClickHandler = () => {
    document.querySelector('.hamburger').addEventListener('click', () => {
        // toggle show/hide class for navigation
    burgerClassToggle();
    overlayToggle();
    document.querySelector('.nav').addEventListener('click', (e) => {
        if(e.target.classList.contains('nav__item-link')) {
            console.log('nav__item-link click!...');
            burgerClassToggle();
            document.querySelector('.hamburger').classList.remove('hamburger--click');
            document.querySelector('.nav').classList.remove('nav--active');
        }
    });
});
};

const burgerClassToggle = () => {
    document.querySelector('.nav').classList.toggle('nav--active');
    document.querySelector('.header__block').classList.toggle('header__block--active');
    document.querySelector('.header__logo').classList.toggle('header__logo--active');
    document.querySelector('.hamburger').classList.toggle('hamburger--click');

};

const overlayToggle = () => {
    console.log('overlayToggle run');
    document.querySelector('.modal').classList.toggle('modal--hidden');
    document.querySelector('.overlay').classList.toggle('overlay--hidden');
};

const headerOnScrollResize = () => {
    const header = document.querySelector('.header__block');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 70) {
            header.classList.add('header__block--resize');
            document.querySelector('.nav').classList.add('nav--onheader-resize');
        } else {
            header.classList.remove('header__block--resize');
            document.querySelector('.nav').classList.remove('nav--onheader-resize');
        }
             
        navMenuItemSelectedOnScroll();
	});
};

const navMenuHandler = () => {
    const navMenu = document.getElementById('menu');
    
    navMenu.addEventListener('click', (event) => {
        document.querySelectorAll('.nav__item-link').forEach(item => item.classList.remove('nav__item-link--active'));
        event.target.classList.add('nav__item-link--active');
        if(!document.querySelector('.overlay').classList.contains('overlay--hidden')) {
            overlayToggle();
        }
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
    });
};

const sliderArrowClickHandler = () => {
    //Имплементация слайдера из урока RSSchool
    const slider = document.querySelector('.slider');
    let isEnabled = true;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideIndex = 0;

    function changeCurrentItem(n) {
        slideIndex = (n + totalSlides) % totalSlides;
    }
     
    function hideSlide(direction) {
        isEnabled = false;
        slides[slideIndex].classList.add(direction);
        console.log(direction);
        slides[slideIndex].addEventListener('animationend', function() {
            console.log(this);
            this.classList.remove('slide-active', direction);
            console.log(this);
        });
    }

    function showSlide(direction) {
        slides[slideIndex].classList.add('slide-next', direction);
        slides[slideIndex].addEventListener('animationend', function() {
            this.classList.remove('slide-next', direction);
            this.classList.add('slide-active');
            isEnabled = true;
        });
    }

    function prevSlideIndex(n) {
        hideSlide('slide-to-right');
        changeCurrentItem(n - 1);
        switchSliderBackground(slider);
        showSlide('slide-from-left');
    }

    function nextSlideIndex(n) {
        hideSlide('slide-to-left');
        changeCurrentItem(n + 1);
        switchSliderBackground(slider);
        showSlide('slide-from-right');
    }

    function prevSlide()  {
        if(isEnabled) {
            prevSlideIndex(slideIndex);
        }
    } 
    
    function nextSlide()  {
        if(isEnabled) {
            nextSlideIndex(slideIndex);
        }
    }    
     

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);
};

const switchSliderBackground = (slider) => {
    let sliderStyles = window.getComputedStyle(slider);
    if(sliderStyles.backgroundColor === 'rgb(240, 108, 100)') {
        slider.style.backgroundColor = 'rgb(100, 139, 240)';
        slider.style.borderColor = 'rgb(100, 139, 240)';
    } else {
        slider.style.backgroundColor = 'rgb(240, 108, 100)';
        slider.style.borderColor = 'rgb(240, 108, 100)';
    }
    //sliderStyles.backgroundColor === 'rgb(240, 108, 100)' ? slider.style.backgroundColor = 'rgb(100, 139, 240)' : slider.style.backgroundColor = 'rgb(240, 108, 100)';
        
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