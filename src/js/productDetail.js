import { products } from "./data.js";
import { customers } from "./data.js";

export function initProductDetail() {
    const productDetailReviewDiv = document.getElementById("productDetailReviewDiv");
    const suggestionsDiv = document.getElementById("suggestionsDiv");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const colorOptions = document.querySelectorAll(".color");
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');

    const productDetailReviews = customers.filter((review) => review.page === "productDetail");
    const suggestionsProducts = products.filter((product) => product.page === "suggestions");

    function displayReviews(reviewArr, container, useSwiper = false) {
        if (!container) return;

        reviewArr.forEach((customer) => {
            const slide = document.createElement("div");
            if (useSwiper) slide.classList.add("swiper-slide");
            slide.innerHTML = `
            <div class="customers__cards-item">
                <div class="customers__rating">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                </div>
                <div class="customers__name">
                <p>${customer.name}</p>
                <i class="fa-solid fa-circle-check" style="color: #01ab31;"></i>
                </div>
                <div class="customers__review">
                <p>${customer.review}</p>
                </div>
            </div>
            `;
            container.appendChild(slide);
        });
    }
    displayReviews(productDetailReviews, productDetailReviewDiv, false);

    function displayProducts(productsArray, container) {
        if (!container) return;
        productsArray.forEach((product) => {
            const oldPriceHTML = product.oldPrice
                ? `<div class="card__old-price"><p>$${product.oldPrice}</p></div>`
                : "";
            const discountHTML = product.discount
                ? `<div class="card__discount"><p>-${product.discount}%</p></div>`
                : "";

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
    if (suggestionsDiv) displayProducts(suggestionsProducts, suggestionsDiv);

    let swiperInstance = null;
    let originalCardsHTML = "";
    function makeResponsiveSwiper(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isMobile = window.innerWidth < 768;

        // Save original content only once
        if (!originalCardsHTML && container.innerHTML.trim()) {
            originalCardsHTML = container.innerHTML;
        }

        // If switching to desktop
        if (!isMobile && swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;

            container.classList.remove("swiper");
            container.innerHTML = originalCardsHTML; // put back original cards
            const slides = container.querySelectorAll(".swiper-slide");
            slides.forEach((slide) => slide.classList.remove("swiper-slide"));
            return;
        }

        // If mobile and not already initialized
        if (isMobile && !swiperInstance) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("swiper-wrapper");

            const cards = Array.from(container.children);
            cards.forEach((card) => {
                card.classList.add("swiper-slide");
                wrapper.appendChild(card);
            });

            container.innerHTML = "";
            container.classList.add("swiper");
            container.appendChild(wrapper);

            swiperInstance = new Swiper(container, {
                slidesPerView: 2,
                spaceBetween: 15,
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        makeResponsiveSwiper("suggestionsDiv");
    });
    window.addEventListener("resize", () => {
        makeResponsiveSwiper("suggestionsDiv");
    });

    sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sizeButtons.forEach((buttons) => {
                buttons.classList.remove("active");
                button.classList.add("active");
            });
        });
    });

    colorOptions.forEach((color) => {
        color.addEventListener("click", () => {
            colorOptions.forEach((colors) => {
                colors.classList.remove("color-selected");
                color.classList.add("color-selected");
            });
        });
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('selected'));
            thumb.classList.add('selected');
            mainImage.src = thumb.src;
        });
    });

    // ------------------------ GATHERING PRODUCT INFO FOR CART & LOCAL STORAGE

    let selectedSize = null;
    sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedSize = button.innerText.trim();
        });
    });

    let selectedColor = null;
        colorOptions.forEach((colorDiv) => {
        colorDiv.addEventListener("click", () => {
            selectedColor = colorDiv.dataset.color;
        });
    });

    let quantity = 1;
    const qtyDisplay = document.querySelector(".quantity-display");
    const plusBtn = document.querySelector(".plus-icon");
    const minusBtn = document.querySelector(".minus-icon");

    plusBtn.addEventListener("click", () => {
        quantity++;
        qtyDisplay.innerText = quantity;
    });

    minusBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            qtyDisplay.innerText = quantity;
        }
    });

    const addToCartBtn = document.querySelector("#addToCartBtn");
    addToCartBtn.addEventListener("click", () => {
        const cartItem = {
            id: 1, 
            name: "One Life Graphic T-shirt",
            image: "/src/assets/images/prodcut_details/shirt-front.svg",
            price: 260,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
        };

        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        cart.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(cart));
    });
    // ----------------------------- GATHERING PRODUCT INFO FOR CART & LOCAL STORAGE
}
