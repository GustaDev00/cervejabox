(function () {
    const $bodyClass = document.querySelector('body');
    if (!$bodyClass || !$bodyClass.className.toLowerCase().includes('produto')) return

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

            },
            wrtiteHtml: function (Allproduct) {
                console.log('html: ', Allproduct)
                let htmlProduct = Allproduct.map(item => {
                    return `
                                <li class="pack-list-products">
                                    <a href="${item.link}" class="pack-list-products-link">
                                        <div class="pack-list-products-link--image">
                                            <img src="${item.items[0].images[0].imageUrl}" alt="${item.items[0].images[0].imageText}" />
                                        </div>
                                        <div class="pack-list-products-link--title">
                                            <h3>${item.productName}</h3>
                                        </div>
                                        <div class="pack-list-products-link--price">
                                            ${item.items[0].sellers[0].commertialOffer.Price}
                                        </div>
                                    </a>
                                </li>
                            `
                });

                console.log('html ss', htmlProduct)

                const html = `
                <section id="related" class="pack">
                    <h4 id="tituliPack" class="pack-title">Compre varias unidades</h4>
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

})()