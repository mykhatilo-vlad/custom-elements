
class MVVTabs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', this.handleDetailsToggle);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleDetailsToggle);
    }

    handleDetailsToggle = (ev) => {
        if(ev.target.closest('details').open) {
            ev.preventDefault();
        }
    }
}

customElements.define('mvv-tabs', MVVTabs);


class MVVDropdown extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('click', this.handleClickOutside);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (ev) => {
        if(!ev.target.closest('details[open]')) {
            this.querySelector('details[open]')?.removeAttribute('open');
        }
    }
}

customElements.define('mvv-dropdown', MVVDropdown);

class MVVCarousel extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {

    }
}

customElements.define('mvv-carousel', MVVCarousel);