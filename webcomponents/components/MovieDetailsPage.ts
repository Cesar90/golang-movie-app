import { API } from "../services/API";

export class MovieDetailsPage extends HTMLElement {
    movieId: number | undefined = undefined
    movie: Movie | undefined = undefined

    async render() {
        if (this.movieId) {
            try {
                this.movie = await API.getMovieById(this.movieId)
            } catch (error) {
                alert("Movie doesn't exist"); // TODO replace alert
                return;
            }

            const template = document.getElementById("template-movie-details") as HTMLTemplateElement
            if (template && this.movie) {
                const content = template.content.cloneNode(true)
                this.appendChild(content)

                this.querySelector("h2")!.textContent = this.movie.title
                this.querySelector("h3")!.textContent = this.movie.tagline
            }
        }
    }

    connectedCallback() {
        this.movieId = 14; //TODO
        this.render()
    }
}

customElements.define("movie-details-page", MovieDetailsPage)