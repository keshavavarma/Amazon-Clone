import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirect, showLoading, showMessage } from "../util.js";

const SignInScreen = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
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
                <form id="signin-form">
                    <ul class='form-items'>
                        <li>
                            <h2>Sign-In Form</h2>
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
                            <button type="submit" class="signin-button">Sign In</button>
                        </li>
                        <li>
                            <div>
                                New User? <a href='/#/register'>Create Account</a>
                            </div>
                        </li>        
                    </ul>
                </form>
            </div>
        `;
  },
};

export default SignInScreen;
