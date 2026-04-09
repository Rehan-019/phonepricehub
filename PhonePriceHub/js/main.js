// Global helper functions
function formatPrice(price) {
    return 'Rs. ' + price.toLocaleString('en-PK');
}

function showToast(message, type = 'success') {
    // Simple alert for now (can be enhanced with Bootstrap toasts)
    alert(message);
}

// Search functionality for homepage
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on all pages
    updateCartCount();
    
    // Add to cart buttons for any dynamic elements
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            const variantIndex = parseInt(e.target.dataset.variantIndex) || 0;
            addToCart(productId, variantIndex, 1);
            showToast('Product added to cart!');
        }
    });
});