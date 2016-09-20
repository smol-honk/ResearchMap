+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),o=i.data("bs.carousel"),r=e.extend({},n.DEFAULTS,i.data(),"object"==typeof t&&t),s="string"==typeof t?t:r.slide;o||i.data("bs.carousel",o=new n(this,r)),"number"==typeof t?o.to(t):s?o[s]():r.interval&&o.pause().cycle()})}var n=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",e.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",e.proxy(this.pause,this)).on("mouseleave.bs.carousel",e.proxy(this.cycle,this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=600,n.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},n.prototype.keydown=function(e){if(!/input|textarea/i.test(e.target.tagName)){switch(e.which){case 37:this.prev();break;case 39:this.next();break;default:return}e.preventDefault()}},n.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},n.prototype.getItemIndex=function(e){return this.$items=e.parent().children(".item"),this.$items.index(e||this.$active)},n.prototype.getItemForDirection=function(e,t){var n=this.getItemIndex(t),i="prev"==e&&0===n||"next"==e&&n==this.$items.length-1;if(i&&!this.options.wrap)return t;var o="prev"==e?-1:1,r=(n+o)%this.$items.length;return this.$items.eq(r)},n.prototype.to=function(e){var t=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(e>this.$items.length-1||e<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){t.to(e)}):n==e?this.pause().cycle():this.slide(e>n?"next":"prev",this.$items.eq(e))},n.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){if(!this.sliding)return this.slide("next")},n.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},n.prototype.slide=function(t,i){var o=this.$element.find(".item.active"),r=i||this.getItemForDirection(t,o),s=this.interval,a="next"==t?"left":"right",l=this;if(r.hasClass("active"))return this.sliding=!1;var u=r[0],c=e.Event("slide.bs.carousel",{relatedTarget:u,direction:a});if(this.$element.trigger(c),!c.isDefaultPrevented()){if(this.sliding=!0,s&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=e(this.$indicators.children()[this.getItemIndex(r)]);h&&h.addClass("active")}var d=e.Event("slid.bs.carousel",{relatedTarget:u,direction:a});return e.support.transition&&this.$element.hasClass("slide")?(r.addClass(t),r[0].offsetWidth,o.addClass(a),r.addClass(a),o.one("bsTransitionEnd",function(){r.removeClass([t,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(d)},0)}).emulateTransitionEnd(n.TRANSITION_DURATION)):(o.removeClass("active"),r.addClass("active"),this.sliding=!1,this.$element.trigger(d)),s&&this.cycle(),this}};var i=e.fn.carousel;e.fn.carousel=t,e.fn.carousel.Constructor=n,e.fn.carousel.noConflict=function(){return e.fn.carousel=i,this};var o=function(n){var i,o=e(this),r=e(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""));if(r.hasClass("carousel")){var s=e.extend({},r.data(),o.data()),a=o.attr("data-slide-to");a&&(s.interval=!1),t.call(r,s),a&&r.data("bs.carousel").to(a),n.preventDefault()}};e(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var n=e(this);t.call(n,n.data())})})}(jQuery);