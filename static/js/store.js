// Store Page Product and Set Card Creation
let storeSetProductCards = function(result, destinationId) {
    result.products.forEach(product => {
        let storeCard = document.createElement('div');
        storeCard.setAttribute('class', 'store-card');
        storeCard.innerHTML = `
        <img src="${product.store.previewImageUrl}">
        `
        let destination = document.getElementById(destinationId)
        destination.append(storeCard);
        console.log(product);
    });
    result.sets.forEach(set => {
        // let storeCard = document.createElement('div');
        // storeCard.setAttribute('class', 'store-card');
        // storeCard.innerHTML = `
        // <img src="${set.store.previewImageUrl}">
        // `
        // let destination = document.getElementById(destinationId)
        // destination.append(storeCard);
        console.log(set);
    }); 
    
  }

let storeSliders = function(collectionName, targetDiv) {
    let query = encodeURIComponent(`[_type == 'collection' && title == "${collectionName}"] {'products': products[].product->, 'sets': sets[].set->}`);
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


