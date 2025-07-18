import { API } from "../services/API";
import { Router } from "../services/Router";

export { };

declare global {
    interface Window {
        app: {
            Router: typeof Router,
            search: (event: Event) => void,
            api: typeof API
        },
    }

    interface Movie {
        id: number
        tmdb_id: number
        title: string
        tagline: string
        release_year: number
        genres: Genre[]
        overview: string
        score: number
        popularity: number
        keywords: string[]
        language: string
        poster_url: string
        trailer_url: string
        casting: Casting[]
    }

    interface Genre {
        id: number
        name: string
    }

    interface Casting {
        id: number
        first_name: string
        last_name: string
        image_url?: string
    }

}