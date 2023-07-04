// let template = `<section>
//     <h2>This is the menu</h2>
//     <ul id="menu"></ul>
// </section>`;  // store template contents in a JS variable / prefetch from a HTML file / even Babel

// Refactor for generic web component ?
class MenuPage extends HTMLElement {
    private root;

    private async loadCSS() {
        const request = await fetch('/styles/MenuPage.css');
        return await request.text();
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        // refactor
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        this.loadCSS().then((css) => {
            styles.textContent = css;
        })

        // Since using Shadow DOM, append children into the root of Shadow DOM per instance of  a web component
        const template = document.getElementById('menu-page-template') as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
    }

    // when the component is attached to the DOM
    //connectedCallback() {
    //    // Without Shadow DOM, the process of injecting web component must be (?) inside of connectedCallback()
    //    // because the rule (spec ?) specify web component cannot append children after constructor
    //    const template = document.getElementById('menu-page-template') as HTMLTemplateElement;
    //    const content = template.content.cloneNode(true);
    //    this.appendChild(content);
    //}
}

export default MenuPage;
