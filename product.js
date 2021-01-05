// MISE EN PLACE PAGE PRODUIT


function showProduct() {
    let address = window.location.href;
    let IDProduit = address.slice(-24);
    let produit = JSON.parse(localStorage.getItem('produit=' + IDProduit));

    let productImg = document.getElementById('productImg');
    let productTitle = document.getElementById('productTitle');
    let productText = document.getElementById('productText');
    let productPrice = document.getElementById('productPrice');

    productImg.setAttribute('src', produit.imageUrl);
    productTitle.innerHTML = produit.name;
    productText.innerHTML = produit.description;
    productPrice.innerHTML = produit.price + ' €';


    // INTEGRATION DE LA PARTIE DU CHOIX DE LENTILLE


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