import { API } from "../services/API";

export class MovieDetailsPage extends HTMLElement {
    movieId: number | undefined = undefined
    movie: Movie | undefined = undefined
    params: string[] = [];

    async render() {
        if (this.movieId) {
            try {
                this.movie = await API.getMovieById(this.movieId)
            } catch (error) {
                // alert("Movie doesn't exist"); // TODO replace alert
                window.app.showError("Movie doesn't exist", true)
                return;
            }

            const template = document.getElementById("template-movie-details") as HTMLTemplateElement
            if (template && this.movie) {
                const content = template.content.cloneNode(true)
                this.appendChild(content)

                this.querySelector("h2")!.textContent = this.movie.title
                this.querySelector("h3")!.textContent = this.movie.tagline
                this.querySelector("img")!.src = this.movie.poster_url
                const trailerElemet = this.querySelector("#trailer") as HTMLElement
                if (trailerElemet) {
                    trailerElemet.dataset.url = this.movie.trailer_url
                }
                this.querySelector("#overview")!.textContent = this.movie.overview
                this.querySelector("#metadata")!.innerHTML = `
                    <dt>Release Year</dt>
                    <dd>${this.movie.release_year}</dd>
                    <dt>Score</dt>
                    <dd>${this.movie.score} / 10</dd>
                    <dt>Popularity</dt>
                    <dd>${this.movie.popularity}</dd>
                `

                const ulGenres = this.querySelector("#genres")!;
                ulGenres.innerHTML = "";
                this.movie.genres.forEach(genre => {
                    const li = document.createElement("li");
                    li.textContent = genre.name;
                    ulGenres.appendChild(li);
                });

                this.querySelector("#actions #btnFavorites")!.addEventListener("click", () => {
                    if (this.movie) {
                        window.app.saveToCollection(this.movie?.id, "favorite")
                    }
                });

                this.querySelector("#actions #btnWatchlist")!.addEventListener("click", () => {
                    if (this.movie) {
                        window.app.saveToCollection(this.movie?.id, "watchlist")
                    }
                });

                const ulCast = this.querySelector("#cast")!;
                ulCast.innerHTML = "";
                this.movie.casting.forEach(actor => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                <img src="${actor.image_url ?? '/images/generic_actor.jpg'}" alt="Picture of ${actor.last_name}">
                <p>${actor.first_name} ${actor.last_name}</p>
            `;
                    ulCast.appendChild(li);
                });
            }
        }
    }

    connectedCallback() {
        this.movieId = +this.params[0]
        this.render()
    }
}

customElements.define("template-movie-details", MovieDetailsPage)