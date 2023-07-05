// Refactor for generic web component ?
class MenuPage extends HTMLElement {
    private root;

    private async loadCSS() {
        const request = await fetch('/styles/MenuPage.css');
        return await request.text();
    }

    constructor() {
        super();

        console.log('Creating an instance of MenuPage');
        this.root = this.attachShadow({ mode: 'open' });

        window.addEventListener('menuchange', () => {
            console.log('Firing menuchange');
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

        const template = document.getElementById('menu-page-template') as HTMLTemplateElement;
        const content = template.content.cloneNode(true);

        console.log('Attaching to Shadow');

        this.root.appendChild(content);
    }
    
    render() {
        const menu = this.root.getElementById('menu') as HTMLUListElement;
        if (window.app.store && window.app.store.menu !== null) { 
            window.app.store.menu.forEach(category => {
                if (menu !== null) {
                    const liCategory = document.createElement('li');
                    liCategory.innerHTML = `
                        <h3>${category.name}$</h3>
                        <ul class='category'>
                        </ul>
                    `;
                    menu.appendChild(liCategory);
                }
            })
        } else if (window.app.store.menu !== null) {
            menu.innerHTML = "Loading...";
        }
    }
}

export default MenuPage;
