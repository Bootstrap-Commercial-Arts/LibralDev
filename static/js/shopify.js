let shopifyPromise;

// Shopify API Call
async function shopifyApiCall(payload) {
    try {
      let response = await fetch(
        "https://libral-arts.myshopify.com/api/2023-01/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "f0d7ab9fde67d917211193ed62ebe101"
          },
          body: JSON.stringify(payload)
        }
      )
      shopifyPromise = await response.json()
      if(shopifyPromise.data) {shopifyPromise = shopifyPromise.data}
    } catch (error) {
      topBannerStart('error', error);
    }
}
  
// Altered Shopify API call for addToCart
async function handleCart(payload, saveData) {
    try {
        const data = await fetch(
        "https://libral-arts.myshopify.com/api/2022-07/graphql.json",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "f0d7ab9fde67d917211193ed62ebe101"
            },
            body: JSON.stringify(payload)
        }
        ).then((res) => res.json())
        // After fetch functions
        sessionStorage.setItem('libralCart', JSON.stringify(eval(saveData)));
        libralCart = JSON.parse(sessionStorage.libralCart)
        topBannerStart('productSuccess', successMessage);
        cartStructureCheck(libralCart);
        cartIconQty();;
        fillSubtotal();
    } catch (error) {
        topBannerStart('error', error);
    }
  }

//Stepper function script
function decrement(e) {
    var value = e.target.parentElement.children[1].value = e.target.parentElement.children[1].value
    if(value > 1) {
        value--;
        e.target.parentElement.children[1].value = value;
        updateCartLine(e.target.parentElement.title, value, libralCart.id, e.target.parentElement.parentElement.id);
    } else {
        let message = "This number can't be lower than zero. Please use the 'Remove' button instead."
        topBannerStart('error', message)
    }    
};
function increment(e) {
    var value = e.target.parentElement.children[1].value = e.target.parentElement.children[1].value
    value++;
    e.target.parentElement.children[1].value = value;
    updateCartLine(e.target.parentElement.title, value, libralCart.id, e.target.parentElement.parentElement.id);
  };
function stepperSet(){
    var steppers = document.getElementsByClassName("stepper")
    for (const stepper of steppers) {
        var plusBtn = stepper.children[2];
        var minusBtn = stepper.children[0];
        minusBtn.addEventListener('click', decrement);
        plusBtn.addEventListener('click', increment);
      }
}

function removeBtnSet(){
    var removeBtns = document.getElementsByClassName("removeBtn")
    for (const remover of removeBtns) {
        remover.addEventListener('click', (e) => {
          removeCartLine(libralCart.id, e.target.parentElement.parentElement.id);
          e.target.parentElement.parentElement.remove();
        });
      }
}


// Fill in subtotal amount and currency
    function fillSubtotal(){
      var subtotalDisplay = document.getElementById('subtotal');
      var currencyDisplay = document.getElementById('currency');
      if(subtotalDisplay){
        subtotalDisplay.innerHTML = Number(libralCart.cost.subtotalAmount.amount).toFixed(2);
        currencyDisplay.innerHTML = libralCart.cost.subtotalAmount.currencyCode;
      }
    }

