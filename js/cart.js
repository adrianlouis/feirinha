const container = document.querySelector('.mainContent')
let id = 1
var precoTotalCru = 0
var precoUnitario = 0

async function getCart(){
    const response = await fetch('http://apiorganica.azurewebsites.net/Carrinho/'+id)
    const jsonBody = await response.json()
    const container = document.querySelector('.mainContent')
    let template = ''

    document.querySelector('.cartTotalPrice').innerHTML ='Total: '+ jsonBody.valorSubtotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    precoTotalCru = jsonBody.valorSubtotal

    Promise.all(jsonBody.itens.map(item => {
        let idImagem = item.imagens[0].codigo
        idImagem = idImagem.toString().padStart(4, 0)
        let extensao = item.imagens[0].extensao
        let itemQuantidade = item.quantidade
        precoUnitario = item.produto.valor 
        let valorBRL = item.produto.valor .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        template = ` <div class="cardCartItem">

        <img src="https://white-hill-0b791be10.1.azurestaticapps.net/img/${idImagem}${extensao}">

        <div class="cardEscritas">

            <span>${item.produto.titulo}</span>
            <span class="cartPriceItem">${valorBRL}</span>
            <div class="detQtdBtn">
                <span onclick="addQtd(this)"><i class="fa-light fa-plus" ></i></span>
                <span id="detNumQtd">${itemQuantidade}</span>
                <span onclick="lessQtd(this)"><i class="fa-light fa-minus"></i></span>
            </div>

        </div>
    </div>`
        container.innerHTML += template
    }))
}
function addQtd(el) {
    let qtd = el.nextElementSibling.innerHTML
    let precoTotal = document.querySelector('.cartTotalPrice').innerHTML

    qtd = parseInt(qtd)
    qtd++
    el.nextElementSibling.innerHTML = qtd
    console.log(precoTotalCru )
}

async function fetchImg(idImagem){
    const response = await fetch('https://apiorganica.azurewebsites.net/imagens/'+idImagem)
    const jsonBd = await response.json()
    return jsonBd
}

getCart()


function lessQtd(el) {
    let qtd = el.previousElementSibling.innerHTML 
    qtd = parseInt(qtd)
    if(qtd == 0){
        return
    }else{
        qtd--
        el.previousElementSibling.innerHTML = qtd
    }
}