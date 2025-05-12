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
    {
        id: 2,
        team: 'inter',
        name: 'Inter Milan Away Kit 23/24',
        price: 84.99,
        image: 'inter-away.jpg',
        sizes: ['M', 'L', 'XL'],
        badge: 'Ultimi pezzi'
    },
    {
        id: 3,
        team: 'milan',
        name: 'AC Milan Third Kit 23/24',
        price: 79.99,
        image: 'milan-third.jpg',
        sizes: ['S', 'M', 'L']
    },
    {
        id: 4,
        team: 'napoli',
        name: 'Napoli Home Kit 23/24',
        price: 89.99,
        image: 'napoli-home.jpg',
        sizes: ['S', 'M', 'XL'],
        badge: 'Sconto 20%'
    },
    {
        id: 5,
        team: 'roma',
        name: 'AS Roma Special Kit 23/24',
        price: 94.99,
        image: 'roma-special.jpg',
        sizes: ['M', 'L']
    },
    {
        id: 6,
        team: 'lazio',
        name: 'Lazio Fourth Kit 23/24',
        price: 87.99,
        image: 'lazio-fourth.jpg',
        sizes: ['S', 'M', 'L', 'XL']
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initializeApp() {
    renderProducts();
    setupFilters();
    setupSearch();
    loadTheme();
    updateCartCount();
}

function renderProducts(filteredProducts = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-team="${product.team}">
            <div class="product-image" style="background-image: url('${product.image}')">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="size-selector">
                    ${product.sizes.map(size => `
                        <button class="size-btn" 
                                data-size="${size}" 
                                onclick="selectSize(this, ${product.id})">
                            ${size}
                        </button>
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

// Gestione Carrello
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSize = document.querySelector(`[data-product="${productId}"].selected`);
    
    if (!selectedSize) {
        alert('Seleziona una taglia!');
        return;
    }

    const cartItem = {
        ...product,
        size: selectedSize.dataset.size,
        quantity: 1
    };

    const existingItem = cart.find(item => 
        item.id === productId && item.size === cartItem.size
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    updateCart();
    showCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="60">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Taglia: ${item.size} - Quantità: 
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </p>
                <span class="item-price">€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <i class="fas fa-times remove-item" onclick="removeItem(${index})"></i>
        </div>
    `).join('');

    document.getElementById('cart-total').textContent = 
        `€${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart.splice(index, 1);
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Filtri e Ricerca
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            const team = button.dataset.team;
            const filtered = team === 'all' 
                ? products 
                : products.filter(p => p.team === team);
            
            renderProducts(filtered);
        });
    });
}

function setupSearch() {
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.team.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// Tema
function toggleTheme() {
    const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
}

// Utilità
function selectSize(btn, productId) {
    btn.parentNode.querySelectorAll('.size-btn').forEach(b => 
        b.classList.remove('selected'));
    btn.classList.add('selected');
    btn.dataset.product = productId;
}

function toggleCart() {
    document.querySelector('.cart-sidebar').classList.toggle('active');
    renderCartItems();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

function startCheckout() {
    if (cart.length === 0) {
        alert('Il carrello è vuoto!');
        return;
    }
    // Implementa logica di checkout reale
    alert(`Ordine completato! Totale: €${cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0).toFixed(2)}\nGrazie per l'acquisto!`);
    cart = [];
    updateCart();
}
