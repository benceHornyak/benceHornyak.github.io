const MobileNavigation = {
    toggle: null,
    menu: null,

    init() {
        this.toggle = document.querySelector('.menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setOpen(!this.menu.classList.contains('open'));
        });

        this.menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => this.setOpen(false));
        });

        document.addEventListener('click', (e) => {
            if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
                this.setOpen(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.setOpen(false);
        });
    },

    setOpen(open) {
        this.menu.classList.toggle('open', open);
        this.toggle.setAttribute('aria-expanded', String(open));
    }
};

const HeaderScrollEffect = {
    init() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const update = () => header.classList.toggle('scrolled', window.scrollY > 24);
        window.addEventListener('scroll', update, { passive: true });
        update();
    }
};

const ScrollReveal = {
    init() {
        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        elements.forEach((el) => observer.observe(el));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    MobileNavigation.init();
    HeaderScrollEffect.init();
    ScrollReveal.init();
});
