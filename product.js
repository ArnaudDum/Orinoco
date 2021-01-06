// MISE EN PLACE PAGE PRODUIT


let address = window.location.href;
let IDProduit = address.slice(-24);
let produit = JSON.parse(localStorage.getItem('produit=' + IDProduit));


function showProduct() {


    // RECUPERATION DE L'ID PRODUIT POUR L'AFFICHAGE


    let productImg = document.getElementById('productImg');
    let productTitle = document.getElementById('productTitle');
    let productText = document.getElementById('productText');
    let productPrice = document.getElementById('productPrice');

    productImg.setAttribute('src', produit.imageUrl);
    productTitle.innerHTML = produit.name;
    productText.innerHTML = produit.description;
    productPrice.innerHTML = produit.price + ' €';


    // INTEGRATION DE LA PARTIE DU CHOIX DE LENTILLE (TYPE FORM)


    let chooseLense = document.getElementById('choose-lense');
    let lensesBoard = produit.lenses;
    for (i = 0; i < lensesBoard.length; i++) {
        let formCheckDiv = document.createElement('div');
        let lense = document.createElement('input');
        let lenseLabel = document.createElement('label');

        chooseLense.appendChild(formCheckDiv);
        formCheckDiv.appendChild(lense);
        formCheckDiv.appendChild(lenseLabel);

        formCheckDiv.classList.add('form-check');
        lense.setAttribute('type', 'radio');
        lense.setAttribute('name', lensesBoard[i]);
        lense.setAttribute('value', lensesBoard[i]);
        lense.setAttribute('id', lensesBoard[i]);
        lense.classList.add('form-check-input', 'mx-3', 'mx-md-5');
        lenseLabel.classList.add('form-check-label', 'mx-3', 'mx-md-5');
        lenseLabel.innerHTML = lensesBoard[i];
        lenseLabel.setAttribute('for', lensesBoard[i]);
    };
}

showProduct();


// AJOUT DU PRODUIT AU PANIER


function addToBasket() {


    // AJOUT NOUVEL ITEM A LA LISTE DE PRODUIT EN COMMANDE DANS LE LOCALSTORAGE


    let itemName = produit.name;
    let itemPrice = produit.price;
    let itemImg = produit.imageUrl;
    let listItem = [itemName, itemPrice, itemImg];


    // Vérifier si une liste existe déjà dans le localstorage
    // Si oui, la récupérer et y ajouter le nouvel item
    // Si non, créer la liste et y ajouter le nouvel item


    try {
        localStorage.getItem('liste');
    } catch {
        let list = [];
        localStorage.setItem('liste', JSON.stringify(list));
    };

    let newList = JSON.parse(localStorage.getItem('liste'));
    newList.push(listItem);
    localStorage.removeItem('liste');
    localStorage.setItem('liste', JSON.stringify(newList));
};


// VALIDATION DE L'AJOUT DU PRODUIT VIA LE BOUTON PAGE PRODUIT


let validationBtn = document.getElementById('validation-btn');
validationBtn.addEventListener('click', function() {
    addToBasket();
});