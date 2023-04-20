//Fill in cart items
function cartContentsFill() {
    let cartContents = document.getElementById('cart-contents');
    if(libralCart){
        // Query Cart with more data
        let loadCart = function() {
            const query = `
                    cart(${libralCart.id}) {
                    id
                    lines(first: 50) {
                        edges {
                        node {
                            id
                            quantity
                            merchandise {
                            ... on ProductVariant {
                                id
                                title
                                image {
                                url
                                }
                                product {
                                id
                                title
                                }
                            }
                            }
                        }
                        }
                    }
                    estimatedCost {
                        totalAmount {
                        amount
                        currencyCode
                        }
                    }
                    checkoutUrl
                    }
                `
            const payload = {
                query: query,
            };
            shopifyApiCall(payload)

        }

loadCart();
    } else {
        let message = document.createElement('p');
        message.innerHTML = "Looks like there's nothing here!";
        message.setAttribute('class', 'default-message')
        cartContents.append(message);
    }
}

cartContentsFill();

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