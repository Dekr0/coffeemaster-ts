class OrderPage extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const template = document.getElementById('order-form-template') as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.appendChild(content);
    }
}

export default OrderPage;
