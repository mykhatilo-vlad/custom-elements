class MvAccordion extends HTMLElement {
    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill="currentColor"/></svg>';
    items;
    isMultipleOpen = false;
    isCollapse = false;

    constructor() {
        super();
    }

    connectedCallback() {
        this.isMultipleOpen = this.dataset.multipleOpen === 'true';
        this.isCollapse = this.dataset.collapse === 'true';

        this.items = this.querySelectorAll('mv-accordion-item');
        const radioButtonName = Math.random().toString(16).slice(2);

        this.items?.forEach((item, index) => {
            const title = item.querySelector('mv-accordion-item-title');
            const titleContent = title.innerHTML;
            const icon = !title.querySelector('mv-accordion-item-icon') ? `<mv-accordion-item-icon class="ml-auto">${this.icon}</mv-accordion-item-icon>` : '';

            const inputType = this.isMultipleOpen ? 'checkbox' : 'radio';
            const checked = index === 0 && !this.isCollapse ? 'checked' : '';

            title.innerHTML = `
                <label class="flex items-center gap-3">
                    <input type="${inputType}" class="sr-only" name="${radioButtonName}" ${checked} />

                    ${titleContent}

                    ${icon}
                </label>
            `;

            const content = item.querySelector('mv-accordion-item-content');
            content.innerHTML = `<mv-accordion-item-content-inner>${content.innerHTML}</mv-accordion-item-content-inner>`;
        })
    }
}

customElements.define("mv-accordion", MvAccordion);