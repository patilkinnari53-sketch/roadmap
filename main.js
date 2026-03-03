// ===== MAIN.JS - Core Functionality =====

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const backToTop = document.getElementById('backToTop');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    loadUserState();
});

// Mobile Menu
function initMobileMenu() {
    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
            document.body.style.overflow = '';
        });

        // Close on outside click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('-translate-x-full');
                document.body.style.overflow = '';
            }
        });
    }
}

// Back to Top Button
function initBackToTop() {
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.remove('opacity-0', 'translate-y-4');
                backToTop.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTop.classList.remove('opacity-100', 'translate-y-0');
                backToTop.classList.add('opacity-0', 'translate-y-4');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Load user state from localStorage
function loadUserState() {
    const user = localStorage.getItem('user');
    if (user) {
        updateAuthUI(JSON.parse(user));
    }
}

// Update Auth UI based on user state
function updateAuthUI(user) {
    const desktopAuth = document.getElementById('desktopAuth');
    const mobileAuth = document.getElementById('mobileAuth');
    
    if (desktopAuth && user) {
        desktopAuth.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <span class="font-medium">${user.name}</span>
                <button onclick="logout()" class="text-red-500 hover:text-red-600">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    }
    
    if (mobileAuth && user) {
        mobileAuth.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center space-x-3 p-4 bg-primary-50 rounded-xl">
                    <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-semibold">${user.name}</p>
                        <p class="text-sm text-slate-500">${user.email}</p>
                    </div>
                </div>
                <button onclick="logout()" class="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
                    <i class="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
            </div>
        `;
    }
}

// Logout function
window.logout = function() {
    localStorage.removeItem('user');
    window.location.reload();
};

// Lazy loading images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
