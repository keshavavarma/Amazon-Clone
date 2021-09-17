import { getMyOrders, update } from "../api.js";
import { clearUserInfo, getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../util.js";

const ProfileScreen = {
  after_render: () => {
    document.getElementById("signout-button").addEventListener("click", () => {
      clearUserInfo();
      document.location.hash = "/";
    });
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          console.log(data);
          setUserInfo(data);

          document.location.hash = "/";
        }
      });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const orders = await getMyOrders();
    return `
            <div class="profile">
              <div class="profile-info">
                <div class="form-container">
                  <form id="profile-form">
                    <ul class='form-items'>
                      <li>
                          <h2>User Profile</h2>
                      </li>
                      <li>
                          <label for='name'>Name:</label>
                          <input type='text' name='name' id='name' placeholder="${name}">
                      </li>           
                      <li>
                          <label for='email'>Email:</label>
                          <input type='email' name='email' id='email' placeholder="${email}">
                      </li> 
                      <li>
                          <label for='password'>Password:</label>
                          <input type='password' name='password' id='password'>
                      </li> 
                      <li>
                          <button type="submit" class="register-button">Update</button>
                      </li>
                      <li>
                        <button type = "button"class="signout-button" id="signout-button">Sign Out</button>
                      </li>       
                    </ul>
                  </form>
                </div>
              </div>
              <div class="profile-orders expand">
              <h2>Order History</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${
                    orders.length === 0
                      ? `<tr><td colspan='6'>No Orders Found</td></tr>`
                      : orders
                          .map(
                            (order) => `
                      <tr>
                        <td>${order._id}</td>
                        <td>${order.createdAt}</td>
                        <td>${order.totalPrice}</td>
                        <td>${order.paidAt || "NO"}</td>
                        <td>${order.deliveredAt || "NO"}</td>
                        <td><a href='/#/order/${order._id}'>Details</a></td>
                      </tr>
                    `
                          )
                          .join("\n")
                  }
                  </tbody>
                </table>
              </div>
              <div class="profile-orders reduce">
              <h2>Order History</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${
                    orders.length === 0
                      ? `<tr><td colspan='6'>No Orders Found</td></tr>`
                      : orders
                          .map(
                            (order) => `
                      <tr>
                        <td><a href='/#/order/${order._id}'>${order._id}</a></td>
                      </tr>
                    `
                          )
                          .join("\n")
                  }
                  </tbody>
                </table>
              </div>
            </div>
            
        `;
  },
};

export default ProfileScreen;
