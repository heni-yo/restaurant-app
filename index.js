import { menuArray } from "./data.js"

const card = document.getElementById("card")
const completeOrderBtn = document.getElementById("complete-order")
const payBtn = document.getElementById("pay-btn")
const main = document.getElementById("main")

completeOrderBtn.addEventListener('click', ()=>card.style.display = "inline")
payBtn.addEventListener("click", ()=>{card.style.display = "none"})

const menu = menuArray.map(({name, ingredients, id, price, emoji})=>{
    return `
    <div class="element">  
        <p class="emoji">${emoji}</p>
        <p class="div-element item-name">${name}</p>
        <p class="div-element item-ingredients">${ingredients.join(" ")}</p>
        <p class="div-element item-price">${price}</p>
        <i class="fa-solid fa-plus" data-quantity="${id}"></i>
    </div>`
}).join("")

main.innerHTML = menu

