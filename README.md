1) ВЫПАДАЮЩЕЕ МЕНЮ dropdown
- https://ivan1986mrpl.github.io/ui-components/dropdown/ 
- работает по клику, а не по ховеру
- по клику на пункты верхнего меню открывать дропдаун
- по клику (повторному) на эти пункты - закрывать дропдаун
- по клику в любое место сайта, кроме меню - закрывать дропдаун

2) ТАЙМЕР ОБРАТНОГО ОТСЧЕТА countdown timer
- https://ivan1986mrpl.github.io/ui-components/countdown/
- таймер ведет расчет в секундах
- если не переданы дни или число дней осталось меньше 0, блок с днями убирается из таймера
- когда таймер заканчивается, выводится  сообщение, которое передается третьим аргументом при вызове
- работает с двумя вариантами передачи конечной даты  
Если передано число — считаем его количеством секунд.
Если передано строка (например, дата в формате '27 Jan 2025 12:30') — конвертируем её в объект Date и вычисляем разницу в секундах от текущего времени.
