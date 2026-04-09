// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, variantIndex, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return false;
    
    const variant = product.variants[variantIndex];
    const cart = getCart();
    
    const existingItemIndex = cart.findIndex(
        item => item.productId === productId && item.variantIndex === variantIndex
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            productName: product.name,
            variantIndex: variantIndex,
            storage: variant.storage,
            ram: variant.ram,
            color: variant.color,
            price: variant.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    return true;
}

// Remove item from cart
function removeFromCart(productId, variantIndex) {
    let cart = getCart();
    cart = cart.filter(
        item => !(item.productId === productId && item.variantIndex === variantIndex)
    );
    saveCart(cart);
    return cart;
}

// Update cart count badge
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll("#cart-count");
    badges.forEach(badge => {
        if (badge) badge.textContent = totalItems;
    });
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
}

// Initialize cart count on all pages
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});