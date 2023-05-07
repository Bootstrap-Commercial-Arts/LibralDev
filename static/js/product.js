let cartLine;

let sanityProductData = function() {
    let query = encodeURIComponent(`[store.slug.current == "${params.id}"] {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store, commonDescription->, 'variants': store.variants[]->, 'options': store.options, 'relatedProducts': relatedProducts[]->{_id, _type, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, 'price': store.priceRange.minVariantPrice }}`);
    sanityApiCall(query).then(() => {
        shopifyProductData();
        sanityProductPopulate();
        if(sanityPromise[0].relatedProducts){ relatedProductsPopulate()}
    });
    
}

let shopifyProductData = function() {
  const query = `{
      product(id: "gid://shopify/Product/${sanityPromise[0].shopifyId}") {
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
  const payload = {
    query: query,
  };
    shopifyPromise = shopifyApiCall(payload).then( payload => {
      // Additional Images from Shopify
    var addlImg = document.getElementById('p-addl-img');
    var imgArr = shopifyPromise.product.images.edges;
    imgArr.slice(1).forEach(element => {
        let img = document.createElement("img");
        img.setAttribute('src', element.node.originalSrc);
        img.setAttribute('class', 'shadow product-image');
        img.setAttribute('onclick', `lightBox(event)`);
        addlImg.append(img)
    });
    // Product Description
    var description = document.getElementById('p-description');
    description.innerHTML = shopifyPromise.product.descriptionHtml;
    addModalImages(imgArr);
  });
}

function sanityProductPopulate() {
  // Main Product Image
  var mainImage = document.getElementById('main-img');
  mainImage.setAttribute('src', sanityPromise[0].image);
  mainImage.setAttribute('alt', sanityPromise[0].title + ' main product photo');
  mainImage.setAttribute('class', 'product-image');
  mainImage.setAttribute('onclick', `lightBox(event)`)

  // Product Title
  var title = document.getElementById('p-title');
  title.innerHTML = sanityPromise[0].title;

  // Product Price
  var price = document.getElementById('price');
  price.innerHTML = `$${sanityPromise[0].store.priceRange.minVariantPrice.toFixed(2)}`;

  // Product Options
  let productOptions = document.getElementById('product-options')
  
  sanityPromise[0].options.forEach(option => {
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

  // Lou Says
  var louSays = document.getElementById('lou-content');
  louSays.innerHTML = `
    <h4>Lou Says</h4>
    <p>${sanityPromise[0].louText}</p>
  `;
  if(sanityPromise[0].louLink){
    var louBtn = document.createElement('a')
    louBtn.href=sanityPromise[0].louLink
    louBtn.innerHTML = 'Button'
    louSays.appendChild(louBtn)
  }
}

// Related Products
function relatedProductsPopulate(){
  for (const product of sanityPromise[0].relatedProducts){
    setProductCard(product, 'related-products')
  }
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