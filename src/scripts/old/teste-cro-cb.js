const closePopup = document.querySelector('.popup-login-close');
const modalLogin = document.getElementById('vtex-login-2-x-box');
const buttonGoogle = document.querySelector('.vtex-button-google');
const buttonEmail = document.getElementById('popup-cb-btn');

//Tela de email e google
const buttonLoginemail = document.getElementById('click-email');
const buttonLogingoogle = document.getElementById('click-google');
const telaGoogle = document.querySelector('.list-google');
const telaEmail = document.querySelector('.list-email');

//Tela de cadastro e obrigado
const modalRegister = document.querySelector('.tela-cadastro');
const modalSucess = document.querySelector('.tela-obrigado');


if (sessionStorage.getItem("popupnews") === 'true') {
    if (modalLogin) {
        modalLogin.classList.add("hidden");
    }
}

//fechar X
closePopup.addEventListener('click', (e) => {
    if (modalLogin) {
        sessionStorage.setItem("popupnews", 'true');
        modalLogin.classList.add("hidden");
    }
});

//cadastro google
buttonGoogle.addEventListener('click', (e) => {

    modalRegister.classList.add('hidden');
    modalSucess.classList.remove('hidden');

    setTimeout(function () {
        if (modalLogin) {
            sessionStorage.setItem("popupnews", 'true');
            modalLogin.classList.add("hidden");
        }
    }, (2300));

});

//cadastro google
buttonEmail.addEventListener('click', (e) => {

    const email = document.getElementById('popup-cb-email');

    if (email.value.length == 0 || email.value.indexOf('@') == -1) {
        alert('Preencha um E-mail valido!');
        return;
    };

    modalRegister.classList.add('hidden');
    modalSucess.classList.remove('hidden');

    email.value = '';

    setTimeout(function () {
        if (modalLogin) {
            sessionStorage.setItem("popupnews", 'true');
            modalLogin.classList.add("hidden");
        }
    }, (2300));

});

//mudar cadastro de google para email
buttonLoginemail.addEventListener('click', (e) => {

    telaGoogle.classList.add('hidden');
    telaEmail.classList.remove('hidden');

});

//mudar cadastro de email para google
buttonLogingoogle.addEventListener('click', (e) => {

    telaEmail.classList.add('hidden');
    telaGoogle.classList.remove('hidden');

});