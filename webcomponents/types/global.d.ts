import { API } from "../services/API";
import { Store } from "../services/Store";
import { Router } from "../services/Router";

export { };

declare global {
    interface Window {
        app: {
            Router: typeof Router,
            Store: typeof Store,
            showError: (message: string, goToHome: boolean) => void,
            closeError: () => void;
            search: (event: Event) => void,
            searchOrderChange: (order: string) => void,
            searchFilterChange: (genre: string) => void,
            register: (event: Event) => void,
            login: (event: Event) => void,
            logout: () => void,
            api: typeof API
        },
    }

    type StoreType = {
        jwt: string | null;
        readonly loggedIn: boolean;
    };

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

    interface AuthResponse {
        success: boolean
        message: string
        jwt: string
    }

}