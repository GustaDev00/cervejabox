import ModalZap from './modules/modalZap'
import Home from './pages/home'
import Product from './pages/product';
import Everbrew from './pages/clube-everbrew';
import BlackFridayCerveja from './pages/black-friday-cerveja';

const $bodyClass = document.querySelector('body');

console.log('1', $bodyClass.className.toLowerCase().includes('black-friday-cerveja home'))
console.log('2', $bodyClass.className.toLowerCase().includes('produto'))
console.log('3', !$bodyClass.className.toLowerCase().includes('clube-de-cervejas') && !$bodyClass.className.toLowerCase().includes('produto'))
console.log('4', $bodyClass.className.toLowerCase().includes('produto'))
console.log('5', $bodyClass.className.toLowerCase().includes('home'))

$bodyClass.className.toLowerCase().includes('home') && Home()
$bodyClass.className.toLowerCase().includes('everbrew page1') && Everbrew()
$bodyClass.className.toLowerCase().includes('black-friday-cerveja home') && BlackFridayCerveja()
$bodyClass.className.toLowerCase().includes('produto') && Product()
(!$bodyClass.className.toLowerCase().includes('clube-de-cervejas') && !$bodyClass.className.toLowerCase().includes('produto')) && ModalZap()
