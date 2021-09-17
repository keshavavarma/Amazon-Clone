import Rating from "../components/Rating.js";
import { hideLoading, showLoading } from "../util.js";
const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await fetch("http://localhost:5500/api/products", {
      headers: {
        "content-type": "application/json",
      },
    });
    hideLoading();
    if (!response || !response.ok) {
      return `<div>Error in Getting Data</div>`;
    }
    const products = await response.json();

    return `
        <ul class='products'>
        ${products
          .map(
            (product) => `
        <li>
            <div class="product">
              <div class="product-image">
                <a href="/#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}"
                /></a>
              </div>
              <div class="product-info">
                <div class="product-title">
                  <a href="/#/product/${product._id}">${product.name}</a>
                </div>
                <div class='product-rating'>
                ${Rating.render({
                  value: product.rating,
                  text: product.numReviews + " reviews",
                })}
                </div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">$${product.price}</div>
              </div>
            </div>
        </li>`
          )
          .join("\n")}</ul>`;
  },
};
export default HomeScreen;
