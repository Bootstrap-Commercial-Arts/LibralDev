//Fill in cart items
function cartContentsFill() {
    let cartContents = document.getElementById('cart-contents');
    if(libralCart){
        // Query Cart with more data
        let loadCart = function() {
            const query = `{
                cart(id:"${libralCart.id}"){
                    lines(first:50){
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                        price{
                                            amount
                                            currencyCode
                                          }
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
                    checkoutUrl    
                }      
            }`
            const payload = {
                query: query,
            };
            shopifyApiCall(payload)
            .then(function(){
                let cartContents = document.getElementById('cart-contents');
                for (const line of shopifyPromise.cart.lines.edges){ 
                    console.log(line)
                    let lineDiv = document.createElement('div');
                    let price = Number(line.node.merchandise.price.amount).toFixed(2);
                    lineDiv.setAttribute('class', 'cart-line')
                    lineDiv.innerHTML = `
                        <a href="/product.html?id=${line.node.merchandise.product.id}">
                            <img src="${line.node.merchandise.image.url}">
                            <div>
                                <h5>${line.node.merchandise.product.title}</h5>
                                <p>${line.node.merchandise.title}</p>
                            </div>
                            <p>${price} ${line.node.merchandise.price.currencyCode}</p>
                        </a>
                        <button><img class="remove-button" src="/images/circle-with-cross.svg"></button>
                    `;
                    cartContents.append(lineDiv);
                };
                let checkoutButton = document.getElementById('checkout');
                checkoutButton.href = shopifyPromise.cart.checkoutUrl;
            })
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
    subtotalDisplay.innerHTML = Number(libralCart.cost.subtotalAmount.amount).toFixed(2);
    currencyDisplay.innerHTML = libralCart.cost.subtotalAmount.currencyCode;
} else {
    subtotalDisplay.innerHTML = '0.00';
    currencyDisplay.innerHTML = 'USD';
}