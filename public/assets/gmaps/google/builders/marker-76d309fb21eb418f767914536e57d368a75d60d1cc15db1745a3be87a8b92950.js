(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function n(){this.constructor=t}for(var s in e)i.call(e,s)&&(t[s]=e[s]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},i={}.hasOwnProperty;this.Gmaps.Google.Builders.Marker=function(i){function n(e,i,n){this.args=e,this.provider_options=null!=i?i:{},this.internal_options=null!=n?n:{},this.infowindow_binding=t(this.infowindow_binding,this),this.before_init(),this.create_marker(),this.create_infowindow_on_click(),this.after_init()}return e(n,i),n.CURRENT_INFOWINDOW=void 0,n.CACHE_STORE={},n.prototype.build=function(){return this.marker=new(this.model_class())(this.serviceObject)},n.prototype.create_marker=function(){return this.serviceObject=new(this.primitives().marker)(this.marker_options())},n.prototype.create_infowindow=function(){return _.isString(this.args.infowindow)?new(this.primitives().infowindow)({content:this.args.infowindow}):null},n.prototype.marker_options=function(){var t,e;return e=this._randomized_coordinates(),t={title:this.args.marker_title,position:new(this.primitives().latLng)(e[0],e[1]),icon:this._get_picture("picture"),shadow:this._get_picture("shadow")},_.extend(this.provider_options,t)},n.prototype.create_infowindow_on_click=function(){return this.addListener("click",this.infowindow_binding)},n.prototype.infowindow_binding=function(){var t;if(this._should_close_infowindow()&&this.constructor.CURRENT_INFOWINDOW.close(),this.marker.panTo(),null==this.infowindow&&(this.infowindow=this.create_infowindow()),null!=this.infowindow)return this.infowindow.open(this.getServiceObject().getMap(),this.getServiceObject()),null==(t=this.marker).infowindow&&(t.infowindow=this.infowindow),this.constructor.CURRENT_INFOWINDOW=this.infowindow},n.prototype._get_picture=function(t){return _.isObject(this.args[t])&&_.isString(this.args[t].url)?this._create_or_retrieve_image(this._picture_args(t)):null},n.prototype._create_or_retrieve_image=function(t){return void 0===this.constructor.CACHE_STORE[t.url]&&(this.constructor.CACHE_STORE[t.url]=new(this.primitives().markerImage)(t.url,t.size,t.origin,t.anchor,t.scaledSize)),this.constructor.CACHE_STORE[t.url]},n.prototype._picture_args=function(t){return{url:this.args[t].url,anchor:this._createImageAnchorPosition(this.args[t].anchor),size:new(this.primitives().size)(this.args[t].width,this.args[t].height),scaledSize:null,origin:null}},n.prototype._createImageAnchorPosition=function(t){return _.isArray(t)?new(this.primitives().point)(t[0],t[1]):null},n.prototype._should_close_infowindow=function(){return this.internal_options.singleInfowindow&&null!=this.constructor.CURRENT_INFOWINDOW},n.prototype._randomized_coordinates=function(){var t,e,i,n,s;return _.isNumber(this.internal_options.maxRandomDistance)?(s=function(){return 2*Math.random()-1},i=this.internal_options.maxRandomDistance*s(),n=this.internal_options.maxRandomDistance*s(),t=parseFloat(this.args.lat)+180/Math.PI*(n/6378137),e=parseFloat(this.args.lng)+90/Math.PI*(i/6378137)/Math.cos(this.args.lat),[t,e]):[this.args.lat,this.args.lng]},n}(Gmaps.Objects.BaseBuilder)}).call(this);