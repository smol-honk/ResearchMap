$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYW1waGl0aGVyZSIsImEiOiIyZGE2MWJhYTdlNjJkM2E4NTZhYjUyODE3NDFmNzY3MSJ9.EDkcexR3h8zGfuPOXADctQ';
    var map = L.mapbox.map('map', 'amphithere.nanckefd', 
    {worldCopyJump: true
    });
    
    $.ajax({
      dataType: 'text',
      url: 'welcome/map.json',
      success: function(data) {
        var geojson;
        geojson = $.parseJSON(data);
        return map.featureLayer.setGeoJSON(geojson);
      }
 
    });
    
    map.featureLayer.on('layeradd', function(e) {
      var marker, feature, popupContent;
      marker = e.layer,
      feature = marker.feature;
      popupContent = '<div class="popup">' + '<h3>' + feature.properties.name + '</h3>' +'<b>'+ feature.properties.title + '</b>'  + '</p>' + feature.properties.bio + '</p>'+ '</p>' + '<a href= /people/' + feature.properties.id + '>Read more...</a>' + '</div>';
      return marker.bindPopup(popupContent, {
        minWidth: 320
      })
    })
});







