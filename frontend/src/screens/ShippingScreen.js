import CheckoutSteps from "../components/CheckoutSteps.js";
import {
  clearUserInfo,
  getUserInfo,
  setUserInfo,
  getShipping,
  setShipping,
} from "../localStorage.js";

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById("address").value,
          country: document.getElementById("country").value,
          postalCode: document.getElementById("postalCode").value,
          city: document.getElementById("city").value,
        });
        document.location.hash = "/placeorder";
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const { address, country, postalCode, city } = getShipping();
    return `
      ${CheckoutSteps.render({ step1: true, step2: true })}
            <div class="form-container">
                <form id="shipping-form">
                    <ul class='form-items'>
                        <li>
                            <h2>Shipping Details</h2>
                        </li>
                        <li>
                            <label for='address'>Address:</label>
                            <input type='text' name='address' id='address' value="${address}">
                        </li>           
                        <li>
                            <label for='country'>Country:</label>
                            <input type='text' name='country' id='country' value="${country}">
                        </li>
                        <li>
                            <label for='postalCode'>Postal Code:</label>
                            <input type='text' name='postalCode' id='postalCode' value="${postalCode}">
                        </li>
                        <li>
                            <label for='city'>City:</label>
                            <input type='text' name='city' id='city' value="${city}">
                        </li>
                        <li>
                            <button type="submit" class="register-button">Continue</button>
                        </li>     
                    </ul>
                </form>
            </div>
        `;
  },
};

export default ShippingScreen;
