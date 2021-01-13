// MISE EN PLACE PAGE PRODUIT


let address = window.location.href;
let IDProduit = address.slice(-24);
let produit = JSON.parse(localStorage.getItem('produit=' + IDProduit));


function showProduct() {


    // Récupération de l'ID produit pour l'affichage


    let productImg = document.getElementById('productImg');
    let productTitle = document.getElementById('productTitle');
    let productText = document.getElementById('productText');
    let productPrice = document.getElementById('productPrice');

    productImg.setAttribute('src', produit.imageUrl);
    productTitle.innerHTML = produit.name;
    productText.innerHTML = produit.description;
    productPrice.innerHTML = produit.price + ' €';


    // Création de la partie du choix de la lentille (TYPE FORM)


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
        lense.removeAttribute('position');
        lenseLabel.classList.add('form-check-label', 'ml-3');
        lenseLabel.innerHTML = '     ' + lensesBoard[i];
        lenseLabel.setAttribute('for', lensesBoard[i]);
    };
}

showProduct();


// Ajout d'un produit au panier


function addToBasket() {


    // Ajout du nouvel item dans la liste de produit commandés dans le localstorage


    let itemName = produit.name;
    let itemPrice = produit.price;
    let itemImg = produit.imageUrl;
    let itemID = produit._id;
    let listItem = [itemName, itemPrice, itemImg, itemID];


    // Vérifier si une liste existe déjà dans le localstorage
    // Si oui, la récupérer et ajouter le nouvel item à la liste
    // Sinon, la créer et ajouter le nouvel item à la liste


    try {
        localStorage.getItem('liste');
        let newList = JSON.parse(localStorage.getItem('liste'));
        newList.push(listItem);
        localStorage.removeItem('liste');
        localStorage.setItem('liste', JSON.stringify(newList));
    } catch {
        let list = [];
        list.push(listItem);
        localStorage.setItem('liste', JSON.stringify(list));
    };
};


// Validation de l'ajout du produit via le bouton de la page produit


let validationBtn = document.getElementById('validation-btn');
validationBtn.addEventListener('click', function() {
    addToBasket();
});