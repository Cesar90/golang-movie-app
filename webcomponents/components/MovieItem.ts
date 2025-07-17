export class MovieItemComponent extends HTMLElement {

    constructor(private movie: Movie) {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <a href="#">
                <article>
                    <img 
                        src="${this.movie.poster_url}" 
                        alt="${this.movie.title} Poster" 
                    />
                    <p>${this.movie.title}  (${this.movie.release_year})</p>
                </article>
            </a>
        `;
    }
}

customElements.define("movie-item", MovieItemComponent)