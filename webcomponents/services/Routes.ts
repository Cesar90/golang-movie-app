import { HomePage } from "../components/HomePage";
import { MovieDetailsPage } from "../components/MovieDetailsPage";
import { MoviePage } from "../components/MoviePage";

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
        component: MoviePage
    },
]