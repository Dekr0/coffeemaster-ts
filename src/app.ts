import Router from "./services/Router";
import store from "./services/Store";

import MenuPage from "./components/MenuPage";
import OrderPage from "./components/OrderPage";
import ProductItem from "./components/ProductItem";
import CartItem from "./components/CartItem";
import DetailsPage from "./components/DetailsPage";

customElements.define('menu-page', MenuPage);
customElements.define('order-page', OrderPage);
customElements.define('details-page', DetailsPage);
customElements.define('product-item', ProductItem);
customElements.define('cart-item', CartItem);

// An dependency is created => whenever a state change, code that need access to 
// the app state require `window.app` => refactor ? not necessary => adding 
// abstraction create complexity 
window.app = {
    store : store,
    router: Router
};

let badge: HTMLSpanElement | null;

window.addEventListener('DOMContentLoaded', () => {
    window.app.router.init();  // Init the router
    badge = document.getElementById('badge') as HTMLSpanElement;
});

window.addEventListener('cartchange', () => {
    if (badge !== null) {
        if (window.app.store.cart.length !== 0) {
            badge.hidden = false;
            const qtn = window.app.store.cart.reduce(
                (t, p) => {
                    if (p.qtn) return p.qtn + t;
                    return 0;
                }, 0
            )
            badge.textContent = String(qtn);
        } else {
            badge.hidden = true;
        }
    } else {
        throw new Error('Badge counter is not available for cart icon');
    }
});

