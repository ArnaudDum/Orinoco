// Affichage de la page de confirmation


let showOrderID = document.getElementById('orderID');
function getReturnedID() {
    let response = JSON.parse(localStorage.getItem('Recap-commande'));
    let retourID = response.orderId;
    return retourID;
}

showOrderID.innerHTML = getReturnedID();