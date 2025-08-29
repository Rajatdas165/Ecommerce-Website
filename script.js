// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// Render products
if (document.getElementById('productList')) {
  const productList = document.getElementById('productList');
  const searchBar = document.getElementById('searchBar');
  function displayProducts(filter = "") {
    productList.innerHTML = "";
    products
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(p => {
        let div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="images/${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        `;
        productList.appendChild(div);
      });
  }
  displayProducts();
  searchBar.addEventListener('input', e => displayProducts(e.target.value));
}

// Render cart
if (document.getElementById('cartItems')) {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach(p => {
    let div = document.createElement('div');
    div.innerHTML = `<p>${p.name} - ₹${p.price}</p>`;
    cartItems.appendChild(div);
    total += p.price;
  });
  cartTotal.innerText = "Total: ₹" + total;
}

// Checkout form
if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
  });
}
