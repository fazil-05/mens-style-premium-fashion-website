/* ========================================
   NAVBAR SCROLL FUNCTIONALITY
   ======================================== */
let lastScrollY = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
        navbar.classList.remove('hide'); // Scrolling up
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('hide'); // Scrolling down
    }

    lastScrollY = currentScrollY;
}, { passive: true });

/* ========================================
   MOBILE MENU FUNCTIONALITY
   ======================================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

/* ========================================
   GALLERY SCROLL FUNCTIONALITY
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const galleries = [
        { id: 'galleryScroll1', speed: 70, delay: 0, direction: 1 },
        { id: 'galleryScroll2', speed: 100, delay: 200, direction: -1 },
        { id: 'galleryScroll3', speed: 130, delay: 400, direction: 1 }
    ];

    galleries.forEach(({ id, speed, delay, direction }) => {
        const gallery = document.getElementById(id);
        if (!gallery) return;

        const items = Array.from(gallery.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            gallery.appendChild(clone);
        });

        let lastTime = null;
        let paused = false;

        gallery.addEventListener('mouseenter', () => paused = true);
        gallery.addEventListener('mouseleave', () => paused = false);

        function tick(now) {
            if (!lastTime) lastTime = now;
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            if (!paused) gallery.scrollLeft += speed * delta * direction;

            const scrollWidthOriginal = gallery.scrollWidth / 2;
            if (direction === 1 && gallery.scrollLeft >= scrollWidthOriginal) {
                gallery.scrollLeft -= scrollWidthOriginal;
            }
            if (direction === -1 && gallery.scrollLeft <= 0) {
                gallery.scrollLeft += scrollWidthOriginal;
            }

            requestAnimationFrame(tick);
        }

        function startAnimation() {
            setTimeout(() => requestAnimationFrame(tick), delay);
        }

        const imgs = Array.from(gallery.querySelectorAll('img'));
        if (imgs.length === 0 || imgs.every(img => img.complete)) {
            startAnimation();
        } else {
            window.addEventListener('load', startAnimation, { once: true });
        }
    });

    // Optional: scroll buttons for galleries
    document.querySelectorAll('.gallery-btn-left').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) target.scrollBy({ left: -400, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.gallery-btn-right').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) target.scrollBy({ left: 400, behavior: 'smooth' });
        });
    });
});

/* ========================================
   CONTACT FORM SUBMISSION
   ======================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        alert(`Thank you ${name}! We've received your message and will get back to you at ${email} soon.`);

        contactForm.reset();
    });
}

/* ========================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }

    

    });
});
