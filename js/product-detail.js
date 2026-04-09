// Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Render product detail page
function renderProductDetail() {
    const productId = getProductIdFromURL();
    const product = getProductById(productId);
    const container = document.getElementById('product-detail-container');
    
    if (!product || !container) {
        container.innerHTML = '<div class="alert alert-danger">Product not found!</div>';
        return;
    }
    
    // Store current product for variant selection
    window.currentProduct = product;
    window.selectedVariantIndex = 0;
    
    // Render main product info
    container.innerHTML = `
        <div class="row">
            <div class="col-md-5">
                <img src="${product.image}" class="img-fluid rounded shadow" alt="${product.name}">
            </div>
            <div class="col-md-7">
                <h2 class="fw-bold">${product.name}</h2>
                <p class="text-muted">${product.brand}</p>
                <h3 class="text-primary mb-3">Rs. <span id="product-price">${product.price.toLocaleString()}</span></h3>
                
                <div class="mb-3">
                    <label class="fw-bold">Storage & RAM:</label>
                    <div id="variant-selector" class="mt-2">
                        ${product.variants.map((variant, index) => `
                            <button class="btn btn-outline-primary m-1 variant-btn" data-index="${index}">
                                ${variant.storage} / ${variant.ram} / ${variant.color}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mb-3">
                    <label class="fw-bold">Quantity:</label>
                    <input type="number" id="quantity" class="form-control" style="width: 100px;" value="1" min="1">
                </div>
                
                <div class="mb-4">
                    <button id="add-to-cart-btn" class="btn btn-primary btn-lg me-2">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                    <button id="buy-now-btn" class="btn btn-success btn-lg">
                        <i class="fas fa-bolt me-2"></i>Buy Now
                    </button>
                </div>
                
                <div class="alert alert-success">
                    <i class="fas fa-truck me-2"></i>Free Delivery on orders over Rs. 50,000
                </div>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-12">
                <h4 class="fw-bold">Specifications</h4>
                <table class="table table-bordered">
                    <tr><th style="width: 30%;">Display</th><td>${product.specs.display}</td></tr>
                    <tr><th>Processor</th><td>${product.specs.processor}</td></tr>
                    <tr><th>RAM</th><td>${product.specs.ram}</td></tr>
                    <tr><th>Storage</th><td>${product.specs.storage}</td></tr>
                    <tr><th>Battery</th><td>${product.specs.battery}</td></tr>
                    <tr><th>Camera</th><td>${product.specs.camera}</td></tr>
                    <tr><th>Operating System</th><td>${product.specs.os}</td></tr>
                    <tr><th>Weight</th><td>${product.specs.weight}</td></tr>
                    <tr><th>Colors</th><td>${product.specs.colors.join(', ')}</td></tr>
                </table>
            </div>
        </div>
    `;
    
    // Add variant button event listeners
    document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            window.selectedVariantIndex = index;
            const variant = product.variants[index];
            document.getElementById('product-price').textContent = variant.price.toLocaleString();
            
            // Update active button style
            document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('btn-primary', 'active'));
            document.querySelectorAll('.variant-btn').forEach(b => b.classList.add('btn-outline-primary'));
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary', 'active');
        });
    });
    
    // Set first variant as active
    if (document.querySelector('.variant-btn')) {
        document.querySelector('.variant-btn').click();
    }
    
    // Add to cart functionality
    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, window.selectedVariantIndex, quantity);
        alert('Product added to cart!');
    });
    
    // Buy now functionality
    document.getElementById('buy-now-btn')?.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, window.selectedVariantIndex, quantity);
        window.location.href = 'checkout.html';
    });
}

// Initialize product detail page
if (window.location.pathname.includes('product-detail.html')) {
    renderProductDetail();
}