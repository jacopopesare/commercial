let cart = [];
let total = 0;

// Apre/chiude il carrello
document.querySelector('.cart-icon').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.toggle('active');
    updateCartDisplay();
});

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
}

// Aggiunge un prodotto al carrello
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCartCount();
    updateCartDisplay();
}

// Aggiorna il numero nel carrello
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Mostra i prodotti nel carrello
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Simula il checkout
function checkout() {
    if (cart.length === 0) {
        alert("Il carrello è vuoto!");
        return;
    }
    alert(`Ordine confermato! Totale: €${total.toFixed(2)}\nGrazie per l'acquisto!`);
    cart = [];
    total = 0;
    updateCartCount();
    updateCartDisplay();
    closeCart();
}
