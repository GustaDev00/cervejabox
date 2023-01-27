import { render } from "react-dom";
import SiteMap from "./pages/sitemap";

render(<SiteMap />, document.querySelector('main#main-mapa'));
// $('div[data-js="newsletter"]').length && render(<NewsLite />, document.querySelector('div[data-js="newsletter"]'));
// $("#glossary").length && render(<Glossary />, document.getElementById("glossary"))
// $("#redirector").length && render(<DownloadApp />, document.getElementById("main-redirector"))
