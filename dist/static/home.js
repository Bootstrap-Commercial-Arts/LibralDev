

//Get Featured Products for the homepage
var cards = document.createElement("div");
cards.setAttribute("class", "grid-row");
cards.setAttribute("id", "cards");

let homeFeaturedProducts = function() {
    let query = encodeURIComponent(`[_id in ["c6a2ffaf-1b00-49f4-9469-98c2085045f0", "shopifyProduct-7534191050939", "shopifyProduct-7534191444155", "6ab49bac-ec3a-4f04-b700-1c0514a025dd"]] {${setAndProductProjection}}`);
    sanityApiCall(query).then(res => {
        res.result.forEach((item)=>{
            productAndSetCard(item)
        });
        if(res.result.length > 0) {
            var featuredProducts = document.getElementById("featured-products")
            featuredProducts.append(cards);
        };
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
