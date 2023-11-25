//-----Animação desaparecimento footer--------
const footer = document.querySelector('footer')

function hiddenFooter() {
    footer.classList.remove('.footer')
    footer.classList.add('hidden')
}

setTimeout(hiddenFooter, 500)

/*-------Estado Like/Dislike---------------------*/
let like = document.querySelector('.like')
let dislike = document.querySelector('.dislike')
//let delete = document.querySelector('#delete')

like.onclick = function () {
    like.classList.add('background-green')
    dislike.classList.remove('background-red')
}

dislike.onclick = function () {
    like.classList.remove('background-green')
    dislike.classList.add('background-red')
}

function deletarProduto(id) {
    console.log(id)
}

window.deletarProduto = deletarProduto