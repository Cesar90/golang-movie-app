import { ROUTES } from "./Routes"

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
        let pageElement: null | HTMLElement | HTMLHeadingElement = null

        const routePath = route.includes("?") ? route.split("?")[0] : route;

        for (const r of ROUTES) {
            if (typeof r.path === "string" && r.path === routePath) {
                // String path
                pageElement = new r.component();
                break;
            } else if (r.path instanceof RegExp) {
                // RegExp
                const match = r.path.exec(route)
                if (match) {
                    pageElement = new r.component();
                    const params = match.slice(1);
                    // pageElement.params = params
                }
            }
        }

        if (pageElement === null) {
            pageElement = document.createElement("h1")
            pageElement.textContent = "Page not found"
        } else {
            // I have a page for the current URL
            document.querySelector("main")!.innerHTML = "";
            document.querySelector("main")!.appendChild(pageElement)
        }
    }
}