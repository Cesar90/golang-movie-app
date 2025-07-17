import { API } from "../services/API";

export class HomePage extends HTMLElement { // <home-page>

    async render() {
        const topMovies = await API.getToMovies()
        renderMoviesInList(topMovies, document.querySelector("#top-10 ul"))

        const randomMovies = await API.getRandomMovies();
        renderMoviesInList(randomMovies, document.querySelector("#random ul"))

        function renderMoviesInList(movies: Movie[], ul: HTMLElement | null) {
            if (ul) {
                ul.innerHTML = "";
                movies.forEach(movie => {
                    const li = document.createElement("li");
                    li.textContent = movie.title
                    ul.appendChild(li)
                });
            }
        }
    }

    connectedCallback() {
        const template = document.getElementById("template-home") as HTMLTemplateElement
        if (template instanceof HTMLTemplateElement) {
            const content = template.content.cloneNode(true)
            this.appendChild(content)
            this.render();
        }
    }
}

customElements.define("home-page", HomePage)