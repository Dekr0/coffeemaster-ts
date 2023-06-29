import { loadData } from "./services/Menu";
import store from "./services/Store";

window.app = {
    store : store
};

document.addEventListener('DOMContentLoaded', async () => {
    loadData();
});
