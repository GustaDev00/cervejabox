const btnWhats = () => {
    let bodyClass = document.querySelector('body')

    const html = `
    <div class="btns-whats-telegram">
        <a href="https://chat.whatsapp.com/ITCCLqG9wofDETz2ivDSp1" target="_blank" rel="nofollow">
            <img src="https://cervejabox.vteximg.com.br/arquivos/bot%C3%A3o-whatsapp.png" alt="btn-whats"/>
        </a>
        <a href="https://t.me/+ixH2y2_e2e43ZDgx" target="_blank" rel="nofollow">
            <img src="https://cervejabox.vteximg.com.br/arquivos/telegram2.png" alt="btn-telegram"/>
        </a>
    </div>
    `;



    bodyClass.innerHTML += html
}

export default btnWhats