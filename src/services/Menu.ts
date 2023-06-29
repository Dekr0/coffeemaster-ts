import API from "./API";

// Different way to export compared to encapsulating into JSON
export async function loadData() {
    window.app.store.menu = await API.fetchMenu();
}
