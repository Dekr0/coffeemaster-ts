import { z } from 'zod';

export const CoffeeParser = z.object({
    id: z.number().nonnegative(),
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
    description: z.string(),
    image: z.string()
});

export const CoffeeCategoryParser = z.object({
    name: z.string(),
    products: CoffeeParser.array()
});

export type Store = {
    menu: z.infer<typeof CoffeeCategoryParser>[];
    cart: z.infer<typeof CoffeeParser>[];
};

const _store: Store = {  // Manage the state of the app
    menu: [],
    cart: []
};

const store = new Proxy<Store>(
    _store,
    {
        set: (target, property, newValue, receiver) => {
            console.log('Firing proxy');
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
