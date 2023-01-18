/* INICIO  */

/* CRIAR NOVO PRODUTO */

let body = document.querySelector("body");
let header = document.querySelector("header");
let main = document.querySelector("main");
let vitrine = document.createElement("ul");
vitrine.setAttribute("class", "vitrine");
let barraLateral = document.querySelector("aside");
barraLateral.setAttribute("class", "sidebar");

main.appendChild(vitrine);
main.appendChild(barraLateral);
function novoCard(data) {
  for (let i = 0; i < data.length; i++) {
    let card = document.createElement("li");
    let divImg = document.createElement("div");
    let img = document.createElement("img");
    let icones = document.createElement("div");
    let fav = document.createElement("button");
    let iconFav = document.createElement("i");
    let compra = document.createElement("button");
    let iconCompra = document.createElement("i");
    let cardCategory = document.createElement("p");
    let cardName = document.createElement("p");
    let cardDiscribe = document.createElement("small");
    let valor = document.createElement("p");
    let addCart = document.createElement("p");

    card.setAttribute("id", `card_${data[i].id}`);
    card.setAttribute("class", "card");
    card.setAttribute("target", "_blank");
    divImg.setAttribute("class", "imgCard");
    img.setAttribute("src", `./img/produtos/product-${data[i].id}.jpg`);
    img.setAttribute("alt", `product-${data[i].id}`);
    icones.setAttribute("class", "icones");
    fav.setAttribute("type", "submit");
    fav.setAttribute("class", "fav");
    iconFav.setAttribute("id", `icon_${data[i].id}`);
    iconFav.setAttribute("class", "fa-solid fa-heart");
    compra.setAttribute("type", "submit");
    compra.setAttribute("class", "compra");
    iconCompra.setAttribute("id", `icon_${data[i].id}`);
    iconCompra.setAttribute("class", "fa-solid fa-cart-shopping");
    cardCategory.setAttribute("id", `tag_${data[i].id}`);
    cardCategory.setAttribute("class", "cardCategory");
    cardCategory.innerText = data[i].tag;
    cardName.setAttribute("class", "cardName");
    cardName.innerText = data[i].nameItem;
    cardDiscribe.setAttribute("class", "cardDiscribe");
    cardDiscribe.innerText = data[i].description;
    valor.setAttribute("class", "valor");
    valor.innerText = formataValor(data[i].value);
    addCart.setAttribute("class", "addCart");
    addCart.innerText = data[i].addCart;

    vitrine.appendChild(card);
    card.appendChild(divImg);
    divImg.appendChild(img);
    card.appendChild(icones);
    icones.appendChild(fav);
    fav.appendChild(iconFav);
    icones.appendChild(compra);
    compra.appendChild(iconCompra);
    card.appendChild(cardCategory);
    card.appendChild(cardName);
    card.appendChild(cardDiscribe);
    card.appendChild(valor);
  }
}

novoCard(data);

