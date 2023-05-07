let collectionData = function() {
    let query = encodeURIComponent(`[_type == 'collection' && slug.current == '${params.id}'] {title, description, 'image': image.asset->.url, 'featuredSet': featuredSet.set->{title, 'image': image.asset->.url, description, 'slug': slug.current}, theme, 'slug': slug.current, 'products': products[].product->{'price': store.priceRange.minVariantPrice, 'slug': store.slug.current, 'tags': store.tags, 'title': store.title, _type, 'image': store.previewImageUrl}, 'sets': sets[].set->{title, _type, 'slug': slug.current, 'image': image.asset->.url}}
    `);
    sanityApiCall(query)
    .then(() => {
        // Featured Set Data
        let posters = document.getElementsByClassName('poster');
        for (const poster of posters) {
            poster.innerHTML = `<img src="${sanityPromise.featuredSet.image}"><h3>${sanityPromise.featuredSet.title}</h3>`;
        }
        let featuredSetInfo = document.getElementById('featured-set-text');
        featuredSetInfo.innerHTML = `<h2>Featured Set</h2>
            <h1 id="featured-title">${sanityPromise.featuredSet.title}</h1>
            <p id="featured-description">${sanityPromise.featuredSet.description}</p>
            <a class="striped-button" href="/set.html?id=${sanityPromise.featuredSet.slug}">View Set</a>`;
        
        // Collection info
        let collectionRow = document.getElementById('collection-row');
        collectionRow.innerHTML = `<div class="inset-row" style="display: block">
            <img src="${sanityPromise.image}">
            <p>${sanityPromise.description}</p>`;
        collectionRow.setAttribute('style', `background: url("/images/background-overlay.png"), var(--${sanityPromise.theme});`);

        // Sets
        for (const set of sanityPromise.sets){
            setProductCard(set, 'sets')
        }

        // Products
        for (const product of sanityPromise.products){
            setProductCard(product, 'products')
        }
    });
}

collectionData()