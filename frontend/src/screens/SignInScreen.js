const SignInScreen = {
  after_render: () => {},
  render: () => {
    return `
            <div class="form-container">
                <form class="signin-form">
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
                            <button class="signin-button">Sign In</button>
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
