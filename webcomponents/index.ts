import { API } from "./services/API";

window.app = {
    search: (event: Event) => {
        event.preventDefault();
        const q = (document.querySelector("input[type=search]") as HTMLInputElement)!.value;
    },
    api: API
};