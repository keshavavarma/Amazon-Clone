import { getOrder } from "../api.js";
import { parseRequestUrl } from "../util.js";

const OrderDetailScreen = {
  after_render: async () => {},
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      orderItems,
      shipping,
      payment,
      itemPrice,
      shippingPrice,
      tax,
      totalPrice,
      isDelivered,
      isPaid,
      deliveredAt,
      paidAt,
    } = await getOrder(request.id);

    return `
    <div>
    <h2>Order : ${_id}</h2>
        <div class='order'>
            <div class="order-info">
                <div>
                    <h3>Shipping</h3>
                    <div>${shipping.address},
                        ${shipping.city} -
                        ${shipping.postalCode},
                        ${shipping.country}
                    </div>
                    ${
                      isDelivered
                        ? `<div class="success">Delivered at ${deliveredAt}</div>`
                        : '<div class="error">Not Delivered</div>'
                    }
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>Payment Method: ${payment.paymentMethod}</div>
                    ${
                      isPaid
                        ? `<div class="success">Paid at ${paidAt}</div>`
                        : '<div class="error">Not Paid</div>'
                    }
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
                </ul>
            </div>
        </div>
    </div>
    `;
  },
};

export default OrderDetailScreen;
