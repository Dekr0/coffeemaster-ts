import { removeFromCart } from "../services/Order.js";
import { InCartProduct } from "../services/Store.js";
import { once, queryGuard } from "./ComponentUtil.js";

const template = once(() => queryGuard(() => document.getElementById('cart-item-template') as HTMLTemplateElement));

export default class CartItem extends HTMLElement {

    constructor() {
        super();
    }   

    connectedCallback() {
        if (this.dataset.item) {
            const item: InCartProduct = JSON.parse(this.dataset.item);

            this.innerHTML = '';
            this.appendChild(template().content.cloneNode(true));

            queryGuard(() => this.querySelector('.qty')).textContent = `${item.qtn}x`;
            queryGuard(() => this.querySelector('.name')).textContent = item.name;
            queryGuard(() => this.querySelector('.price')).textContent = `$${item.price.toFixed(2)}`;
            queryGuard(() => this.querySelector('.delete-button') as HTMLButtonElement).
                addEventListener('click', () => removeFromCart(item.id));
        } else {
            throw new Error('This <cart-item> element does not contains a object of InCartProduct');
        }
      }
}
