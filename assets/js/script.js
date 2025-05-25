
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
        if (ev.target.closest('details').open) {
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
        if (!ev.target.closest('details[open]')) {
            this.querySelector('details[open]')?.removeAttribute('open');
        }
    }
}

customElements.define('mvv-dropdown', MVVDropdown);

class MVVCarousel extends HTMLElement {
    scrollview;
    dotsContainer;

    nextButton;
    prevButton;

    containerScrollWidth;
    containerWidth;

    isScrolling;

    constructor() {
        super();
    }

    connectedCallback() {
        this.scrollview = this.querySelector('[is="mvv-carousel-scrollview"]');
        this.getScrollviewSizes();

        this.dotsContainer = this.querySelector('[is="mvv-carousel-dots"]');
        this.generateDots();

        this.nextButton = this.querySelector('[is="mvv-carousel-next"]');
        this.prevButton = this.querySelector('[is="mvv-carousel-prev"]');

        this.nextButton?.addEventListener('click', this.goNext);
        this.prevButton?.addEventListener('click', this.goPrev);

        window.addEventListener('resize', this.handleResize);

        this.scrollview?.addEventListener('scroll', this.handleScrolling);
    }

    disconnectedCallback() {
        this.nextButton?.removeEventListener('click', this.goNext);
        this.prevButton?.removeEventListener('click', this.goPrev);
        window.removeEventListener('resize', this.handleResize);
        this.scrollview?.removeEventListener('scroll', this.handleScrolling);
    }

    goNext = () => {
        this.scrollview.scrollTo(this.containerWidth + this.scrollview.scrollLeft, 0);
    }

    goPrev = () => {
        this.scrollview.scrollTo(this.scrollview.scrollLeft - this.containerWidth, 0);
    }

    handleResize = () => {
        this.getScrollviewSizes();
        this.generateDots();
    }

    getScrollviewSizes = () => {
        const gap = parseInt(getComputedStyle(this).getPropertyValue('--_gap') || '0');
        this.containerScrollWidth = this.scrollview.scrollWidth - gap * 2;
        this.containerWidth = this.scrollview?.offsetWidth;
    }

    generateDots = () => {
        const inputName = Math.random().toString(16).slice(2);
        const count = Math.ceil(this.containerScrollWidth / this.containerWidth);

        const dots = Array.from({ length: count }).map((_, index) => {
            return `
                <li>
                    <label>
                        <input type="radio" name="${inputName}" value="${index}">
                        <span class="sr-only">${index + 1}</span>
                    </label>
                </li>
            `;
        });

        this.dotsContainer.innerHTML = dots.join('');
        this.dotsSetCurrent();
    }

    dotsSetCurrent = (current = null) => {
        console.log('current', current)
        const currentIndex = current != null ? current : (this.scrollview.scrollLeft ? Math.ceil(this.containerScrollWidth / this.scrollview.scrollLeft) : 0);
        this.dotsContainer.querySelector(`input[value="${currentIndex}"]`).checked = true;
    }

    handleScrolling = () => {
        clearTimeout(this.isScrolling);

        this.isScrolling = setTimeout(() => {
            
            if( this.containerScrollWidth <= this.scrollview.scrollLeft + this.containerWidth ) {
                 this.dotsSetCurrent(Math.ceil(this.scrollview.scrollLeft / this.containerWidth));
                 return;
            }

            this.dotsSetCurrent(Math.floor(this.scrollview.scrollLeft / this.containerWidth));
        }, 200);
    }
}

customElements.define('mvv-carousel', MVVCarousel);