import { API } from "../services/API";

export { };

declare global {
    interface Window {
        app: {
            search: (event: Event) => void,
            api: typeof API
        },
    }
}