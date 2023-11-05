let sanityPromise;

// Sanity API Call
async function sanityApiCall(query) {
    try {
      let response = await fetch(`https://umt44hrc.api.sanity.io/v2022-01-01/data/query/production?query=*${query}`)
      sanityPromise = await response.json()
      if(sanityPromise.result.length === 0) {
        //window.location.href = '/404'
        console.log(sanityPromise.result)
      } else {
        sanityPromise = sanityPromise.result
        return sanityPromise;
      }
      
    } catch (error) {
      topBannerStart('error', error);
    }
  }