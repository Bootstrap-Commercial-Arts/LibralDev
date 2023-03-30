// Store Page Product and Set Card Creation
let storeSetProductCards = function(result, destinationId) {
    result.products.forEach(product => {
        let storeCard = document.createElement('a');
        if(product.primary){
        var styledPrimary = product.primary.title.replace("\"", "<b>\"");
        styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
        storeCard.setAttribute('class', 'store-card');
        storeCard.innerHTML = `
            <img class="shadow" src="${product.store.previewImageUrl}">
            <a class="pill" href="${product.primary.slug.current}">${styledPrimary}</a>
            <h3>${product.store.title}</h3>
            <p class="price">$${product.store.priceRange.minVariantPrice}</p>  
        `} else {
            storeCard.innerHTML = `
            <img class="shadow" src="${product.store.previewImageUrl}">
            <h3>${product.store.title}</h3>
        `}
        let destination = document.getElementById(destinationId)
        destination.append(storeCard);
        console.log(product);
    });
    result.sets.forEach(set => {
        let storeCard = document.createElement('div');
        var styledTitle = set.title.replace("\"", "<b>\"");
        styledTitle = replaceLast("\"", "\"</b>", styledTitle)
        storeCard.setAttribute('class', 'store-card');
        storeCard.setAttribute('class', 'store-card');
        storeCard.innerHTML = `
        <img src="${set.imageUrl}">
        <h3>${styledTitle}</h3>
        `
        let destination = document.getElementById(destinationId)
        destination.append(storeCard);
        console.log(set);
    }); 
    
  }

let storeSliders = function(collectionName, targetDiv) {
    let query = encodeURIComponent(`[_type == 'collection' && title == "${collectionName}"] {'products': products[].product->{..., primary->}, 'sets': sets[].set->{..., 'imageUrl': image.asset->.url}}`);
    sanityApiCall(query).then(res => {
        storeSetProductCards(res.result[0],targetDiv);
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


