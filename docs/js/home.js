import { products } from "./data.js";
import { customers } from "./data.js";

export function initHome() {
    const productsDiv = document.getElementById("productsDiv");
    const topSellersDiv = document.getElementById("topSellersDiv"); 

    const newProducts = products.filter(product => product.page === "new")
    const topSellingProducts = products.filter(product => product.page === "top")
   
    function displayProducts(productsArray, container) {
        if (!container) return; // 
        productsArray.forEach(product => {
          const oldPriceHTML = product.oldPrice ? `<div class="card__old-price"><p>$${product.oldPrice}</p></div>` : "";
          const discountHTML = product.discount ? `<div class="card__discount"><p>-${product.discount}%</p></div>` : ""; 
          
          container.innerHTML += ` 
            <div class="card">
              <a href="product.html"><img src="${product.image}" alt="${product.name}"></a>
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
   
    if (productsDiv) displayProducts(newProducts, productsDiv);
    if (topSellersDiv) displayProducts(topSellingProducts, topSellersDiv);

   
    function makeResponsiveSwiper(containerId) {
        const container = document.getElementById(containerId);
        if (window.innerWidth < 768 && container && !container.classList.contains("swiper")) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("swiper-wrapper");
    
        const cards = Array.from(container.children);
        cards.forEach(card => {
            card.classList.add("swiper-slide");
            wrapper.appendChild(card);
        });
    
        container.innerHTML = ""; // clear old cards
        container.classList.add("swiper");
        container.appendChild(wrapper);
    
        new Swiper(`#${containerId}`, {
            slidesPerView: 2,
            spaceBetween: 15,
        });
        }
    }
    
    makeResponsiveSwiper("productsDiv");
    makeResponsiveSwiper("topSellersDiv");

    // --------------------- DISPLAY CUSTOMER REVIEWS
    const customersWrapper = document.getElementById("customersWrapper");
    const productDetailReviewDiv = document.getElementById("productDetailReviewDiv");

    const homePageReviews = customers.filter(review => review.page === "home");
    const productDetailReviews = customers.filter(review => review.page === "productDetail");


    function displayReviews(reviewArr, container, useSwiper =  false) {
    if (!container) return;
    
    reviewArr.forEach(customer => {
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

    displayReviews(homePageReviews, customersWrapper, true);
    displayReviews(productDetailReviews, productDetailReviewDiv, false);

    // -------------------- SWIPERS
    const swiper = new Swiper('.customers-swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
        nextEl: '#swiperNext',
        prevEl: '#swiperPrev',
        },
        breakpoints: {
            768: {
            slidesPerView: 2,
            },
            1024: {
            slidesPerView: 3,
            },
            0: {
            slidesPerView: 1,
            }
        }
    });

    const brandSwiper = new Swiper('.hero__brands', {
        loop: true,
        autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        },
        slidesPerView: 5,
        spaceBetween: 20,
        breakpoints: {
            1024: {
                slidesPerView: 5,
            },
            320: {
                slidesPerView: 1,
            }
        }
    });
}