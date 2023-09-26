import { menuArray } from "./data.js";

const card = document.getElementById("card");
const consentForm = document.getElementById("consent-form");
const ticket = document.getElementById("ticket");
const main = document.getElementById("main");
let facture = [];
let totalPrice = 0;



document.addEventListener("click", function (e) {
  if (e.target.dataset.quantity) {
    let snackObj = addToTicket(e.target.dataset.quantity);
    facture.push(`
         <div class="order">
            <p class="item-name">${snackObj.name}</p>
             <p class="remove">remove</p>
             <p class="prix">$${snackObj.price}</p>
         </div>`);
    totalPrice += snackObj.price;
    render();
  }
  if (e.target.classList.contains("remove")) {
    removeItem(e.target.parentElement);
  }
});

function removeItem(itemElement) {
  // Retrieve the item's price from the DOM
  const price = parseFloat(itemElement.querySelector(".prix").textContent.slice(1));
  
  // Remove the item from the facture array
  const itemName = itemElement.querySelector(".item-name").textContent;
  const itemIndex = facture.findIndex(item => item.includes(itemName));
  facture.splice(itemIndex, 1);
  
  // Update the total price
  totalPrice -= price;
  
  // Remove the item from the DOM
  itemElement.remove();
  
  // Render the updated cart
  render();
}

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

consentForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const consentFormData = new FormData(consentForm)
  const name = consentFormData.get('name')
  card.style.display = "none"
  ticket.innerHTML = `<p class="order-completed">Thanks, ${name} Your order is on its way!</p>`
});