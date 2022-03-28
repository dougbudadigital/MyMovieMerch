// let x = new CollectionHotspot(HotspotItem.title, HotspotItem.target)
// x.renderInfos();

class CollectionHotspot {
  constructor(title, target) {
    this.title = title;
    this.target = target;
    this.descriptionSection = this.target.querySelector('[hotspot-description]');
    this.attributesSection = this.target.querySelector('[hotspot-attributes]');
    this.ratingsSection = this.target.querySelector('[hotspot-ratings]');
    this.trailerSection = this.target.querySelector('[hotspot-trailer]');
    this.coverSection = this.target.querySelector('[hotspot-cover]');
    this._k = 'k_a5qcnbj1'
    // this._k = 'pk_htld9nkzup1zky2sl'
  }

  async _fetchHotspotInfos(query) {
    // let HotspotInfos = await this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    let HotspotResults = await fetch(`https://imdb-api.com/en/API/SearchMovie/${this._k}/${query}`, requestOptions)
    HotspotResults = await HotspotResults.json()
    
    if(HotspotResults.errorMessage.length || !(HotspotResults.results && HotspotResults.results.length)){
      throw new Error(`No Results for ${query}`)
    }

    let HotspotResult = HotspotResults.results[0]
    
    let HotspotInfos = await fetch(`https://imdb-api.com/en/API/Title/${this._k}/${HotspotResult.id}/Trailer,Ratings`, requestOptions)
    HotspotInfos = await HotspotInfos.json()

    return HotspotInfos
  }
  renderHotspotAttribute(attribute_value) {
    let attribute_markup = `<span class="hotspot__attributes__item label__item">
      ${attribute_value}
    </span>`
    
    return attribute_markup
  }
  async getHotspotInfos(title) {
    let HotspotInfos = await this._fetchHotspotInfos(title);
    return HotspotInfos
  }
  async renderInfos(title=this.title) {
    let HotspotInfos = await this.getHotspotInfos(title)
    if(this.descriptionSection){
      this.descriptionSection.innerHTML = HotspotInfos.plot
    }
    if(this.ratingsSection && HotspotInfos.imDbRating){
      this.ratingsSection.innerHTML += this.renderHotspotAttribute(`${HotspotInfos.imDbRating}/10`)
    }
    // debugger;
    if(this.coverSection && HotspotInfos.image){
      this.coverSection.style.backgroundImage = `url('${HotspotInfos.image}')`
    }
    if(this.trailerSection && HotspotInfos.trailer){
      this.trailerSection.setAttribute('href', '#')
      this.trailerSection.setAttribute('target', '_blank')
      this.trailerSection.innerHTML = 'Watch the trailer'
    }
    if(this.attributesSection){
      if(HotspotInfos.directors){
        this.attributesSection.innerHTML += this.renderHotspotAttribute(`Director: ${HotspotInfos.directors}`)
      }
      if(HotspotInfos.stars){
        HotspotInfos.stars.split(', ').slice(0,3).forEach(actor => {
          this.attributesSection.innerHTML += this.renderHotspotAttribute(`${actor}`)
        });
      }
    }
    console.log(HotspotInfos)
  }
}
