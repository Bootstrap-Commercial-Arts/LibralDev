const carouselHeader = document.createElement('header')
carouselHeader.innerHTML = `
        <div id="header-icons">
            <a href="cart.html" id="cart-icon" class="shadow">
                <img src="/images/cart.png" alt="Cart Icon">
            </a>
            <img src="/images/search.png" alt="Search Icon" id="search-icon" class="shadow">
        </div>
        <div id="search-modal" class="shadow modal-window" style="display: none;">
            <form id="search-bar" name="searchBar">
                <h3>Looking for something?</h3>
                <p>Search for products, sets, collections, or House Geek content here.</p>
                <input id="sb-search-input" placeholder="Enter your search term..." type="search" value="" name="search" id="search">
                <button id="sb-search-submit" type="submit" alt="search">Search</button>
            </form>
        </div>
    <div id="logo">
        <a href="/" class="shadow">
            <img src="/images/logo.png">
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
        <a href="/collection/cookie-clouds" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/CookieClouds.jpg" alt="The Cookie Clouds Collection" class="prod-cat-image">
        </a>

        <a href="/collection/house-geek" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/HouseGeek.jpg" alt="The House Geek Collection" class="prod-cat-image">
        </a>

        <a href="/collection/tshit-blog" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/t-SHITBlog.jpg" alt="The t-SHIT Blog Collection" class="prod-cat-image">
        </a>

        <a href="/collection/black-lives-matter" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/BlackLivesMatter.jpg" alt="The Black Lives Matters Collection" class="prod-cat-image">
        </a>

        <a href="/collection/chicken-strip" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/ChickenStrip.jpg" alt="The Chicken Strip Collection" class="prod-cat-image">
        </a>

        <a href="/collection/magic-sack" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/MagicSack.jpg" alt="The Magic Sack Collection" class="prod-cat-image">
        </a>

        <a href="/collection/colorful-individuals" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/ColorfulIndividuals.jpg" alt="The Colorful Individuals Collection" class="prod-cat-image">
        </a>

        <a href="/collection/blood-on-the-ice-hockey-fan" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/BloodOnTheIce.jpg" alt="The Blood on the Ice Collection" class="prod-cat-image">
        </a>

        <a href="/collection/draw-hot-dog" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/DrawHotDog.jpg" alt="The Draw Hot Dog Collection" class="prod-cat-image">
        </a>

        <a href="/collection/collections" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/TheCollectionCollection.jpg" alt="The Collection Collection" class="prod-cat-image">
        </a>

        <a href="/collection/psa" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/PSAs.jpg" alt="The PSA Collection" class="prod-cat-image">
        </a>

        <a href="/collection/honest" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/Honest.jpg" alt="The Honest Collection" class="prod-cat-image">
        </a>

        <a href="/collection/fight-with-your-mind" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/FWYM.jpg" alt="The Fight With Your Mind Collection" class="prod-cat-image">
        </a>

        <a href="/collection/up-by-the-bootstraps" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/UpByTheBootstraps.jpg" alt="The Up By The Bootstraps Collection" class="prod-cat-image">
        </a>

        <a href="/collection/ak-papercraft" class="sub-nav-item shop-nav-item">
            <img src="/images/carousel/AK-Papercraft.jpg" alt="The AK Papercraft Collection" class="prod-cat-image">
        </a>
    </div>
`
const header = document.createElement('header')
header.innerHTML = `
        <div id="header-icons">
            <a href="cart.html" id="cart-icon" class="shadow">
                <img src="/images/cart.png" alt="Cart Icon">
            </a>
            <img src="/images/search.png" alt="Search Icon" id="search-icon" class="shadow">
        </div>
        <div id="search-modal" class="shadow modal-window" style="display: none;">
            <form id="search-bar" name="searchBar">
                <h3>Looking for something?</h3>
                <p>Search for products, sets, collections, or House Geek content here.</p>
                <input id="sb-search-input" placeholder="Enter your search term..." type="search" value="" name="search" id="search">
                <button id="sb-search-submit" type="submit" alt="search">Search</button>
            </form>
        </div>
    <div id="logo">
        <a href="/" class="shadow">
            <img src="/images/logo.png">
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
`

