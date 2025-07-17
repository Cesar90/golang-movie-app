import { API } from "../services/API";

export { };

declare global {
    interface Window {
        app: {
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
        genres: string[]
        overview: string
        score: number
        popularity: number
        keywords: string[]
        language: string
        poster_url: string
        trailer_url: string
        casting: string[]
    }
}