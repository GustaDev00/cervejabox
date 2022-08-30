import "stylesheets/infinityShelf.scss";

import iOS from "./iOS";
import ScrollBack from "./ScrollBack";

export const InfinityScroll = (opts) => {
    window.InfinityScroll = window.InfinityScroll || {};

    let log, extTitle, $this, $empty, $window, $document, toTopE, elemLoading, $public, $htmlWrapper;

    // Reduzindo o nome da variável publica
    $public = window.InfinityScroll;

    // Função de log
    extTitle = "Infinity Scroll";
    log = function (a, b) {
        if ("object" === typeof console) {
            let c = "object" === typeof a;
            "undefined" === typeof b || ("alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
                ? "undefined" !== typeof b && "info" === b.toLowerCase()
                    ? c
                        ? console.info("[" + extTitle + "]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7])
                        : console.info("[" + extTitle + "]\n" + a)
                    : c
                    ? console.error("[" + extTitle + "]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7])
                    : console.error("[" + extTitle + "]\n" + a)
                : c
                ? console.warn("[" + extTitle + "]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7])
                : console.warn("[" + extTitle + "]\n" + a);
        }
    };

    let options = {
        // Última prateleira/vitrine na página
        lastShelf: ">div:last",
        // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
        elemLoading: '<div id="scrollLoading">Carregando ... </div>',
        // Opção p/ definir a URL manualmente, ficando automático apenas a paginação. A url deve terminar com "...&PageNumber="
        searchUrl: null,
        //
        useReturnToTop: false,
        // Objeto jQuery com o botão de voltar ao topo
        returnToTop: $(
            '<div id="returnToTop"><a href="#"><span class="text">voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>'
        ),
        // Define em qual seletor a ação de obserlet a rolagem será aplicado (ex.: $(window).scroll(...))
        scrollBy: document,
        // Callback quando uma requisição ajax da prateleira é completada
        callback: function () {},
        // Opção para fazer a paginação manualmente, uma nova página só é chamada quando executado o comando dentro desta função
        // Ela recebe como parâmetro: 1 função que chama a próxima página (caso ela exista)
        paginate: null,
        // Esta função é quem controla onde o conteúdo será inserido. Ela recebe como parâmetro: O ùltimo bloco inserido e os dados da nova requisição AJAX
        insertContent: function (currentItems, ajaxData) {
            currentItems.after(ajaxData);
        },
        // Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
        authorizeScroll: function () {
            return true;
        },
    };

    options = { ...options, ...opts };

    $this = opts.selector;
    $empty = $("");

    if ($this.length < 1) return $this;

    // Checando se existe mais de uma prateleira selecionada
    if ($this.length > 1) {
        log(
            "Identifiquei que a seletor informado (" +
                $this.selector +
                ") retornou " +
                $this.length +
                " elementos.\n Para solucionar o problema estou selecionando automáticamente o primeiro com o id: #" +
                ($this.filter("[id^=ResultItems]:first").attr("id") || "!Not Found"),
            "Aviso"
        );
        $this = $this.filter("[id^=ResultItems]:first");
    }

    // tentando adivinhar se esta pegando o elemento correto da prateleira
    if (!$this.filter("[id^=ResultItems]").length)
        log(
            [
                "Certifique-se que esta selecionando o elemento correto.\n O plugin espera que o elemento seja o que contém o id: #" +
                    ($("div[id^=ResultItems]").attr("id") || "!Not Found"),
                $("div[id^=ResultItems]"),
            ],
            "Info"
        );
    if ($this.parent().filter("[id^=ResultItems]").length) {
        $this = $this.parent();
        log(
            [
                "Identifiquei que o seletor pai do elemento que você informou é o #" +
                    ($("div[id^=ResultItems]").attr("id") || "!Not Found") +
                    ".\n Como forma de corrigir esse problema de seleção de elemento, assumirei a prateleira correta.",
                $this,
            ],
            "Aviso"
        );
    }

    // Adicionando botão de voltar ao topo
    if (options.useReturnToTop) {
        $("body").append(options.returnToTop);
    }

    $window = $(window);
    $document = $(document);
    $htmlWrapper = $(options.scrollBy);
    $public.toTopE = $(options.returnToTop);
    elemLoading = $(options.elemLoading);
    $public.moreResults = true;
    $public.currentPage = 2;

    const fns = {
        scrollToTop: function () {
            let windowH, scrollTimeout, scrollHandler;
            windowH = $window.height();

            $window.bind("resize.InfinityScroll", function () {
                windowH = $window.height();
            });

            scrollTimeout = null;
            scrollHandler = function () {
                if ($document.scrollTop() > windowH) {
                    if (!document.body.getAttribute("data-qd-infinity-scroll")) {
                        document.body.setAttribute("data-qd-infinity-scroll", 1);
                    }
                } else if (document.body.getAttribute("data-qd-infinity-scroll")) {
                    document.body.removeAttribute("data-qd-infinity-scroll");
                }
            };

            $htmlWrapper.bind("scroll.InfinityScroll", function () {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(scrollHandler, 20);
            });

            $public.buttonToTop = $public.toTopE.find("a").bind("click.InfinityScroll", function () {
                $("html,body").animate(
                    {
                        scrollTop: 0,
                    },
                    "slow"
                );
                return false;
            });
        },
        getSearchUrl: function () {
            const preg = /\/buscapagina\?.+&PageNumber=/i;
            const pregCollection = /\/paginaprateleira\?.+PageNumber=/i;
            let url;

            for (const $script of document.querySelectorAll("script:not([src])")) {
                const content = $script.innerHTML;
                if (content.indexOf("buscapagina") > -1) {
                    url = preg.exec(content);
                    break;
                } else if (content.indexOf("paginaprateleira") > -1) {
                    url = pregCollection.exec(content);
                    break;
                }
            }

            if (typeof url !== "undefined" && typeof url[0] !== "undefined") {
                return url[0].replace("paginaprateleira", "buscapagina");
            } else {
                console.error(
                    "Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]"
                );
                return "";
            }
        },
        infinityScroll: function () {
            let elementPages, nextPage, i, scrollTimeout, scrollHandler;

            $public.searchUrl = null !== options.searchUrl ? options.searchUrl : fns.getSearchUrl();
            $public.currentStatus = true;

            // Quantidade de páginas obtidas na busca
            // Obtendo o elemento no HTML que informa o numero que completa o nome da variável
            elementPages = $(".pager[id*=PagerTop]:first").attr("id") || "";
            if (elementPages !== "") {
                // Obtendo a quantidade de páginas
                $public.pages = window["pagecount_" + elementPages.split("_").pop()];
                if (typeof $public.pages === "undefined") {
                    // Buscando a quantidade de página dentro de "window" caso não tenha encontrado a variável com o ID obtido no elemento de paginação
                    for (i in window)
                        if (/pagecount_[0-9]+/.test(i)) {
                            $public.pages = window[i];
                            break;
                        }
                }
            }
            // Caso não seja possível obter uma página, é definido um valor gigantesco para que a parada seja feita automáticamente
            if (typeof $public.pages === "undefined") $public.pages = 9999999999999;

            nextPage = function () {
                if (!$public.currentStatus) return;

                let currentItems = $this.find(options.lastShelf);
                if (currentItems.length < 1) {
                    log("Última Prateleira/Vitrine não encontrada \n (" + currentItems.selector + ")");
                    return false;
                }

                currentItems.after(elemLoading);
                $public.currentStatus = false;
                let requestedPage = $public.currentPage;

                fetch($public.searchUrl.replace(/pagenumber\=[0-9]*/i, "PageNumber=" + $public.currentPage))
                    .then((response) => response.text())
                    .then((data) => {
                        if (data.trim().length < 1) {
                            $public.moreResults = false;
                            console.warn("Não existem mais resultados a partir da página: " + requestedPage);
                        } else {
                            const $data = $(data)[1];
                            $data.setAttribute("data-page", requestedPage);

                            currentItems.after($data);
                        }

                        $public.currentStatus = true;
                        elemLoading.remove();
                        $public.currentPage++;

                        options.callback();
                    })
                    .catch((error) => console.error("Houve um erro na requisição Ajax de uma nova página.\n", error));
            };

            if (typeof options.paginate === "function")
                options.paginate(function () {
                    if ($public.currentPage <= $public.pages && $public.moreResults) nextPage();
                });
            else {
                scrollTimeout = null;
                scrollHandler = function () {
                    if (
                        $public.currentPage <= $public.pages &&
                        $public.moreResults &&
                        $window.scrollTop() >= $this.height() &&
                        options.authorizeScroll()
                    ) {
                        nextPage();
                    }
                };

                $htmlWrapper.bind("scroll.InfinityScroll_paginate", function () {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(scrollHandler, 70);
                });

                document.addEventListener("animationstart", (event) => {
                    if (event.animationName === "imageShow") {
                        nextPage();
                    }
                });
            }

            if (!iOS()) {
                ScrollBack(() => nextPage());
            }
        },
    };

    fns.scrollToTop();
    fns.infinityScroll();

    return $this;
};
