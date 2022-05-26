let homeFeaturedProducts = function() {
    let fetchQuery = `[_id in ["c6a2ffaf-1b00-49f4-9469-98c2085045f0", "shopifyProduct-7534191050939"]] {${projection}}`;
    let encodedQuery = encodeURIComponent(fetchQuery);
    fetch(`https://${projectId}.api.sanity.io/${apiDate}/data/query/${dataSet}?query=*${encodedQuery}`)
    .then(res => res.json())
    .then(res => {
        res.result.forEach((item)=>{
            console.log(item) 
        });
    })
}