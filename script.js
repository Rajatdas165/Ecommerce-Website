// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(p => p.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    product.qty = 1;
    cart.push(product);
  }
  saveCart();
  alert(product.name + " added to cart!");
  renderCart();
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
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(p => {
    let div = document.createElement('div');
    div.innerHTML = `<p>${p.name} × ${p.qty} - ₹${p.price * p.qty}</p>`;
    cartItems.appendChild(div);
    total += p.price * p.qty;
  });
  cartTotal.innerText = "Total: ₹" + total;
}
renderCart();

// Checkout form
if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
  });
}
