// ===== DOM Elements =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger') && navLinks.classList.contains('active')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ===== Tabs =====
tabLinks.forEach(tab => {
    tab.addEventListener('click', () => {
        tabLinks.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const activeTabPane = document.querySelector('.tab-pane.active');
        const currentHeight = activeTabPane ? activeTabPane.offsetHeight : 0;

        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            pane.setAttribute('aria-hidden', 'true');
        });

        const tabId = tab.getAttribute('data-tab');
        const newTabPane = document.getElementById(tabId);
        newTabPane.classList.add('active');
        newTabPane.setAttribute('aria-hidden', 'false');

        const tabContent = document.querySelector('.tab-content');
        tabContent.style.minHeight = Math.max(currentHeight, newTabPane.offsetHeight) + 'px';
    });
});

// ===== Portfolio Overlays =====
portfolioItems.forEach(item => {
    if (!item.querySelector('.portfolio-overlay')) {
        const overlay = document.createElement('div');
        overlay.classList.add('portfolio-overlay');

        const title = document.createElement('h3');
        title.textContent = item.querySelector('img').alt;

        const description = document.createElement('p');
        description.textContent = "Click to view more details about this project.";

        const link = document.createElement('a');
        link.classList.add('portfolio-link');
        link.href = '#';

        const icon = document.createElement('i');
        icon.classList.add('external-link-icon');

        link.appendChild(icon);
        overlay.appendChild(title);
        overlay.appendChild(description);
        overlay.appendChild(link);
        item.appendChild(overlay);
    }
});

// ===== Sticky Header & Scroll Events =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.classList.remove('scrolled');
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }

    updateActiveNavLink();
    animateOnScroll();
});

function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < window.innerHeight - 50) {
            element.classList.add('animate');
        }
    });
}

function setupAnimations() {
    const animateElements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.portfolio-item'),
        ...document.querySelectorAll('.contact-content > div')
    ];
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

function setInitialTabHeight() {
    const activeTabPane = document.querySelector('.tab-pane.active');
    if (activeTabPane) {
        document.querySelector('.tab-content').style.minHeight = activeTabPane.offsetHeight + 'px';
    }
}

// ===== Firebase Configuration =====
const firebaseConfig = {
    apiKey: "AIzaSyCyznTpSrjMox8ntx_EkJ3TkTcoGT7g67o",
    authDomain: "contact-us-9d40f.firebaseapp.com",
    databaseURL: "https://contact-us-9d40f-default-rtdb.firebaseio.com",
    projectId: "contact-us-9d40f",
    storageBucket: "contact-us-9d40f.appspot.com",
    messagingSenderId: "233060522168",
    appId: "1:233060522168:web:1eec79a9ade5425fdbbc4d",
    measurementId: "G-VHZXQML374"
};
firebase.initializeApp(firebaseConfig);
const contactFormDB = firebase.database().ref('contact');

// ===== Form Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = getElementVal('name');
        const email = getElementVal('email');
        const message = getElementVal('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        saveMessages(name, email, message);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const saveMessages = (name, email, message) => {
    const newContactForm = contactFormDB.push();
    newContactForm.set({ name, email, message });
};

const getElementVal = (id) => document.getElementById(id).value;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===== Page Load Setup =====
window.addEventListener('load', () => {
    setInitialTabHeight();
    setupAnimations();
    animateOnScroll();

    tabLinks.forEach((tab, index) => {
        const isActive = tab.classList.contains('active');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.id = `tab-${index}`;

        const tabId = tab.getAttribute('data-tab');
        const tabPane = document.getElementById(tabId);
        tabPane.setAttribute('role', 'tabpanel');
        tabPane.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        tabPane.setAttribute('aria-labelledby', `tab-${index}`);
    });

    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
    }

    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    }
});
