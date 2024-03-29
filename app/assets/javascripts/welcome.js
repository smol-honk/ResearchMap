// Javascript initializing of the map from mapbox.
// Additional options to the map are continuous world and noWrap(to stop the duplicate worlds from showing on the map)
// $(function(){
//     location.reload();
// });
$(function() {
   L.mapbox.accessToken = "pk.eyJ1IjoiYW1waGl0aGVyZSIsImEiOiIyZGE2MWJhYTdlNjJkM2E4NTZhYjUyODE3NDFmNzY3MSJ9.EDkcexR3h8zGfuPOXADctQ";

   // Creates bounds for the map so no white space is shown
   var southWest = L.latLng(-180, -180),
       northEast = L.latLng(180, 180),
       bounds = L.latLngBounds(southWest, northEast);

   var map = L.mapbox.map('map', 'amphithere.nanckefd', {
           maxBounds: bounds,
           maxZoom: 20,
           minZoom: 2,
       tileLayer: {continuousWorld: false,
           // This option makes only one copy of the world show up
           noWrap: true
           }
       })
       .addControl(L.mapbox.geocoderControl('mapbox.places', {
           autocomplete:true
       })),
       donor = document.getElementById('filter-donor'),
       all = document.getElementById('filter-all'),
       back = document.getElementById('backToSize');

       map.fitBounds(bounds);
       console.log(map);

       // This function is used for the filtering of the datatype: donor. On the 'click' of the donor button, only markers with donor labeled as true will show on the map. If all is clicked, then all markers will show.
       // window.onload = function(){
       //     locations.setFilter(function(f){
       //         return f.properties['active'] === true;
       //     });
       //     return false;
       // };
       //
       back.onclick = function() {
           map.setView([25, 5], 2);
           return false;
       };

       donor.onclick = function(e) {
           all.className = '';
           this.className = 'active';
           listings.innerHTML = '';
           locations.setFilter(function(f) {
               return f.properties['available'] === true || f.properties['unknown']=== true;
           });
           updateNav()
           return false;
       };

       all.onclick = function() {
           donor.className = '';
           this.className = 'active';
           listings.innerHTML = '';
           locations.setFilter(function(f) {
               return true;
           });
           updateNav()
           return false;
       };


   // Disables the scroll wheel zoom
   map.scrollWheelZoom.disable();

   // checks the html for 'listings'
   var listings = document.getElementById('listings');
   var locations = L.mapbox.featureLayer().addTo(map);

   // loads our json from the welcome controller
   locations.loadURL('welcome/map.json');


   function setActive(el) {
     var siblings = listings.getElementsByTagName('div');
     for (var i = 0; i < siblings.length; i++) {
       siblings[i].className = siblings[i].className
         .replace(/active/, '').replace(/\s\s*$/, '');
     }

     el.className += ' active';
   }

   // Will append the listings to the sidebar
   function updateNav(){
       locations.eachLayer(function(locale){
           var prop = locale.feature.properties;
           var listing = listings.appendChild(document.createElement('div'));
           listing.className = 'item';

           var link = listing.appendChild(document.createElement('a'));
           link.href = '#';
           link.title = "Click to see this anthropologist!";
           link.className = 'title';
           link.id = 'person';

           link.innerHTML = prop.name;
           var anthroTitle = listing.appendChild(document.createElement('div'));
           anthroTitle.className = 'personTitle';
           anthroTitle.innerHTML = prop.researcher;

           var details = listing.appendChild(document.createElement('div'));
           details.innerHTML = prop.location;

           link.onclick = function() {
             setActive(listing);

             // When a menu item is clicked, animate the map to center
             // its associated locale and open its popup.
             map.setView(locale.getLatLng(), 16);
             locale.openPopup();
             return false;
           };

           // Marker interaction
           locale.on('click', function(e) {
               // 1. center the map on the selected marker.
               map.panTo(locale.getLatLng());

               // 2. Set active the markers associated listing.
               setActive(listing);
           });
       });
   }

   locations.on('ready', function(){
     updateNav()
   });

   locations.on('layeradd', function(e){
       var locale = e.layer,
       feature = locale.feature;
       // Shorten locale.feature.properties to just `prop` so we're not
       // writing this long form over and over again.
       var prop = locale.feature.properties;

       // Each marker on the map.
       var popup = '<div class="popup">' + prop.popup + '</div>';
       // console.log(prop.popup);

       locale.bindPopup(popup, {
           minWidth: 320
       });
   });
   return false;
});


 $(function () {
   $('#backToSize').tooltip()
 });
