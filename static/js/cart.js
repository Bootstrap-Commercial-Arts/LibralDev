//Fill in cart items
function cartContentsFill() {
    let cartContents = document.getElementById('cart-contents');
    console.log('libralCart: ', libralCart)
    if(libralCart){
        libralCart.lines.edges.forEach(node => {
            console.log(node);
        });
    } else {
        let message = document.createElement('p');
        message.innerHTML = "Looks like there's nothing here!";
        message.setAttribute('class', 'default-message')
        cartContents.append(message);
    }
}
cartContentsFill()

// Fill in subtotal amount and currency
var subtotalDisplay = document.getElementById('subtotal');
var currencyDisplay = document.getElementById('currency');
if(libralCart){
    subtotalDisplay.innerHTML = libralCart.cost.subtotalAmount.amount;
    currencyDisplay.innerHTML = libralCart.cost.subtotalAmount.currencyCode;
} else {
    subtotalDisplay.innerHTML = '0.00';
    currencyDisplay.innerHTML = 'USD';
}