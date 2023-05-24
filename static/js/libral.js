let libralCart;
let cartRoot;
let main = document.getElementById('main');

const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;


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
  
// libralCart fill
if(sessionStorage.libralCart){
    libralCart = JSON.parse(sessionStorage.libralCart);
    if(libralCart.cart){libralCart = libralCart.cart}
    cartStructureCheck(libralCart);
};

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
      storeCard.setAttribute('id', result.shopifyId);
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
  }
  destination = document.getElementById(destinationId)
  destination.append(storeCard);
}


function topBannerStart(state, message) {
    let topBanner = document.createElement('div');
    let bannerContainer;
    topBanner.setAttribute('id', `${state}`);
    topBanner.setAttribute('class','top-banner shadow')
    topBanner.innerHTML = `
        <p>${message}</p>
    `;
    switch(state){
        case 'productSuccess': 
            topBanner.innerHTML = `<p>${message} &nbsp;&nbsp;&nbsp;<a href="/cart.html">View cart</a> | <a href="${libralCart.checkoutUrl}">Checkout</a></p>`;
        break;
        default: topBanner.innerHTML = `<p>${message}</p>`
    }
    if(document.getElementById('banner-container')){
        bannerContainer = document.getElementById('banner-container');
    } else {
        bannerContainer = document.createElement('div');
        bannerContainer.setAttribute('id', 'banner-container')
    }
    bannerContainer.append(topBanner);
    main.append(bannerContainer);
    setTimeout(() => {topBanner.remove()}, 5000);
}
