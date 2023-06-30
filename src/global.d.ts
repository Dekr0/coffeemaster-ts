import Router from './services/Router';
import { Store } from './services/Store';

declare global {
    type App = {
        store: Store;
        router: typeof Router;
    }

    interface Window {
        app: App;
    }
}
