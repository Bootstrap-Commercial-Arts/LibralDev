
let sanityProductData = function() {
    let query = encodeURIComponent(`[store.slug.current == "${params.id}"] {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store, commonDescription->, 'variants': store.variants[]->, 'options': store.options}`);
    sanityApiCall(query).then(res => {
        shopifyProductData(res.result[0]);
        sanityProductPopulate(res.result[0]);
    });
    
}

let shopifyProductData = function(res) {
  const query = `{
      product(id: "gid://shopify/Product/${res.shopifyId}") {
        images(first: 10) {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
        descriptionHtml
      }
  }`; 
  shopifyApiCall(query)
  .then(response => { 
    console.log(shopifyPromise)

    // Additional Images from Shopify
    var addlImg = document.getElementById('p-addl-img');
    var imgArr = response.data.product.images.edges;
    imgArr.slice(1).forEach(element => {
        let img = document.createElement("img");
        img.setAttribute('src', element.node.originalSrc);
        img.setAttribute('class', 'shadow product-image');
        img.setAttribute('onclick', `lightBox(event)`);
        addlImg.append(img)
    });
    // Product Description
    var description = document.getElementById('p-description');
    description.innerHTML = response.data.product.descriptionHtml;

    console.log(imgArr)
    addModalImages(imgArr)
  });
}
  



function sanityProductPopulate(result) {
  console.log(sanityPromise);

  // Main Product Image
  var mainImage = document.getElementById('main-img');
  mainImage.setAttribute('src', result.image);
  mainImage.setAttribute('alt', result.title + ' main product photo');
  mainImage.setAttribute('class', 'product-image');
  mainImage.setAttribute('onclick', `lightBox(event)`)

  // Product Title
  var title = document.getElementById('p-title');
  title.innerHTML = result.title;

  // Product Price
  var price = document.getElementById('price');
  price.innerHTML = `$${result.store.priceRange.minVariantPrice.toFixed(2)}`;

  // Product Options
  let productOptions = document.getElementById('product-options')
  
  result.options.forEach(option => {
    if(option.values.length > 1) {
      let inputWrapper = document.createElement('div');
      inputWrapper.setAttribute('class', 'input-wrapper');
      let inputLabel = document.createElement('label');
      inputLabel.setAttribute('for', option.name);
      inputLabel.innerHTML = option.name;
      inputWrapper.append(inputLabel);
      let optionInput = document.createElement('select');
      optionInput.setAttribute('name', option.name);
      
      option.values.forEach(value => {
        let optionValue = document.createElement('option');
        optionValue.setAttribute('value', value);
        optionValue.innerHTML = value;
        optionInput.append(optionValue);
      });
      inputWrapper.append(optionInput);
      productOptions.prepend(inputWrapper);
    }
  });
}


// Lightbox functions
function addModalImages(array) {
  array.forEach(imageSrc => {
    let thumb = document.createElement('img');
    thumb.src = imageSrc.node.originalSrc;
    thumb.setAttribute('style', 'width: 8rem')
    thumb.setAttribute('onclick', 'modalImageUpdate(event)')
    let modalThumbs = document.getElementById('modal-thumbs');
    modalThumbs.append(thumb)
  });
}

function modalImageUpdate(eventSrc) {
  var modalImage = document.getElementById('lightbox-image');
  modalImage.src = eventSrc.target.currentSrc;
}

function lightBox(event) {
  
  var modalWrap = document.getElementById('modal-wrap');
  var modalOverlay = document.getElementById('modal-overlay');
  modalImageUpdate(event);
  modalWrap.setAttribute('style', 'display:block');
  modalOverlay.setAttribute('style', 'display:block');
}

function closeModal() {
  var modalWrap = document.getElementById('modal-wrap');
  var modalOverlay = document.getElementById('modal-overlay')
  modalWrap.setAttribute('style', 'display:none');
  modalOverlay.setAttribute('style', 'display:none');
}

// Add product to cart
const optionsForm = document.forms.productOptions;
let selectedOptions = [];

function findItem(value1, value2, value3) {
  if(selectedOptions.length == 1){
    return sanityPromise.result[0].variants.filter(variant => Object.values(variant.store).includes(value1))
  } else if(selectedOptions.length == 2){
    return sanityPromise.result[0].variants.filter(variant => Object.values(variant.store).includes(value1) && Object.values(variant.store).includes(value2))
  } else if(selectedOptions.length == 3){
    return sanityPromise.result[0].variants.filter(variant => Object.values(variant.store).includes(value1) && Object.values(variant.store).includes(value2) && Object.values(variant.store).includes(value3))} 
}


function addToCart(event){
  // Match selected options to variant ID
  event.preventDefault();
  const formData = new FormData(productOptions);
  let quantity;
  for (const [key, value] of formData.entries()) {
    //console.log(`${key}: ${value}`);
    if(key != 'quantity') {
      selectedOptions.push(value);}
    else if(key == 'quantity') {
      quantity = value
    }
  }
  let selectedVariant = findItem(selectedOptions[0], selectedOptions[1], selectedOptions[2])
  let selectedVariantId = selectedVariant[0].store.productId;
 
  console.log('variantId: ' + selectedVariantId);
  console.log('quantity: ' + quantity);
  

  // Send data to Shopify
  let cartId = sessionStorage.getItem('cartId');
  if(cartId == 'undefined'){
    console.log('cart undefined');
    const query = 
    `mutation {
      cartCreate(
        input: {
          lines: [
            {
              quantity: ${quantity}
              merchandiseId: "gid://shopify/ProductVariant/${selectedVariantId}"
            }
          ]
        }
      ) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          attributes {
            key
            value
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
    }`;
    shopifyApiCall(query).then(response => { 
      console.log(response)
      sessionStorage.setItem('cartId', response.data.cartId);
    });
  } else {
    console.log('cartId: ' + cartId)
    query = `mutation {
      cartLinesAdd(
        cartId: ${cartId}
        lines: [
          {
            quantity: ${quantity}
            merchandiseId: "gid://shopify/ProductVariant/${selectedVariantId}"
          }
        ]
      )
      cart { 
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        attributes {
          key
          value
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
    }`
  }
};

optionsForm.addEventListener('submit', addToCart);