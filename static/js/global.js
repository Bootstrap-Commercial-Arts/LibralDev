const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;

let shopifyPromise;
let sanityPromise;
let libralCart;
let cartRoot;

// Cart structure check
let cartStructureCheck = function(){
  if(libralCart.lines.edges){
    cartRoot = libralCart.lines.edges;
  } else if (libralCart.lines.nodes){
    cartRoot = libralCart.lines.nodes;
  } else {
    topBannerStart('error','There is an error in your cart, please clear your browser\'s cache and try again');
  }
};

if(sessionStorage.libralCart){
  libralCart = JSON.parse(sessionStorage.libralCart);
  cartStructureCheck();
};

let main = document.getElementById('main');


// Shopify API Call
function shopifyApiCall(payload) {
    return fetch('https://libral-arts.myshopify.com/api/2023-01/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/graphql',
          'X-Shopify-Storefront-Access-Token': 'f0d7ab9fde67d917211193ed62ebe101'
        },
        body: payload
      })
      .then(response => response.json())
      .then(response => shopifyPromise = response);
  }


// Sanity API Call

function sanityApiCall(query) {
  return fetch(`https://umt44hrc.api.sanity.io/v2022-01-01/data/query/production?query=*${query}`)
  .then(res => res.json())
  .then(res => sanityPromise = res);
}

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

// Search icon
const searchForm = document.forms.searchBar
function searchBarSubmit(event){
  event.preventDefault();
  const formData = new FormData(searchForm);
  window.location.href = '/search.html?s=' + formData.get('search')

}
searchForm.addEventListener('submit', searchBarSubmit);

// Find & Replace Last Instance of Character -- utility function
function replaceLast(find, replace, string) {
  var lastIndex = string.lastIndexOf(find);
  
  if (lastIndex === -1) {
      return string;
  }
  
  var beginString = string.substring(0, lastIndex);
  var endString = string.substring(lastIndex + find.length);
  return beginString + replace + endString;
}

// Simple Product and Set Card Creation
let simpleSetProductCard = function(result, destination) {
  let simpleCard = document.createElement('div');
  simpleCard.setAttribute('class', 'simple-card');
  simpleCard.innerHTML = `
    ---DO SOMETHING---
  `
  destination.append(simpleCard);
}


// Top Banner Functions
let topBannerHide = function(){
  let topBanner = document.getElementById('top-banner');
  topBanner.remove();
}

let topBannerStart = function(state, message) {
  let topBanner = document.createElement('div');
    topBanner.setAttribute('id', 'top-banner');
    topBanner.innerHTML = `
        <p>${message}</p>
    `;
    topBanner.setAttribute('class','shadow')
    switch(state){
      case 'success': topBanner.setAttribute('style','background-color: var(--lightblue);');
      break;
      case 'warning': topBanner.setAttribute('style','background-color: #f2b646;');
      break;
      case 'error': topBanner.setAttribute('style','background-color: var(--red);');
      break;
    }
    main.append(topBanner);
    setTimeout(topBannerHide, 10000);
}