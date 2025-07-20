import { API } from "../services/API";
import { CollectionPage } from "./CollectionPage";

export default class FavoritePage extends CollectionPage {

    constructor() {
        super(API.getFavotites, "Favorite Movies")
    }

}
customElements.define("favorite-page", FavoritePage);