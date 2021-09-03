import { getProduct } from "../api.js";
import Rating from "../components/Rating.js";
import { parseRequestUrl } from "../util.js";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-to-cart").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class='back-link'>
      <a href="/#/"><i class="fas fa-arrow-left"></i> Back</a>
    </div>
    <div class="product-container">
      <div class="product-image">
        <img src='${product.image}' alt='${product.name}'>
      </div>
      <div class="product-details">
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
        <div class="product-status">${
          product.countInStock > 0
            ? '<p class="success">In-stock</p>'
            : '<p class="error">Out of Stock</p>'
        }</div>
        <button id="add-to-cart"class='add-to-cart ${
          product.countInStock > 0 ? "enabled" : "disabled"
        }' ${product.countInStock > 0 ? "" : "disabled"}>Add To Cart</button>
      </div>
    </div>`;
  },
};

export default ProductScreen;
