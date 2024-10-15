
const restaurants = {
    1: {
        name: "Italian Bistro",
        image: "italian.jpg",
        menu: [
            { name: "Pasta Carbonara", price: 12, image: "pasta carbaro.jpg" },
            { name: "Margherita Pizza", price: 10, image: "margherita-pizza.jpg" },
            { name: "Tiramisu", price: 6, image: "Tiramisu.jpg" }
        ]
    },
    2: {
        name: "Sushi Place",
        image: "sushi.jpg",
        menu: [
            { name: "California Roll", price: 8, image: "californiaroll.webp" },
            { name: "Sashimi", price: 15, image: "Sashmi.jpg" },
            { name: "Miso Soup", price: 5, image: "miso.jpg" }
        ]
    },
    3: {
        name: "Burger Joint",
        image: "Burger joint.jpg",
        menu: [
            { name: "Cheeseburger", price: 9, image: "cheeseburger.jpg" },
            { name: "Fries", price: 3, image: "fries.jpg" },
            { name: "Milkshake", price: 4, image: "milkshake.jpg" }
        ]
    }
};

const restaurantList = document.getElementById('restaurants');
const menuSection = document.getElementById('menu');
const menuItems = document.getElementById('menu-items');
const restaurantName = document.getElementById('restaurant-name');
const restaurantImage = document.getElementById('restaurant-image');
const backButton = document.getElementById('back-button');
const cartSection = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button');
const totalBill = document.getElementById('total-bill');
const billingSection = document.getElementById('billing');
const orderSummary = document.getElementById('order-summary');
const orderTotal = document.getElementById('order-total');

let cart = [];

// Event listeners
restaurantList.addEventListener('click', (event) => {
    const restaurantId = event.target.dataset.id;
    if (restaurantId) {
        showMenu(restaurantId);
    }
});

backButton.addEventListener('click', () => {
    menuSection.classList.add('hidden');
    restaurantList.classList.remove('hidden');
});

function showMenu(id) {
    const restaurant = restaurants[id];
    restaurantName.textContent = restaurant.name;
    restaurantImage.src = restaurant.image;
    restaurantImage.alt = restaurant.name;
    menuItems.innerHTML = '';
    
    restaurant.menu.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img class="menu-item-img" src="${item.image}" alt="${item.name}"> ${item.name} - $${item.price.toFixed(2)}`;
        li.addEventListener('click', () => addToCart(item));
        menuItems.appendChild(li);
    });
    
    menuSection.classList.remove('hidden');
    restaurantList.classList.add('hidden');
    cartSection.classList.add('hidden');
}

function addToCart(item) {
    cart.push(item);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img class="menu-item-img" src="${item.image}" alt="${item.name}"> 
            ${item.name} - $${item.price.toFixed(2)} 
            <button class="remove-button" data-index="${index}">Remove</button>`;
        
        li.querySelector('.remove-button').addEventListener('click', () => removeFromCart(index));
        cartItems.appendChild(li);
        total += item.price;
    });
    totalBill.textContent = `Total: $${total.toFixed(2)}`;
    cartSection.classList.remove('hidden');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        showOrderSummary();
        cartSection.classList.add('hidden');
        billingSection.classList.remove('hidden');
    } else {
        alert("Your cart is empty!");
    }
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

function showOrderSummary() {
    orderSummary.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        orderSummary.appendChild(li);
        total += item.price;
    });
    orderTotal.textContent = `Order Total: $${total.toFixed(2)}`;
}

document.getElementById('billing-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expDate = document.getElementById('exp-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Input validation
    if (!name || !address || !city || !state || !zip || !cardNumber || !expDate || !cvv) {
        alert("Please fill out all fields.");
        return;
    }

    // Display a confirmation message
    alert(`Thank you for your order, ${name}!\nYour order will be shipped to ${address}, ${city}, ${state}, ${zip}.\nCard ending in ${cardNumber.slice(-4)} will be charged.`);

    // Reset form and cart
    document.getElementById('billing-form').reset();
    cart = [];
    updateCart();
    billingSection.classList.add('hidden');
    restaurantList.classList.remove('hidden');
});
