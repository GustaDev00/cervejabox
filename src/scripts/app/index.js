import Product from './pages/product'
import Everbrew from './pages/clube-everbrew'
import PlanoEverbrew from './pages/plano-everbrew';

const $bodyClass = document.querySelector('body');
console.log($bodyClass.className.toLowerCase().includes('internasComum hotsitev2 colecao everbrew'))

$bodyClass.className.toLowerCase().includes('produto') && Product()
$bodyClass.className.toLowerCase().includes('everbrew page1') && Everbrew()
$bodyClass.className.toLowerCase().includes('everbrew page2') && PlanoEverbrew()