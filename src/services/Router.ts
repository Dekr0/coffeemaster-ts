// A router that is specific to this app (not a general purpose router)
import { z } from 'zod';
import API from './API';

const StateParser = z.object({
    route: z.string().catch('')
});

const main =  document.querySelector('main');
const Router = {
    init: () => {
        // Overwrite anchor behavior in the navigation
        document.querySelectorAll('a.navlink').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();  // Prevent the default browser behavior of anchor tag
                if (e.target !== null) {
                    const url = (e.target as HTMLElement).getAttribute('href');
                    if (url !== null) Router.go(url);
                }
            })
        });

        // Popstate when press back button
        window.addEventListener('popstate', e => {
            const state = StateParser.parse(e.state);
           Router.go(state.route, false);  // Avoid pushing popped state back into the History API
        });

        // Check the initial URL to cover the case the users enter the fake URL in the search bar
        Router.go(location.pathname);
    },
    go: (route: string, addToHistory: boolean=true) => {
        if (addToHistory) history.pushState({ route } as z.infer<typeof StateParser>, '', route);

        let pageElement = undefined;
        switch (route) {
            case "/": 
                API.fetchMenu().then(data => { window.app.store.menu = data; });
                pageElement = document.createElement('menu-page');
                console.log('Menu Page');
                break;
            case "/order":
                pageElement = document.createElement('order-page');
                console.log('Order Page');
                break;
            default:  // detail page (page content is varied by products)
                if (route.startsWith('/product-')) {  // regex ? 
                    pageElement = document.createElement('details-page');
                    const productId = route.substring(route.lastIndexOf('-') + 1);
                    pageElement.dataset.productId = productId;
                    break;
            }
        }
        if (pageElement !== undefined && main !== null) { 
            main.innerHTML = ''; // brute force
            main.appendChild(pageElement);
            window.scrollX = 0; window.scrollY = 0; // Reset screen position
        } else {
            // Create a 404 Web Component
        }
    }
}

export default Router;
