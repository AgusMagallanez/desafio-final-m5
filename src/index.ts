import "./components/button-el";
import "./components/hand-rock-el";
import "./components/hand-paper-el";
import "./components/hand-scissors-el";
import { initRouter } from "./router";

(function () {
  const root = document.querySelector(".root");
  initRouter(root as Element);
})();
