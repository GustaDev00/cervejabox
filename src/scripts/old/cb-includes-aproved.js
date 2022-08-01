window.setTimeout(function () {
    const valorsCB = document.querySelector('.CB-teste-mes-unico span'); // class="CB-teste-mes-unico span"
    var styleElem = document.head.appendChild(document.createElement("style"));
    var styleSearch = window.location.search;
    if (styleSearch.indexOf('utmi_cp=clubemensal') > -1) {
        valorsCB.style.display = 'none';
        styleElem.innerHTML = ".CB-teste-mes-unico::after {content: ' /1Âº mÃªs' !important;font-weight: 300;}";
    }
}, 3000)

/*Funcao para adicionar texto 'A PARTIR DO 2Âº MES R$109,99' quando estiver na utmi_cp selecionadas*/
const textoCB = document.querySelector('.cb-cc__card-text'); // class="cb-cc__card-text"
var styleSearchUrl = window.location.search;
if (styleSearchUrl.indexOf('utmi_cp=clubemensal') > -1) {
    textoCB.style.display = 'block';
}