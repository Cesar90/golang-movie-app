
import { API } from "../services/API";
import { MovieItemComponent } from "./MovieItem";

export class MoviesPage extends HTMLElement {

    async render(query: string) {
        const urlParams = new URLSearchParams(window.location.search);
        const order = urlParams.get("order") ?? "";
        const genre = urlParams.get("genre") ?? "";

        const movies = await API.searchMovies(query, order, genre);

        const ulMovies = this.querySelector("ul")!;
        ulMovies.innerHTML = "";
        if (movies && movies.length > 0) {
            movies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                ulMovies.appendChild(li);
            });
        } else {
            ulMovies.innerHTML = "<h3>There are no movies with your search</h3>";
        }

        await this.loadGenres();

        if (order) (this.querySelector("#order") as HTMLSelectElement)!.value = order;
        if (genre) (this.querySelector("#filter") as HTMLSelectElement)!.value = genre;
    }

    async loadGenres() {
        const genres = await API.getGenres();
        const select = this.querySelector("select#filter");
        select!.innerHTML = `
            <option>Filter by Genre</option>
        `
        genres.forEach((genre) => {
            var option = document.createElement("option") as HTMLOptionElement
            option.value = genre.id.toString();
            option.textContent = genre.name;
            select?.appendChild(option)
        })
    }

    connectedCallback() {
        const template = document.getElementById("template-movies") as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            this.querySelector("h2")!.textContent = `'${query}' movies`;
            this.render(query);
        } else {
            window.app.showError("", false);
        }
    }
}
customElements.define("movies-page", MoviesPage);