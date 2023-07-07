import API from "./services/API";
import Router from "./services/Router";
import store from "./services/Store";

import DetailPages from "./components/DetailPage";
import MenuPage from "./components/MenuPage";
import OrderPage from "./components/OrderPage";
import ProductItem from "./components/ProductItem";

customElements.define('menu-page', MenuPage);
customElements.define('order-page', OrderPage);
customElements.define('details-page', DetailPages);
customElements.define("product-item", ProductItem);

// An dependency is created => whenever a state change, code that need access to 
// the app state require `window.app` => refactor ? not necessary => adding 
// abstraction create complexity 
window.app = {
    store : store,
    router: Router
};

document.addEventListener('DOMContentLoaded', () => {
    window.app.router.init();  // Init the router
});
