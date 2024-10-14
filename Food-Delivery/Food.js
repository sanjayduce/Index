
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
            { name: "California Roll", price: 8, image: "Californiaroll.webp" },
            { name: "Sashimi", price: 15, image: "Sashmi.jpg" },
            { name: "Miso Soup", price: 5, image: "Miso.jpg" }
        ]
    },
    3: {
        name: "Burger Joint",
        image: "Burgerjoint.avif",
        menu: [
            { name: "Cheeseburger", price: 9, image: "Cheeseburger.jpg" },
            { name: "Fries", price: 3, image: "Fries.jpg" },
            { name: "Milkshake", price: 4, image: "Milkshake.jpg" }
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

let cart = [];

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
    alert("Proceeding to checkout!");
    // Additional checkout functionality can be added here
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});
