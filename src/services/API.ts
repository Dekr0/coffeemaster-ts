import { CoffeeCategoryParser } from "./Store";

// use const to achieve Singleton
const API = {  // for fetching data from the network
    url: "/data/menu.json",
    fetchMenu: () => fetch(API.url).
        then(response => response.json()).
        then(json => CoffeeCategoryParser.array().parse(json))
    
};

export default API;
