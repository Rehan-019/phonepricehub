const products = [
    {
        id: 1,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        price: 384999,
        image: "assets/images/s24-ultra.jpg",
        specs: {
            display: "6.8-inch Dynamic AMOLED 2X, 120Hz, 3120 x 1440 pixels",
            processor: "Snapdragon 8 Gen 3 (4nm)",
            ram: "12GB",
            storage: "256GB",
            battery: "5000mAh",
            camera: "200MP + 50MP + 12MP + 10MP",
            os: "Android 14, One UI 6.1",
            weight: "232g",
            colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"]
        },
        variants: [
            { storage: "256GB", ram: "12GB", price: 384999, color: "Titanium Gray" },
            { storage: "512GB", ram: "12GB", price: 414999, color: "Titanium Black" },
            { storage: "1TB", ram: "12GB", price: 464999, color: "Titanium Violet" }
        ]
    },
    {
        id: 2,
        name: "Apple iPhone 15 Pro Max",
        brand: "Apple",
        price: 459999,
        image: "assets/images/iphone15pm.jpg",
        specs: {
            display: "6.7-inch Super Retina XDR, 120Hz, 2796 x 1290 pixels",
            processor: "A17 Pro (3nm)",
            ram: "8GB",
            storage: "256GB",
            battery: "4422mAh",
            camera: "48MP + 12MP + 12MP",
            os: "iOS 17",
            weight: "221g",
            colors: ["Natural Titanium", "White Titanium", "Black Titanium", "Blue Titanium"]
        },
        variants: [
            { storage: "256GB", ram: "8GB", price: 459999, color: "Natural Titanium" },
            { storage: "512GB", ram: "8GB", price: 529999, color: "White Titanium" },
            { storage: "1TB", ram: "8GB", price: 599999, color: "Black Titanium" }
        ]
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        price: 279999,
        image: "assets/images/pixel8pro.jpg",
        specs: {
            display: "6.7-inch LTPO OLED, 120Hz, 2992 x 1344 pixels",
            processor: "Google Tensor G3",
            ram: "12GB",
            storage: "128GB",
            battery: "5050mAh",
            camera: "50MP + 48MP + 48MP",
            os: "Android 14",
            weight: "213g",
            colors: ["Obsidian", "Porcelain", "Bay"]
        },
        variants: [
            { storage: "128GB", ram: "12GB", price: 279999, color: "Obsidian" },
            { storage: "256GB", ram: "12GB", price: 304999, color: "Porcelain" },
            { storage: "512GB", ram: "12GB", price: 339999, color: "Bay" }
        ]
    },
    {
        id: 4,
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 229999,
        image: "assets/images/oneplus12.jpg",
        specs: {
            display: "6.82-inch LTPO AMOLED, 120Hz, 3168 x 1440 pixels",
            processor: "Snapdragon 8 Gen 3",
            ram: "12GB",
            storage: "256GB",
            battery: "5400mAh",
            camera: "50MP + 64MP + 48MP",
            os: "Android 14, OxygenOS 14",
            weight: "220g",
            colors: ["Flowy Emerald", "Silky Black"]
        },
        variants: [
            { storage: "256GB", ram: "12GB", price: 229999, color: "Flowy Emerald" },
            { storage: "512GB", ram: "16GB", price: 259999, color: "Silky Black" }
        ]
    },
    {
        id: 5,
        name: "Xiaomi 14 Ultra",
        brand: "Xiaomi",
        price: 299999,
        image: "assets/images/xiaomi14.jpg",
        specs: {
            display: "6.73-inch LTPO AMOLED, 120Hz, 3200 x 1440 pixels",
            processor: "Snapdragon 8 Gen 3",
            ram: "16GB",
            storage: "512GB",
            battery: "5000mAh",
            camera: "50MP + 50MP + 50MP + 50MP",
            os: "Android 14, HyperOS",
            weight: "229g",
            colors: ["Black", "White"]
        },
        variants: [
            { storage: "512GB", ram: "16GB", price: 299999, color: "Black" },
            { storage: "1TB", ram: "16GB", price: 329999, color: "White" }
        ]
    },
    {
        id: 6,
        name: "Tecno Camon 30 Premier",
        brand: "Tecno",
        price: 89999,
        image: "assets/images/tecno30.jpg",
        specs: {
            display: "6.77-inch AMOLED, 120Hz, 2436 x 1080 pixels",
            processor: "MediaTek Dimensity 8200",
            ram: "12GB",
            storage: "512GB",
            battery: "5000mAh",
            camera: "50MP + 50MP + 50MP",
            os: "Android 14",
            weight: "210g",
            colors: ["Honeycomb Green", "Black"]
        },
        variants: [
            { storage: "512GB", ram: "12GB", price: 89999, color: "Honeycomb Green" },
            { storage: "512GB", ram: "12GB", price: 89999, color: "Black" }
        ]
    },
    
    {
        id: 7,
        name: "Vivo X100 Pro",
        brand: "Vivo",
        price: 199999,
        image: "assets/images/vivo-x100.jpg",
        fallbackIcon: "fas fa-mobile-alt",
        specs: {
            display: "6.78-inch AMOLED, 120Hz, 2800 x 1260 pixels",
            processor: "MediaTek Dimensity 9300",
            ram: "12GB",
            storage: "256GB",
            battery: "5400mAh, 100W charging",
            camera: "50MP + 50MP + 50MP Zeiss Camera",
            os: "Android 14, Funtouch OS 14",
            weight: "221g",
            colors: ["Black", "White", "Blue"]
    },
        variants: [
            { storage: "256GB", ram: "12GB", price: 199999, color: "Black" },
            { storage: "512GB", ram: "12GB", price: 229999, color: "White" },
            { storage: "512GB", ram: "16GB", price: 249999, color: "Blue" }
        ]
    }
];

// Helper function to get product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}