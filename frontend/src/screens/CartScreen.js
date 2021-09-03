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
    return `<div>This is Cart Screen</div>
    <div>${getCartItems().length}</div>`;
  },
};

export default CartScreen;
