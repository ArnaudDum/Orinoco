// REQUETE VERS L'API POUR L'INTEGRATION DES PRODUITS SUR LA PAGE D'ACCUEIL


let connectToAPI = function(url) {
    return new Promise(function(resolve) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                for(i = 0; i < response.length; i++) {
                    createCard(response);

                    // Enregistrement des produits dans le localStorage

                    localStorage.setItem('produit=' + (response[i]._id), JSON.stringify(response[i]));

                }
            }
        };
        request.open("GET", url);
        request.send();
    })
};

connectToAPI("http://localhost:3000/api/cameras");


// Intégration du contenu de la page d'accueil


function createCard(x) {


    // Création des éléments en HTML


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
    cardBtn.classList.add('btn', 'btn-success', 'stretched-link', 'px-md-5',);
    cardBtn.setAttribute('role', 'button');
    cardBtn.textContent = 'Voir le produit';


    // Récupération et intégration des éléments de l'API


    card.setAttribute('id', x[i]._id);
    cardImg.setAttribute('src', x[i].imageUrl);
    cardTitle.innerHTML = x[i].name;
    cardPrice.innerHTML = x[i].price + ' €';
    cardText.innerHTML = x[i].description;
    cardBtn.setAttribute('href', 'produit.html' + '?id=' + x[i]._id);


    // Correctif taille de la 5ème card


    if(card.getAttribute('id') == '5be9c4c71c9d440000a730e9') {
        cardImg.setAttribute('style', 'margin-bottom: 44px;')
    }
};