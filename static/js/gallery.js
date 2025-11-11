document.addEventListener('DOMContentLoaded', function() {
    // Masonry layout function - sets row spans based on image heights
    function resizeGridItem(item) {
        const grid = document.querySelector('.gallery-grid');
        if (!grid) return;

        const rowHeight = 1; // matches grid-auto-rows: 1px
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap')) || 16;

        const img = item.querySelector('img');
        if (img && img.complete && img.naturalHeight > 0) {
            // Use actual rendered height of the image
            const height = img.getBoundingClientRect().height;
            const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = 'span ' + rowSpan;
        }
    }

    function resizeAllGridItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            // Only calculate for visible items
            if (item.style.display !== 'none') {
                resizeGridItem(item);
            }
        });
    }

    // Load all images and then apply masonry layout
    function initMasonry() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (galleryItems.length === 0) return;

        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;

            if (img.complete && img.naturalHeight > 0) {
                // Image already loaded
                resizeGridItem(item);
            } else {
                // Wait for image to load
                img.addEventListener('load', function() {
                    resizeGridItem(item);
                });
                // Handle image load errors
                img.addEventListener('error', function() {
                    console.warn('Failed to load image:', img.src);
                });
            }
        });
    }

    // Gallery filter and pagination functionality
    const filterContainer = document.getElementById('filterBtnContainer');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewMoreContainer = document.getElementById('viewMoreContainer');
    const IMAGES_PER_PAGE = 12;
    let currentFilter = 'all';
    let visibleCount = IMAGES_PER_PAGE;

    // Function to get filtered items
    function getFilteredItems() {
        return Array.from(galleryItems).filter(item => {
            return currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
        });
    }

    // Function to update gallery display with pagination
    function updateGalleryDisplay() {
        const filteredItems = getFilteredItems();

        // Hide all items first
        galleryItems.forEach(item => item.style.display = 'none');

        // Show only the visible filtered items
        filteredItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = 'block';
            }
        });

        // Show/hide "View More" button
        if (viewMoreContainer) {
            viewMoreContainer.style.display = filteredItems.length > visibleCount ? 'block' : 'none';
        }

        // Recalculate masonry after display changes
        setTimeout(resizeAllGridItems, 50);
    }

    // Initialize gallery display
    updateGalleryDisplay();

    // Gallery filter functionality
    if (filterContainer) {
        filterContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Remove active class from all buttons
                const activeBtn = filterContainer.querySelector('.active');
                if (activeBtn) {
                    activeBtn.classList.remove('active');
                }

                // Add active class to clicked button
                e.target.classList.add('active');

                // Update filter and reset pagination
                currentFilter = e.target.getAttribute('data-filter');
                visibleCount = IMAGES_PER_PAGE;
                updateGalleryDisplay();
            }
        });
    }

    // View More button functionality
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            visibleCount += IMAGES_PER_PAGE;
            updateGalleryDisplay();
        });
    }

    // Initialize masonry on page load
    initMasonry();

    // Recalculate on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeAllGridItems, 250);
    });
});
