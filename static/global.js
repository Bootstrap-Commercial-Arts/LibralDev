const projectId = 'umt44hrc';
const apiDate = 'v2022-01-01';
const dataSet = 'production';
const projection = `_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_id, _type, louLink, louText, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug, 'title': store.title}`;


let productAndSetCard = function(result) {
    var productCard = document.createElement("div");
    productCard.setAttribute("class", "card product-card");

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    productCard.append(cardImage);

    //Create Title
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = result.title;
    productCard.append(cardTitle);

    //Create Button
    var cardButton = document.createElement("a");
    cardButton.innerHTML = "Select Options";
    cardButton.href = "#";
    productCard.append(cardButton); 

    cards.append(productCard);
}