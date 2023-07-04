class DetailPages extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const template = document.getElementById('details-page-template') as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.appendChild(content);
    }
}

export default DetailPages;
