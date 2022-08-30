import { render } from "react-dom";
import Product from "./pages/product";

render(<Product />, document.querySelector('section#react-compre'));
// $('div[data-js="newsletter"]').length && render(<NewsLite />, document.querySelector('div[data-js="newsletter"]'));
// $("#glossary").length && render(<Glossary />, document.getElementById("glossary"))
// $("#redirector").length && render(<DownloadApp />, document.getElementById("main-redirector"))
