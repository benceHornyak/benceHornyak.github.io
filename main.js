
const MobileNavigation = {
    elements: {
        toggle: null,
        menu: null,
        icon: null,
        links: []
    },


    init() {
        this.elements.toggle = document.querySelector('.mobile-menu-toggle');
        this.elements.menu = document.querySelector('.nav-menu');
        this.elements.icon = this.elements.toggle?.querySelector('i');
        this.elements.links = document.querySelectorAll('.nav-menu a');

        this.attachEventListeners();
    },

    attachEventListeners() {
        if (!this.elements.toggle || !this.elements.menu) return;

        this.elements.toggle.addEventListener('click', (e) => this.handleToggleClick(e));

        this.elements.links.forEach(link => {
            link.addEventListener('click', () => this.handleLinkClick());
        });

        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    },

    handleToggleClick(e) {
        e.stopPropagation();
        this.elements.menu.classList.toggle('mobile-active');
        this.updateIcon();
    },

    handleLinkClick() {
        if (window.innerWidth <= 768) {
            this.closeMenu();
        }
    },

    handleOutsideClick(e) {
        if (window.innerWidth <= 768) {
            const isClickOutside = !this.elements.menu.contains(e.target) && 
                                  !this.elements.toggle.contains(e.target);
            
            if (isClickOutside && this.elements.menu.classList.contains('mobile-active')) {
                this.closeMenu();
            }
        }
    },

    closeMenu() {
        this.elements.menu.classList.remove('mobile-active');
        this.updateIcon();
    },

    updateIcon() {
        if (!this.elements.icon) return;

        if (this.elements.menu.classList.contains('mobile-active')) {
            this.elements.icon.classList.remove('fa-bars');
            this.elements.icon.classList.add('fa-times');
        } else {
            this.elements.icon.classList.remove('fa-times');
            this.elements.icon.classList.add('fa-bars');
        }
    }
};

const SmoothScrolling = {

    init() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e, anchor));
        });
    },

    handleAnchorClick(e, anchor) {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

const NavigationScrollEffect = {
    elements: {
        nav: null
    },

    scrollThreshold: 100,

    init() {
        this.elements.nav = document.querySelector('nav');
        
        if (this.elements.nav) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    },

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.elements.nav.classList.add('scrolled');
        } else {
            this.elements.nav.classList.remove('scrolled');
        }
    }
};

const App = {
    init() {
        MobileNavigation.init();
        SmoothScrolling.init();
        NavigationScrollEffect.init();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
