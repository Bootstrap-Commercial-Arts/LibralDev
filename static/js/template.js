const carouselHeader = document.createElement('header')
carouselHeader.innerHTML = `
    <header>
        <div id="header-icons">
            <a href="cart.html" id="cart-icon" class="shadow">
                <img src="/images/cart.png" alt="Cart Icon">
            </a>
            <img src="/images/search.png" alt="Search Icon" id="search-icon" class="shadow">
        </div>
        <div id="search-modal" class="shadow" style="display: none;">
            <form id="search-bar" name="searchBar">
                <h3>Looking for something?</h3>
                <p>Search for products, sets, collections, or House Geek content here.</p>
                <input id="sb-search-input" placeholder="Enter your search term..." type="search" value="" name="search" id="search">
                <button id="sb-search-submit" type="submit" alt="search">Search</button>
            </form>
        </div>
    <div id="logo">
        <a href="/" class="shadow">
            <img src="images/logo.png">
        </a>
    </div>
    <div id="global-nav">
        <a href="/index.html#house-geek" id="house-geek-button" class="striped-button flex">
            <img src="/images/cart-dark.png">
            <div class="right-text">
            <p class="bolder caps">Explore the rotating</p><p class="alternates">rooms of HOUSE GEEK</p>
            </div>
        </a>
        <a href="store.html" id="store-button" class="striped-button flex">
            <img src="/images/home-dark.png">
            <div class="right-text">
            <p class="bolder caps">Browse our souvenirs</p><p class="alternates">fun shirts and swag</p>
            </div>
        </a>
    </div>
    <div class="xl-row sub-nav">
        <a href="/collection.html?id=cookie-clouds" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/CookieClouds.jpg" alt="The Cookie Clouds Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=house-geek" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/HouseGeek.jpg" alt="The House Geek Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=tshit-blog" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/t-SHITBlog.jpg" alt="The t-SHIT Blog Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=black-lives-matter" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/BlackLivesMatter.jpg" alt="The Black Lives Matters Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=chicken-strip" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/ChickenStrip.jpg" alt="The Chicken Strip Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=magic-sack" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/MagicSack.jpg" alt="The Magic Sack Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=colorful-individuals" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/ColorfulIndividuals.jpg" alt="The Colorful Individuals Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=blood-on-the-ice-hockey-fan" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/BloodOnTheIce.jpg" alt="The Blood on the Ice Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=draw-hot-dog" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/DrawHotDog.jpg" alt="The Draw Hot Dog Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=collections" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/TheCollectionCollection.jpg" alt="The Collection Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=psa" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/PSAs.jpg" alt="The PSA Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=honest" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/Honest.jpg" alt="The Honest Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=fight-with-your-mind" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/FWYM.jpg" alt="The Fight With Your Mind Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=up-by-the-bootstraps" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/UpByTheBootstraps.jpg" alt="The Up By The Bootstraps Collection" class="prod-cat-image">
        </a>

        <a href="/collection.html?id=ak-papercraft" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/AK-Papercraft.jpg" alt="The AK Papercraft Collection" class="prod-cat-image">
        </a>
    </div>
    </header>
`
const header = document.createElement('header')
header.innerHTML = `
    <header>
        <div id="header-icons">
            <a href="cart.html" id="cart-icon" class="shadow">
                <img src="/images/cart.png" alt="Cart Icon">
            </a>
            <img src="/images/search.png" alt="Search Icon" id="search-icon" class="shadow">
        </div>
        <div id="search-modal" class="shadow" style="display: none;">
            <form id="search-bar" name="searchBar">
                <h3>Looking for something?</h3>
                <p>Search for products, sets, collections, or House Geek content here.</p>
                <input id="sb-search-input" placeholder="Enter your search term..." type="search" value="" name="search" id="search">
                <button id="sb-search-submit" type="submit" alt="search">Search</button>
            </form>
        </div>
    <div id="logo">
        <a href="/" class="shadow">
            <img src="images/logo.png">
        </a>
    </div>
    <div id="global-nav">
        <a href="/index.html#house-geek" id="house-geek-button" class="striped-button flex">
            <img src="/images/cart-dark.png">
            <div class="right-text">
            <p class="bolder caps">Explore the rotating</p><p class="alternates">rooms of HOUSE GEEK</p>
            </div>
        </a>
        <a href="store.html" id="store-button" class="striped-button flex">
            <img src="/images/home-dark.png">
            <div class="right-text">
            <p class="bolder caps">Browse our souvenirs</p><p class="alternates">fun shirts and swag</p>
            </div>
        </a>
    </div>
    </header>
`

const footer = document.createElement('footer')
footer.innerHTML = `
    <p>I'm a Footer</p>
`

function template(div, placement, contents){
    let  parent= document.getElementById(div);
    switch(placement){
        case 'prepend': parent.prepend(contents);
        break;
        case 'append': parent.append(contents);
    }
}