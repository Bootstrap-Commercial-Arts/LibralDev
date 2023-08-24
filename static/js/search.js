const searchProjection = `_type == 'post' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'room' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'collection' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current},_type == 'set' => {_id, _type, 'image': image.asset->url, title, 'slug': slug.current}, _type == 'product' => {_type, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title }`;

function listResults(result, div){
    var searchResult = document.createElement("a");
    searchResult.setAttribute("class", "search-result");
    searchResult.setAttribute('href', `/${result._type}/${result.slug}`)

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    searchResult.append(cardImage);

    //Create Title
    var cardTitle = document.createElement("p");
    cardTitle.setAttribute("class","result-title")
    cardTitle.innerHTML = result.title;
    searchResult.append(cardTitle);
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
            case 'product': query = `[_type == 'product' && [store.title, title] match "${params.s}"] {_type, primary->, 'shopifyId': store.id, 'image': store.previewImageUrl, 'slug': store.slug.current, 'title': store.title, 'price': store.priceRange.minVariantPrice}`
            break;
            default: query = `[_type == '${type}' && [store.title, title] match "${params.s}"]{_id, _type, 'image': image.asset->url, title, 'slug': slug.current}`
            break;
        }
        // Query sanity api for each type and list the results in landingPad div
        sanityApiCall(encodeURIComponent(query)).then(res => {
            let results = document.getElementById('results');
            div = document.getElementById(type);
            if(res[0]) {
                switch(type) {
                    case 'product':
                    case 'set': 
                        let resultGrid = document.createElement('div');
                        resultGrid.setAttribute('class', 'product-set-row');
                        resultGrid.setAttribute('id', `${type}-grid`);
                        div.append(resultGrid);
                        res.forEach((line)=>{
                            setProductCard(line, `${type}-grid`);
                        });
                    break;
                    default:
                        // Display each item of the given type
                        res.forEach((line)=>{
                            listResults(line,div);
                        });
                }
                results.append(div);
            } else {
                let defaultMessage = document.createElement('p');
                defaultMessage.setAttribute('class', 'default-message')
                defaultMessage.innerHTML = `No ${type}s match your search.`
                div.append(defaultMessage)
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




// Filter results
const searchFilter = document.forms.searchFilters;

function filterResults(event){
    event.preventDefault();
    const typesArray = ['collection', 'room', 'set', 'product', 'room']
    const formData = new FormData(searchFilter);
    const formDataObject = Object.fromEntries(formData.entries());
    const formDataArray = Object.keys(formDataObject);
    typesArray.forEach((key) => {
        let resultDiv = document.getElementById(key);
        if(formDataArray.includes(key)){
            resultDiv.setAttribute('style', 'display:block;')
        } else {
            resultDiv.setAttribute('style', 'display:none;')
        }
    });
}
searchFilter.addEventListener('change', filterResults);