//Fill in cart items (CART PAGE)
function cartContentsFill() {
    var shopifyIdArray = []; 
    
    if(libralCart.lines.edges.length > 0){
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
              // Fill cart lines
                for (const line of shopifyPromise.cart.lines.edges){ 
                    let lineDiv = document.createElement('div');
                    let price = Number(line.node.merchandise.price.amount).toFixed(2);
                    lineDiv.setAttribute('class', 'cart-line');
                    lineDiv.setAttribute('id', line.node.id);
                    lineDiv.setAttribute('title', line.node.merchandise.product.id.substring(22));
                    lineDiv.innerHTML = `
                        <a href="#">
                            <img src="${line.node.merchandise.image.url}">
                            <div>
                                <h5>${line.node.merchandise.product.title}</h5>
                                <p>${line.node.merchandise.title}</p>
                            </div>
                            <p>${price} ${line.node.merchandise.price.currencyCode}</p>
                        </a>
                        <div class="stepper" title="${line.node.merchandise.id}">
                            <button>-</button>
                            <input readonly type="text" value="${line.node.quantity}">
                            <button>+</button>
                        </div>
                        <button class="removeBtn"><img class="remove-button" src="/images/circle-with-cross.svg"></button>
                    `;
                    cartContents.append(lineDiv);
                    // Add shopifyId to array for cartLineUrls()
                    shopifyIdArray.push('shopifyProduct-' + line.node.merchandise.product.id.substring(22));
                };
                fillSubtotal()

                // Fill in checkout button URL
                let checkoutButton = document.getElementById('checkout');
                checkoutButton.href = shopifyPromise.cart.checkoutUrl;
            })
            .then(function(){
                stepperSet()
                cartLineUrls()
                removeBtnSet();
            });
        }
        loadCart();
    } else {
        let message = document.createElement('p');
        message.innerHTML = "Looks like there's nothing here!";
        message.setAttribute('class', 'default-message');
        cartContents.append(message);
        fillSubtotal();
    }

    // Adding URLs to product page for each cart item
    function cartLineUrls(){
        let ids = shopifyIdArray.join('", "')
        let query = encodeURIComponent(`[_id in ["${ids}"]] {'shopifyId': store.id, 'slug': store.slug.current}`);
        sanityApiCall(query).then(() => {
            var lines = document.getElementsByClassName('cart-line');
            shopifyIdArray.forEach(function(id, i){
                let match = sanityPromise.filter(item => 'shopifyProduct-' + item.shopifyId == id)
                lines[i].childNodes[1].href = `/product.html?id=${match[0].slug}`;
            });
        })
    }
}


// Retrieving variantId from selected options
function findItem(value1, value2, value3) {
    if(selectedOptions.length == 0){
      return sanityPromise[0].variants
    } else if(selectedOptions.length == 1){
      return sanityPromise[0].variants.filter(variant => Object.values(variant.store).includes(value1))
    } else if(selectedOptions.length == 2){
      return sanityPromise[0].variants.filter(variant => Object.values(variant.store).includes(value1) && Object.values(variant.store).includes(value2))
    } else if(selectedOptions.length == 3){
      return sanityPromise[0].variants.filter(variant => Object.values(variant.store).includes(value1) && Object.values(variant.store).includes(value2) && Object.values(variant.store).includes(value3))
    }
  }


let successMessage;

// Create cart with first item
function createCart(selectedVariantId, quantity) {
    successMessage = `Your cart has been started.`;
    const query = `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
            id
            lines(first: 100) {
              nodes {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
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
        }
      }
    `;
    const payload = {
      query: query,
      variables: {
        input: {
          lines: [{ merchandiseId: selectedVariantId, quantity: quantity }]
        }
      }
    };

        handleCart(payload, 'data.data.cartCreate.cart');
}

// Add new product to cart
function addCartLine(selectedVariantId, quantity, cartId){
    successMessage = 'Item has been added to your cart.';
      const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            checkoutUrl
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
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
          userErrors {
            field
            message
          }
        }
      }
      `;
    const payload = {
        query: query,
        variables: { cartId: cartId, lines: [{merchandiseId: selectedVariantId, quantity: quantity}]}
    };
    handleCart(payload, 'data.data.cartLinesAdd.cart');
}

// Updated quantity of item in cart
function updateCartLine(selectedVariantId, quantity, cartId, cartLine){
    successMessage = 'Item quantity has been updated';
      const query = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines){ 
          cart {
            id 
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
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
            userErrors {
              field
              message
            }
          }
}
`;
      const payload = {
        query: query,
        variables: {
          cartId: cartId, lines: [{ id: cartLine, merchandiseId: selectedVariantId, quantity: quantity }]
          }
      };
      handleCart(payload, 'data.data.cartLinesUpdate.cart');
}

//Remove line from a cart
function removeCartLine(cartId, cartLine){
    successMessage = 'Item quantity has been updated';
      const query = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id 
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
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
            userErrors {
              field
              message
            }
          }
}
`;
      const payload = {
        query: query,
        variables: {
          cartId: cartId, lineIds: [cartLine]
          }
      };
      handleCart(payload, 'data.data.cartLinesRemove.cart');
}