function formataValor(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

/* ADICIONAR AOS FAVORITOS  */

let countFav = 0;
let favoritos = document.querySelectorAll(".fav");

for (let i = 0; i < favoritos.length; i++) {
  let fav = favoritos[i];

  fav.addEventListener("click", function (event) {
    let id = event.target.id;
    let idItem = parseInt(id.substring(5));

    if (!verificaItemFavorito(idItem)) {
      let productFav = procuraItem(idItem);
      let newCard = novoCardFav(productFav);
      let listaFavoritos = document.querySelector("#favoritos");
      listaFavoritos.appendChild(newCard);
      countFav++;
      document.querySelector("#countFav").innerText = `(${countFav})`;
    } else {
      alert("O produto já esta na lista de Favoritos");
    }
  });
}

function novoCardFav(produto) {
  let card = document.createElement("li");
  let divImg = document.createElement("div");
  let img = document.createElement("img");
  let icones = document.createElement("div");
  let remove = document.createElement("button");
  let iconRemove = document.createElement("i");
  let cardCategory = document.createElement("p");
  let cardName = document.createElement("p");
  let cardDiscribe = document.createElement("small");
  let valor = document.createElement("p");
  let addCart = document.createElement("p");

  card.setAttribute("id", `cardF_${produto.id}`);
  card.setAttribute("class", "card");
  card.setAttribute("target", "_blank");
  divImg.setAttribute("class", "imgCard");
  img.setAttribute("src", `./img/produtos/product-${produto.id}.jpg`);
  img.setAttribute("alt", `product-${produto.id}`);
  icones.setAttribute("class", "icones");
  remove.setAttribute("class", "remove");
  remove.setAttribute("type", "submit");
  iconRemove.setAttribute("id", `icon_${produto.id}`);
  iconRemove.setAttribute("class", "fa-solid fa-trash-can");
  cardCategory.setAttribute("class", "cardCategory");
  cardCategory.innerText = produto.tag;
  cardName.setAttribute("class", "cardName");
  cardName.innerText = produto.nameItem;
  cardDiscribe.setAttribute("class", "cardDiscribe");
  cardDiscribe.innerText = produto.description;
  valor.setAttribute("class", "valor");
  valor.innerText = formataValor(produto.value);
  addCart.setAttribute("class", "addCart");
  addCart.innerText = produto.addCart;

  card.addEventListener("click", function (event) {
    card.remove();
    subtraiValores(produto.value);
    countFav--;
    document.querySelector("#countFav").innerText = `(${countFav})`;
  });

  listFav.appendChild(card);
  card.appendChild(divImg);
  divImg.appendChild(img);
  card.appendChild(icones);
  icones.appendChild(remove);
  remove.appendChild(iconRemove);
  card.appendChild(cardCategory);
  card.appendChild(cardName);
  card.appendChild(cardDiscribe);
  card.appendChild(valor);

  return card;
}

/* SECAO FAVORITOS */
let buttonFavoritos = document.querySelector(".menuFav");
let sectionFavoritos = document.querySelector(".extras");
let divFavoritos = document.createElement("div");
let listFav = document.createElement("ul");

divFavoritos.setAttribute("class", "divExtraFavorito");
listFav.setAttribute("id", "favoritos");
listFav.setAttribute("class", "favoritosHidden");

sectionFavoritos.appendChild(divFavoritos);
divFavoritos.appendChild(listFav);

buttonFavoritos.addEventListener("click", function (event) {
  console.log(event);

  let favoritos = document.getElementById("favoritos");
  favoritos.classList.toggle("favoritosHidden");
  document.getElementById("favoritos");
  favoritos.classList.toggle("favoritos");
});

/* ADICIONAR AOS CARRINHO */

// let quantSelecionada = 0;
let carrinhos = document.querySelectorAll(".compra");
let arrProdutos = [];
let arrQuantidade = [];
let arrValor = [];
for (let i = 0; i < carrinhos.length; i++) {
  let carrinho = carrinhos[i];
  let elemento = data[i];

  carrinho.addEventListener("click", function (event) {
    let id = event.target.id;
    let idCarrinho = parseInt(id.substring(5));
    let quantidadeTela = document.querySelector("#quant-" + idCarrinho);

    if (verificaItemCarrinho(idCarrinho)) {
      // quantSelecionada++;
      elemento.quantSelecionada++;
      quantidadeTela.innerText = `Quantidade: ${elemento.quantSelecionada} `;

      elemento.valorSelecionado = elemento.quantSelecionada * elemento.value;
      valorSelecionado = elemento.valorSelecionado;
      document.querySelector(
        "#price-" + idCarrinho
      ).innerText = `${formataValor(valorSelecionado)}`;
    } else {
      let productCarrinho = procuraItem(idCarrinho);
      let newCardCarrinho = novoCardCarrinho(productCarrinho);
      let newCardExtra = novoCardCarrinhoExtra(productCarrinho);
      let listaDeCompras = document.getElementById("carrinho");
      let listaDeComprasAside = document.querySelector("#itemCarrinho");

      listaDeComprasAside.classList.remove("itemCarrinhoHidden");
      listaDeComprasAside.classList.add("itemCarrinho");

      listaDeCompras.appendChild(newCardExtra);
      listaDeComprasAside.appendChild(newCardCarrinho);

      elemento.valorSelecionado = elemento.value;

      // quantSelecionada = 1;
      elemento.quantSelecionada = 1;

      arrProdutos.push(elemento);
    }
    somaCarrinho(arrProdutos);
  });
}

function somaCarrinho(arr) {
  let quantidade = 0;
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    quantidade = quantidade + arr[i].quantSelecionada;
    total = total + arr[i].valorSelecionado;
  }
  document.querySelector(".quantidadeTotal").innerText = `${quantidade}`;
  document.querySelector("#countCompra").innerText = `(${quantidade})`;
  document.getElementById("valorFinal").innerText = `${formataValor(total)}`;
}

