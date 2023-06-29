import { Store } from './services/Store';

declare global {
    type App = {
        store: Store;
    }

    interface Window {
        app: App;
    }
}
