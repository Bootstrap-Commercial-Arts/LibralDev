let libralCart;
let cartRoot;
let main = document.getElementById('main');

const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;

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
    topBanner.setAttribute('class','shadow')
    topBanner.innerHTML = `
        <p>${message}</p>
    `;
    switch(state){
      case 'productSuccess': 
        topBanner.setAttribute('style','background-color: var(--lightblue);');
        topBanner.innerHTML = `
          <p>${message} | <a href="/cart.html">View cart</a> | <a href="${libralCart.checkoutUrl}">Checkout</a></p>
        `;
      break;
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