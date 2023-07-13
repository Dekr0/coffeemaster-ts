import { getProductById } from "../services/Menu";
import { addCartById } from "../services/Order";
import { once, queryGuard } from "./ComponentUtil";

const template = once(() => queryGuard(() => document.getElementById('details-page-template') as HTMLTemplateElement));

const prefetch = fetch('/styles/DetailsPage.css').
    then(r => r.text());

class DetailsPage extends HTMLElement {
    private root;

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const style = document.createElement('style');

        prefetch.
            then(css => {
                style.textContent = css;
                this.root.appendChild(style);

                const content = template().content.cloneNode(true);
                this.root.appendChild(content);

                return new Promise((hasProductId: (productId: number) => void, reject) => {
                    if (this.dataset.productId) {
                        if (isNaN(Number(this.dataset.productId))) reject();
                        hasProductId(parseInt(this.dataset.productId));
                    }
                });
        }).
            then(productId => getProductById(productId)).
            then(product => {
                    queryGuard(() => this.root.querySelector('h2')).
                        textContent = product.name;

                    queryGuard(() => this.root.querySelector('img')).
                        src = `/data/images/${product.image}`;

                    queryGuard(() => this.root.querySelector('.description')).
                        textContent = product.description;

                    queryGuard(() => this.root.querySelector('.price')).
                        textContent = `$ ${product.price.toFixed(2)} ea`;

                    queryGuard(() => this.root.querySelector('button')).
                        addEventListener('click', () => {
                            addCartById(product.id);
                            window.app.router.go('/order');
                    })
        }).
            catch(e => console.log(e));
    }
}

export default DetailsPage;
