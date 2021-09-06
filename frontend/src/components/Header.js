import { getUserInfo } from "../localStorage.js";

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `
        <div class="brand">
        <a href="/#/"><h2>Amazon</h2></a>
      </div>
      <nav class="nav">
        <a href="/#/cart"><i class="fas fa-shopping-cart fa-lg"></i></a>
        ${
          name
            ? `<a href='/#/profile'>${name}</a>`
            : `<a href="/#/signin">Sign In</a>`
        }
        
      </nav>
        `;
  },
  after_render: () => {},
};

export default Header;
