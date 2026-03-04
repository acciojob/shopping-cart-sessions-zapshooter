// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];
// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");
// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  // Add event listeners to add buttons
  const addBtns = document.querySelectorAll(".add-to-cart-btn");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
}
// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
  // Add event listeners to remove buttons
  const removeBtns = document.querySelectorAll(".remove-from-cart-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}
// Add item to cart
function addToCart(productId) {
  let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === Number(productId));
  cart.push({ ...product });
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
// Remove item from cart (removes all instances of this product ID)
function removeFromCart(productId) {
  let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== Number(productId));
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
// Clear cart
function clearCart() {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}
// Add event listener for clear cart button
clearCartBtn.addEventListener("click", clearCart);
// Initial render
renderProducts();
renderCart();