let cart = {};

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".item");
    const id = item.dataset.id;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = { name, price, quantity: 1 };
    }

    updateCartDisplay();
  });
});

document.getElementById("open-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "block";
  updateCartDisplay();
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

window.addEventListener("click", event => {
  const modal = document.getElementById("cart-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <input type="number" min="1" value="${item.quantity}" data-id="${id}" />
      <span>${itemTotal} ₴</span>
      <button class="remove-item" data-id="${id}">✖</button>
    `;
    cartItemsDiv.appendChild(div);
  }

  document.getElementById("total").textContent = total;

  document.querySelectorAll(".cart-item input").forEach(input => {
    input.addEventListener("change", e => {
      const id = e.target.dataset.id;
      const qty = parseInt(e.target.value);
      if (qty <= 0) {
        delete cart[id];
      } else {
        cart[id].quantity = qty;
      }
      updateCartDisplay();
    });
  });

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      delete cart[id];
      updateCartDisplay();
    });
  });
}
