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

const store: Store = {  // Manage the state of the app
    menu: [],
    cart: []
};

export default store;
