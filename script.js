// Product array
const products = [
    { id: 1, name: 'Timberland', price: 10, image: 'images/sh1.webp' },
    { id: 2, name: 'Cole Haan', price: 22, image: 'images/sh2.webp' },
    { id: 3, name: 'Geox', price: 31, image: 'images/sh3.webp' },
    { id: 4, name: 'Pepe Jeans', price: 43, image: 'images/sh4.webp' },
    { id: 5, name: 'Superga', price: 72, image: 'images/sh5.webp' },
    { id: 6, name: 'Marc O Polo', price: 49, image: 'images/sh6.webp' }
];

// Load products into the product list page
function loadProducts() {
    const productList = document.querySelector('.product-list');
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

//
let cuonter =document.querySelector(".counter")
//

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                <input type="number" value="${item.quantity}" min="1" id="quantity-${item.id}" readonly>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 'increase')">+</button>
                <button onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        // Calculate total price and total items
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    // Add total items and total price to the cart
    const totalsDiv = document.createElement('div');
    totalsDiv.classList.add('cart-totals');
    totalsDiv.innerHTML = `
        <div class="total-items">
            <i class="fa-solid fa-cart-shopping shop_icon"> </i>
            <div class="total_products"><p>${totalItems}</p> </div>
        </div>
        <div class="total-price">
            <strong>Total Price: </strong> $${totalPrice.toFixed(2)}
        </div>
    `;
    cartContainer.appendChild(totalsDiv);
    cuonte.innerHTML +=totalPrice.toFixed(2)
   
}


// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        alert('This product is already in your cart.');
        return;
    }

    // Add product to cart with quantity 1
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}


// Update product quantity in the cart
function updateQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        const product = cart[productIndex];
        if (action === 'increase') {
            product.quantity++;
        } else if (action === 'decrease' && product.quantity > 1) {
            product.quantity--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Initialize the product listing page or cart page based on the URL
if (window.location.pathname.includes('index.html')) {
    loadProducts();
} else if (window.location.pathname.includes('cart.html')) {
    loadCart();
}


// Function to show the custom alert message
function showAlert(message) {
    const alertModal = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertModal.style.display = "block";
}

// Function to close the alert modal
function closeAlert() {
    const alertModal = document.getElementById('customAlert');
    alertModal.style.display = "none";
}

// Close the alert modal when the user clicks on the close button
document.getElementById('closeAlert').addEventListener('click', closeAlert);

// Example of using the custom alert
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        showAlert('This product is already in your cart.');
        return;
    }

    // Add product to cart with quantity 1
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    showAlert(`${product.name} added to cart!`);
}
