import ModalZap from "./modules/modalZap";
import Home from "./pages/home";
import Product from "./pages/product";
import Everbrew from "./pages/clube-everbrew";
import BlackFridayCerveja from "./pages/black-friday-cerveja";
import btnWhats from "./modules/btn-whats";
import Popup from "./modules/Popup";
import schema from "./modules/schema";

window.addEventListener("load", () => {
  const $bodyClass = document.querySelector("body");

  if (
    !$bodyClass.className.toLowerCase().includes("clube-de-cervejas") &&
    !$bodyClass.className.toLowerCase().includes("produto")
  ) {
    ModalZap();
    btnWhats();
  }

  $bodyClass.className.toLowerCase().includes("home") && Home();
  $bodyClass.className.toLowerCase().includes("categoria") && schema();
  $bodyClass.className.toLowerCase().includes("clube-de-cervejas") && Popup();
  $bodyClass.className.toLowerCase().includes("everbrew page1") && Everbrew();
  $bodyClass.className.toLowerCase().includes("black-friday-cerveja home") &&
    BlackFridayCerveja();
  $bodyClass.className.toLowerCase().includes("produto") && Product();
});
