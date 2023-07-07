import API from "./API";
import { Coffee } from "./Store";

export async function getProductById(id: number): Promise<Coffee | null> {
    if (window.app.store.menu === null) window.app.store.menu = await API.fetchMenu();
    
    for (let category of window.app.store.menu) {
        for (let product of category.products) {
            if (product.id === id) return product;
        }
    }

    return null;
}
