import { HomePage } from "../components/HomePage";
import { MovieDetailsPage } from "../components/MovieDetailsPage";
import { MoviesPage } from "../components/MoviesPage";

type Route = {
    path: string | RegExp;
    component: typeof HTMLElement;
}

export const ROUTES: Route[] = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: /\/movies\/(\d+)/,
        component: MovieDetailsPage
    },
    {
        path: "/movies", //Search results
        component: MoviesPage
    },
]