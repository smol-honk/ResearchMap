(function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Objects.Map=function(e){function i(t){this.serviceObject=t}return t(i,e),i.prototype.getServiceObject=function(){return this.serviceObject},i.prototype.centerOn=function(t){return this.getServiceObject().setCenter(this.primitives().latLngFromPosition(t))},i.prototype.fitToBounds=function(t){return t.isEmpty()?void 0:this.getServiceObject().fitBounds(t)},i.prototype.primitives=function(){return this.constructor.PRIMITIVES},i}(Gmaps.Base)}).call(this);