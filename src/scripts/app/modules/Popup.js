const Popup = () => {

    //Só descomentar a linha da variavel que deseja utilizar, removendo os tracinhos em frente e colocando na que não ira utilizar
    const min = document.querySelector('body.clube-de-cervejas').className.toLowerCase().includes("cervejascro-v3")? 60000 : 120000;
    // const min = 60000; //Variavel setado 1 min
    // const min = 120000; // variavel setado 2 min

    const ModalFunction = {
        event: {
            showModal: function () {
                const classHeader = document.querySelector('#footer')
                if (!classHeader) return

                const html = this.generateHtml()

                if (document.querySelector('.modal-discount')) return
                classHeader.innerHTML += html

                this.closeModal()
                this.copyCoupon()
            },
            generateHtml: function () {
                return `
          <div class="modal-discount">
            <textarea class="code_discount1">10anual</textarea>
            <textarea class="code_discount2">25mensal</textarea>
            <div class="modal-discount-open">
            <div class="modal-discount-header">
              <span class="close-modal-discount">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </span>
            </div>
              <button class="btn-discount">
                <img src="/arquivos/pop-up-desconto-clube2.png" alt="Desconto" />
              </button>
              <button class="copy-code copy-code1">COPIAR <BR /> CUPOM</button>
              <button class="copy-code copy-code2">COPIAR <BR /> CUPOM</button>
            </div>
            <div class="modal-discount-blackout"></div>
          </div>`
            },
            closeModal: function () {
                const blackout = document.querySelector('.modal-discount-blackout')
                if (!blackout) return

                const btnClose = document.querySelector('.close-modal-discount')
                if (!btnClose) return

                btnClose.addEventListener('click', () => {
                    const modal = document.querySelector('.modal-discount')
                    modal.remove()
                    window.scroll(0, 0)
                })

                blackout.addEventListener('click', () => {
                    const modal = document.querySelector('.modal-discount')
                    modal.remove()
                    window.scroll(0, 0)
                })
            },
            copyCoupon: function () {
                function copy() {
                    const select = document.querySelector('.code_discount1')
                    if (!select) return

                    select.focus();
                    select.select();

                    const successful = document.execCommand('copy');
                    if (successful) {
                        const modal = document.querySelector('.modal-discount')
                        modal.remove()
                        window.scroll(0, 0)
                    }

                }

                function copy2() {
                    const select = document.querySelector('.code_discount2')
                    if (!select) return

                    select.focus();
                    select.select();

                    const successful = document.execCommand('copy');
                    if (successful) {
                        const modal = document.querySelector('.modal-discount')
                        modal.remove()
                        window.scroll(0, 0)
                    }

                }

                const btnCopy1 = document.querySelector('.copy-code1')
                if (!btnCopy1) return

                const btnCopy2 = document.querySelector('.copy-code2')
                if (!btnCopy2) return

                btnCopy1.addEventListener('click', copy)
                btnCopy2.addEventListener('click', copy2)
            }
        },
        init: function () {
            document.onmouseleave = function () {
                if (!localStorage.getItem("clube-de-cervejas")) {
                    localStorage.setItem("clube-de-cervejas", true);
                    ModalFunction.event.showModal()
                }
            }

            if (window.innerWidth < 1024) {
                setTimeout(() => {
                    if (!localStorage.getItem("clube-de-cervejas")) {
                        localStorage.setItem("clube-de-cervejas", true);
                        ModalFunction.event.showModal()
                    }
                }, min)
            }
        }
    }
    ModalFunction.init()
}

export default Popup