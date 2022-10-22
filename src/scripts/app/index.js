import ModalZap from './modules/modalZap'
import Home from './pages/home'
import Product from './pages/product';
import Everbrew from './pages/clube-everbrew';

const $bodyClass = document.querySelector('body');

$bodyClass.className.toLowerCase().includes('everbrew page1') && Everbrew()
$bodyClass.className.toLowerCase().includes('home') && Home()
$bodyClass.className.toLowerCase().includes('produto') && Product()
!$bodyClass.className.toLowerCase().includes('clube-de-cervejas') && ModalZap()


// teste

// const header = document.querySelector('.icones')
// header.innerHTML += `<button class="teste">Google</button>`

// document.querySelector('.teste').addEventListener('click', ()=>{
//     vtexid.start({
//         returnUrl: "/",
//         userEmail: '',
//         locale: 'pt-BR',
//         forceReload: false,
//     });
// })