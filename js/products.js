let currentProducts = [...products];

// Render products grid
function renderProducts(productList) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    if (productList.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-4x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productList.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm product-card">
                <img src="${product.image}" class="card-img-top p-3" alt="${product.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h6 class="card-title fw-bold">${product.name}</h6>
                    <p class="text-muted small">${product.brand}</p>
                    <p class="card-text text-primary fw-bold fs-5">Rs. ${product.price.toLocaleString()}</p>
                    <div class="d-grid">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter and sort products
function filterAndSortProducts() {
    let filtered = [...products];
    
    // Search filter
    const searchTerm = document.getElementById('search-filter')?.value.toLowerCase() || '';
    if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
    }
    
    // Brand filter
    const brand = document.getElementById('brand-filter')?.value || '';
    if (brand) {
        filtered = filtered.filter(p => p.brand === brand);
    }
    
    // Price filter
    const maxPrice = parseInt(document.getElementById('price-filter')?.value) || 600000;
    filtered = filtered.filter(p => p.price <= maxPrice);
    
    // RAM filter
    const ram = document.getElementById('ram-filter')?.value || '';
    if (ram) {
        filtered = filtered.filter(p => p.specs.ram === ram);
    }
    
    // Storage filter
    const storage = document.getElementById('storage-filter')?.value || '';
    if (storage) {
        filtered = filtered.filter(p => p.specs.storage === storage);
    }
    
    // Sorting
    const sortBy = document.getElementById('sort-by')?.value || 'default';
    switch(sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }
    
    renderProducts(filtered);
}

// Initialize products page
if (window.location.pathname.includes('products.html')) {
    // Initial render
    renderProducts(products);
    
    // Add event listeners
    const filters = ['search-filter', 'brand-filter', 'price-filter', 'ram-filter', 'storage-filter', 'sort-by'];
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('input', filterAndSortProducts);
            element.addEventListener('change', filterAndSortProducts);
        }
    });
    
    // Price range display
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('input', (e) => {
            document.getElementById('price-value').textContent = `Rs. ${parseInt(e.target.value).toLocaleString()}`;
            filterAndSortProducts();
        });
    }
    
    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (document.getElementById('search-filter')) document.getElementById('search-filter').value = '';
            if (document.getElementById('brand-filter')) document.getElementById('brand-filter').value = '';
            if (document.getElementById('price-filter')) document.getElementById('price-filter').value = '600000';
            if (document.getElementById('ram-filter')) document.getElementById('ram-filter').value = '';
            if (document.getElementById('storage-filter')) document.getElementById('storage-filter').value = '';
            if (document.getElementById('sort-by')) document.getElementById('sort-by').value = 'default';
            if (document.getElementById('price-value')) document.getElementById('price-value').textContent = 'Rs. 600,000';
            filterAndSortProducts();
        });
    }
}

// Featured products on homepage
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featured = products.slice(0, 3);
        featuredContainer.innerHTML = featured.map(product => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.name}" style="height: 200px; object-fit: contain;">
                    <div class="card-body text-center">
                        <h6 class="card-title fw-bold">${product.name}</h6>
                        <p class="text-primary fw-bold">Rs. ${product.price.toLocaleString()}</p>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Global search from navbar
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('nav-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('nav-search-input').value;
            if (searchTerm) {
                localStorage.setItem('searchTerm', searchTerm);
                window.location.href = 'products.html';
            }
        });
    }
    
    // Apply search term if coming from homepage
    if (window.location.pathname.includes('products.html')) {
        const savedSearch = localStorage.getItem('searchTerm');
        if (savedSearch) {
            const searchInput = document.getElementById('search-filter');
            if (searchInput) {
                searchInput.value = savedSearch;
                localStorage.removeItem('searchTerm');
                filterAndSortProducts();
            }
        }
    }
});