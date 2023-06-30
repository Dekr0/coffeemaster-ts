import API from "./services/API";
import Router from "./services/Router";
import store from "./services/Store";

// An dependency is created => whenever a state change, code that need access to 
// the app state require `window.app` => refactor ? not necessary => adding 
// abstraction create complexity 
window.app = {
    store : store,
    router: Router
};

document.addEventListener('DOMContentLoaded', async () => {
    window.app.store.menu = await API.fetchMenu();
    window.app.router.init();  // Init the router
});
