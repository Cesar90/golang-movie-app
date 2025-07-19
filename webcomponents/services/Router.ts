import { MovieDetailsPage } from "../components/MovieDetailsPage"
import { ROUTES } from "./Routes"

export const Router = {
    init: () => {
        window.addEventListener("popstate", () => {
            Router.go(location.pathname, false)
        })
        // Enhance current links in the document
        document.querySelectorAll("a.navlink").forEach((a) => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = a.getAttribute("href");
                // const href = a.href("href");
                if (href) {
                    Router.go(href)
                }
            })
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
                    if (pageElement instanceof MovieDetailsPage) {
                        pageElement.params = params
                    }
                    break;
                }
            }
        }
        // debugger;
        if (pageElement === null) {
            pageElement = document.createElement("h1")
            pageElement.textContent = "Page not found"
        }
        // I have a page for the current URL
        // Inserting the new page in the UI
        const oldPage = document.querySelector("main")?.firstElementChild as HTMLElement;
        if (oldPage) {
            oldPage.style.viewTransitionName = "old";
        }
        pageElement.style.viewTransitionName = "new";

        function updatePage(pageElement: HTMLElement | HTMLHeadingElement) {
            document.querySelector("main")!.innerHTML = "";
            document.querySelector("main")!.appendChild(pageElement)
        }

        if (!document.startViewTransition) {
            // We don't do a transicion
            updatePage(pageElement);
        } else {
            document.startViewTransition(() => {
                updatePage(pageElement);
            })
        }
    }
}