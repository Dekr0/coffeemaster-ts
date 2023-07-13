import API from "./API";

export async function getProductById(id: number) {
    if (window.app.store.menu === null) 
        window.app.store.menu = await API.fetchMenu();
    
    for (const category of window.app.store.menu) {
        for (const product of category.products) {
            if (product.id === id) return product;
        }
    }

    throw new Error(`Product with ${id} is not in the store menu`);
}
