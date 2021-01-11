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
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};


// Création de la promise POST API


function sendOrderToApi(object) {
    return new Promise(function(resolve) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                console.log('Commande envoyée !');


                // Récupération de la réponse de l'API

                
                localStorage.setItem('Recap-commande', this.responseText);
                localStorage.removeItem('liste');


                // Redirection vers la page de confirmation


                orderForm.action = './validation.html';
                orderForm.submit();
            }
        };
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(object));
    })
};


// Création d'une instance de la classe "Contact" (si tout est validé) quand le formulaire est envoyé


// Validation des données utilisateur


function validPrenom() {
    if(/[A-Za-zéèàîïêëâäûüôö-]+/.test(orderForm.prenom.value)) {
        return true;
    } else {
        alert("Le prénom n'est pas valide");
        return false;
    };
};

function validNom() {
    if(/[A-Za-zéèàîïêëâäûüôö-]+/.test(orderForm.nom.value)) {
        return true;
    } else {
        alert("Le nom n'est pas valide");
        return false;
    };
};

function validAddresse() {
    if(/[A-Za-zéèàîïêëâäûüôö0-9\.,'-]+/.test(orderForm.adresse.value)) {
        return true;
    } else {
        alert("L'adresse n'est pas valide");
        return false;
    };
};

function validVille() {
    if(/[A-Za-zéèàîïêëâäûüôö'-]+/.test(orderForm.ville.value)) {
        return true;
    } else {
        alert("La ville n'est pas valide");
        return false;
    };
};

function validEmail() {
    if(/^[A-Za-z0-9\.-]+@[a-z]+\.[a-z]{2,4}$/.test(orderForm.email.value)) {
        return true;
    } else {
        alert("L'adresse mail n'est pas valide");
        return false;
    };
};


// Mise en place de l'addEventListener sur le form


let orderForm = document.getElementById('order-form');
let formBtn = document.getElementById('form-btn');

formBtn.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if(validPrenom() == true && validNom() == true && validAddresse() == true && validVille() == true && validEmail() == true) {
        let contact = new Contact(
            orderForm.prenom.value,
            orderForm.nom.value,
            orderForm.adresse.value,
            orderForm.ville.value,
            orderForm.email.value,
        );
        let order = {
            contact,
            products
        };
        sendOrderToApi(order)
            .then(function() {
    
    
                // Retrait de la liste d'articles quand la commande est passée
    
                
                localStorage.removeItem('liste');
            })
    } else {
        console.log("Erreur d'envoi du formulaire");
    }
});