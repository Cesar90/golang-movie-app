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
    register: async (event: Event) => {
        event.preventDefault();
        const name = (document.getElementById("register-name") as HTMLInputElement)!.value
        const email = (document.getElementById("register-email") as HTMLInputElement)!.value
        const password = (document.getElementById("register-password") as HTMLInputElement)!.value
        const passwordConfirmation = (document.getElementById("register-password-confirmation") as HTMLInputElement)!.value

        const errors = [];
        if (name.length < 4) errors.push("Enter your complete name");
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete name");
        if (password != passwordConfirmation) errors.push("Password don't match")

        if (errors.length === 0) {
            const response = await API.register(name, email, password)
            if (response.success) {
                window.app.Router.go('/account/')
            } else {
                window.app.showError(response.message, false)
            }
        } else {
            window.app.showError(errors.join(". "), false)
        }
    },
    login: async (event: Event) => {
        event.preventDefault();
        const email = (document.getElementById("login-email") as HTMLInputElement)!.value
        const password = (document.getElementById("login-password") as HTMLInputElement)!.value

        const errors = [];
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete name");

        if (errors.length === 0) {
            const response = await API.login(email, password)
            if (response.success) {
                window.app.Router.go('/account/')
            } else {
                window.app.showError(response.message, false)
            }
        } else {
            window.app.showError(errors.join(". "), false)
        }
    },
    api: API
};