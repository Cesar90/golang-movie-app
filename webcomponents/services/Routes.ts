import { AccountPage } from "../components/AccountPage";
import FavoritePage from "../components/FavoritesPage";
import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { MovieDetailsPage } from "../components/MovieDetailsPage";
import { MoviesPage } from "../components/MoviesPage";
import { RegisterPage } from "../components/RegisterPage";
import WatchlistPage from "../components/WatchlistPage";

type Route = {
    path: string | RegExp;
    component: typeof HTMLElement;
    loggedIn: boolean
}

export const ROUTES: Route[] = [
    {
        path: "/",
        component: HomePage,
        loggedIn: false
    },
    {
        path: /\/movies\/(\d+)/,
        component: MovieDetailsPage,
        loggedIn: false
    },
    {
        path: "/movies", //Search results
        component: MoviesPage,
        loggedIn: false
    },
    {
        path: "/account/register", //Register
        component: RegisterPage,
        loggedIn: false
    },
    {
        path: "/account/login", //Login
        component: LoginPage,
        loggedIn: false
    },
    {
        path: "/account/",
        component: AccountPage,
        loggedIn: true
    },
    {
        path: "/account/favorites",
        component: FavoritePage,
        loggedIn: true
    },
    {
        path: "/account/watchlist",
        component: WatchlistPage,
        loggedIn: true
    }
]