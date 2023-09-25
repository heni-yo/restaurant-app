import { menuArray } from "./data.js";

const card = document.getElementById("card");
const payBtn = document.getElementById("pay-btn");
const ticket = document.getElementById("ticket");
const main = document.getElementById("main");
let facture = [];
let totalPrice = 0;

payBtn.addEventListener("click", () => {
  card.style.display = "none";
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.quantity) {
    let snackObj = addToTicket(e.target.dataset.quantity);
    facture.push(`
         <div class="order">
            <p class="item-name">${snackObj.name}</p>
             <p class="remove" id="remove${facture.length}">remove</p>
             <p class="prix">$${snackObj.price}</p>
         </div>`);
    totalPrice += snackObj.price;
    console.log(facture)
    render();
}
    // document
    // .getElementById(`remove${facture.length}`)
    // .addEventListener("click", ()=>{
    //     console.log("hhgh")
    // });

});

// function remover() {
//     //   facture.splice(num - 1, 1);
//       console.log("hhh");
//     //   render();
//     }

function render() {
  ticket.innerHTML = `<p id="title">Your order</p>
    ${facture.join("")}
    <hr>
    <div class="order">
    <p class="item-name">Total price:</p>
    <p class="prix">$${totalPrice}</p>
    </div>
    <button id="complete-order">Complete order</button>`;
  document
    .getElementById("complete-order")
    .addEventListener("click", () => (card.style.display = "inline"));
}

function addToTicket(id) {
  const targetSnackObj = menuArray.filter((snack) => snack.id == id)[0];
  return targetSnackObj;
}

const menu = menuArray
  .map(({ name, ingredients, id, price, emoji }) => {
    return `
    <div class="element">  
    <p class="emoji">${emoji}</p>
    <p class="div-element item-name">${name}</p>
    <p class="div-element item-ingredients">${ingredients.join(" ")}</p>
    <p class="div-element item-price">$${price}</p>
    <i class="fa-solid fa-plus" data-quantity="${id}"></i>
    </div>`;
  })
  .join("");
main.innerHTML = menu;
