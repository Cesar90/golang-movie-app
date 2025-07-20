import { AccountPage } from "../components/AccountPage";
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
        path: "/account/register", //Register
        component: RegisterPage
    },
    {
        path: "/account/login", //Login
        component: LoginPage
    },
    {
        path: "/account/",
        component: AccountPage
    }
]