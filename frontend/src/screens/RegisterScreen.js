import { register } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirect, showLoading, showMessage } from "../util.js";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
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
          redirect();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirect();
    }
    return `
            <div class="form-container">
                <form id="register-form">
                    <ul class='form-items'>
                        <li>
                            <h2>Register</h2>
                        </li>
                        <li>
                            <label for='name'>Name:</label>
                            <input type='text' name='name' id='name'>
                        </li>           
                        <li>
                            <label for='email'>Email:</label>
                            <input type='email' name='email' id='email'>
                        </li> 
                        <li>
                            <label for='password'>Password:</label>
                            <input type='password' name='password' id='password'>
                        </li> 
                        <li>
                            <button type="submit" class="register-button">Register</button>
                        </li>
                        <li>
                            <div>
                                Already have an account? <a href='/#/signin'>Sign-In</a>
                            </div>
                        </li>        
                    </ul>
                </form>
            </div>
        `;
  },
};

export default RegisterScreen;
