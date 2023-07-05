// A router that is specific to this app (not a general purpose router)
import { z } from 'zod';

const StateParser = z.object({
    route: z.string().catch('')
});

const main =  document.querySelector('main');
const Router = {
    init: () => {
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
            Router.go(state.route, false);  // Make no sense to pop one state and push back it => infinite loop
        });

        // Check the initial URL to cover the case the users enter the fake URL in the search bar
        console.log(location.pathname);
        Router.go(location.pathname);
    },
    go: (route: string, addToHistory: boolean=true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) history.pushState({ route } as z.infer<typeof StateParser>, '', route);

        let pageElement = undefined;
        switch (route) {
            case "/":
                pageElement = document.createElement('menu-page');
                break;
            case "/order":
                pageElement = document.createElement('order-page');
                break;
            default:  // detail page (page content is varied by products)
                if (route.startsWith('/product-')) {  // regex ? 
                pageElement = document.createElement('h1');
                pageElement.textContent = 'Details';

                const productId = route.substring(route.lastIndexOf('-') + 1);
                pageElement.dataset.id = productId;
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
