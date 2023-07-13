import { z } from 'zod';

const nonnegative = z.number().nonnegative();

export const ProductParser = z.object({
    id: nonnegative,
    name: z.string().nonempty(),
    price: nonnegative,
    description: z.string(),
    image: z.string(),
});

export const ProductCategoryParser = z.object({
    name: z.string(),
    products: ProductParser.array()
});

export const InCartProductParser = z.intersection(ProductParser, z.object({qtn: z.number().nonnegative()}));

export type Product = z.infer<typeof ProductParser>;

export type InCartProduct = z.infer<typeof InCartProductParser>;

export type Store = {
    menu: z.infer<typeof ProductCategoryParser>[] | null;
    cart: InCartProduct[];
};

const _store: Store = {  // Manage the state of the app
    menu: null,
    cart: []
};

const store = new Proxy<Store>(
    _store,
    {
        set: (target, property, newValue, receiver) => {
            let key = property as keyof Store;
            target[key] = newValue;
            if (property === 'menu') {
                window.dispatchEvent(new Event('menuchange'));
            } else if (property === 'cart') {
                window.dispatchEvent(new Event('cartchange'));
            } else {
                throw new Error(`Undefined property ${String(property)}`);
            }
            return true;
        }
    }
);

export default store;
