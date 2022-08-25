const WapperLinkBanner = () => {
    window.onload = () => {

        if (window.innerWidth <= 800) {
            $('.wapperLinkBanner .tpl-center').slick({
                infinite: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: !0
            })
        }
    }
}

export default WapperLinkBanner