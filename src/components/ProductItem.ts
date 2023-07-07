import { Coffee } from '../services/Store';

const _template: HTMLTemplateElement | null = document.getElementById("product-item-template") as HTMLTemplateElement;  // caching

export default class ProductItem extends HTMLElement {

    constructor() {
        super();    
    }   

    connectedCallback() {
        if (_template !== null) {
            const content = _template.content.cloneNode(true);
            this.appendChild(content);
            if (this.dataset.product !== undefined) {
                const product: Coffee = JSON.parse(this.dataset.product);

                const name = this.querySelector('h4');
                if (name !== null) name.textContent = product.name;

                const price = this.querySelector('p.price');
                if (price !== null) price.textContent = `$${product.price.toFixed(2)}`;

                const img = this.querySelector('img');
                if (img !== null) img.src = `data/images/${product.image}`;

                const a = this.querySelector('a');
                if (a !== null) a.addEventListener('click', event => {
                    if (event.target !== null && event.target instanceof Element) {
                        if (event.target.tagName.toLowerCase() === 'button') {

                        } else {
                            window.app.router.go(`/product-${product.id}`);
                        }
                    }

                    event.preventDefault();
                });
            }
        } else {
            throw new Error('Template for <product-item> is not available');
        }
    }
}
