const BlackFridayCerveja = () => {
    $(document).ready(function () {
        if (window.innerWidth <= 800) {
            $('#wapperBottomTriplo .tpl-center').slick({
                infinite: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: !0
            })
        }
    })

}

export default BlackFridayCerveja