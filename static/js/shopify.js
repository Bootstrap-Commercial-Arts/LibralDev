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
        cartIconQty();
    } catch (error) {
        topBannerStart('error', error);
    }
  }

// Cart structure check
let cartStructureCheck = function(cartObject){
    if(cartObject.lines.edges){
      cartRoot = cartObject.lines.edges;
    } else if (cartObject.lines.nodes){
      cartRoot = cartObject.lines.nodes;
    } else {
      topBannerStart('error','There is an error in your cart, please clear your browser\'s cache and try again');
    }
  };
  
  if(sessionStorage.libralCart){
    libralCart = JSON.parse(sessionStorage.libralCart);
    cartStructureCheck(libralCart);
  };
  
// Cart Icon Quantity display
function cartIconQty() {
    if(libralCart) {
      if(document.getElementById("cart-icon-quantity")){
        var cartQty = document.getElementById("cart-icon-quantity")
        cartQty.innerHTML = cartRoot.length;
      } else {
        var cartIcon = document.getElementById('cart-icon');
        var cartQty = document.createElement('p');
        cartQty.setAttribute("id", "cart-icon-quantity");
        cartQty.innerHTML = cartRoot.length;
        cartIcon.append(cartQty);
      }
      
    }
  }
  cartIconQty();

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







//Fill in cart items (CART PAGE)

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

// Add product to cart    <-------------------------------------------------- CART SCRIPT START
let selectedOptions = [];

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

function addToCart(event){
// Match selected options to variant ID
  event.preventDefault();
  const productOptions = document.forms.productOptions;
  selectedOptions = [];
  const formData = new FormData(productOptions);
  let quantity = new Number;
  for (const [key, value] of formData.entries()) {
    if(key != 'quantity') {
      selectedOptions.push(value);}
    else if(key == 'quantity') {
      quantity = parseInt(value)
    }
  }
  let selectedVariant = findItem(selectedOptions[0], selectedOptions[1], selectedOptions[2])
  let selectedVariantId = 'gid://shopify/ProductVariant/' + selectedVariant[0].store.id;
  

  if(!libralCart) {
  // Create new cart & add line
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
    
  } else {
  // If Cart already exists  
    function generateCartLine() {
      cartLine = undefined;
      cartRoot.forEach(line => {
        if((line.node && line.node.merchandise.id === selectedVariantId) || (line.merchandise && line.merchandise.id === selectedVariantId)) {
          cartLine = line;
        }
      });
    }
    generateCartLine();
    console.log('cart exists')
    // Add line to cart
    if(!cartLine) {
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
        variables: { cartId: libralCart.id, lines: [{merchandiseId: selectedVariantId, quantity: quantity}]}
      };
      handleCart(payload, 'data.data.cartLinesAdd.cart');
    
    // Update existing line  
    } else {
      successMessage = 'Item quantity has been updated';
      const query = `	mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
      }`;
      const payload = {
        query: query,
        variables: {
          cartId: libralCart.id, lines: [{ id: cartRoot.id, merchandiseId: selectedVariantId, quantity: quantity }]
          }
      };
      handleCart(payload, 'data.data.cartLinesUpdate');
    }
  }
};


productOptions.addEventListener('submit', addToCart);