let arr = [];

function soma() {
  let soma = 0;
  for (let i = 0; i < arr.length; i++) {
    soma = soma + arr[i];
  }
  return soma;
}

function somaValores(valor) {
  arr.push(valor);
  document.getElementById("valorFinal").innerText = `${formataValor(soma())}`;
}

function subtraiValores(valor) {
  arr.splice(arr.indexOf(valor), 1);

  document.getElementById("valorFinal").innerText = `${formataValor(soma())}`;
}

function procuraItem(id) {
  for (let i = 0; i < data.length; i++) {
    let idItem = data[i];
    if (id == idItem.id) {
      return idItem;
    }
  }
}

function verificaItemCarrinho(id) {
  let idItem = document.querySelector("#cardBAside_" + id);
  let idItemExtra = document.querySelector("cardCompraExtra_" + id);
  if (idItem == null && idItemExtra == null) {
    return false;
  } else {
    return true;
  }
}

function verificaItemFavorito(id) {
  let idItem = document.querySelector("#cardF_" + id);

  console.log(idItem);
  if (idItem == null) {
    return false;
  } else {
    return true;
  }
}
function novoCardCarrinho(produto) {
  let card = document.createElement("li");
  let img = document.createElement("img");
  let CompraInfo = document.createElement("div");
  let cardName = document.createElement("p");
  let quantidade = document.createElement("p");
  let valor = document.createElement("p");
  let eventDelet = document.createElement("div");
  let remove = document.createElement("button");
  let iconRemove = document.createElement("i");
  let textRemove = document.createElement("small");

  card.setAttribute("id", `cardBAside_${produto.id}`);
  card.setAttribute("class", "cardCompra");
  card.setAttribute("target", "_blank");
  img.setAttribute("src", `./img/produtos/product-${produto.id}.jpg`);
  img.setAttribute("alt", `product-${produto.id}`);
  CompraInfo.setAttribute("class", "CompraInfo");

  cardName.setAttribute("class", "cardName");
  quantidade.setAttribute("id", `quant-${produto.id}`);
  quantidade.setAttribute("class", "valor");
  quantidade.innerText = "Quantidade: 1";
  cardName.innerText = produto.nameItem;
  valor.setAttribute("id", `price-${produto.id}`);
  valor.setAttribute("class", "valor");
  valor.innerText = formataValor(produto.value);
  eventDelet.setAttribute("class", "eventDelet");
  remove.setAttribute("class", "remove");
  remove.setAttribute("type", "submit");
  iconRemove.setAttribute("id", `icon_${produto.id}`);
  iconRemove.setAttribute("class", "fa-solid fa-trash-can");
  textRemove.setAttribute("class", "textRemove");
  textRemove.innerText = "Remover Item";

  card.addEventListener("click", function (event) {
    card.remove();

    document.getElementById(`cardCompraExtra_${produto.id}`).remove();
    subtraiValores(produto.value);
    countCompra--;
    document.querySelector("#countCompra").innerText = `(${countCompra})`;
    /*  document.querySelector(".quantidadeTotal").innerText = `${countCompra}`; */
  });

  listCarrinho.appendChild(card);
  card.appendChild(img);
  card.appendChild(CompraInfo);
  CompraInfo.appendChild(cardName);
  CompraInfo.appendChild(quantidade);
  CompraInfo.appendChild(valor);
  CompraInfo.appendChild(eventDelet);
  eventDelet.appendChild(remove);
  eventDelet.appendChild(iconRemove);
  eventDelet.appendChild(textRemove);

  return card;
}

