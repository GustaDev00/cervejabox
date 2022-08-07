const Product = () => {
  alert('asd')

  const pageProduct = {
    methods: {
        pickSku: async function () {
            const packSku = await this.searchSku([vtxctx.skus]);
            console.log(packSku[0].pack)

            const products = await this.searchSku(packSku[0].pack[0].split(','))
            console.log('produto: ', products)

            if (!products.length) return

            const sectionsPage = document.querySelector('main .tpl-content .tpl-center');
            sectionsPage.innerHTML += this.wrtiteHtml(products);
            this.carrossel();

        },
        carrossel: function () {
            $('.pack-list').slick({
                infinite: !0,
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: !0,
                arrows: !0,
                responsive: [
                    {
                        breakpoint: 920,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            })
        },
        wrtiteHtml: function (Allproduct) {
            console.log('html: ', Allproduct)
            let htmlProduct = Allproduct.map(item => {
                const withoutDiscount = item.items[0].sellers[0].commertialOffer.ListPrice;
                const withDiscount = item.items[0].sellers[0].commertialOffer.Price;
                const existDiscount = withoutDiscount > withDiscount ? true : false;
                const quantityDiscount = existDiscount && 100 - ((withDiscount * 100) / withoutDiscount)
                return `
                <li class="todos-os-estilos-de-cerveja-artesanal-para-comprar-online fields">

                <div class="shelf-wrapper">
                  <div class="idSku" style="display: none;">${item.productId}</div>
                  <div class="productId" style="display: none;">${item.productId}</div>
                  <div class="categoryName" style="display: none;">Packs</div>
                  <div class="bestPrice" style="display: none;">R$ ${item.items[0].sellers[0].commertialOffer.Price}</div>
                
                  <!-- Foto do produto -->
                  <div class="photo">
                    <a title="Pack 4 cervejas Schornstein IPA 500ml" href="${item.link}" tabindex="0">
                      <div class="shelf-image-container has--lazyload is--lazyloaded" data-noscript=""><img src="${item.items[0].images[0].imageUrl}" width="300" height="300" alt="${item.items[0].images[0].imageText}" id=""></div>
                    </a>
                
                    <!-- Flags -->
                    <div rel="${item.productId}" class="flags">
                      
                      <p class="flag independencia">independência</p>
                        ${existDiscount && `
                            <div class="descontoDePor" style="display: block;"><div><strong class="porcent">- ${Math.round(quantityDiscount)}%</strong></div></div>
                        `}
                      <div class="flag RateBeer"></div>
                      <div class="flag Validade"><div class="product-field product_field_51 product-field-type_1">
                ${item["Validade menor 45 dias"]}
                <ul>
                <li class="sem-validade fields">Sem Validade</li>
                </ul>
                </div>
                </div>
                    </div>
                  </div>
                
                  <div class="wrapperConteudo">
                    <a title="${item.productName}" href="${item.link}" tabindex="0">
                      <div class="product-name">${item.productName}</div>
                      <div class="fields">
                        <div class="field origem"><div class="product-field product_field_54 product-field-type_7">
                País
                <ul><li class="icon"><img src="/arquivos/icone-origem.png" alt="CervejaBox" width="12" height="12"> <span>Origem:</span></li>
                <li class="${item.País[0]} fields">${item.País[0]}</li>
                </ul>
                </div>
                </div>
                        <div class="field estilo"><div class="product-field product_field_57 product-field-type_7">
                Estilo
                <ul><li class="icon"><img src="/arquivos/icone-estilo.png" alt="CervejaBox" width="12" height="12"> <span>Estilo:</span></li>
                <li class="india-pale-ale---ipa fields">${item.Estilo[0]}</li>
                </ul>
                </div>
                </div>
                      </div>
                    </a>
                
                    <div class="boxWrapPreceComprar promocao">
                      <button class="bt verPreco" tabindex="0"><span>Ver preço</span></button>
                    </div>
                
                        <div class="boxWrapPreceComprar">
                      <a class="wrapperPreco" title="Pack 4 cervejas Schornstein IPA 500ml" href="https://www.cervejabox.com.br/pack-4-cervejas-artesanal-schornstein-ipa-500ml/p" tabindex="0">
                        <p class="preco">
                        ${existDiscount ? `
                            <span class="valor-de"><strong>R$ ${withoutDiscount}</strong></span>
                            <span class="valor-por"><strong>R$ ${withDiscount}</strong></span>
                        `: `
                            <span class="valor-por"><strong>R$ ${withDiscount}</strong></span>
                        `}
                        </p>
                      </a>
                      <div class="wrapperCompra">
                        <div class="quantity" aria-hidden="true">
                          <span class="bt-mais qtd mais">+</span>
                          <input type="text" name="quantity" class="qtdProd qty" value="1" tabindex="0">
                          <span class="bt-menos qtd menos">-</span>
                        </div>
                        <button class="bt adicionar" tabindex="0"><span>Adicionar</span></button>
                        <div class="adicionado"><span>Adicionado</span></div>
                      </div>
                    </div>
                
                    <div class="boxWrapPreceComprar socio" style="display: block;">
                      <div class="left">
                        <span>Sócio do clube</span>
                        <div class="preco">R$ ${item["Preço Sócio"]}</div>
                      </div>
                
                      <div class="botao">
                        <a href="/clube-de-cervejas-por-assinatura?utmi_cp=botaoclubeprateleira" class="bt conheca" title="Conheça o clube" tabindex="0">Conheça o clube</a>
                      </div>
                    </div>
                      </div>
                </div>
                </li>`
            });

            console.log('html ss', htmlProduct)

            const html = `
            <section id="related" class="pack prateleira">
                <h4 id="tituliPack" class="pack-title">Compre mais por menos</h4>
                <ul class="pack-list">
                    ${htmlProduct.join('')}
                </ul>
            </section>
            `

            return html
        },
        searchSku: async function (ids) {
            console.log(ids)
            if (!ids.length) return

            const searchSku = ids.join('&fq=skuId:')

            console.log('searh> ', searchSku)
            let result = await fetch(`/api/catalog_system/pub/products/search/?fq=skuId:${searchSku}`, { method: 'GET' })
                .then(response => { return response.json() })
                .catch(err => console.error(err));

            return result
        }
    },
    init: function () {
        this.methods.pickSku();
    }
}

pageProduct.init()
}

export default Product