const footer = document.createElement('footer')
footer.innerHTML = `
<div class="xl-row" id="footer-row-1">
    <div class="inset-row"> 
        <div class="column" id="footer-lou">
            <div class="inset-row" id="lou-header">
                <div class="column">
                    <img src="/images/lou-says.png">
                </div>
                <div class="column" >
                <h1>Who's Lou?</h1>
                <h4>...and what's the liberation of R&A?</h4>
                </div>
            </div>
            
            <div class="inset-row">
                <div class="column">
                    <h4>Meet "Lou", the non-binary neurodivergent digital overlord of LibRAL Arts.</h4>
                    <p>Lou greets you at "first scoll" to welcome you into their world of possibility, rich with a labyrinth of lands that make up the world of LibRAL Arts.</p>
                    <p>Co-owners, R. & A. Douglas named the site in honor of their personal journey of "lib"eration from the harmful social constructs, propaganda, and ignorant fears that cause systematic oppression.  </p>
                    <p> <p>Lou, and their cast of supporting characters–as well as the all original art featured on the functional products and apparel in the LibRAL Arts souvenir shop–tell their story and give validation and language to the inequalities that are often difficult for oppressed communities to express or escape.</p> 
                    <p>Through the LIbRAL Arts immersive website experience, audiences can follow the cheeky and geeky duo as they navigate their neurodivergent & queer post-gender journeys to embrace their authenticity and imagine into existence a space safe for others to do the same.</p>
                </div>
                <div class="column" id="diversity-footer">
                    <h2>Diversity Liberation</h2>
                    <h4>Free your authenticity</h4>
                    <p> <span class="bold">Welcome to the secret inner world of autism, where there is no normal, and most social constructs are missing!</span></p>
                    <p>When we view neurodivergent traits as the strengths they are, a world of possibility is revealed, and many solutions await our discovery.</p>
                    <p>The majority of the art featured in the LibRAL Arts Souvenir Shop is created by a dysgraphic artist. With compromised dexterity, an entirely new approach to photo-realistic drawing was developed.</p>
                    <div id="FWYM-ad">
                        <div id="FWYM-header">
                            <img src="/images/FWYM-color-logo.png" alt="Fight With Your Mind logo">
                        </div>
                        <p style="font-weight:400">Fight ableism with solutions from the mind</p>
                        <div id="FWYM-body">
                            <img src="/images/brainwashing.png" alt="graphic of a brain with arrows pointing into it">
                            <p>On a journey to overcome internalized shame, fightwithyourmind.org explores the silent code in our experiences and what could be possible in a society that values our differences.</p>
                        </div>
                        <a id="FWYM-button" href="#">Read More</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="column" id="footer-social">
                <h5 id="social-header">We are not competing with social media–we are providing an alternative. 
                Wake up from your thoughtlessness.</h5>
                <p class="italic">Our thoughtlessness alone isn’t very powerful–but a population acting thoughtlessly on platforms with billions of users predictably sets trends for the behavior of the entire human race.</p>
                <img src="/images/social-media-brainwash.jpg">
                <h4>EXPLORE THE ROOMS OF</h4>
                <h1>HOUSE GEEK</h1>
                <h5>THE SOCIAL MEDIA ALTERNATIVE</h5>
                <p class="italic">A familiar space to come in and spend some time</p>
                <p>The rooms of House Geek await your curious eyes! Allow us to entertain you while challenging you to think.</p> 
                
                <p>Inside is media of all shapes and sizes… </p>

                <ul>
                    <li><b>Laugh</b> until you poop with geeky and cheeky webcomics, and catch the latest from Bootstrap Publications including periodic chapter releases from Lou's sci-fi novel, collections of short stories, and children's books on "uncomfortable subjects".</li>
                    <li><b>Listen</b> to Blue Marlin Records music or the Nine to Fiveless Podcast with the co-creator spouse duo. </li>
                    <li><b>Visit</b> our virtual gallery and online performance space, presented by Dark Side of the Lens Photography</li>
                    <li><b>Stream</b> our music concert series, "Doing the right thing for the right reasons", songs from the community. Coming Soon!</li>
                    <li><b>Celebrate</b> a whole calendar year of invented holidays and quirky traditions to match. </li>
                    <li><b>Appreciate</b> your authenticity in our spaces dedicated to supporting the community and arming allies with the truth.</li>
                    <li><b>Discover</b> what's new since your last visit & enjoy today's digital browsing adventure! </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="xl-row" id="footer-row-2">
    <div class="inset-row" id="accommodations">
        <div class="column">
            <h2>Accommodation services</h3>
            <h3>This site was designed & coded <br>to be accessible for all.</h3>
        </div>
        <div class="column">
            <p>We provide alt text for all images and use Semantic HTML in order for screen readers and other assistive technologies to work as intended.</p>
            <p>WCAG 2.0 level AA contrast compliant in all designs throughout the site.</p>
            <p>If you have accessibility needs beyond what we thought to provide, we apologize, and please <a onclick="contactUs()">contact us</a> so we can correct this oversight.</p>
        </div>
    </div>
    <div class="inset-row" id="win-the-internet">
        <h4>Win the internet!!!</h4>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
        <a href="#" class="striped-button">Learn More</a>
    </div>
    <div class="inset-row" id="bootstrap-footer-row">
        <div class="column">
            <img src="/images/bootstrap-footer-logo.png">
            <div class="inset-row">
                <div class="column">
                    <h5>LibRAL Arts is one of 4 arms of Bootstrap Commercial Arts that together form a machine to fight back against the devaluing of the truth, the ignorance that comes with it, and the resulting oppression and injustice.</h5>
                    <p>With more creative minds than those we oppose, and our secret weapon–doing the right thing–we have created long-term multi-generation plans to disassemble the systems that perpetually block us from our goals of real equality and acceptance of each other. </p>
                </div>
                <div class="column">
                <p>At Bootstrap, we reject the baselines that create the illusion that change is too difficult–things are the way they are because we continue to make them that way.</p>
                <p class="italic">We refuse to accept the dire fates thrust upon us as oppressed people or as a generation fighting for the possibility of a future. We burn but we are not consumed.</p> 
                <p>Learn more about our machine for justice, and the experiences that have informed its architecture.</p>
                <a class="gray-button" href="https://bythebootstrap.us" target="_blank">Visit Website</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="xl-row" id="footer-row-3">
    <div class="inset-row">
        <div class="column">
            <img src="/images/honest-logo.png">    
            <p class="italic">A transparent small business economy built on sustainability models and social responsibility, instead of a corrupt corporate economy with power over political leadership and personal data.</p>
            <p>Honesty to the client, honesty to the public</p>
            
            <p>Marketers that have turned on the corporate advertising industry unite to create a small business driven economy, run by the next generation of business minds–those that do the right things for the right reasons.</p>   
            
            <p>Honest Marketing and Business Development has been dedicated for decades to building a business model designed to undercut the power of corporations without waiting for congress to change laws slowly. We accomplish what politicians can't by giving the consumer a cheaper option, without sacrificing quality or taking more time to provide it.</p> 
            
            <p>Turns out, doing the right thing is also good for business!</p>
            <a onclick="comingSoon()" class="gray-button" target="_blank">Coming Soon</a>
        </div>
        <div class="column">
            <img src="/images/by-the-bootstraps-logo.png">
            <p class="italic">Fighting injustice and inequality on behalf of those struggling to survive without housing or sufficient income.</p>
            <p>By providing a community and acknowledging and addressing root causes of extreme poverty, we make it possible for wounds to heal to allow for new bandwidth to navigate housing and employment with others in like circumstances.</p>
            <p>Our four-step program, resource center, training hub, employment entry program, and support groups work together to provide a path to success in a society that misunderstands the subject enough to continue ignoring it.</p>
            <p>We are proud to share that Up By The Bootstraps requires no government assistance, capital, or public monetary donation to operate.</p>
            <a onclick="comingSoon()" class="gray-button" target="_blank">Coming Soon</a>
        </div>
        <div class="column">
            <img src="/images/fwym-logo.png">
            <p class="italic">Fight With Your Mind is dedicated to helping people get comfortable with the things they are unfamiliar with so that discomfort does not become ignorance.</p>
            <p>By honestly acknowledging the real factors that create and perpetuate extreme poverty in our society, we can address trauma recovery and create long-term systemic solutions instead of blaming the victim or passing the responsibility to good samaritan citizens.</p>
            <p>Our four-step program, resource center, training hub, employment entry program, and support groups work together to provide a path to success in a society that misunderstands the subject enough to continue ignoring it.</p>
            <p>We are proud to share that our unique approaches to poverty are carried out without government assistance or public donation, and UBTB was designed to provide help without an operating budget in order to be easily reliable to those that need help.</p>
            <p>Learn more about using Up by the Bootstraps for self-help or to help others.</p>
            <a href="https://fightwithyourmind.org" class="gray-button" target="_blank">Visit Website</a>
        </div>
    </div>
</div>
<div class="xl-row" id="footer-row-4">
    <div class="inset-row">
        <div class="column">
            <h3>house geek</h3>
            <ul>
                <li><a href="#">The Playbook</a></li>
                <li><a href="#">Might be Something, Might be Nothing</a></li>
                <li><a href="#">Learning!!!</a></li>
                <li><a href="#">Chicken Strip</a></li>
                <li><a href="#">Sunday School</a></li>
                <li><a href="#">Traditions</a></li>
            </ul>
            </div>
        <div class="column">
        <h3>Souvenir Shop</h3>
            <ul>
                <li><a href="#">shop</a></li>
                <li><a href="#">collection one</a></li>
                <li><a href="#">another collection</a></li>
                <li><a href="#">collection three</a></li>
                <li><a href="#">yet another collection</a></li>
                <li><a href="#">collection five</a></li>
            </ul>
        </div>
        <div class="column">
            <h3>Account Pages</h3>
            <ul>
                <li><a href="/shipping-policy.html">shipping policy</a></li>
                <li><a href="/return-policy.html">return policy</a></li>
                <li><a href="/privacy-policy.html">privacy policy</a></li>
                <li><a href="/terms-and-conditions.html">terms & conditions</a></li>
                <li><button class="ghost-button padded-button" onclick="contactUs()">Contact Us</button>
            </ul>
        </div>
    </div>
    <p style="text-align:center; padding: 2rem; color: #999999;">©2023 Bootstrap Commercial Arts</p>
</div>
`

function template(div, placement, contents){
    let  parent= document.getElementById(div);
    switch(placement){
        case 'prepend': parent.prepend(contents);
        break;
        case 'append': parent.append(contents);
    }
}

const subnavScript = function(){
    $('.sub-nav').slick({
        slidesToShow: 7,
        slidesToScroll: 2,
        swipeToSlide: true,
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: false,
        responsive:[
        {
            breakpoint: 1200,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 4
            }
        },
        {
            breakpoint: 680,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 2
            }
        }]
    });
}