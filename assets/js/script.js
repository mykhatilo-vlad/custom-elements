
class MVVTabs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', this.handleDetailsToggle);
    }

    disconnectedCallback() {
        this.removeEventListener('toggle', this.handleDetailsToggle);
    }

    handleDetailsToggle = (ev) => {
        if(ev.target.closest('details').open) {
            ev.preventDefault();
        }
    }
}

customElements.define('mvv-tabs', MVVTabs);