var map;
var myPos = {lat: 0, lng: 0, zoom:0, zoomControl: true};
function initMap (newPos, newZoom){
  if (newPos == undefined) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: -38.8835, lng: -62.09},
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true
    })

    var marker = new google.maps.Marker({
      position: {lat: -38.885560, lng: -62.103000},
      map: map,
      title: 'Instituto Centenarios'
    });

    var infowindow = new google.maps.InfoWindow({
      content: "Instituto Centenarios"
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    //Set map with right properties for initial width of window
    changeMap(window.innerWidth);
  }
  else {
    if (newPos.zoom != map.getZoom()) {
      map.setZoom(newPos.zoom)
    }
    if (newPos.lat != map.getCenter().lat() || newPos.lng != map.getCenter().lng()) {
      map.setCenter({ lat: newPos.lat, lng: newPos.lng });
    }
    if (newPos.zoomControl != map.get('zoomControl')) {
      map.setOptions({zoomControl: newPos.zoomControl});
    }
  }



};

window.addEventListener("resize", function(){
  changeMap(window.innerWidth);
})

function changeMap(width){
  if (width >= 993) {
    myPos.lat = -38.8835;
    myPos.lng = -62.09;
    myPos.zoom = 15;
    myPos.zoomControl = true
    initMap(myPos);
  }
  else if(width <= 992 && width >= 670){
    myPos.lat = -38.8835;
    myPos.lng = -62.095;
    myPos.zoom = 15;
    myPos.zoomControl = true
    initMap(myPos);
  }
  else if (width <= 669 && width >= 481) {
    myPos.lat = -38.8835;
    myPos.lng = -62.095;
    myPos.zoom = 14;
    myPos.zoomControl = true
    initMap(myPos);
  }
  else if(width <= 480) {
    myPos.lat = -38.8835;
    myPos.lng = -62.093;
    myPos.zoom = 14
    myPos.zoomControl = false
    initMap(myPos);
  }
}
