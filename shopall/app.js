let produtos = [
    { id: 1, nome: "Sneaker 1", preco: 854.99, img: "../images/grid/grid15.png" },
    { id: 2, nome: "Sneaker 2", preco: 265.99, img: "../images/grid/grid14.png" },
    { id: 3, nome: "Sneaker 3", preco: 398.99, img: "../images/grid/grid13.png" },
    { id: 4, nome: "Sneaker 4", preco: 450.00, img: "../images/vitrine/12.png" },
    { id: 5, nome: "Sneaker 5", preco: 720.00, img: "../images/vitrine/11.png" },
    { id: 6, nome: "Sneaker 6", preco: 310.00, img: "../images/vitrine/10.png" },
    { id: 7, nome: "Sneaker 7", preco: 420.00, img: "../images/vitrine/9.png" },
    { id: 8, nome: "Sneaker 8", preco: 530.00, img: "../images/vitrine/8.png" },
    { id: 9, nome: "Sneaker 9", preco: 289.00, img: "../images/vitrine/7.png" },
    { id: 10, nome: "Sneaker 10", preco: 615.00, img: "../images/vitrine/6.png" },
    { id: 11, nome: "Sneaker 11", preco: 199.00, img: "../images/vitrine/5.png" },
    { id: 12, nome: "Sneaker 12", preco: 340.00, img: "../images/vitrine/4.png" },
    { id: 13, nome: "Sneaker 13", preco: 980.00, img: "../images/vitrine/3.png" },
    { id: 14, nome: "Sneaker 14", preco: 275.00, img: "../images/vitrine/2.png" },
    { id: 15, nome: "Sneaker 15", preco: 410.00, img: "../images/vitrine/1.png" }
]

const vitrine = document.getElementById("vitrine")
const searchInput = document.getElementById("search")
const filterSelect = document.getElementById("filter")

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

function renderProdutos(lista) {
    vitrine.innerHTML = lista.map(p => `
        <div class="card">
            <div class="image-container">
                <img src="${p.img}">
                <button class="add-cart" onclick="addToCart(${p.id})">Adicionar</button>
            </div>
            <div class="info">
                <h3>${p.nome}</h3>
                <span>R$ ${p.preco.toFixed(2)}</span>
            </div>
        </div>
    `).join("")
}

function addToCart(id) {
    const item = carrinho.find(p => p.id === id)

    if (item) {
        item.qtd++
    } else {
        const produto = produtos.find(p => p.id === id)
        carrinho.push({ ...produto, qtd: 1 })
    }

    updateCart()
}

function updateCart() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    document.getElementById("cart-count").innerText =
        carrinho.reduce((acc, item) => acc + item.qtd, 0)

    document.getElementById("cart-items").innerHTML =
        carrinho.map((item, index) => `
        <div>
            <p>${item.nome}</p>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <div>
                <button onclick="changeQtd(${index}, -1)">-</button>
                ${item.qtd}
                <button onclick="changeQtd(${index}, 1)">+</button>
            </div>
        </div>
    `).join("")

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0)
    document.getElementById("cart-total").innerText = total.toFixed(2)
}

function changeQtd(index, delta) {
    carrinho[index].qtd += delta
    if (carrinho[index].qtd <= 0) carrinho.splice(index, 1)
    updateCart()
}

searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase()
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo))
    renderProdutos(filtrados)
})

filterSelect.addEventListener("change", () => {
    const val = filterSelect.value

    let filtrados = produtos

    if (val === "0-300") filtrados = produtos.filter(p => p.preco <= 300)
    if (val === "300-600") filtrados = produtos.filter(p => p.preco > 300 && p.preco <= 600)
    if (val === "600") filtrados = produtos.filter(p => p.preco > 600)

    renderProdutos(filtrados)
})

document.querySelector(".cart-icon").onclick = () => {
    document.getElementById("cart-panel").classList.add("open")
}

document.getElementById("close-cart").onclick = () => {
    document.getElementById("cart-panel").classList.remove("open")
}

renderProdutos(produtos)
updateCart()