import { Coffee } from '../services/Store';

export default class ProductItem extends HTMLElement {
    private template: null | HTMLTemplateElement;

    constructor() {
        super();    

        this.template = document.getElementById("product-item-template") as HTMLTemplateElement;
    }   

    connectedCallback() {
        if (this.template !== null) {
            const content = this.template.content.cloneNode(true);
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

                    event.preventDefault();
                });
            }
        }

        this.querySelector("a").addEventListener("click", event => {
            console.log(event.target.tagName);
            if (event.target.tagName.toLowerCase()=="button") {
                //TODO
            } else {
                app.router.go(`/product-${product.id}`);
            }
            event.preventDefault();
        })
      }
}

customElements.define("product-item", ProductItem);
