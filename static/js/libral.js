let libralCart;
let cartRoot;
let main = document.getElementById('main');

const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, 'imageAlt': image.imageAlt, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;


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
      storeCard.setAttribute('class', 'product-card shadow');
      storeCard.setAttribute('id', result.shopifyId);
      if(result.primary){
      var styledPrimary = result.primary.title.replace("\"", "<b>\"");
      styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
      storeCard.innerHTML = `
          <img src="${result.image}" alt="product image for ${result.title}">
          <a class="pill" href="${result.slug}">${styledPrimary}</a>
          <h3>${result.title}</h3>
          <p class="price">$${result.price.toFixed(2)}</p>
          <a class="blue-button">Select Options</a>
      `} else {
          storeCard.innerHTML = `
          <img src="${result.image}" alt="product image for ${result.title}">
          <h3>${result.title}</h3>
          <p class="price">$${result.price.toFixed(2)}</p>
          <a class="blue-button">Select Options</a>
      `}
    break;
    case 'set':
      storeCard.setAttribute('href', `/set.html?id=${result.slug}`)
      var styledTitle = result.title.replace("\"", "<b>\"");
      styledTitle = replaceLast("\"", "\"</b>", styledTitle)
      storeCard.setAttribute('class', 'set-card shadow');
      storeCard.innerHTML = `
      <img src="${result.image}" alt="${result.image.imageAlt}">
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

function closeModal(id) {
  var modal = document.getElementById(id);
  modal.remove();
}

function comingSoon(keyword) {
  const comingSoonModal = document.createElement('div');
  comingSoonModal.setAttribute("id", "coming-soon");
  comingSoonModal.setAttribute("class", "shadow modal-window");
  comingSoonModal.innerHTML = `
    <div class="shadow modal-window" id="coming-soon">
      <button id="close" onclick="closeModal('coming-soon')">X</button>
      <img src="/images/coming-soon.jpg" alt="Graphic of a camp next to a river, with blue tarp roofs covering a tent, kitchen, dressers, and wrapped around an outdoor shower. it reads: Hey, trendsetter! As you can see, we are still setting up camp in this space.">
      <p>You are a bit early, but if you leave us your email or phone we will alert you to the launch date.</p>
      <form data="netlify" id="coming-soon-form">
          <input type="text" name="name" id="cs-name" placeholder="name">
          <input type="tel" name="phone" id="cs-phone" placeholder="phone">
          <input type="email" name="email" id="cs-email" placeholder="email">
          <input type="hidden" name="keyword" id="cs-keyword" value="${keyword}">   
      </form>
      <button class="striped-button" form="coming-soon-form" type="submit">Notify me</button>
      <p class="fine-print">All contact information is protected by ninjas and only used for this purpose</p>
    </div>
  `
  main.append(comingSoonModal);
}

function contactUs() {
  const contactModal = document.createElement('div');
  contactModal.setAttribute("id", "contact-us");
  contactModal.setAttribute("class", "shadow modal-window");
  contactModal.innerHTML = `
      <button id="close" onclick="closeModal('contact-us')">X</button>
      <div class="inset-row">
        <div class="column">
          <img src="/images/contact-us.jpg" alt="graphic of a dog, rabbit, and three baby chicks">
        </div>
        <div class="column">
          <h3 class="red-underline">Contact Us</h3>
          <p>We are small, so please look at these things before contacting us:</p>
          <a href="/return-policy">Return Policy</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <p>If you really still need to write us, then use the form below. No solicitations, please.</p>
        </div>
      </div>
      <form data="netlify" id="contact-us-form">
        <input type="text" name="name" id="cs-name" placeholder="name">
        <input type="email" name="email" id="cs-email" placeholder="email">  
        <textarea id="message" name="message" placeholder="message" rows="5" cols="33"></textarea>
      </form>
      <button class="striped-button padded-button" form="contact-us-form" type="submit">Submit</button>
  `
  main.append(contactModal);
}