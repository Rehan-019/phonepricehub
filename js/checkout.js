// Display checkout items
function displayCheckoutItems() {
    const cart = getCart();
    const container = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between mb-2">
            <span>${item.productName} x${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
        <small class="text-muted d-block mb-2">${item.storage} / ${item.ram} / ${item.color}</small>
    `).join('');
    
    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 50000 ? 0 : 500;
    const total = subtotal + deliveryFee;
    
    document.getElementById('checkout-subtotal').textContent = subtotal.toLocaleString();
    document.getElementById('checkout-delivery').textContent = deliveryFee.toLocaleString();
    document.getElementById('checkout-total').textContent = total.toLocaleString();
}

// Toggle card details
function toggleCardDetails() {
    const cardRadio = document.getElementById('card');
    const cardDetails = document.getElementById('card-details');
    
    if (cardRadio && cardDetails) {
        cardRadio.addEventListener('change', () => {
            cardDetails.style.display = 'block';
        });
        
        document.getElementById('cod')?.addEventListener('change', () => {
            cardDetails.style.display = 'none';
        });
    }
}

// Validate shipping form
function validateShippingForm() {
    const name = document.getElementById('full-name')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    
    if (!name || !phone || !address || !city) {
        alert('Please fill all required fields (Name, Phone, Address, City)');
        return false;
    }
    
    if (phone.length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

// Validate card details if card payment selected
function validateCardDetails() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number')?.value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry')?.value;
        const cvv = document.getElementById('cvv')?.value;
        
        if (!cardNumber || cardNumber.length < 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        
        if (!expiry || !expiry.match(/^\d{2}\/\d{2}$/)) {
            alert('Please enter valid expiry date (MM/YY)');
            return false;
        }
        
        if (!cvv || cvv.length < 3) {
            alert('Please enter valid CVV');
            return false;
        }
    }
    
    return true;
}

// Place order
function placeOrder() {
    if (!validateShippingForm()) return;
    if (!validateCardDetails()) return;
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 50000 ? 0 : 500;
    const total = subtotal + deliveryFee;
    
    const order = {
        id: 'PPH' + Date.now(),
        items: cart,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleString(),
        shippingInfo: {
            name: document.getElementById('full-name')?.value,
            phone: document.getElementById('phone')?.value,
            email: document.getElementById('email')?.value,
            address: document.getElementById('address')?.value,
            city: document.getElementById('city')?.value,
            state: document.getElementById('state')?.value,
            zip: document.getElementById('zip')?.value
        }
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', orders);
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Clear cart
    clearCart();
    
    // Show success message based on payment method
    if (paymentMethod === 'cod') {
        alert(`Order placed successfully!\nOrder ID: ${order.id}\nAmount to pay: Rs. ${total.toLocaleString()}\nYou will pay cash on delivery.`);
    } else {
        alert(`Payment processed successfully!\nOrder ID: ${order.id}\nAmount paid: Rs. ${total.toLocaleString()}`);
    }
    
    // Redirect to confirmation page
    window.location.href = 'order-confirm.html';
}

// Initialize checkout page
if (window.location.pathname.includes('checkout.html')) {
    displayCheckoutItems();
    toggleCardDetails();
    
    document.getElementById('place-order-btn')?.addEventListener('click', placeOrder);
}