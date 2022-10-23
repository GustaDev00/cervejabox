function openModalDiscount() {
    const ModalFunction = {
      event: {
        showModal: function() {
          const classHeader = document.querySelector('.header')
          if(!classHeader) return

          const html = this.generateHtml()

          if(document.querySelector('.modal-discount')) return
          classHeader.innerHTML += html

          this.closeModal()
          this.copyCoupon()
        },
        generateHtml: function() {
          return `
          <div class="modal-discount">
            <textarea class="code_discount">ganhei10</textarea>
            <div class="modal-discount-open">
            <div class="modal-discount-header">
              <span class="close-modal-discount">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </span>
            </div>
              <button class="btn-discount">
                <img src="/arquivos/desconto-10.png" alt="Desconto" />
              </button>
              <button class="copy-code">COPIAR <BR /> CUPOM</button>
            </div>
            <div class="modal-discount-blackout"></div>
          </div>`
        },
        closeModal: function() {
          const blackout = document.querySelector('.modal-discount-blackout')
          if(!blackout) return

          const btnClose = document.querySelector('.close-modal-discount')
          if(!btnClose) return

          btnClose.addEventListener('click', ()=>{
            const modal = document.querySelector('.modal-discount')
            modal.remove()
          })

          blackout.addEventListener('click', ()=>{
            const modal = document.querySelector('.modal-discount')
            modal.remove()
          })
        },
        copyCoupon: function() {
          function copy(){
            const select = document.querySelector('.code_discount')
            if(!select) return

            select.focus();
            select.select();

            const successful = document.execCommand('copy');
            if(successful){
              const modal = document.querySelector('.modal-discount')
              modal.remove()
            }
            
          }

          const btnImg = document.querySelector('.btn-discount')
          if(!btnImg) return

          const btnCopy = document.querySelector('.copy-code')
          if(!btnCopy) return

          btnCopy.addEventListener('click', copy)
          btnImg.addEventListener('click', copy)
        }
      },
      init: function(){
        document.onmouseleave = function(){
          if(!window.location.hash.includes('cart')) return
          if(!localStorage.getItem("modalDiscount")) {
            localStorage.setItem("modalDiscount", true);
            ModalFunction.event.showModal()
          }
        }

        if(window.innerWidth < 1024){
          setTimeout(()=>{
            if(!window.location.hash.includes('cart')) return
            if(!localStorage.getItem("modalDiscount")) {
              localStorage.setItem("modalDiscount", true);
              ModalFunction.event.showModal()
            }
          }, 30000)
        }
      }
    }
    ModalFunction.init()
}

