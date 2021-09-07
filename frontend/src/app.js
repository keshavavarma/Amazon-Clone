import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./util.js";
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SignInScreen,
  "/register": RegisterScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  //console.log(request.resource ? true : false);
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  console.log(parseUrl);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById("header");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main");
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
