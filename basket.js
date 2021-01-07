// AFFICHAGE DE LA LISTE DES PRODUITS SUR LA PAGE PANIER


let productList = document.getElementById('product-list');
let totalPrice = document.getElementById('total-price');
let sum = 0;
let products = [];

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


        // On rajoute le prix de chaque article à la somme


        sum += thisItem[1];

        
        // Ajout de l'ID du produit à la liste de commande


        products.push(thisItem[3]);
    };
};

showList();


// Calcul de la somme totale du panier


totalPrice.innerHTML = sum + ' €';


// Création d'une classe "order"


class Contact {
    constructor(name, familyName, address, city, email) {
        this.name = name;
        this.familyName = familyName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};


// Création d'une instance de la classe "order" quand le formulaire est envoyé


let orderForm = document.getElementById('order-form');
let formBtn = document.getElementById('form-btn');

formBtn.addEventListener('click', function() {
    let contact = new Contact(
        orderForm.prenom.value,
        orderForm.nom.value,
        orderForm.adresse.value,
        orderForm.ville.value,
        orderForm.email.value,
    );
    let order = {
        products,
        contact
    };
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {


            // Retrait du panier une fois la commande passée
    
    
            localStorage.removeItem('liste');
        }
    };
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(order));
});