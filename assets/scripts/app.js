class Product {
  //   title = "DEFAULT";
  //   imageUrl;
  //   description;
  //   price;

  constructor(title, image, description, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = description;
    this.price = price;
  }
}
class ElementAttribure {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender){
      this.render();
    }
    
  }

  render() {} // see that the method exists

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevVal, curItem) => prevVal + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts(){
    console.log('Ordering');
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    // const cartEl = document.createElement("section");
    cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order now!</button>
        `;
    // cartEl.className = "cart";
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts.bind(this))
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
                  <div>
                  <img src = "${this.product.imageUrl}" alt="${this.product.title}" >
                  <div class="prodcut-item__content">
                  <h2>${this.product.title}</h2>
                  <h3>\$${this.product.price}</h3>
                  <p>${this.product.description}</p>
                  <button> Add to cart</button>
                  </div>
                  </div>
                `;

    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.#fetchProducts();
  }

  #fetchProducts(){
    this.products = [      
      new Product(
      "A pillow",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDw8QEBAOEhASDw0NEA8QEBAQEBAQFREWFhUSFRMYHSggGBomGxUVITEiJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFw0PFSsZFRkrMC03KystLisrLCsrKzArKzIrKys3KzcrKysrKzIrKysrKy0rKys3KysrLSsrKystK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEAgUGB//EADcQAQACAQEFBQYEBAcAAAAAAAABAgMRBCExQVESYXGRoQVCcoGx0RMUUsEiMmLhBjNjgpKisv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFeTNWvGflG+QWDP+br0t5H5uOlvKAaBn/NR0t6fdP5qOlvT7gvFEbVX+rydRtNevpILRxXJWeEx5uwAAAAAAAAAAAAAAAAARM6b5BLjJlivHy5qMm0a7q7u/7KdAd5M1rcN0dI4+auKOoSgiKp0NSJA0NDU1A0RLpAOZrHQiNOEzHhKUA6/GvHOJ8YdRtc84j1VShRqrtcc4mPVbTLWeEx4c/J58uZgHqjzIyWjhM/VbTbZjjET4bgbhnptdZ56eK+tonhMT4AkAAAAAAGLaduiN1fnbl4QDRlzRXdxnp92W+TtcfLlDLOZzOZBqmx2mX8ZzbMDX20TkZZzOJyfYGzto7bPFnE5Qa5yEZWKt5l3W3EGyLu+0yRZZFwaNRTGRMXB3KJR2jVRCEokETLiZdS4myBqjtaK7ZFdsgNddtvHvee9bT2nPvRE+G55c5Fc5AfSYNrpfdE7/0zuldrv058dHzWzY7WtGnGd8ffujvfQ4MMUjrM8Z6yotABzkprGmsx4KL7HE8J0nlMxE+jSA8jLseSu+Ix28I0nyZLTMTpNIie/txP1fRItWJ3TETHSd6QfPax+mflb+xE16X68pezk2Gk8tPhnT04M2T2X+m3ytH7wQedEV/VaPGv2l1GLhpek/PSfVbl2LJX3dY61nX04s1403WiYnpMafVBZbDfThMx1jf9FXY0jfxlHZjl5wWz3jTS0zHOJ/ij1BZXdu7is8ZnqqnaZ51pPPdE1n0nT0RGemmmmSvPdMW+wL5yw5nMo0rPDJXwtFq/29UTgvxiO1HWsxaPQF851lMmnFgrOmszG/Xh4O5yzx7tVHoxldxd5tck/vK2MvnuB6ESllrkWRkBZZnvZojey590gqyWVTZGSzjHWbTpHnyjxUdcd0b5aNn2abW7NYi1vemf5KePWU7JhnJbsY/9+XThHSH0Gz4K46xWsaRHnM9Z70FeybLGON2+077WnjM/tHc0AoAAAAAAAAItWJ4xE+KQGXL7Px29yI+HWv0ZMvsaPdvaO60RaPTR6oD5zN7MzV92LR/TP7ToxXpNd1q2r8UTH1fYImNeKQfH6RKezvmY3S+ly+zcVuOOI+HWv0Z8nsWk8LXjymPoRXjVz300mYty0vEW+u8tNZ40mOWtLbv+M/d6GT2LeP5b1n4omv01Zsuw5K8aTMda6W+gKJrHu2jui0dnl14eqLY7ViZ0nlpbjEz3TBMxwndPTmVjTfWZjwmYQTN9PlujvlZhvEzE214axHd1V/izzituW+N/nGkn4lN+tbRM7pms67vCfuo9CubXhwU7QqrGv+Xas8P4Zns2j5TxTXtTE6xPHSN2gjPFJtPdzno07Ps0557GO0RjrMxkmN869Necm1eyc2asUxZfwKxOK05OzFpvpeJtXs9NImPm9/ZNmrhpWlI0rHnM85mecqJ2fBXHWK1jSI85nrPetAAAAAAAAAAAAAAAAAAAAAHNqRPGInxjVnyez8VuNKx8P8P0agHnX9j454TePCY/eFOT2HE8Mlo8Yifs9cB4c/4f/wBX/pv/APTds3s2K/z3tk6RbhHybgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z",
      "A soft pillow",
      19.99
    ),
    new Product(
      "A carpet",
      "https://media.takealot.com/covers_images/2f6a864b9ee94c4e853cf57d5d96607f/s-pdpxl.file",
      "A soft carpet",
      11.99
    )];
    this.renderProducts();
  }

  renderProducts(){
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribure("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0){
      this.renderProducts();
    }

  }
}

class Shop {
  constructor(){
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");

  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
