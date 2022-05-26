var cards = document.createElement("div");
cards.setAttribute("class", "grid-row");
cards.setAttribute("id", "cards");

let homeFeaturedProducts = function() {
    let fetchQuery = `[_id in ["c6a2ffaf-1b00-49f4-9469-98c2085045f0", "shopifyProduct-7534191050939", "shopifyProduct-7534191444155", "6ab49bac-ec3a-4f04-b700-1c0514a025dd"]] {${projection}}`;
    let encodedQuery = encodeURIComponent(fetchQuery);
    var featuredProducts = document.getElementById("featured-products")
    

    fetch(`https://${projectId}.api.sanity.io/${apiDate}/data/query/${dataSet}?query=*${encodedQuery}`)
    .then(res => res.json())
    .then(res => {
        res.result.forEach((item)=>{
            cards.append(productAndSetCard(item))
        });
        if(res.result.length > 0) {
            featuredProducts.append(cards);
        }
    });
    
}