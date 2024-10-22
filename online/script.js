let cart = [];

// Handle form submission for posting an ad
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const imageFile = document.getElementById('image').files[0];

    // Basic validation
    if (!title || !description || !price || !imageFile) {
        alert("Please fill out all fields and select an image.");
        return;
    }

    const adList = document.getElementById('adList');
    const adItem = document.createElement('div');
    adItem.className = 'ad';

    // Create an image element
    const img = document.createElement('img');
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result; // Set the image source to the file result
        img.alt = title; // Set alt text for accessibility
        img.classList.add('ad-image'); // Add a class for styling

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            adList.removeChild(adItem); // Remove the ad item from the list
        };

        // Create the add to cart button
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = 'Add to Cart';
        addToCartButton.className = 'add-to-cart-button';
        addToCartButton.onclick = function() {
            addToCart({ title, description, price, imgSrc: img.src });
        };

        // Create a question form
        const questionForm = document.createElement('form');
        const questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.placeholder = 'Ask a question...';
        questionInput.required = true;

        const askButton = document.createElement('button');
        askButton.type = 'submit';
        askButton.innerText = 'Ask';
        
        questionForm.appendChild(questionInput);
        questionForm.appendChild(askButton);
        
        // Handle question submission
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const questionText = questionInput.value.trim();
            if (questionText) {
                const questionItem = document.createElement('p');
                questionItem.innerText = Q: ${questionText};
                adItem.appendChild(questionItem);
                questionInput.value = ''; // Clear the input
            }
        });

        // Append everything to the adItem after the image is loaded
        adItem.innerHTML = 
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Price: $${price}</p>
        ;
        adItem.prepend(img); // Add the image to the beginning of adItem
        adItem.appendChild(deleteButton); // Add delete button
        adItem.appendChild(addToCartButton); // Add to cart button
        adItem.appendChild(questionForm); // Add question form
        adList.appendChild(adItem);
        
        // Hide the modal after submission
        document.getElementById('adForm').style.display = 'none';
    };

    // Read the file as a Data URL
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    document.getElementById('form').reset();
});

// Add to Cart Functionality
function addToCart(ad) {
    cart.push(ad);
    alert(${ad.title} has been added to your cart!);
    updateCart();
    updateCartCount();
}

// Update the cart display
function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = ''; // Clear current cart items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = 
            <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-image">
            <div>
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
            </div>
        ;
        cartList.appendChild(cartItem);
    });
}

// Update cart item count
function updateCartCount() {
    document.getElementById('cartCount').innerText = (${cart.length} item${cart.length !== 1 ? 's' : ''});
}

// Handle Checkout
document.getElementById('checkoutButton').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Create address form
    const addressForm = document.createElement('form');
    addressForm.innerHTML = 
        <label for="street">Street Address:</label>
        <input type="text" id="street" placeholder="Enter your street address" required>
        
        <label for="city">City:</label>
        <input type="text" id="city" placeholder="Enter your city" required>
        
        <label for="state">State:</label>
        <input type="text" id="state" placeholder="Enter your state" required>
        
        <label for="zip">ZIP Code:</label>
        <input type="text" id="zip" placeholder="Enter your ZIP code" required>
        
        <button type="submit">Proceed to Payment</button>
    ;

    addressForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const street = document.getElementById('street').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const zip = document.getElementById('zip').value.trim();

        // Validate address fields
        if (!street || !city || !state || !zip) {
            alert("Please fill out all address fields.");
            return;
        }

        // Gather order details
        let orderDetails = "Your Order:\n";
        cart.forEach(item => {
            orderDetails += ${item.title} - $${item.price}\n;
        });
        orderDetails += "Total: $" + cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

        // Prompt for payment details
        const paymentDetails = prompt("Please enter your payment details (e.g., credit card number):");
        if (paymentDetails) {
            alert("Order placed successfully!\n" + orderDetails + \nAddress: ${street}, ${city}, ${state} ${zip}\nPayment details: ${paymentDetails});
            cart = []; // Clear the cart
            document.getElementById('cartList').innerHTML = ''; // Clear cart display
            updateCartCount(); // Update cart count display
        } else {
            alert("Payment details are required to complete the order.");
        }
    });

    // Show the address form
    document.body.appendChild(addressForm);
});
