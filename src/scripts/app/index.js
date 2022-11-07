import ModalZap from './modules/modalZap'
import Home from './pages/home'
import Product from './pages/product';
import Everbrew from './pages/clube-everbrew';
import BlackFridayCerveja from './pages/black-friday-cerveja';

const $bodyClass = document.querySelector('body');

$bodyClass.className.toLowerCase().includes('everbrew page1') && Everbrew()
$bodyClass.className.toLowerCase().includes('black-friday-cerveja home') && BlackFridayCerveja()
$bodyClass.className.toLowerCase().includes('home') && Home()
$bodyClass.className.toLowerCase().includes('produto') && Product()
!$bodyClass.className.toLowerCase().includes('clube-de-cervejas') && ModalZap()
