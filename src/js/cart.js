export function initCart() {
  // ------------------- UPDATING CART FROM LOCALSTORAGE
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartContainer = document.querySelector(".cart-items");

  function renderCart() {
      cartContainer.innerHTML = ""; // Clear previous items
      if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>'
      }
      cartItems.forEach((item, index) => {
        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card");
        cartCard.innerHTML = `
          <div class="cart-card-info">                            
            <div class="cart-card-product">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-card-product__text">
                <p>${item.name}</p>
                <div class="cart-card-product__text-features">
                  <p>Size: <span>${item.size}</span></p>
                  <p>Color: <span>${item.color}</span></p>
                </div>
                <div class="cart-card-product-price">
                  <p>$${item.price}</p>
                </div>
              </div>
            </div>
    
            <div class="cart-card-functions">
              <div class="delete" data-index="${index}">
                <i class="delete-cart-icon fa-solid fa-trash-can"></i>
              </div>
              <div class="quantity">
                <i class="fa-solid fa-minus" data-index="${index}"></i>
                <p>${item.quantity}</p>
                <i class="fa-solid fa-plus" data-index="${index}"></i>
              </div>
            </div>
          </div>
        `;
        cartContainer.appendChild(cartCard);
      });
  }
  renderCart();
  
  cartContainer.addEventListener("click", function (e) {
    if (e.target.closest(".delete")) {
      const index = e.target.closest(".delete").dataset.index;
      cartItems.splice(index, 1); // remove item
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // update storage
      renderCart(); // re-render UI
    }
  });

  cartContainer.addEventListener("click", function (e) {
    const plusBtn = e.target.closest(".fa-plus");
    const minusBtn = e.target.closest(".fa-minus");
  
    if (plusBtn) {
      const index = plusBtn.dataset.index;
      cartItems[index].quantity += 1;
    }
  
    if (minusBtn) {
      const index = minusBtn.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      }
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  });


  // ----------------- PROMO CODE LOGIC
  const totalPriceEl = document.querySelector(".price-total");
  const promoCodeInput = document.querySelector(".promo-input");
  const promoCodeButton = document.querySelector(".promo-button");
  let promoApplied = false;

  promoCodeButton.addEventListener("click", () => {
    if (promoApplied) return;
    
    if (promoCodeInput.value === "saba") {
      const currentPrice = parseFloat(totalPriceEl.innerText.replace(/\D/g, ''));
      const discountedPrice = currentPrice * 0.8;
      totalPriceEl.innerHTML = `${discountedPrice}`
      promoApplied = true;
    } 
  })
}