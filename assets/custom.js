let $HotspotList = {
    init: () =>{
        if(window.HotspotList.length){
            window.HotspotList.forEach(async $HotspotItem => {
                let $Hotspot = new CollectionHotspot($HotspotItem.title, $HotspotItem.target)
                await $Hotspot.renderInfos();
            });
        }
    }
}
document.addEventListener("DOMContentLoaded", function(){
    $HotspotList.init()
})