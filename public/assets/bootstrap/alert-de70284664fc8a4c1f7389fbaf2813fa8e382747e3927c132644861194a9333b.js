/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var i=e(this),o=i.data("bs.alert");o||i.data("bs.alert",o=new n(this)),"string"==typeof t&&o[t].call(i)})}var i='[data-dismiss="alert"]',n=function(t){e(t).on("click",i,this.close)};n.VERSION="3.3.6",n.TRANSITION_DURATION=150,n.prototype.close=function(t){function i(){s.detach().trigger("closed.bs.alert").remove()}var o=e(this),r=o.attr("data-target");r||(r=o.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));var s=e(r);t&&t.preventDefault(),s.length||(s=o.closest(".alert")),s.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(s.removeClass("in"),e.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(n.TRANSITION_DURATION):i())};var o=e.fn.alert;e.fn.alert=t,e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=o,this},e(document).on("click.bs.alert.data-api",i,n.prototype.close)}(jQuery);