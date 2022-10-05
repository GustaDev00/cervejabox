import ModalZap from './modules/modalZap'
import Home from './pages/home'
import Product from './pages/product';

const $bodyClass = document.querySelector('body');

$bodyClass.className.toLowerCase().includes('everbrew page1') && Everbrew()
$bodyClass.className.toLowerCase().includes('everbrew page2') && PlanoEverbrew()
$bodyClass.className.toLowerCase().includes('home') && Home()
$bodyClass.className.toLowerCase().includes('produto') && Product()
!$bodyClass.className.toLowerCase().includes('clube-de-cervejas') && ModalZap()