function novoCardCarrinhoExtra(produto) {
  let card = document.createElement("li");
  let divImg = document.createElement("div");
  let img = document.createElement("img");
  let icones = document.createElement("div");
  let remove = document.createElement("button");
  let iconRemove = document.createElement("i");
  let cardCategory = document.createElement("p");
  let cardName = document.createElement("p");
  let cardDiscribe = document.createElement("small");
  let valor = document.createElement("p");
  let addCart = document.createElement("p");

  card.setAttribute("id", `cardCompraExtra_${produto.id}`);
  card.setAttribute("class", "card");
  card.setAttribute("target", "_blank");
  divImg.setAttribute("class", "imgCard");
  img.setAttribute("src", `./img/produtos/product-${produto.id}.jpg`);
  img.setAttribute("alt", `product-${produto.id}`);
  icones.setAttribute("class", "icones");
  remove.setAttribute("class", "remove");
  remove.setAttribute("type", "submit");
  iconRemove.setAttribute("id", `icon_${produto.id}`);
  iconRemove.setAttribute("class", "fa-solid fa-trash-can");
  cardCategory.setAttribute("class", "cardCategory");
  cardCategory.innerText = produto.tag;
  cardName.setAttribute("class", "cardName");
  cardName.innerText = produto.nameItem;
  cardDiscribe.setAttribute("class", "cardDiscribe");
  cardDiscribe.innerText = produto.description;
  valor.setAttribute("class", "valor");
  valor.innerText = formataValor(produto.value);
  addCart.setAttribute("class", "addCart");
  addCart.innerText = produto.addCart;

  card.addEventListener("click", function (event) {
    card.remove();

    document.getElementById(`cardCompraAside_${produto.id}`).remove();
    countCompra--;
    subtraiValores(produto.value);
    document.querySelector("#countCompra").innerText = `(${countCompra})`;
    document.querySelector(".quantidadeTotal").innerText = `${countCompra}`;
  });

  listFav.appendChild(card);
  card.appendChild(divImg);
  divImg.appendChild(img);
  card.appendChild(icones);
  icones.appendChild(remove);
  remove.appendChild(iconRemove);
  card.appendChild(cardCategory);
  card.appendChild(cardName);
  card.appendChild(cardDiscribe);
  card.appendChild(valor);

  return card;
}

/* SECAO CARRINHO EXTRA */

let buttonCompra = document.querySelector(".menuCompra");
let sectionCarrinho = document.querySelector(".extras");
let divCarrinho = document.createElement("div");
let listCarrinho = document.createElement("ul");

divCarrinho.setAttribute("class", "divExtraCarrinho");
listCarrinho.setAttribute("id", "carrinho");
listCarrinho.setAttribute("class", "carrinhoHidden");

sectionCarrinho.appendChild(divCarrinho);
divCarrinho.appendChild(listCarrinho);

buttonCompra.addEventListener("click", function (event) {
  let carrinho = document.getElementById("carrinho");
  carrinho.classList.toggle("carrinhoHidden");
  document.getElementById("carrinho");
  carrinho.classList.toggle("carrinho");
});

/* FILTRAR POR CATEGORIA */

let lista = document.querySelector(".vitrine");
let objeto = {};

function filtraCategoria(lista, criterio) {
  let arrFiltro = [];

  for (let i = 0; i < lista.length; i++) {
    let tagVerifica = lista[i].tag;
    tagVerifica = tagVerifica.toString().replace(" ", "").toLowerCase();

    if (tagVerifica == criterio) {
      objeto = lista[i];
      arrFiltro.push(objeto);
    }
  }
  vitrine.innerText = "";
  novoCard(arrFiltro);
}

let all = document.getElementById("all");

all.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  novoCard(data);
});

let bouquet = document.getElementById("bouquet");

bouquet.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  filtraCategoria(data, criterio);
});

let flowerBox = document.getElementById("flowerBox");

flowerBox.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  filtraCategoria(data, criterio);
});

let flowerShelf = document.getElementById("flowerShelf");

flowerShelf.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  filtraCategoria(data, criterio);
});

let basketofFlower = document.getElementById("basketofFlower");

basketofFlower.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  filtraCategoria(data, criterio);
});

let giftCombos = document.getElementById("giftCombos");

giftCombos.addEventListener("click", function (event) {
  let criterio = event.target.id;
  criterio = criterio.toLowerCase();
  filtraCategoria(data, criterio);
});

/* FILTRAR PESQUISA */

let pesquisa = document.querySelector("#botaoPesquisa");

pesquisa.addEventListener("click", function (event) {
  event.preventDefault();

  let valor = document.querySelector("#textoPesquisa");
  let valorPesquisado = valor.value;
  valorPesquisado = valorPesquisado
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .split(" ");

  let todositens = document.querySelector(".vitrine");

  Array.from(todositens.children)
    .filter(
      (pesquisa) =>
        !pesquisa.textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
          .split(" ")
          .toString()
          .includes(valorPesquisado)
    )
    .forEach((pesquisa) => {
      pesquisa.classList.add("hidden");
    });
});
