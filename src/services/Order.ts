import { getProductById } from '../services/Menu';
import { InCartProduct } from './Store';

export function addCartById(id: number) {
    getProductById(id).then(product => {
        if (product !== null) {
            // Check whether if the product being added is already in the cart
            const result = window.app.store.cart.filter(
                p => product.id === p.id);
            if (result.length === 1) {  // This type of product is already in the cart
                window.app.store.cart = window.app.store.cart.map(p => {
                    if (p.id === product.id) {
                        p.qtn = p.qtn + 1;
                    }
                    return p;
                });
            } else {
                const inCartProduct: InCartProduct = {
                    name: product.name, 
                    id: product.id,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    qtn: 1
                };
                window.app.store.cart = [...window.app.store.cart, inCartProduct];
            }
        }
    });
}

export async function removeFromCart(id: number) {
    let i = 0;
    for (; i < window.app.store.cart.length; i++) {
        if (window.app.store.cart[i].id === id) {
            const removed = window.app.store.cart[i];
            window.app.store.cart = window.app.store.cart.slice(0, i).
                concat(window.app.store.cart.slice(i + 1, window.app.store.cart.length));
            return removed;
        }
    }
    throw new Error(`Product with ${id} is not in the cart`);
}

