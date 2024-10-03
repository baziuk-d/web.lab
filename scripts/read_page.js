class destination {
    constructor(id, image, name, description, price, last_updated) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
        this.last_updated = last_updated;
    }

}

const destination1 = new destination(
    "1",
    "../assets/paris.jpeg",
    "Paris",
    "Париж, столиця Франції, відомий своєю багатою історією та культурною спадщиною. Місто славиться Лувром, Ейфелевою вежею і собором Нотр-Дам, а також чарівними парками і бульварами, що запрошують на прогулянки.",
    1000,
    0)

const destination2 = new destination(
    "2",
    "../assets/new_york.jpeg", 
    "New York", 
    "Нью-Йорк — одне з найбільших міст США, відоме своєю динамічною атмосферою, культурним різноманіттям і архітектурними пам'ятками. Місто є домом для Статуї Свободи, Центрального парку і Бродвею.", 
    1100, 
    0)

const destination3 = new destination(
    "3", 
    "../assets/rome.jpeg", 
    "Rome", 
    "Рим є столицею Італії і важливим центром античної історії. Тут можна побачити численні архітектурні шедеври, такі як Колізей, Пантеон та Ватикан, а також насолодитися смачною італійською кухнею, що приваблює туристів.", 
    800, 
    0)

let data_array = [destination1, destination2, destination3];

window.addEventListener("load", () => showElements(data_array));


function showElements(data_array) {
    for (let i in data_array) {
        const temp_container = document.getElementById("item-storage");
        const template = document.getElementById("item");
        const clone = template.content.cloneNode(true);
        const id = clone.querySelector("#id");
        id.innerText = data_array[i].id;
        const img = clone.querySelector("#item-image");
        img.src = data_array[i].image;
        const name = clone.querySelector("div.item-info > h1");
        name.innerText = data_array[i].name;
        const description = clone.querySelector("#description-item");
        description.innerText = data_array[i].description;
        const price = clone.querySelector("#price");
        price.innerText = data_array[i].price;
        const last_updated = clone.querySelector("#item-updated-at");
        last_updated.innerText = data_array[i].last_updated;
        temp_container.appendChild(clone);
    }
}

function deleteElement(elem) {
    let element = elem.parentNode.parentNode.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    const obj_to_delete = data_array.find(destination => destination.id === id);
    data_array.splice(data_array.indexOf(obj_to_delete), 1);
    element.remove();
}

function search(input){
    let textInput = input.parentNode.parentNode.querySelector("#input_search").value.trim().toLowerCase();
    const destinations = data_array.filter(destination => destination.name.toLowerCase() === textInput);
    clearScreen();
    showElements(destinations);

    if (textInput === "") {
        clearScreen(); 
        showElements(data_array); 
        return;
    }
}


function countPrice(){
    const items = document.querySelectorAll(".item");
    let sum = 0;
    for (const item of items) {
        let price = item.querySelector("#price").innerText;
        sum += price/1;
    }
    sum += "$";
    document.querySelector("#total_price").innerText = sum;
}

function sortBy(sort_value){
    const data = backToObject();

    if (sort_value === "name (A-Z)"){
        data.sort( (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    else if (sort_value === "name (Z-A)"){
        data.sort( (a, b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0));
    }
    else if (sort_value === "price (0-99+)"){
        data.sort( (a, b) => a.price - b.price);
    }
    else if (sort_value === "price (99+-0)"){
        data.sort( (a, b) => b.price - a.price);
    }
    clearScreen();
    showElements(data);
}

function clearScreen(){
    let elements = document.querySelectorAll(".item");
    for (let i of elements){
        console.log(i);
        console.log(elements);
        i.remove();
    }
}

function backToObject(){
    const items = document.querySelectorAll(".item");
    const item_list = [];
    for (let item of items){
        let id = item.querySelector("#id").innerText / 1;
        let name = item.querySelector("#name-item").innerText;
        let image = item.querySelector("#item-image").src;
        const description = item.querySelector("#description-item").innerText;
        const price = item.querySelector("#price").innerText / 1;
        const last_updated = item.querySelector("#item-updated-at").innerText;
        const object = new destination(id, image, name, description, price, last_updated);
        item_list.push(object);
    }
    return item_list;
}