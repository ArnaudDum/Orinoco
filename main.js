// PREPARATION DE L'AFFICHAGE DE LA PAGE D'ACCUEIL


const page = document.getElementById('main');


// REQUETE VERS L'API POUR L'INTEGRATION DES PRODUITS SUR LA PAGE D'ACCUEIL


var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; i++) {

            // CREATION DES CARTES PRODUITS

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
            cardBtn.classList.add('btn', 'btn-success', 'stretched-link', 'px-md-5');
            cardBtn.setAttribute('role', 'button');
            cardBtn.textContent = 'Voir le produit';

            // RECUPERATION DES ELEMENTS DU TABLEAU JSON

            cardImg.setAttribute('src', 'http://localhost:3000/images/vcam_' + (i + 1) + '.jpg'); // METHODE CONTOURNEE, A REVOIR !
            cardTitle.innerHTML = response[i].name;
            cardPrice.innerHTML = response[i].price + ' €';
            cardText.innerHTML = response[i].description;
        };
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();