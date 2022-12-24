const schema = () => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    var jsonLD = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "headline": "Cervejas Bierland",
        "url": "https://www.cervejabox.com.br/cervejarias/bierland",
        "about": [
        {"@type": "Organization", "name": "Cervejaria Bierland"}],
        "mentions":[
        {"@type": "Product", "name": "Cerveja Bierland Pilsen", "sameAs": "https://www.cervejabox.com.br/cerveja-artesanal-bierland-pilsen-lata-350ml/p"},
        {"@type": "Product", "name": "Cerveja Bierland Weizen", "sameAs": "https://www.cervejabox.com.br/cerveja-artesanal-bierland-weizen-lata-350ml/p"}]
      };
      script.text = JSON.stringify(jsonLD);
      head.appendChild(script);
}

export default schema;