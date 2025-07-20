import { MovieItemComponent } from "./MovieItem";

export class CollectionPage extends HTMLElement {

    constructor(public endpoint: () => Promise<Movie[]>, public title: string) {
        super();
    }

    async render() {
        const movies = await this.endpoint()
        const ulMovies = this.querySelector("ul")!;
        ulMovies.innerHTML = "";
        if (movies && movies.length > 0) {
            movies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItemComponent(movie));
                ulMovies.appendChild(li);
            });
        } else {
            ulMovies.innerHTML = "<h3>There are no movies</h3>";
        }
        ;
    }

    connectedCallback() {
        const template = document.getElementById("template-collection") as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        this.render();
    }
}