function escondeBoleto() {
    var itensSku = [];
    $('.cart-items li').each(function () {
      itensSku.push($(this).attr('data-sku'));
    });
  
    if (($.inArray('53', itensSku) >= 0) ||
      ($.inArray('54', itensSku) >= 0) ||
      ($.inArray('55', itensSku) >= 0) ||
      ($.inArray('56', itensSku) >= 0) ||
      ($.inArray('57', itensSku) >= 0) ||
      ($.inArray('59', itensSku) >= 0) ||
      ($.inArray('60', itensSku) >= 0) ||
      ($.inArray('61', itensSku) >= 0) ||
      ($.inArray('62', itensSku) >= 0) ||
      ($.inArray('14356', itensSku) >= 0) ||
      ($.inArray('14357', itensSku) >= 0) ||
      ($.inArray('14358', itensSku) >= 0) ||
      ($.inArray('14359', itensSku) >= 0) ||
      ($.inArray('14360', itensSku) >= 0) ||
      ($.inArray('14361', itensSku) >= 0) ||
      ($.inArray('288', itensSku) >= 0) ||
      ($.inArray('34184', itensSku) >= 0) ||
      ($.inArray('34185', itensSku) >= 0) ||
      ($.inArray('34186', itensSku) >= 0) ||
      ($.inArray('34187', itensSku) >= 0) ||
      ($.inArray('34188', itensSku) >= 0) ||
      ($.inArray('34189', itensSku) >= 0) ||
      ($.inArray('34190', itensSku) >= 0) ||
      ($.inArray('34191', itensSku) >= 0) ||
      ($.inArray('46349', itensSku) >= 0) ||
      ($.inArray('46350', itensSku) >= 0) ||
      ($.inArray('46351', itensSku) >= 0) ||
      ($.inArray('58112', itensSku) >= 0) ||
      ($.inArray('58113', itensSku) >= 0) ||
      ($.inArray('58114', itensSku) >= 0) ||
      ($.inArray('58115', itensSku) >= 0) ||
      ($.inArray('63', itensSku) >= 0)) {
      $('#payment-group-bankInvoicePaymentGroup, fieldset.box-payment-group2.box-payment-option.bankInvoicePaymentGroup').hide();
      $('#payment-group-instantPaymentPaymentGroup, fieldset.box-payment-group2 box-payment-option box-payment-pix').hide();
    };
  }
  
  function freteAnual() {
    ready('.cart-items', function (e) {
  
      var itensSku = [];
      $('.cart-items li').each(function () {
        itensSku.push($(this).attr('data-sku'));
      });
   
      if ((($.inArray('121', itensSku) >= 0) ||
        ($.inArray('121', itensSku) >= 0) ||
        ($.inArray('123', itensSku) >= 0) ||
        ($.inArray('124', itensSku) >= 0) ||
        ($.inArray('125', itensSku) >= 0) ||
        ($.inArray('127', itensSku) >= 0) ||
        ($.inArray('128', itensSku) >= 0) ||
        ($.inArray('129', itensSku) >= 0) ||
        ($.inArray('130', itensSku) >= 0) ||
                 ($.inArray('46352', itensSku) >= 0) ||
                 ($.inArray('46353', itensSku) >= 0) ||
                 ($.inArray('46354', itensSku) >= 0) ||
        ($.inArray('131', itensSku) >= 0))) {
          
          if ($('.frete-warning').length) {
            $('.frete-warning').remove()
          }
          
          setTimeout(function () {
            document.querySelectorAll(".cart-totalizers").forEach(function (element) {
              console.log('freteAnual')
              console.log(element.querySelector(".Shipping td.monetary").textContent)
              element.querySelector(".Shipping td.monetary").innerHTML+='<small class="frete-warning">valor anual</small>';
            });
          }, 1000);
    
      };
    });
  }
  
  $(window).on('hashchange', function (e) {
    escondeBoleto();
    openModalDiscount();
    freteAnual();
  });
  
  $(document).ajaxStop(function () {
    escondeBoleto();
    freteAnual();
  });
  
  $(document).ready(function () {
    ready('#payment-group-bankInvoicePaymentGroup', function () {
      escondeBoleto();
      openModalDiscount();
    });  
    
    freteAnual();
  
    // hide prime
    ready('li.seller-1-sla-FretePrime', function (e) {
      var primeText = $(e).find('span').text();
      console.log(primeText);
  
      if (primeText.indexOf('0,00') === -1) {
        $(e).hide();
      }
    });
  
    ready('label.shipping-option-item[for="seller-1-sla-FretePrime"]', function (e) {
      var primeText = $(e).find('.shipping-option-item-value').text();
      
      if (primeText.indexOf('Grátis') === -1) {
        $(e).hide();
      }
    });
  });  
  
  !function (e) { "use strict"; var t, r = [], n = e.document, o = e.MutationObserver || e.WebKitMutationObserver; function c() { for (var e, t, o = 0, c = r.length; o < c; o++) { e = r[o]; for (var l, s = 0, u = (t = n.querySelectorAll(e.selector)).length; s < u; s++)(l = t[s]).ready || (l.ready = !0, e.fn.call(l, l)) } } e.ready = function (e, l) { r.push({ selector: e, fn: l }), t || (t = new o(c)).observe(n.documentElement, { childList: !0, subtree: !0 }), c() } }(this);