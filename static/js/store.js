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


