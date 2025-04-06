document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        const header = tab.querySelector('.tab-header');
        const content = tab.querySelector('.tab-content');
        const icon = header.querySelector('i');

        header.addEventListener('click', () => {
            content.classList.toggle('active');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });

    // Image gallery
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            mainImage.alt = thumb.alt;
        });
    });

    // Size selector validation
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');
    const sizeSelect = document.querySelector('#size');

    function validateSize() {
        if (!sizeSelect.value) {
            alert('Please select a size');
            return false;
        }
        return true;
    }

    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateSize()) {
            // Add to cart functionality would go here
            alert('Added to cart!');
        }
    });

    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateSize()) {
            // Buy now functionality would go here
            alert('Proceeding to checkout!');
        }
    });

    // Bookmark functionality
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = bookmarkBtn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        // Bookmark functionality would go here
    });
}); 