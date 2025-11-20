class Product {
  constructor(id, name, price, discount, category, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.category = category;
    this.image = image;
  }

  finalPrice() {
    return this.price - (this.price * this.discount / 100);
  }
}

class ProductUI {
  static display(products) {
    const container = document.getElementById("productList");
    container.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        ${p.image ? `<img src="${p.image}" class="product-img">` : ""}
        <h3 class="product-title">${p.name}</h3>

        <p class="product-info">Price: ₹${p.price}</p>
        <p class="product-info">Discount: ${p.discount}%</p>
        <p class="product-info"><strong>Final Price: ₹${p.finalPrice()}</strong></p>

        <button class="btn-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn-buy" onclick="buyNow(${p.id})">Buy Now</button>
      `;

      container.appendChild(div);
    });
  }
}

// CART SYSTEM ----------------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("✔ Item added to cart");
}

function buyNow(id) {
  alert("🛒 Proceeding to checkout for product ID: " + id);
}

function updateCartCount() {
  const countElement = document.getElementById("cartCount");
  if (countElement) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    countElement.textContent = cartCount;
  }
}

// MAIN FUNCTIONALITY ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  fetch("/products.json")
    .then(res => res.json())
    .then(data => {
      let products = data.map(item => new Product(
        item.id,
        item.name,
        item.price,
        item.discount,
        item.category,
        item.image
      ));

      // Display full list
      ProductUI.display(products);

      // Filters
      const searchInput = document.getElementById("searchInput");
      const categoryFilter = document.getElementById("categoryFilter");

      // Search
      searchInput?.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        const filtered = products.filter(p =>
          p.name.toLowerCase().includes(searchText)
        );
        ProductUI.display(filtered);
      });

      // Category Filter
      categoryFilter?.addEventListener("change", () => {
        const category = categoryFilter.value;
        const filtered = products.filter(p =>
          category === "" ? true : p.category === category
        );
        ProductUI.display(filtered);
      });
    });
});
