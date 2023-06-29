import { CoffeeCategory, CoffeeCategoryParser } from "./Store";

// use const to achieve Singleton
const API = {  // for fetching data from the network
    url: "/data/menu.json",
    fetchMenu: async () => {
        const result = await fetch(API.url);
        const raw = await result.json();

        return CoffeeCategoryParser.array().parse(raw) as CoffeeCategory[];
    }
};

export default API;
