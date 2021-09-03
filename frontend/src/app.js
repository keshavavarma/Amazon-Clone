import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./util.js";
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
};
const router = async () => {
  const request = parseRequestUrl();
  //console.log(request.resource ? true : false);
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  console.log(parseUrl);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const main = document.getElementById("main");
  main.innerHTML = await screen.render();
  screen.after_render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
