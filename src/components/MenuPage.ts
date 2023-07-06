// Refactor for generic web component ?
class MenuPage extends HTMLElement {
    private root;
    private template;  // caching
    private menu: HTMLUListElement | null;  // caching

    private async loadCSS() {
        const request = await fetch('/styles/MenuPage.css');
        return await request.text();
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.template = document.getElementById('menu-page-template') as HTMLTemplateElement;
        this.menu = null;

        window.addEventListener('menuchange', () => {
            this.render();
        });
    }

    connectedCallback() {
        // refactor
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        this.loadCSS().then((css) => {
            styles.textContent = css;
        })

        const content = this.template.content.cloneNode(true);
        this.root.appendChild(content);
    }

    render() {
        if (this.menu === null) {
            this.menu = this.root.getElementById('menu') as HTMLUListElement;
        }
        if (this.menu !== null) {
            if (window.app.store && window.app.store.menu !== null) {
                this.menu.innerHTML = '';
                for (const category of window.app.store.menu) {
                    const liCategory = document.createElement('li');
                    const ulProduct = document.createElement('ul');
                    ulProduct.id = 'category';
                    liCategory.innerHTML = `<h3>${category.name}</h3>`;
                    liCategory.appendChild(ulProduct);
                    this.menu.appendChild(liCategory);

                    for (const product of category.products) {
                        const item = document.createElement("product-item");
                        item.dataset.product = JSON.stringify(product);
                        ulProduct.appendChild(item);
                    }
                }
            } else if (window.app.store) {
               this.menu.innerHTML = 'Loading...';
            }
        }
    }
}

export default MenuPage;
