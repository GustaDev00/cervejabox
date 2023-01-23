const schema = async () => {
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");

  const h1 = document.querySelector(".wrapperRight .seo-description h3 strong");
  const urlAtual = window.location.href;
  const product = document.querySelectorAll(
    ".vitrine div.prateleira div.prateleira ul li.fields"
  );
  if (!h1 || !urlAtual || !product) return;

  let mapProduct = [];
  product.forEach((i) => {
    if (i.querySelector(".wrapperConteudo .product-name")) {
      mapProduct.push({
        "@type": "Product",
        name: i.querySelector(".wrapperConteudo .product-name").innerHTML,
        sameAs: i.querySelector(".wrapperConteudo .boxWrapPreceComprar a").href,
      });
    }
  });

  script.type = "application/ld+json";
  var jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: h1.innerHTML,
    url: urlAtual,
    about: [{ "@type": "Organization", name: h1.innerHTML }],
    mentions: mapProduct,
  };

  script.text = JSON.stringify(jsonLD);
  head.appendChild(script);
};

export default schema;
