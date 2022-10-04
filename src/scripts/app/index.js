import Allin from './modules/allin'
import ModalZap from './modules/modalZap'
import Home from './pages/home'

const $bodyClass = document.querySelector('body');
console.log($bodyClass.className.toLowerCase().includes('internasComum hotsitev2 colecao everbrew'))

ModalZap()
Allin()
$bodyClass.className.toLowerCase().includes('home') && Home()