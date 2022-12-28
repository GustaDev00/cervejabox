import WapperLinkBanner from "../modules/wapperLinkBanner";

const Home = () => {
  WapperLinkBanner();

  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  script.type = "application/ld+json";

  var jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: "CervejaBox | Maior Loja Online pra Comprar Cerveja Artesanal!",
    url: "https://www.cervejabox.com.br/",
    about: [
      {
        "@type": "Thing",
        name: "Cerveja Artesanal",
        sameAs: "https://pt.wikipedia.org/wiki/Cerveja",
      },
      {
        "@type": "Thing",
        name: "Cervejarias",
        sameAs: "https://pt.wikipedia.org/wiki/Cervejaria",
      },
      {
        "@type": "Thing",
        name: "Clube de Cerveja",
        sameAs: "https://pt.wikipedia.org/wiki/Modelo_de_assinatura",
      },
    ],
    mentions: [
      {
        "@type": "Brand",
        name: "Cerveja Brewdog",
        sameAs: "https://www.cervejabox.com.br/cervejarias/brewdog",
      },
      {
        "@type": "Brand",
        name: "Cervejas Bierland",
        sameAs: "https://www.cervejabox.com.br/cervejarias/bierland",
      },
    ],
  };

  script.text = JSON.stringify(jsonLD);
  head.appendChild(script);
};

export default Home;
