export { };

declare global {
    interface Window {
        app: {
            search: (event: Event) => void
        }
    }
}