window.onload = () => {
    setTimeout(() => {
        if (localStorage.getItem("modalZap")) {
            localStorage.setItem("modalZap", true);
            document.querySelector('body')+= `
            <div class="modalZap">
<div class="modalZap-openned">
    <div class="modalZap-openned-header">
        <button>X</button>
    </div>
    <div class="modalZap-openned-main">
        <img
            src="https://cervejabox.vteximg.com.br/arquivos/logo-cerveja-box.png"
            alt="Logo"
        />
        <h2 class="modalZap-title">grupo exclusivo</h2>
        <img
            src="https://cervejabox.vteximg.com.br/arquivos/lupulo.jpg"
            alt="Imagem 01"
        />
        <h2 class="modalZap-title">receba primeiro nossas promoções</h2>
        <p>
            Entre para o grupo de ofertas e receba nossas promoções
            primeiro.
        </p>
        <div class="buttons-links">
            <button class="link-whasapp">
                <img
                    src="https://cervejabox.vteximg.com.br/arquivos/whatsapp.png"
                    alt="Imagem whatsapp"
                />
                <p>whatsapp</p>
            </button>
            <button class="link-telegram">
                <img
                    src="https://cervejabox.vteximg.com.br/arquivos/telegram.png"
                    alt="Imagem whatsapp"
                />
                <p>telegram</p>
            </button>
        </div>
    </div>
</div>
<div class="modalZap-blackout"></div>
</div>
            `
            const closeModal = document.querySelector(
                ".modalZap-openned-header button"
            );
            const closeModalBlackout = document.querySelector(".modalZap-blackout");
            const openZap = document.querySelector(".link-whasapp");
            const openTelegram = document.querySelector(".link-telegram");
            
            closeModal.addEventListener("click", () => {
                document.querySelector(".modalZap").remove();
            });
            closeModalBlackout.addEventListener("click", () => {
                document.querySelector(".modalZap").remove();
            });
            openZap.addEventListener("click", () => {
                window.location = "https://chat.whatsapp.com/ITCCLqG9wofDETz2ivDSp1";
            });
            openTelegram.addEventListener("click", () => {
                window.location = "https://t.me/+ixH2y2_e2e43ZDgx";
            });
        }
    }, 5000);
};