import { API } from "../services/API";
import { CollectionPage } from "./CollectionPage";

export default class WatchlistPage extends CollectionPage {

    constructor() {
        super(API.getWatchlist, "Movie Watchlist")
    }

}
customElements.define("watchlist-page", WatchlistPage);