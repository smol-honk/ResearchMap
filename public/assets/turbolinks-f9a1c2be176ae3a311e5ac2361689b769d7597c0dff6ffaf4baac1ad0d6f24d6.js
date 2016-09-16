(function(){var t,e,i,n,s,o,a,r,l,h,u,c,d,p,f,m,g,v,_,y,b,w,k,D,C,x,S,E,T,M,N,I,O,P,A,R,j,z,F,H,L,W,U,V,B,$,Y,q,K,J,G,Q,X,Z,tt,et,it=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},nt=function(t,e){function i(){this.constructor=t}for(var n in e)st.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},st={}.hasOwnProperty,ot=[].slice,at=function(t,e){return function(){return t.apply(e,arguments)}};P={},d=10,Q=!1,F=null,_=null,I=null,W=null,et=null,n={BEFORE_CHANGE:"page:before-change",FETCH:"page:fetch",RECEIVE:"page:receive",CHANGE:"page:change",UPDATE:"page:update",LOAD:"page:load",RESTORE:"page:restore",BEFORE_UNLOAD:"page:before-unload",EXPIRE:"page:expire"},D=function(t){var e;return t=new i(t),Y(),c(),null!=F&&F.start(),Q&&(e=X(t.absolute))?(C(e),x(t,null,!1)):x(t,J)},X=function(t){var e;return e=P[t],e&&!e.transitionCacheDisabled?e:void 0},b=function(t){return null==t&&(t=!0),Q=t},y=function(t){return null==t&&(t=!0),h?t?null!=F?F:F=new o("html"):(null!=F&&F.uninstall(),F=null):void 0},x=function(t,e,i){return null==i&&(i=!0),Z(n.FETCH,{url:t.absolute}),null!=et&&et.abort(),et=new XMLHttpRequest,et.open("GET",t.withoutHashForIE10compatibility(),!0),et.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),et.setRequestHeader("X-XHR-Referer",W),et.onload=function(){var i;return Z(n.RECEIVE,{url:t.absolute}),(i=z())?(U(t),V(),p.apply(null,k(i)),O(),"function"==typeof e&&e(),Z(n.LOAD)):document.location.href=v()||t.absolute},F&&i&&(et.onprogress=function(){return function(t){var e;return e=t.lengthComputable?t.loaded/t.total*100:F.value+(100-F.value)/10,F.advanceTo(e)}}(this)),et.onloadend=function(){return et=null},et.onerror=function(){return document.location.href=t.absolute},et.send()},C=function(t){return null!=et&&et.abort(),p(t.title,t.body),H(t),Z(n.RESTORE)},c=function(){var t;return t=new i(_.url),P[t.absolute]={url:t.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},m(d)},R=function(t){return null==t&&(t=d),/^[\d]+$/.test(t)?d=parseInt(t):void 0},m=function(t){var e,i,s,o,a,r;for(a=Object.keys(P),e=a.map(function(t){return P[t].cachedAt}).sort(function(t,e){return e-t}),r=[],i=0,o=a.length;o>i;i++)s=a[i],P[s].cachedAt<=e[t]&&(Z(n.EXPIRE,P[s]),r.push(delete P[s]));return r},p=function(e,i,s,o){return Z(n.BEFORE_UNLOAD),document.title=e,document.documentElement.replaceChild(i,document.body),null!=s&&t.update(s),G(),o&&w(),_=window.history.state,null!=F&&F.done(),Z(n.CHANGE),Z(n.UPDATE)},w=function(){var t,e,i,n,s,o,a,r,l,h,u,c;for(c=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),i=0,s=c.length;s>i;i++)if(u=c[i],""===(l=u.type)||"text/javascript"===l){for(e=document.createElement("script"),h=u.attributes,n=0,o=h.length;o>n;n++)t=h[n],e.setAttribute(t.name,t.value);u.hasAttribute("async")||(e.async=!1),e.appendChild(document.createTextNode(u.innerHTML)),r=u.parentNode,a=u.nextSibling,r.removeChild(u),r.insertBefore(e,a)}},q=function(t){return t.innerHTML=t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),t},G=function(){var t,e;return t=(e=document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length-1],t&&document.activeElement!==t?t.focus():void 0},U=function(t){return(t=new i(t)).absolute!==W?window.history.pushState({turbolinks:!0,url:t.absolute},"",t.absolute):void 0},V=function(){var t,e;return(t=et.getResponseHeader("X-XHR-Redirected-To"))?(t=new i(t),e=t.hasNoHash()?document.location.hash:"",window.history.replaceState(window.history.state,"",t.href+e)):void 0},v=function(){var t;return null!=(t=et.getResponseHeader("Location"))&&new i(t).crossOrigin()?t:void 0},Y=function(){return W=document.location.href},$=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},B=function(){return _=window.history.state},O=function(){var t;return navigator.userAgent.match(/Firefox/)&&!(t=new i).hasNoHash()?(window.history.replaceState(_,"",t.withoutHash()),document.location.hash=t.hash):void 0},H=function(t){return window.scrollTo(t.positionX,t.positionY)},J=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},f=function(t){var e,i,n;if(null==t||"object"!=typeof t)return t;e=new t.constructor;for(i in t)n=t[i],e[i]=f(n);return e},j=function(t){var e,i;return i=(null!=(e=document.cookie.match(new RegExp(t+"=(\\w+)")))?e[1].toUpperCase():void 0)||"",document.cookie=t+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",i},Z=function(t,e){var i;return"undefined"!=typeof Prototype&&Event.fire(document,t,e,!0),i=document.createEvent("Events"),e&&(i.data=e),i.initEvent(t,!0,!0),document.dispatchEvent(i)},A=function(t){return!Z(n.BEFORE_CHANGE,{url:t})},z=function(){var t,e,i,n,s,o;return e=function(){var t;return 400<=(t=et.status)&&600>t},o=function(){var t;return null!=(t=et.getResponseHeader("Content-Type"))&&t.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},n=function(t){var e,i,n,s,o;for(s=t.querySelector("head").childNodes,o=[],e=0,i=s.length;i>e;e++)n=s[e],null!=("function"==typeof n.getAttribute?n.getAttribute("data-turbolinks-track"):void 0)&&o.push(n.getAttribute("src")||n.getAttribute("href"));return o},t=function(t){var e;return I||(I=n(document)),e=n(t),e.length!==I.length||s(e,I).length!==I.length},s=function(t,e){var i,n,s,o,a;for(t.length>e.length&&(s=[e,t],t=s[0],e=s[1]),o=[],i=0,n=t.length;n>i;i++)a=t[i],it.call(e,a)>=0&&o.push(a);return o},!e()&&o()&&(i=g(et.responseText),i&&!t(i))?i:void 0},k=function(e){var i;return i=e.querySelector("title"),[null!=i?i.textContent:void 0,q(e.querySelector("body")),t.get(e).token,"runScripts"]},t={get:function(t){var e;return null==t&&(t=document),{node:e=t.querySelector('meta[name="csrf-token"]'),token:null!=e&&"function"==typeof e.getAttribute?e.getAttribute("content"):void 0}},update:function(t){var e;return e=this.get(),null!=e.token&&null!=t&&e.token!==t?e.node.setAttribute("content",t):void 0}},g=function(t){var e;return e=document.documentElement.cloneNode(),e.innerHTML=t,e.head=e.querySelector("head"),e.body=e.querySelector("body"),e},i=function(){function t(e){return this.original=null!=e?e:document.location.href,this.original.constructor===t?this.original:void this._parse()}return t.prototype.withoutHash=function(){return this.href.replace(this.hash,"").replace("#","")},t.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},t.prototype.hasNoHash=function(){return 0===this.hash.length},t.prototype.crossOrigin=function(){return this.origin!==(new t).origin},t.prototype._parse=function(){var t;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,t=this.link,this.href=t.href,this.protocol=t.protocol,this.host=t.host,this.hostname=t.hostname,this.port=t.port,this.pathname=t.pathname,this.search=t.search,this.hash=t.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},t}(),s=function(t){function e(t){return this.link=t,this.link.constructor===e?this.link:(this.original=this.link.href,this.originalElement=this.link,this.link=this.link.cloneNode(!1),void e.__super__.constructor.apply(this,arguments))}return nt(e,t),e.HTML_EXTENSIONS=["html"],e.allowExtensions=function(){var t,i,n,s;for(i=1<=arguments.length?ot.call(arguments,0):[],n=0,s=i.length;s>n;n++)t=i[n],e.HTML_EXTENSIONS.push(t);return e.HTML_EXTENSIONS},e.prototype.shouldIgnore=function(){return this.crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},e.prototype._anchored=function(){return(this.hash.length>0||"#"===this.href.charAt(this.href.length-1))&&this.withoutHash()===(new i).withoutHash()},e.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+e.HTML_EXTENSIONS.join("|")+")?$","g"))},e.prototype._optOut=function(){var t,e;for(e=this.originalElement;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},e.prototype._target=function(){return 0!==this.link.target.length},e}(i),e=function(){function t(t){this.event=t,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&(A(this.link.absolute)||tt(this.link.href),this.event.preventDefault()))}return t.installHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",t.handle,!1),document.addEventListener("click",t.handle,!1))},t.handle=function(e){return new t(e)},t.prototype._extractLink=function(){var t;for(t=this.event.target;t.parentNode&&"A"!==t.nodeName;)t=t.parentNode;return"A"===t.nodeName&&0!==t.href.length?this.link=new s(t):void 0},t.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},t.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},t}(),o=function(){function t(t){this.elementSelector=t,this._trickle=at(this._trickle,this),this.value=0,this.content="",this.speed=300,this.opacity=.99,this.install()}var e;return e="turbolinks-progress-bar",t.prototype.install=function(){return this.element=document.querySelector(this.elementSelector),this.element.classList.add(e),this.styleElement=document.createElement("style"),document.head.appendChild(this.styleElement),this._updateStyle()},t.prototype.uninstall=function(){return this.element.classList.remove(e),document.head.removeChild(this.styleElement)},t.prototype.start=function(){return this.advanceTo(5)},t.prototype.advanceTo=function(t){var e;if(t>(e=this.value)&&100>=e){if(this.value=t,this._updateStyle(),100===this.value)return this._stopTrickle();if(this.value>0)return this._startTrickle()}},t.prototype.done=function(){return this.value>0?(this.advanceTo(100),this._reset()):void 0},t.prototype._reset=function(){var t;return t=this.opacity,setTimeout(function(t){return function(){return t.opacity=0,t._updateStyle()}}(this),this.speed/2),setTimeout(function(e){return function(){return e.value=0,e.opacity=t,e._withSpeed(0,function(){return e._updateStyle(!0)})}}(this),this.speed)},t.prototype._startTrickle=function(){return this.trickling?void 0:(this.trickling=!0,setTimeout(this._trickle,this.speed))},t.prototype._stopTrickle=function(){return delete this.trickling},t.prototype._trickle=function(){return this.trickling?(this.advanceTo(this.value+Math.random()/2),setTimeout(this._trickle,this.speed)):void 0},t.prototype._withSpeed=function(t,e){var i,n;return i=this.speed,this.speed=t,n=e(),this.speed=i,n},t.prototype._updateStyle=function(t){return null==t&&(t=!1),t&&this._changeContentToForceRepaint(),this.styleElement.textContent=this._createCSSRule()},t.prototype._changeContentToForceRepaint=function(){return this.content=""===this.content?" ":""},t.prototype._createCSSRule=function(){return this.elementSelector+"."+e+"::before {\n  content: '"+this.content+"';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: "+this.opacity+";\n  width: "+this.value+"%;\n  transition: width "+this.speed+"ms ease-out, opacity "+this.speed/2+"ms ease-in;\n  transform: translate3d(0,0,0);\n}"},t}(),u=function(t){return setTimeout(t,500)},T=function(){return document.addEventListener("DOMContentLoaded",function(){return Z(n.CHANGE),Z(n.UPDATE)},!0)},N=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(t,e){return jQuery.trim(e.responseText)?Z(n.UPDATE):void 0}):void 0},M=function(t){var e,n;return(null!=(n=t.state)?n.turbolinks:void 0)?(e=P[new i(t.state.url).absolute])?(c(),C(e)):tt(t.target.location.href):void 0},E=function(){return $(),B(),document.addEventListener("click",e.installHandlerLast,!0),window.addEventListener("hashchange",function(){return $(),B()},!1),u(function(){return window.addEventListener("popstate",M,!1)})},S=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),l=window.history&&window.history.pushState&&window.history.replaceState&&S,a=!navigator.userAgent.match(/CriOS\//),K="GET"===(L=j("request_method"))||""===L,h=l&&a&&K,r=document.addEventListener&&document.createEvent,r&&(T(),N()),h?(tt=D,E()):tt=function(t){return document.location.href=t},this.Turbolinks={visit:tt,pagesCached:R,enableTransitionCache:b,enableProgressBar:y,allowLinkExtensions:s.allowExtensions,supported:h,EVENTS:f(n)}}).call(this);