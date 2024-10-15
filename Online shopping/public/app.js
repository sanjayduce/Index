document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    // Function to fetch and display product listings
    const fetchProducts = () => {
      fetch('/api/products')
        .then(response => response.json())
        .then(products => {
          productList.innerHTML = ''; // Clear existing list
          products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.title} - $${product.price}`;
            
            // Add a "Buy" button for each product
            const actionButton = document.createElement('button');
            if (product.status === 'purchased') {
              actionButton.textContent = 'Purchased';
              actionButton.disabled = true;
            } else {
              actionButton.textContent = 'Buy';
              actionButton.addEventListener('click', () =>buyProduct(product._id, actionButton));
            }
            
            li.appendChild(actionButton);
            productList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching products:', error));
    };
    // Call the fetchProducts function initially and after creating a listing
    fetchProducts();
  
    // Create a new product listing
    const createListingButton = document.getElementById('create-listing-button');
    createListingButton.addEventListener('click', () => {const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
  
      const newData = {
        title: title,
        description: description,
        price: price
      };
  
      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
        .then(response => response.json())
        .then(product => {
          console.log('Product created:', product);
          // Clear input fields
          document.getElementById('title').value = '';
          document.getElementById('description').value = '';
          document.getElementById('price').value = '';
  
          // Fetch and display products after creating a listing
          fetchProducts();
        })
        .catch(error => console.error
  ('Error creating product:', error));
    });
  // Buy a product
    const buyProduct = (productId, actionButton) => {
      fetch(`/api/products/${productId}/buy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(updatedProduct => {
        console.log('Product purchased:', updatedProduct);
  
        // Update the button text to "Purchased" and disable it
        actionButton.textContent = 'Purchased';
        actionButton.disabled = true;
        
        // Optionally, you can add aCSS class to style the "Purchased" button differently
        actionButton.classList.add('purchased-button');
      })
        .catch(error => console.error
  ('Error purchasing product:',
   error));
    };
  
    // Initial fetch and display of products
    fetchProducts();
  });