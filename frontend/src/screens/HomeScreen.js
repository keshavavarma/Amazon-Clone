import Data from "../Data.js";
const HomeScreen = {
  render: () => {
    const { products } = Data;
    return `
        <ul class='products'>
        ${products
          .map(
            (product) => `
        <li>
            <div class="product">
              <div class="product-image">
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="product-1"
                /></a>
              </div>
              <div class="product-title">
                <a href="/#/product/${product._id}">${product.name}</a>
              </div>
              <div class="product-brand">${product.brand}</div>
              <div class="product-price">$${product.price}</div>
            </div>
        </li>`
          )
          .join("\n")}</ul>`;
  },
};
export default HomeScreen;
