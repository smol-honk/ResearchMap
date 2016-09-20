!function(e){"function"==typeof define&&define.amd?define(["picker","jquery"],e):"object"==typeof exports?module.exports=e(require("./picker.js"),require("jquery")):e(Picker,jQuery)}(function(e,t){function n(e,t){var n=this,i=e.$node[0].value,r=e.$node.data("value"),a=r||i,o=r?t.formatSubmit:t.format;n.settings=t,n.$node=e.$node,n.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},n.item={},n.item.clear=null,n.item.interval=t.interval||30,n.item.disable=(t.disable||[]).slice(0),n.item.enable=-function(e){return e[0]===!0?e.shift():-1}(n.item.disable),n.set("min",t.min).set("max",t.max).set("now"),a?n.set("select",a,{format:o}):n.set("select",null).set("highlight",n.item.now),n.key={40:1,38:-1,39:1,37:-1,go:function(e){n.set("highlight",n.item.highlight.pick+e*n.item.interval,{interval:e*n.item.interval}),this.render()}},e.on("render",function(){var n=e.$root.children(),i=n.find("."+t.klass.viewset),r=function(e){return["webkit","moz","ms","o",""].map(function(t){return(t?"-"+t+"-":"")+e})},a=function(e,t){r("transform").map(function(n){e.css(n,t)}),r("transition").map(function(n){e.css(n,t)})};i.length&&(a(n,"none"),n[0].scrollTop=~~i.position().top-2*i[0].clientHeight,a(n,""))},1).on("open",function(){e.$root.find("button").attr("disabled",!1)},1).on("close",function(){e.$root.find("button").attr("disabled",!0)},1)}var i=24,r=60,a=12,o=i*r,s=e._;n.prototype.set=function(e,t,n){var i=this,r=i.item;return null===t?("clear"==e&&(e="select"),r[e]=t,i):(r["enable"==e?"disable":"flip"==e?"enable":e]=i.queue[e].split(" ").map(function(r){return t=i[r](e,t,n)}).pop(),"select"==e?i.set("highlight",r.select,n):"highlight"==e?i.set("view",r.highlight,n):"interval"==e?i.set("min",r.min,n).set("max",r.max,n):e.match(/^(flip|min|max|disable|enable)$/)&&(r.select&&i.disabled(r.select)&&i.set("select",t,n),r.highlight&&i.disabled(r.highlight)&&i.set("highlight",t,n),"min"==e&&i.set("max",r.max,n)),i)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,a){var l=this;return n=void 0===n?e:n,s.isDate(n)&&(n=[n.getHours(),n.getMinutes()]),t.isPlainObject(n)&&s.isInteger(n.pick)?n=n.pick:t.isArray(n)?n=+n[0]*r+ +n[1]:s.isInteger(n)||(n=l.now(e,n,a)),"max"==e&&n<l.item.min.pick&&(n+=o),"min"!=e&&"max"!=e&&(n-l.item.min.pick)%l.item.interval!==0&&(n+=l.item.interval),n=l.normalize(e,n,a),{hour:~~(i+n/r)%i,mins:(r+n%r)%r,time:(o+n)%o,pick:n%o}},n.prototype.createRange=function(e,n){var i=this,r=function(e){return e===!0||t.isArray(e)||s.isDate(e)?i.create(e):e};return s.isInteger(e)||(e=r(e)),s.isInteger(n)||(n=r(n)),s.isInteger(e)&&t.isPlainObject(n)?e=[n.hour,n.mins+e*i.settings.interval]:s.isInteger(n)&&t.isPlainObject(e)&&(n=[e.hour,e.mins+n*i.settings.interval]),{from:r(e),to:r(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t){var n,i=this.item.interval,a=new Date,o=a.getHours()*r+a.getMinutes(),l=s.isInteger(t);return o-=o%i,n=t<0&&i*t+o<=-i,o+="min"==e&&n?0:i,l&&(o+=i*(n&&"max"!=e?t+1:t)),o},n.prototype.normalize=function(e,t){var n=this.item.interval,i=this.item.min&&this.item.min.pick||0;return t-="min"==e?0:(t-i)%n},n.prototype.measure=function(e,n,a){var o=this;return n||(n="min"==e?[0,0]:[i-1,r-1]),"string"==typeof n?n=o.parse(e,n):n===!0||s.isInteger(n)?n=o.now(e,n,a):t.isPlainObject(n)&&s.isInteger(n.pick)&&(n=o.normalize(e,n.pick,a)),n},n.prototype.validate=function(e,t,n){var i=this,r=n&&n.interval?n.interval:i.item.interval;return i.disabled(t)&&(t=i.shift(t,r)),t=i.scope(t),i.disabled(t)&&(t=i.shift(t,r*-1)),t},n.prototype.disabled=function(e){var n=this,i=n.item.disable.filter(function(i){return s.isInteger(i)?e.hour==i:t.isArray(i)||s.isDate(i)?e.pick==n.create(i).pick:t.isPlainObject(i)?n.withinRange(i,e):void 0});return i=i.length&&!i.filter(function(e){return t.isArray(e)&&"inverted"==e[2]||t.isPlainObject(e)&&e.inverted}).length,n.item.enable===-1?!i:i||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.shift=function(e,t){var n=this,i=n.item.min.pick,r=n.item.max.pick;for(t=t||n.item.interval;n.disabled(e)&&(e=n.create(e.pick+=t),!(e.pick<=i||e.pick>=r)););return e},n.prototype.scope=function(e){var t=this.item.min.pick,n=this.item.max.pick;return this.create(e.pick>n?n:e.pick<t?t:e)},n.prototype.parse=function(e,t,n){var i,a,o,l,c,u=this,d={};if(!t||"string"!=typeof t)return t;n&&n.format||(n=n||{},n.format=u.settings.format),u.formats.toArray(n.format).map(function(e){var n,i=u.formats[e],r=i?s.trigger(i,u,[t,d]):e.replace(/^!/,"").length;i&&(n=t.substr(0,r),d[e]=n.match(/^\d+$/)?+n:n),t=t.substr(r)});for(l in d)c=d[l],s.isInteger(c)?l.match(/^(h|hh)$/i)?(i=c,"h"!=l&&"hh"!=l||(i%=12)):"i"==l&&(a=c):l.match(/^a$/i)&&c.match(/^p/i)&&("h"in d||"hh"in d)&&(o=!0);return(o?i+12:i)*r+a},n.prototype.formats={h:function(e,t){return e?s.digits(e):t.hour%a||a},hh:function(e,t){return e?2:s.lead(t.hour%a||a)},H:function(e,t){return e?s.digits(e):""+t.hour%24},HH:function(e,t){return e?s.digits(e):s.lead(t.hour%24)},i:function(e,t){return e?2:s.lead(t.mins)},a:function(e,t){return e?4:o/2>t.time%o?"a.m.":"p.m."},A:function(e,t){return e?2:o/2>t.time%o?"AM":"PM"},toArray:function(e){return e.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return s.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}},n.prototype.isTimeExact=function(e,n){var i=this;return s.isInteger(e)&&s.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(s.isDate(e)||t.isArray(e))&&(s.isDate(n)||t.isArray(n))?i.create(e).pick===i.create(n).pick:!(!t.isPlainObject(e)||!t.isPlainObject(n))&&(i.isTimeExact(e.from,n.from)&&i.isTimeExact(e.to,n.to))},n.prototype.isTimeOverlap=function(e,n){var i=this;return s.isInteger(e)&&(s.isDate(n)||t.isArray(n))?e===i.create(n).hour:s.isInteger(n)&&(s.isDate(e)||t.isArray(e))?n===i.create(e).hour:!(!t.isPlainObject(e)||!t.isPlainObject(n))&&i.overlapRanges(e,n)},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(t.enable==-1?1:-1)},n.prototype.deactivate=function(e,n){var i=this,r=i.item.disable.slice(0);return"flip"==n?i.flipEnable():n===!1?(i.flipEnable(1),r=[]):n===!0?(i.flipEnable(-1),r=[]):n.map(function(e){for(var n,a=0;a<r.length;a+=1)if(i.isTimeExact(e,r[a])){n=!0;break}n||(s.isInteger(e)||s.isDate(e)||t.isArray(e)||t.isPlainObject(e)&&e.from&&e.to)&&r.push(e)}),r},n.prototype.activate=function(e,n){var i=this,r=i.item.disable,a=r.length;return"flip"==n?i.flipEnable():n===!0?(i.flipEnable(1),r=[]):n===!1?(i.flipEnable(-1),r=[]):n.map(function(e){var n,o,l,c;for(l=0;l<a;l+=1){if(o=r[l],i.isTimeExact(o,e)){n=r[l]=null,c=!0;break}if(i.isTimeOverlap(o,e)){t.isPlainObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[2]||n.push("inverted")):s.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(l=0;l<a;l+=1)if(i.isTimeExact(r[l],e)){r[l]=null;break}if(c)for(l=0;l<a;l+=1)if(i.isTimeOverlap(r[l],e)){r[l]=null;break}n&&r.push(n)}),r.filter(function(e){return null!=e})},n.prototype.i=function(e,t){return s.isInteger(t)&&t>0?t:this.item.interval},n.prototype.nodes=function(e){var t=this,n=t.settings,i=t.item.select,r=t.item.highlight,a=t.item.view,o=t.item.disable;return s.node("ul",s.group({min:t.item.min.pick,max:t.item.max.pick,i:t.item.interval,node:"li",item:function(e){e=t.create(e);var l=e.pick,c=i&&i.pick==l,u=r&&r.pick==l,d=o&&t.disabled(e),f=s.trigger(t.formats.toString,t,[n.format,e]);return[s.trigger(t.formats.toString,t,[s.trigger(n.formatLabel,t,[e])||n.format,e]),function(e){return c&&e.push(n.klass.selected),u&&e.push(n.klass.highlighted),a&&a.pick==l&&e.push(n.klass.viewset),d&&e.push(n.klass.disabled),e.join(" ")}([n.klass.listItem]),"data-pick="+e.pick+" "+s.ariaAttr({role:"option",label:f,selected:!(!c||t.$node.val()!==f)||null,activedescendant:!!u||null,disabled:!!d||null})]}})+s.node("li",s.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disabled")+" "+s.ariaAttr({controls:t.$node[0].id})),"",s.ariaAttr({role:"presentation"})),n.klass.list,s.ariaAttr({role:"listbox",controls:t.$node[0].id}))},n.defaults=function(e){return{clear:"Clear",format:"h:i A",interval:30,closeOnSelect:!0,closeOnClear:!0,klass:{picker:e+" "+e+"--time",holder:e+"__holder",list:e+"__list",listItem:e+"__list-item",disabled:e+"__list-item--disabled",selected:e+"__list-item--selected",highlighted:e+"__list-item--highlighted",viewset:e+"__list-item--viewset",now:e+"__list-item--now",buttonClear:e+"__button--clear"}}}(e.klasses().picker),e.extend("pickatime",n)});