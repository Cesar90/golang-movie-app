import { API } from "./services/API";
import { HomePage } from "./components/HomePage";
import { MovieDetailsPage } from "./components/MovieDetailsPage";
import './components/AnimatedLoading'

window.addEventListener("DOMContentLoaded", event => {
    // document.querySelector("main")?.appendChild(new HomePage())
    document.querySelector("main")?.appendChild(new MovieDetailsPage())
})

window.app = {
    search: (event: Event) => {
        event.preventDefault();
        const q = (document.querySelector("input[type=search]") as HTMLInputElement)!.value;
    },
    api: API
};