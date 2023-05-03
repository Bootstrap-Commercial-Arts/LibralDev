const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;

let shopifyPromise;
let sanityPromise;
let libralCart;
let cartRoot;
let main = document.getElementById('main');


// Sanity API Call
function sanityApiCall(query) {
  return fetch(`https://umt44hrc.api.sanity.io/v2022-01-01/data/query/production?query=*${query}`)
  .then(res => res.json())
  .then(res => {
    if (res.result.length == 1){
      sanityPromise = res.result[0]
    } else {
      sanityPromise = res.result
    }
  });
}

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
  cartStructureCheck();
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

// Product and Set Card Creation
let setProductCard = function(result, destinationId) {
  let storeCard = document.createElement('a');
  switch(result._type){
    case 'product': 
      storeCard.setAttribute('href', `/product.html?id=${result.slug}`)
      if(result.primary){
      var styledPrimary = result.title.replace("\"", "<b>\"");
      styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
      storeCard.setAttribute('class', 'product-card');
      storeCard.innerHTML = `
          <img class="shadow" src="${result.image}">
          <a class="pill" href="${result.slug}">${styledPrimary}</a>
          <h3>${result.title}</h3>
          <p class="price">$${result.price}</p>
          <a class="blue-button">Select Options</a>
      `} else {
          storeCard.innerHTML = `
          <img class="shadow" src="${result.image}">
          <h3>${result.title}</h3>
          <p class="price">$${result.price}</p>
          <a class="blue-button">Select Options</a>
      `}
    break;
    case 'set':
      storeCard.setAttribute('href', `/set.html?id=${result.slug}`)
      var styledTitle = result.title.replace("\"", "<b>\"");
      styledTitle = replaceLast("\"", "\"</b>", styledTitle)
      storeCard.setAttribute('class', 'set-card');
      storeCard.innerHTML = `
      <img src="${result.image}">
      <h3>${styledTitle}</h3>
      <a class="blue-button">View Products</a>
      `
    break;
    default:
      console.log(result);
      break;
  }
  destination = document.getElementById(destinationId)
  destination.append(storeCard);
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