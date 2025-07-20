import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { MovieDetailsPage } from "../components/MovieDetailsPage";
import { MoviesPage } from "../components/MoviesPage";
import { RegisterPage } from "../components/RegisterPage";

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
    {
        path: "/account/register", //Search results
        component: RegisterPage
    },
    {
        path: "/account/login", //Search results
        component: LoginPage
    },
]