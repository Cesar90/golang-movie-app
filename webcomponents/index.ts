import { API } from "./services/API";
import { Router } from "./services/Router";
import { HomePage } from "./components/HomePage";
import { MovieDetailsPage } from "./components/MovieDetailsPage";
import './components/AnimatedLoading'
import './components/YoutubeEmbed'

window.addEventListener("DOMContentLoaded", event => {
    // document.querySelector("main")?.appendChild(new HomePage())
    // document.querySelector("main")?.appendChild(new MovieDetailsPage())
    window.app.Router.init();
})

window.app = {
    Router,
    showError: (message = "There was an error.", goToHome = true) => {
        const erroModal = document.getElementById("alert-modal");
        (erroModal as HTMLDialogElement).showModal();
        document.querySelector("#alert-modal p")!.textContent = message
        if (goToHome) {
            window.app.Router.go("/");
        }
    },
    closeError: () => {
        const erroModal = document.getElementById("alert-modal");
        (erroModal as HTMLDialogElement).close()
    },
    search: (event: Event) => {
        event.preventDefault();
        const q = (document.querySelector("input[type=search]") as HTMLInputElement)!.value;
        window.app.Router.go("/movies?q=" + q)
    },
    searchOrderChange: (order: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const genre = urlParams.get("genre") ?? "";
        window.app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
    },
    searchFilterChange: (genre: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const order = urlParams.get("order") ?? "";
        window.app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
    },
    api: API
};