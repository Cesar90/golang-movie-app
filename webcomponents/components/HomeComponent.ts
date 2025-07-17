export class HomePage extends HTMLElement { // <home-page>
    connectedCallback() {
        const template = document.getElementById("template-home") as HTMLTemplateElement
        if (template instanceof HTMLTemplateElement) {
            const content = template.content.cloneNode(true)
            this.appendChild(content)
        }
    }
}

customElements.define("home-page", HomePage)