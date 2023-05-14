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

// Homepage Card Creation
let homepageCards = function(result, destination) {
    var card = document.createElement("a");
    card.setAttribute("class", `card ${result._type}-card`);

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    card.append(cardImage);

  //Create card text div
    var cardDiv = document.createElement("div");
    card.append(cardDiv);

    //Create Primary Set or Collection Label
    if(result.primary) {
        var cardPrimary = document.createElement("a");
        var styledPrimary = result.primary.title.replace("\"", "<b>\"");
        styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
        cardPrimary.setAttribute("class", "pill")
        cardPrimary.innerHTML = styledPrimary;
        cardPrimary.href = `/${result.primary._type}.html?id=${result.primary.slug.current}`
        cardDiv.append(cardPrimary);
    }

    //Create Title
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = result.title;
    cardDiv.append(cardTitle);

    //Create Minimum Price
    if(result._type == 'product') {
        var cardPrimary = document.createElement("p");
        cardPrimary.innerHTML = '$' + result.store.priceRange.minVariantPrice.toFixed(2);
        cardDiv.append(cardPrimary);
    }

    //Create link
    card.href = `/${result._type}.html?id=${result.slug}`;

    destination.append(card);
}

//Get Featured Products for the homepage
let homeFeaturedProducts = function() {
    var cards = document.getElementById("featured-products");
    let query = encodeURIComponent(`[_id in ["c6a2ffaf-1b00-49f4-9469-98c2085045f0", "shopifyProduct-7534191050939", "shopifyProduct-7534191444155", "shopifyProduct-7559788626107"]] {${setAndProductProjection}}`);
    sanityApiCall(query).then(() => {
        sanityPromise.forEach((item)=>{
            homepageCards(item, cards)
        });
        $(document).ready(function(){
            $('#featured-products').slick({
                slidesToShow: 3,
                slidesToScroll: 2,
                swipeToSlide: true,
                dots: false,
                arrows: true,
                centerMode: false,
                focusOnSelect: false,
                responsive:[
                    {
                        breakpoint: 680,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }]
            });
        });
    });
    
}

//Change house geek images for mobile devices (on load)
let houseGeekImages = function() {
    var houseImages = document.getElementsByClassName("hg-image");
    if (window.visualViewport.width <= 680) {
        for (const houseImage of houseImages) {
            houseImage.src = houseImage.src.replace("-feet.png", ".png");
          }
    }
}

// Store Page slider function
let storeSliders = function(collectionName, targetDiv) {
    let query = encodeURIComponent(`[_type == 'collection'] {'sets': sets[].set->{title, _type, 'slug': slug.current, 'image': image.asset->.url}}`);
        sanityApiCall(query).then(res => {
        for (const set of sanityPromise.sets){ 
            setProductCard(set,targetDiv);
        }
        $(document).ready(function(){
            $(`#${targetDiv}`).slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                swipeToSlide: true,
                dots: false,
                arrows: true,
                centerMode: false,
                focusOnSelect: false,
                responsive:[
                    {
                        breakpoint: 680,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }]
            });
        });
    });
    
}

let collectionData = function() {
    let query = encodeURIComponent(`[_type == 'collection' && slug.current == '${params.id}'] {title, description, 'image': image.asset->.url, 'featuredSet': featuredSet.set->{title, 'image': image.asset->.url, description, 'slug': slug.current}, theme, 'slug': slug.current, 'products': products[].product->{'price': store.priceRange.minVariantPrice, 'slug': store.slug.current, 'tags': store.tags, 'title': store.title, _type, 'image': store.previewImageUrl}, 'sets': sets[].set->{title, _type, 'slug': slug.current, 'image': image.asset->.url}}
    `);
    sanityApiCall(query)
    .then(() => {
        // Featured Set Data
        let posters = document.getElementsByClassName('poster');
        for (const poster of posters) {
            poster.innerHTML = `<img src="${sanityPromise.featuredSet.image}"><h3>${sanityPromise.featuredSet.title}</h3>`;
        }
        let featuredSetInfo = document.getElementById('featured-set-text');
        featuredSetInfo.innerHTML = `<h2>Featured Set</h2>
            <h1 id="featured-title">${sanityPromise.featuredSet.title}</h1>
            <p id="featured-description">${sanityPromise.featuredSet.description}</p>
            <a class="striped-button" href="/set.html?id=${sanityPromise.featuredSet.slug}">View Set</a>`;
        
        // Collection info
        let collectionRow = document.getElementById('collection-row');
        collectionRow.innerHTML = `<div class="inset-row" style="display: block">
            <img src="${sanityPromise.image}">
            <p>${sanityPromise.description}</p>`;
        collectionRow.setAttribute('style', `background: url("/images/background-overlay.png"), var(--${sanityPromise.theme});`);

        // Sets
        for (const set of sanityPromise.sets){
            setProductCard(set, 'sets')
        }

        // Products
        for (const product of sanityPromise.products){
            setProductCard(product, 'products')
        }
    });
}