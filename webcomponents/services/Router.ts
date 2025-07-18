const Router = {
    init: () => {
        window.addEventListener("popstate", () => {
            Router.go(location.pathname, false)
        })

        // Go to the initial route
        Router.go(location.pathname + location.search)
    },
    go: (route: string, addToHistory = true) => {
        if (addToHistory) {
            history.pushState(null, "", route)
        }
    }
}