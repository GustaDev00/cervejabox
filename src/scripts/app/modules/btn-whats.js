const btnWhats = () => {
  const html = `
        <div class="btns-whats-telegram">
        <button id="close-offer-group">X</button>
        <figure>
        <img src="https://cervejabox.vteximg.com.br/arquivos/fundo.png"
        alt="background">
        <figcaption class="version_b">ENTRE P/ GRUPO DE OFERTAS</figcaption>
        <figcaption class="version_a">grupo de ofertas</figcaption>
        </figure>
        <div class="btns-click">
        <a href="https://chat.whatsapp.com/FAxTI2XoKCJHeVZd3Pil4X" target="_blank" rel="nofollow">
        <img src="https://cervejabox.vteximg.com.br/arquivos/bot%C3%A3o-whatsapp.png" alt="btn-whats"/>
        </a>
        <a href="https://t.me/+ixH2y2_e2e43ZDgx" target="_blank" rel="nofollow">
        <img src="https://cervejabox.vteximg.com.br/arquivos/telegram2.png" alt="btn-telegram"/>
        </a>
            </div>
        </div>
        `;

  let bodyClass = document.querySelector("footer#footer");
  if(window.location.href.includes('account')) return
  bodyClass.innerHTML += html;

  function removeBtnWhats() {
    document.querySelector(".btns-whats-telegram").remove();
  }

  const closebtn = document.querySelector("#close-offer-group");
  if (!closebtn) return;

  closebtn.addEventListener("click", function (e) {
    removeBtnWhats();
  });

  setTimeout(() => {
    removeBtnWhats();
  }, 30000);
};

export default btnWhats;
