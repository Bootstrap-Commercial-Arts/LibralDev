let sanityPromise;

// Sanity API Call
async function sanityApiCall(query) {
    try {
      let response = await fetch(`https://umt44hrc.api.sanity.io/v2022-01-01/data/query/production?query=*${query}`)
      sanityPromise = await response.json()
      sanityPromise = sanityPromise.result
    } catch (error) {
      topBannerStart('error', error);
    }
  }