let container = document.getElementById("container");  // контейнер де буде вся навігація
let hamburger = document.getElementById("hamburger");
let nav = document.getElementById("nav");
let line1 = document.getElementById("line1");
let line2 = document.getElementById("line2");
let line3 = document.getElementById("line3");
let header = document.getElementById("header");
let clicked = false;


hamburger.addEventListener("click", function () {
    if (container.children.length === 0) {    // якщо в контейнері немає дочірніх елементів -> меню не додано
        hamburgerToCross();      // тоді викликаю фунцію яка перетворює гамбургер на хрестик і відкриває меню
        clicked = true;                       // встановлюю значення true тобто меню відкрите
    } else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        crossToHamburger();
        clicked = false;
    }
});

//функція перетворення бургера в хрестик 
function hamburgerToCross() {
    nav.style.display = "flex";
    container.appendChild(nav);
    container.style.display = "block";
    nav.style.flexDirection = "column";
    nav.style.alignItems = "end";
    container.style.padding = "0 15%";
    line2.style.width = "0";
    line1.style.transform = "rotate(45deg)";
    line3.style.transform = "rotate(-45deg)";
    line1.style.position = "absolute";
    line3.style.position = "absolute";
    line1.style.top = "24px";  
    line3.style.bottom = "24px"; 
    hamburger.style.position = "relative";
}

// функція повернення хрестика в стан гамбургера
function crossToHamburger() {
    line3.style.position = "static";
    line1.style.position = "static";
    line2.style.transition = "0.4s";
    line1.style.transform = "rotate(0)";
    line3.style.transform = "rotate(0)";
    line2.style.width = "30px";
}

// функція для перевірки ширини екрана і адаптації меню
function checkScreenWidth() {
    let width = window.innerWidth;
    if (width > 1100) {                              // якщо ширина більша за 1100 пікселів
        header.appendChild(nav);                     // додаємо навігацію до заголовка (header)
        nav.style.display = "flex";
        nav.style.flexDirection = "row";
        nav.style.alignItems = "center";
        clicked = false;
        crossToHamburger();
    } else if (width <= 1100 && clicked !== true) {
        nav.style.display = "none";
    }
}

// додаю обробник подій для зміни розміру вікна
window.addEventListener("resize", checkScreenWidth);
