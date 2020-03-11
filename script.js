document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('li a');

    navMenu.addEventListener('click', (event) => {
        menuItems.forEach(item => item.classList.remove('nav__item-link--active'));
        event.target.classList.add('nav__item-link--active');
    });
});