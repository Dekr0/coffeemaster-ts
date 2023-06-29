import { z } from 'zod';

export const CoffeeParser = z.object({
    id: z.number().nonnegative(),
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
    description: z.string(),
    image: z.string()
});
export type Coffee = z.infer<typeof CoffeeParser>;

export const CoffeeCategoryParser = z.object({
    name: z.string(),
    products: CoffeeParser.array()
});
export type CoffeeCategory = z.infer<typeof CoffeeCategoryParser>;

export type Store = {
    menu: CoffeeCategory[],
    cart: Coffee[]
}

const store: Store = {  // Manage the state of the app
    menu: [],
    cart: []
};

export default store;
