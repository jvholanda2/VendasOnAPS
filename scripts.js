//-----Animação desaparecimento footer--------
const footer = document.querySelector("footer")

function hiddenFooter() {
    footer.classList.remove(".footer")
    footer.classList.add("hidden")
}

setTimeout(hiddenFooter, 500)

/*-------Estado Like/Dislike---------------------*/
let like = document.querySelector(".like")
let dislike = document.querySelector(".dislike")

like.onclick = async function () {
    let product_id = get_product_id()

    await fetch(`/react?product_id=${product_id}&flag=true`, {method: "POST"})
    like.classList.add("background-green")
    dislike.classList.remove("background-red")
}

dislike.onclick = async function () {
    let product_id = get_product_id()

    await fetch(`/react?product_id=${product_id}&flag=false`, {method: "POST"})
    like.classList.remove("background-green")
    dislike.classList.add("background-red")
}


function get_product_id() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })
    let product_id = params.id
    return product_id
}

