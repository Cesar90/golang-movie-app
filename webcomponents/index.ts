import { API } from "./services/API";
import { HomePage } from "./components/HomePage";

window.addEventListener("DOMContentLoaded", event => {
    document.querySelector("main")?.appendChild(new HomePage())
})

window.app = {
    search: (event: Event) => {
        event.preventDefault();
        const q = (document.querySelector("input[type=search]") as HTMLInputElement)!.value;
    },
    api: API
};