'use strict';
 
const menu = document.querySelector('.menu__body'),
      menuBtn = document.querySelector('.icon-menu'),
      body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menu.addEventListener('click', event => {
        if (event.target.classList.contains('menu__body')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
        }
    });

    menu.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {//скролл к секциям
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
        });
    });
}
//============== плавный скролл к якорям =========================
const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();

        const blockId = anchor.getAttribute('href').substring(1);

        document.getElementById(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    });    
});
