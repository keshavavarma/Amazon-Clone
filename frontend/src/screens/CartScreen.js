import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl } from "../util.js";

const addToCart = (item) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(
    (product) => product.product_id === item.product_id
  );
  if (existItem) {
    cartItems = cartItems.map((product) =>
      product.product_id === existItem.product_id ? item : product
    ); // This is to update the cartItems with the updated quantity of already existing product if the value has been incremented/decremented.If we don't write this then if we increment/decrement the quantity of a particular product in the cart page and refresh it will not show the updated state.
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product_id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        count: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();

    return `
        ${
          cartItems.length === 0
            ? `<div>No Items in Cart</div>`
            : `<div class="cart">
        <div class="cart-items">
            <ul class='cart-list'>
                <li>
                    <h3>Shopping Cart</h3>
                    <h3>Price</h3>
                </li>
                ${cartItems
                  .map(
                    (item) => `
                <li class='cart-item-container'>
                    <div class='cart-item'>
                        <div class="product-image-sm">
                            <img src="${item.image}" alt="${item.name}">
                        </div> 
                        <div class ="item-detail">
                            <p>${item.name}</p>
                            <div>
                                <span>Qty :</span>
                                <select name="qty" id="qty" class='qty'>
                                    ${[...Array(item.count).keys()].map((x) =>
                                      item.qty === x + 1
                                        ? `<option selected value='${x + 1}'>${
                                            x + 1
                                          }</option>`
                                        : `<option  value='${x + 1}'>${
                                            x + 1
                                          }</option>`
                                    )}
                                </select>
                                <button class='delete-btn'><i class="fas fa-trash fa-lg" ></i></button>
                            </div>
                        </div>
                    </div> 
                    <div class='cart-item-price'>
                        $${item.price}
                    </div>
                 </li>
                `
                  )
                  .join("\n")}                
            </ul>
        </div>
        <div class="subtotal-container">
            <div class="subtotal">
                <h2>Subtotal (${
                  (cartItems.reduce((a, c) => {
                    return (a += c.qty);
                  }),
                  0)
                }) : $${
                (cartItems.reduce((a, c) => {
                  return (a += c.price * c.qty);
                }),
                0)
              }
                </h2>
                <button class='proceed-to-cart'>Proceed to Checkout</button>
            </div>
        </div>
    </div>`
        }
        
    `;
  },
};

export default CartScreen;
