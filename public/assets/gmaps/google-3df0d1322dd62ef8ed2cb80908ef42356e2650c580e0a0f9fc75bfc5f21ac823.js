(function(){this.Gmaps={build:function(t,e){var i;return null==e&&(e={}),new(i=_.isFunction(e.handler)?e.handler:Gmaps.Objects.Handler)(t,e)},Builders:{},Objects:{},Google:{Objects:{},Builders:{}}}}).call(this),function(){var t,e=[].indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1};t=["extended","included"],this.Gmaps.Base=function(){function i(){}return i.extend=function(i){var n,s,o;for(n in i)o=i[n],e.call(t,n)<0&&(this[n]=o);return null!=(s=i.extended)&&s.apply(this),this},i.include=function(i){var n,s,o;for(n in i)o=i[n],e.call(t,n)<0&&(this.prototype[n]=o);return null!=(s=i.included)&&s.apply(this),this},i}()}.call(this),function(){this.Gmaps.Objects.BaseBuilder=function(){function t(){}return t.prototype.build=function(){return new(this.model_class())(this.serviceObject)},t.prototype.before_init=function(){},t.prototype.after_init=function(){},t.prototype.addListener=function(t,e){return this.primitives().addListener(this.getServiceObject(),t,e)},t.prototype.getServiceObject=function(){return this.serviceObject},t.prototype.primitives=function(){return this.constructor.PRIMITIVES},t.prototype.model_class=function(){return this.constructor.OBJECT},t}()}.call(this),function(){this.Gmaps.Objects.Builders=function(t,e,i){return{build:function(n,s,o){var a;return e.PRIMITIVES=i,t.OBJECT=e,t.PRIMITIVES=i,a=new t(n,s,o),a.build()}}}}.call(this),function(){this.Gmaps.Objects.Handler=function(){function t(t,e){this.type=t,null==e&&(e={}),this.setPrimitives(e),this.setOptions(e),this._cacheAllBuilders(),this.resetBounds()}return t.prototype.buildMap=function(t,e){return null==e&&(e=function(){}),this.map=this._builder("Map").build(t,function(t){return function(){return t._createClusterer(),e()}}(this))},t.prototype.addMarkers=function(t,e){return _.map(t,function(t){return function(i){return t.addMarker(i,e)}}(this))},t.prototype.addMarker=function(t,e){var i;return i=this._builder("Marker").build(t,e,this.marker_options),i.setMap(this.getMap()),this.clusterer.addMarker(i),i},t.prototype.addCircles=function(t,e){return _.map(t,function(t){return function(i){return t.addCircle(i,e)}}(this))},t.prototype.addCircle=function(t,e){return this._addResource("circle",t,e)},t.prototype.addPolylines=function(t,e){return _.map(t,function(t){return function(i){return t.addPolyline(i,e)}}(this))},t.prototype.addPolyline=function(t,e){return this._addResource("polyline",t,e)},t.prototype.addPolygons=function(t,e){return _.map(t,function(t){return function(i){return t.addPolygon(i,e)}}(this))},t.prototype.addPolygon=function(t,e){return this._addResource("polygon",t,e)},t.prototype.addKmls=function(t,e){return _.map(t,function(t){return function(i){return t.addKml(i,e)}}(this))},t.prototype.addKml=function(t,e){return this._addResource("kml",t,e)},t.prototype.removeMarkers=function(t){return _.map(t,function(t){return function(e){return t.removeMarker(e)}}(this))},t.prototype.removeMarker=function(t){return t.clear(),this.clusterer.removeMarker(t)},t.prototype.fitMapToBounds=function(){return this.map.fitToBounds(this.bounds.getServiceObject())},t.prototype.getMap=function(){return this.map.getServiceObject()},t.prototype.setOptions=function(t){return this.marker_options=_.extend(this._default_marker_options(),t.markers),this.builders=_.extend(this._default_builders(),t.builders),this.models=_.extend(this._default_models(),t.models)},t.prototype.resetBounds=function(){return this.bounds=this._builder("Bound").build()},t.prototype.setPrimitives=function(t){return this.primitives=void 0===t.primitives?this._rootModule().Primitives():_.isFunction(t.primitives)?t.primitives():t.primitives},t.prototype.currentInfowindow=function(){return this.builders.Marker.CURRENT_INFOWINDOW},t.prototype._addResource=function(t,e,i){var n;return n=this._builder(t).build(e,i),n.setMap(this.getMap()),n},t.prototype._cacheAllBuilders=function(){var t;return t=this,_.each(["Bound","Circle","Clusterer","Kml","Map","Marker","Polygon","Polyline"],function(e){return t._builder(e)})},t.prototype._clusterize=function(){return _.isObject(this.marker_options.clusterer)},t.prototype._createClusterer=function(){return this.clusterer=this._builder("Clusterer").build({map:this.getMap()},this.marker_options.clusterer)},t.prototype._default_marker_options=function(){return _.clone({singleInfowindow:!0,maxRandomDistance:0,clusterer:{maxZoom:5,gridSize:50}})},t.prototype._builder=function(t){var e;return t=this._capitalize(t),null==this[e="__builder"+t]&&(this[e]=Gmaps.Objects.Builders(this.builders[t],this.models[t],this.primitives)),this["__builder"+t]},t.prototype._default_models=function(){var t;return t=_.clone(this._rootModule().Objects),this._clusterize()?t:(t.Clusterer=Gmaps.Objects.NullClusterer,t)},t.prototype._capitalize=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},t.prototype._default_builders=function(){return _.clone(this._rootModule().Builders)},t.prototype._rootModule=function(){return null==this.__rootModule&&(this.__rootModule=Gmaps[this.type]),this.__rootModule},t}()}.call(this),function(){this.Gmaps.Objects.NullClusterer=function(){function t(){}return t.prototype.addMarkers=function(){},t.prototype.addMarker=function(){},t.prototype.clear=function(){},t.prototype.removeMarker=function(){},t}()}.call(this),function(){this.Gmaps.Google.Objects.Common={getServiceObject:function(){return this.serviceObject},setMap:function(t){return this.getServiceObject().setMap(t)},clear:function(){return this.getServiceObject().setMap(null)},show:function(){return this.getServiceObject().setVisible(!0)},hide:function(){return this.getServiceObject().setVisible(!1)},isVisible:function(){return this.getServiceObject().getVisible()},primitives:function(){return this.constructor.PRIMITIVES}}}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Bound=function(e){function i(){this.before_init(),this.serviceObject=new(this.primitives().latLngBounds),this.after_init()}return t(i,e),i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Circle=function(e){function i(t,e){this.args=t,this.provider_options=null!=e?e:{},this.before_init(),this.serviceObject=this.create_circle(),this.after_init()}return t(i,e),i.prototype.create_circle=function(){return new(this.primitives().circle)(this.circle_options())},i.prototype.circle_options=function(){var t;return t={center:new(this.primitives().latLng)(this.args.lat,this.args.lng),radius:this.args.radius},_.defaults(t,this.provider_options)},i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Clusterer=function(e){function i(t,e){this.args=t,this.options=e,this.before_init(),this.serviceObject=new(this.primitives().clusterer)(this.args.map,[],this.options),this.after_init()}return t(i,e),i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Kml=function(e){function i(t,e){this.args=t,this.provider_options=null!=e?e:{},this.before_init(),this.serviceObject=this.create_kml(),this.after_init()}return t(i,e),i.prototype.create_kml=function(){return new(this.primitives().kml)(this.args.url,this.kml_options())},i.prototype.kml_options=function(){var t;return t={},_.defaults(t,this.provider_options)},i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Map=function(e){function i(t,e){var i;this.before_init(),i=_.extend(this.default_options(),t.provider),this.internal_options=t.internal,this.serviceObject=new(this.primitives().map)(document.getElementById(this.internal_options.id),i),this.on_map_load(e),this.after_init()}return t(i,e),i.prototype.build=function(){return new(this.model_class())(this.serviceObject,this.primitives())},i.prototype.on_map_load=function(t){return this.primitives().addListenerOnce(this.serviceObject,"idle",t)},i.prototype.default_options=function(){return{mapTypeId:this.primitives().mapTypes("ROADMAP"),center:new(this.primitives().latLng)(0,0),zoom:8}},i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function n(){this.constructor=t}for(var s in e)i.call(e,s)&&(t[s]=e[s]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty;this.Gmaps.Google.Builders.Marker=function(i){function n(e,i,n){this.args=e,this.provider_options=null!=i?i:{},this.internal_options=null!=n?n:{},this.infowindow_binding=t(this.infowindow_binding,this),this.before_init(),this.create_marker(),this.create_infowindow_on_click(),this.after_init()}return e(n,i),n.CURRENT_INFOWINDOW=void 0,n.CACHE_STORE={},n.prototype.build=function(){return this.marker=new(this.model_class())(this.serviceObject)},n.prototype.create_marker=function(){return this.serviceObject=new(this.primitives().marker)(this.marker_options())},n.prototype.create_infowindow=function(){return _.isString(this.args.infowindow)?new(this.primitives().infowindow)({content:this.args.infowindow}):null},n.prototype.marker_options=function(){var t,e;return e=this._randomized_coordinates(),t={title:this.args.marker_title,position:new(this.primitives().latLng)(e[0],e[1]),icon:this._get_picture("picture"),shadow:this._get_picture("shadow")},_.extend(this.provider_options,t)},n.prototype.create_infowindow_on_click=function(){return this.addListener("click",this.infowindow_binding)},n.prototype.infowindow_binding=function(){var t;if(this._should_close_infowindow()&&this.constructor.CURRENT_INFOWINDOW.close(),this.marker.panTo(),null==this.infowindow&&(this.infowindow=this.create_infowindow()),null!=this.infowindow)return this.infowindow.open(this.getServiceObject().getMap(),this.getServiceObject()),null==(t=this.marker).infowindow&&(t.infowindow=this.infowindow),this.constructor.CURRENT_INFOWINDOW=this.infowindow},n.prototype._get_picture=function(t){return _.isObject(this.args[t])&&_.isString(this.args[t].url)?this._create_or_retrieve_image(this._picture_args(t)):null},n.prototype._create_or_retrieve_image=function(t){return void 0===this.constructor.CACHE_STORE[t.url]&&(this.constructor.CACHE_STORE[t.url]=new(this.primitives().markerImage)(t.url,t.size,t.origin,t.anchor,t.scaledSize)),this.constructor.CACHE_STORE[t.url]},n.prototype._picture_args=function(t){return{url:this.args[t].url,anchor:this._createImageAnchorPosition(this.args[t].anchor),size:new(this.primitives().size)(this.args[t].width,this.args[t].height),scaledSize:null,origin:null}},n.prototype._createImageAnchorPosition=function(t){return _.isArray(t)?new(this.primitives().point)(t[0],t[1]):null},n.prototype._should_close_infowindow=function(){return this.internal_options.singleInfowindow&&null!=this.constructor.CURRENT_INFOWINDOW},n.prototype._randomized_coordinates=function(){var t,e,i,n,s;return _.isNumber(this.internal_options.maxRandomDistance)?(s=function(){return 2*Math.random()-1},i=this.internal_options.maxRandomDistance*s(),n=this.internal_options.maxRandomDistance*s(),t=parseFloat(this.args.lat)+180/Math.PI*(n/6378137),e=parseFloat(this.args.lng)+90/Math.PI*(i/6378137)/Math.cos(this.args.lat),[t,e]):[this.args.lat,this.args.lng]},n}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Polygon=function(e){function i(t,e){this.args=t,this.provider_options=null!=e?e:{},this.before_init(),this.serviceObject=this.create_polygon(),this.after_init()}return t(i,e),i.prototype.create_polygon=function(){return new(this.primitives().polygon)(this.polygon_options())},i.prototype.polygon_options=function(){var t;return t={path:this._build_path()},_.defaults(t,this.provider_options)},i.prototype._build_path=function(){return _.map(this.args,function(t){return function(e){return new(t.primitives().latLng)(e.lat,e.lng)}}(this))},i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Polyline=function(e){function i(t,e){this.args=t,this.provider_options=null!=e?e:{},this.before_init(),this.serviceObject=this.create_polyline(),this.after_init()}return t(i,e),i.prototype.create_polyline=function(){return new(this.primitives().polyline)(this.polyline_options())},i.prototype.polyline_options=function(){var t;return t={path:this._build_path()},_.defaults(t,this.provider_options)},i.prototype._build_path=function(){return _.map(this.args,function(t){return function(e){return new(t.primitives().latLng)(e.lat,e.lng)}}(this))},i}(Gmaps.Objects.BaseBuilder)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Bound=function(e){function i(t){this.serviceObject=t}return t(i,e),i.include(Gmaps.Google.Objects.Common),i.prototype.extendWith=function(t){var e;return e=_.isArray(t)?t:[t],_.each(e,function(t){return function(e){return e.updateBounds(t)}}(this))},i.prototype.extend=function(t){return this.getServiceObject().extend(this.primitives().latLngFromPosition(t))},i}(Gmaps.Base)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Circle=function(e){function i(t){this.serviceObject=t}return t(i,e),i.include(Gmaps.Google.Objects.Common),i.prototype.updateBounds=function(t){return t.extend(this.getServiceObject().getBounds().getNorthEast()),t.extend(this.getServiceObject().getBounds().getSouthWest())},i}(Gmaps.Base)}.call(this),function(){this.Gmaps.Google.Objects.Clusterer=function(){function t(t){this.serviceObject=t}return t.prototype.addMarkers=function(t){return _.each(t,function(t){return function(e){return t.addMarker(e)}}(this))},t.prototype.addMarker=function(t){return this.getServiceObject().addMarker(t.getServiceObject())},t.prototype.clear=function(){return this.getServiceObject().clearMarkers()},t.prototype.removeMarker=function(t){return this.getServiceObject().removeMarker(t.getServiceObject())},t.prototype.getServiceObject=function(){return this.serviceObject},t}()}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Kml=function(e){function i(t){this.serviceObject=t}return t(i,e),i.prototype.updateBounds=function(){},i.prototype.setMap=function(t){return this.getServiceObject().setMap(t)},i.prototype.getServiceObject=function(){return this.serviceObject},i.prototype.primitives=function(){return this.constructor.PRIMITIVES},i}(Gmaps.Base)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Map=function(e){function i(t){this.serviceObject=t}return t(i,e),i.prototype.getServiceObject=function(){return this.serviceObject},i.prototype.centerOn=function(t){return this.getServiceObject().setCenter(this.primitives().latLngFromPosition(t))},i.prototype.fitToBounds=function(t){if(!t.isEmpty())return this.getServiceObject().fitBounds(t)},i.prototype.primitives=function(){return this.constructor.PRIMITIVES},i}(Gmaps.Base)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Marker=function(e){function i(t){this.serviceObject=t}return t(i,e),i.include(Gmaps.Google.Objects.Common),i.prototype.updateBounds=function(t){return t.extend(this.getServiceObject().position)},i.prototype.panTo=function(){return this.getServiceObject().getMap().panTo(this.getServiceObject().getPosition())},i}(Gmaps.Base)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Polygon=function(e){function i(t){this.serviceObject=t}return t(i,e),i.include(Gmaps.Google.Objects.Common),i.prototype.updateBounds=function(t){var e,i,n,s,o;for(s=this.serviceObject.getPath().getArray(),o=[],e=0,i=s.length;e<i;e++)n=s[e],o.push(t.extend(n));return o},i}(Gmaps.Base)}.call(this),function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Polyline=function(e){function i(t){this.serviceObject=t}return t(i,e),i.include(Gmaps.Google.Objects.Common),i.prototype.updateBounds=function(t){var e,i,n,s,o;for(s=this.serviceObject.getPath().getArray(),o=[],e=0,i=s.length;e<i;e++)n=s[e],o.push(t.extend(n));return o},i}(Gmaps.Base)}.call(this),function(){this.Gmaps.Google.Primitives=function(){var t;return t={point:google.maps.Point,size:google.maps.Size,circle:google.maps.Circle,latLng:google.maps.LatLng,latLngBounds:google.maps.LatLngBounds,map:google.maps.Map,mapTypez:google.maps.MapTypeId,markerImage:google.maps.MarkerImage,marker:google.maps.Marker,infowindow:google.maps.InfoWindow,listener:google.maps.event.addListener,clusterer:MarkerClusterer,listenerOnce:google.maps.event.addListenerOnce,polyline:google.maps.Polyline,polygon:google.maps.Polygon,kml:google.maps.KmlLayer,addListener:function(e,i,n){return t.listener(e,i,n)},addListenerOnce:function(e,i,n){return t.listenerOnce(e,i,n)},mapTypes:function(e){return t.mapTypez[e]},latLngFromPosition:function(e){return _.isArray(e)?new t.latLng(e[0],e[1]):_.isNumber(e.lat)&&_.isNumber(e.lng)?new t.latLng(e.lat,e.lng):_.isFunction(e.getServiceObject)?e.getServiceObject().getPosition():e}}}}.call(this),function(){}.call(this);