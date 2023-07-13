import { once, queryGuard } from "./ComponentUtil";

const template = once(() => queryGuard(() => document.getElementById('menu-page-template') as HTMLTemplateElement));

const prefetch = fetch('/styles/MenuPage.css').
    then(r => r.text());

class MenuPage extends HTMLElement {
    private root;
    private getMenu;
    private menuTag: HTMLUListElement | undefined;  // caching

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        this.getMenu = once(() => queryGuard(() => this.root.getElementById('menu') as HTMLUListElement));
        this.menuTag = undefined;

        window.addEventListener('menuchange', () => {
            this.render();
        });
    }

    connectedCallback() {
        // refactor
        const style = document.createElement('style');
        
        prefetch.then(
            css => {
                style.textContent = css;
                this.root.appendChild(style);

                const content = template().content.cloneNode(true);
                this.root.appendChild(content);
                this.render();
            }
        );
    }

    render() {
        if (!this.menuTag)
            this.menuTag = this.getMenu();

        if (window.app.store.menu !== null) {
            this.menuTag.innerHTML = '';

            for (const category of window.app.store.menu) {
                const liCategory = document.createElement('li');
                const ulProduct = document.createElement('ul');
                ulProduct.id = 'category';
                liCategory.innerHTML = `<h3>${category.name}</h3>`;
                liCategory.appendChild(ulProduct);
                this.menuTag.appendChild(liCategory);

                for (const product of category.products) {
                    const productItem = document.createElement('product-item');
                    productItem.dataset.product = JSON.stringify(product);  // pass down props in JSON string through dataset
                    ulProduct.appendChild(productItem);
                }
            }
        } else {
            this.menuTag.innerHTML = 'Loading...';
        }
    }
}

export default MenuPage;
