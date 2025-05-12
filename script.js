// script.js
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

const products = [
    {
        id: 1,
        team: 'juventus',
        name: 'Juventus Home Kit 23/24',
        price: 89.99,
        image: 'juve-home.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        badge: 'Novità'
    },
    // Aggiungi altri prodotti...
];

function initializeApp() {
    renderProducts();
    loadCart();
    setupFilters();
    setupSearch();
    loadTheme();
}

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card" data-team="${product.team}">
            <div class="product-image" style="background-image: url('${product.image}')">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="size-selector">
                    ${product.sizes.map(size => `
                        <button class="size-btn" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <span class="price">€${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Implementa tutte le funzionalità: carrello, filtri, theme toggle, ricerca, ecc.

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
}

// Aggiungi funzioni per gestione carrello complesso con localStorage
// Implementa filtri per squadra
// Aggiungi animazioni
// Gestione responsive design
