// Product data
const products = [
  {
    id: 1,
    name: "Pizza",
    price: 15.99,
    image: "img/restaurant-2.png",
  },
  {
    id: 2,
    name: "Burger",
    price: 10,
    image: "img/restaurant-3.png",
  },
  {
    id: 3,
    name: "Nuggets",
    price: 5.99,
    image: "img/nuggets.webp",
  },
  {
    id: 4,
    name: "French Fries",
    price: 5.99,
    image: "img/french-fries.jpg",
  },
  {
    id: 5,
    name: "Fried Chichken",
    price: 15.99,
    image: "img/restaurant-6.png",
  },
  {
    id: 6,
    name: "Hot-Dog",
    price: 8.99,
    image: "img/hot-dog.jpg",
  },
]

// Cart state
let cart = []

// DOM elements
const productGrid = document.getElementById("productGrid")
const cartOverlay = document.getElementById("cartOverlay")
const cartItems = document.getElementById("cartItems")
const cartCount = document.getElementById("cartCount")
const cartTotal = document.getElementById("cartTotal")
const checkoutBtn = document.getElementById("checkoutBtn")
const popupOverlay = document.getElementById("popupOverlay")
const orderTotal = document.getElementById("orderTotal")

// Initialize the app
function init() {
  renderProducts()
  updateCartUI()
}

// Render products
function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `,
    )
    .join("")
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  updateCartUI()

  // Add visual feedback
  const btn = event.target
  const originalText = btn.textContent
  btn.textContent = "Added!"
  btn.style.background = "#27ae60"

  setTimeout(() => {
    btn.textContent = originalText
    btn.style.background = "#3498db"
  }, 1000)
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartUI()
}

// Update item quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartUI()
    }
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total.toFixed(2)

  // Update checkout button state
  checkoutBtn.disabled = cart.length === 0

  // Render cart items
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>Qty: ${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Toggle cart visibility
function toggleCart() {
  cartOverlay.classList.toggle("active")
}

// Close cart
function closeCart() {
  cartOverlay.classList.remove("active")
}

// Checkout function
function checkout() {
  if (cart.length === 0) return

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  orderTotal.textContent = total.toFixed(2)

  // Show success popup
  popupOverlay.classList.add("active")

  // Clear cart
  cart = []
  updateCartUI()
  closeCart()
}

// Close popup
function closePopup() {
  popupOverlay.classList.remove("active")
}

// Close popup when clicking outside
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closePopup()
  }
})

// Close cart when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart()
    closePopup()
  }
})

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
