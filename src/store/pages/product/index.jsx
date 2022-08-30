import Slider from "react-slick";
import { useEffect, useState } from "react";

const Product = () => {
    const [prod, setProd] = useState([])

    const searchSku = async (ids) => {
        if (!ids.length) return

        const searchSku = ids.join('&fq=skuId:')
        let result = await fetch(`/api/catalog_system/pub/products/search/?fq=skuId:${searchSku}`, { method: 'GET' })
            .then(response => { return response.json() })
            .catch(err => console.error(err));

        return result
    }

    const settings = {
        infinite: !0,
    slidesToShow: prod.length > 4 ? 4 : prod.length,
    slidesToScroll: 1,
    dots: !0,
    arrows: !0,
    responsive: [
    {
        breakpoint: 920,
    settings: {
        slidesToShow: 3,
    slidesToScroll: 1
        }
    },
    {
        breakpoint: 720,
    settings: {
        slidesToShow: 2,
    slidesToScroll: 1
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
    };

    useEffect(async () => {
        const packSku = await searchSku([vtxctx.skus]);
        const products = await searchSku(packSku[0].pack[0].split(','))
        setProd(products)
        console.log(prod, products, 'asasd')
    }, [])

    useEffect(() => {
        console.log(prod, $('body'))
    }, [prod])

    return (<>
        <section id="related" className="pack prateleira">
            <h4 id="tituliPack" className="pack-title">Compre mais por menos</h4>
            <Slider {...settings} className="pack-list">
                {prod.length && prod.map((item) => {
                    const withoutDiscount = item.items[0].sellers[0].commertialOffer.ListPrice;
                    const withDiscount = item.items[0].sellers[0].commertialOffer.Price;
                    const existDiscount = withoutDiscount > withDiscount ? true : false;
                    const quantityDiscount = existDiscount && 100 - ((withDiscount * 100) / withoutDiscount)

                    return (
                        <li className="todos-os-estilos-de-cerveja-artesanal-para-comprar-online fields">
                            <div className="shelf-wrapper">
                                <div className="idSku" style="display: none;">{item.productId}</div>
                                <div className="productId" style="display: none;">{item.productId}</div>
                                <div className="categoryName" style="display: none;">Packs</div>
                                <div className="bestPrice" style="display: none;">R$ {item.items[0].sellers[0].commertialOffer.Price}</div>

                                <div className="photo">
                                    <a title="Pack 4 cervejas Schornstein IPA 500ml" href={item.link} tabindex="0">
                                        <div className="shelf-image-container has--lazyload is--lazyloaded" data-noscript=""><img src={item.items[0].images[0].imageUrl} width="300" height="300" alt="${item.items[0].images[0].imageText}" id="" /></div>
                                    </a>

                                    <div rel="${item.productId}" className="flags">

                                        <p className="flag independencia">independência</p>
                                        {existDiscount && (
                                            <div className="descontoDePor" style="display: block;"><div><strong className="porcent">- {Math.round(quantityDiscount)}%</strong></div></div>
                                        )}
                                        <div className="flag RateBeer"></div>
                                        <div className="flag Validade"><div className="product-field product_field_51 product-field-type_1">
                                            {item["Validade menor 45 dias"]}
                                            <ul>
                                                <li className="sem-validade fields">Sem Validade</li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="wrapperConteudo">
                                    <a title={item.productName} href={item.link} tabindex="0">
                                        <div className="product-name">${item.productName}</div>
                                        <div className="fields">
                                            <div className="field origem"><div className="product-field product_field_54 product-field-type_7">
                                                País
                                                <ul><li className="icon"><img src="/arquivos/icone-origem.png" alt="CervejaBox" width="12" height="12" /> <span>Origem:</span></li>
                                                    <li className={item.País[0] + ` fields`} >{item.País[0]}</li>
                                                </ul>
                                            </div>
                                            </div>
                                            <div className="field estilo"><div className="product-field product_field_57 product-field-type_7">
                                                Estilo
                                                <ul><li className="icon"><img src="/arquivos/icone-estilo.png" alt="CervejaBox" width="12" height="12" /> <span>Estilo:</span></li>
                                                    <li className="india-pale-ale---ipa fields">{item.Estilo[0]}</li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </a>

                                    <div className="boxWrapPreceComprar promocao">
                                        <button className="bt verPreco" tabindex="0"><span>Ver preço</span></button>
                                    </div>

                                    <div className="boxWrapPreceComprar">
                                        <a className="wrapperPreco" title="Pack 4 cervejas Schornstein IPA 500ml" href="https://www.cervejabox.com.br/pack-4-cervejas-artesanal-schornstein-ipa-500ml/p" tabindex="0">
                                            <p className="preco">
                                                {existDiscount ? (<>
                                                    <span className="valor-de"><strong>R$ {withoutDiscount}</strong></span>
                                                    <span className="valor-por"><strong>R$ {withDiscount}</strong></span>
                                                </>
                                                ) : (
                                                    <span className="valor-por"><strong>R$ ${withDiscount}</strong></span>
                                                )}
                                            </p>
                                        </a>
                                        <div className="wrapperCompra">
                                            <div className="quantity" aria-hidden="true">
                                                <span className="bt-mais qtd mais">+</span>
                                                <input type="text" name="quantity" className="qtdProd qty" value="1" tabindex="0" />
                                                <span className="bt-menos qtd menos">-</span>
                                            </div>
                                            <button className="bt adicionar" tabindex="0"><span>Adicionar</span></button>
                                            <div className="adicionado"><span>Adicionado</span></div>
                                        </div>
                                    </div>

                                    <div className="boxWrapPreceComprar socio" style="display: block;">
                                        <div className="left">
                                            <span>Sócio do clube</span>
                                            <div className="preco">R$ {item["Preço Sócio"]}</div>
                                        </div>

                                        <div className="botao">
                                            <a href="/clube-de-cervejas-por-assinatura?utmi_cp=botaoclubeprateleira" className="bt conheca" title="Conheça o clube" tabindex="0">Conheça o clube</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>)
                })}
            </Slider>
            {/* <ul className="pack-list">
                {prod.length && prod.map((item) => {
                    const withoutDiscount = item.items[0].sellers[0].commertialOffer.ListPrice;
                    const withDiscount = item.items[0].sellers[0].commertialOffer.Price;
                    const existDiscount = withoutDiscount > withDiscount ? true : false;
                    const quantityDiscount = existDiscount && 100 - ((withDiscount * 100) / withoutDiscount)

                    return (
                        <li className="todos-os-estilos-de-cerveja-artesanal-para-comprar-online fields">
                            <div className="shelf-wrapper">
                                <div className="idSku" style="display: none;">{item.productId}</div>
                                <div className="productId" style="display: none;">{item.productId}</div>
                                <div className="categoryName" style="display: none;">Packs</div>
                                <div className="bestPrice" style="display: none;">R$ {item.items[0].sellers[0].commertialOffer.Price}</div>

                                <div className="photo">
                                    <a title="Pack 4 cervejas Schornstein IPA 500ml" href={item.link} tabindex="0">
                                        <div className="shelf-image-container has--lazyload is--lazyloaded" data-noscript=""><img src={item.items[0].images[0].imageUrl} width="300" height="300" alt="${item.items[0].images[0].imageText}" id="" /></div>
                                    </a>

                                    <div rel="${item.productId}" className="flags">

                                        <p className="flag independencia">independência</p>
                                        {existDiscount && (
                                            <div className="descontoDePor" style="display: block;"><div><strong className="porcent">- {Math.round(quantityDiscount)}%</strong></div></div>
                                        )}
                                        <div className="flag RateBeer"></div>
                                        <div className="flag Validade"><div className="product-field product_field_51 product-field-type_1">
                                            {item["Validade menor 45 dias"]}
                                            <ul>
                                                <li className="sem-validade fields">Sem Validade</li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="wrapperConteudo">
                                    <a title={item.productName} href={item.link} tabindex="0">
                                        <div className="product-name">${item.productName}</div>
                                        <div className="fields">
                                            <div className="field origem"><div className="product-field product_field_54 product-field-type_7">
                                                País
                                                <ul><li className="icon"><img src="/arquivos/icone-origem.png" alt="CervejaBox" width="12" height="12" /> <span>Origem:</span></li>
                                                    <li className={item.País[0] + ` fields`} >{item.País[0]}</li>
                                                </ul>
                                            </div>
                                            </div>
                                            <div className="field estilo"><div className="product-field product_field_57 product-field-type_7">
                                                Estilo
                                                <ul><li className="icon"><img src="/arquivos/icone-estilo.png" alt="CervejaBox" width="12" height="12" /> <span>Estilo:</span></li>
                                                    <li className="india-pale-ale---ipa fields">{item.Estilo[0]}</li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </a>

                                    <div className="boxWrapPreceComprar promocao">
                                        <button className="bt verPreco" tabindex="0"><span>Ver preço</span></button>
                                    </div>

                                    <div className="boxWrapPreceComprar">
                                        <a className="wrapperPreco" title="Pack 4 cervejas Schornstein IPA 500ml" href="https://www.cervejabox.com.br/pack-4-cervejas-artesanal-schornstein-ipa-500ml/p" tabindex="0">
                                            <p className="preco">
                                                {existDiscount ? (<>
                                                    <span className="valor-de"><strong>R$ {withoutDiscount}</strong></span>
                                                    <span className="valor-por"><strong>R$ {withDiscount}</strong></span>
                                                </>
                                                ) : (
                                                    <span className="valor-por"><strong>R$ ${withDiscount}</strong></span>
                                                )}
                                            </p>
                                        </a>
                                        <div className="wrapperCompra">
                                            <div className="quantity" aria-hidden="true">
                                                <span className="bt-mais qtd mais">+</span>
                                                <input type="text" name="quantity" className="qtdProd qty" value="1" tabindex="0" />
                                                <span className="bt-menos qtd menos">-</span>
                                            </div>
                                            <button className="bt adicionar" tabindex="0"><span>Adicionar</span></button>
                                            <div className="adicionado"><span>Adicionado</span></div>
                                        </div>
                                    </div>

                                    <div className="boxWrapPreceComprar socio" style="display: block;">
                                        <div className="left">
                                            <span>Sócio do clube</span>
                                            <div className="preco">R$ {item["Preço Sócio"]}</div>
                                        </div>

                                        <div className="botao">
                                            <a href="/clube-de-cervejas-por-assinatura?utmi_cp=botaoclubeprateleira" className="bt conheca" title="Conheça o clube" tabindex="0">Conheça o clube</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>)
                })}
            </ul> */}
        </section>
    </>)

}

export default Product