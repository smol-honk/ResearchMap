[].map||(Array.prototype.map=function(e,t){for(var n=this,o=n.length,a=new Array(o),r=0;r<o;r++)r in n&&(a[r]=e.call(t,n[r],r,n));return a}),[].filter||(Array.prototype.filter=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var o=[],a=arguments[1],r=0;r<n;r++)if(r in t){var i=t[r];e.call(a,i,r,t)&&o.push(i)}return o}),[].indexOf||(Array.prototype.indexOf=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var o=0;if(arguments.length>1&&(o=Number(arguments[1]),o!=o?o=0:0!==o&&o!=1/0&&o!=-(1/0)&&(o=(o>0||-1)*Math.floor(Math.abs(o)))),o>=n)return-1;for(var a=o>=0?o:Math.max(n-Math.abs(o),0);a<n;a++)if(a in t&&t[a]===e)return a;return-1});var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(e,t){var n=this;if("[object RegExp]"!==Object.prototype.toString.call(e))return nativeSplit.call(n,e,t);var o,a,r,i,l=[],s=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),d=0;for(e=new RegExp(e.source,s+"g"),n+="",compliantExecNpcg||(o=new RegExp("^"+e.source+"$(?!\\s)",s)),t=void 0===t?-1>>>0:t>>>0;(a=e.exec(n))&&(r=a.index+a[0].length,!(r>d&&(l.push(n.slice(d,a.index)),!compliantExecNpcg&&a.length>1&&a[0].replace(o,function(){for(var e=1;e<arguments.length-2;e++)void 0===arguments[e]&&(a[e]=void 0)}),a.length>1&&a.index<n.length&&Array.prototype.push.apply(l,a.slice(1)),i=a[0].length,d=r,l.length>=t)));)e.lastIndex===a.index&&e.lastIndex++;return d===n.length?!i&&e.test("")||l.push(""):l.push(n.slice(d)),l.length>t?l.slice(0,t):l};