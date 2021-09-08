export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      token,
      isAdmin,
    })
  );
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};
  return userInfo;
};

export const clearUserInfo = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("shippingInfo");
  localStorage.removeItem("cartItems");
};

export const getShipping = () => {
  const shipping = localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : { address: "", country: "", postalCode: "", city: "" };

  return shipping;
};

export const setShipping = ({
  address = "",
  country = "",
  postalCode = "",
  city = "",
}) => {
  localStorage.setItem(
    "shippingInfo",
    JSON.stringify({
      address,
      country,
      postalCode,
      city,
    })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : { paymentMethod: "paypal" };

  return payment;
};

export const setPayment = ({ paymentMethod = "paypal" }) => {
  localStorage.setItem(
    "payment",
    JSON.stringify({
      paymentMethod,
    })
  );
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
};
