// Shared small helpers
document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function handleQuickContact(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Quick contact submitted', data);
    alert('Thanks — we will contact you shortly.');
    form.reset();
}

function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    const payload = { name, email, company, service, message };
    console.log('Contact form payload', payload);
    alert('Thanks, ' + (name || 'there') + '! We received your message and will be in touch.');
    e.target.reset();
}


// Navbar toggle integration
(function () {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav') || document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    // Ensure nav has the expected id for aria-controls
    if (!nav.id) nav.id = 'mainNav';

    function openNav() {
        nav.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation');
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKeyDown);
    }

    function closeNav() {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        document.removeEventListener('click', onDocClick);
        document.removeEventListener('keydown', onKeyDown);
    }

    function onDocClick(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            closeNav();
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') closeNav();
    }

    toggle.addEventListener('click', function (e) {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) closeNav(); else openNav();
    });

    // Close when a link is clicked on mobile
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && window.innerWidth <= 980) {
            closeNav();
        }
    });

    // Optional: close on resize to avoid stuck state
    window.addEventListener('resize', function () {
        if (window.innerWidth > 980) {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open navigation');
        }
    });
})();
