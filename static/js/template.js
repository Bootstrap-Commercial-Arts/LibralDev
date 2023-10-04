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
<div class="grid-row" id="footer-row-1">
            <div class="column" id="footer-lou">
                <div id="lou-header">
                    <div class="column">
                        <img src="/images/lou-says.png">
                    </div>
                    <div class="column" >
                        <h1>Who's Lou?</h1>
                        <h4>...and what's the liberation of R&A?</h4>
                        <h5>Meet, "Lou", the non-binary neurodivergent digital overlord of LibRAL Arts.</h5>
                    </div>
                </div>
                <p>Co-owners, R. & A. Douglas named the site in honor of their personal journey of "lib"eration from the harmful social constructs, propaganda, and ignorant fears that cause systematic oppression.</p>
                <img src="/images/cast-of-characters.png" alt="Graphic of Lou, a robot, evil scientist, construction worker, theif, femme viking, French artist, vampire, and grandma">
                <p>Lou & their cast of supporting characters <span class="bold italic">–as well as the all original art featured on the functional products and apparel in the LibRAL Arts souvenir shop–</span> tell their story and give validation and language to the inequalities that are often difficult for oppressed communities to express or escape.</p> 
                <p>Through the LIbRAL Arts immersive website experience, audiences can follow the cheeky and geeky duo as they navigate their</p>
                <img src="/images/our-journey.png" alt="Graphic of R. & A. Douglas in front of a computer designing a chicken graphic, while a small chick stands on the monitor & an octopus waiving a pride flag rests in the potted plant nearby on the desk">
                <p>neurodivergent & queer post-gender journey to embrace their authenticity and imagine into existence a space safe for others to do the same.
                </p>
            </div>
            <div class="inset-row" id="footer-social">
                <div class="column">
                    <h2>Social Media</h2>
                    <h1>Alternative</h1>
                    <h5>We are not competing with social media–</h5>
                    <h5>–we are providing an alternative.</h5>
                    <img src="/images/social-media-brainwash.jpg" alt="Graphic of the French artist holding a smart phone, while its head is being emptied">
                    <h6>Wake up from your thoughtlessness</h6>
                    <p class="italic small-text">Our thoughtlessness alone isn’t very powerful–but a population acting thoughtlessly on platforms with billions of users predictably sets trends for the behavior of the entire human race.</p>
                    <h4>Explore the Rooms of</h4>
                    <h1>House Geek</h1>
                    <h5 class="italic">The Social Media Alternative</h5>
                    <p class="small-text">A familiar space to come in and spend some time</p>
                    <p class="small-text">Allow us to entertain you while challenging you to think.</p> 
                </div>
                <div class="column">
                    <h3>The infinitely spacious rooms of House Geek await your curious eyes!</h3>
                    <p>Inside is media of all shapes and sizes…</p>
                    <ul>
                        <li><b>Laugh</b> uncomfortably with geeky and cheeky webcomics, in <span class="bold italic">Funny Pages</span>. Read the latest from <span class="bold italic">Bootstrap Publications</span>, including periodic chapter releases from Lou's sci-fi novel, and children's books that prevent ignorance by <span class="bold italic">Banning Karens.</li>
                        <li><b>Listen</b> to music from <span class="bold italic">Blue Marlin Records</span> and <span class="bold italic">Safety First Sound</span>. Aurally ingest complex information with the <span class="bold italic">Queer Starter Kit Podcast.</span></li>
                        <li><b>Visit</b> our virtual gallery and online performance space, presented by <span class="bold italic">Dark Side of the Lens Photography</span></li>
                        <li><b>Linger</b> a little longer in the rooms of <span class="bold italic">House Geek</span> –Lou has hidden features, interactive elements, bonus content, and coupon codes for curious eyes to discover!</li>
                        <li><b>Stream</b> our upcoming music concert event: <span class="bold italic">“Doing the right thing for the right reasons”</span>, with various artists to be announced –coming soon in <span class="bold italic">The Nine To Fiveless Space</span>.</li>
                        <li><b>Celebrate</b> a whole calendar year of Lou's invented holidays & quirky <span class="bold italic">traditions</span> to match. 
                            </li>
                        <li><b>Appreciate</b> your authenticity in our spaces dedicated to supporting the community and those that wish to create a more accepting world that doesn't need allies.</li>
                        <li><b>Discover</b> what's new since your last visit & enjoy today's digital browsing adventure! </li>
                    </ul>
                    <a class="translucent-button" href="/#house-geek">Explore!</a>
                </div>
                
                
                
                
               
            </div>
            <div id="diversity-footer">
                <h2>Diversity Liberation</h2>
                <div class="inset-row">
                    <div class="column" id="authenticity">
                        <h4>Free your authenticity</h4>
                        <p> <span class="bolder">Welcome to the secret inner world of autism,</span> where there is no normal, and most social constructs are missing! When we view neurodivergent traits as the strengths they are, a world of possibility is revealed, and many solutions await our discovery.</p>
                        
                        <p>The majority of the art featured in the LibRAL Arts Souvenir Shop is created by a dysgraphic artist. With compromised dexterity, an entirely new approach to photo-realistic drawing was developed. </p>
                    </div>
                    <div class="column">
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
                <p>Savings are stashed cleverly around LibRAL Arts, waiting for investigative individuals to discover their locations. Let the hunt for hidden coupon codes begin! The first one to the end of the scavenger hunt wins the Internet!</p>
                <a href="#" class="striped-button">Learn More</a>
            </div>
            <div class="inset-row" id="bootstrap-footer-row">
                <div class="column">
                    <img src="/images/bootstrap-footer-logo.png">
                    <div class="inset-row">
                        <div class="column">
                            <h5>LibRAL Arts is one of 4 arms of Bootstrap Commercial Arts that together form a machine to fight back against the devaluing of the truth, the ignorance that comes with it, & the resulting oppression and injustice. </h5>
                        </div>
                        <div class="column">
                            <p>With more creative minds than those we oppose, and our secret weapon – doing the right thing – we have created long-term multi-generation plans to disassemble the systems that perpetually block us from our goals of real equality and acceptance of each other. At Bootstrap, we reject the baselines that create the illusion that change is too difficult – things are the way they are because we continue to make them that way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xl-row" id="stripe-row">
            <p class="bold">Learn more about our machine for justice, and the experiences that have informed its architecture.</p>
        </div>
        <div class="xl-row" id="footer-row-3">
            <div class="inset-row">
                <div class="column">
                    <img src="/images/honest-logo.png">    
                    <p class="italic">A transparent small business economy built on sustainability models and social responsibility, instead of a corrupt corporate economy with power over political leadership and personal data.</p>

                    <h6 class="bolder center">Honesty to the Client<br>Honesty to the Public</h6>
                    
                    <p>Marketers that have turned on the corporate advertising industry unite to create a small business-driven economy, run by the next generation of business minds–those that do the right things for the right reasons.</p>   
                    
                    <p>Honest Marketing and Business Development has been dedicated for decades to building a business model designed to undercut the power of corporations without waiting for Congress to change laws slowly</p> 
                    
                    <p class="italic">We accomplish what politicians can't by giving the consumer a cheaper option, without sacrificing quality or taking more time to provide it.</p>
                    
                    <p class="bold center small-text">Turns out, doing the right thing<br>is also good for business!</p>

                    <a onclick="comingSoon()" class="gray-button" target="_blank">Coming Soon</a>
                </div>
                <div class="column">
                    <img src="/images/by-the-bootstraps-logo.png">
                    <p class="italic">Fighting injustice and inequality on behalf of those struggling to survive without housing or sufficient income.</p>

                    <h6 class="bolder center">We've got Work to Do</h6>
                    <p>By honestly acknowledging the real factors that create and perpetuate extreme poverty in our society, we can address trauma recovery and create long-term systemic solutions instead of blaming the victim or passing the responsibility to good samaritan citizens.</p>

                    <p>Our four-step program, resource center, training hub, employment entry program, and support groups work together to provide a path to success in a society that misunderstands the subject enough to continue ignoring it.</p>

                    <p class="italic">We are proud to share that our unique approaches to poverty are carried out without government assistance or public donations. UBTB was designed to provide help without an operating budget in order to remove barriers to assistance and to be easily replicable.</p>

                    <p class="bold center small-text">Learn more about using Up by the Bootstraps<br>for self-help or to help others.</p>

                    <a onclick="comingSoon()" class="gray-button" target="_blank">Coming Soon</a>
                </div>
                <div class="column">
                    <img src="/images/fwym-logo.png">
                    <p class="italic">Helping people get comfortable with the things they are unfamiliar with so that discomfort does not become ignorance.</p>

                    <h6 class="bolder center">You Can't Not Think</h6>

                    <p>Here, we explore the lost value of honesty, and the longer journey some have to arrive at the truth.</p>

                    <p>Experts on manipulation tactics present a holistic and non-partisan view of the personal challenges and hindrances the public must grapple with and address in order to achieve a truth-centric shared reality. </p>

                    <p>Five themes are explored, that together, explain the fractured reality our society currently faces and how we can unite again under one truth.</p>

                    <p class="italic">Get involved in the movement: Learn about and become a part of our worldwide art piece! </p>

                    <p class="bold center small-text">Fight With Your Mind and participants remind<br>the world that "You Can't NOT Think".<br><br>At FightWithYourMind.org</p>

                    <a href="https://fightwithyourmind.org" class="gray-button" target="_blank">Visit Website</a>
                </div>
            </div>
            <p class="center italic small-text" style="padding: 1.5rem;">We refuse to accept the dire fates thrust upon us as oppressed people or as a generation fighting for the possibility of a future. We burn but we are not consumed.</p>
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
            <p class="center small-text" style="padding: 1rem; color: #999999;">©2023 Bootstrap Commercial Arts</p>
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