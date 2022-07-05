const setAndProductProjection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, store }`;
const paramsString = new URLSearchParams(window.location.search);
const params = Object.fromEntries(paramsString);
let shopifyPromise;
let sanityPromise;


// Shopify API Call
function shopifyApiCall(query) {
    return fetch('https://libral-arts.myshopify.com/api/2022-07/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/graphql',
          'X-Shopify-Storefront-Access-Token': 'f0d7ab9fde67d917211193ed62ebe101'
        },
        "body": query
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


// Product and Set Card Creation

let productAndSetCard = function(result) {
    var productCard = document.createElement("div");
    productCard.setAttribute("class", "card product-card");

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    productCard.append(cardImage);

    //Create Primary Set or Collection Label
    if(result.primary) {
        var cardPrimary = document.createElement("a");
        var styledPrimary = result.primary.title.replace("\"", "<b>\"");
        styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
        cardPrimary.setAttribute("class", "pill")
        cardPrimary.innerHTML = styledPrimary;
        cardPrimary.href = `/${result.primary._type}.html?id=${result.primary.slug.current}`
        productCard.append(cardPrimary);
    }

    //Create Title
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = result.title;
    productCard.append(cardTitle);

    //Create Minimum Price
    if(result._type == 'product') {
        var cardPrimary = document.createElement("p");
        cardPrimary.innerHTML = '$' + result.store.priceRange.minVariantPrice.toFixed(2);
        productCard.append(cardPrimary);
    }

    //Create Button
    var cardButton = document.createElement("a");
    cardButton.setAttribute("class", "blue-button")
    cardButton.innerHTML = "Select Options";
    cardButton.href = `/${result._type}.html?id=${result.slug}`;
    productCard.append(cardButton); 

    cards.append(productCard);
}


//Find & Replace Last Instance of Character
function replaceLast(find, replace, string) {
  var lastIndex = string.lastIndexOf(find);
  
  if (lastIndex === -1) {
      return string;
  }
  
  var beginString = string.substring(0, lastIndex);
  var endString = string.substring(lastIndex + find.length);
  return beginString + replace + endString;
}
