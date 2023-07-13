import { once, queryGuard } from "./ComponentUtil";

const template = once(() => queryGuard(() => document.getElementById('order-form-template') as HTMLTemplateElement));

const prefetch = fetch('/styles/OrderPage.css').
    then(r => r.text());

export default class OrderPage extends HTMLElement {
    private root;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const section = document.createElement('section');
        this.root.append(section);

        const style = document.createElement('style');

        window.addEventListener('cartchange', () => {
            this.render();
        });

        prefetch.
            then(css => {
                style.textContent = css;
                this.root.appendChild(style);

                const content = template().content.cloneNode(true);
                this.root.appendChild(content);

                this.render();
        });
    }

    private render() {
       queryGuard(() => this.root.querySelector('section')).
           innerHTML = window.app.store.cart.length === 0 ? 
            `
                <p class="empty">Your order is empty</p>
            ` :
            `
                <h2>Your Order</h2>
                <ul>
                </ul>
            `;

       if (window.app.store.cart.length === 0) return;
        
       const ul = queryGuard(() => this.root.querySelector('ul'));

       let total = 0;
       for (const coffeeInCart of window.app.store.cart) {
           const cartItem = document.createElement('cart-item');

           cartItem.dataset.item = JSON.stringify(coffeeInCart);

           ul.appendChild(cartItem);

           total += coffeeInCart.qtn * coffeeInCart.price;
       }

       ul.innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>
       `;
    }
}
