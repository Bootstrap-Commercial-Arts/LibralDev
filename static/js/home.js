// Product and Set Card Creation

let productAndSetCard = function(result, destination) {
    var card = document.createElement("a");
    card.setAttribute("class", `card ${result._type}-card`);

    //Create Image
    var cardImage = document.createElement("img");
    cardImage.src = result.image;
    card.append(cardImage);

  //Create card text div
    var cardDiv = document.createElement("div");
    card.append(cardDiv);

    //Create Primary Set or Collection Label
    if(result.primary) {
        var cardPrimary = document.createElement("a");
        var styledPrimary = result.primary.title.replace("\"", "<b>\"");
        styledPrimary = replaceLast("\"", "\"</b>", styledPrimary)
        cardPrimary.setAttribute("class", "pill")
        cardPrimary.innerHTML = styledPrimary;
        cardPrimary.href = `/${result.primary._type}.html?id=${result.primary.slug.current}`
        cardDiv.append(cardPrimary);
    }

    //Create Title
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = result.title;
    cardDiv.append(cardTitle);

    //Create Minimum Price
    if(result._type == 'product') {
        var cardPrimary = document.createElement("p");
        cardPrimary.innerHTML = '$' + result.store.priceRange.minVariantPrice.toFixed(2);
        cardDiv.append(cardPrimary);
    }

    //Create link
    card.href = `/${result._type}.html?id=${result.slug}`;

    destination.append(card);
}


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
