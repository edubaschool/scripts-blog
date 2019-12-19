/* render the block, receive profile data, and insert the block in the profiles' list, using this data */
const createProfileBlock = ({ headline, publicIdentifier, subline, title }) => {
  $('.search-results__list').append(
    `<li class="search-result search-result__occluded-item ember-view">
      <div class="search-entity search-result search-result--person search-result--occlusion-enabled ember-view">
        <div class="search-result__wrapper">
          <div class="search-result__image-wrapper">
            <a class="search-result__result-link ember-view" href="/in/${publicIdentifier}/">
              <figure class="search-result__image">
                <div class="ivm-image-view-model ember-view">
                  <img class="lazy-image ivm-view-attr__img--centered EntityPhoto-circle-4 presence-entity__image EntityPhoto-circle-4 loaded" src="http://www.userlogos.org/files/logos/give/Habrahabr3.png" />
                </div>
              </figure>
            </a>
          </div>
          
          <div class="search-result__info pt3 pb4 ph0">
            <a class="search-result__result-link ember-view" href="/in/${publicIdentifier}/">
              <h3 class="actor-name-with-distance search-result__title single-line-truncate ember-view">
                ${title.text}
              </h3>
            </a>

            <p class="subline-level-1 t-14 t-black t-normal search-result__truncate">${headline.text}</p>

            <p class="subline-level-2 t-12 t-black--light t-normal search-result__truncate">${subline.text}</p>
          </div>
        </div>
      </div>
    <li>`
  );
};

// fetch data and render the profiles
const fetchProfiles = () => {
  // token
  const csrf = 'ajax:9082932176494192209';
  
  // оbject with the request settings, pass the token
  const settings = { headers: { 'csrf-token': csrf } }

  // request URL, with a dynamic start index at the end
  const url = `https://www.linkedin.com/voyager/api/search/blended?count=10&filters=List(geoRegion-%3Ejp%3A0,network-%3ES,resultType-%3EPEOPLE)&origin=FACETED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=${nextItemIndex}`; 
  /* make a request, for each profile in the response call the block rendering, and then increment the starting index by 10 */
  fetch(url, settings).then(response => response.json()).then(data => {
    data.elements[0].elements.forEach(createProfileBlock);
    nextItemIndex += 10;
});
};


// delete all profiles from the list
$('.search-results__list').find('li').remove();
// insert the 'download profiles' button
$('.search-results__list').after('<button id="load-more">Load More</button>');
// add the functionality to the button
$('#load-more').addClass('artdeco-button').on('click', fetchProfiles);

// set the default profile index for the request
window.nextItemIndex = 0;
