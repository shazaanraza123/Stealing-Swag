document.addEventListener('DOMContentLoaded', () => {
    // Banner close functionality
    const banner = document.querySelector('.top-banner');
    const closeBanner = document.querySelector('.close-banner');
    
    if (closeBanner && banner) {
        closeBanner.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }

    // Smooth scrolling for navigation
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

    // Hover effects for navigation items
    const navLinks = document.querySelectorAll('.nav-sections a, .nav-actions a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.opacity = '1';
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    const sections = document.querySelectorAll('.featured-work, .categories');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Mobile menu toggle (to be implemented)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.main-nav').prepend(mobileMenuButton);

    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.nav-sections').classList.toggle('show');
        document.querySelector('.nav-actions').classList.toggle('show');
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });

    // Bookmark functionality
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            bookmarkBtn.classList.toggle('active');
            const icon = bookmarkBtn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    }

    // Carousel scroll hiding functionality
    let lastScrollTop = 0;
    const carousel = document.querySelector('.language-carousel');
    const body = document.body;
    const scrollThreshold = 10; // Minimum scroll amount to trigger hide/show

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scrolling down
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            carousel.classList.add('hidden');
            body.classList.add('carousel-hidden');
        }
        // Scrolling up and at top
        else if (scrollTop < lastScrollTop && scrollTop < scrollThreshold) {
            carousel.classList.remove('hidden');
            body.classList.remove('carousel-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // Remove any menu buttons that might be added dynamically
    function removeMenuButtons() {
        const menuButtons = document.querySelectorAll('button[type="menu"], [role="menu"], .menu-icon, .menu-button, .hamburger-menu');
        menuButtons.forEach(button => button.remove());
    }

    // Run initially
    removeMenuButtons();

    // Create an observer to watch for dynamically added elements
    const menuObserver = new MutationObserver(function(mutations) {
        removeMenuButtons();
    });

    // Start observing the document with the configured parameters
    menuObserver.observe(document.body, { childList: true, subtree: true });
});

// Prevent default menu behavior
document.addEventListener('click', function(e) {
    if (e.target.matches('button[type="menu"], [role="menu"], .menu-icon, .menu-button, .hamburger-menu')) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true); 