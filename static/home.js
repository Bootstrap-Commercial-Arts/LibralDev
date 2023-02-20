

//Get Featured Products for the homepage
var cards = document.getElementById("featured-products");

let homeFeaturedProducts = function() {
    let query = encodeURIComponent(`[_id in ["c6a2ffaf-1b00-49f4-9469-98c2085045f0", "shopifyProduct-7534191050939", "shopifyProduct-7534191444155", "shopifyProduct-7559788626107"]] {${setAndProductProjection}}`);
    sanityApiCall(query).then(res => {
        res.result.forEach((item)=>{
            productAndSetCard(item, cards)
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

houseGeekImages();
