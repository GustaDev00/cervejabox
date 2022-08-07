const Everbrew = () => {
    const EverAclamadas = document.querySelectorAll('input[name="plan-aclamados"]')
    const EverNovidades = document.querySelectorAll('input[name="plan-novidade"]')
    if(!EverAclamadas.length) return

    EverAclamadas.forEach(i => {
        i.addEventListener('change', ()=>{
            const validat = i.checked

            EverAclamadas.forEach(input => {
                input.checked = false;
            })

            i.checked = validat && true ;
        })
    })

    if(!EverNovidades.length) return
    
    EverNovidades.forEach(i => {
        i.addEventListener('change', ()=>{
            const validat = i.checked

            EverNovidades.forEach(input => {
                input.checked = false;
            })

            i.checked = validat && true ;
        })
    })
}

export default Everbrew