import { update } from "../api.js";
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
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
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
        `;
  },
};

export default ProfileScreen;
