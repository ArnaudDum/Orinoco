// REQUETE VERS L'API POUR L'INTEGRATION DES PRODUITS SUR LA PAGE D'ACCUEIL

function connectAPI() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log('Connecté !');
            for(i = 0; i < response.length; i++) {
                createCard(response);
            }
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
};

connectAPI();


// INTEGRATION DU CONTENU DE LA PAGE D'ACCUEIL


function createCard(e) {


    // CREATION DES ELEMENTS EN HTML


    const page = document.getElementById('main');

    let col = document.createElement('div');
    page.appendChild(col);
    let card = document.createElement('div');
    col.appendChild(card);
    let cardImg = document.createElement('img');
    card.appendChild(cardImg);
    let cardBody = document.createElement('div');
    card.appendChild(cardBody);
    let cardTitle = document.createElement('h3');
    cardBody.appendChild(cardTitle);
    let cardText = document.createElement('p');
    cardBody.appendChild(cardText);
    let cardPrice = document.createElement('p');
    cardBody.appendChild(cardPrice);
    let cardBtn = document.createElement('a');
    cardBody.appendChild(cardBtn);

    col.classList.add('col-12', 'col-md-4');
    card.classList.add('card', 'shadow', 'border-0', 'my-3', 'my-md-5');
    cardImg.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    cardPrice.classList.add('font-weight-bold');
    cardBtn.classList.add('btn', 'btn-success', 'stretched-link', 'px-md-5', 'product-link');
    cardBtn.setAttribute('href', 'produit.html');
    cardBtn.setAttribute('role', 'button');
    cardBtn.textContent = 'Voir le produit';


    // RECUPERATION ET INTEGRATION DES ELEMENTS DE L'API


    card.setAttribute('id', e[i]._id);
    cardImg.setAttribute('src', e[i].imageUrl);
    cardTitle.innerHTML = e[i].name;
    cardPrice.innerHTML = e[i].price + ' €';
    cardText.innerHTML = e[i].description;
};


// MISE EN PLACE PAGE PRODUIT


const productPage = document.getElementById('pageProduit');
let productImg = document.getElementById('productImg');
let productTitle = document.getElementById('productTitle');
let productText = document.getElementById('productText');
let productPrice = document.getElementById('productPrice');