export function initCommon(){
// turn off header announcement
    const headerAnnouncement = document.querySelector(".header__announcement");
    const closeBtn = document.getElementById("closeButton");
    const openBurgerMenu = document.querySelector(".burger-menu");
    const closeBurgerMenu = document.querySelector(".close-burger-menu");
    const mobileMenu = document.querySelector(".header__nav-mobile");

    if(closeBtn && headerAnnouncement) {
        closeBtn.addEventListener("click", () => {
            headerAnnouncement.classList.add("dissapear");
        });
    }

    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            sizeButtons.forEach(buttons => {
                buttons.classList.remove("active");
                button.classList.add("active");
            })
        })
    })

    openBurgerMenu.addEventListener("click", () => {
        mobileMenu.classList.add("appear");
    })

    closeBurgerMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("appear");
    })
}