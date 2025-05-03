import { products } from "./data.js";

export function initCategories() {
  const categoriesDiv = document.getElementById("categoriesDiv");
  const categoryProducts = products.filter(product => product.page === "categories")
  const colorOptions = document.querySelectorAll(".color");

  function displayProducts(productsArray, container) {
    if (!container) return; // 
    productsArray.forEach(product => {
      const oldPriceHTML = product.oldPrice ? `<div class="card__old-price"><p>$${product.oldPrice}</p></div>` : "";
      const discountHTML = product.discount ? `<div class="card__discount"><p>-${product.discount}%</p></div>` : "";

      container.innerHTML += ` 
            <div class="card">
              <a href="/product.html"><img src="${product.image}" alt="${product.name}"></a>
              <div class="card__title"><h3>${product.name}</h3></div>
              <div class="card__rating">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
                <p>${product.currentRating}/<span>${product.maxRating}</span></p>
              </div>
              <div class="card__price">
                <div class="card__price-current"><p>$${product.currentPrice}</p></div>
                ${oldPriceHTML}
                ${discountHTML}
              </div>
            </div>
          `;
    });
  }

  if (categoriesDiv) displayProducts(categoryProducts, categoriesDiv);

  const filterBtn = document.querySelector('.filter-toggle');
  const filterSidebar = document.querySelector('.filter');
  const filterClose = document.querySelector('#filterClose');

  filterBtn.addEventListener('click', () => {
    filterSidebar.classList.add('active');
  });
  filterClose.addEventListener('click', () => {
    filterSidebar.classList.remove('active')
  })

  const minRange = document.getElementById("min-range");
  const maxRange = document.getElementById("max-range");
  const minPrice = document.getElementById("min-price");
  const maxPrice = document.getElementById("max-price");

  function updatePrices() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if (minVal > maxVal - 10) {
      minVal = maxVal - 10;
      minRange.value = minVal;
    }

    if (maxVal < minVal + 10) {
      maxVal = minVal + 10;
      maxRange.value = maxVal;
    }

    minPrice.textContent = `$${minVal}`;
    maxPrice.textContent = `$${maxVal}`;
  }

  minRange.addEventListener("input", updatePrices);
  maxRange.addEventListener("input", updatePrices);

  colorOptions.forEach((color) => {
    color.addEventListener("click", () => {
        colorOptions.forEach((colors) => {
            colors.classList.remove("color-selected");
            color.classList.add("color-selected");
        });
    });
  });
}