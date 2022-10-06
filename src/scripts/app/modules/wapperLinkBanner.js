const WapperLinkBanner = () => {
    if (window.innerWidth <= 800) {
        $(document).ready(function () {
            $('.wapperLinkBanner .tpl-center').slick({
                infinite: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: !0
            });
        });
    }
}

export default WapperLinkBanner