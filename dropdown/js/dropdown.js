'use strict';

document.addEventListener('DOMContentLoaded', () => {
    function dropdown() {
        const dropdownBtns = document.querySelectorAll('.drop__btn'),
        dropdowns = document.querySelectorAll('.dropdown');

        dropdownBtns.forEach(el => {
            el.addEventListener('click', (e) => {
                let currentBtn = e.currentTarget;
                let dropdown = currentBtn.closest('.drop__item').querySelector('.dropdown');//через родителя menu__item находим дропдаун

                dropdownBtns.forEach(el => {
                    if (el !== currentBtn) {//удаляем класс активности с других кнопок, кроме активной
                        el.classList.remove('drop__btn--active');
                    }
                });

                dropdowns.forEach(el => {
                    if (el !== dropdown) {
                        el.classList.remove('dropdown--active');
                    }
                });

                dropdown.classList.toggle('dropdown--active');
                currentBtn.classList.toggle('drop__btn--active');         
                
            });
        });

        document.addEventListener('click', (e) => {//по клику в любое место сайта, кроме меню - закрывать дропдаун
            if (!e.target.closest('.drop')) {            
                dropdownBtns.forEach(el => {
                    el.classList.remove('drop__btn--active');                
                });

                dropdowns.forEach(el => {
                    el.classList.remove('dropdown--active');                
                });
            }
        });
    }
    dropdown();
});