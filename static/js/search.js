const searchProjection = `_type == 'post' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'room' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'collection' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_type, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title }`;

function listResults(result, divParam){
    var searchResult = document.createElement("a");
    searchResult.setAttribute("class", "search-result");
    searchResult.setAttribute('href', `/${result._type}.html?id=${result.slug}`)

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    searchResult.append(cardImage);

    //Create Primary Set or Collection Label
    if(result.primary) {
        var cardPrimary = document.createElement("a");
        var styledPrimary = result.primary.title.replace("\"", "<b>\"");
        styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
        cardPrimary.setAttribute("class", "pill")
        cardPrimary.innerHTML = styledPrimary;
        cardPrimary.href = `/${result.primary._type}.html?id=${result.primary.slug.current}`
        searchResult.append(cardPrimary);
    }

    //Create Title
    var cardTitle = document.createElement("p");
    cardTitle.setAttribute("class","result-title")
    cardTitle.innerHTML = result.title;
    searchResult.append(cardTitle);

    div = document.getElementById(divParam);
    div.append(searchResult);
}

// function searchSanity() {
//     let query = encodeURIComponent(`[_type in ["product", "set", "collection", "room", "post"] && [store.title, title] match "${params.s}"] {${searchProjection}} | order(_type desc)`);
//     sanityApiCall(query).then(res => {
//         console.log(sanityPromise)
//         sanityPromise.forEach((line)=>{
//             listResults(line)
//         });
//         if(sanityPromise.length == 0) {
//             let message = document.createElement('p');
//             message.innerHTML = "Looks like there's nothing here!";
//             message.setAttribute('class', 'default-message')
//             results.append(message);
//         };
//     });
    
// }

function searchSanity() {
    let query
    ['product', 'set', 'collection', 'room', 'post'].forEach(type => {
        switch (type) {
            case 'product': query = `[_type == 'product' && [store.title, title] match "${params.s}"] {_type, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title }`
            break;
            default: query = `[_type == '${type}' && [store.title, title] match "${params.s}"]{_id, _type, 'image': image.asset->url, title, 'slug': slug.current}`
            break;
        }
        // Query sanity api for each type and list the results in landingPad div
        sanityApiCall(encodeURIComponent(query)).then(res => {
            if(res[0]) {
                console.log(res)
                div = document.getElementById(type);
                div.innerHTML = `<h4>${type}s</h4>`
                // Display each item of the given type
                res.forEach((line)=>{
                    listResults(line,type);
                });
            }
            
        }); 
    });
    
}


searchSanity();




// Static search bar
const staticSearchForm = document.forms.staticSearchBar;
const searchField = document.getElementById('search-input');
searchField.value = params.s;

function staticSearchBarSubmit(event){
  event.preventDefault();
  const formData = new FormData(staticSearchForm);
  window.location.href = '/search.html?s=' + formData.get('search')

}
staticSearchForm.addEventListener('submit', staticSearchBarSubmit);