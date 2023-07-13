import { addCartById } from '../services/Order'; 
import { Product } from '../services/Store';
import { once, queryGuard } from './ComponentUtil';

const template = once(() => queryGuard(() => document.getElementById('product-item-template') as HTMLTemplateElement));

export default class ProductItem extends HTMLElement {

    constructor() {
        super();    
    }   

    connectedCallback() {
            const content = template().content.cloneNode(true);
            this.appendChild(content);
            if (this.dataset.product !== undefined) {
                const product: Product = JSON.parse(this.dataset.product);

                queryGuard(() => this.querySelector('h4')).
                    textContent = product.name;

                queryGuard(() => this.querySelector('p.price')).
                    textContent = `$${product.price.toFixed(2)}`;

                queryGuard(() => this.querySelector('img')).
                    src = `data/images/${product.image}`;

                queryGuard(() => this.querySelector('a')).
                    addEventListener('click', event => {
                    if (event.target !== null && event.target instanceof Element) {
                        if (event.target.tagName.toLowerCase() === 'button') {
                            addCartById(product.id);
                        } else {
                            window.app.router.go(`/product-${product.id}`);
                        }
                    }

                    event.preventDefault();
                });
            }
    }
}
