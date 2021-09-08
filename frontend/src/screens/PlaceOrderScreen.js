import CheckoutSteps from "../components/CheckoutSteps.js";
import { getCartItems, getShipping, getPayment } from "../localStorage.js";

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }
  const itemPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 10;
  const tax = Math.round(0.15 * itemPrice);
  const totalPrice = itemPrice + shippingPrice + tax;
  return {
    orderItems,
    shipping,
    payment,
    itemPrice,
    shippingPrice,
    tax,
    totalPrice,
  };
};

const PlaceOrderScreen = {
  after_render: () => {},
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemPrice,
      shippingPrice,
      tax,
      totalPrice,
    } = convertCartToOrder();

    return `
    <div>
        ${CheckoutSteps.render({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        })}
        <div class='order'>
            <div class="order-info">
                <div>
                    <h3>Shipping</h3>
                    <div>${shipping.address},
                        ${shipping.city} -
                        ${shipping.postalCode},
                        ${shipping.country}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>Payment Method: ${payment.paymentMethod}</div>
                </div>
                <div class="cart-items">
                    <ul class='cart-list'>
                        <li>
                            <h3>Shopping Cart</h3>
                            <h3>Price</h3>
                        </li>
                        ${orderItems
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
                                        <span>Qty :${item.qty}</span>
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
            </div>
            <div class="order-action">
                <ul>
                    <li>
                        <h2>Order Summary</h2>
                    </li>
                    <li><div>Items</div><div>$${itemPrice}</div></li>
                    <li><div>Shipping</div><div>$${shippingPrice}</div></li>
                    <li><div>Tax</div><div>$${tax}</div></li>
                    <li class="total"><div >Total</div><div>$${totalPrice}</div></li>
                    <li>
                        <button class="signin-button">Place Order</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
  },
};

export default PlaceOrderScreen;
