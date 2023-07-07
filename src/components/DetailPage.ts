import { getProductById } from "../services/Menu";
import { Coffee } from "../services/Store";

const _template: HTMLTemplateElement | null = document.getElementById('details-page-template') as HTMLTemplateElement;

class DetailPages extends HTMLElement {
    private root;

    private product: Coffee | undefined;

    constructor() {
        super();
        
        this.root = this.attachShadow({ mode: 'open' });

        this.product = undefined;
    }
    
    connectedCallback() {
        if (_template !== null) {
            const content = _template.content.cloneNode(true);
            const style = document.createElement('style');
            this.root.appendChild(style);
            fetch('/styles/DetailsPage.css').
                then(response => response.text()).
                then(text => { style.textContent = text });
            this.root.appendChild(content);

            if (this.dataset.productId) {
                getProductById(parseInt(this.dataset.productId)).
                    then(product => {
                    if (product !== null) {
                        this.product = product;
                         const name = this.root.querySelector('h2');
                         if (name !== null) name.textContent = this.product.name;

                         const img = this.root.querySelector('img');
                         if (img !== null) img.src = `/data/images/${this.product.image}`;

                         const descr = this.root.querySelector('.description');
                         if (descr) descr.textContent = this.product.description;

                         const price = this.root.querySelector('.price');
                         if (price) price.textContent = `$ ${this.product.price.toFixed(2)} ea`;

                         this.root.querySelector('button')?.addEventListener('click', () => {
                             window.app.router.go('/order');
                         });
                    } else {
                        alert('Invalid Product ID');
                    }
                })
            }
        } else {
            throw new Error('Template for <details-page> is not available');
        }
    }
}

export default DetailPages;
