//Fill in cart items

function cartContentsFill() {
    var cartContents = document.getElementById('cart-contents');
    var subtotalDisplay = document.getElementById('subtotal');
    var currencyDisplay = document.getElementById('currency');
    var shopifyIdArray = []; 

    if(libralCart){
        // Fill in subtotal amount and currency
        subtotalDisplay.innerHTML = Number(libralCart.cost.subtotalAmount.amount).toFixed(2);
        currencyDisplay.innerHTML = libralCart.cost.subtotalAmount.currencyCode;

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
                    cost {
                        totalAmount {
                          amount
                          currencyCode
                        }
                        subtotalAmount {
                          amount
                          currencyCode
                        }
                        totalTaxAmount {
                          amount
                          currencyCode
                        }
                        totalDutyAmount {
                          amount
                          currencyCode
                        }    
                    }
                }      
            }`
            const payload = {
                query: query,
            };
            shopifyApiCall(payload)
            .then(function(){
                for (const line of shopifyPromise.cart.lines.edges){ 
                    let lineDiv = document.createElement('div');
                    let price = Number(line.node.merchandise.price.amount).toFixed(2);
                    lineDiv.setAttribute('class', 'cart-line');
                    lineDiv.setAttribute('id', line.node.merchandise.product.id.substring(22));
                    lineDiv.innerHTML = `
                        <a href="#">
                            <img src="${line.node.merchandise.image.url}">
                            <div>
                                <h5>${line.node.merchandise.product.title}</h5>
                                <p>${line.node.merchandise.title}</p>
                            </div>
                            <p>${price} ${line.node.merchandise.price.currencyCode}</p>
                        </a>
                        <div class="stepper">
                            <button>-</button>
                            <input type="text" value="${line.node.quantity}">
                            <button>+</button>
                        </div>
                        <button><img class="remove-button" src="/images/circle-with-cross.svg"></button>
                    `;
                    cartContents.append(lineDiv);
                    // Add shopifyId to array for cartLineUrls()
                    shopifyIdArray.push('shopifyProduct-' + line.node.merchandise.product.id.substring(22));
                };
                let checkoutButton = document.getElementById('checkout');
                checkoutButton.href = shopifyPromise.cart.checkoutUrl;
            })
            .then(function(){
                stepperSet()
                cartLineUrls()
            });
        }
        loadCart();
    } else {
        let message = document.createElement('p');
        message.innerHTML = "Looks like there's nothing here!";
        message.setAttribute('class', 'default-message')
        cartContents.append(message);
        subtotalDisplay.innerHTML = '0.00';
        currencyDisplay.innerHTML = 'USD';
    }

    // Adding URLs to product page for each cart item
    function cartLineUrls(){
        let ids = shopifyIdArray.join('", "')
        let query = encodeURIComponent(`[_id in ["${ids}"]] {'shopifyId': store.id, 'slug': store.slug.current}`);
        sanityApiCall(query).then(() => {
            var lines = document.getElementsByClassName('cart-line');
            shopifyIdArray.forEach(function(id, i){
                lines[i].childNodes[1].href = `/product.html?id=${sanityPromise[i].slug}`;
            });
        })
    }
}


//Stepper function script

function decrement(e) {
    var value = e.target.parentElement.children[1].value = e.target.parentElement.children[1].value
    if(value > 1) {value--;} else {
        let message = "This number can't be lower than zero. Please use the 'Remove' button instead."
        topBannerStart('error', message)
    }
    e.target.parentElement.children[1].value = value;
    updater(e);
};
function increment(e) {
    var value = e.target.parentElement.children[1].value = e.target.parentElement.children[1].value
    value++;
    e.target.parentElement.children[1].value = value;
    updater(e);
  };
function updater(e) {
    if (e.target.parentElement.className != 'unsaved stepper'){
        e.target.parentElement.className = 'unsaved stepper'
        var updateBtn = document.createElement('a');
        updateBtn.className = 'update-button';
        updateBtn.innerHTML = 'Update';
        e.target.parentElement.append(updateBtn);
        addEventListener("click", (event) => {

        });
    }
}
function stepperSet(){
    var steppers = document.getElementsByClassName("stepper")
    for (const stepper of steppers) {
        var plusBtn = stepper.children[2];
        var minusBtn = stepper.children[0];
        minusBtn.addEventListener('click', decrement);
        plusBtn.addEventListener('click', increment);
      }
}