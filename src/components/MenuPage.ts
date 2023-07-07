// Refactor for generic web component ?
const _template: HTMLTemplateElement | null = document.getElementById('menu-page-template') as HTMLTemplateElement;

class MenuPage extends HTMLElement {
    private root;
    private menuTag: HTMLUListElement | null | undefined;  // caching

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.menuTag = undefined;

        window.addEventListener('menuchange', () => {
            this.render();
        });
    }

    connectedCallback() {
        // refactor
        const styles = document.createElement('style');
        this.root.appendChild(styles);

        fetch('/styles/MenuPage.css').
            then(response => response.text()).
            then(css => { styles.textContent = css });

        if (_template !== null) {
            const content = _template.content.cloneNode(true);
            this.root.appendChild(content);
        } else {
            throw new Error('Template for <menu-page> is not available');
        }
    }

    render() {
        if (!this.menuTag) {
            this.menuTag = this.root.getElementById('menu') as HTMLUListElement;
        }

        if (this.menuTag !== null) {
            if (window.app.store && window.app.store.menu !== null) {
                this.menuTag.innerHTML = '';

                for (const category of window.app.store.menu) {
                    const liCategory = document.createElement('li');
                    const ulProduct = document.createElement('ul');
                    ulProduct.id = 'category';
                    liCategory.innerHTML = `<h3>${category.name}</h3>`;
                    liCategory.appendChild(ulProduct);
                    this.menuTag.appendChild(liCategory);

                    for (const product of category.products) {
                        const item = document.createElement("product-item");
                        item.dataset.product = JSON.stringify(product);  // pass down props in JSON string through dataset
                        ulProduct.appendChild(item);
                    }
                }
            } else if (window.app.store) {
               this.menuTag.innerHTML = 'Loading...';
            }
        }
    }
}

export default MenuPage;
