import("./common.js").then(module => module.initCommon());
const page = document.body.dataset.page;

switch (page) {
  case "home":
    import("./home.js").then(module => module.initHome());
    break;
  case "productDetail":
    import("./productDetail.js").then(module => module.initProductDetail());
    break;
  case "auth":
    import("./auth.js").then(module => module.initAuth());
    break;
  case "categories":
    import("./categories.js").then(module => module.initCategories());
    break;
  case "cart":
    import("./cart.js").then(module => module.initCart());
}