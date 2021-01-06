// AFFICHAGE DE LA LISTE DES PRODUITS SUR LA PAGE PANIER


let productList = document.getElementById('product-list');

function showList() {
    let maListe = JSON.parse(localStorage.getItem('liste'));
    for(i = 0; i < maListe.length; i++) {
        let itemCard = document.createElement('div');
        itemCard.classList.add('d-flex', 'flex-row', 'justify-content-between', 'p-1', 'align-items-center');
        productList.appendChild(itemCard);
        itemCard.classList.add('row', 'card', 'border-0', 'shadow', 'my-3');
        
        let itemCardTitle = document.createElement('p');
        let itemCardPrice = document.createElement('p');
        let itemCardImg = document.createElement('img');

        itemCard.appendChild(itemCardTitle);
        itemCard.appendChild(itemCardPrice);
        itemCard.appendChild(itemCardImg);

        let thisItem = maListe[i];

        itemCardTitle.innerHTML = 'Article: ' + thisItem[0];
        itemCardPrice.innerHTML = 'Prix: ' + thisItem[1] + ' €';
        itemCardImg.setAttribute('src', thisItem[2]);
        itemCardTitle.classList.add('col-6');
        itemCardPrice.classList.add('col-4');
        itemCardImg.classList.add('card-img-left', 'img-fluid', 'col-1');
    };
};

showList();
