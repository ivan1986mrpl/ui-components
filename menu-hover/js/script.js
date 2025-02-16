'use strict';

function linkHover() {
    const menuLinksWrappers =  document.querySelectorAll('[data-line-effect]');

    menuLinksWrappers.length > 0 ? menuEffect() : null;

    function menuEffect() {
        menuLinksWrappers.forEach(menuLinksWrapper => {
            const menuLinks = document.querySelectorAll("a");
            const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;//data-line-effect='1000' можно в data атрибут указать скорость анимации. если не указана, то скорость 200мс
            menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
        });

    function menuEffectItem(menuLinks, effectSpeed) {
        const effectTransition = `transition: transform ${effectSpeed}ms ease 0s;`;
        const effectHover = `transform: translate3d(0px, 0%, 0px);`;
        const effectTop = `transform: translate3d(0px, -100%, 0px);`;
        const effectBottom = `transform: translate3d(0px, 100%, 0px);`;

        menuLinks.forEach(menulink => {
            menulink.insertAdjacentHTML('beforeend', `
                <span style="transform: translate3d(0px, 100%, 0px);" class="hover">
                    <span style="transform: translate3d(0px, -100%, 0px);" class="hover__text">${menulink.textContent}</span>
                </span>
            `);

            menulink.onmouseenter = menulink.onmouseleave = menuLinkActions;
        });

        function menuLinkActions(e) {
            const menuLink = e.target;
            const menuLinkItem = menuLink.querySelector('.hover');
            const menuLinkText = menuLink.querySelector('.hover__text');
            const menuLinkHeight = menuLink.offsetHeight / 2;//получение половины высоты элемента
            const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);//получение позиции курсора при взаимодействии с элементом
    
            //при наведении курсора
            if (e.type === 'mouseenter') {
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;
                setTimeout(() => {
                    menuLinkItem.style.cssText = effectHover + effectTransition;
                    menuLinkText.style.cssText = effectHover + effectTransition;
                }, 5);
            }
    
                //при перемещении курсора
                if (e.type === 'mouseleave') {
                    menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                    menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
                }
            }        
        }
    }

} 
linkHover();

