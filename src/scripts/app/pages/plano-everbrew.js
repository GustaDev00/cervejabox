const PlanoEverbrew = () => {
    const EverAclamadas = document.querySelectorAll('input[name="plan-aclamados"]')
    const EverNovidades = document.querySelectorAll('input[name="plan-novidade"]')
    const EverTreze = document.querySelectorAll('input[name="plan-treze"]')
    if (!EverAclamadas.length) return
    EverAclamadas.forEach(i => {
        i.addEventListener('change', () => {
            const validat = i.checked

            EverAclamadas.forEach(input => {
                input.checked = false;
            })

            i.checked = validat && true;
        })
    })

    if (!EverNovidades.length) return
    EverNovidades.forEach(i => {
        i.addEventListener('change', () => {
            const validat = i.checked

            EverNovidades.forEach(input => {
                input.checked = false;
            })

            i.checked = validat && true;
        })
    })

    $(".sign-plans").on("click", function (e) {
        var t;
        e.preventDefault()
        $(".plan-options input:checked").length ?
            (t = [], $(".plan-options input:checked").each(function () { var e = $(this).val(); var qtt = $(`input.qty[data-id="${$(this).attr('id')}"]`).val() ? $(`input.qty[data-id="${$(this).attr('id')}"]`).val() : 1; t.push({ id: e, quantity: qtt, seller: "1" }) }), vtexjs.checkout.addToCart(t, null, 1).done(function () { window.location.href = window.location.origin + "/checkout" }))
            :
            swal("Nenhum plano foi selecionado!")
    })

    window.onload = () => {
        if (!EverTreze.length) return
        EverTreze.forEach(i => {
            i.removeAttribute("disabled");
        })

        if (window.innerWidth <= 800) {
            $('.wrapper-plans .plans').slick({
                infinite: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: !0
            })

            $('.wrapper-plans .all-plans').slick({
                infinite: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: !0
            })
        }
    }

}


export default PlanoEverbrew