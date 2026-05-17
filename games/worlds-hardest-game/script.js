

window.onload = function (event) {
  init();
document.body.appendChild(canvasElement);
};

window.onresize = function (event) {
  measure();
};

function init() {
  measure();
  setInterval(function () {
    update();
    draw();
  }, 1000 / FPS);

  state = "preloader";
  initPreloader();
}

function update() {
  resetMouse();
  hotkeys();
  runGameTimer();
  if (state == "game") {
    if (!paused) {
      updateEnemies();
      updatePlayer();
      updateCoins();
      updateInstructions();
      winLevel();
    }
    updatePlayerRainbow();
  } else if (state == "preloader") {
    updatePreloader();
  } else if (state == "intermission") {
    if (!paused) updateIntermission();
  } else if (state == "level_select") {
    updateEnemies();
    updatePlayerRainbow();
  } else if (state == "finish") {
    updateFinish();
  }
}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (state == "game") {
    drawWalls_fill();
    drawChecks();
    drawWalls_stroke();
    drawCoins();
    drawEnemies();
    drawPlayer();
    drawInstructions();
    if (mobile) {
      drawMobileControls();
    }
  } else if (state == "preloader") {
    drawPreloader();
  } else if (state == "intermission") {
    drawIntermission();
  } else if (state == "main_menu") {
    drawMainMenu();
  } else if (state == "level_select") {
    drawLevelSelect();
  } else if (state == "finish") {
    drawFinish();
  }
  if (state == "game" || state == "intermission") drawIGMenu();
  if (state != "preloader") drawBars();
  if (!mobile) {
    mobileControls();
  }
  drawFullscreenButton();
  drawBorder();

  // debug
  //canvas.fillStyle = "blue";
  //canvas.font = "Bold " + cwh(16) + "px Arial";
  //canvas.textAlign = "left";
  //canvas.fillText("DEBUG: " + mouseX + ", " + mouseY + " / " +
  //	Math.floor(mouseX / TILE_SIZE) + ", " + Math.floor(mouseY / TILE_SIZE), 7, 60 + cwh(BAR_TEXT_FIX));
  //canvas.fillText("DEBUG: " + mouseX + ", " + mouseY + " / " +
  //	canvasWidth + ", " + canvasHeight, 7, 60 + BAR_TEXT_FIX);
  //canvas.fillText(localStorage["whg_deaths"] + ", " + localStorage["whg_level"], cwh(7) + os.x, cwh(60 + BAR_TEXT_FIX) + os.y);
  //canvas.fillText("DEBUG: " + enemies[23][0].simpleX + ", " + enemies[23][0].simpleY, 7, 60 + cwh(BAR_TEXT_FIX));
}

function measure() {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const maxWidthByHeight = vh * (4/3);
  const width = Math.min(vw, maxWidthByHeight);
  const height = width * 3 / 4;
canvasElement.style.width = width + "px";
canvasElement.style.height = height + "px";
  if (mobile) {
    canvasWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    canvasHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;

    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    calcOffset();
  }
}

function goFullScreen() {
  if (canvasElement.requestFullScreen) canvasElement.requestFullScreen();
  else if (canvasElement.webkitRequestFullScreen) canvasElement.webkitRequestFullScreen();
  else if (canvasElement.mozRequestFullScreen) canvasElement.mozRequestFullScreen();

  FSOn = true;
  measure();
}

function exitFullScreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();

  FSOn = false;
  measure();
}

function drawFullscreenButton() {
  /*
	canvas.fillStyle = "white";
	canvas.font = cwh(30) + "px Arial";
	canvas.textAlign = "center";
	if (FSOn)
		canvas.fillText("EXIT FULLSCREEN", cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
	else
		canvas.fillText("GO FULLSCREEN",  cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
		
	// fix fullscreen cancelled bug
	if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
		if (!FSOn)
			FSOn = true;
	} else {
		if (FSOn)
			FSOn = false;
	}
	*/
}

/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(E,B){function ka(a,b,d){if(d===B&&a.nodeType===1){d=a.getAttribute("data-"+b);if(typeof d==="string"){try{d=d==="true"?true:d==="false"?false:d==="null"?null:!c.isNaN(d)?parseFloat(d):Ja.test(d)?c.parseJSON(d):d}catch(e){}c.data(a,b,d)}else d=B}return d}function U(){return false}function ca(){return true}function la(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function Ka(a){var b,d,e,f,h,l,k,o,x,r,A,C=[];f=[];h=c.data(this,this.nodeType?"events":"__events__");if(typeof h==="function")h=
h.events;if(!(a.liveFired===this||!h||!h.live||a.button&&a.type==="click")){if(a.namespace)A=RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");a.liveFired=this;var J=h.live.slice(0);for(k=0;k<J.length;k++){h=J[k];h.origType.replace(X,"")===a.type?f.push(h.selector):J.splice(k--,1)}f=c(a.target).closest(f,a.currentTarget);o=0;for(x=f.length;o<x;o++){r=f[o];for(k=0;k<J.length;k++){h=J[k];if(r.selector===h.selector&&(!A||A.test(h.namespace))){l=r.elem;e=null;if(h.preType==="mouseenter"||
h.preType==="mouseleave"){a.type=h.preType;e=c(a.relatedTarget).closest(h.selector)[0]}if(!e||e!==l)C.push({elem:l,handleObj:h,level:r.level})}}}o=0;for(x=C.length;o<x;o++){f=C[o];if(d&&f.level>d)break;a.currentTarget=f.elem;a.data=f.handleObj.data;a.handleObj=f.handleObj;A=f.handleObj.origHandler.apply(f.elem,arguments);if(A===false||a.isPropagationStopped()){d=f.level;if(A===false)b=false;if(a.isImmediatePropagationStopped())break}}return b}}function Y(a,b){return(a&&a!=="*"?a+".":"")+b.replace(La,
"`").replace(Ma,"&")}function ma(a,b,d){if(c.isFunction(b))return c.grep(a,function(f,h){return!!b.call(f,h,f)===d});else if(b.nodeType)return c.grep(a,function(f){return f===b===d});else if(typeof b==="string"){var e=c.grep(a,function(f){return f.nodeType===1});if(Na.test(b))return c.filter(b,e,!d);else b=c.filter(b,e)}return c.grep(a,function(f){return c.inArray(f,b)>=0===d})}function na(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var e=c.data(a[d++]),f=c.data(this,
e);if(e=e&&e.events){delete f.handle;f.events={};for(var h in e)for(var l in e[h])c.event.add(this,h,e[h][l],e[h][l].data)}}})}function Oa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function oa(a,b,d){var e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border")return e;c.each(b==="width"?Pa:Qa,function(){d||(e-=parseFloat(c.css(a,"padding"+this))||0);if(d==="margin")e+=parseFloat(c.css(a,
"margin"+this))||0;else e-=parseFloat(c.css(a,"border"+this+"Width"))||0});return e}function da(a,b,d,e){if(c.isArray(b)&&b.length)c.each(b,function(f,h){d||Ra.test(a)?e(a,h):da(a+"["+(typeof h==="object"||c.isArray(h)?f:"")+"]",h,d,e)});else if(!d&&b!=null&&typeof b==="object")c.isEmptyObject(b)?e(a,""):c.each(b,function(f,h){da(a+"["+f+"]",h,d,e)});else e(a,b)}function S(a,b){var d={};c.each(pa.concat.apply([],pa.slice(0,b)),function(){d[this]=a});return d}function qa(a){if(!ea[a]){var b=c("<"+
a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d==="")d="block";ea[a]=d}return ea[a]}function fa(a){return c.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var t=E.document,c=function(){function a(){if(!b.isReady){try{t.documentElement.doScroll("left")}catch(j){setTimeout(a,1);return}b.ready()}}var b=function(j,s){return new b.fn.init(j,s)},d=E.jQuery,e=E.$,f,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,l=/\S/,k=/^\s+/,o=/\s+$/,x=/\W/,r=/\d/,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,
C=/^[\],:{}\s]*$/,J=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,w=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,I=/(?:^|:|,)(?:\s*\[)+/g,L=/(webkit)[ \/]([\w.]+)/,g=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/,m=navigator.userAgent,p=false,q=[],u,y=Object.prototype.toString,F=Object.prototype.hasOwnProperty,M=Array.prototype.push,N=Array.prototype.slice,O=String.prototype.trim,D=Array.prototype.indexOf,R={};b.fn=b.prototype={init:function(j,
s){var v,z,H;if(!j)return this;if(j.nodeType){this.context=this[0]=j;this.length=1;return this}if(j==="body"&&!s&&t.body){this.context=t;this[0]=t.body;this.selector="body";this.length=1;return this}if(typeof j==="string")if((v=h.exec(j))&&(v[1]||!s))if(v[1]){H=s?s.ownerDocument||s:t;if(z=A.exec(j))if(b.isPlainObject(s)){j=[t.createElement(z[1])];b.fn.attr.call(j,s,true)}else j=[H.createElement(z[1])];else{z=b.buildFragment([v[1]],[H]);j=(z.cacheable?z.fragment.cloneNode(true):z.fragment).childNodes}return b.merge(this,
j)}else{if((z=t.getElementById(v[2]))&&z.parentNode){if(z.id!==v[2])return f.find(j);this.length=1;this[0]=z}this.context=t;this.selector=j;return this}else if(!s&&!x.test(j)){this.selector=j;this.context=t;j=t.getElementsByTagName(j);return b.merge(this,j)}else return!s||s.jquery?(s||f).find(j):b(s).find(j);else if(b.isFunction(j))return f.ready(j);if(j.selector!==B){this.selector=j.selector;this.context=j.context}return b.makeArray(j,this)},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length},
toArray:function(){return N.call(this,0)},get:function(j){return j==null?this.toArray():j<0?this.slice(j)[0]:this[j]},pushStack:function(j,s,v){var z=b();b.isArray(j)?M.apply(z,j):b.merge(z,j);z.prevObject=this;z.context=this.context;if(s==="find")z.selector=this.selector+(this.selector?" ":"")+v;else if(s)z.selector=this.selector+"."+s+"("+v+")";return z},each:function(j,s){return b.each(this,j,s)},ready:function(j){b.bindReady();if(b.isReady)j.call(t,b);else q&&q.push(j);return this},eq:function(j){return j===
-1?this.slice(j):this.slice(j,+j+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(N.apply(this,arguments),"slice",N.call(arguments).join(","))},map:function(j){return this.pushStack(b.map(this,function(s,v){return j.call(s,v,s)}))},end:function(){return this.prevObject||b(null)},push:M,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var j,s,v,z,H,G=arguments[0]||{},K=1,Q=arguments.length,ga=false;
if(typeof G==="boolean"){ga=G;G=arguments[1]||{};K=2}if(typeof G!=="object"&&!b.isFunction(G))G={};if(Q===K){G=this;--K}for(;K<Q;K++)if((j=arguments[K])!=null)for(s in j){v=G[s];z=j[s];if(G!==z)if(ga&&z&&(b.isPlainObject(z)||(H=b.isArray(z)))){if(H){H=false;v=v&&b.isArray(v)?v:[]}else v=v&&b.isPlainObject(v)?v:{};G[s]=b.extend(ga,v,z)}else if(z!==B)G[s]=z}return G};b.extend({noConflict:function(j){E.$=e;if(j)E.jQuery=d;return b},isReady:false,readyWait:1,ready:function(j){j===true&&b.readyWait--;
if(!b.readyWait||j!==true&&!b.isReady){if(!t.body)return setTimeout(b.ready,1);b.isReady=true;if(!(j!==true&&--b.readyWait>0))if(q){var s=0,v=q;for(q=null;j=v[s++];)j.call(t,b);b.fn.trigger&&b(t).trigger("ready").unbind("ready")}}},bindReady:function(){if(!p){p=true;if(t.readyState==="complete")return setTimeout(b.ready,1);if(t.addEventListener){t.addEventListener("DOMContentLoaded",u,false);E.addEventListener("load",b.ready,false)}else if(t.attachEvent){t.attachEvent("onreadystatechange",u);E.attachEvent("onload",
b.ready);var j=false;try{j=E.frameElement==null}catch(s){}t.documentElement.doScroll&&j&&a()}}},isFunction:function(j){return b.type(j)==="function"},isArray:Array.isArray||function(j){return b.type(j)==="array"},isWindow:function(j){return j&&typeof j==="object"&&"setInterval"in j},isNaN:function(j){return j==null||!r.test(j)||isNaN(j)},type:function(j){return j==null?String(j):R[y.call(j)]||"object"},isPlainObject:function(j){if(!j||b.type(j)!=="object"||j.nodeType||b.isWindow(j))return false;if(j.constructor&&
!F.call(j,"constructor")&&!F.call(j.constructor.prototype,"isPrototypeOf"))return false;for(var s in j);return s===B||F.call(j,s)},isEmptyObject:function(j){for(var s in j)return false;return true},error:function(j){throw j;},parseJSON:function(j){if(typeof j!=="string"||!j)return null;j=b.trim(j);if(C.test(j.replace(J,"@").replace(w,"]").replace(I,"")))return E.JSON&&E.JSON.parse?E.JSON.parse(j):(new Function("return "+j))();else b.error("Invalid JSON: "+j)},noop:function(){},globalEval:function(j){if(j&&
l.test(j)){var s=t.getElementsByTagName("head")[0]||t.documentElement,v=t.createElement("script");v.type="text/javascript";if(b.support.scriptEval)v.appendChild(t.createTextNode(j));else v.text=j;s.insertBefore(v,s.firstChild);s.removeChild(v)}},nodeName:function(j,s){return j.nodeName&&j.nodeName.toUpperCase()===s.toUpperCase()},each:function(j,s,v){var z,H=0,G=j.length,K=G===B||b.isFunction(j);if(v)if(K)for(z in j){if(s.apply(j[z],v)===false)break}else for(;H<G;){if(s.apply(j[H++],v)===false)break}else if(K)for(z in j){if(s.call(j[z],
z,j[z])===false)break}else for(v=j[0];H<G&&s.call(v,H,v)!==false;v=j[++H]);return j},trim:O?function(j){return j==null?"":O.call(j)}:function(j){return j==null?"":j.toString().replace(k,"").replace(o,"")},makeArray:function(j,s){var v=s||[];if(j!=null){var z=b.type(j);j.length==null||z==="string"||z==="function"||z==="regexp"||b.isWindow(j)?M.call(v,j):b.merge(v,j)}return v},inArray:function(j,s){if(s.indexOf)return s.indexOf(j);for(var v=0,z=s.length;v<z;v++)if(s[v]===j)return v;return-1},merge:function(j,
s){var v=j.length,z=0;if(typeof s.length==="number")for(var H=s.length;z<H;z++)j[v++]=s[z];else for(;s[z]!==B;)j[v++]=s[z++];j.length=v;return j},grep:function(j,s,v){var z=[],H;v=!!v;for(var G=0,K=j.length;G<K;G++){H=!!s(j[G],G);v!==H&&z.push(j[G])}return z},map:function(j,s,v){for(var z=[],H,G=0,K=j.length;G<K;G++){H=s(j[G],G,v);if(H!=null)z[z.length]=H}return z.concat.apply([],z)},guid:1,proxy:function(j,s,v){if(arguments.length===2)if(typeof s==="string"){v=j;j=v[s];s=B}else if(s&&!b.isFunction(s)){v=
s;s=B}if(!s&&j)s=function(){return j.apply(v||this,arguments)};if(j)s.guid=j.guid=j.guid||s.guid||b.guid++;return s},access:function(j,s,v,z,H,G){var K=j.length;if(typeof s==="object"){for(var Q in s)b.access(j,Q,s[Q],z,H,v);return j}if(v!==B){z=!G&&z&&b.isFunction(v);for(Q=0;Q<K;Q++)H(j[Q],s,z?v.call(j[Q],Q,H(j[Q],s)):v,G);return j}return K?H(j[0],s):B},now:function(){return(new Date).getTime()},uaMatch:function(j){j=j.toLowerCase();j=L.exec(j)||g.exec(j)||i.exec(j)||j.indexOf("compatible")<0&&n.exec(j)||
[];return{browser:j[1]||"",version:j[2]||"0"}},browser:{}});b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(j,s){R["[object "+s+"]"]=s.toLowerCase()});m=b.uaMatch(m);if(m.browser){b.browser[m.browser]=true;b.browser.version=m.version}if(b.browser.webkit)b.browser.safari=true;if(D)b.inArray=function(j,s){return D.call(s,j)};if(!/\s/.test("\u00a0")){k=/^[\s\xA0]+/;o=/[\s\xA0]+$/}f=b(t);if(t.addEventListener)u=function(){t.removeEventListener("DOMContentLoaded",u,
false);b.ready()};else if(t.attachEvent)u=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",u);b.ready()}};return E.jQuery=E.$=b}();(function(){c.support={};var a=t.documentElement,b=t.createElement("script"),d=t.createElement("div"),e="script"+c.now();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var f=d.getElementsByTagName("*"),h=d.getElementsByTagName("a")[0],l=t.createElement("select"),
k=l.appendChild(t.createElement("option"));if(!(!f||!f.length||!h)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(h.getAttribute("style")),hrefNormalized:h.getAttribute("href")==="/a",opacity:/^0.55$/.test(h.style.opacity),cssFloat:!!h.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:k.selected,deleteExpando:true,optDisabled:false,checkClone:false,
scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};l.disabled=true;c.support.optDisabled=!k.disabled;b.type="text/javascript";try{b.appendChild(t.createTextNode("window."+e+"=1;"))}catch(o){}a.insertBefore(b,a.firstChild);if(E[e]){c.support.scriptEval=true;delete E[e]}try{delete b.test}catch(x){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function r(){c.support.noCloneEvent=
false;d.detachEvent("onclick",r)});d.cloneNode(true).fireEvent("onclick")}d=t.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=t.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var r=t.createElement("div");r.style.width=r.style.paddingLeft="1px";t.body.appendChild(r);c.boxModel=c.support.boxModel=r.offsetWidth===2;if("zoom"in r.style){r.style.display="inline";r.style.zoom=
1;c.support.inlineBlockNeedsLayout=r.offsetWidth===2;r.style.display="";r.innerHTML="<div style='width:4px;'></div>";c.support.shrinkWrapBlocks=r.offsetWidth!==2}r.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";var A=r.getElementsByTagName("td");c.support.reliableHiddenOffsets=A[0].offsetHeight===0;A[0].style.display="";A[1].style.display="none";c.support.reliableHiddenOffsets=c.support.reliableHiddenOffsets&&A[0].offsetHeight===0;r.innerHTML="";t.body.removeChild(r).style.display=
"none"});a=function(r){var A=t.createElement("div");r="on"+r;var C=r in A;if(!C){A.setAttribute(r,"return;");C=typeof A[r]==="function"}return C};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=f=h=null}})();var ra={},Ja=/^(?:\{.*\}|\[.*\])$/;c.extend({cache:{},uuid:0,expando:"jQuery"+c.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(a,b,d){if(c.acceptData(a)){a=a==E?ra:a;var e=a.nodeType,f=e?a[c.expando]:null,h=
c.cache;if(!(e&&!f&&typeof b==="string"&&d===B)){if(e)f||(a[c.expando]=f=++c.uuid);else h=a;if(typeof b==="object")if(e)h[f]=c.extend(h[f],b);else c.extend(h,b);else if(e&&!h[f])h[f]={};a=e?h[f]:h;if(d!==B)a[b]=d;return typeof b==="string"?a[b]:a}}},removeData:function(a,b){if(c.acceptData(a)){a=a==E?ra:a;var d=a.nodeType,e=d?a[c.expando]:a,f=c.cache,h=d?f[e]:e;if(b){if(h){delete h[b];d&&c.isEmptyObject(h)&&c.removeData(a)}}else if(d&&c.support.deleteExpando)delete a[c.expando];else if(a.removeAttribute)a.removeAttribute(c.expando);
else if(d)delete f[e];else for(var l in a)delete a[l]}},acceptData:function(a){if(a.nodeName){var b=c.noData[a.nodeName.toLowerCase()];if(b)return!(b===true||a.getAttribute("classid")!==b)}return true}});c.fn.extend({data:function(a,b){var d=null;if(typeof a==="undefined"){if(this.length){var e=this[0].attributes,f;d=c.data(this[0]);for(var h=0,l=e.length;h<l;h++){f=e[h].name;if(f.indexOf("data-")===0){f=f.substr(5);ka(this[0],f,d[f])}}}return d}else if(typeof a==="object")return this.each(function(){c.data(this,
a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(b===B){d=this.triggerHandler("getData"+k[1]+"!",[k[0]]);if(d===B&&this.length){d=c.data(this[0],a);d=ka(this[0],a,d)}return d===B&&k[1]?this.data(k[0]):d}else return this.each(function(){var o=c(this),x=[k[0],b];o.triggerHandler("setData"+k[1]+"!",x);c.data(this,a,b);o.triggerHandler("changeData"+k[1]+"!",x)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var e=
c.data(a,b);if(!d)return e||[];if(!e||c.isArray(d))e=c.data(a,b,c.makeArray(d));else e.push(d);return e}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),e=d.shift();if(e==="inprogress")e=d.shift();if(e){b==="fx"&&d.unshift("inprogress");e.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===B)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,
a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var sa=/[\n\t]/g,ha=/\s+/,Sa=/\r/g,Ta=/^(?:href|src|style)$/,Ua=/^(?:button|input)$/i,Va=/^(?:button|input|object|select|textarea)$/i,Wa=/^a(?:rea)?$/i,ta=/^(?:radio|checkbox)$/i;c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",
colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};c.fn.extend({attr:function(a,b){return c.access(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(x){var r=c(this);r.addClass(a.call(this,x,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===
1)if(f.className){for(var h=" "+f.className+" ",l=f.className,k=0,o=b.length;k<o;k++)if(h.indexOf(" "+b[k]+" ")<0)l+=" "+b[k];f.className=c.trim(l)}else f.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(o){var x=c(this);x.removeClass(a.call(this,o,x.attr("class")))});if(a&&typeof a==="string"||a===B)for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1&&f.className)if(a){for(var h=(" "+f.className+" ").replace(sa," "),
l=0,k=b.length;l<k;l++)h=h.replace(" "+b[l]+" "," ");f.className=c.trim(h)}else f.className=""}return this},toggleClass:function(a,b){var d=typeof a,e=typeof b==="boolean";if(c.isFunction(a))return this.each(function(f){var h=c(this);h.toggleClass(a.call(this,f,h.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var f,h=0,l=c(this),k=b,o=a.split(ha);f=o[h++];){k=e?k:!l.hasClass(f);l[k?"addClass":"removeClass"](f)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,
"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(sa," ").indexOf(a)>-1)return true;return false},val:function(a){if(!arguments.length){var b=this[0];if(b){if(c.nodeName(b,"option")){var d=b.attributes.value;return!d||d.specified?b.value:b.text}if(c.nodeName(b,"select")){var e=b.selectedIndex;d=[];var f=b.options;b=b.type==="select-one";
if(e<0)return null;var h=b?e:0;for(e=b?e+1:f.length;h<e;h++){var l=f[h];if(l.selected&&(c.support.optDisabled?!l.disabled:l.getAttribute("disabled")===null)&&(!l.parentNode.disabled||!c.nodeName(l.parentNode,"optgroup"))){a=c(l).val();if(b)return a;d.push(a)}}return d}if(ta.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Sa,"")}return B}var k=c.isFunction(a);return this.each(function(o){var x=c(this),r=a;if(this.nodeType===1){if(k)r=
a.call(this,o,x.val());if(r==null)r="";else if(typeof r==="number")r+="";else if(c.isArray(r))r=c.map(r,function(C){return C==null?"":C+""});if(c.isArray(r)&&ta.test(this.type))this.checked=c.inArray(x.val(),r)>=0;else if(c.nodeName(this,"select")){var A=c.makeArray(r);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),A)>=0});if(!A.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},
attr:function(a,b,d,e){if(!a||a.nodeType===3||a.nodeType===8)return B;if(e&&b in c.attrFn)return c(a)[b](d);e=a.nodeType!==1||!c.isXMLDoc(a);var f=d!==B;b=e&&c.props[b]||b;var h=Ta.test(b);if((b in a||a[b]!==B)&&e&&!h){if(f){b==="type"&&Ua.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");if(d===null)a.nodeType===1&&a.removeAttribute(b);else a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&
b.specified?b.value:Va.test(a.nodeName)||Wa.test(a.nodeName)&&a.href?0:B;return a[b]}if(!c.support.style&&e&&b==="style"){if(f)a.style.cssText=""+d;return a.style.cssText}f&&a.setAttribute(b,""+d);if(!a.attributes[b]&&a.hasAttribute&&!a.hasAttribute(b))return B;a=!c.support.hrefNormalized&&e&&h?a.getAttribute(b,2):a.getAttribute(b);return a===null?B:a}});var X=/\.(.*)$/,ia=/^(?:textarea|input|select)$/i,La=/\./g,Ma=/ /g,Xa=/[^\w\s.|`]/g,Ya=function(a){return a.replace(Xa,"\\$&")},ua={focusin:0,focusout:0};
c.event={add:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(c.isWindow(a)&&a!==E&&!a.frameElement)a=E;if(d===false)d=U;else if(!d)return;var f,h;if(d.handler){f=d;d=f.handler}if(!d.guid)d.guid=c.guid++;if(h=c.data(a)){var l=a.nodeType?"events":"__events__",k=h[l],o=h.handle;if(typeof k==="function"){o=k.handle;k=k.events}else if(!k){a.nodeType||(h[l]=h=function(){});h.events=k={}}if(!o)h.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,
arguments):B};o.elem=a;b=b.split(" ");for(var x=0,r;l=b[x++];){h=f?c.extend({},f):{handler:d,data:e};if(l.indexOf(".")>-1){r=l.split(".");l=r.shift();h.namespace=r.slice(0).sort().join(".")}else{r=[];h.namespace=""}h.type=l;if(!h.guid)h.guid=d.guid;var A=k[l],C=c.event.special[l]||{};if(!A){A=k[l]=[];if(!C.setup||C.setup.call(a,e,r,o)===false)if(a.addEventListener)a.addEventListener(l,o,false);else a.attachEvent&&a.attachEvent("on"+l,o)}if(C.add){C.add.call(a,h);if(!h.handler.guid)h.handler.guid=
d.guid}A.push(h);c.event.global[l]=true}a=null}}},global:{},remove:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(d===false)d=U;var f,h,l=0,k,o,x,r,A,C,J=a.nodeType?"events":"__events__",w=c.data(a),I=w&&w[J];if(w&&I){if(typeof I==="function"){w=I;I=I.events}if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(f in I)c.event.remove(a,f+b)}else{for(b=b.split(" ");f=b[l++];){r=f;k=f.indexOf(".")<0;o=[];if(!k){o=f.split(".");f=o.shift();x=RegExp("(^|\\.)"+
c.map(o.slice(0).sort(),Ya).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(A=I[f])if(d){r=c.event.special[f]||{};for(h=e||0;h<A.length;h++){C=A[h];if(d.guid===C.guid){if(k||x.test(C.namespace)){e==null&&A.splice(h--,1);r.remove&&r.remove.call(a,C)}if(e!=null)break}}if(A.length===0||e!=null&&A.length===1){if(!r.teardown||r.teardown.call(a,o)===false)c.removeEvent(a,f,w.handle);delete I[f]}}else for(h=0;h<A.length;h++){C=A[h];if(k||x.test(C.namespace)){c.event.remove(a,r,C.handler,h);A.splice(h--,1)}}}if(c.isEmptyObject(I)){if(b=
w.handle)b.elem=null;delete w.events;delete w.handle;if(typeof w==="function")c.removeData(a,J);else c.isEmptyObject(w)&&c.removeData(a)}}}}},trigger:function(a,b,d,e){var f=a.type||a;if(!e){a=typeof a==="object"?a[c.expando]?a:c.extend(c.Event(f),a):c.Event(f);if(f.indexOf("!")>=0){a.type=f=f.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[f]&&c.each(c.cache,function(){this.events&&this.events[f]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===
8)return B;a.result=B;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(e=d.nodeType?c.data(d,"handle"):(c.data(d,"__events__")||{}).handle)&&e.apply(d,b);e=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+f]&&d["on"+f].apply(d,b)===false){a.result=false;a.preventDefault()}}catch(h){}if(!a.isPropagationStopped()&&e)c.event.trigger(a,b,e,true);else if(!a.isDefaultPrevented()){var l;e=a.target;var k=f.replace(X,""),o=c.nodeName(e,"a")&&k===
"click",x=c.event.special[k]||{};if((!x._default||x._default.call(d,a)===false)&&!o&&!(e&&e.nodeName&&c.noData[e.nodeName.toLowerCase()])){try{if(e[k]){if(l=e["on"+k])e["on"+k]=null;c.event.triggered=true;e[k]()}}catch(r){}if(l)e["on"+k]=l;c.event.triggered=false}}},handle:function(a){var b,d,e,f;d=[];var h=c.makeArray(arguments);a=h[0]=c.event.fix(a||E.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;if(!b){e=a.type.split(".");a.type=e.shift();d=e.slice(0).sort();e=RegExp("(^|\\.)"+
d.join("\\.(?:.*\\.)?")+"(\\.|$)")}a.namespace=a.namespace||d.join(".");f=c.data(this,this.nodeType?"events":"__events__");if(typeof f==="function")f=f.events;d=(f||{})[a.type];if(f&&d){d=d.slice(0);f=0;for(var l=d.length;f<l;f++){var k=d[f];if(b||e.test(k.namespace)){a.handler=k.handler;a.data=k.data;a.handleObj=k;k=k.handler.apply(this,h);if(k!==B){a.result=k;if(k===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[c.expando])return a;var b=a;a=c.Event(b);for(var d=this.props.length,e;d;){e=this.props[--d];a[e]=b[e]}if(!a.target)a.target=a.srcElement||t;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=t.documentElement;d=t.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(a.which==null&&(a.charCode!=null||a.keyCode!=null))a.which=a.charCode!=null?a.charCode:a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==B)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,Y(a.origType,a.selector),c.extend({},a,{handler:Ka,guid:a.handler.guid}))},remove:function(a){c.event.remove(this,
Y(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,d){if(c.isWindow(this))this.onbeforeunload=d},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};c.removeEvent=t.removeEventListener?function(a,b,d){a.removeEventListener&&a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=
c.now();this[c.expando]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=ca;var a=this.originalEvent;if(a)if(a.preventDefault)a.preventDefault();else a.returnValue=false},stopPropagation:function(){this.isPropagationStopped=ca;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ca;this.stopPropagation()},isDefaultPrevented:U,isPropagationStopped:U,isImmediatePropagationStopped:U};
var va=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},wa=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?wa:va,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?wa:va)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName.toLowerCase()!==
"form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length){a.liveFired=B;return la("submit",this,arguments)}});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13){a.liveFired=B;return la("submit",this,arguments)}})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var V,
xa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(e){return e.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},Z=function(a,b){var d=a.target,e,f;if(!(!ia.test(d.nodeName)||d.readOnly)){e=c.data(d,"_change_data");f=xa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",f);if(!(e===B||f===e))if(e!=null||f){a.type="change";a.liveFired=
B;return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:Z,beforedeactivate:Z,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return Z.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return Z.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,"_change_data",xa(a))}},setup:function(){if(this.type===
"file")return false;for(var a in V)c.event.add(this,a+".specialChange",V[a]);return ia.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return ia.test(this.nodeName)}};V=c.event.special.change.filters;V.focus=V.beforeactivate}t.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.trigger(e,null,e.target)}c.event.special[b]={setup:function(){ua[b]++===0&&t.addEventListener(a,d,true)},teardown:function(){--ua[b]===
0&&t.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,e,f){if(typeof d==="object"){for(var h in d)this[b](h,e,d[h],f);return this}if(c.isFunction(e)||e===false){f=e;e=B}var l=b==="one"?c.proxy(f,function(o){c(this).unbind(o,l);return f.apply(this,arguments)}):f;if(d==="unload"&&b!=="one")this.one(d,e,f);else{h=0;for(var k=this.length;h<k;h++)c.event.add(this[h],d,l,e)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault)for(var d in a)this.unbind(d,
a[d]);else{d=0;for(var e=this.length;d<e;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,e){return this.live(b,d,e,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var d=c.Event(a);d.preventDefault();d.stopPropagation();c.event.trigger(d,b,this[0]);return d.result}},toggle:function(a){for(var b=arguments,d=
1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(e){var f=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,f+1);e.preventDefault();return b[f].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var ya={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,e,f,h){var l,k=0,o,x,r=h||this.selector;h=h?this:c(this.context);if(typeof d===
"object"&&!d.preventDefault){for(l in d)h[b](l,e,d[l],r);return this}if(c.isFunction(e)){f=e;e=B}for(d=(d||"").split(" ");(l=d[k++])!=null;){o=X.exec(l);x="";if(o){x=o[0];l=l.replace(X,"")}if(l==="hover")d.push("mouseenter"+x,"mouseleave"+x);else{o=l;if(l==="focus"||l==="blur"){d.push(ya[l]+x);l+=x}else l=(ya[l]||l)+x;if(b==="live"){x=0;for(var A=h.length;x<A;x++)c.event.add(h[x],"live."+Y(l,r),{data:e,selector:r,handler:f,origType:l,origHandler:f,preType:o})}else h.unbind("live."+Y(l,r),f)}}return this}});
c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d,e){if(e==null){e=d;d=null}return arguments.length>0?this.bind(b,d,e):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});E.attachEvent&&!E.addEventListener&&c(E).bind("unload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});
(function(){function a(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1&&!q){y.sizcache=n;y.sizset=p}if(y.nodeName.toLowerCase()===i){F=y;break}y=y[g]}m[p]=F}}}function b(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1){if(!q){y.sizcache=n;y.sizset=p}if(typeof i!=="string"){if(y===i){F=true;break}}else if(k.filter(i,
[y]).length>0){F=y;break}}y=y[g]}m[p]=F}}}var d=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,h=false,l=true;[0,0].sort(function(){l=false;return 0});var k=function(g,i,n,m){n=n||[];var p=i=i||t;if(i.nodeType!==1&&i.nodeType!==9)return[];if(!g||typeof g!=="string")return n;var q,u,y,F,M,N=true,O=k.isXML(i),D=[],R=g;do{d.exec("");if(q=d.exec(R)){R=q[3];D.push(q[1]);if(q[2]){F=q[3];
break}}}while(q);if(D.length>1&&x.exec(g))if(D.length===2&&o.relative[D[0]])u=L(D[0]+D[1],i);else for(u=o.relative[D[0]]?[i]:k(D.shift(),i);D.length;){g=D.shift();if(o.relative[g])g+=D.shift();u=L(g,u)}else{if(!m&&D.length>1&&i.nodeType===9&&!O&&o.match.ID.test(D[0])&&!o.match.ID.test(D[D.length-1])){q=k.find(D.shift(),i,O);i=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]}if(i){q=m?{expr:D.pop(),set:C(m)}:k.find(D.pop(),D.length===1&&(D[0]==="~"||D[0]==="+")&&i.parentNode?i.parentNode:i,O);u=q.expr?k.filter(q.expr,
q.set):q.set;if(D.length>0)y=C(u);else N=false;for(;D.length;){q=M=D.pop();if(o.relative[M])q=D.pop();else M="";if(q==null)q=i;o.relative[M](y,q,O)}}else y=[]}y||(y=u);y||k.error(M||g);if(f.call(y)==="[object Array]")if(N)if(i&&i.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&k.contains(i,y[g])))n.push(u[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&n.push(u[g]);else n.push.apply(n,y);else C(y,n);if(F){k(F,p,n,m);k.uniqueSort(n)}return n};k.uniqueSort=function(g){if(w){h=
l;g.sort(w);if(h)for(var i=1;i<g.length;i++)g[i]===g[i-1]&&g.splice(i--,1)}return g};k.matches=function(g,i){return k(g,null,null,i)};k.matchesSelector=function(g,i){return k(i,null,null,[g]).length>0};k.find=function(g,i,n){var m;if(!g)return[];for(var p=0,q=o.order.length;p<q;p++){var u,y=o.order[p];if(u=o.leftMatch[y].exec(g)){var F=u[1];u.splice(1,1);if(F.substr(F.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");m=o.find[y](u,i,n);if(m!=null){g=g.replace(o.match[y],"");break}}}}m||(m=i.getElementsByTagName("*"));
return{set:m,expr:g}};k.filter=function(g,i,n,m){for(var p,q,u=g,y=[],F=i,M=i&&i[0]&&k.isXML(i[0]);g&&i.length;){for(var N in o.filter)if((p=o.leftMatch[N].exec(g))!=null&&p[2]){var O,D,R=o.filter[N];D=p[1];q=false;p.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(F===y)y=[];if(o.preFilter[N])if(p=o.preFilter[N](p,F,n,y,m,M)){if(p===true)continue}else q=O=true;if(p)for(var j=0;(D=F[j])!=null;j++)if(D){O=R(D,p,j,F);var s=m^!!O;if(n&&O!=null)if(s)q=true;else F[j]=false;else if(s){y.push(D);q=true}}if(O!==
B){n||(F=y);g=g.replace(o.match[N],"");if(!q)return[];break}}}if(g===u)if(q==null)k.error(g);else break;u=g}return F};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var o=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,i){var n=typeof i==="string",m=n&&!/\W/.test(i);n=n&&!m;if(m)i=i.toLowerCase();m=0;for(var p=g.length,q;m<p;m++)if(q=g[m]){for(;(q=q.previousSibling)&&q.nodeType!==1;);g[m]=n||q&&q.nodeName.toLowerCase()===
i?q||false:q===i}n&&k.filter(i,g,true)},">":function(g,i){var n,m=typeof i==="string",p=0,q=g.length;if(m&&!/\W/.test(i))for(i=i.toLowerCase();p<q;p++){if(n=g[p]){n=n.parentNode;g[p]=n.nodeName.toLowerCase()===i?n:false}}else{for(;p<q;p++)if(n=g[p])g[p]=m?n.parentNode:n.parentNode===i;m&&k.filter(i,g,true)}},"":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=i=i.toLowerCase();q=a}q("parentNode",i,p,g,m,n)},"~":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=
i=i.toLowerCase();q=a}q("previousSibling",i,p,g,m,n)}},find:{ID:function(g,i,n){if(typeof i.getElementById!=="undefined"&&!n)return(g=i.getElementById(g[1]))&&g.parentNode?[g]:[]},NAME:function(g,i){if(typeof i.getElementsByName!=="undefined"){for(var n=[],m=i.getElementsByName(g[1]),p=0,q=m.length;p<q;p++)m[p].getAttribute("name")===g[1]&&n.push(m[p]);return n.length===0?null:n}},TAG:function(g,i){return i.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,i,n,m,p,q){g=" "+g[1].replace(/\\/g,
"")+" ";if(q)return g;q=0;for(var u;(u=i[q])!=null;q++)if(u)if(p^(u.className&&(" "+u.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))n||m.push(u);else if(n)i[q]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var i=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=i[1]+(i[2]||1)-0;g[3]=i[3]-0}g[0]=e++;return g},ATTR:function(g,i,n,
m,p,q){i=g[1].replace(/\\/g,"");if(!q&&o.attrMap[i])g[1]=o.attrMap[i];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,i,n,m,p){if(g[1]==="not")if((d.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,i);else{g=k.filter(g[3],i,n,true^p);n||m.push.apply(m,g);return false}else if(o.match.POS.test(g[0])||o.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===
true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,i,n){return!!k(n[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===
g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,i){return i===0},last:function(g,i,n,m){return i===m.length-1},even:function(g,i){return i%2===0},odd:function(g,i){return i%2===1},lt:function(g,i,n){return i<n[3]-0},gt:function(g,i,n){return i>n[3]-0},nth:function(g,i,n){return n[3]-
0===i},eq:function(g,i,n){return n[3]-0===i}},filter:{PSEUDO:function(g,i,n,m){var p=i[1],q=o.filters[p];if(q)return q(g,n,i,m);else if(p==="contains")return(g.textContent||g.innerText||k.getText([g])||"").indexOf(i[3])>=0;else if(p==="not"){i=i[3];n=0;for(m=i.length;n<m;n++)if(i[n]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+p)},CHILD:function(g,i){var n=i[1],m=g;switch(n){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(n===
"first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":n=i[2];var p=i[3];if(n===1&&p===0)return true;var q=i[0],u=g.parentNode;if(u&&(u.sizcache!==q||!g.nodeIndex)){var y=0;for(m=u.firstChild;m;m=m.nextSibling)if(m.nodeType===1)m.nodeIndex=++y;u.sizcache=q}m=g.nodeIndex-p;return n===0?m===0:m%n===0&&m/n>=0}},ID:function(g,i){return g.nodeType===1&&g.getAttribute("id")===i},TAG:function(g,i){return i==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===
i},CLASS:function(g,i){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(i)>-1},ATTR:function(g,i){var n=i[1];n=o.attrHandle[n]?o.attrHandle[n](g):g[n]!=null?g[n]:g.getAttribute(n);var m=n+"",p=i[2],q=i[4];return n==null?p==="!=":p==="="?m===q:p==="*="?m.indexOf(q)>=0:p==="~="?(" "+m+" ").indexOf(q)>=0:!q?m&&n!==false:p==="!="?m!==q:p==="^="?m.indexOf(q)===0:p==="$="?m.substr(m.length-q.length)===q:p==="|="?m===q||m.substr(0,q.length+1)===q+"-":false},POS:function(g,i,n,m){var p=o.setFilters[i[2]];
if(p)return p(g,n,i,m)}}},x=o.match.POS,r=function(g,i){return"\\"+(i-0+1)},A;for(A in o.match){o.match[A]=RegExp(o.match[A].source+/(?![^\[]*\])(?![^\(]*\))/.source);o.leftMatch[A]=RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[A].source.replace(/\\(\d+)/g,r))}var C=function(g,i){g=Array.prototype.slice.call(g,0);if(i){i.push.apply(i,g);return i}return g};try{Array.prototype.slice.call(t.documentElement.childNodes,0)}catch(J){C=function(g,i){var n=0,m=i||[];if(f.call(g)==="[object Array]")Array.prototype.push.apply(m,
g);else if(typeof g.length==="number")for(var p=g.length;n<p;n++)m.push(g[n]);else for(;g[n];n++)m.push(g[n]);return m}}var w,I;if(t.documentElement.compareDocumentPosition)w=function(g,i){if(g===i){h=true;return 0}if(!g.compareDocumentPosition||!i.compareDocumentPosition)return g.compareDocumentPosition?-1:1;return g.compareDocumentPosition(i)&4?-1:1};else{w=function(g,i){var n,m,p=[],q=[];n=g.parentNode;m=i.parentNode;var u=n;if(g===i){h=true;return 0}else if(n===m)return I(g,i);else if(n){if(!m)return 1}else return-1;
for(;u;){p.unshift(u);u=u.parentNode}for(u=m;u;){q.unshift(u);u=u.parentNode}n=p.length;m=q.length;for(u=0;u<n&&u<m;u++)if(p[u]!==q[u])return I(p[u],q[u]);return u===n?I(g,q[u],-1):I(p[u],i,1)};I=function(g,i,n){if(g===i)return n;for(g=g.nextSibling;g;){if(g===i)return-1;g=g.nextSibling}return 1}}k.getText=function(g){for(var i="",n,m=0;g[m];m++){n=g[m];if(n.nodeType===3||n.nodeType===4)i+=n.nodeValue;else if(n.nodeType!==8)i+=k.getText(n.childNodes)}return i};(function(){var g=t.createElement("div"),
i="script"+(new Date).getTime(),n=t.documentElement;g.innerHTML="<a name='"+i+"'/>";n.insertBefore(g,n.firstChild);if(t.getElementById(i)){o.find.ID=function(m,p,q){if(typeof p.getElementById!=="undefined"&&!q)return(p=p.getElementById(m[1]))?p.id===m[1]||typeof p.getAttributeNode!=="undefined"&&p.getAttributeNode("id").nodeValue===m[1]?[p]:B:[]};o.filter.ID=function(m,p){var q=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&q&&q.nodeValue===p}}n.removeChild(g);
n=g=null})();(function(){var g=t.createElement("div");g.appendChild(t.createComment(""));if(g.getElementsByTagName("*").length>0)o.find.TAG=function(i,n){var m=n.getElementsByTagName(i[1]);if(i[1]==="*"){for(var p=[],q=0;m[q];q++)m[q].nodeType===1&&p.push(m[q]);m=p}return m};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")o.attrHandle.href=function(i){return i.getAttribute("href",2)};g=null})();t.querySelectorAll&&
function(){var g=k,i=t.createElement("div");i.innerHTML="<p class='TEST'></p>";if(!(i.querySelectorAll&&i.querySelectorAll(".TEST").length===0)){k=function(m,p,q,u){p=p||t;m=m.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!u&&!k.isXML(p))if(p.nodeType===9)try{return C(p.querySelectorAll(m),q)}catch(y){}else if(p.nodeType===1&&p.nodeName.toLowerCase()!=="object"){var F=p.getAttribute("id"),M=F||"__sizzle__";F||p.setAttribute("id",M);try{return C(p.querySelectorAll("#"+M+" "+m),q)}catch(N){}finally{F||
p.removeAttribute("id")}}return g(m,p,q,u)};for(var n in g)k[n]=g[n];i=null}}();(function(){var g=t.documentElement,i=g.matchesSelector||g.mozMatchesSelector||g.webkitMatchesSelector||g.msMatchesSelector,n=false;try{i.call(t.documentElement,"[test!='']:sizzle")}catch(m){n=true}if(i)k.matchesSelector=function(p,q){q=q.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(p))try{if(n||!o.match.PSEUDO.test(q)&&!/!=/.test(q))return i.call(p,q)}catch(u){}return k(q,null,null,[p]).length>0}})();(function(){var g=
t.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){o.order.splice(1,0,"CLASS");o.find.CLASS=function(i,n,m){if(typeof n.getElementsByClassName!=="undefined"&&!m)return n.getElementsByClassName(i[1])};g=null}}})();k.contains=t.documentElement.contains?function(g,i){return g!==i&&(g.contains?g.contains(i):true)}:t.documentElement.compareDocumentPosition?
function(g,i){return!!(g.compareDocumentPosition(i)&16)}:function(){return false};k.isXML=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false};var L=function(g,i){for(var n,m=[],p="",q=i.nodeType?[i]:i;n=o.match.PSEUDO.exec(g);){p+=n[0];g=g.replace(o.match.PSEUDO,"")}g=o.relative[g]?g+"*":g;n=0;for(var u=q.length;n<u;n++)k(g,q[n],m);return k.filter(p,m)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=k.getText;c.isXMLDoc=k.isXML;
c.contains=k.contains})();var Za=/Until$/,$a=/^(?:parents|prevUntil|prevAll)/,ab=/,/,Na=/^.[^:#\[\.,]*$/,bb=Array.prototype.slice,cb=c.expr.match.POS;c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,e=0,f=this.length;e<f;e++){d=b.length;c.find(a,this[e],b);if(e>0)for(var h=d;h<b.length;h++)for(var l=0;l<d;l++)if(b[l]===b[h]){b.splice(h--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,e=b.length;d<e;d++)if(c.contains(this,b[d]))return true})},
not:function(a){return this.pushStack(ma(this,a,false),"not",a)},filter:function(a){return this.pushStack(ma(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){var d=[],e,f,h=this[0];if(c.isArray(a)){var l,k={},o=1;if(h&&a.length){e=0;for(f=a.length;e<f;e++){l=a[e];k[l]||(k[l]=c.expr.match.POS.test(l)?c(l,b||this.context):l)}for(;h&&h.ownerDocument&&h!==b;){for(l in k){e=k[l];if(e.jquery?e.index(h)>-1:c(h).is(e))d.push({selector:l,elem:h,level:o})}h=
h.parentNode;o++}}return d}l=cb.test(a)?c(a,b||this.context):null;e=0;for(f=this.length;e<f;e++)for(h=this[e];h;)if(l?l.index(h)>-1:c.find.matchesSelector(h,a)){d.push(h);break}else{h=h.parentNode;if(!h||!h.ownerDocument||h===b)break}d=d.length>1?c.unique(d):d;return this.pushStack(d,"closest",a)},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var d=typeof a==="string"?c(a,b||this.context):
c.makeArray(a),e=c.merge(this.get(),d);return this.pushStack(!d[0]||!d[0].parentNode||d[0].parentNode.nodeType===11||!e[0]||!e[0].parentNode||e[0].parentNode.nodeType===11?e:c.unique(e))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,
2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,
b){c.fn[a]=function(d,e){var f=c.map(this,b,d);Za.test(a)||(e=d);if(e&&typeof e==="string")f=c.filter(e,f);f=this.length>1?c.unique(f):f;if((this.length>1||ab.test(e))&&$a.test(a))f=f.reverse();return this.pushStack(f,a,bb.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return b.length===1?c.find.matchesSelector(b[0],a)?[b[0]]:[]:c.find.matches(a,b)},dir:function(a,b,d){var e=[];for(a=a[b];a&&a.nodeType!==9&&(d===B||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&
e.push(a);a=a[b]}return e},nth:function(a,b,d){b=b||1;for(var e=0;a;a=a[d])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var za=/ jQuery\d+="(?:\d+|null)"/g,$=/^\s+/,Aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Ba=/<([\w:]+)/,db=/<tbody/i,eb=/<|&#?\w+;/,Ca=/<(?:script|object|embed|option|style)/i,Da=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/\=([^="'>\s]+\/)>/g,P={option:[1,
"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};P.optgroup=P.option;P.tbody=P.tfoot=P.colgroup=P.caption=P.thead;P.th=P.td;if(!c.support.htmlSerialize)P._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==B)return this.empty().append((this[0]&&this[0].ownerDocument||t).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,e;(e=this[d])!=null;d++)if(!a||c.filter(a,[e]).length){if(!b&&e.nodeType===1){c.cleanData(e.getElementsByTagName("*"));c.cleanData([e])}e.parentNode&&e.parentNode.removeChild(e)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,e=this.ownerDocument;if(!d){d=e.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(za,"").replace(fb,'="$1">').replace($,"")],e)[0]}else return this.cloneNode(true)});if(a===true){na(this,b);na(this.find("*"),b.find("*"))}return b},html:function(a){if(a===B)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(za,""):null;
else if(typeof a==="string"&&!Ca.test(a)&&(c.support.leadingWhitespace||!$.test(a))&&!P[(Ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Aa,"<$1></$2>");try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(e){this.empty().append(a)}}else c.isFunction(a)?this.each(function(f){var h=c(this);h.html(a.call(this,f,h.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=
c(this),e=d.html();d.replaceWith(a.call(this,b,e))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){var e,f,h,l=a[0],k=[];if(!c.support.checkClone&&arguments.length===3&&typeof l==="string"&&Da.test(l))return this.each(function(){c(this).domManip(a,
b,d,true)});if(c.isFunction(l))return this.each(function(x){var r=c(this);a[0]=l.call(this,x,b?r.html():B);r.domManip(a,b,d)});if(this[0]){e=l&&l.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:c.buildFragment(a,this,k);h=e.fragment;if(f=h.childNodes.length===1?h=h.firstChild:h.firstChild){b=b&&c.nodeName(f,"tr");f=0;for(var o=this.length;f<o;f++)d.call(b?c.nodeName(this[f],"table")?this[f].getElementsByTagName("tbody")[0]||this[f].appendChild(this[f].ownerDocument.createElement("tbody")):
this[f]:this[f],f>0||e.cacheable||this.length>1?h.cloneNode(true):h)}k.length&&c.each(k,Oa)}return this}});c.buildFragment=function(a,b,d){var e,f,h;b=b&&b[0]?b[0].ownerDocument||b[0]:t;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===t&&!Ca.test(a[0])&&(c.support.checkClone||!Da.test(a[0]))){f=true;if(h=c.fragments[a[0]])if(h!==1)e=h}if(!e){e=b.createDocumentFragment();c.clean(a,b,e,d)}if(f)c.fragments[a[0]]=h?e:1;return{fragment:e,cacheable:f}};c.fragments={};c.each({appendTo:"append",
prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var e=[];d=c(d);var f=this.length===1&&this[0].parentNode;if(f&&f.nodeType===11&&f.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{f=0;for(var h=d.length;f<h;f++){var l=(f>0?this.clone(true):this).get();c(d[f])[b](l);e=e.concat(l)}return this.pushStack(e,a,d.selector)}}});c.extend({clean:function(a,b,d,e){b=b||t;if(typeof b.createElement==="undefined")b=b.ownerDocument||
b[0]&&b[0].ownerDocument||t;for(var f=[],h=0,l;(l=a[h])!=null;h++){if(typeof l==="number")l+="";if(l){if(typeof l==="string"&&!eb.test(l))l=b.createTextNode(l);else if(typeof l==="string"){l=l.replace(Aa,"<$1></$2>");var k=(Ba.exec(l)||["",""])[1].toLowerCase(),o=P[k]||P._default,x=o[0],r=b.createElement("div");for(r.innerHTML=o[1]+l+o[2];x--;)r=r.lastChild;if(!c.support.tbody){x=db.test(l);k=k==="table"&&!x?r.firstChild&&r.firstChild.childNodes:o[1]==="<table>"&&!x?r.childNodes:[];for(o=k.length-
1;o>=0;--o)c.nodeName(k[o],"tbody")&&!k[o].childNodes.length&&k[o].parentNode.removeChild(k[o])}!c.support.leadingWhitespace&&$.test(l)&&r.insertBefore(b.createTextNode($.exec(l)[0]),r.firstChild);l=r.childNodes}if(l.nodeType)f.push(l);else f=c.merge(f,l)}}if(d)for(h=0;f[h];h++)if(e&&c.nodeName(f[h],"script")&&(!f[h].type||f[h].type.toLowerCase()==="text/javascript"))e.push(f[h].parentNode?f[h].parentNode.removeChild(f[h]):f[h]);else{f[h].nodeType===1&&f.splice.apply(f,[h+1,0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
d.appendChild(f[h])}return f},cleanData:function(a){for(var b,d,e=c.cache,f=c.event.special,h=c.support.deleteExpando,l=0,k;(k=a[l])!=null;l++)if(!(k.nodeName&&c.noData[k.nodeName.toLowerCase()]))if(d=k[c.expando]){if((b=e[d])&&b.events)for(var o in b.events)f[o]?c.event.remove(k,o):c.removeEvent(k,o,b.handle);if(h)delete k[c.expando];else k.removeAttribute&&k.removeAttribute(c.expando);delete e[d]}}});var Ea=/alpha\([^)]*\)/i,gb=/opacity=([^)]*)/,hb=/-([a-z])/ig,ib=/([A-Z])/g,Fa=/^-?\d+(?:px)?$/i,
jb=/^-?\d/,kb={position:"absolute",visibility:"hidden",display:"block"},Pa=["Left","Right"],Qa=["Top","Bottom"],W,Ga,aa,lb=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){if(arguments.length===2&&b===B)return this;return c.access(this,a,b,true,function(d,e,f){return f!==B?c.style(d,e,f):c.css(d,e)})};c.extend({cssHooks:{opacity:{get:function(a,b){if(b){var d=W(a,"opacity","opacity");return d===""?"1":d}else return a.style.opacity}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,
zoom:true,lineHeight:true},cssProps:{"float":c.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,d,e){if(!(!a||a.nodeType===3||a.nodeType===8||!a.style)){var f,h=c.camelCase(b),l=a.style,k=c.cssHooks[h];b=c.cssProps[h]||h;if(d!==B){if(!(typeof d==="number"&&isNaN(d)||d==null)){if(typeof d==="number"&&!c.cssNumber[h])d+="px";if(!k||!("set"in k)||(d=k.set(a,d))!==B)try{l[b]=d}catch(o){}}}else{if(k&&"get"in k&&(f=k.get(a,false,e))!==B)return f;return l[b]}}},css:function(a,b,d){var e,f=c.camelCase(b),
h=c.cssHooks[f];b=c.cssProps[f]||f;if(h&&"get"in h&&(e=h.get(a,true,d))!==B)return e;else if(W)return W(a,b,f)},swap:function(a,b,d){var e={},f;for(f in b){e[f]=a.style[f];a.style[f]=b[f]}d.call(a);for(f in b)a.style[f]=e[f]},camelCase:function(a){return a.replace(hb,lb)}});c.curCSS=c.css;c.each(["height","width"],function(a,b){c.cssHooks[b]={get:function(d,e,f){var h;if(e){if(d.offsetWidth!==0)h=oa(d,b,f);else c.swap(d,kb,function(){h=oa(d,b,f)});if(h<=0){h=W(d,b,b);if(h==="0px"&&aa)h=aa(d,b,b);
if(h!=null)return h===""||h==="auto"?"0px":h}if(h<0||h==null){h=d.style[b];return h===""||h==="auto"?"0px":h}return typeof h==="string"?h:h+"px"}},set:function(d,e){if(Fa.test(e)){e=parseFloat(e);if(e>=0)return e+"px"}else return e}}});if(!c.support.opacity)c.cssHooks.opacity={get:function(a,b){return gb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var d=a.style;d.zoom=1;var e=c.isNaN(b)?"":"alpha(opacity="+b*100+")",f=
d.filter||"";d.filter=Ea.test(f)?f.replace(Ea,e):d.filter+" "+e}};if(t.defaultView&&t.defaultView.getComputedStyle)Ga=function(a,b,d){var e;d=d.replace(ib,"-$1").toLowerCase();if(!(b=a.ownerDocument.defaultView))return B;if(b=b.getComputedStyle(a,null)){e=b.getPropertyValue(d);if(e===""&&!c.contains(a.ownerDocument.documentElement,a))e=c.style(a,d)}return e};if(t.documentElement.currentStyle)aa=function(a,b){var d,e,f=a.currentStyle&&a.currentStyle[b],h=a.style;if(!Fa.test(f)&&jb.test(f)){d=h.left;
e=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;h.left=b==="fontSize"?"1em":f||0;f=h.pixelLeft+"px";h.left=d;a.runtimeStyle.left=e}return f===""?"auto":f};W=Ga||aa;if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetHeight;return a.offsetWidth===0&&b===0||!c.support.reliableHiddenOffsets&&(a.style.display||c.css(a,"display"))==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var mb=c.now(),nb=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
ob=/^(?:select|textarea)/i,pb=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,qb=/^(?:GET|HEAD)$/,Ra=/\[\]$/,T=/\=\?(&|$)/,ja=/\?/,rb=/([?&])_=[^&]*/,sb=/^(\w+:)?\/\/([^\/?#]+)/,tb=/%20/g,ub=/#.*$/,Ha=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!=="string"&&Ha)return Ha.apply(this,arguments);else if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}e="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b===
"object"){b=c.param(b,c.ajaxSettings.traditional);e="POST"}var h=this;c.ajax({url:a,type:e,dataType:"html",data:b,complete:function(l,k){if(k==="success"||k==="notmodified")h.html(f?c("<div>").append(l.responseText.replace(nb,"")).find(f):l.responseText);d&&h.each(d,[l.responseText,k,l])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&
!this.disabled&&(this.checked||ob.test(this.nodeName)||pb.test(this.type))}).map(function(a,b){var d=c(this).val();return d==null?null:c.isArray(d)?c.map(d,function(e){return{name:b.name,value:e}}):{name:b.name,value:d}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:e})},
getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:e})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new E.XMLHttpRequest},accepts:{xml:"application/xml, text/xml",html:"text/html",
script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(a){var b=c.extend(true,{},c.ajaxSettings,a),d,e,f,h=b.type.toUpperCase(),l=qb.test(h);b.url=b.url.replace(ub,"");b.context=a&&a.context!=null?a.context:b;if(b.data&&b.processData&&typeof b.data!=="string")b.data=c.param(b.data,b.traditional);if(b.dataType==="jsonp"){if(h==="GET")T.test(b.url)||(b.url+=(ja.test(b.url)?"&":"?")+(b.jsonp||"callback")+"=?");else if(!b.data||
!T.test(b.data))b.data=(b.data?b.data+"&":"")+(b.jsonp||"callback")+"=?";b.dataType="json"}if(b.dataType==="json"&&(b.data&&T.test(b.data)||T.test(b.url))){d=b.jsonpCallback||"jsonp"+mb++;if(b.data)b.data=(b.data+"").replace(T,"="+d+"$1");b.url=b.url.replace(T,"="+d+"$1");b.dataType="script";var k=E[d];E[d]=function(m){if(c.isFunction(k))k(m);else{E[d]=B;try{delete E[d]}catch(p){}}f=m;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);r&&r.removeChild(A)}}if(b.dataType==="script"&&b.cache===null)b.cache=
false;if(b.cache===false&&l){var o=c.now(),x=b.url.replace(rb,"$1_="+o);b.url=x+(x===b.url?(ja.test(b.url)?"&":"?")+"_="+o:"")}if(b.data&&l)b.url+=(ja.test(b.url)?"&":"?")+b.data;b.global&&c.active++===0&&c.event.trigger("ajaxStart");o=(o=sb.exec(b.url))&&(o[1]&&o[1].toLowerCase()!==location.protocol||o[2].toLowerCase()!==location.host);if(b.dataType==="script"&&h==="GET"&&o){var r=t.getElementsByTagName("head")[0]||t.documentElement,A=t.createElement("script");if(b.scriptCharset)A.charset=b.scriptCharset;
A.src=b.url;if(!d){var C=false;A.onload=A.onreadystatechange=function(){if(!C&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){C=true;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);A.onload=A.onreadystatechange=null;r&&A.parentNode&&r.removeChild(A)}}}r.insertBefore(A,r.firstChild);return B}var J=false,w=b.xhr();if(w){b.username?w.open(h,b.url,b.async,b.username,b.password):w.open(h,b.url,b.async);try{if(b.data!=null&&!l||a&&a.contentType)w.setRequestHeader("Content-Type",
b.contentType);if(b.ifModified){c.lastModified[b.url]&&w.setRequestHeader("If-Modified-Since",c.lastModified[b.url]);c.etag[b.url]&&w.setRequestHeader("If-None-Match",c.etag[b.url])}o||w.setRequestHeader("X-Requested-With","XMLHttpRequest");w.setRequestHeader("Accept",b.dataType&&b.accepts[b.dataType]?b.accepts[b.dataType]+", */*; q=0.01":b.accepts._default)}catch(I){}if(b.beforeSend&&b.beforeSend.call(b.context,w,b)===false){b.global&&c.active--===1&&c.event.trigger("ajaxStop");w.abort();return false}b.global&&
c.triggerGlobal(b,"ajaxSend",[w,b]);var L=w.onreadystatechange=function(m){if(!w||w.readyState===0||m==="abort"){J||c.handleComplete(b,w,e,f);J=true;if(w)w.onreadystatechange=c.noop}else if(!J&&w&&(w.readyState===4||m==="timeout")){J=true;w.onreadystatechange=c.noop;e=m==="timeout"?"timeout":!c.httpSuccess(w)?"error":b.ifModified&&c.httpNotModified(w,b.url)?"notmodified":"success";var p;if(e==="success")try{f=c.httpData(w,b.dataType,b)}catch(q){e="parsererror";p=q}if(e==="success"||e==="notmodified")d||
c.handleSuccess(b,w,e,f);else c.handleError(b,w,e,p);d||c.handleComplete(b,w,e,f);m==="timeout"&&w.abort();if(b.async)w=null}};try{var g=w.abort;w.abort=function(){w&&Function.prototype.call.call(g,w);L("abort")}}catch(i){}b.async&&b.timeout>0&&setTimeout(function(){w&&!J&&L("timeout")},b.timeout);try{w.send(l||b.data==null?null:b.data)}catch(n){c.handleError(b,w,null,n);c.handleComplete(b,w,e,f)}b.async||L();return w}},param:function(a,b){var d=[],e=function(h,l){l=c.isFunction(l)?l():l;d[d.length]=
encodeURIComponent(h)+"="+encodeURIComponent(l)};if(b===B)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){e(this.name,this.value)});else for(var f in a)da(f,a[f],b,e);return d.join("&").replace(tb,"+")}});c.extend({active:0,lastModified:{},etag:{},handleError:function(a,b,d,e){a.error&&a.error.call(a.context,b,d,e);a.global&&c.triggerGlobal(a,"ajaxError",[b,a,e])},handleSuccess:function(a,b,d,e){a.success&&a.success.call(a.context,e,d,b);a.global&&c.triggerGlobal(a,"ajaxSuccess",
[b,a])},handleComplete:function(a,b,d){a.complete&&a.complete.call(a.context,b,d);a.global&&c.triggerGlobal(a,"ajaxComplete",[b,a]);a.global&&c.active--===1&&c.event.trigger("ajaxStop")},triggerGlobal:function(a,b,d){(a.context&&a.context.url==null?c(a.context):c.event).trigger(b,d)},httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),
e=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(e)c.etag[b]=e;return a.status===304},httpData:function(a,b,d){var e=a.getResponseHeader("content-type")||"",f=b==="xml"||!b&&e.indexOf("xml")>=0;a=f?a.responseXML:a.responseText;f&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&e.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&e.indexOf("javascript")>=0)c.globalEval(a);return a}});
if(E.ActiveXObject)c.ajaxSettings.xhr=function(){if(E.location.protocol!=="file:")try{return new E.XMLHttpRequest}catch(a){}try{return new E.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}};c.support.ajax=!!c.ajaxSettings.xhr();var ea={},vb=/^(?:toggle|show|hide)$/,wb=/^([+\-]=)?([\d+.\-]+)(.*)$/,ba,pa=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b,d){if(a||a===0)return this.animate(S("show",
3),a,b,d);else{d=0;for(var e=this.length;d<e;d++){a=this[d];b=a.style.display;if(!c.data(a,"olddisplay")&&b==="none")b=a.style.display="";b===""&&c.css(a,"display")==="none"&&c.data(a,"olddisplay",qa(a.nodeName))}for(d=0;d<e;d++){a=this[d];b=a.style.display;if(b===""||b==="none")a.style.display=c.data(a,"olddisplay")||""}return this}},hide:function(a,b,d){if(a||a===0)return this.animate(S("hide",3),a,b,d);else{a=0;for(b=this.length;a<b;a++){d=c.css(this[a],"display");d!=="none"&&c.data(this[a],"olddisplay",
d)}for(a=0;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b,d){var e=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||e?this.each(function(){var f=e?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(S("toggle",3),a,b,d);return this},fadeTo:function(a,b,d,e){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d,e)},animate:function(a,b,d,e){var f=c.speed(b,
d,e);if(c.isEmptyObject(a))return this.each(f.complete);return this[f.queue===false?"each":"queue"](function(){var h=c.extend({},f),l,k=this.nodeType===1,o=k&&c(this).is(":hidden"),x=this;for(l in a){var r=c.camelCase(l);if(l!==r){a[r]=a[l];delete a[l];l=r}if(a[l]==="hide"&&o||a[l]==="show"&&!o)return h.complete.call(this);if(k&&(l==="height"||l==="width")){h.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(c.css(this,"display")==="inline"&&c.css(this,"float")==="none")if(c.support.inlineBlockNeedsLayout)if(qa(this.nodeName)===
"inline")this.style.display="inline-block";else{this.style.display="inline";this.style.zoom=1}else this.style.display="inline-block"}if(c.isArray(a[l])){(h.specialEasing=h.specialEasing||{})[l]=a[l][1];a[l]=a[l][0]}}if(h.overflow!=null)this.style.overflow="hidden";h.curAnim=c.extend({},a);c.each(a,function(A,C){var J=new c.fx(x,h,A);if(vb.test(C))J[C==="toggle"?o?"show":"hide":C](a);else{var w=wb.exec(C),I=J.cur()||0;if(w){var L=parseFloat(w[2]),g=w[3]||"px";if(g!=="px"){c.style(x,A,(L||1)+g);I=(L||
1)/J.cur()*I;c.style(x,A,I+g)}if(w[1])L=(w[1]==="-="?-1:1)*L+I;J.custom(I,L,g)}else J.custom(I,C,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var e=d.length-1;e>=0;e--)if(d[e].elem===this){b&&d[e](true);d.splice(e,1)}});b||this.dequeue();return this}});c.each({slideDown:S("show",1),slideUp:S("hide",1),slideToggle:S("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){c.fn[a]=function(d,e,f){return this.animate(b,
d,e,f)}});c.extend({speed:function(a,b,d){var e=a&&typeof a==="object"?c.extend({},a):{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};e.duration=c.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in c.fx.speeds?c.fx.speeds[e.duration]:c.fx.speeds._default;e.old=e.complete;e.complete=function(){e.queue!==false&&c(this).dequeue();c.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,d,e){return d+e*a},swing:function(a,b,d,e){return(-Math.cos(a*
Math.PI)/2+0.5)*e+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a=parseFloat(c.css(this.elem,this.prop));return a&&a>-1E4?a:0},custom:function(a,b,d){function e(l){return f.step(l)}
var f=this,h=c.fx;this.startTime=c.now();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;e.elem=this.elem;if(e()&&c.timers.push(e)&&!ba)ba=setInterval(h.tick,h.interval)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;
this.custom(this.cur(),0)},step:function(a){var b=c.now(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var e in this.options.curAnim)if(this.options.curAnim[e]!==true)d=false;if(d){if(this.options.overflow!=null&&!c.support.shrinkWrapBlocks){var f=this.elem,h=this.options;c.each(["","X","Y"],function(k,o){f.style["overflow"+o]=h.overflow[k]})}this.options.hide&&c(this.elem).hide();if(this.options.hide||
this.options.show)for(var l in this.options.curAnim)c.style(this.elem,l,this.options.orig[l]);this.options.complete.call(this.elem)}return false}else{a=b-this.startTime;this.state=a/this.options.duration;b=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||b](this.state,a,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=
c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},interval:13,stop:function(){clearInterval(ba);ba=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===
b.elem}).length};var xb=/^t(?:able|d|h)$/i,Ia=/^(?:body|html)$/i;c.fn.offset="getBoundingClientRect"in t.documentElement?function(a){var b=this[0],d;if(a)return this.each(function(l){c.offset.setOffset(this,a,l)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);try{d=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,h=f.documentElement;if(!d||!c.contains(h,b))return d||{top:0,left:0};b=f.body;f=fa(f);return{top:d.top+(f.pageYOffset||c.support.boxModel&&
h.scrollTop||b.scrollTop)-(h.clientTop||b.clientTop||0),left:d.left+(f.pageXOffset||c.support.boxModel&&h.scrollLeft||b.scrollLeft)-(h.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(x){c.offset.setOffset(this,a,x)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d,e=b.offsetParent,f=b.ownerDocument,h=f.documentElement,l=f.body;d=(f=f.defaultView)?f.getComputedStyle(b,null):b.currentStyle;
for(var k=b.offsetTop,o=b.offsetLeft;(b=b.parentNode)&&b!==l&&b!==h;){if(c.offset.supportsFixedPosition&&d.position==="fixed")break;d=f?f.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;o-=b.scrollLeft;if(b===e){k+=b.offsetTop;o+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&xb.test(b.nodeName))){k+=parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}e=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"){k+=
parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}d=d}if(d.position==="relative"||d.position==="static"){k+=l.offsetTop;o+=l.offsetLeft}if(c.offset.supportsFixedPosition&&d.position==="fixed"){k+=Math.max(h.scrollTop,l.scrollTop);o+=Math.max(h.scrollLeft,l.scrollLeft)}return{top:k,left:o}};c.offset={initialize:function(){var a=t.body,b=t.createElement("div"),d,e,f,h=parseFloat(c.css(a,"marginTop"))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",
height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;e=d.firstChild;f=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=e.offsetTop!==5;this.doesAddBorderForTableAndCells=
f.offsetTop===5;e.style.position="fixed";e.style.top="20px";this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15;e.style.position=e.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==h;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.css(a,
"marginTop"))||0;d+=parseFloat(c.css(a,"marginLeft"))||0}return{top:b,left:d}},setOffset:function(a,b,d){var e=c.css(a,"position");if(e==="static")a.style.position="relative";var f=c(a),h=f.offset(),l=c.css(a,"top"),k=c.css(a,"left"),o=e==="absolute"&&c.inArray("auto",[l,k])>-1;e={};var x={};if(o)x=f.position();l=o?x.top:parseInt(l,10)||0;k=o?x.left:parseInt(k,10)||0;if(c.isFunction(b))b=b.call(a,d,h);if(b.top!=null)e.top=b.top-h.top+l;if(b.left!=null)e.left=b.left-h.left+k;"using"in b?b.using.call(a,
e):f.css(e)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),e=Ia.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.css(a,"marginTop"))||0;d.left-=parseFloat(c.css(a,"marginLeft"))||0;e.top+=parseFloat(c.css(b[0],"borderTopWidth"))||0;e.left+=parseFloat(c.css(b[0],"borderLeftWidth"))||0;return{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||t.body;a&&!Ia.test(a.nodeName)&&
c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(e){var f=this[0],h;if(!f)return null;if(e!==B)return this.each(function(){if(h=fa(this))h.scrollTo(!a?e:c(h).scrollLeft(),a?e:c(h).scrollTop());else this[d]=e});else return(h=fa(f))?"pageXOffset"in h?h[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&h.document.documentElement[d]||h.document.body[d]:f[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();
c.fn["inner"+b]=function(){return this[0]?parseFloat(c.css(this[0],d,"padding")):null};c.fn["outer"+b]=function(e){return this[0]?parseFloat(c.css(this[0],d,e?"margin":"border")):null};c.fn[d]=function(e){var f=this[0];if(!f)return e==null?null:this;if(c.isFunction(e))return this.each(function(l){var k=c(this);k[d](e.call(this,l,k[d]()))});if(c.isWindow(f))return f.document.compatMode==="CSS1Compat"&&f.document.documentElement["client"+b]||f.document.body["client"+b];else if(f.nodeType===9)return Math.max(f.documentElement["client"+
b],f.body["scroll"+b],f.documentElement["scroll"+b],f.body["offset"+b],f.documentElement["offset"+b]);else if(e===B){f=c.css(f,d);var h=parseFloat(f);return c.isNaN(h)?f:h}else return this.css(d,typeof e==="string"?e:e+"px")}})})(window);
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

(function (jQuery) {
    jQuery.hotkeys = {
      version: "0.8",
  
      specialKeys: {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        191: "/",
        224: "meta",
      },
  
      shiftNums: {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": '"',
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|",
      },
    };
  
    function keyHandler(handleObj) {
      // Only care when a possible input has been specified
      if (typeof handleObj.data !== "string") {
        return;
      }
  
      var origHandler = handleObj.handler,
        keys = handleObj.data.toLowerCase().split(" ");
  
      handleObj.handler = function (event) {
        // Don't fire in text-accepting inputs that we didn't directly bind to
        if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || event.target.type === "text")) {
          return;
        }
  
        // Keypress represents characters, not special keys
        var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
          character = String.fromCharCode(event.which).toLowerCase(),
          key,
          modif = "",
          possible = {};
  
        // check combinations (alt|ctrl|shift+anything)
        if (event.altKey && special !== "alt") {
          modif += "alt+";
        }
  
        if (event.ctrlKey && special !== "ctrl") {
          modif += "ctrl+";
        }
  
        if (event.metaKey && !event.ctrlKey && special !== "meta") {
          modif += "meta+";
        }
  
        if (event.shiftKey && special !== "shift") {
          modif += "shift+";
        }
  
        if (special) {
          possible[modif + special] = true;
        } else {
          possible[modif + character] = true;
          possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
  
          // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
          if (modif === "shift+") {
            possible[jQuery.hotkeys.shiftNums[character]] = true;
          }
        }
  
        for (var i = 0, l = keys.length; i < l; i++) {
          if (possible[keys[i]]) {
            return origHandler.apply(this, arguments);
          }
        }
      };
    }
  
    jQuery.each(["keydown", "keyup", "keypress"], function () {
      jQuery.event.special[this] = { add: keyHandler };
    });
  })(jQuery);
  
$(function() {
    window.keydown = {};
    
    function keyName(event) {
        event.preventDefault();
      return jQuery.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
    }
    
    $(document).bind("keydown", function(event) {
        event.preventDefault();
      keydown[keyName(event)] = true;
    });
    
    $(document).bind("keyup", function(event) {
        event.preventDefault();
      keydown[keyName(event)] = false;
    });
  });
// Determine if browser is mobile
var mobile = false;
(function (a) {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    mobile = true;
})(navigator.userAgent || navigator.vendor || window.opera);
////////////////////////////////

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 40;
const BAR_HEIGHT = 50;
const BAR_TEXT_FIX = 10;
const TILE_SIZE = 40;
const TILES_X = 20;
const TILES_Y = 15;
const PLAYER_SIZE = 28;
const ENEMY_SIZE = 16.5;
const ENEMY_SIZE_HIT = 12.5;
const COIN_SIZE = 11.5;
const OUTLINE_SIZE = 4;
const PLAYER_SPEED = 3;
const INTERMISSION_TEXT_SPACE = 5;
const INTERMISSION_Y_FIX = 10;
const INTERMISSION_TIMER_TOT = FPS * 2;
const DIE_FADE_SPEED = 0.03;
const RESPAWN_FADE_SPEED = 0.06;
const CHECK_FLASH_FADE_SPEED = 0.03;
const FINISH_LEVEL_TIMER_TOT = FPS * 2;
const COIN_FADE_SPEED = 0.1;
const COIN_SHINE_FREQ = FPS * 4;
const COIN_SHINE_FADE_IN_SPEED = 0.1;
const COIN_SHINE_FADE_OUT_SPEED = 0.05;
const CARVE = Math.floor(PLAYER_SIZE / 2);
const SHADOW_OPACITY = 0.5;
const WIN_LEVEL_FADE_SPEED = 0.02;
const INGAME_MENU_BG_ALPHA = 0.75;
const INSTRUCTIONS_TEXT_SIZE = 24;
const INSTRUCTIONS_Y_0 = BAR_HEIGHT + 40;
const INSTRUCTIONS_Y_1 = INSTRUCTIONS_Y_0 + 33;
const INSTRUCTIONS_TIMER_TOT = FPS * 10;
const INSTRUCTIONS_FADE_IN_SPEED = 0.05;
const INSTRUCTIONS_FADE_OUT_SPEED = 0.02;
const INSTRUCTIONS_WAIT_TIME_TOT = FPS * 3;
const IG_BUTTONS_TOP = 130;
const IG_BTN_TEXT_SIZE = 25;
const IG_BTN_SPACE = 50;
const LS_PAGE_TOT = 18;
const LS_ALL_TOT = 30;
const RAINBOW_SPEED = 0.02;
const WALLS_PURPLE = 20;
const WALLS_RED = 30;
const TOTAL_LEVELS = 30;
const MENU_IMG_WIDTH = 800;
const MENU_IMG_HEIGHT = 500;

const LINK_STEPHEN = "https://www.youtube.com/user/CoozyMcMillan";
const LINK_COOLMATH = "http://www.coolmath-games.com/";
const LINK_SNAYK = "https://snayk.bandcamp.com/";

var hideKeys = false;

var img_mainMenu;
var img_mainMenu_playGame;
var img_mainMenu_loadGame;
var img_mainMenu_levelSelect;
//var img_mainMenu_moreGames;
var loadedImages = 0;
var totalImagesSet = 4;
if (mobile) {
  totalImagesSet = 1;
}
const TOTAL_IMAGES = totalImagesSet;

var keyUp = false;
var keyDown = false;
var keyRight = false;
var keyLeft = false;

var music;
var sfx_bounce0;
var sfx_bounce1;
var sfx_checkpoint;
var sfx_click;
var sfx_coin;
var sfx_die;
var sfx_win;
var sfx_intermission;
var soundsToMute = [];
const TOTAL_SOUNDS = 9;
var loadedSounds = 0;
var loadBarAlpha = 1;
var loadBarFade = 0.025;
var loadedAssets = 0;
const TOTAL_ASSETS = TOTAL_IMAGES + TOTAL_SOUNDS;

var FSOn = false;
var canvasWidth = 800;
var canvasHeight = 600;
var level = 1;
var deaths = 0;
var curCheck = 0;
var checkFlashAlpha = 0;
var muteSFX = (muteMusic = false);
var paused = false;
var mouseX = 0,
  mouseY = 0;
var mouseDown = false;
var playerAlpha = 1;
var state = null;
var intermissionTimer = 0;
var finishLevelTimer = 0;
var coinShineTimer = 0;
var instructionsTimer = 0;
var instructionsOn = false;
var instructionsWaiting = false;
var instructionsFadingIn = false;
var instructionsFadingOut = false;
var instructionsAlpha = 0;
var cursorType = 0;
var justClicked = false;
var ls_page = 1;
var instrForLevel = null;
var firstTimeOnMainMenu = true;
var invincible = false;
var invincible_permanent = false;
var hotkeyDown_space = false;
var hotkeyDown_m = false;
var hotkeyDown_p = false;
var bouncingEnabled = false;
var gameTimer = 0;
var oldTime = 0;
var pauseTime = 0;
var justLoaded = false;
var justLoadedTimer = false;
var coinsSave = [-99];

var finish_title_spacing = 40;
var finish_text_startX = 258;
var finish_text_startY = 150;
var finish_text_speed_max = 2;
var finish_text_speed_inc = 0.2;
var finish_text_staggerFrames = 5;
var finishText = "YOU WIN!";
var finishTextSpeed = [];
var finish_data_left = 270;
var finish_data_right = 530;

function LSOnRightPage(page) {
  return ls_page == page;
}

function correctGamePause(val) {
  return paused == val;
}

// convert width, height for scaling
function cw(n) {
  var rat = canvasWidth / CANVAS_WIDTH;
  n *= rat;
  return n;
}

function ch(n) {
  var rat = canvasHeight / CANVAS_HEIGHT;
  n *= rat;
  return n;
}

function cwh(n) {
  if (mobile) {
    var w = cw(n);
    var h = ch(n);
    if (w > h) return h;
    else return w;
  } else {
    return n;
  }
}

function offset(x, y) {
  if (mobile) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.x = x;
    this.y = y;
  } else {
    this.x = 0;
    this.y = 0;
  }
}

var os = new offset();

function calcOffset() {
  if (mobile) {
    var trueRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    var curRatio = canvasWidth / canvasHeight;

    if (curRatio > trueRatio) {
      os.x = (canvasWidth - cwh(CANVAS_WIDTH)) / 2;
      os.y = 0;
    } else if (curRatio < trueRatio) {
      os.x = 0;
      os.y = (canvasHeight - cwh(CANVAS_HEIGHT)) / 2;
    } else {
      os.x = 0;
      os.y = 0;
    }
  } else {
    os.x = 0;
    os.y = 0;
  }
}

const WALL_BORDER_TOP = 1;
const WALL_BORDER_BOTTOM = 2;
const WALL_BORDER_RIGHT = 2;
const WALL_BORDER_LEFT = 1;

const player_size_min = 0.5;
const player_size_max = 2;

const player_size_min_less = 0.75;
const player_size_max_less = 1.5;

const player_size_min_less2 = 0.9;
const player_size_max_less2 = 1.2;

const bounce_0_y_start = -500;
var bounce_0_y_speed = (bounce_0_y_speed_reset = 0);
const bounce_0_y_speed_max = 20;
const bounce_0_y_accel = 0.3;

var bounce_0_width_speed = (bounce_0_width_speed_reset = 0);
const bounce_0_width_speed_max = 0.05;
const bounce_0_width_accel = 0.0003;

var bounce_0_height_speed = (bounce_0_height_speed = 0);
const bounce_0_height_speed_max = 0.05;
const bounce_0_height_accel = 0.0006;

var bounce_1_size_speed = (bounce_1_size_speed_reset = 0.35);
const bounce_1_size_decel = 0.05;
const bounce_1_size_speed_min = 0.025;

var bounce_2_size_speed = (bounce_2_size_speed_reset = bounce_1_size_speed_min);
const bounce_2_size_accel = bounce_1_size_decel;
const bounce_2_size_speed_max = bounce_1_size_speed;

var bounce_3_stage = (bounce_3_stage_reset = 0);
var bounce_3_y_speed = (bounce_3_y_speed_start = bounce_3_y_speed_reset = -5);
const bounce_3_y_accel = 1;
const bounce_3_y_speed_max = -10;

var bounce_3_width_speed = (bounce_3_width_speed_reset = 0);
const bounce_3_width_accel = 0.015;

var bounce_3_height_speed = (bounce_3_height_speed_reset = 0);
const bounce_3_height_accel = 0.015;

var bounce_4_size_speed = (bounce_4_size_speed_reset = 0.2);
const bounce_4_size_decel = 0.025;
const bounce_4_size_speed_min = 0.03;

var bounce_5_size_speed = (bounce_5_size_speed_reset = bounce_4_size_speed_min);
const bounce_5_size_accel = bounce_4_size_decel;
const bounce_5_size_speed_max = bounce_4_size_speed;

var bounce_6_stage = (bounce_6_stage_reset = 0);
var bounce_6_y_speed = (bounce_6_y_speed_start = bounce_6_y_speed_reset = -2);
const bounce_6_y_accel = 0.75;
const bounce_6_y_speed_max = -5;

var bounce_6_width_speed = (bounce_6_width_speed_reset = 0);
const bounce_6_width_accel = 0.01;

var bounce_6_height_speed = (bounce_6_height_speed_reset = 0);
const bounce_6_height_accel = 0.01;

var bounce_7_size_speed = (bounce_7_size_speed_reset = 0.05);
const bounce_7_size_decel = 0.0005;
const bounce_7_size_speed_min = 0.01;

var bounce_8_size_speed = (bounce_8_size_speed_reset = bounce_7_size_speed_min);
const bounce_8_size_accel = bounce_7_size_decel;
const bounce_8_size_speed_max = bounce_7_size_speed;

function doMuteMusic() {
	muteMusic = true;
	music.pause();
	music.currentTime = 0.0;
}

function doUnmuteMusic() {
	muteMusic = false;
	music.play();
}

function doMuteSFX() {
	muteSFX = true;
	for (var i = 0; i < soundsToMute.length; i++) {
		soundsToMute[i].pause();
		soundsToMute[i].currentTime = 0.0;
	}
}

function doUnmuteSFX() {
	muteSFX = false;
}

function playSFX(sound) {
	if (!muteSFX) {
		sound.currentTime = 0.0;
		sound.play();
	}
}
const PLAYER_FILL_COLORS = [
    [255, 0, 0], // red
    [255, 0, 255], // pink
    [132, 0, 255], // purple
    [0, 0, 255], // blue
    [0, 182, 0], // green
    [0, 255, 255], // cyan
    [254, 200, 3], // yellow
    [255, 120, 0], // orange
  ];
  const PLAYER_OUTLINE_COLORS = [
    [127, 0, 0], // red
    [145, 0, 145], // pink
    [47, 1, 88], // purple
    [0, 0, 68], // blue
    [0, 95, 0], // green
    [0, 170, 170], // cyan
    [145, 114, 2], // yellow
    [168, 74, 0], // orange
  ];
  const RAINBOW_START = 4;
  const ENEMY_FILL_COLOR_0 = "#0000ff";
  const ENEMY_OUTLINE_COLOR_0 = "#000044";
  const ENEMY_FILL_COLOR_1 = "rgba(132, 0, 255, 1)";
  const ENEMY_OUTLINE_COLOR_1 = "rgba(47, 1, 88, 1)";
  const ENEMY_FILL_COLOR_2 = "#ff0000";
  const ENEMY_OUTLINE_COLOR_2 = "rgba(127, 0, 0, 1)";
  const TILE_COLOR_0_0 = "#f8f7ff";
  const TILE_COLOR_0_1 = "#e0dafe";
  const TILE_COLOR_1_0 = "rgba(247, 247, 255, 1)";
  const TILE_COLOR_1_1 = "rgba(234, 221, 240, 1)";
  const TILE_COLOR_2_0 = "rgba(255, 244, 244, 1)";
  const TILE_COLOR_2_1 = "rgba(255, 220, 220, 1)";
  const WALLS_COLOR_0 = "#aaa5ff";
  const WALLS_COLOR_1 = "rgba(193, 165, 241, 1)";
  const WALLS_COLOR_2 = "rgba(242, 138, 138, 1)";
  const CHECK_COLOR = "#9ef29b";
  const CHECK_FLASH_COLOR = "rgba(68, 204, 63, ";
  const COIN_FILL_COLOR = "rgba(254, 200, 3, ";
  const COIN_OUTLINE_COLOR = "rgba(145, 114, 2, ";
  const COIN_SHINE_COLOR = "rgba(255, 255, 255, ";
  const INTERMISSION_COLOR_0_0 = "#bebcff";
  const INTERMISSION_COLOR_0_1 = "#ffffff";
  const INTERMISSION_COLOR_1_0 = "rgba(224, 206, 234, 1)";
  const INTERMISSION_COLOR_1_1 = "#ffffff";
  const INTERMISSION_COLOR_2_0 = "rgba(255, 215, 215, 1)";
  const INTERMISSION_COLOR_2_1 = "#ffffff";
  const SHADOW_COLOR = "rgba(100, 100, 100, ";
  const BARS_BUTTON_HOVER_COLOR = "#ff0";
  const LS_BUTTON_HOVER_COLOR = "#00f";
  const LS_BORDER_COLOR = "#555";
  const LS_BORDER_HOVER_COLOR = "#f00";
  const LS_BUTTON_DISABLED_COLOR = "#aaa";
  const INSTRUCTIONS_COLOR = "rgba(80, 80, 80, ";
  const MENU_SHADOW_COLOR = "rgba(100, 100, 100, 0.5)";
  const TIMER_COLOR = "#AAA";
  
if (mobile) {
    var canvasElement = $("<canvas oncontextmenu='return false;' id='twhgCanvas'></canvas>").get(0);
    var canvas = canvasElement.getContext("2d");
} else {
    var canvasElement = $("<canvas id='twhgCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>").get(0);
    var canvas = canvasElement.getContext("2d");
}
function runGameTimer() {
	if ((state == "game" || state == "intermission") && !paused) {
		currentTime = new Date().getTime();
		if (oldTime == 0 || justLoadedTimer) {
			oldTime = currentTime;
			justLoadedTimer = false;
		}
		gameTimer += currentTime - oldTime;
		oldTime = currentTime;
	}
}
function drawBorder() {
    canvas.beginPath();
	canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT));
	canvas.lineWidth = cwh(4);
	canvas.strokeStyle = "black";
	canvas.stroke();
}

var touchOn = false;
var touchStartX = null;
var touchStartY = null;
var touchMoveX = null;
var touchMoveY = null;

var touchAngle = 0;

var testText = "default";

var touchSensitivity = 10;
var diagSensitivity  = 15;
var touchDistance = 0;

var cursorSize = 30;
var cursorLineSize = 10;
var arrowMainSize = 50;
var arrowPointSize = 15;

var cursorColor = "#888";
var arrowColor = "#000";

/*
// old mobile controls
canvasElement.addEventListener("touchstart", function(event) {
	if (state == "game" && !paused) {
		if (event.targetTouches.length == 1) {
			if (event.targetTouches[0].pageY >= cwh(BAR_HEIGHT) + os.y &&
				event.targetTouches[0].pageY <= cwh(CANVAS_HEIGHT - BAR_HEIGHT) + os.y) {
				touchOn = true;
				touchStartX = event.targetTouches[0].pageX;
				touchStartY = event.targetTouches[0].pageY;
				touchMoveX  = event.targetTouches[0].pageX;
				touchMoveY  = event.targetTouches[0].pageY;
			}
		}
	}
}, false);

canvasElement.addEventListener("touchend", function(event) {
	touchOn = false;
	keyUp    = false;
	keyDown  = false;
	keyRight = false;
	keyLeft  = false;
}, false);

canvasElement.addEventListener("touchmove", function(event) {
	if (state == "game" && !paused) {
		if (event.targetTouches.length == 1) {
			touchMoveX = event.targetTouches[0].pageX;
			touchMoveY = event.targetTouches[0].pageY;
		}
	}
}, false);
*/

if (mobile) {
    canvasElement.addEventListener("touchstart", function (event) {
        if (state == "game" && !paused && !hideKeys) {
            for (var i = 0; i < event.targetTouches.length; i++) {
                // down
                if (event.targetTouches[i].pageX > cwh(coords_down[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_down[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_down[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_down[3]) + os.y) {
                    keyDown = true;
                }

                // right
                else if (event.targetTouches[i].pageX > cwh(coords_right[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_right[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_right[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_right[3]) + os.y) {
                    keyRight = true;
                }

                // up
                else if (event.targetTouches[i].pageX > cwh(coords_up[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_up[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_up[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_up[3]) + os.y) {
                    keyUp = true;
                }

                // left
                else if (event.targetTouches[i].pageX > cwh(coords_left[0]) + os.x &&
                    event.targetTouches[i].pageX < cwh(coords_left[1]) + os.x &&
                    event.targetTouches[i].pageY > cwh(coords_left[2]) + os.y &&
                    event.targetTouches[i].pageY < cwh(coords_left[3]) + os.y) {
                    keyLeft = true;
                }
            }
        }
    }, false);


    canvasElement.addEventListener("touchend", function (event) {
        if (state == "game" && !paused && !hideKeys) {
            for (var i = 0; i < event.changedTouches.length; i++) {
                // down
                if (event.changedTouches[i].pageX > cwh(coords_down[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_down[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_down[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_down[3]) + os.y) {
                    keyDown = false;
                }

                // right
                else if (event.changedTouches[i].pageX > cwh(coords_right[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_right[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_right[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_right[3]) + os.y) {
                    keyRight = false;
                }

                // up
                else if (event.changedTouches[i].pageX > cwh(coords_up[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_up[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_up[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_up[3]) + os.y) {
                    keyUp = false;
                }

                // left
                else if (event.changedTouches[i].pageX > cwh(coords_left[0]) + os.x &&
                    event.changedTouches[i].pageX < cwh(coords_left[1]) + os.x &&
                    event.changedTouches[i].pageY > cwh(coords_left[2]) + os.y &&
                    event.changedTouches[i].pageY < cwh(coords_left[3]) + os.y) {
                    keyLeft = false;
                }
            }
        }
    }, false);

    var coords_down  = [580, 680, 440, 540];
    var coords_right = [690, 790, 440, 540];
    var coords_up    = [580, 680, 330, 430];
    var coords_left  = [470, 570, 440, 540];

    //var coords_down  = [690, 790, 440, 540];
    //var coords_right = [580, 680, 440, 540];
    //var coords_up    = [470, 570, 440, 540];
    //var coords_left  = [360, 460, 440, 540];

    function drawMobileControls() {
        if (!hideKeys) {
            var size = 100;
            var keyFill = "rgba(255, 255, 255, 0.5)";
            var keyFillOn = "rgba(255, 255, 0, 0.5)";
            var keyTextFill = "rgba(0, 0, 0, 0.5)";
            var keyTextFillOn = "rgba(255, 0, 0, 0.5)";
            var keyTextSize = 50;

            // down
            canvas.beginPath();
            canvas.rect(
                cwh(580) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyDown) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyDown) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2193", cwh(630) + os.x, cwh(505) + os.y);

            // right
            canvas.beginPath();
            canvas.rect(
                cwh(690) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyRight) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyRight) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2192", cwh(740) + os.x, cwh(505) + os.y);

            // up
            canvas.beginPath();
            canvas.rect(
                cwh(580) + os.x,
                cwh(330) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyUp) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyUp) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2191", cwh(630) + os.x, cwh(395) + os.y);

            // left
            canvas.beginPath();
            canvas.rect(
                cwh(470) + os.x,
                cwh(440) + os.y,
                cwh(size),
                cwh(size)
            );
            if (keyLeft) {
                canvas.fillStyle = keyFillOn;
            } else {
                canvas.fillStyle = keyFill;
            }
            canvas.fill();

            if (keyLeft) {
                canvas.fillStyle = keyTextFillOn;
            } else {
                canvas.fillStyle = keyTextFill;
            }
            canvas.font = "Bold " + cwh(keyTextSize) + "px Arial Black";
            canvas.textAlign = "center";
            canvas.fillText("\u2190", cwh(520) + os.x, cwh(505) + os.y);
        }
    }
}

// old
function mobileControls() {
	if (state == "game" && !paused && !hideKeys) {
		if (touchOn) {
			// cursor
			canvas.beginPath();
			canvas.moveTo(touchStartX - cwh(cursorSize / 2), touchStartY);
			canvas.lineTo(touchStartX + cwh(cursorSize / 2), touchStartY);
		    canvas.lineWidth = cwh(cursorLineSize);
		    canvas.strokeStyle = cursorColor;
		    canvas.stroke();
		    
		    canvas.beginPath();
			canvas.moveTo(touchStartX, touchStartY - cwh(cursorSize / 2));
			canvas.lineTo(touchStartX, touchStartY + cwh(cursorSize / 2));
		    canvas.lineWidth = cwh(cursorLineSize);
		    canvas.strokeStyle = cursorColor;
		    canvas.stroke();
		    
		    touchDistance = Math.sqrt(Math.pow(touchStartX - touchMoveX, 2) + Math.pow(touchStartY - touchMoveY, 2));
		    
		    touchAngle = angle360(touchStartX, touchStartY, touchMoveX, touchMoveY);
		    
		    // arrow - right
		    if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 360 - 45/2 || touchAngle < 45/2)) {
		    //if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //   !(touchMoveY >= touchStartY + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //   !(touchMoveY <= touchStartY - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize - arrowPointSize), touchStartY - cwh(arrowPointSize));
				canvas.lineTo(touchStartX + cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize - arrowPointSize), touchStartY + cwh(arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = false;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - left
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*3 + 45/2 && touchAngle < 45*4 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //        !(touchMoveY >= touchStartY + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveY <= touchStartY - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize - arrowPointSize), touchStartY - cwh(arrowPointSize));
				canvas.lineTo(touchStartX - cwh(arrowMainSize), touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize - arrowPointSize), touchStartY + cwh(arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = false;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    // arrow - up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*5 + 45/2 && touchAngle < 45*6 + 45/2)) {
		    //else if ((touchMoveY <= touchStartY - cwh(touchSensitivity)) &&
		    //        !(touchMoveX >= touchStartX + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveX <= touchStartX - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX, touchStartY - cwh(arrowMainSize));
				canvas.lineTo(touchStartX - cwh(arrowPointSize), touchStartY - cwh(arrowMainSize - arrowPointSize));
				canvas.lineTo(touchStartX, touchStartY - cwh(arrowMainSize));
				canvas.lineTo(touchStartX + cwh(arrowPointSize), touchStartY - cwh(arrowMainSize - arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = false;
				keyLeft  = false;
		    }
		    
		    // arrow - down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*1 + 45/2 && touchAngle < 45*2 + 45/2)) {
		    //else if ((touchMoveY >= touchStartY + cwh(touchSensitivity)) &&
		    //        !(touchMoveX >= touchStartX + cwh(touchSensitivity) + cwh(diagSensitivity)) &&
		    //        !(touchMoveX <= touchStartX - cwh(touchSensitivity) - cwh(diagSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX, touchStartY + cwh(arrowMainSize));
				canvas.lineTo(touchStartX - cwh(arrowPointSize), touchStartY + cwh(arrowMainSize - arrowPointSize));
				canvas.lineTo(touchStartX, touchStartY + cwh(arrowMainSize));
				canvas.lineTo(touchStartX + cwh(arrowPointSize), touchStartY + cwh(arrowMainSize - arrowPointSize));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = false;
				keyLeft  = false;
		    }
		    
		    // arrow - right/up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*6 + 45/2 && touchAngle < 45*7 + 45/2)) {
		    //else if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //         (touchMoveY <= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - right/down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*0 + 45/2 && touchAngle < 45*1 + 45/2)) {
		    //else if ((touchMoveX >= touchStartX + cwh(touchSensitivity)) &&
		    //         (touchMoveY >= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX + cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = true;
				keyLeft  = false;
		    }
		    
		    // arrow - left/up
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*4 + 45/2 && touchAngle < 45*5 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //         (touchMoveY <= touchStartY - cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = true;
				keyDown  = false;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    // arrow - left/down
		    else if (touchDistance >= cwh(touchSensitivity) && (touchAngle >= 45*2 + 45/2 && touchAngle < 45*3 + 45/2)) {
		    //else if ((touchMoveX <= touchStartX - cwh(touchSensitivity)) &&
		    //         (touchMoveY >= touchStartY + cwh(touchSensitivity))) {
			    canvas.beginPath();
				canvas.moveTo(touchStartX, touchStartY);
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75));
				canvas.lineTo(touchStartX - cwh(arrowMainSize * 0.75), touchStartY + cwh(arrowMainSize * 0.75 - arrowPointSize * 1.5));
			    canvas.lineWidth = cwh(cursorLineSize);
			    canvas.strokeStyle = arrowColor;
			    canvas.stroke();
			    
			    keyUp    = false;
				keyDown  = true;
				keyRight = false;
				keyLeft  = true;
		    }
		    
		    else {
			    keyUp    = false;
				keyDown  = false;
				keyRight = false;
				keyLeft  = false;
			}
		}
	}
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}
function angle360(cx, cy, ex, ey) {
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
var walls = [
    [],
    // level 1
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 2
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 3
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 4
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 5
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
        [1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1],
        [1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1],
        [1,1,1,0,1,0,1,1,1,0,0,1,1,1,0,1,0,1,1,1],
        [1,1,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,1],
        [1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1],
        [1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
        [1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 6
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 7
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 8
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,0,0,0,0,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,0,0,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,1,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 9
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
        [1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,1,1],
        [1,1,0,0,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,1],
        [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 10
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 11
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 12
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 13
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 14
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 15
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 16
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 17
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 18
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 19
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 20
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,0,1,1],
        [1,1,0,0,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,1],
        [1,1,1,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1],
        [1,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1],
        [1,1,1,0,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,1],
        [1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 21
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 22
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1],
        [1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1],
        [1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 23
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 24
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 25
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 26
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1],
        [1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1],
        [1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1],
        [1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 27
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 28
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 29
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    // level 30
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
];

var walls_stroke = [
    [],
    // level 1
    [
        [
            [2, 4],
            [2, 11],
            [7, 11],
            [7, 10],
            [14, 10],
            [14, 5],
            [15, 5],
            [15, 11],
            [18, 11],
            [18, 4],
            [13, 4],
            [13, 5],
            [6, 5],
            [6, 10],
            [5, 10],
            [5, 4],
            [2, 4],
            [2, 5]
        ]
    ],

    // level 2
    [
        [
            [5, 4],
            [5, 7],
            [4, 7],
            [4, 6],
            [2, 6],
            [2, 9],
            [4, 9],
            [4, 8],
            [5, 8],
            [5, 11],
            [15, 11],
            [15, 8],
            [16, 8],
            [16, 9],
            [18, 9],
            [18, 6],
            [16, 6],
            [16, 7],
            [15, 7],
            [15, 4],
            [5, 4],
            [5, 5]
        ]
    ],

    // level 3
    [
        [
            [6, 4],
            [8, 4],
            [8, 3],
            [9, 3],
            [9, 4],
            [15, 4],
            [15, 5],
            [14, 5],
            [14, 11],
            [12, 11],
            [12, 12],
            [11, 12],
            [11, 11],
            [5, 11],
            [5, 10],
            [6, 10],
            [6, 4],
            [7, 4]
        ],
        [
            [7, 5],
            [13, 5],
            [13, 7],
            [12, 7],
            [12, 6],
            [8, 6],
            [8, 7],
            [7, 7],
            [7, 5],
            [8, 5]
        ],
        [
            [7, 8],
            [8, 8],
            [8, 9],
            [12, 9],
            [12, 8],
            [13, 8],
            [13, 10],
            [7, 10],
            [7, 8],
            [8, 8]
        ]
    ],

    // level 4
    [
        [
            [10, 2],
            [12, 2],
            [12, 5],
            [13, 5],
            [13, 6],
            [14, 6],
            [14, 7],
            [15, 7],
            [15, 11],
            [14, 11],
            [14, 12],
            [13, 12],
            [13, 13],
            [9, 13],
            [9, 12],
            [8, 12],
            [8, 11],
            [7, 11],
            [7, 10],
            [4, 10],
            [4, 8],
            [7, 8],
            [7, 7],
            [8, 7],
            [8, 6],
            [9, 6],
            [9, 5],
            [10, 5],
            [10, 2],
            [12, 2]
        ]
    ],

    // level 5
    [
        [
            [2, 2],
            [18, 2],
            [18, 3],
            [17, 3],
            [17, 13],
            [3, 13],
            [3, 5],
            [2, 5],
            [2, 4],
            [15, 4],
            [15, 11],
            [5, 11],
            [5, 6],
            [13, 6],
            [13, 7],
            [11, 7],
            [11, 8],
            [13, 8],
            [13, 9],
            [7, 9],
            [7, 8],
            [9, 8],
            [9, 7],
            [6, 7],
            [6, 10],
            [14, 10],
            [14, 5],
            [4, 5],
            [4, 12],
            [16, 12],
            [16, 3],
            [2, 3],
            [2, 2],
            [3, 2]
        ]
    ],

    // level 6
    [
        [
            [2, 5],
            [6, 5],
            [6, 3],
            [18, 3],
            [18, 13],
            [2, 13],
            [2, 8],
            [3, 8],
            [3, 9],
            [6, 9],
            [6, 8],
            [7, 8],
            [7, 9],
            [10, 9],
            [10, 8],
            [11, 8],
            [11, 9],
            [14, 9],
            [14, 8],
            [15, 8],
            [15, 9],
            [16, 9],
            [16, 7],
            [2, 7],
            [2, 5],
            [3, 5]
        ]
    ],

    // level 7
    [
        [
            [2, 6],
            [5, 6],
            [5, 3],
            [15, 3],
            [15, 7],
            [16, 7],
            [16, 6],
            [18, 6],
            [18, 9],
            [16, 9],
            [16, 8],
            [15, 8],
            [15, 12],
            [5, 12],
            [5, 9],
            [2, 9],
            [2, 6],
            [3, 6]
        ]
    ],

    // level 8
    [
        [
            [5, 3],
            [5, 12],
            [9, 12],
            [9, 11],
            [11, 11],
            [11, 12],
            [15, 12],
            [15, 3],
            [11, 3],
            [11, 4],
            [9, 4],
            [9, 3],
            [5, 3],
            [5, 4]
        ],
        [
            [6, 5],
            [7, 5],
            [7, 4],
            [8, 4],
            [8, 6],
            [6, 6],
            [6, 5],
            [7, 5]
        ],
        [
            [6, 7],
            [8, 7],
            [8, 9],
            [6, 9],
            [6, 7],
            [7, 7]
        ],
        [
            [6, 10],
            [8, 10],
            [8, 11],
            [6, 11],
            [6, 10],
            [7, 10]
        ],
        [
            [9, 5],
            [11, 5],
            [11, 6],
            [10, 6],
            [10, 7],
            [11, 7],
            [11, 10],
            [9, 10],
            [9, 5],
            [10, 5]
        ],
        [
            [12, 4],
            [14, 4],
            [14, 5],
            [12, 5],
            [12, 4],
            [13, 4]
        ],
        [
            [12, 6],
            [14, 6],
            [14, 9],
            [13, 9],
            [13, 10],
            [14, 10],
            [14, 11],
            [12, 11],
            [12, 6],
            [13, 6]
        ]
    ],

    // level 9
    [
        [
            [2, 3],
            [4, 3],
            [4, 5],
            [6, 5],
            [6, 3],
            [12, 3],
            [12, 8],
            [13, 8],
            [13, 3],
            [18, 3],
            [18, 8],
            [16, 8],
            [16, 5],
            [15, 5],
            [15, 10],
            [18, 10],
            [18, 12],
            [12, 12],
            [12, 11],
            [13, 11],
            [13, 10],
            [8, 10],
            [8, 12],
            [2, 12],
            [2, 3],
            [3, 3]
        ],
        [
            [4, 7],
            [8, 7],
            [8, 5],
            [10, 5],
            [10, 8],
            [6, 8],
            [6, 10],
            [4, 10],
            [4, 7],
            [5, 7]
        ]
    ],

    // level 10
    [
        [
            [7, 3],
            [7, 8],
            [5, 8],
            [5, 11],
            [7, 11],
            [7, 12],
            [13, 12],
            [13, 11],
            [15, 11],
            [15, 8],
            [13, 8],
            [13, 3],
            [11, 3],
            [11, 5],
            [12, 5],
            [12, 6],
            [11, 6],
            [11, 9],
            [13, 9],
            [13, 10],
            [7, 10],
            [7, 9],
            [9, 9],
            [9, 6],
            [8, 6],
            [8, 5],
            [9, 5],
            [9, 3],
            [7, 3],
            [7, 4]
        ]
    ],

    // level 11
    [
        [
            [6, 3],
            [6, 8],
            [4, 8],
            [4, 6],
            [1, 6],
            [1, 9],
            [6, 9],
            [6, 12],
            [15, 12],
            [15, 5],
            [17, 5],
            [17, 9],
            [19, 9],
            [19, 3],
            [6, 3],
            [6, 4]
        ]
    ],

    // level 12
    [
        [
            [2, 3],
            [12, 3],
            [12, 8],
            [18, 8],
            [18, 12],
            [2, 12],
            [2, 3]
        ]
    ],

    // level 13
    [
        [
            [5, 4],
            [9, 4],
            [9, 2],
            [11, 2],
            [11, 4],
            [15, 4],
            [15, 11],
            [11, 11],
            [11, 13],
            [9, 13],
            [9, 11],
            [5, 11],
            [5, 4],
            [6, 4]
        ]
    ],

    // level 14
    [
        [
            [2, 8],
            [15, 8],
            [15, 4],
            [18, 4],
            [18, 7],
            [16, 7],
            [16, 8],
            [18, 8],
            [18, 11],
            [6, 11],
            [6, 9],
            [5, 9],
            [5, 11],
            [2, 11],
            [2, 8],
            [3, 8]
        ]
    ],

    // level 15
    [
        [
            [1, 3],
            [4, 3],
            [4, 5],
            [2, 5],
            [2, 6],
            [4, 6],
            [4, 9],
            [5, 9],
            [5, 3],
            [11, 3],
            [11, 9],
            [12, 9],
            [12, 3],
            [19, 3],
            [19, 12],
            [16, 12],
            [16, 10],
            [18, 10],
            [18, 9],
            [16, 9],
            [16, 6],
            [15, 6],
            [15, 12],
            [9, 12],
            [9, 6],
            [8, 6],
            [8, 12],
            [1, 12],
            [1, 3],
            [2, 3]
        ]
    ],

    // level 16
    [
        [
            [1, 4],
            [7, 4],
            [7, 10],
            [8, 10],
            [8, 6],
            [9, 6],
            [9, 4],
            [17, 4],
            [17, 10],
            [19, 10],
            [19, 12],
            [13, 12],
            [13, 6],
            [12, 6],
            [12, 10],
            [11, 10],
            [11, 12],
            [3, 12],
            [3, 6],
            [1, 6],
            [1, 4],
            [2, 4]
        ]
    ],

    // level 17
    [
        [
            [3, 3],
            [3, 4],
            [4, 4],
            [4, 8],
            [3, 8],
            [3, 9],
            [4, 9],
            [4, 11],
            [2, 11],
            [2, 12],
            [8, 12],
            [8, 13],
            [9, 13],
            [9, 12],
            [15, 12],
            [15, 13],
            [16, 13],
            [16, 10],
            [18, 10],
            [18, 9],
            [16, 9],
            [16, 5],
            [18, 5],
            [18, 4],
            [16, 4],
            [16, 3],
            [15, 3],
            [15, 4],
            [9, 4],
            [9, 3],
            [8, 3],
            [8, 4],
            [5, 4],
            [5, 2],
            [4, 2],
            [4, 3],
            [3, 3],
            [3, 4]
        ],
        [
            [5, 5],
            [5, 11],
            [8, 11],
            [8, 7],
            [6, 7],
            [6, 6],
            [8, 6],
            [8, 5],
            [5, 5],
            [5, 6]
        ],
        [
            [9, 5],
            [15, 5],
            [15, 6],
            [9, 6],
            [9, 5],
            [10, 5]
        ],
        [
            [9, 7],
            [15, 7],
            [15, 9],
            [9, 9],
            [9, 7],
            [10, 7]
        ],
        [
            [9, 10],
            [15, 10],
            [15, 11],
            [9, 11],
            [9, 10],
            [10, 10]
        ]
    ],

    // level 18
    [
        [
            [3, 6],
            [5, 6],
            [5, 7],
            [6, 7],
            [6, 5],
            [14, 5],
            [14, 7],
            [15, 7],
            [15, 6],
            [17, 6],
            [17, 9],
            [15, 9],
            [15, 8],
            [14, 8],
            [14, 10],
            [6, 10],
            [6, 8],
            [5, 8],
            [5, 9],
            [3, 9],
            [3, 6],
            [4, 6]
        ]
    ],

    // level 19
    [
        [
            [3, 6],
            [5, 6],
            [5, 5],
            [15, 5],
            [15, 6],
            [17, 6],
            [17, 9],
            [15, 9],
            [15, 10],
            [5, 10],
            [5, 9],
            [3, 9],
            [3, 6],
            [4, 6]
        ]
    ],

    // level 20
    [
        [
            [2, 4],
            [4, 4],
            [4, 9],
            [5, 9],
            [5, 4],
            [9, 4],
            [9, 6],
            [11, 6],
            [11, 4],
            [15, 4],
            [15, 6],
            [17, 6],
            [17, 4],
            [18, 4],
            [18, 12],
            [16, 12],
            [16, 10],
            [14, 10],
            [14, 9],
            [13, 9],
            [13, 8],
            [12, 8],
            [12, 10],
            [8, 10],
            [8, 9],
            [7, 9],
            [7, 8],
            [6, 8],
            [6, 10],
            [3, 10],
            [3, 6],
            [2, 6],
            [2, 4],
            [3, 4]
        ],
        [
            [6, 5],
            [7, 5],
            [7, 6],
            [8, 6],
            [8, 7],
            [6, 7],
            [6, 5],
            [7, 5]
        ],
        [
            [9, 7],
            [10, 7],
            [10, 8],
            [11, 8],
            [11, 9],
            [9, 9],
            [9, 7],
            [10, 7]
        ],
        [
            [12, 5],
            [13, 5],
            [13, 6],
            [14, 6],
            [14, 7],
            [12, 7],
            [12, 5],
            [13, 5]
        ],
        [
            [15, 7],
            [16, 7],
            [16, 8],
            [17, 8],
            [17, 9],
            [15, 9],
            [15, 7],
            [16, 7]
        ]
    ],

    // level 21
    [
        [
            [1, 6],
            [3, 6],
            [3, 7],
            [4, 7],
            [4, 3],
            [16, 3],
            [16, 7],
            [17, 7],
            [17, 6],
            [19, 6],
            [19, 9],
            [17, 9],
            [17, 8],
            [16, 8],
            [16, 12],
            [4, 12],
            [4, 8],
            [3, 8],
            [3, 9],
            [1, 9],
            [1, 6],
            [2, 6]
        ]
    ],

    // level 22
    [
        [
            [3, 4],
            [7, 4],
            [7, 7],
            [4, 7],
            [4, 9],
            [7, 9],
            [7, 13],
            [17, 13],
            [17, 6],
            [13, 6],
            [13, 4],
            [19, 4],
            [19, 2],
            [11, 2],
            [11, 8],
            [15, 8],
            [15, 11],
            [9, 11],
            [9, 2],
            [1, 2],
            [1, 13],
            [5, 13],
            [5, 11],
            [3, 11],
            [3, 4],
            [4, 4]
        ]
    ],

    // level 23
    [
        [
            [3, 3],
            [6, 3],
            [6, 4],
            [7, 4],
            [7, 3],
            [13, 3],
            [13, 4],
            [14, 4],
            [14, 5],
            [15, 5],
            [15, 10],
            [17, 10],
            [17, 12],
            [14, 12],
            [14, 11],
            [13, 11],
            [13, 12],
            [7, 12],
            [7, 11],
            [6, 11],
            [6, 10],
            [5, 10],
            [5, 5],
            [3, 5],
            [3, 3],
            [4, 3]
        ]
    ],

    // level 24
    [
        [
            [2, 5],
            [7, 5],
            [7, 4],
            [8, 4],
            [8, 5],
            [16, 5],
            [16, 3],
            [18, 3],
            [18, 10],
            [13, 10],
            [13, 11],
            [12, 11],
            [12, 10],
            [4, 10],
            [4, 12],
            [2, 12],
            [2, 5],
            [3, 5]
        ]
    ],

    // level 25
    [
        [
            [1, 4],
            [2, 4],
            [2, 2],
            [4, 2],
            [4, 4],
            [5, 4],
            [5, 9],
            [10, 9],
            [10, 8],
            [9, 8],
            [9, 6],
            [12, 6],
            [12, 8],
            [11, 8],
            [11, 9],
            [17, 9],
            [17, 10],
            [19, 10],
            [19, 12],
            [17, 12],
            [17, 13],
            [1, 13],
            [1, 4],
            [2, 4]
        ]
    ],

    // level 26
    [
        [
            [3, 2],
            [5, 2],
            [5, 3],
            [6, 3],
            [6, 4],
            [7, 4],
            [7, 5],
            [8, 5],
            [8, 6],
            [9, 6],
            [9, 7],
            [11, 7],
            [11, 6],
            [12, 6],
            [12, 5],
            [13, 5],
            [13, 4],
            [14, 4],
            [14, 3],
            [15, 3],
            [15, 2],
            [17, 2],
            [17, 3],
            [16, 3],
            [16, 4],
            [17, 4],
            [17, 5],
            [16, 5],
            [16, 6],
            [15, 6],
            [15, 7],
            [14, 7],
            [14, 8],
            [13, 8],
            [13, 9],
            [19, 9],
            [19, 10],
            [18, 10],
            [18, 12],
            [19, 12],
            [19, 13],
            [9, 13],
            [9, 11],
            [11, 11],
            [11, 12],
            [12, 12],
            [12, 10],
            [8, 10],
            [8, 13],
            [1, 13],
            [1, 9],
            [7, 9],
            [7, 8],
            [6, 8],
            [6, 7],
            [5, 7],
            [5, 6],
            [4, 6],
            [4, 5],
            [3, 5],
            [3, 2],
            [4, 2]
        ]
    ],

    // level 27
    [
        [
            [1, 6],
            [3, 6],
            [3, 7],
            [4, 7],
            [4, 3],
            [16, 3],
            [16, 7],
            [17, 7],
            [17, 6],
            [19, 6],
            [19, 9],
            [17, 9],
            [17, 8],
            [16, 8],
            [16, 12],
            [4, 12],
            [4, 8],
            [3, 8],
            [3, 9],
            [1, 9],
            [1, 6],
            [2, 6]
        ]
    ],

    // level 28
    [
        [
            [1, 2],
            [18, 2],
            [18, 5],
            [19, 5],
            [19, 10],
            [18, 10],
            [18, 13],
            [1, 13],
            [1, 11],
            [3, 11],
            [3, 8],
            [16, 8],
            [16, 7],
            [3, 7],
            [3, 4],
            [1, 4],
            [1, 2],
            [2, 2]
        ]
    ],

    // level 29
    [
        [
            [2, 3],
            [4, 3],
            [4, 5],
            [16, 5],
            [16, 3],
            [18, 3],
            [18, 12],
            [2, 12],
            [2, 3],
            [3, 3]
        ]
    ],

    // level 30
    [
        [
            [1, 2],
            [19, 2],
            [19, 11],
            [3, 11],
            [3, 13],
            [1, 13],
            [1, 2],
            [2, 2]
        ]
    ]
];

function drawWalls_fill() {
    // colors
    var wallsColor, floorColor0, floorColor1;
    if (level >= WALLS_RED) {
        wallsColor = WALLS_COLOR_2;
        floorColor0 = TILE_COLOR_2_0;
        floorColor1 = TILE_COLOR_2_1;
    } else if (level >= WALLS_PURPLE) {
        wallsColor = WALLS_COLOR_1;
        floorColor0 = TILE_COLOR_1_0;
        floorColor1 = TILE_COLOR_1_1;
    } else {
        wallsColor = WALLS_COLOR_0;
        floorColor0 = TILE_COLOR_0_0;
        floorColor1 = TILE_COLOR_0_1;
    }

    // walls
    canvas.beginPath();
    canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT));
    canvas.fillStyle = wallsColor;
    canvas.fill();

    // bg tiles
    for (var y = 0; y < TILES_Y; y++) {
        for (var x = 0; x < TILES_X; x++) {
            if (walls[level][y][x] == 0) {
                // get bg tile color
                var bgTileColor = floorColor0;
                if (x % 2 == 0 && y % 2 == 0 ||
                    x % 2 == 1 && y % 2 == 1)
                    bgTileColor = floorColor1;

                // draw bg tile color
                canvas.beginPath();
                canvas.rect(x * cwh(TILE_SIZE) + os.x, y * cwh(TILE_SIZE) + os.y, cwh(TILE_SIZE), cwh(TILE_SIZE));
                canvas.fillStyle = bgTileColor;
                canvas.fill();
            }
        }
    }
}

function drawWalls_stroke() {
    for (var i = 0; i < walls_stroke[level].length; i++) {
        for (var j = 0; j < walls_stroke[level][i].length; j++) {
            if (j == 0) {
                canvas.beginPath();
                canvas.moveTo(walls_stroke[level][i][j][0] * cwh(TILE_SIZE) + os.x, walls_stroke[level][i][j][1] * cwh(TILE_SIZE) + os.y);
            } else {
                canvas.lineTo(walls_stroke[level][i][j][0] * cwh(TILE_SIZE) + os.x, walls_stroke[level][i][j][1] * cwh(TILE_SIZE) + os.y);
            }
        }
        canvas.lineWidth = cwh(OUTLINE_SIZE);
        canvas.strokeStyle = "black";
        canvas.stroke();
    }
}
var enemies = [
    [],
    // level 1
    [new simpleEnemy(250, 550, 220, 220, 7, 0), new simpleEnemy(550, 250, 260, 260, 7, 0), new simpleEnemy(250, 550, 300, 300, 7, 0), new simpleEnemy(550, 250, 340, 340, 7, 0), new simpleEnemy(250, 550, 380, 380, 7, 0)],
  
    // level 2
    [
      new simpleEnemy(220, 220, 171, 429, 0, 5),
      new simpleEnemy(260, 260, 429, 171, 0, 5),
      new simpleEnemy(300, 300, 171, 429, 0, 5),
      new simpleEnemy(340, 340, 429, 171, 0, 5),
      new simpleEnemy(380, 380, 171, 429, 0, 5),
      new simpleEnemy(420, 420, 429, 171, 0, 5),
      new simpleEnemy(460, 460, 171, 429, 0, 5),
      new simpleEnemy(500, 500, 429, 171, 0, 5),
      new simpleEnemy(540, 540, 171, 429, 0, 5),
      new simpleEnemy(580, 580, 429, 171, 0, 5),
    ],
  
    // level 3
    [
      new linearEnemy([
        [260, 260, 360, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 360, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 340, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 340, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 320, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 320, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 300, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 300, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 280, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 280, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 260, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 260, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 240, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 240, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 220, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 220, 0, 4],
      ]),
      new linearEnemy([
        [260, 260, 200, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 200, 0, 4],
      ]),
      new linearEnemy([
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
      ]),
      new linearEnemy([
        [280, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 280, 420, 180, 4, 0],
      ]),
      new linearEnemy([
        [300, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 300, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [320, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 320, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [340, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 340, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [360, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 360, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [380, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 380, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [400, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 400, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [420, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 420, 180, 180, 4, 0],
      ]),
      new linearEnemy([
        [440, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 440, 180, 180, 4, 0],
      ]),
  
      new linearEnemy([
        [360, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 360, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [380, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 380, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [400, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 400, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [420, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 420, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [440, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 440, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [460, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 460, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [480, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 480, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [500, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 500, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [520, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
        [540, 520, 420, 420, 4, 0],
      ]),
      new linearEnemy([
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 420, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 400, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 400, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 380, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 380, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 360, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 360, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 340, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 340, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 320, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 320, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 300, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 300, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 280, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 280, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 260, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 260, 0, 4],
      ]),
      new linearEnemy([
        [540, 540, 240, 420, 0, 4],
        [540, 260, 420, 420, 4, 0],
        [260, 260, 420, 180, 0, 4],
        [260, 540, 180, 180, 4, 0],
        [540, 540, 180, 240, 0, 4],
      ]),
    ],
  
    // level 4
    [
      /*
          new simpleCircularEnemy(440, 360, 140, 0, 2.75),
          new simpleCircularEnemy(440, 360, 120, 0, 2.75),
          new simpleCircularEnemy(440, 360, 100, 0, 2.75),
          new simpleCircularEnemy(440, 360, 80, 0, 2.75),
          new simpleCircularEnemy(440, 360, 60, 0, 2.75),
          new simpleCircularEnemy(440, 360, 40, 0, 2.75),
          new simpleCircularEnemy(440, 360, 20, 0, 2.75),
          new simpleCircularEnemy(440, 360, 140, 120, 2.75),
          new simpleCircularEnemy(440, 360, 120, 120, 2.75),
          new simpleCircularEnemy(440, 360, 100, 120, 2.75),
          new simpleCircularEnemy(440, 360, 80, 120, 2.75),
          new simpleCircularEnemy(440, 360, 60, 120, 2.75),
          new simpleCircularEnemy(440, 360, 40, 120, 2.75),
          new simpleCircularEnemy(440, 360, 20, 120, 2.75),
          new simpleCircularEnemy(440, 360, 140, 240, 2.75),
          new simpleCircularEnemy(440, 360, 120, 240, 2.75),
          new simpleCircularEnemy(440, 360, 100, 240, 2.75),
          new simpleCircularEnemy(440, 360, 80, 240, 2.75),
          new simpleCircularEnemy(440, 360, 60, 240, 2.75),
          new simpleCircularEnemy(440, 360, 40, 240, 2.75),
          new simpleCircularEnemy(440, 360, 20, 240, 2.75),
          */
      new simpleCircularEnemy(440, 360, 20, 0, 2.5),
      new simpleCircularEnemy(440, 360, 40, 0, 2.5),
      new simpleCircularEnemy(440, 360, 60, 0, 2.5),
      new simpleCircularEnemy(440, 360, 80, 0, 2.5),
      new simpleCircularEnemy(440, 360, 100, 0, 2.5),
      new simpleCircularEnemy(440, 360, 120, 0, 2.5),
      new simpleCircularEnemy(440, 360, 140, 0, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 90, 2.5),
      new simpleCircularEnemy(440, 360, 40, 90, 2.5),
      new simpleCircularEnemy(440, 360, 60, 90, 2.5),
      new simpleCircularEnemy(440, 360, 80, 90, 2.5),
      new simpleCircularEnemy(440, 360, 100, 90, 2.5),
      new simpleCircularEnemy(440, 360, 120, 90, 2.5),
      new simpleCircularEnemy(440, 360, 140, 90, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 180, 2.5),
      new simpleCircularEnemy(440, 360, 40, 180, 2.5),
      new simpleCircularEnemy(440, 360, 60, 180, 2.5),
      new simpleCircularEnemy(440, 360, 80, 180, 2.5),
      new simpleCircularEnemy(440, 360, 100, 180, 2.5),
      new simpleCircularEnemy(440, 360, 120, 180, 2.5),
      new simpleCircularEnemy(440, 360, 140, 180, 2.5),
  
      new simpleCircularEnemy(440, 360, 20, 270, 2.5),
      new simpleCircularEnemy(440, 360, 40, 270, 2.5),
      new simpleCircularEnemy(440, 360, 60, 270, 2.5),
      new simpleCircularEnemy(440, 360, 80, 270, 2.5),
      new simpleCircularEnemy(440, 360, 100, 270, 2.5),
      new simpleCircularEnemy(440, 360, 120, 270, 2.5),
      new simpleCircularEnemy(440, 360, 140, 270, 2.5),
  
      new staticEnemy(440, 360),
    ],
  
    // level 5
    [
      new simpleCircularEnemy(400, 300, 40, 270, -2),
      new simpleCircularEnemy(400, 300, 40, 90, -2),
      new simpleCircularEnemy(400, 300, 120, 270, 2),
      new simpleCircularEnemy(400, 300, 120, 90, 2),
      new simpleCircularEnemy(400, 300, 200, 270, 2),
      new simpleCircularEnemy(400, 300, 200, 90, 2),
      new simpleCircularEnemy(400, 300, 280, 270, 2),
      new simpleCircularEnemy(400, 300, 280, 90, 2),
    ],
  
    // level 6
    [
      new staticEnemy(320, 200),
      new staticEnemy(480, 200),
      new staticEnemy(640, 200),
      new staticEnemy(160, 440),
      new staticEnemy(320, 440),
      new staticEnemy(480, 440),
      new staticEnemy(640, 440),
      new simpleCircularEnemy(320, 200, 25, 0, 2.5),
      new simpleCircularEnemy(320, 200, 50, 0, 2.5),
      new simpleCircularEnemy(320, 200, 75, 0, 2.5),
      new simpleCircularEnemy(320, 200, 25, 120, 2.5),
      new simpleCircularEnemy(320, 200, 50, 120, 2.5),
      new simpleCircularEnemy(320, 200, 75, 120, 2.5),
      new simpleCircularEnemy(320, 200, 25, 240, 2.5),
      new simpleCircularEnemy(320, 200, 50, 240, 2.5),
      new simpleCircularEnemy(320, 200, 75, 240, 2.5),
      new simpleCircularEnemy(480, 200, 25, 0, -2.5),
      new simpleCircularEnemy(480, 200, 50, 0, -2.5),
      new simpleCircularEnemy(480, 200, 75, 0, -2.5),
      new simpleCircularEnemy(480, 200, 25, 120, -2.5),
      new simpleCircularEnemy(480, 200, 50, 120, -2.5),
      new simpleCircularEnemy(480, 200, 75, 120, -2.5),
      new simpleCircularEnemy(480, 200, 25, 240, -2.5),
      new simpleCircularEnemy(480, 200, 50, 240, -2.5),
      new simpleCircularEnemy(480, 200, 75, 240, -2.5),
      new simpleCircularEnemy(640, 200, 25, 0, 2.5),
      new simpleCircularEnemy(640, 200, 50, 0, 2.5),
      new simpleCircularEnemy(640, 200, 75, 0, 2.5),
      new simpleCircularEnemy(640, 200, 25, 120, 2.5),
      new simpleCircularEnemy(640, 200, 50, 120, 2.5),
      new simpleCircularEnemy(640, 200, 75, 120, 2.5),
      new simpleCircularEnemy(640, 200, 25, 240, 2.5),
      new simpleCircularEnemy(640, 200, 50, 240, 2.5),
      new simpleCircularEnemy(640, 200, 75, 240, 2.5),
      new simpleCircularEnemy(160, 440, 25, 0, -2.5),
      new simpleCircularEnemy(160, 440, 50, 0, -2.5),
      new simpleCircularEnemy(160, 440, 75, 0, -2.5),
      new simpleCircularEnemy(160, 440, 25, 120, -2.5),
      new simpleCircularEnemy(160, 440, 50, 120, -2.5),
      new simpleCircularEnemy(160, 440, 75, 120, -2.5),
      new simpleCircularEnemy(160, 440, 25, 240, -2.5),
      new simpleCircularEnemy(160, 440, 50, 240, -2.5),
      new simpleCircularEnemy(160, 440, 75, 240, -2.5),
      new simpleCircularEnemy(320, 440, 25, 0, 2.5),
      new simpleCircularEnemy(320, 440, 50, 0, 2.5),
      new simpleCircularEnemy(320, 440, 75, 0, 2.5),
      new simpleCircularEnemy(320, 440, 25, 120, 2.5),
      new simpleCircularEnemy(320, 440, 50, 120, 2.5),
      new simpleCircularEnemy(320, 440, 75, 120, 2.5),
      new simpleCircularEnemy(320, 440, 25, 240, 2.5),
      new simpleCircularEnemy(320, 440, 50, 240, 2.5),
      new simpleCircularEnemy(320, 440, 75, 240, 2.5),
      new simpleCircularEnemy(480, 440, 25, 0, -2.5),
      new simpleCircularEnemy(480, 440, 50, 0, -2.5),
      new simpleCircularEnemy(480, 440, 75, 0, -2.5),
      new simpleCircularEnemy(480, 440, 25, 120, -2.5),
      new simpleCircularEnemy(480, 440, 50, 120, -2.5),
      new simpleCircularEnemy(480, 440, 75, 120, -2.5),
      new simpleCircularEnemy(480, 440, 25, 240, -2.5),
      new simpleCircularEnemy(480, 440, 50, 240, -2.5),
      new simpleCircularEnemy(480, 440, 75, 240, -2.5),
      new simpleCircularEnemy(640, 440, 25, 0, 2.5),
      new simpleCircularEnemy(640, 440, 50, 0, 2.5),
      new simpleCircularEnemy(640, 440, 75, 0, 2.5),
      new simpleCircularEnemy(640, 440, 25, 120, 2.5),
      new simpleCircularEnemy(640, 440, 50, 120, 2.5),
      new simpleCircularEnemy(640, 440, 75, 120, 2.5),
      new simpleCircularEnemy(640, 440, 25, 240, 2.5),
      new simpleCircularEnemy(640, 440, 50, 240, 2.5),
      new simpleCircularEnemy(640, 440, 75, 240, 2.5),
    ],
  
    // level 7
    [
      /*
          new staticEnemy(400, 130),
          new staticEnemy(400, 150),
          new staticEnemy(400, 170),
          new staticEnemy(400, 190),
          new staticEnemy(400, 210),
          new staticEnemy(400, 230),
          new staticEnemy(400, 250),
          new staticEnemy(400, 270),
          new staticEnemy(400, 290),
          */
      new simpleEnemy(220, 220, 131, 469, 0, 10),
      new simpleEnemy(260, 260, 469, 131, 0, 10),
      new simpleEnemy(300, 300, 131, 469, 0, 10),
      new simpleEnemy(340, 340, 469, 131, 0, 10),
      new simpleEnemy(380, 380, 131, 469, 0, 10),
      new simpleEnemy(420, 420, 469, 131, 0, 10),
      new simpleEnemy(460, 460, 131, 469, 0, 10),
      new simpleEnemy(500, 500, 469, 131, 0, 10),
      new simpleEnemy(540, 540, 131, 469, 0, 10),
      new simpleEnemy(580, 580, 469, 131, 0, 10),
    ],
  
    // level 8
    [
      new linearEnemy([
        [220, 340, 140, 140, 3, 0],
        [340, 340, 140, 260, 0, 3],
        [340, 220, 260, 260, 3, 0],
        [220, 220, 260, 140, 0, 3],
      ]),
      new linearEnemy([
        [220, 340, 260, 260, 3, 0],
        [340, 340, 260, 380, 0, 3],
        [340, 220, 380, 380, 3, 0],
        [220, 220, 380, 260, 0, 3],
      ]),
      new linearEnemy([
        [220, 340, 380, 380, 3, 0],
        [340, 340, 380, 460, 0, 3],
        [340, 220, 460, 460, 3, 0],
        [220, 220, 460, 380, 0, 3],
      ]),
      new linearEnemy([
        [460, 580, 140, 140, 3, 0],
        [580, 580, 140, 220, 0, 3],
        [580, 460, 220, 220, 3, 0],
        [460, 460, 220, 140, 0, 3],
      ]),
      new linearEnemy([
        [460, 580, 220, 220, 3, 0],
        [580, 580, 220, 460, 0, 3],
        [580, 460, 460, 460, 3, 0],
        [460, 460, 460, 220, 0, 3],
      ]),
      new linearEnemy([
        [340, 460, 180, 180, 3, 0],
        [460, 460, 180, 420, 0, 3],
        [460, 340, 420, 420, 3, 0],
        [340, 340, 420, 180, 0, 3],
      ]),
      new linearEnemy([
        [580, 580, 460, 220, 0, 3],
        [580, 460, 220, 220, 3, 0],
        [460, 460, 220, 460, 0, 3],
        [460, 580, 460, 460, 3, 0],
      ]),
    ],
  
    // level 9
    [
      new staticEnemy(200, 210),
      new staticEnemy(200, 230),
      new staticEnemy(250, 160),
      new staticEnemy(270, 160),
      new staticEnemy(360, 170),
      new staticEnemy(360, 190),
      new staticEnemy(130, 320),
      new staticEnemy(150, 320),
      new staticEnemy(200, 410),
      new staticEnemy(200, 430),
      new staticEnemy(250, 360),
      new staticEnemy(270, 360),
      new staticEnemy(320, 370),
      new staticEnemy(320, 390),
      new staticEnemy(410, 240),
      new staticEnemy(430, 240),
      new staticEnemy(380, 330),
      new staticEnemy(380, 350),
      new staticEnemy(620, 450),
      new staticEnemy(620, 470),
      new staticEnemy(530, 440),
      new staticEnemy(550, 440),
      new staticEnemy(490, 360),
      new staticEnemy(510, 360),
      new staticEnemy(530, 280),
      new staticEnemy(550, 280),
      new staticEnemy(570, 230),
      new staticEnemy(590, 230),
      new staticEnemy(640, 170),
      new staticEnemy(640, 190),
      new staticEnemy(660, 170),
      new linearEnemy([
        [460, 460, 210, 300, 0, 5],
        [460, 410, 300, 300, 5, 0],
        [410, 460, 300, 300, 5, 0],
        [460, 460, 300, 210, 0, 5],
      ]),
      new linearEnemy([
        [700, 700, 130, 240, 0, 5],
        [700, 660, 240, 240, 5, 0],
        [660, 700, 240, 240, 5, 0],
        [700, 700, 240, 130, 0, 5],
      ]),
      new linearEnemy([
        [530, 620, 460, 460, 5, 0],
        [620, 620, 460, 410, 0, 5],
        [620, 620, 410, 460, 0, 5],
        [620, 530, 460, 460, 5, 0],
      ]),
      new linearEnemy([
        [100, 140, 220, 220, 7.5, 0],
        [140, 140, 220, 260, 0, 7.5],
        [140, 100, 260, 260, 7.5, 0],
        [100, 100, 260, 220, 0, 7.5],
      ]),
      new linearEnemy([
        [260, 300, 220, 220, 7.5, 0],
        [300, 300, 220, 260, 0, 7.5],
        [300, 260, 260, 260, 7.5, 0],
        [260, 260, 260, 220, 0, 7.5],
      ]),
      new linearEnemy([
        [420, 460, 140, 140, 7.5, 0],
        [460, 460, 140, 180, 0, 7.5],
        [460, 420, 180, 180, 7.5, 0],
        [420, 420, 180, 140, 0, 7.5],
      ]),
      new linearEnemy([
        [540, 580, 140, 140, 7.5, 0],
        [580, 580, 140, 180, 0, 7.5],
        [580, 540, 180, 180, 7.5, 0],
        [540, 540, 180, 140, 0, 7.5],
      ]),
      new linearEnemy([
        [100, 140, 420, 420, 7.5, 0],
        [140, 140, 420, 460, 0, 7.5],
        [140, 100, 460, 460, 7.5, 0],
        [100, 100, 460, 420, 0, 7.5],
      ]),
      new linearEnemy([
        [260, 300, 420, 420, 7.5, 0],
        [300, 300, 420, 460, 0, 7.5],
        [300, 260, 460, 460, 7.5, 0],
        [260, 260, 460, 420, 0, 7.5],
      ]),
      new linearEnemy([
        [540, 580, 340, 340, 7.5, 0],
        [580, 580, 340, 380, 0, 7.5],
        [580, 540, 380, 380, 7.5, 0],
        [540, 540, 380, 340, 0, 7.5],
      ]),
    ],
  
    // level 10
    [
      new simpleEnemy(290, 350, 260, 260, 1.5, 0),
      new simpleEnemy(350, 290, 300, 300, 1.5, 0),
      new simpleEnemy(290, 350, 340, 340, 1.5, 0),
      new simpleEnemy(210, 270, 340, 340, 1.5, 0),
      new simpleEnemy(270, 210, 380, 380, 1.5, 0),
      new simpleEnemy(210, 270, 420, 420, 1.5, 0),
      new simpleEnemy(300, 300, 410, 470, 0, 1.5),
      new simpleEnemy(340, 340, 470, 410, 0, 1.5),
      new simpleEnemy(380, 380, 410, 470, 0, 1.5),
      new simpleEnemy(420, 420, 470, 410, 0, 1.5),
      new simpleEnemy(460, 460, 410, 470, 0, 1.5),
      new simpleEnemy(500, 500, 470, 410, 0, 1.5),
      new simpleEnemy(450, 510, 260, 260, 1.5, 0),
      new simpleEnemy(510, 450, 300, 300, 1.5, 0),
      new simpleEnemy(450, 510, 340, 340, 1.5, 0),
      new simpleEnemy(530, 590, 340, 340, 1.5, 0),
      new simpleEnemy(590, 530, 380, 380, 1.5, 0),
      new simpleEnemy(530, 590, 420, 420, 1.5, 0),
    ],
  
    // level 11
    [
      new staticEnemy(420, 300),
      new pauseCircularEnemy_1_4(420, 300, 20, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 90, 0, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 90, 0, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 180, 90, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 180, 90, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 270, 180, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 270, 180, 3, FPS * 1.6),
  
      new pauseCircularEnemy_1_4(420, 300, 20, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 20, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 40, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 60, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 80, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 100, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 120, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 140, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 160, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 180, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 200, 360, 270, 3, FPS * 1.6),
      new pauseCircularEnemy_1_4(420, 300, 220, 360, 270, 3, FPS * 1.6),
    ],
  
    // level 12
    [
      new staticEnemy(670, 350),
      new staticEnemy(650, 350),
      new staticEnemy(630, 350),
      new staticEnemy(610, 350),
      new staticEnemy(490, 350),
      new staticEnemy(470, 350),
      new staticEnemy(450, 350),
  
      new staticEnemy(450, 330),
      new staticEnemy(450, 310),
      new staticEnemy(450, 290),
      new staticEnemy(450, 270),
      new staticEnemy(450, 250),
      new staticEnemy(450, 230),
      new staticEnemy(450, 210),
      new staticEnemy(450, 190),
      new staticEnemy(450, 170),
      new staticEnemy(450, 150),
  
      new staticEnemy(430, 150),
      new staticEnemy(410, 150),
      new staticEnemy(390, 150),
      new staticEnemy(370, 150),
      new staticEnemy(350, 150),
      new staticEnemy(250, 150),
      new staticEnemy(230, 150),
      new staticEnemy(210, 150),
      new staticEnemy(190, 150),
      new staticEnemy(170, 150),
      new staticEnemy(150, 150),
      new staticEnemy(130, 150),
      new staticEnemy(110, 150),
      new staticEnemy(110, 170),
      new staticEnemy(110, 190),
      new staticEnemy(110, 210),
      new staticEnemy(110, 230),
      new staticEnemy(110, 250),
      new staticEnemy(110, 270),
      new staticEnemy(110, 290),
      new staticEnemy(110, 310),
      new staticEnemy(110, 330),
  
      new staticEnemy(210, 250),
      new staticEnemy(210, 230),
      new staticEnemy(210, 210),
      new staticEnemy(230, 230),
      new staticEnemy(250, 250),
      new staticEnemy(270, 250),
      new staticEnemy(290, 250),
      new staticEnemy(310, 250),
      new staticEnemy(330, 250),
      new staticEnemy(350, 250),
      new staticEnemy(370, 230),
      new staticEnemy(390, 210),
      new staticEnemy(390, 230),
      new staticEnemy(390, 250),
      new staticEnemy(390, 270),
      new staticEnemy(390, 290),
      new staticEnemy(390, 310),
      new staticEnemy(390, 330),
  
      new staticEnemy(330, 170),
      new staticEnemy(310, 190),
      new staticEnemy(290, 190),
      new staticEnemy(270, 170),
  
      new staticEnemy(390, 350),
      new staticEnemy(370, 350),
      new staticEnemy(350, 350),
      new staticEnemy(330, 350),
      new staticEnemy(310, 350),
      new staticEnemy(290, 350),
      new staticEnemy(270, 350),
      new staticEnemy(250, 350),
      new staticEnemy(230, 350),
      new staticEnemy(210, 350),
      new staticEnemy(190, 350),
      new staticEnemy(170, 350),
      new staticEnemy(150, 350),
      new staticEnemy(130, 350),
      new staticEnemy(110, 350),
      new staticEnemy(110, 370),
      new staticEnemy(110, 390),
      new staticEnemy(110, 410),
      new staticEnemy(110, 430),
  
      new staticEnemy(690, 350),
      new staticEnemy(690, 370),
      new staticEnemy(690, 390),
      new staticEnemy(690, 410),
      new staticEnemy(690, 430),
      new staticEnemy(690, 450),
      new staticEnemy(670, 450),
      new staticEnemy(650, 450),
      new staticEnemy(630, 450),
      new staticEnemy(610, 450),
      new staticEnemy(590, 450),
      new staticEnemy(570, 450),
      new staticEnemy(550, 450),
      new staticEnemy(530, 450),
      new staticEnemy(510, 450),
      new staticEnemy(490, 450),
      new staticEnemy(350, 450),
      new staticEnemy(330, 450),
      new staticEnemy(310, 450),
      new staticEnemy(290, 450),
      new staticEnemy(270, 450),
      new staticEnemy(250, 450),
      new staticEnemy(230, 450),
      new staticEnemy(210, 450),
      new staticEnemy(190, 450),
      new staticEnemy(170, 450),
      new staticEnemy(150, 450),
      new staticEnemy(130, 450),
      new staticEnemy(110, 450),
  
      new staticEnemy(370, 250),
      new staticEnemy(370, 270),
      new staticEnemy(370, 290),
      new staticEnemy(370, 310),
      new staticEnemy(370, 330),
  
      new staticEnemy(350, 270),
      new staticEnemy(330, 270),
      new staticEnemy(310, 270),
      new staticEnemy(290, 270),
  
      new staticEnemy(350, 330),
      new staticEnemy(330, 330),
      new staticEnemy(310, 330),
      new staticEnemy(290, 330),
      new staticEnemy(270, 330),
      new staticEnemy(250, 330),
      new staticEnemy(230, 330),
      new staticEnemy(210, 330),
      new staticEnemy(230, 310),
      new staticEnemy(230, 250),
      new staticEnemy(190, 250),
      new staticEnemy(170, 250),
      new staticEnemy(170, 270),
      new staticEnemy(190, 330),
      new staticEnemy(170, 330),
      new staticEnemy(150, 330),
      new staticEnemy(130, 330),
  
      new staticEnemy(430, 410),
      new staticEnemy(410, 410),
  
      new staticEnemy(590, 370),
      new staticEnemy(570, 370),
      new staticEnemy(550, 390),
      new staticEnemy(530, 390),
      new staticEnemy(510, 370),
      new staticEnemy(450, 410),
      new staticEnemy(470, 430),
  
      new staticEnemy(330, 370),
      new staticEnemy(310, 370),
      new staticEnemy(290, 370),
      new staticEnemy(270, 370),
      new staticEnemy(290, 390),
      new staticEnemy(310, 390),
  
      new staticEnemy(370, 430),
      new staticEnemy(390, 410),
      new staticEnemy(210, 410),
      new staticEnemy(210, 430),
      new staticEnemy(230, 430),
  
      new simpleEnemy(410, 410, 130, 470, 0, 3.8),
      new simpleEnemy(430, 430, 130, 470, 0, 3.8),
      new simpleEnemy(330, 330, 470, 130, 0, 3.8),
      new simpleEnemy(350, 350, 470, 130, 0, 3.8),
      new simpleEnemy(250, 250, 130, 470, 0, 3.8),
      new simpleEnemy(270, 270, 130, 470, 0, 3.8),
    ],
  
    // level 13
    [
      new simpleEnemy(210, 590, 300, 300, 6, 0),
      new simpleEnemy(590, 210, 260, 260, 6, 0),
      new simpleEnemy(590, 210, 340, 340, 6, 0),
      new simpleEnemy(210, 590, 380, 380, 6, 0),
      new simpleEnemy(210, 590, 220, 220, 6, 0),
      new simpleEnemy(590, 210, 180, 180, 6, 0),
      new simpleEnemy(590, 210, 420, 420, 6, 0),
  
      new simpleEnemy(220, 220, 170, 430, 0, 4.1),
      new simpleEnemy(260, 260, 430, 170, 0, 4.1),
      new simpleEnemy(300, 300, 170, 430, 0, 4.1),
      new simpleEnemy(340, 340, 430, 170, 0, 4.1),
      new simpleEnemy(380, 380, 170, 430, 0, 4.1),
      new simpleEnemy(420, 420, 430, 170, 0, 4.1),
      new simpleEnemy(460, 460, 170, 430, 0, 4.1),
      new simpleEnemy(500, 500, 430, 170, 0, 4.1),
      new simpleEnemy(540, 540, 170, 430, 0, 4.1),
      new simpleEnemy(580, 580, 430, 170, 0, 4.1),
    ],
  
    // level 14
    [
      new staticEnemy(340, 380),
      new staticEnemy(500, 380),
      new staticEnemy(660, 380),
  
      new simpleEnemy(260, 260, 330, 430, 0, 2),
      new simpleEnemy(420, 420, 430, 330, 0, 2),
      new simpleEnemy(580, 580, 330, 430, 0, 2),
  
      new simpleCircularEnemy(340, 380, 20, 0, -3.6),
      new simpleCircularEnemy(340, 380, 40, 0, -3.6),
      new simpleCircularEnemy(340, 380, 60, 0, -3.6),
      new simpleCircularEnemy(340, 380, 20, 120, -3.6),
      new simpleCircularEnemy(340, 380, 40, 120, -3.6),
      new simpleCircularEnemy(340, 380, 60, 120, -3.6),
      new simpleCircularEnemy(340, 380, 20, 240, -3.6),
      new simpleCircularEnemy(340, 380, 40, 240, -3.6),
      new simpleCircularEnemy(340, 380, 60, 240, -3.6),
  
      new simpleCircularEnemy(500, 380, 20, 0, 3.6),
      new simpleCircularEnemy(500, 380, 40, 0, 3.6),
      new simpleCircularEnemy(500, 380, 60, 0, 3.6),
      new simpleCircularEnemy(500, 380, 20, 120, 3.6),
      new simpleCircularEnemy(500, 380, 40, 120, 3.6),
      new simpleCircularEnemy(500, 380, 60, 120, 3.6),
      new simpleCircularEnemy(500, 380, 20, 240, 3.6),
      new simpleCircularEnemy(500, 380, 40, 240, 3.6),
      new simpleCircularEnemy(500, 380, 60, 240, 3.6),
  
      new simpleCircularEnemy(660, 380, 20, 0, -3.6),
      new simpleCircularEnemy(660, 380, 40, 0, -3.6),
      new simpleCircularEnemy(660, 380, 60, 0, -3.6),
      new simpleCircularEnemy(660, 380, 20, 120, -3.6),
      new simpleCircularEnemy(660, 380, 40, 120, -3.6),
      new simpleCircularEnemy(660, 380, 60, 120, -3.6),
      new simpleCircularEnemy(660, 380, 20, 240, -3.6),
      new simpleCircularEnemy(660, 380, 40, 240, -3.6),
      new simpleCircularEnemy(660, 380, 60, 240, -3.6),
    ],
  
    // level 15
    [
      new simpleEnemy(60, 60, 250, 470, 0, 6),
      new simpleEnemy(100, 100, 470, 250, 0, 6),
      new simpleEnemy(140, 140, 250, 470, 0, 6),
      new simpleEnemy(660, 660, 350, 130, 0, 6),
      new simpleEnemy(700, 700, 130, 350, 0, 6),
      new simpleEnemy(740, 740, 350, 130, 0, 6),
      new simpleEnemy(180, 180, 470, 370, 0, 6),
      new simpleEnemy(460, 460, 370, 470, 0, 6),
      new simpleEnemy(340, 340, 230, 130, 0, 6),
      new simpleEnemy(620, 620, 130, 230, 0, 6),
      new simpleEnemy(220, 220, 130, 470, 0, 6),
      new simpleEnemy(260, 260, 470, 130, 0, 6),
      new simpleEnemy(300, 300, 130, 470, 0, 6),
      new simpleEnemy(380, 380, 130, 470, 0, 6),
      new simpleEnemy(420, 420, 470, 130, 0, 6),
      new simpleEnemy(500, 500, 470, 130, 0, 6),
      new simpleEnemy(540, 540, 130, 470, 0, 6),
      new simpleEnemy(580, 580, 470, 130, 0, 6),
    ],
  
    // level 16
    [
      new linearEnemy([
        [140, 180, 180, 180, 3.5, 0],
        [180, 180, 180, 220, 0, 3.5],
        [180, 140, 220, 220, 3.5, 0],
        [140, 140, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 180, 180, 3.5, 0],
        [260, 260, 180, 220, 0, 3.5],
        [260, 220, 220, 220, 3.5, 0],
        [220, 220, 220, 180, 0, 3.5],
      ]),
  
      new linearEnemy([
        [140, 180, 260, 260, 3.5, 0],
        [180, 180, 260, 300, 0, 3.5],
        [180, 140, 300, 300, 3.5, 0],
        [140, 140, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 260, 260, 3.5, 0],
        [260, 260, 260, 300, 0, 3.5],
        [260, 220, 300, 300, 3.5, 0],
        [220, 220, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 340, 340, 3.5, 0],
        [180, 180, 340, 380, 0, 3.5],
        [180, 140, 380, 380, 3.5, 0],
        [140, 140, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 340, 340, 3.5, 0],
        [260, 260, 340, 380, 0, 3.5],
        [260, 220, 380, 380, 3.5, 0],
        [220, 220, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 340, 340, 3.5, 0],
        [180, 180, 340, 380, 0, 3.5],
        [180, 140, 380, 380, 3.5, 0],
        [140, 140, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [220, 260, 420, 420, 3.5, 0],
        [260, 260, 420, 460, 0, 3.5],
        [260, 220, 460, 460, 3.5, 0],
        [220, 220, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [140, 180, 420, 420, 3.5, 0],
        [180, 180, 420, 460, 0, 3.5],
        [180, 140, 460, 460, 3.5, 0],
        [140, 140, 460, 420, 0, 3.5],
      ]),
  
      new linearEnemy([
        [300, 340, 420, 420, 3.5, 0],
        [340, 340, 420, 460, 0, 3.5],
        [340, 300, 460, 460, 3.5, 0],
        [300, 300, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [380, 420, 420, 420, 3.5, 0],
        [420, 420, 420, 460, 0, 3.5],
        [420, 380, 460, 460, 3.5, 0],
        [380, 380, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [460, 500, 180, 180, 3.5, 0],
        [500, 500, 180, 220, 0, 3.5],
        [500, 460, 220, 220, 3.5, 0],
        [460, 460, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [380, 420, 180, 180, 3.5, 0],
        [420, 420, 180, 220, 0, 3.5],
        [420, 380, 220, 220, 3.5, 0],
        [380, 380, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [540, 580, 180, 180, 3.5, 0],
        [580, 580, 180, 220, 0, 3.5],
        [580, 540, 220, 220, 3.5, 0],
        [540, 540, 220, 180, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 180, 180, 3.5, 0],
        [660, 660, 180, 220, 0, 3.5],
        [660, 620, 220, 220, 3.5, 0],
        [620, 620, 220, 180, 0, 3.5],
      ]),
  
      new linearEnemy([
        [340, 380, 260, 260, 3.5, 0],
        [380, 380, 260, 300, 0, 3.5],
        [380, 340, 300, 300, 3.5, 0],
        [340, 340, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [420, 460, 260, 260, 3.5, 0],
        [460, 460, 260, 300, 0, 3.5],
        [460, 420, 300, 300, 3.5, 0],
        [420, 420, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [340, 380, 340, 340, 3.5, 0],
        [380, 380, 340, 380, 0, 3.5],
        [380, 340, 380, 380, 3.5, 0],
        [340, 340, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [420, 460, 340, 340, 3.5, 0],
        [460, 460, 340, 380, 0, 3.5],
        [460, 420, 380, 380, 3.5, 0],
        [420, 420, 380, 340, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 260, 260, 3.5, 0],
        [580, 580, 260, 300, 0, 3.5],
        [580, 540, 300, 300, 3.5, 0],
        [540, 540, 300, 260, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 260, 260, 3.5, 0],
        [660, 660, 260, 300, 0, 3.5],
        [660, 620, 300, 300, 3.5, 0],
        [620, 620, 300, 260, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 340, 340, 3.5, 0],
        [580, 580, 340, 380, 0, 3.5],
        [580, 540, 380, 380, 3.5, 0],
        [540, 540, 380, 340, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 340, 340, 3.5, 0],
        [660, 660, 340, 380, 0, 3.5],
        [660, 620, 380, 380, 3.5, 0],
        [620, 620, 380, 340, 0, 3.5],
      ]),
  
      new linearEnemy([
        [540, 580, 420, 420, 3.5, 0],
        [580, 580, 420, 460, 0, 3.5],
        [580, 540, 460, 460, 3.5, 0],
        [540, 540, 460, 420, 0, 3.5],
      ]),
      new linearEnemy([
        [620, 660, 420, 420, 3.5, 0],
        [660, 660, 420, 460, 0, 3.5],
        [660, 620, 460, 460, 3.5, 0],
        [620, 620, 460, 420, 0, 3.5],
      ]),
    ],
  
    // level 17
    [
      new staticEnemy(210, 190),
      new staticEnemy(210, 170),
      new staticEnemy(230, 190),
      new staticEnemy(230, 170),
      new staticEnemy(330, 430),
      new staticEnemy(350, 430),
      new staticEnemy(330, 410),
      new staticEnemy(350, 410),
      new staticEnemy(590, 370),
      new staticEnemy(590, 390),
      new staticEnemy(570, 370),
      new staticEnemy(570, 390),
      new simpleEnemy(180, 180, 90, 470, 0, 3),
      new simpleEnemy(170, 710, 180, 180, 3, 0),
      new simpleEnemy(90, 630, 460, 460, 3, 0),
      new simpleEnemy(250, 630, 260, 260, 3, 0),
      new simpleEnemy(330, 710, 380, 380, 3, 0),
      new simpleEnemy(340, 340, 510, 130, 0, 3),
      new simpleEnemy(620, 620, 510, 130, 0, 3),
    ],
  
    // level 18
    [
      new simpleEnemy(260, 260, 210, 390, 0, 6),
      new simpleEnemy(300, 300, 390, 210, 0, 6),
      new simpleEnemy(340, 340, 210, 390, 0, 6),
      new simpleEnemy(380, 380, 390, 210, 0, 6),
      new simpleEnemy(420, 420, 210, 390, 0, 6),
      new simpleEnemy(460, 460, 390, 210, 0, 6),
      new simpleEnemy(500, 500, 210, 390, 0, 6),
      new simpleEnemy(540, 540, 390, 210, 0, 6),
    ],
  
    // level 19
    [
      new simpleEnemy(220, 220, 210, 390, 0, 5),
      new simpleEnemy(260, 260, 390, 210, 0, 5),
      new simpleEnemy(300, 300, 210, 390, 0, 5),
      new simpleEnemy(340, 340, 390, 210, 0, 5),
      new simpleEnemy(380, 380, 210, 390, 0, 5),
      new simpleEnemy(420, 420, 390, 210, 0, 5),
      new simpleEnemy(460, 460, 210, 390, 0, 5),
      new simpleEnemy(500, 500, 390, 210, 0, 5),
      new simpleEnemy(540, 540, 210, 390, 0, 5),
      new simpleEnemy(580, 580, 390, 210, 0, 5),
      new linearEnemy([
        [210, 380, 210, 390, 5, 5],
        [380, 540, 390, 210, 5, 5],
        [540, 590, 210, 260, 5, 5],
        [590, 460, 260, 390, 5, 5],
        [460, 300, 390, 210, 5, 5],
        [300, 210, 210, 300, 5, 5],
        [210, 300, 300, 390, 5, 5],
        [300, 460, 390, 210, 5, 5],
        [460, 590, 210, 340, 5, 5],
        [590, 540, 340, 390, 5, 5],
        [540, 380, 390, 210, 5, 5],
        [380, 210, 210, 390, 5, 5],
        [210, 380, 390, 210, 5, 5],
        [380, 540, 210, 390, 5, 5],
        [540, 590, 390, 340, 5, 5],
        [590, 460, 340, 210, 5, 5],
        [460, 300, 210, 390, 5, 5],
        [300, 210, 390, 300, 5, 5],
        [210, 300, 300, 210, 5, 5],
        [300, 460, 210, 390, 5, 5],
        [460, 590, 390, 260, 5, 5],
        [590, 540, 260, 210, 5, 5],
        [540, 380, 210, 390, 5, 5],
        [380, 210, 390, 210, 5, 5],
      ]),
      new linearEnemy([
        [210, 380, 390, 210, 5, 5],
        [380, 540, 210, 390, 5, 5],
        [540, 590, 390, 340, 5, 5],
        [590, 460, 340, 210, 5, 5],
        [460, 300, 210, 390, 5, 5],
        [300, 210, 390, 300, 5, 5],
        [210, 300, 300, 210, 5, 5],
        [300, 460, 210, 390, 5, 5],
        [460, 590, 390, 260, 5, 5],
        [590, 540, 260, 210, 5, 5],
        [540, 380, 210, 390, 5, 5],
        [380, 210, 390, 210, 5, 5],
        [210, 380, 210, 390, 5, 5],
        [380, 540, 390, 210, 5, 5],
        [540, 590, 210, 260, 5, 5],
        [590, 460, 260, 390, 5, 5],
        [460, 300, 390, 210, 5, 5],
        [300, 210, 210, 300, 5, 5],
        [210, 300, 300, 390, 5, 5],
        [300, 460, 390, 210, 5, 5],
        [460, 590, 210, 340, 5, 5],
        [590, 540, 340, 390, 5, 5],
        [540, 380, 390, 210, 5, 5],
        [380, 210, 210, 390, 5, 5],
      ]),
    ],
  
    // level 20
    [
      new simpleEnemy(220, 220, 170, 390, 0, 2.4),
      new simpleEnemy(340, 340, 170, 390, 0, 2.4),
      new simpleEnemy(460, 460, 170, 390, 0, 2.4),
      new simpleEnemy(580, 580, 170, 390, 0, 2.4),
      new simpleEnemy(700, 700, 170, 390, 0, 2.4),
      new simpleEnemy(350, 210, 180, 180, 2.4, 0),
      new simpleEnemy(350, 210, 300, 300, 2.4, 0),
      new simpleEnemy(590, 450, 180, 180, 2.4, 0),
      new simpleEnemy(590, 450, 300, 300, 2.4, 0),
      new simpleEnemy(470, 330, 260, 260, 2.4, 0),
      new simpleEnemy(470, 330, 380, 380, 2.4, 0),
      new simpleEnemy(710, 570, 260, 260, 2.4, 0),
      new simpleEnemy(710, 570, 380, 380, 2.4, 0),
    ],
  
    // level 21
    [
      new simpleEnemy(180, 180, 130, 470, 0, 9),
      new simpleEnemy(220, 220, 130, 470, 0, 6),
      new simpleEnemy(260, 260, 130, 470, 0, 3),
      new simpleEnemy(300, 300, 130, 470, 0, 9),
      new simpleEnemy(340, 340, 130, 470, 0, 6),
      new simpleEnemy(380, 380, 130, 470, 0, 3),
      new simpleEnemy(420, 420, 130, 470, 0, 9),
      new simpleEnemy(460, 460, 130, 470, 0, 6),
      new simpleEnemy(500, 500, 130, 470, 0, 3),
      new simpleEnemy(540, 540, 130, 470, 0, 9),
      new simpleEnemy(580, 580, 130, 470, 0, 6),
      new simpleEnemy(620, 620, 130, 470, 0, 3),
    ],
  
    // level 22
    [
      new linearEnemy([
        [460, 660, 100, 100, 4.5, 0],
        [660, 660, 100, 140, 0, 4.5],
        [660, 460, 140, 140, 4.5, 0],
        [460, 460, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 140, 140, 4.5, 0],
        [460, 460, 140, 100, 0, 4.5],
        [460, 660, 100, 100, 4.5, 0],
        [660, 660, 100, 140, 0, 4.5],
      ]),
      new linearEnemy([
        [460, 660, 260, 260, 4.5, 0],
        [660, 660, 260, 300, 0, 4.5],
        [660, 460, 300, 300, 4.5, 0],
        [460, 460, 300, 260, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 300, 300, 4.5, 0],
        [460, 460, 300, 260, 0, 4.5],
        [460, 660, 260, 260, 4.5, 0],
        [660, 660, 260, 300, 0, 4.5],
      ]),
      new linearEnemy([
        [460, 660, 460, 460, 4.5, 0],
        [660, 660, 460, 500, 0, 4.5],
        [660, 460, 500, 500, 4.5, 0],
        [460, 460, 500, 460, 0, 4.5],
      ]),
      new linearEnemy([
        [660, 460, 500, 500, 4.5, 0],
        [460, 460, 500, 460, 0, 4.5],
        [460, 660, 460, 460, 4.5, 0],
        [660, 660, 460, 500, 0, 4.5],
      ]),
      new linearEnemy([
        [140, 340, 100, 100, 4.5, 0],
        [340, 340, 100, 140, 0, 4.5],
        [340, 140, 140, 140, 4.5, 0],
        [140, 140, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [340, 140, 140, 140, 4.5, 0],
        [140, 140, 140, 100, 0, 4.5],
        [140, 340, 100, 100, 4.5, 0],
        [340, 340, 100, 140, 0, 4.5],
      ]),
      new linearEnemy([
        [300, 300, 500, 300, 0, 4.5],
        [300, 340, 300, 300, 4.5, 0],
        [340, 340, 300, 500, 0, 4.5],
        [340, 300, 500, 500, 4.5, 0],
      ]),
      new linearEnemy([
        [340, 340, 300, 500, 0, 4.5],
        [340, 300, 500, 500, 4.5, 0],
        [300, 300, 500, 300, 0, 4.5],
        [300, 340, 300, 300, 4.5, 0],
      ]),
      new linearEnemy([
        [620, 620, 420, 340, 0, 4.5],
        [620, 660, 340, 340, 4.5, 0],
        [660, 660, 340, 420, 0, 4.5],
        [660, 620, 420, 420, 4.5, 0],
      ]),
      new linearEnemy([
        [460, 500, 180, 180, 4.5, 0],
        [500, 500, 180, 220, 0, 4.5],
        [500, 460, 220, 220, 4.5, 0],
        [460, 460, 220, 180, 0, 4.5],
      ]),
      new linearEnemy([
        [380, 420, 460, 460, 4.5, 0],
        [420, 420, 460, 500, 0, 4.5],
        [420, 380, 500, 500, 4.5, 0],
        [380, 380, 500, 460, 0, 4.5],
      ]),
      new linearEnemy([
        [300, 300, 260, 180, 0, 4.5],
        [300, 340, 180, 180, 4.5, 0],
        [340, 340, 180, 260, 0, 4.5],
        [340, 300, 260, 260, 4.5, 0],
      ]),
      new linearEnemy([
        [60, 100, 100, 100, 4.5, 0],
        [100, 100, 100, 140, 0, 4.5],
        [100, 60, 140, 140, 4.5, 0],
        [60, 60, 140, 100, 0, 4.5],
      ]),
      new linearEnemy([
        [60, 60, 260, 180, 0, 4.5],
        [60, 100, 180, 180, 4.5, 0],
        [100, 100, 180, 260, 0, 4.5],
        [100, 60, 260, 260, 4.5, 0],
      ]),
      new linearEnemy([
        [60, 60, 500, 300, 0, 4.5],
        [60, 100, 300, 300, 4.5, 0],
        [100, 100, 300, 500, 0, 4.5],
        [100, 60, 500, 500, 4.5, 0],
      ]),
      new linearEnemy([
        [100, 100, 300, 500, 0, 4.5],
        [100, 60, 500, 500, 4.5, 0],
        [60, 60, 500, 300, 0, 4.5],
        [60, 100, 300, 300, 4.5, 0],
      ]),
      new linearEnemy([
        [180, 260, 300, 300, 4.5, 0],
        [260, 260, 300, 340, 0, 4.5],
        [260, 180, 340, 340, 4.5, 0],
        [180, 180, 340, 300, 0, 4.5],
      ]),
    ],
  
    // level 23
    [
      new staticEnemy(400, 300),
      new reverseCircularEnemy(400, 300, 20, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 40, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 60, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 80, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 100, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 120, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 140, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 160, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 180, 0, 360, 1.9),
      new reverseCircularEnemy(400, 300, 200, 0, 360, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 40, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 60, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 80, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 100, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 120, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 140, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 160, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 180, 90, 450, 1.9),
      new reverseCircularEnemy(400, 300, 200, 90, 450, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 40, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 60, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 80, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 100, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 120, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 140, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 160, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 180, 180, 540, 1.9),
      new reverseCircularEnemy(400, 300, 200, 180, 540, 1.9),
  
      new reverseCircularEnemy(400, 300, 20, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 40, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 60, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 80, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 100, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 120, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 140, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 160, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 180, 270, 630, 1.9),
      new reverseCircularEnemy(400, 300, 200, 270, 630, 1.9),
    ],
  
    // level 24
    [
      new simpleEnemy(90, 710, 220, 220, 5, 0),
      new simpleEnemy(710, 90, 260, 260, 5, 0),
      new simpleEnemy(90, 710, 300, 300, 5, 0),
      new simpleEnemy(710, 90, 340, 340, 5, 0),
      new simpleEnemy(90, 710, 380, 380, 5, 0),
  
      new simpleEnemy(100, 100, 210, 390, 0, 5),
      new simpleEnemy(140, 140, 390, 210, 0, 5),
      new simpleEnemy(180, 180, 210, 390, 0, 5),
      new simpleEnemy(220, 220, 390, 210, 0, 5),
      new simpleEnemy(260, 260, 210, 390, 0, 5),
      new simpleEnemy(300, 300, 390, 210, 0, 5),
      new simpleEnemy(340, 340, 210, 390, 0, 5),
      new simpleEnemy(380, 380, 390, 210, 0, 5),
      new simpleEnemy(420, 420, 210, 390, 0, 5),
      new simpleEnemy(460, 460, 390, 210, 0, 5),
      new simpleEnemy(500, 500, 210, 390, 0, 5),
      new simpleEnemy(540, 540, 390, 210, 0, 5),
      new simpleEnemy(580, 580, 210, 390, 0, 5),
      new simpleEnemy(620, 620, 390, 210, 0, 5),
      new simpleEnemy(660, 660, 210, 390, 0, 5),
      new simpleEnemy(700, 700, 390, 210, 0, 5),
    ],
  
    // level 25
    [
      new staticEnemy(120, 440),
      new simpleCircularEnemy(120, 440, 20, 0, -3.75),
      new simpleCircularEnemy(120, 440, 40, 0, -3.75),
      new simpleCircularEnemy(120, 440, 60, 0, -3.75),
      new simpleCircularEnemy(120, 440, 80, 0, -3.75),
      new simpleCircularEnemy(120, 440, 20, 180, -3.75),
      new simpleCircularEnemy(120, 440, 40, 180, -3.75),
      new simpleCircularEnemy(120, 440, 60, 180, -3.75),
      new simpleCircularEnemy(120, 440, 80, 180, -3.75),
  
      new simpleEnemy(50, 110, 180, 180, 2.5, 0),
      new simpleEnemy(130, 190, 180, 180, 2.5, 0),
      new simpleEnemy(50, 110, 200, 200, 2.5, 0),
      new simpleEnemy(130, 190, 200, 200, 2.5, 0),
      new simpleEnemy(50, 110, 220, 220, 2.5, 0),
      new simpleEnemy(130, 190, 220, 220, 2.5, 0),
      new simpleEnemy(50, 110, 240, 240, 2.5, 0),
      new simpleEnemy(130, 190, 240, 240, 2.5, 0),
      new simpleEnemy(50, 110, 260, 260, 2.5, 0),
      new simpleEnemy(130, 190, 260, 260, 2.5, 0),
      new simpleEnemy(50, 110, 280, 280, 2.5, 0),
      new simpleEnemy(130, 190, 280, 280, 2.5, 0),
      new simpleEnemy(50, 110, 300, 300, 2.5, 0),
      new simpleEnemy(130, 190, 300, 300, 2.5, 0),
      new simpleEnemy(50, 110, 320, 320, 2.5, 0),
      new simpleEnemy(130, 190, 320, 320, 2.5, 0),
      new simpleEnemy(50, 110, 340, 340, 2.5, 0),
      new simpleEnemy(130, 190, 340, 340, 2.5, 0),
      new simpleEnemy(50, 110, 360, 360, 2.5, 0),
      new simpleEnemy(130, 190, 360, 360, 2.5, 0),
      new simpleEnemy(50, 110, 380, 380, 2.5, 0),
      new simpleEnemy(130, 190, 380, 380, 2.5, 0),
  
      new simpleEnemy(180, 180, 430, 370, 0, 2.5),
      new simpleEnemy(180, 180, 510, 450, 0, 2.5),
      new simpleEnemy(200, 200, 430, 370, 0, 2.5),
      new simpleEnemy(200, 200, 510, 450, 0, 2.5),
      new simpleEnemy(220, 220, 430, 370, 0, 2.5),
      new simpleEnemy(220, 220, 510, 450, 0, 2.5),
      new simpleEnemy(240, 240, 430, 370, 0, 2.5),
      new simpleEnemy(240, 240, 510, 450, 0, 2.5),
      new simpleEnemy(260, 260, 430, 370, 0, 2.5),
      new simpleEnemy(260, 260, 510, 450, 0, 2.5),
      new simpleEnemy(280, 280, 430, 370, 0, 2.5),
      new simpleEnemy(280, 280, 510, 450, 0, 2.5),
      new simpleEnemy(300, 300, 430, 370, 0, 2.5),
      new simpleEnemy(300, 300, 510, 450, 0, 2.5),
      new simpleEnemy(320, 320, 430, 370, 0, 2.5),
      new simpleEnemy(320, 320, 510, 450, 0, 2.5),
      new simpleEnemy(340, 340, 430, 370, 0, 2.5),
      new simpleEnemy(340, 340, 510, 450, 0, 2.5),
      new simpleEnemy(360, 360, 430, 370, 0, 2.5),
      new simpleEnemy(360, 360, 510, 450, 0, 2.5),
      new simpleEnemy(380, 380, 430, 370, 0, 2.5),
      new simpleEnemy(380, 380, 510, 450, 0, 2.5),
      new simpleEnemy(400, 400, 510, 450, 0, 2.5),
      new simpleEnemy(420, 420, 510, 450, 0, 2.5),
      new simpleEnemy(440, 440, 510, 450, 0, 2.5),
      new simpleEnemy(460, 460, 430, 370, 0, 2.5),
      new simpleEnemy(460, 460, 510, 450, 0, 2.5),
      new simpleEnemy(480, 480, 430, 370, 0, 2.5),
      new simpleEnemy(480, 480, 510, 450, 0, 2.5),
      new simpleEnemy(500, 500, 430, 370, 0, 2.5),
      new simpleEnemy(500, 500, 510, 450, 0, 2.5),
      new simpleEnemy(520, 520, 430, 370, 0, 2.5),
      new simpleEnemy(520, 520, 510, 450, 0, 2.5),
      new simpleEnemy(540, 540, 430, 370, 0, 2.5),
      new simpleEnemy(540, 540, 510, 450, 0, 2.5),
      new simpleEnemy(560, 560, 430, 370, 0, 2.5),
      new simpleEnemy(560, 560, 510, 450, 0, 2.5),
      new simpleEnemy(580, 580, 430, 370, 0, 2.5),
      new simpleEnemy(580, 580, 510, 450, 0, 2.5),
      new simpleEnemy(600, 600, 430, 370, 0, 2.5),
      new simpleEnemy(600, 600, 510, 450, 0, 2.5),
      new simpleEnemy(620, 620, 430, 370, 0, 2.5),
      new simpleEnemy(620, 620, 510, 450, 0, 2.5),
      new simpleEnemy(640, 640, 430, 370, 0, 2.5),
      new simpleEnemy(640, 640, 510, 450, 0, 2.5),
      new simpleEnemy(660, 660, 430, 370, 0, 2.5),
      new simpleEnemy(660, 660, 510, 450, 0, 2.5),
    ],
  
    // level 26
    [
      new simpleEnemy(340, 340, 390, 250, 0, 6),
      new simpleEnemy(300, 300, 210, 350, 0, 6),
      new simpleEnemy(260, 260, 310, 170, 0, 6),
      new simpleEnemy(220, 220, 130, 270, 0, 6),
      new simpleEnemy(180, 180, 230, 90, 0, 6),
  
      new simpleEnemy(460, 460, 390, 250, 0, 6),
      new simpleEnemy(500, 500, 210, 350, 0, 6),
      new simpleEnemy(540, 540, 310, 170, 0, 6),
      new simpleEnemy(580, 580, 130, 270, 0, 6),
      new simpleEnemy(620, 620, 230, 90, 0, 6),
  
      new simpleEnemy(60, 60, 510, 370, 0, 6),
      new simpleEnemy(100, 100, 370, 510, 0, 6),
      new simpleEnemy(140, 140, 510, 370, 0, 6),
      new simpleEnemy(180, 180, 370, 510, 0, 6),
      new simpleEnemy(220, 220, 510, 370, 0, 6),
      new simpleEnemy(260, 260, 370, 510, 0, 6),
      new simpleEnemy(300, 300, 510, 370, 0, 6),
  
      new simpleEnemy(500, 500, 510, 370, 0, 6),
      new simpleEnemy(540, 540, 370, 510, 0, 6),
      new simpleEnemy(580, 580, 510, 370, 0, 6),
      new simpleEnemy(620, 620, 370, 510, 0, 6),
      new simpleEnemy(660, 660, 510, 370, 0, 6),
      new simpleEnemy(700, 700, 370, 510, 0, 6),
      new simpleEnemy(740, 740, 510, 370, 0, 6),
    ],
  
    // level 27
    [
      new simpleEnemy(180, 180, 130, 250, 0, 1.5),
      new simpleEnemy(180, 180, 150, 270, 0, 1.5),
      new simpleEnemy(180, 180, 170, 290, 0, 1.5),
      new simpleEnemy(180, 180, 190, 310, 0, 1.5),
      new simpleEnemy(180, 180, 290, 410, 0, 1.5),
      new simpleEnemy(180, 180, 310, 430, 0, 1.5),
      new simpleEnemy(180, 180, 330, 450, 0, 1.5),
      new simpleEnemy(180, 180, 350, 470, 0, 1.5),
  
      new simpleEnemy(220, 220, 130, 230, 0, 2),
      new simpleEnemy(220, 220, 250, 350, 0, 2),
      new simpleEnemy(220, 220, 370, 470, 0, 2),
  
      new simpleEnemy(260, 260, 130, 350, 0, 3),
      new simpleEnemy(260, 260, 150, 370, 0, 3),
      new simpleEnemy(260, 260, 170, 390, 0, 3),
      new simpleEnemy(260, 260, 190, 410, 0, 3),
      new simpleEnemy(260, 260, 210, 430, 0, 3),
      new simpleEnemy(260, 260, 230, 450, 0, 3),
      new simpleEnemy(260, 260, 250, 470, 0, 3),
  
      new simpleEnemy(300, 300, 250, 130, 0, 1.5),
      new simpleEnemy(300, 300, 270, 150, 0, 1.5),
      new simpleEnemy(300, 300, 290, 170, 0, 1.5),
      new simpleEnemy(300, 300, 310, 190, 0, 1.5),
      new simpleEnemy(300, 300, 410, 290, 0, 1.5),
      new simpleEnemy(300, 300, 430, 310, 0, 1.5),
      new simpleEnemy(300, 300, 450, 330, 0, 1.5),
      new simpleEnemy(300, 300, 470, 350, 0, 1.5),
  
      new simpleEnemy(340, 340, 230, 130, 0, 2),
      new simpleEnemy(340, 340, 350, 250, 0, 2),
      new simpleEnemy(340, 340, 470, 370, 0, 2),
  
      new simpleEnemy(380, 380, 350, 130, 0, 3),
      new simpleEnemy(380, 380, 370, 150, 0, 3),
      new simpleEnemy(380, 380, 390, 170, 0, 3),
      new simpleEnemy(380, 380, 410, 190, 0, 3),
      new simpleEnemy(380, 380, 430, 210, 0, 3),
      new simpleEnemy(380, 380, 450, 230, 0, 3),
      new simpleEnemy(380, 380, 470, 250, 0, 3),
  
      new simpleEnemy(420, 420, 130, 350, 0, 3),
      new simpleEnemy(420, 420, 150, 370, 0, 3),
      new simpleEnemy(420, 420, 170, 390, 0, 3),
      new simpleEnemy(420, 420, 190, 410, 0, 3),
      new simpleEnemy(420, 420, 210, 430, 0, 3),
      new simpleEnemy(420, 420, 230, 450, 0, 3),
      new simpleEnemy(420, 420, 250, 470, 0, 3),
  
      new simpleEnemy(460, 460, 130, 230, 0, 2),
      new simpleEnemy(460, 460, 250, 350, 0, 2),
      new simpleEnemy(460, 460, 370, 470, 0, 2),
  
      new simpleEnemy(500, 500, 130, 250, 0, 1.5),
      new simpleEnemy(500, 500, 150, 270, 0, 1.5),
      new simpleEnemy(500, 500, 170, 290, 0, 1.5),
      new simpleEnemy(500, 500, 190, 310, 0, 1.5),
      new simpleEnemy(500, 500, 290, 410, 0, 1.5),
      new simpleEnemy(500, 500, 310, 430, 0, 1.5),
      new simpleEnemy(500, 500, 330, 450, 0, 1.5),
      new simpleEnemy(500, 500, 350, 470, 0, 1.5),
  
      new simpleEnemy(540, 540, 230, 130, 0, 2),
      new simpleEnemy(540, 540, 350, 250, 0, 2),
      new simpleEnemy(540, 540, 470, 370, 0, 2),
  
      new simpleEnemy(580, 580, 350, 130, 0, 3),
      new simpleEnemy(580, 580, 370, 150, 0, 3),
      new simpleEnemy(580, 580, 390, 170, 0, 3),
      new simpleEnemy(580, 580, 410, 190, 0, 3),
      new simpleEnemy(580, 580, 430, 210, 0, 3),
      new simpleEnemy(580, 580, 450, 230, 0, 3),
      new simpleEnemy(580, 580, 470, 250, 0, 3),
  
      new simpleEnemy(620, 620, 130, 230, 0, 2),
      new simpleEnemy(620, 620, 250, 350, 0, 2),
      new simpleEnemy(620, 620, 370, 470, 0, 2),
    ],
  
    // level 28
    [
      new simpleEnemy(140, 140, 330, 510, 0, 5),
      new simpleEnemy(180, 180, 510, 330, 0, 5),
      new simpleEnemy(220, 220, 330, 510, 0, 5),
      new simpleEnemy(260, 260, 510, 330, 0, 5),
      new simpleEnemy(300, 300, 330, 510, 0, 5),
      new simpleEnemy(340, 340, 510, 330, 0, 5),
      new simpleEnemy(380, 380, 330, 510, 0, 5),
      new simpleEnemy(420, 420, 510, 330, 0, 5),
      new simpleEnemy(460, 460, 330, 510, 0, 5),
      new simpleEnemy(500, 500, 510, 330, 0, 5),
      new simpleEnemy(540, 540, 330, 510, 0, 5),
      new simpleEnemy(580, 580, 510, 330, 0, 5),
      new simpleEnemy(620, 620, 330, 510, 0, 5),
      new simpleEnemy(660, 660, 510, 330, 0, 5),
      new simpleEnemy(700, 700, 330, 510, 0, 5),
  
      new simpleEnemy(140, 140, 270, 90, 0, 5),
      new simpleEnemy(180, 180, 90, 270, 0, 5),
      new simpleEnemy(220, 220, 270, 90, 0, 5),
      new simpleEnemy(260, 260, 90, 270, 0, 5),
      new simpleEnemy(300, 300, 270, 90, 0, 5),
      new simpleEnemy(340, 340, 90, 270, 0, 5),
      new simpleEnemy(380, 380, 270, 90, 0, 5),
      new simpleEnemy(420, 420, 90, 270, 0, 5),
      new simpleEnemy(460, 460, 270, 90, 0, 5),
      new simpleEnemy(500, 500, 90, 270, 0, 5),
      new simpleEnemy(540, 540, 270, 90, 0, 5),
      new simpleEnemy(580, 580, 90, 270, 0, 5),
      new simpleEnemy(620, 620, 270, 90, 0, 5),
      new simpleEnemy(660, 660, 90, 270, 0, 5),
      new simpleEnemy(700, 700, 270, 90, 0, 5),
  
      new simpleEnemy(310, 130, 500, 500, 5, 0),
      new simpleEnemy(310, 130, 460, 460, 5, 0),
      new simpleEnemy(310, 130, 420, 420, 5, 0),
      new simpleEnemy(310, 130, 380, 380, 5, 0),
  
      new simpleEnemy(510, 330, 460, 460, 5, 0),
      new simpleEnemy(510, 330, 420, 420, 5, 0),
      new simpleEnemy(510, 330, 380, 380, 5, 0),
      new simpleEnemy(510, 330, 340, 340, 5, 0),
  
      new simpleEnemy(710, 530, 500, 500, 5, 0),
      new simpleEnemy(710, 530, 460, 460, 5, 0),
      new simpleEnemy(710, 530, 420, 420, 5, 0),
      new simpleEnemy(710, 530, 380, 380, 5, 0),
  
      new simpleEnemy(310, 130, 260, 260, 5, 0),
      new simpleEnemy(310, 130, 180, 180, 5, 0),
      new simpleEnemy(310, 130, 140, 140, 5, 0),
      new simpleEnemy(310, 130, 100, 100, 5, 0),
  
      new simpleEnemy(510, 330, 260, 260, 5, 0),
      new simpleEnemy(510, 330, 220, 220, 5, 0),
      new simpleEnemy(510, 330, 180, 180, 5, 0),
      new simpleEnemy(510, 330, 100, 100, 5, 0),
  
      new simpleEnemy(710, 530, 260, 260, 5, 0),
      new simpleEnemy(710, 530, 180, 180, 5, 0),
      new simpleEnemy(710, 530, 140, 140, 5, 0),
      new simpleEnemy(710, 530, 100, 100, 5, 0),
    ],
  
    // level 29
    [
      new simpleEnemy(90, 710, 220, 220, 6, 0),
      new simpleEnemy(710, 90, 260, 260, 6, 0),
      new simpleEnemy(90, 710, 300, 300, 6, 0),
      new simpleEnemy(710, 90, 340, 340, 6, 0),
      new simpleEnemy(90, 710, 380, 380, 6, 0),
      new simpleEnemy(710, 90, 420, 420, 6, 0),
      new simpleEnemy(90, 710, 460, 460, 6, 0),
  
      new simpleEnemy(100, 100, 210, 470, 0, 6),
      new simpleEnemy(140, 140, 470, 210, 0, 6),
      new simpleEnemy(180, 180, 210, 470, 0, 6),
      new simpleEnemy(220, 220, 470, 210, 0, 6),
      new simpleEnemy(260, 260, 210, 470, 0, 6),
      new simpleEnemy(300, 300, 470, 210, 0, 6),
      new simpleEnemy(340, 340, 210, 470, 0, 6),
      new simpleEnemy(380, 380, 470, 210, 0, 6),
      new simpleEnemy(420, 420, 210, 470, 0, 6),
      new simpleEnemy(460, 460, 470, 210, 0, 6),
      new simpleEnemy(500, 500, 210, 470, 0, 6),
      new simpleEnemy(540, 540, 470, 210, 0, 6),
      new simpleEnemy(580, 580, 210, 470, 0, 6),
      new simpleEnemy(620, 620, 470, 210, 0, 6),
      new simpleEnemy(660, 660, 210, 470, 0, 6),
      new simpleEnemy(700, 700, 470, 210, 0, 6),
    ],
  
    // level 30
    [
      new simpleEnemy(60, 60, 90, 430, 0, 2),
      new simpleEnemy(100, 100, 430, 90, 0, 2),
      new simpleEnemy(140, 140, 90, 430, 0, 2),
      new simpleEnemy(180, 180, 430, 90, 0, 2),
      new simpleEnemy(220, 220, 90, 430, 0, 2),
      new simpleEnemy(260, 260, 430, 90, 0, 2),
      new simpleEnemy(300, 300, 90, 430, 0, 2),
      new simpleEnemy(340, 340, 430, 90, 0, 2),
      new simpleEnemy(380, 380, 90, 430, 0, 2),
      new simpleEnemy(420, 420, 430, 90, 0, 2),
      new simpleEnemy(460, 460, 90, 430, 0, 2),
      new simpleEnemy(500, 500, 430, 90, 0, 2),
      new simpleEnemy(540, 540, 90, 430, 0, 2),
      new simpleEnemy(580, 580, 430, 90, 0, 2),
      new simpleEnemy(620, 620, 90, 430, 0, 2),
      new simpleEnemy(660, 660, 430, 90, 0, 2),
      new simpleEnemy(700, 700, 90, 430, 0, 2),
      new simpleEnemy(740, 740, 430, 90, 0, 2),
      new linearEnemy([
        [60, 700, 100, 100, 5.5, 0],
        [700, 700, 100, 380, 0, 5.5],
        [700, 60, 380, 380, 5.5, 0],
        [60, 60, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 100, 100, 5.5, 0],
        [720, 720, 100, 380, 0, 5.5],
        [720, 80, 380, 380, 5.5, 0],
        [80, 80, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 100, 100, 5.5, 0],
        [740, 740, 100, 380, 0, 5.5],
        [740, 100, 380, 380, 5.5, 0],
        [100, 100, 380, 100, 0, 5.5],
      ]),
      new linearEnemy([
        [60, 700, 120, 120, 5.5, 0],
        [700, 700, 120, 400, 0, 5.5],
        [700, 60, 400, 400, 5.5, 0],
        [60, 60, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 120, 120, 5.5, 0],
        [720, 720, 120, 400, 0, 5.5],
        [720, 80, 400, 400, 5.5, 0],
        [80, 80, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 120, 120, 5.5, 0],
        [740, 740, 120, 400, 0, 5.5],
        [740, 100, 400, 400, 5.5, 0],
        [100, 100, 400, 120, 0, 5.5],
      ]),
      new linearEnemy([
        [60, 700, 140, 140, 5.5, 0],
        [700, 700, 140, 420, 0, 5.5],
        [700, 60, 420, 420, 5.5, 0],
        [60, 60, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [80, 720, 140, 140, 5.5, 0],
        [720, 720, 140, 420, 0, 5.5],
        [720, 80, 420, 420, 5.5, 0],
        [80, 80, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [100, 740, 140, 140, 5.5, 0],
        [740, 740, 140, 420, 0, 5.5],
        [740, 100, 420, 420, 5.5, 0],
        [100, 100, 420, 140, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 380, 380, 5.5, 0],
        [60, 60, 380, 100, 0, 5.5],
        [60, 700, 100, 100, 5.5, 0],
        [700, 700, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 380, 380, 5.5, 0],
        [80, 80, 380, 100, 0, 5.5],
        [80, 720, 100, 100, 5.5, 0],
        [720, 720, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 380, 380, 5.5, 0],
        [100, 100, 380, 100, 0, 5.5],
        [100, 740, 100, 100, 5.5, 0],
        [740, 740, 100, 380, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 400, 400, 5.5, 0],
        [60, 60, 400, 120, 0, 5.5],
        [60, 700, 120, 120, 5.5, 0],
        [700, 700, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 400, 400, 5.5, 0],
        [80, 80, 400, 120, 0, 5.5],
        [80, 720, 120, 120, 5.5, 0],
        [720, 720, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 400, 400, 5.5, 0],
        [100, 100, 400, 120, 0, 5.5],
        [100, 740, 120, 120, 5.5, 0],
        [740, 740, 120, 400, 0, 5.5],
      ]),
      new linearEnemy([
        [700, 60, 420, 420, 5.5, 0],
        [60, 60, 420, 140, 0, 5.5],
        [60, 700, 140, 140, 5.5, 0],
        [700, 700, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [720, 80, 420, 420, 5.5, 0],
        [80, 80, 420, 140, 0, 5.5],
        [80, 720, 140, 140, 5.5, 0],
        [720, 720, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [740, 100, 420, 420, 5.5, 0],
        [100, 100, 420, 140, 0, 5.5],
        [100, 740, 140, 140, 5.5, 0],
        [740, 740, 140, 420, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 180, 180, 5.5, 0],
        [620, 620, 180, 300, 0, 5.5],
        [620, 140, 300, 300, 5.5, 0],
        [140, 140, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 180, 180, 5.5, 0],
        [640, 640, 180, 300, 0, 5.5],
        [640, 160, 300, 300, 5.5, 0],
        [160, 160, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 180, 180, 5.5, 0],
        [660, 660, 180, 300, 0, 5.5],
        [660, 180, 300, 300, 5.5, 0],
        [180, 180, 300, 180, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 200, 200, 5.5, 0],
        [620, 620, 200, 320, 0, 5.5],
        [620, 140, 320, 320, 5.5, 0],
        [140, 140, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 200, 200, 5.5, 0],
        [640, 640, 200, 320, 0, 5.5],
        [640, 160, 320, 320, 5.5, 0],
        [160, 160, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 200, 200, 5.5, 0],
        [660, 660, 200, 320, 0, 5.5],
        [660, 180, 320, 320, 5.5, 0],
        [180, 180, 320, 200, 0, 5.5],
      ]),
      new linearEnemy([
        [140, 620, 220, 220, 5.5, 0],
        [620, 620, 220, 340, 0, 5.5],
        [620, 140, 340, 340, 5.5, 0],
        [140, 140, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [160, 640, 220, 220, 5.5, 0],
        [640, 640, 220, 340, 0, 5.5],
        [640, 160, 340, 340, 5.5, 0],
        [160, 160, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [180, 660, 220, 220, 5.5, 0],
        [660, 660, 220, 340, 0, 5.5],
        [660, 180, 340, 340, 5.5, 0],
        [180, 180, 340, 220, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 300, 300, 5.5, 0],
        [140, 140, 300, 180, 0, 5.5],
        [140, 620, 180, 180, 5.5, 0],
        [620, 620, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 300, 300, 5.5, 0],
        [160, 160, 300, 180, 0, 5.5],
        [160, 640, 180, 180, 5.5, 0],
        [640, 640, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 300, 300, 5.5, 0],
        [180, 180, 300, 180, 0, 5.5],
        [180, 660, 180, 180, 5.5, 0],
        [660, 660, 180, 300, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 320, 320, 5.5, 0],
        [140, 140, 320, 200, 0, 5.5],
        [140, 620, 200, 200, 5.5, 0],
        [620, 620, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 320, 320, 5.5, 0],
        [160, 160, 320, 200, 0, 5.5],
        [160, 640, 200, 200, 5.5, 0],
        [640, 640, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 320, 320, 5.5, 0],
        [180, 180, 320, 200, 0, 5.5],
        [180, 660, 200, 200, 5.5, 0],
        [660, 660, 200, 320, 0, 5.5],
      ]),
      new linearEnemy([
        [620, 140, 340, 340, 5.5, 0],
        [140, 140, 340, 220, 0, 5.5],
        [140, 620, 220, 220, 5.5, 0],
        [620, 620, 220, 340, 0, 5.5],
      ]),
      new linearEnemy([
        [640, 160, 340, 340, 5.5, 0],
        [160, 160, 340, 220, 0, 5.5],
        [160, 640, 220, 220, 5.5, 0],
        [640, 640, 220, 340, 0, 5.5],
      ]),
      new linearEnemy([
        [660, 180, 340, 340, 5.5, 0],
        [180, 180, 340, 220, 0, 5.5],
        [180, 660, 220, 220, 5.5, 0],
        [660, 660, 220, 340, 0, 5.5],
      ]),
      new simpleEnemy(210, 570, 250, 250, 5.5, 0),
      new simpleEnemy(230, 590, 250, 250, 5.5, 0),
      new simpleEnemy(210, 570, 270, 270, 5.5, 0),
      new simpleEnemy(230, 590, 270, 270, 5.5, 0),
    ],
  ];
  
  function staticEnemy(x, y, enemyType) {
    if (enemyType == null) enemyType = "static";
    this.x = x;
    this.y = y;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.enemyType = enemyType;
  }
  
  function simpleEnemy(startX, endX, startY, endY, xSpeed, ySpeed, stage, enemyType) {
    if (enemyType == null) enemyType = "simple";
    if (stage == null) stage = 0;
    this.x = startX;
    this.y = startY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.startX = startX;
    this.endX = endX;
    this.startY = startY;
    this.endY = endY;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function linearEnemy(movement, stage, enemyType) {
    if (enemyType == null) enemyType = "linear";
  
    if (stage == null) stage = 0;
  
    this.x = movement[0][0];
    this.y = movement[0][2];
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.movement = movement;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function simpleCircularEnemy(centerX, centerY, radius, startAngle, speed, angle, enemyType) {
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "simpleCircular";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.speed = speed;
    this.startAngle = startAngle;
    this.angle = startAngle;
    this.enemyType = enemyType;
  }
  
  function pauseCircularEnemy_1_4(centerX, centerY, radius, startAngle, endAngle, speed, pauseTotal, stage, angle, enemyType) {
    if (stage == null) stage = 0;
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "pauseCircular_1_4";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speed = speed;
    this.pauseTotal = pauseTotal;
    this.pauseTimer = 0;
    this.angle = startAngle;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function reverseCircularEnemy(centerX, centerY, radius, startAngle, endAngle, speed, stage, angle, enemyType) {
    if (stage == null) stage = 0;
    if (angle == null) angle = startAngle;
    if (enemyType == null) enemyType = "reverseCircular";
  
    this.x = radius * Math.cos(angle * (Math.PI / 180)) + centerX;
    this.y = radius * Math.sin(angle * (Math.PI / 180)) + centerY;
    this.simpleX = this.x / 40;
    this.simpleY = this.y / 40;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speed = speed;
    this.angle = startAngle;
    this.stage = stage;
    this.enemyType = enemyType;
  }
  
  function resetEnemies(l) {
    for (var i = 0; i < enemies[l].length; i++) {
      if (enemies[l][i].enemyType == "simple") {
        enemies[l][i].x = enemies[l][i].startX;
        enemies[l][i].y = enemies[l][i].startY;
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
        enemies[l][i].stage = 0;
      } else if (enemies[l][i].enemyType == "linear") {
        enemies[l][i].x = enemies[l][i].movement[0][0];
        enemies[l][i].y = enemies[l][i].movement[0][2];
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
        enemies[l][i].stage = 0;
      } else if (enemies[l][i].enemyType == "simpleCircular") {
        enemies[l][i].angle = enemies[l][i].startAngle;
        enemies[l][i].x = enemies[l][i].radius * Math.cos(enemies[l][i].angle * (Math.PI / 180)) + enemies[l][i].centerX;
        enemies[l][i].y = enemies[l][i].radius * Math.sin(enemies[l][i].angle * (Math.PI / 180)) + enemies[l][i].centerY;
        enemies[l][i].simpleX = enemies[l][i].x / 40;
        enemies[l][i].simpleY = enemies[l][i].y / 40;
      }
    }
  }
  
  function drawEnemies() {
    if (state == "game") {
      // colors
      var enemyFillColor, enemyOutlineColor;
      if (level >= WALLS_RED) {
        enemyFillColor = ENEMY_FILL_COLOR_2;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_2;
      } else if (level >= WALLS_PURPLE) {
        enemyFillColor = ENEMY_FILL_COLOR_1;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_1;
      } else {
        enemyFillColor = ENEMY_FILL_COLOR_0;
        enemyOutlineColor = ENEMY_OUTLINE_COLOR_0;
      }
  
      for (var i = 0; i < enemies[level].length; i++) {
        canvas.beginPath();
        canvas.arc(cwh(enemies[level][i].x) + os.x, cwh(enemies[level][i].y) + os.y, cwh(ENEMY_SIZE) / 2, 0, 2 * Math.PI, false);
        canvas.fillStyle = enemyFillColor;
        canvas.fill();
        canvas.lineWidth = cwh(4);
        canvas.strokeStyle = enemyOutlineColor;
        canvas.stroke();
      }
    }
  }
  
  function updateEnemies() {
    if ((state == "game" || state == "level_select") && !paused && !player.dying) {
      // game
      if (state == "game") {
        for (var n = 0; n < enemies[level].length; n++) {
          updateSimpleEnemy(n);
          updateLinearEnemy(n);
          updateSimpleCircularEnemy(n);
          updatePauseCircularEnemy_1_4(n);
          updateReverseCircularEnemy(n);
        }
      }
  
      // level select
      else if (state == "level_select" && !mobile) {
        for (var i = 1; i < LS_ALL_TOT + 1; i++) {
          for (var n = 0; n < enemies[i].length; n++) {
            updateSimpleEnemy(n, i);
            updateLinearEnemy(n, i);
            updateSimpleCircularEnemy(n, i);
            updatePauseCircularEnemy_1_4(n, i);
            updateReverseCircularEnemy(n, i);
          }
        }
      }
    }
  }
  
  function updateSimpleCircularEnemy(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "simpleCircular") {
      var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
      var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
      e.x = newX + e.centerX;
      e.y = newY + e.centerY;
  
      e.angle += e.speed;
  
      e.simpleX = e.x / 40;
      e.simpleY = e.y / 40;
    }
  }
  
  function updateReverseCircularEnemy(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "reverseCircular") {
      if (e.stage == 0) {
        var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
        var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
        e.x = newX + e.centerX;
        e.y = newY + e.centerY;
  
        e.angle += e.speed;
  
        e.simpleX = e.x / 40;
        e.simpleY = e.y / 40;
  
        if (e.angle >= e.endAngle) {
          e.stage = 1;
          e.angle = e.endAngle;
        }
      } else if (e.stage == 1) {
        var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
        var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
        e.x = newX + e.centerX;
        e.y = newY + e.centerY;
  
        e.angle -= e.speed;
  
        e.simpleX = e.x / 40;
        e.simpleY = e.y / 40;
  
        if (e.angle <= e.startAngle) {
          e.stage = 0;
          e.angle = e.startAngle;
        }
      }
    }
  }
  
  function updatePauseCircularEnemy_1_4(n, l) {
    if (l == null) l = level;
    var e = enemies[l][n];
    if (e.enemyType == "pauseCircular_1_4") {
      if (e.stage == 0) {
        if (e.pauseTimer < e.pauseTotal) {
          e.pauseTimer++;
        } else {
          e.pauseTimer = 0;
          e.stage = 1;
        }
      } else {
        if (e.startAngle < e.endAngle) {
          if (e.angle < e.endAngle) {
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.angle += e.speed;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
          } else {
            e.angle = e.startAngle;
  
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
  
            e.pauseTimer = 0;
            e.stage = 0;
          }
        } else if (e.startAngle > e.endAngle) {
          if (e.angle > e.endAngle) {
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.angle -= e.speed;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
          } else {
            e.angle = e.startAngle;
  
            var newX = e.radius * Math.cos(e.angle * (Math.PI / 180));
            var newY = e.radius * Math.sin(e.angle * (Math.PI / 180));
  
            e.x = newX + e.centerX;
            e.y = newY + e.centerY;
  
            e.simpleX = e.x / 40;
            e.simpleY = e.y / 40;
  
            e.pauseTimer = 0;
            e.stage = 0;
          }
        }
      }
    }
  }
  
  function updateSimpleEnemy(n, l) {
    if (l == null) l = level;
    if (enemies[l][n].enemyType == "simple") {
      // stage 0
      if (enemies[l][n].stage == 0) {
        // x
        if (enemies[l][n].startX < enemies[l][n].endX) {
          if (enemies[l][n].x < enemies[l][n].endX) {
            enemies[l][n].x += enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x >= enemies[l][n].endX) {
            enemies[l][n].x = enemies[l][n].endX;
            enemies[l][n].stage = 1;
          }
        } else if (enemies[l][n].startX > enemies[l][n].endX) {
          if (enemies[l][n].x > enemies[l][n].endX) {
            enemies[l][n].x -= enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x <= enemies[l][n].endX) {
            enemies[l][n].x = enemies[l][n].endX;
            enemies[l][n].stage = 1;
          }
        }
  
        // y
        if (enemies[l][n].startY < enemies[l][n].endY) {
          if (enemies[l][n].y < enemies[l][n].endY) {
            enemies[l][n].y += enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y >= enemies[l][n].endY) {
            enemies[l][n].y = enemies[l][n].endY;
            enemies[l][n].stage = 1;
          }
        } else if (enemies[l][n].startY > enemies[l][n].endY) {
          if (enemies[l][n].y > enemies[l][n].endY) {
            enemies[l][n].y -= enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y <= enemies[l][n].endY) {
            enemies[l][n].y = enemies[l][n].endY;
            enemies[l][n].stage = 1;
          }
        }
      }
  
      // stage 1
      else if (enemies[l][n].stage == 1) {
        // x
        if (enemies[l][n].startX < enemies[l][n].endX) {
          if (enemies[l][n].x > enemies[l][n].startX) {
            enemies[l][n].x -= enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x <= enemies[l][n].startX) {
            enemies[l][n].x = enemies[l][n].startX;
            enemies[l][n].stage = 0;
          }
        } else if (enemies[l][n].startX > enemies[l][n].endX) {
          if (enemies[l][n].x < enemies[l][n].startX) {
            enemies[l][n].x += enemies[l][n].xSpeed;
          }
          if (enemies[l][n].x >= enemies[l][n].startX) {
            enemies[l][n].x = enemies[l][n].startX;
            enemies[l][n].stage = 0;
          }
        }
  
        // y
        if (enemies[l][n].startY < enemies[l][n].endY) {
          if (enemies[l][n].y > enemies[l][n].startY) {
            enemies[l][n].y -= enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y <= enemies[l][n].startY) {
            enemies[l][n].y = enemies[l][n].startY;
            enemies[l][n].stage = 0;
          }
        } else if (enemies[l][n].startY > enemies[l][n].endY) {
          if (enemies[l][n].y < enemies[l][n].startY) {
            enemies[l][n].y += enemies[l][n].ySpeed;
          }
          if (enemies[l][n].y >= enemies[l][n].startY) {
            enemies[l][n].y = enemies[l][n].startY;
            enemies[l][n].stage = 0;
          }
        }
      }
      enemies[l][n].simpleX = enemies[l][n].x / 40;
      enemies[l][n].simpleY = enemies[l][n].y / 40;
    }
  }
  
  function updateLinearEnemy(n, l) {
    if (l == null) l = level;
  
    if (enemies[l][n].enemyType == "linear") {
      var startX = enemies[l][n].movement[enemies[l][n].stage][0];
      var endX = enemies[l][n].movement[enemies[l][n].stage][1];
      var startY = enemies[l][n].movement[enemies[l][n].stage][2];
      var endY = enemies[l][n].movement[enemies[l][n].stage][3];
      var xSpeed = enemies[l][n].movement[enemies[l][n].stage][4];
      var ySpeed = enemies[l][n].movement[enemies[l][n].stage][5];
      var stages = enemies[l][n].movement.length;
      var changedStage = false;
  
      // x
      if (startX < endX) {
        if (enemies[l][n].x < endX) {
          enemies[l][n].x += xSpeed;
        }
        if (enemies[l][n].x >= endX) {
          enemies[l][n].x = endX;
          enemies[l][n].stage++;
          changedStage = true;
          if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
        }
      } else if (startX > endX) {
        if (enemies[l][n].x > endX) {
          enemies[l][n].x -= xSpeed;
        }
        if (enemies[l][n].x <= endX) {
          enemies[l][n].x = endX;
          enemies[l][n].stage++;
          changedStage = true;
          if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
        }
      }
  
      // y
      if (startY < endY) {
        if (enemies[l][n].y < endY) {
          enemies[l][n].y += ySpeed;
        }
        if (enemies[l][n].y >= endY) {
          enemies[l][n].y = endY;
          if (!changedStage) {
            enemies[l][n].stage++;
            if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
          }
        }
      } else if (startY > endY) {
        if (enemies[l][n].y > endY) {
          enemies[l][n].y -= ySpeed;
        }
        if (enemies[l][n].y <= endY) {
          enemies[l][n].y = endY;
          if (!changedStage) {
            enemies[l][n].stage++;
            if (enemies[l][n].stage >= stages) enemies[l][n].stage = 0;
          }
        }
      }
      enemies[l][n].simpleX = enemies[l][n].x / 40;
      enemies[l][n].simpleY = enemies[l][n].y / 40;
    }
  }
  
// 20x15
var checkpoints = [
	[],
	// level 1
	[
		[2, 4, 3, 7],
		[15, 4, 3, 7, true]
	],
	
	// level 2
	[
		[2, 6, 2, 3],
		[16, 6, 2, 3, true]
	],
	
	// level 3
	[
		[8, 6, 4, 3, true],
		[8, 3, 1, 1]
	],
	
	// level 4
	[
		[10, 2, 2, 2],
		[4, 8, 2, 2, true]
	],
	
	// level 5
	[
		[2, 2, 1, 1],
		[17, 2, 1, 1],
		[2, 4, 1, 1],
		[12, 6, 1, 1, true]
	],
	
	// level 6
	[
		[2, 5, 2, 2],
		[16, 7, 2, 2, true]
	],
	
	// level 7
	[
		[2, 6, 3, 3],
		[16, 6, 2, 3, true]
	],
	
	// level 8
	[
		[6, 4, 1, 1, true]
	],
	
	// level 9
	[
		[2, 3, 2, 2],
		[10, 8, 2, 2],
		[16, 6, 2, 2, true]
	],
	
	// level 10
	[
		[7, 3, 2, 2],
		[11, 3, 2, 2, true]
	],
	
	// level 11
	[
		[17, 7, 2, 2],
		[1, 6, 3, 3, true]
	],
	
	// level 12
	[
		[15, 9, 2, 2],
		[3, 4, 2, 2],
		[3, 9, 2, 2, true]
	],
	
	// level 13
	[
		[9, 11, 2, 2],
		[9, 2, 2, 2, true]
	],
	
	// level 14
	[
		[2, 8, 3, 3],
		[15, 4, 3, 3, true]
	],
	
	// level 15
	[
		[1, 3, 3, 2],
		[16, 10, 3, 2, true]
	],
	
	// level 16
	[
		[1, 4, 2, 2],
		[17, 10, 2, 2, true]
	],
	
	// level 17
	[
		[3, 3, 1, 1],
		[13, 9, 1, 1, true]
	],
	
	// level 18
	[
		[3, 6, 2, 3],
		[15, 6, 2, 3, true]
	],
	
	// level 19
	[
		[3, 6, 2, 3],
		[15, 6, 2, 3, true]
	],
	
	// level 20
	[
		[16, 10, 2, 2],
		[2, 4, 2, 2, true]
	],
	
	// level 21
	[
		[1, 6, 2, 3],
		[17, 6, 2, 3, true]
	],
	
	// level 22
	[
		[17, 2, 2, 2],
		[3, 11, 2, 2, true]
	],
	
	// level 23
	[
		[3, 3, 2, 2],
		[15, 10, 2, 2, true]
	],
	
	// level 24
	[
		[2, 10, 2, 2],
		[16, 3, 2, 2, true]
	],
	
	// level 25
	[
		[2, 2, 2, 2],
		[17, 10, 2, 2, true]
	],
	
	// level 26
	[
		[9, 7, 2, 3, true]
	],
	
	// level 27
	[
		[1, 6, 2, 3, true]
	],
	
	// level 28
	[
		[1, 11, 2, 2],
		[16, 7, 3, 1],
		[1, 2, 2, 2, true]
	],
	
	// level 29
	[
		[16, 3, 2, 2],
		[2, 3, 2, 2, true]
	],
	
	// level 30
	[
		[1, 11, 2, 2, true]
	]
];

function drawChecks() {
	for (var i = 0; i < checkpoints[level].length; i++) {
		canvas.beginPath();
		canvas.rect(
			checkpoints[level][i][0] * cwh(TILE_SIZE) + os.x,
			checkpoints[level][i][1] * cwh(TILE_SIZE) + os.y,
			checkpoints[level][i][2] * cwh(TILE_SIZE),
			checkpoints[level][i][3] * cwh(TILE_SIZE)
		);
		canvas.fillStyle = CHECK_COLOR;
		canvas.fill();
	}
	drawCheckFlash();
}

function drawCheckFlash() {
	if (checkFlashAlpha > 0 && state == "game") {
		canvas.beginPath();
		canvas.rect(
			checkpoints[level][curCheck][0] * cwh(TILE_SIZE) + os.x,
			checkpoints[level][curCheck][1] * cwh(TILE_SIZE) + os.y,
			checkpoints[level][curCheck][2] * cwh(TILE_SIZE),
			checkpoints[level][curCheck][3] * cwh(TILE_SIZE)
		);
		canvas.fillStyle = CHECK_FLASH_COLOR + checkFlashAlpha + ")";
		canvas.fill();
		checkFlashAlpha -= CHECK_FLASH_FADE_SPEED;
	}
}
function coin(x, y, gathered, saved, fadeAlpha, fadingIn, fadingOut, shineTime, shineAlpha, shiningIn, shiningOut) {
    if (gathered == null) {
      gathered = false;
    }
    if (saved == null) {
      saved = false;
    }
    if (fadeAlpha == null) {
      fadeAlpha = 1;
    }
    if (fadingIn == null) {
      fadingIn = false;
    }
    if (fadingOut == null) {
      fadingOut = false;
    }
    if (shineTime == null) {
      shineTime = createCoinShineTime();
    }
    if (shineAlpha == null) {
      shineAlpha = 0;
    }
    if (shiningIn == null) {
      shiningIn = false;
    }
    if (shiningOut == null) {
      shiningOut = false;
    }
  
    this.simpleX = x;
    this.simpleY = y;
    this.x = x * TILE_SIZE + TILE_SIZE / 2;
    this.y = y * TILE_SIZE + TILE_SIZE / 2;
    this.gathered = gathered;
    this.saved = saved;
    this.fadeAlpha = fadeAlpha;
    this.fadingIn = fadingIn;
    this.fadingOut = fadingOut;
    this.shineTime = shineTime;
    this.shineAlpha = shineAlpha;
    this.shiningIn = shiningIn;
    this.shiningOut = shiningOut;
  }
  
  var coins = [
    [],
    // level 1
    [],
  
    // level 2
    [new coin(9, 6.5), new coin(9.5, 6.5), new coin(10, 6.5), new coin(9, 7), new coin(9.5, 7), new coin(10, 7), new coin(9, 7.5), new coin(9.5, 7.5), new coin(10, 7.5)],
  
    // level 3
    [new coin(8, 3), new coin(14, 4), new coin(11, 11), new coin(5, 10)],
  
    // level 4
    [
      new coin(9 - 0.5, 9 - 0.5),
      new coin(9.38 - 0.5, 7.82 - 0.5),
      new coin(10.38 - 0.5, 7.09 - 0.5),
      new coin(11.61 - 0.5, 7.09 - 0.5),
      new coin(12.61 - 0.5, 7.82 - 0.5),
      new coin(13 - 0.5, 9 - 0.5),
      new coin(12.61 - 0.5, 10.17 - 0.5),
      new coin(11.61 - 0.5, 10.9 - 0.5),
      new coin(10.38 - 0.5, 10.9 - 0.5),
      new coin(9.38 - 0.5, 10.17 - 0.5),
    ],
  
    // level 5
    [new coin(7, 8), new coin(7.5, 8), new coin(8, 8), new coin(8.5, 8), new coin(9, 8), new coin(9.5, 8), new coin(10, 8), new coin(10.5, 8), new coin(11, 8), new coin(11.5, 8), new coin(12, 8)],
  
    // level 6
    [new coin(2, 8), new coin(6, 8), new coin(10, 8), new coin(14, 8)],
  
    // level 7
    [
      new coin(5, 3),
      new coin(5.5, 3),
      new coin(6, 3),
      new coin(5, 3.5),
      new coin(5.5, 3.5),
      new coin(6, 3.5),
      new coin(5, 4),
      new coin(5.5, 4),
      new coin(6, 4),
  
      new coin(13, 3),
      new coin(13.5, 3),
      new coin(14, 3),
      new coin(13, 3.5),
      new coin(13.5, 3.5),
      new coin(14, 3.5),
      new coin(13, 4),
      new coin(13.5, 4),
      new coin(14, 4),
  
      new coin(5, 10),
      new coin(5.5, 10),
      new coin(6, 10),
      new coin(5, 10.5),
      new coin(5.5, 10.5),
      new coin(6, 10.5),
      new coin(5, 11),
      new coin(5.5, 11),
      new coin(6, 11),
  
      new coin(13, 10),
      new coin(13.5, 10),
      new coin(14, 10),
      new coin(13, 10.5),
      new coin(13.5, 10.5),
      new coin(14, 10.5),
      new coin(13, 11),
      new coin(13.5, 11),
      new coin(14, 11),
    ],
  
    // level 8
    [new coin(8, 4), new coin(11, 4), new coin(11, 10), new coin(8, 10), new coin(5, 6), new coin(5, 10), new coin(14, 11), new coin(14, 4), new coin(13, 9), new coin(10, 6)],
  
    // level 9
    [new coin(16, 10), new coin(16.5, 10), new coin(17, 10), new coin(16, 10.5), new coin(16.5, 10.5), new coin(17, 10.5), new coin(16, 11), new coin(16.5, 11), new coin(17, 11), new coin(12, 11)],
  
    // level 10
    [],
  
    // level 11
    [
      new coin(6, 3),
      new coin(6, 3.5),
      new coin(6, 4),
      new coin(6.5, 3),
      new coin(7, 3),
      new coin(6.5, 3.5),
  
      new coin(6, 11),
      new coin(6, 10.5),
      new coin(6, 10),
      new coin(6.5, 10.5),
      new coin(6.5, 11),
      new coin(7, 11),
  
      new coin(14, 11),
      new coin(13.5, 11),
      new coin(13, 11),
      new coin(13.5, 10.5),
      new coin(14, 10.5),
      new coin(14, 10),
    ],
  
    // level 12
    [new coin(8, 7), new coin(7.5, 7), new coin(7, 7)],
  
    // level 13
    [],
  
    // level 14
    [],
  
    // level 15
    [],
  
    // level 16
    [
      new coin(9, 7),
      new coin(9.5, 7),
      new coin(10, 7),
      new coin(9, 7.5),
      new coin(9.5, 7.5),
      new coin(10, 7.5),
      new coin(9, 8),
      new coin(9.5, 8),
      new coin(10, 8),
  
      new coin(15, 4),
      new coin(15.5, 4),
      new coin(16, 4),
      new coin(16, 4.5),
      new coin(15.5, 4.5),
      new coin(15, 4.5),
      new coin(15, 5),
      new coin(15.5, 5),
      new coin(16, 5),
  
      new coin(3, 10),
      new coin(3.5, 10),
      new coin(4, 10),
      new coin(3, 10.5),
      new coin(3.5, 10.5),
      new coin(4, 10.5),
      new coin(3, 11),
      new coin(3.5, 11),
      new coin(4, 11),
    ],
  
    // level 17
    [],
  
    // level 18
    [
      new coin(6, 5),
      new coin(6.5, 5),
      new coin(7, 5),
      new coin(7.5, 5),
      new coin(8, 5),
      new coin(8.5, 5),
      new coin(9, 5),
      new coin(9.5, 5),
      new coin(10, 5),
      new coin(10.5, 5),
      new coin(11, 5),
      new coin(11.5, 5),
      new coin(12, 5),
      new coin(12.5, 5),
      new coin(13, 5),
  
      new coin(6, 5.5),
      new coin(6.5, 5.5),
      new coin(7, 5.5),
      new coin(7.5, 5.5),
      new coin(8, 5.5),
      new coin(8.5, 5.5),
      new coin(9, 5.5),
      new coin(9.5, 5.5),
      new coin(10, 5.5),
      new coin(10.5, 5.5),
      new coin(11, 5.5),
      new coin(11.5, 5.5),
      new coin(12, 5.5),
      new coin(12.5, 5.5),
      new coin(13, 5.5),
  
      new coin(6, 6),
      new coin(6.5, 6),
      new coin(7, 6),
      new coin(7.5, 6),
      new coin(8, 6),
      new coin(8.5, 6),
      new coin(9, 6),
      new coin(9.5, 6),
      new coin(10, 6),
      new coin(10.5, 6),
      new coin(11, 6),
      new coin(11.5, 6),
      new coin(12, 6),
      new coin(12.5, 6),
      new coin(13, 6),
  
      new coin(6, 6.5),
      new coin(6.5, 6.5),
      new coin(7, 6.5),
      new coin(7.5, 6.5),
      new coin(8, 6.5),
      new coin(8.5, 6.5),
      new coin(9, 6.5),
      new coin(9.5, 6.5),
      new coin(10, 6.5),
      new coin(10.5, 6.5),
      new coin(11, 6.5),
      new coin(11.5, 6.5),
      new coin(12, 6.5),
      new coin(12.5, 6.5),
      new coin(13, 6.5),
  
      new coin(6, 7),
      new coin(6.5, 7),
      new coin(7, 7),
      new coin(7.5, 7),
      new coin(8, 7),
      new coin(8.5, 7),
      new coin(9, 7),
      new coin(9.5, 7),
      new coin(10, 7),
      new coin(10.5, 7),
      new coin(11, 7),
      new coin(11.5, 7),
      new coin(12, 7),
      new coin(12.5, 7),
      new coin(13, 7),
  
      new coin(6, 7.5),
      new coin(6.5, 7.5),
      new coin(7, 7.5),
      new coin(7.5, 7.5),
      new coin(8, 7.5),
      new coin(8.5, 7.5),
      new coin(9, 7.5),
      new coin(9.5, 7.5),
      new coin(10, 7.5),
      new coin(10.5, 7.5),
      new coin(11, 7.5),
      new coin(11.5, 7.5),
      new coin(12, 7.5),
      new coin(12.5, 7.5),
      new coin(13, 7.5),
  
      new coin(6, 8),
      new coin(6.5, 8),
      new coin(7, 8),
      new coin(7.5, 8),
      new coin(8, 8),
      new coin(8.5, 8),
      new coin(9, 8),
      new coin(9.5, 8),
      new coin(10, 8),
      new coin(10.5, 8),
      new coin(11, 8),
      new coin(11.5, 8),
      new coin(12, 8),
      new coin(12.5, 8),
      new coin(13, 8),
  
      new coin(6, 8.5),
      new coin(6.5, 8.5),
      new coin(7, 8.5),
      new coin(7.5, 8.5),
      new coin(8, 8.5),
      new coin(8.5, 8.5),
      new coin(9, 8.5),
      new coin(9.5, 8.5),
      new coin(10, 8.5),
      new coin(10.5, 8.5),
      new coin(11, 8.5),
      new coin(11.5, 8.5),
      new coin(12, 8.5),
      new coin(12.5, 8.5),
      new coin(13, 8.5),
  
      new coin(6, 9),
      new coin(6.5, 9),
      new coin(7, 9),
      new coin(7.5, 9),
      new coin(8, 9),
      new coin(8.5, 9),
      new coin(9, 9),
      new coin(9.5, 9),
      new coin(10, 9),
      new coin(10.5, 9),
      new coin(11, 9),
      new coin(11.5, 9),
      new coin(12, 9),
      new coin(12.5, 9),
      new coin(13, 9),
    ],
  
    // level 19
    [],
  
    // level 20
    [new coin(7, 5), new coin(7, 8), new coin(10, 7), new coin(13, 5), new coin(13, 8), new coin(16, 7), new coin(17, 4)],
  
    // level 21
    [
      new coin(9, 3),
      new coin(9.5, 3),
      new coin(10, 3),
      new coin(9, 3.5),
      new coin(9.5, 3.5),
      new coin(10, 3.5),
      new coin(9, 4),
      new coin(9.5, 4),
      new coin(10, 4),
      new coin(9, 10),
      new coin(9.5, 10),
      new coin(10, 10),
      new coin(9, 10.5),
      new coin(9.5, 10.5),
      new coin(10, 10.5),
      new coin(9, 11),
      new coin(9.5, 11),
      new coin(10, 11),
    ],
  
    // level 22
    [
      new coin(4, 7),
      new coin(4.5, 7),
      new coin(5, 7),
      new coin(5.5, 7),
      new coin(6, 7),
      new coin(4, 7.5),
      new coin(4.5, 7.5),
      new coin(5, 7.5),
      new coin(5.5, 7.5),
      new coin(6, 7.5),
      new coin(4, 8),
      new coin(4.5, 8),
      new coin(5, 8),
      new coin(5.5, 8),
      new coin(6, 8),
    ],
  
    // level 23
    [
      new coin(11.5 - 0.5, 7.5 - 0.5),
      new coin(11.15 - 0.5, 8.46 - 0.5),
      new coin(10.26 - 0.5, 8.98 - 0.5),
      new coin(9.25 - 0.5, 8.8 - 0.5),
      new coin(8.59 - 0.5, 8.01 - 0.5),
      new coin(8.59 - 0.5, 6.99 - 0.5),
      new coin(9.25 - 0.5, 6.2 - 0.5),
      new coin(10.26 - 0.5, 6.02 - 0.5),
      new coin(11.15 - 0.5, 6.53 - 0.5),
      new coin(12.25 - 0.5, 7.5 - 0.5),
      new coin(11.95 - 0.5, 8.625 - 0.5),
      new coin(11.125 - 0.5, 9.45 - 0.5),
      new coin(10 - 0.5, 9.75 - 0.5),
      new coin(8.875 - 0.5, 9.45 - 0.5),
      new coin(8.05 - 0.5, 8.625 - 0.5),
      new coin(7.75 - 0.5, 7.5 - 0.5),
      new coin(8.05 - 0.5, 6.375 - 0.5),
      new coin(8.87 - 0.5, 5.55 - 0.5),
      new coin(10 - 0.5, 5.25 - 0.5),
      new coin(11.125 - 0.5, 5.55 - 0.5),
      new coin(11.95 - 0.5, 6.37 - 0.5),
      new coin(13 - 0.5, 7.5 - 0.5),
      new coin(12.82 - 0.5, 8.52 - 0.5),
      new coin(12.298 - 0.5, 9.43 - 0.5),
      new coin(11.5 - 0.5, 10.098 - 0.5),
      new coin(10.52 - 0.5, 10.45 - 0.5),
      new coin(9.479 - 0.5, 10.45 - 0.5),
      new coin(8.5 - 0.5, 10.098 - 0.5),
      new coin(7.7 - 0.5, 9.42 - 0.5),
      new coin(7.18 - 0.5, 8.526 - 0.5),
      new coin(7 - 0.5, 7.5 - 0.5),
      new coin(7.18 - 0.5, 6.47 - 0.5),
      new coin(7.7 - 0.5, 5.57 - 0.5),
      new coin(8.5 - 0.5, 4.9 - 0.5),
      new coin(9.48 - 0.5, 4.54 - 0.5),
      new coin(10.52 - 0.5, 4.54 - 0.5),
      new coin(11.5 - 0.5, 4.9 - 0.5),
      new coin(12.298 - 0.5, 5.57 - 0.5),
      new coin(12.819 - 0.5, 6.47 - 0.5),
    ],
  
    // level 24
    [new coin(7, 4), new coin(12, 10)],
  
    // level 25
    [
      new coin(9, 6),
      new coin(9, 6),
      new coin(9, 6.5),
      new coin(9, 6.5),
      new coin(9, 7),
      new coin(9, 7),
      new coin(9.5, 6),
      new coin(9.5, 6),
      new coin(9.5, 6.5),
      new coin(9.5, 6.5),
      new coin(9.5, 7),
      new coin(9.5, 7),
      new coin(10, 6),
      new coin(10, 6),
      new coin(10, 6.5),
      new coin(10, 6.5),
      new coin(10, 7),
      new coin(10, 7),
      new coin(10.5, 6),
      new coin(10.5, 6),
      new coin(10.5, 6.5),
      new coin(10.5, 6.5),
      new coin(10.5, 7),
      new coin(10.5, 7),
      new coin(11, 6),
      new coin(11, 6),
      new coin(11, 6.5),
      new coin(11, 6.5),
      new coin(11, 7),
      new coin(11, 7),
    ],
  
    // level 26
    [
      new coin(3, 2),
      new coin(3, 2.5),
      new coin(3, 3),
      new coin(3, 3.5),
      new coin(3, 4),
      new coin(16, 2),
      new coin(16, 4),
      new coin(1, 9),
      new coin(1, 9.5),
      new coin(1, 10),
      new coin(1, 10.5),
      new coin(1, 11),
      new coin(1, 11.5),
      new coin(1, 12),
      new coin(18, 9),
      new coin(18, 12),
      new coin(9, 11),
      new coin(9.5, 11),
      new coin(10, 11),
      new coin(9, 11.5),
      new coin(9.5, 11.5),
      new coin(10, 11.5),
      new coin(9, 12),
      new coin(9.5, 12),
      new coin(10, 12),
    ],
  
    // level 27
    [
      new coin(17, 6),
      new coin(17, 6.5),
      new coin(17, 7),
      new coin(17, 7.5),
      new coin(17, 8),
      new coin(17.5, 6),
      new coin(17.5, 6.5),
      new coin(17.5, 7),
      new coin(17.5, 7.5),
      new coin(17.5, 8),
      new coin(18, 6),
      new coin(18, 6.5),
      new coin(18, 7),
      new coin(18, 7.5),
      new coin(18, 8),
    ],
  
    // level 28
    [],
  
    // level 29
    [new coin(9, 10), new coin(9.5, 10), new coin(10, 10), new coin(9, 10.5), new coin(9.5, 10.5), new coin(10, 10.5), new coin(9, 11), new coin(9.5, 11), new coin(10, 11)],
  
    // level 30
    [
      new coin(1, 2),
      new coin(1.5, 2),
      new coin(2, 2),
      new coin(1, 2.5),
      new coin(1.5, 2.5),
      new coin(2, 2.5),
      new coin(1, 3),
      new coin(1.5, 3),
      new coin(2, 3),
      new coin(17, 2),
      new coin(17.5, 2),
      new coin(18, 2),
      new coin(17, 2.5),
      new coin(17.5, 2.5),
      new coin(18, 2.5),
      new coin(17, 3),
      new coin(17.5, 3),
      new coin(18, 3),
      new coin(17, 9),
      new coin(17.5, 9),
      new coin(18, 9),
      new coin(17, 9.5),
      new coin(17.5, 9.5),
      new coin(18, 9.5),
      new coin(17, 10),
      new coin(17.5, 10),
      new coin(18, 10),
      new coin(5, 6),
      new coin(5.5, 6),
      new coin(6, 6),
      new coin(6.5, 6),
      new coin(7, 6),
      new coin(7.5, 6),
      new coin(8, 6),
      new coin(8.5, 6),
      new coin(9, 6),
      new coin(9.5, 6),
      new coin(10, 6),
      new coin(10.5, 6),
      new coin(11, 6),
      new coin(11.5, 6),
      new coin(12, 6),
      new coin(12.5, 6),
      new coin(13, 6),
      new coin(13.5, 6),
      new coin(14, 6),
    ],
  ];
  
  function resetCoins(l) {
    for (var i = 0; i < coins[l].length; i++) {
      coins[l][i].gathered = false;
      coins[l][i].saved = false;
      coins[l][i].fadeAlpha = 1;
      coins[l][i].fadingIn = false;
      coins[l][i].fadingOut = false;
      coins[l][i].shineTime = createCoinShineTime();
      coins[l][i].shineAlpha = 0;
      coins[l][i].shiningIn = false;
      coins[l][i].shiningOut = false;
    }
  }
  
  function updateCoins() {
    if (state == "game" && !paused) {
      coinsFade();
      coinsShine();
    }
  }
  
  function drawCoins() {
    if (state == "game") {
      for (var i = 0; i < coins[level].length; i++) {
        if (!coins[level][i].gathered || coins[level][i].fadingIn || coins[level][i].fadingOut) {
          // coin fill
  
          canvas.beginPath();
          canvas.arc(cwh(coins[level][i].x) + os.x, cwh(coins[level][i].y) + os.y, cwh(COIN_SIZE) / 2, 0, 2 * Math.PI, false);
          canvas.fillStyle = COIN_FILL_COLOR + coins[level][i].fadeAlpha + ")";
          canvas.fill();
  
          // coin shine
          canvas.beginPath();
          canvas.arc(cwh(coins[level][i].x) + os.x, cwh(coins[level][i].y) + os.y, cwh(COIN_SIZE) / 2, 0, 2 * Math.PI, false);
          if (coins[level][i].shineAlpha > coins[level][i].fadeAlpha) canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].fadeAlpha + ")";
          else canvas.fillStyle = COIN_SHINE_COLOR + coins[level][i].shineAlpha + ")";
          canvas.fill();
  
          // coin stroke
          canvas.lineWidth = cwh(4);
          canvas.strokeStyle = COIN_OUTLINE_COLOR + coins[level][i].fadeAlpha + ")";
          canvas.stroke();
        }
      }
    }
  }
  
  function coinsFade() {
    if (state == "game") {
      for (var i = 0; i < coins[level].length; i++) {
        if (coins[level][i].fadingOut && coins[level][i].fadeAlpha > 0) {
          coins[level][i].fadeAlpha -= COIN_FADE_SPEED / 2;
          if (coins[level][i].fadeAlpha < 0) {
            coins[level][i].fadeAlpha = 0;
          }
        } else if (coins[level][i].fadingOut && coins[level][i].fadeAlpha <= 0) {
          coins[level][i].fadeAlpha = 0;
          coins[level][i].fadingOut = false;
          coins[level][i].shineTime = createCoinShineTime();
        } else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha < 1) {
          coins[level][i].fadeAlpha += COIN_FADE_SPEED;
          if (coins[level][i].fadeAlpha > 1) {
            coins[level][i].fadeAlpha = 1;
          }
        } else if (coins[level][i].fadingIn && coins[level][i].fadeAlpha >= 1) {
          coins[level][i].fadeAlpha = 1;
          coins[level][i].fadingIn = false;
        }
        //console.trace(coins[level][i].fadeAlpha);
      }
    }
  }
  
  function getCoinsCollected() {
    var count = 0;
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].gathered) {
        count++;
      }
    }
    return count;
  }
  
  function getCoinsTotal() {
    return coins[level].length;
  }
  
  function unsavedCoins() {
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].gathered && !coins[level][i].saved) {
        return true;
      }
    }
    return false;
  }
  
  function createCoinShineTime() {
    return Math.floor(Math.random() * (COIN_SHINE_FREQ + 1));
  }
  
  function coinsShine() {
    coinShineTimer++;
    if (coinShineTimer > COIN_SHINE_FREQ) coinShineTimer = 0;
  
    for (var i = 0; i < coins[level].length; i++) {
      if (!coins[level][i].shiningIn && coinShineTimer == coins[level][i].shineTime) {
        coins[level][i].shiningIn = true;
        coins[level][i].shiningOut = false;
        coins[level][i].shineAlpha = 0;
      } else if (coins[level][i].shiningIn && coins[level][i].shineAlpha < 1) {
        coins[level][i].shineAlpha += COIN_SHINE_FADE_IN_SPEED;
        if (coins[level][i].shineAlpha > 1) {
          coins[level][i].shineAlpha = 1;
        }
      } else if (coins[level][i].shiningIn && coins[level][i].shineAlpha >= 1) {
        coins[level][i].shiningOut = true;
        coins[level][i].shiningIn = false;
        coins[level][i].shineAlpha = 1;
      } else if (coins[level][i].shiningOut && coins[level][i].shineAlpha > 0) {
        coins[level][i].shineAlpha -= COIN_SHINE_FADE_OUT_SPEED;
        if (coins[level][i].shineAlpha < 0) {
          coins[level][i].shineAlpha = 0;
        }
      } else if (coins[level][i].shiningOut && coins[level][i].shineAlpha <= 0) {
        coins[level][i].shiningOut = false;
        coins[level][i].shiningIn = false;
        coins[level][i].shineAlpha = 0;
      }
    }
  }
  
  function submitSavedCoins() {
    coinsSave = [];
    for (var i = 0; i < coins[level].length; i++) {
      if (coins[level][i].saved) coinsSave.push(i);
    }
    if (coinsSave.length == 0) coinsSave.push(-99);
    localStorage.setItem("whg_coins", JSON.stringify(coinsSave));
  }
  
  function loadSavedCoins() {
    resetCoins(level);
    coinsSave = JSON.parse(localStorage["whg_coins"]);
    if (coinsSave[0] >= 0) {
      for (var i = 0; i < coinsSave.length; i++) {
        coins[level][parseInt(coinsSave[i])].gathered = true;
        coins[level][parseInt(coinsSave[i])].saved = true;
      }
    }
  }
  
var player = {
    x: null,
    y: null,
    prevX: null,
    prevY: null,
    right: null,
    left: null,
    top: null,
    bottom: null,
    tileRight: null,
    tileLeft: null,
    tileTop: null,
    tileBottom: null,
    carvedUp: false,
    carvedDown: false,
    movedRight: false,
    movedLeft: false,
    movedUp: false,
    movedDown: false,
    dying: false,
    bouncing: false,
    bounceState: null,
    bounceY: null,
    bounceTarget: null,
    width: 1,
    height: 1,
    alpha: 1,
    color: 0,
    redFill: PLAYER_FILL_COLORS[0][0],
    redOutline: PLAYER_OUTLINE_COLORS[0][0],
    greenFill: 0,
    greenOutline: 0,
    blueFill: 0,
    blueOutline: 0,
    rainbowUnder: null,
    rainbowOver: null,
    rainbowPercent: 0,
  };
  
  function updatePlayer() {
    if (state == "game" && !paused) {
      getPlayerBounds();
      playerMove();
      playerHitEnemy();
      playerHitCheck();
      playerGetCoins();
      playerDie();
      playerRespawn();
      playerBounce();
      getPrevPlayerCoords();
    }
  }
  
  function getPlayerBounds() {
    if (state == "game") {
      player.right = player.x + PLAYER_SIZE / 2;
      player.left = player.x - PLAYER_SIZE / 2;
      player.top = player.y - PLAYER_SIZE;
      player.bottom = player.y;
  
      player.tileRight = Math.floor((player.right + WALL_BORDER_LEFT) / TILE_SIZE);
      player.tileLeft = Math.floor((player.left - WALL_BORDER_RIGHT) / TILE_SIZE);
      player.tileTop = Math.floor((player.top - WALL_BORDER_BOTTOM) / TILE_SIZE);
      player.tileBottom = Math.floor((player.bottom + WALL_BORDER_TOP) / TILE_SIZE);
    }
  }
  
  function getPrevPlayerCoords() {
    if (state == "game") {
      player.prevX = player.x;
      player.prevY = player.y;
    }
  }
  
  function resetPlayer() {
    if (!justLoaded) {
      curCheck = 0;
    }
  }
  
  function playerMove() {
    if (state == "game" && !player.dying && (!player.bouncing || player.bounceState >= 4)) {
      var distance = 0;
      player.carvedUp = false;
      player.carvedDown = false;
      player.movedRight = false;
      player.movedLeft = false;
      player.movedUp = false;
      player.movedDown = false;
  
      if (!mobile || hideKeys) {
        keyRight = keydown.right || keydown.d;
        keyLeft = keydown.left || keydown.a;
        keyUp = keydown.up || keydown.w;
        keyDown = keydown.down || keydown.s;
      }
  
      if (keydown.right || keydown.d || keydown.left || keydown.a || keydown.up || keydown.w || keydown.down || keydown.s) {
        hideKeys = true;
      }
  
      // right
      if (keyRight) {
        distance = PLAYER_SPEED;
        while (walls[level][player.tileTop][Math.floor((player.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 || walls[level][player.tileBottom][Math.floor((player.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
          distance--;
        }
        player.x += distance;
        if (distance > 0) {
          player.movedRight = true;
        } else {
          // carve up
          while (
            distance < PLAYER_SPEED &&
            walls[level][Math.floor((player.bottom - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
            walls[level][Math.floor((player.bottom - CARVE - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 0
          ) {
            distance++;
          }
          if (distance > 0) {
            player.carvedUp = true;
            player.y -= distance;
            if (player.bouncing) {
              player.bounceY -= distance;
              player.bounceTarget -= distance;
            }
          }
  
          // carve down
          distance = 0;
          while (
            distance < PLAYER_SPEED &&
            walls[level][Math.floor((player.top + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
            walls[level][Math.floor((player.top + CARVE + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 0
          ) {
            distance++;
          }
          if (distance > 0) {
            player.carvedDown = true;
            player.y += distance;
            if (player.bouncing) {
              player.bounceY += distance;
              player.bounceTarget += distance;
            }
          }
        }
      }
  
      // left
      else if (keyLeft) {
        distance = PLAYER_SPEED;
        while (walls[level][player.tileTop][Math.floor((player.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 || walls[level][player.tileBottom][Math.floor((player.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
          distance--;
        }
        player.x -= distance;
        if (distance > 0) {
          player.movedLeft = true;
        } else {
          // carve up
          while (
            distance < PLAYER_SPEED &&
            walls[level][Math.floor((player.bottom - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
            walls[level][Math.floor((player.bottom - CARVE - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0
          ) {
            distance++;
          }
          if (distance > 0) {
            player.carvedUp = true;
            player.y -= distance;
            if (player.bouncing) {
              player.bounceY -= distance;
              player.bounceTarget -= distance;
            }
          }
  
          // carve down
          distance = 0;
          while (
            distance < PLAYER_SPEED &&
            walls[level][Math.floor((player.top + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
            walls[level][Math.floor((player.top + CARVE + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0
          ) {
            distance++;
          }
          if (distance > 0) {
            player.carvedDown = true;
            player.y += distance;
            if (player.bouncing) {
              player.bounceY += distance;
              player.bounceTarget += distance;
            }
          }
        }
      }
  
      // up
      if (keyUp) {
        distance = PLAYER_SPEED;
        while (walls[level][Math.floor((player.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][player.tileRight] == 1 || walls[level][Math.floor((player.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][player.tileLeft] == 1) {
          distance--;
        }
        if (!player.carvedUp) {
          player.movedUp = true;
          player.y -= distance;
          if (player.bouncing) {
            player.bounceY -= distance;
            player.bounceTarget -= distance;
          }
        }
        if (distance == 0) {
          // carve right
          if (!player.movedRight && !player.movedLeft) {
            distance = 0;
            while (
              distance < PLAYER_SPEED &&
              walls[level][Math.floor((player.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.left + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
              walls[level][Math.floor((player.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.left + CARVE + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0
            ) {
              distance++;
            }
            player.x += distance;
          }
  
          // carve left
          if (!player.movedRight && !player.movedLeft) {
            distance = 0;
            while (
              distance < PLAYER_SPEED &&
              walls[level][Math.floor((player.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.right - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
              walls[level][Math.floor((player.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.right - CARVE - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 0
            ) {
              distance++;
            }
            player.x -= distance;
          }
        }
      }
  
      // down
      else if (keyDown) {
        distance = PLAYER_SPEED;
        while (walls[level][Math.floor((player.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][player.tileRight] == 1 || walls[level][Math.floor((player.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][player.tileLeft] == 1) {
          distance--;
        }
        if (!player.carvedDown) {
          player.movedDown = true;
          player.y += distance;
          if (player.bouncing) {
            player.bounceY += distance;
            player.bounceTarget += distance;
          }
        }
        if (distance == 0) {
          // carve right
          if (!player.movedRight && !player.movedLeft) {
            distance = 0;
            while (
              distance < PLAYER_SPEED &&
              walls[level][Math.floor((player.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.left + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
              walls[level][Math.floor((player.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.left + CARVE + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0
            ) {
              distance++;
            }
            player.x += distance;
          }
  
          // carve left
          if (!player.movedRight && !player.movedLeft) {
            distance = 0;
            while (
              distance < PLAYER_SPEED &&
              walls[level][Math.floor((player.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.right - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
              walls[level][Math.floor((player.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.right - CARVE - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 0
            ) {
              distance++;
            }
            player.x -= distance;
          }
        }
      }
  
      // fix carving cancel move bug - up
      if (player.movedUp && player.carvedDown) {
        player.y -= PLAYER_SPEED;
        if (player.bouncing) {
          player.bounceY -= PLAYER_SPEED;
          player.bounceTarget -= PLAYER_SPEED;
        }
      }
  
      // fix carving cancel move bug - down
      else if (player.movedDown && player.carvedUp) {
        player.y += PLAYER_SPEED;
        if (player.bouncing) {
          player.bounceY += PLAYER_SPEED;
          player.bounceTarget += PLAYER_SPEED;
        }
      }
  
      // fix corner bug - up/right
      if (keyRight && keyUp) {
        if (walls[level][Math.floor((player.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
          if (player.prevX == player.x - PLAYER_SPEED && player.prevY == player.y + PLAYER_SPEED) {
            player.x -= PLAYER_SPEED;
          }
        }
      }
  
      // fix corner bug - up/right
      else if (keyLeft && keyUp) {
        if (walls[level][Math.floor((player.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
          if (player.prevX == player.x + PLAYER_SPEED && player.prevY == player.y + PLAYER_SPEED) {
            player.x += PLAYER_SPEED;
          }
        }
      }
  
      // fix corner bug - down/right
      else if (keyRight && keyDown) {
        if (walls[level][Math.floor((player.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
          if (player.prevX == player.x - PLAYER_SPEED && player.prevY == player.y - PLAYER_SPEED) {
            player.x -= PLAYER_SPEED;
          }
        }
      }
  
      // fix corner bug - down/right
      else if (keyLeft && keyDown) {
        if (walls[level][Math.floor((player.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
          if (player.prevX == player.x + PLAYER_SPEED && player.prevY == player.y - PLAYER_SPEED) {
            player.x += PLAYER_SPEED;
          }
        }
      }
    }
  }
  
  function playerHitEnemy() {
    getPlayerBounds();
    if (state == "game" && !invincible && !invincible_permanent && !playerFullOnCheck() && !player.dying && (!player.bouncing || player.bounceState >= 4)) {
      for (var i = 0; i < enemies[level].length; i++) {
        if (
          enemies[level][i].x + ENEMY_SIZE_HIT / 2 > player.left &&
          enemies[level][i].x - ENEMY_SIZE_HIT / 2 < player.right &&
          enemies[level][i].y + ENEMY_SIZE_HIT / 2 > player.top &&
          enemies[level][i].y - ENEMY_SIZE_HIT / 2 < player.bottom
        ) {
          player.dying = true;
          playSFX(sfx_die);
          break;
        }
      }
    }
  }
  
  function playerRespawn() {
    if (state == "game") {
      if (!player.dying && player.alpha < 1 && !finishLevelTimer > 0) {
        player.alpha += RESPAWN_FADE_SPEED;
        if (player.alpha > 1) {
          player.alpha = 1;
        }
      } else if (!player.dying && player.alpha >= 1) {
        player.alpha = 1;
      }
    }
  }
  
  function playerDie() {
    if (state == "game" && player.dying) {
      if (player.alpha > 0) {
        player.alpha -= DIE_FADE_SPEED;
        if (player.alpha < 0) {
          player.alpha = 0;
        }
      } else {
        deaths++;
        localStorage.setItem("whg_deaths", deaths);
        localStorage.setItem("whg_gameTimer", gameTimer);
        player.alpha = 0;
        player.dying = false;
        checkFlashAlpha = 1;
        playerAtCheck(false, true);
  
        if (bouncingEnabled) playSFX(sfx_bounce1);
  
        // reset unsaved coins
        for (var j = 0; j < getCoinsTotal(); j++) {
          if (coins[level][j].gathered && !coins[level][j].saved) {
            coins[level][j].gathered = false;
            coins[level][j].fadingIn = true;
            coins[level][j].fadingOut = false;
          }
        }
      }
    }
  }
  
  function playerHitCheck() {
    if (state == "game") {
      for (var i = 0; i < checkpoints[level].length; i++) {
        if (curCheck != i || unsavedCoins()) {
          if (
            player.right > checkpoints[level][i][0] * TILE_SIZE &&
            player.left < (checkpoints[level][i][0] + checkpoints[level][i][2]) * TILE_SIZE &&
            player.bottom > checkpoints[level][i][1] * TILE_SIZE &&
            player.top < (checkpoints[level][i][1] + checkpoints[level][i][3]) * TILE_SIZE
          ) {
            var justWonLevel = false;
  
            // set new checkpoints
            curCheck = i;
            checkFlashAlpha = 1;
  
            // save coin progress
            var gotCoinOnThisCheck = false;
            for (var j = 0; j < getCoinsTotal(); j++) {
              if (coins[level][j].gathered && !coins[level][j].saved) {
                coins[level][j].saved = true;
                if (coinFullOnCheck(j, i)) gotCoinOnThisCheck = true;
              }
            }
  
            // finish level
            if (checkpoints[level][i][4] && getCoinsCollected() == getCoinsTotal()) {
              invincible = true;
              finishLevelTimer = FINISH_LEVEL_TIMER_TOT;
              justWonLevel = true;
              playSFX(sfx_win);
            } else if (!gotCoinOnThisCheck) {
              playSFX(sfx_checkpoint);
            }
  
            // save
            if (!justWonLevel) {
              localStorage.setItem("whg_curCheck", curCheck);
              localStorage.setItem("whg_gameTimer", gameTimer);
              submitSavedCoins();
            } else {
              if (level < TOTAL_LEVELS) localStorage.setItem("whg_level", level + 1);
              localStorage.setItem("whg_curCheck", 0);
              localStorage.setItem("whg_coins", "[-99]");
              localStorage.setItem("whg_gameTimer", gameTimer);
            }
  
            break;
          }
        }
      }
    }
  }
  
  function playerFullOnCheck() {
    if (state == "game") {
      for (var i = 0; i < checkpoints[level].length; i++) {
        if (
          player.right < (checkpoints[level][i][0] + checkpoints[level][i][2]) * TILE_SIZE &&
          player.left > checkpoints[level][i][0] * TILE_SIZE &&
          player.bottom < (checkpoints[level][i][1] + checkpoints[level][i][3]) * TILE_SIZE &&
          player.top > checkpoints[level][i][1] * TILE_SIZE
        ) {
          return true;
        }
      }
      return false;
    }
  }
  
  function coinFullOnCheck(coinNum, checkNum) {
    if (state == "game") {
      if (
        coins[level][coinNum].x + COIN_SIZE / 2 < (checkpoints[level][checkNum][0] + checkpoints[level][checkNum][2]) * TILE_SIZE &&
        coins[level][coinNum].x - COIN_SIZE / 2 > checkpoints[level][checkNum][0] * TILE_SIZE &&
        coins[level][coinNum].y + COIN_SIZE / 2 < (checkpoints[level][checkNum][1] + checkpoints[level][checkNum][3]) * TILE_SIZE &&
        coins[level][coinNum].y - COIN_SIZE / 2 > checkpoints[level][checkNum][1] * TILE_SIZE
      ) {
        return true;
      }
      return false;
    }
  }
  
  function winLevel() {
    // win level
    if (state == "game" && invincible && finishLevelTimer > 0) {
      finishLevelTimer--;
      if (player.alpha > 0) {
        player.alpha -= WIN_LEVEL_FADE_SPEED;
        if (player.alpha < 0) {
          player.alpha = 0;
        }
      } else if (player.alpha < 0) {
        player.alpha = 0;
      }
      if (finishLevelTimer <= 0) {
        if (level < 30) {
          curCheck = 0;
          resetCoins(level);
          level++;
          coinsSave = [-99];
          localStorage.setItem("whg_gameTimer", gameTimer);
          localStorage.setItem("whg_level", level);
          localStorage.setItem("whg_deaths", deaths);
          localStorage.setItem("whg_curCheck", curCheck);
          localStorage.setItem("whg_coins", "[-99]");
          state = "intermission";
          intermissionTimer = INTERMISSION_TIMER_TOT;
          playSFX(sfx_intermission);
        } else {
          state = "finish";
          initFinish();
        }
      }
    }
  }
  
  function playerGetCoins() {
    if (state == "game" && !player.dying && (!player.bouncing || player.bounceState >= 4)) {
      for (var i = 0; i < coins[level].length; i++) {
        if (
          !coins[level][i].gathered &&
          coins[level][i].x + COIN_SIZE / 2 > player.left &&
          coins[level][i].x - COIN_SIZE / 2 < player.right &&
          coins[level][i].y + COIN_SIZE / 2 > player.top &&
          coins[level][i].y - COIN_SIZE / 2 < player.bottom
        ) {
          coins[level][i].gathered = true;
          coins[level][i].fadingOut = true;
          coins[level][i].fadingIn = false;
          playSFX(sfx_coin);
          getCoinsCollected();
        }
      }
    }
  }
  
  function drawPlayer() {
    if (state == "game") {
      var drawY = player.y;
      if (player.bouncing) drawY = player.bounceY;
  
      // bounce shadow
      if (player.bouncing) {
        yDif = player.bounceTarget - player.bounceY;
        canvas.beginPath();
        canvas.rect(
          cwh(player.x - (PLAYER_SIZE / 2) * ((player.bounceY / player.bounceTarget) * player.width)) + os.x,
          cwh(player.bounceTarget - yDif / 10 - PLAYER_SIZE * (((player.bounceY / player.bounceTarget) * player.height) / 1.5)) + os.y,
          cwh(PLAYER_SIZE * ((player.bounceY / player.bounceTarget) * player.width)),
          cwh(PLAYER_SIZE * (((player.bounceY / player.bounceTarget) * player.height) / 1.5))
        );
        canvas.fillStyle = SHADOW_COLOR + (player.bounceY / player.bounceTarget) * SHADOW_OPACITY * player.alpha + ")";
        canvas.fill();
      }
  
      // underneath fill (fixes small gap between outline and fill, also outline alpha is too dark without double fill)
      canvas.beginPath();
      canvas.rect(cwh(player.x - (PLAYER_SIZE / 2) * player.width) + os.x, cwh(drawY - PLAYER_SIZE * player.height) + os.y, cwh(PLAYER_SIZE * player.width), cwh(PLAYER_SIZE * player.height));
      canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", " + player.alpha + ")";
      canvas.fill();
  
      // outline
      canvas.beginPath();
      canvas.rect(cwh(player.x - (PLAYER_SIZE / 2) * player.width) + os.x, cwh(drawY - PLAYER_SIZE * player.height) + os.y, cwh(OUTLINE_SIZE * player.width), cwh(PLAYER_SIZE * player.height)); // left
      canvas.rect(cwh(player.x - (PLAYER_SIZE / 2) * player.width) + os.x, cwh(drawY - PLAYER_SIZE * player.height) + os.y, cwh(PLAYER_SIZE * player.width), cwh(OUTLINE_SIZE * player.height)); // top
      canvas.rect(cwh(player.x + (PLAYER_SIZE / 2) * player.width - OUTLINE_SIZE * player.width) + os.x, cwh(drawY - PLAYER_SIZE * player.height) + os.y, cwh(OUTLINE_SIZE * player.width), cwh(PLAYER_SIZE * player.height)); // right
      canvas.rect(cwh(player.x - (PLAYER_SIZE / 2) * player.width) + os.x, cwh(drawY - OUTLINE_SIZE * player.height) + os.y, cwh(PLAYER_SIZE * player.width), cwh(OUTLINE_SIZE * player.height)); // bottom
      canvas.fillStyle = "rgba(" + player.redOutline + ", " + player.greenOutline + ", " + player.blueOutline + ", " + player.alpha + ")";
      canvas.fill();
  
      // fill
      canvas.beginPath();
      canvas.rect(
        cwh(player.x - (PLAYER_SIZE / 2) * player.width + OUTLINE_SIZE * player.width) + os.x,
        cwh(drawY - PLAYER_SIZE * player.height + OUTLINE_SIZE * player.height) + os.y,
        cwh(PLAYER_SIZE * player.width - OUTLINE_SIZE * 2 * player.width),
        cwh(PLAYER_SIZE * player.height - OUTLINE_SIZE * 2 * player.height)
      );
      canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", " + player.alpha + ")";
      canvas.fill();
    }
  }
  
  function playerAtCheck(fall, bounce) {
    if (fall == null) {
      fall = false;
    }
    if (bounce == null) {
      bounce = false;
    }
  
    if (state == "game") {
      var checkWidth = checkpoints[level][curCheck][2] * TILE_SIZE;
      var checkHeight = checkpoints[level][curCheck][3] * TILE_SIZE;
      player.x = Math.ceil(checkpoints[level][curCheck][0] * TILE_SIZE + checkWidth / 2);
      player.y = Math.ceil(checkpoints[level][curCheck][1] * TILE_SIZE + checkHeight / 2 + PLAYER_SIZE / 2);
      invincible = false;
  
      if (fall) player.alpha = 1;
  
      if (bouncingEnabled) {
        if (fall) {
          player.bouncing = true;
          player.bounceState = 0;
          player.bounceTarget = player.y;
          player.bounceY = player.bounceTarget + bounce_0_y_start;
  
          bounce_0_y_speed = bounce_0_y_speed_reset;
          bounce_0_width_speed = bounce_0_width_speed_reset;
          bounce_0_height_speed = bounce_0_height_speed;
        } else if (bounce) {
          player.bouncing = true;
          player.bounceState = 4;
          player.bounceY = player.y;
          player.bounceTarget = player.bounceY;
  
          bounce_4_size_speed = bounce_4_size_speed_reset;
        }
      }
    }
  }
  
  function playerBounce() {
    if (state == "game" && player.bouncing && bouncingEnabled) {
      // fall
      if (player.bounceState == 0) {
        if (player.bounceY < player.bounceTarget) {
          bounce_0_y_speed += bounce_0_y_accel;
          bounce_0_width_speed += bounce_0_width_accel;
          bounce_0_height_speed += bounce_0_height_accel;
  
          if (bounce_0_y_speed > bounce_0_y_speed_max) bounce_0_y_speed = bounce_0_y_speed_max;
          if (bounce_0_width_speed > bounce_0_width_speed_max) bounce_0_width_speed = bounce_0_width_speed_max;
          if (bounce_0_height_speed > bounce_0_height_speed_max) bounce_0_height_speed = bounce_0_height_speed_max;
  
          player.bounceY += bounce_0_y_speed;
          player.width -= bounce_0_width_speed;
          player.height += bounce_0_height_speed;
  
          playerLimitSize();
        }
        if (player.bounceY >= player.bounceTarget) {
          player.bounceY = player.bounceTarget;
          player.width = player_size_min;
          player.height = player_size_max;
  
          bounce_1_size_speed = bounce_1_size_speed_reset;
  
          player.bounceState = 1;
  
          playSFX(sfx_bounce0);
        }
      }
  
      // squish after fall
      else if (player.bounceState == 1) {
        if (player.width < player_size_max) player.width += bounce_1_size_speed;
        if (player.height > player_size_min) player.height -= bounce_1_size_speed;
  
        bounce_1_size_speed -= bounce_1_size_decel;
  
        if (bounce_1_size_speed < bounce_1_size_speed_min) bounce_1_size_speed = bounce_1_size_speed_min;
  
        playerLimitSize();
  
        if (player.width >= player_size_max && player.height <= player_size_min) {
          player.width = player_size_max;
          player.height = player_size_min;
          bounce_2_size_speed = bounce_2_size_speed_reset;
          player.bounceState = 2;
        }
      }
  
      // stretch after squish
      else if (player.bounceState == 2) {
        if (player.width > player_size_min) player.width -= bounce_2_size_speed;
        if (player.height < player_size_max) player.height += bounce_2_size_speed;
  
        bounce_2_size_speed += bounce_2_size_accel;
  
        if (bounce_2_size_speed > bounce_2_size_speed_max) bounce_2_size_speed = bounce_2_size_speed_max;
  
        playerLimitSize();
  
        if (player.width <= player_size_min && player.height >= player_size_max) {
          player.width = player_size_min;
          player.height = player_size_max;
  
          bounce_3_stage = bounce_3_stage_reset;
          bounce_3_y_speed = bounce_3_y_speed_reset;
          bounce_3_width_speed = bounce_3_width_speed_reset;
          bounce_3_height_speed = bounce_3_height_speed_reset;
          player.bounceState = 3;
        }
      }
  
      // big bounce
      else if (player.bounceState == 3) {
        // go 1/2 up
        if (bounce_3_stage == 0) {
          bounce_3_y_speed -= bounce_3_y_accel;
          bounce_3_width_speed += bounce_3_width_accel;
          bounce_3_height_speed -= bounce_3_height_accel;
  
          player.bounceY += bounce_3_y_speed;
          player.width += bounce_3_width_speed;
          player.height += bounce_3_height_speed;
  
          playerLimitSize();
  
          if (bounce_3_y_speed < bounce_3_y_speed_max) {
            bounce_3_y_speed = bounce_3_y_speed_max;
            bounce_3_stage = 1;
          }
        }
        // go 2/2 up
        else if (bounce_3_stage == 1) {
          bounce_3_y_speed += bounce_3_y_accel;
          bounce_3_width_speed -= bounce_3_width_accel;
          bounce_3_height_speed += bounce_3_height_accel;
  
          player.bounceY += bounce_3_y_speed;
          player.width += bounce_3_width_speed;
          player.height += bounce_3_height_speed;
  
          playerLimitSize();
  
          if (bounce_3_y_speed >= 0) {
            bounce_3_stage = 2;
          }
        }
        // go down
        else if (bounce_3_stage == 2) {
          bounce_3_y_speed += bounce_3_y_accel;
          bounce_3_width_speed += bounce_3_width_accel / 2;
          bounce_3_height_speed -= bounce_3_height_accel / 2;
  
          player.bounceY += bounce_3_y_speed;
  
          if (bounce_3_width_speed < 0) player.width += bounce_3_width_speed / 2;
          else player.width -= bounce_3_width_speed / 2;
          if (bounce_3_height_speed > 0) player.height += bounce_3_height_speed / 2;
          else player.height -= bounce_3_height_speed / 2;
  
          playerLimitSize();
  
          if (player.bounceY >= player.bounceTarget) {
            player.bounceY = player.bounceTarget;
            bounce_4_size_speed = bounce_4_size_speed_reset;
  
            player.bounceState = 4;
  
            playSFX(sfx_bounce1);
          }
        }
      }
  
      // squish after big bounce
      else if (player.bounceState == 4) {
        if (player.width < player_size_max_less) player.width += bounce_4_size_speed;
        if (player.height > player_size_min_less) player.height -= bounce_4_size_speed;
  
        bounce_4_size_speed -= bounce_4_size_decel;
  
        if (bounce_4_size_speed < bounce_4_size_speed_min) bounce_4_size_speed = bounce_4_size_speed_min;
  
        playerLimitSizeLess();
  
        if (player.width >= player_size_max_less && player.height <= player_size_min_less) {
          player.width = player_size_max_less;
          player.height = player_size_min_less;
          bounce_5_size_speed = bounce_5_size_speed_reset;
          player.bounceState = 5;
        }
      }
  
      // stretch after squish
      else if (player.bounceState == 5) {
        if (player.width > player_size_min_less) player.width -= bounce_5_size_speed;
        if (player.height < player_size_max_less) player.height += bounce_5_size_speed;
  
        bounce_5_size_speed += bounce_5_size_accel;
  
        if (bounce_5_size_speed > bounce_5_size_speed_max) bounce_5_size_speed = bounce_5_size_speed_max;
  
        playerLimitSizeLess();
  
        if (player.width <= player_size_min_less && player.height >= player_size_max_less) {
          player.width = player_size_min_less;
          player.height = player_size_max_less;
  
          bounce_6_stage = bounce_6_stage_reset;
          bounce_6_y_speed = bounce_6_y_speed_reset;
          bounce_6_width_speed = bounce_6_width_speed_reset;
          bounce_6_height_speed = bounce_6_height_speed_reset;
          player.bounceState = 6;
        }
      }
  
      // small bounce
      else if (player.bounceState == 6) {
        // go 1/2 up
        if (bounce_6_stage == 0) {
          bounce_6_y_speed -= bounce_6_y_accel;
          bounce_6_width_speed += bounce_6_width_accel;
          bounce_6_height_speed -= bounce_6_height_accel;
  
          player.bounceY += bounce_6_y_speed;
          player.width += bounce_6_width_speed;
          player.height += bounce_6_height_speed;
  
          playerLimitSize();
  
          if (bounce_6_y_speed < bounce_6_y_speed_max) {
            bounce_6_y_speed = bounce_6_y_speed_max;
            bounce_6_stage = 1;
          }
        }
        // go 2/2 up
        else if (bounce_6_stage == 1) {
          bounce_6_y_speed += bounce_6_y_accel;
          bounce_6_width_speed -= bounce_6_width_accel;
          bounce_6_height_speed += bounce_6_height_accel;
  
          player.bounceY += bounce_6_y_speed;
          player.width += bounce_6_width_speed;
          player.height += bounce_6_height_speed;
  
          playerLimitSize();
  
          if (bounce_6_y_speed >= 0) {
            bounce_6_stage = 2;
          }
        }
        // go down
        else if (bounce_6_stage == 2) {
          bounce_6_y_speed += bounce_6_y_accel;
          bounce_6_width_speed -= bounce_6_width_accel;
          bounce_6_height_speed += bounce_6_height_accel;
  
          player.bounceY += bounce_6_y_speed;
          player.width += bounce_6_width_speed / 4;
          player.height += bounce_6_height_speed / 4;
          playerLimitSizeLess();
  
          if (player.bounceY >= player.bounceTarget) {
            player.bounceY = player.bounceTarget;
            bounce_7_size_speed = bounce_7_size_speed_reset;
  
            player.bounceState = 7;
          }
        }
      }
  
      // squish after big bounce
      else if (player.bounceState == 7) {
        if (player.width < player_size_max_less2) player.width += bounce_7_size_speed;
        if (player.height > player_size_min_less2) player.height -= bounce_7_size_speed;
  
        bounce_7_size_speed -= bounce_7_size_decel;
  
        if (bounce_7_size_speed < bounce_7_size_speed_min) bounce_7_size_speed = bounce_7_size_speed_min;
  
        playerLimitSizeLess2();
  
        if (player.width >= player_size_max_less2 && player.height <= player_size_min_less2) {
          player.width = player_size_max_less2;
          player.height = player_size_min_less2;
          bounce_8_size_speed = bounce_8_size_speed_reset;
          player.bounceState = 8;
        }
      }
  
      // stretch after squish
      else if (player.bounceState == 8) {
        if (player.width > 1) player.width -= bounce_8_size_speed;
        if (player.height < 1) player.height += bounce_8_size_speed;
  
        bounce_8_size_speed += bounce_8_size_accel;
  
        if (bounce_8_size_speed > bounce_8_size_speed_max) bounce_8_size_speed = bounce_8_size_speed_max;
  
        /*
              if (player.width < 1)
                  player.width = 1;
              if (player.height < 1)
                  player.height = 1;
              */
  
        if (player.width <= 1 && player.height >= 1) {
          player.width = 1;
          player.height = 1;
          player.bounceState = null;
          player.bouncing = false;
        }
      }
    }
  }
  
  // limit functions (for easier bounce animation)
  function playerLimitSize() {
    if (player.width < player_size_min) player.width = player_size_min;
    if (player.width > player_size_max) player.width = player_size_max;
    if (player.height < player_size_min) player.height = player_size_min;
    if (player.height > player_size_max) player.height = player_size_max;
  }
  
  function playerLimitSizeLess() {
    if (player.width < player_size_min_less) player.width = player_size_min_less;
    if (player.width > player_size_max_less) player.width = player_size_max_less;
    if (player.height < player_size_min_less) player.height = player_size_min_less;
    if (player.height > player_size_max_less) player.height = player_size_max_less;
  }
  
  function playerLimitSizeLess2() {
    if (player.width < player_size_min_less2) player.width = player_size_min_less2;
    if (player.width > player_size_max_less2) player.width = player_size_max_less2;
    if (player.height < player_size_min_less2) player.height = player_size_min_less2;
    if (player.height > player_size_max_less2) player.height = player_size_max_less2;
  }
  
  function updatePlayerRainbow() {
    if (player.color == PLAYER_FILL_COLORS.length) {
      var redFill_0 = PLAYER_FILL_COLORS[player.rainbowUnder][0];
      var redFill_1 = PLAYER_FILL_COLORS[player.rainbowOver][0];
      var greenFill_0 = PLAYER_FILL_COLORS[player.rainbowUnder][1];
      var greenFill_1 = PLAYER_FILL_COLORS[player.rainbowOver][1];
      var blueFill_0 = PLAYER_FILL_COLORS[player.rainbowUnder][2];
      var blueFill_1 = PLAYER_FILL_COLORS[player.rainbowOver][2];
      var redOutline_0 = PLAYER_OUTLINE_COLORS[player.rainbowUnder][0];
      var redOutline_1 = PLAYER_OUTLINE_COLORS[player.rainbowOver][0];
      var greenOutline_0 = PLAYER_OUTLINE_COLORS[player.rainbowUnder][1];
      var greenOutline_1 = PLAYER_OUTLINE_COLORS[player.rainbowOver][1];
      var blueOutline_0 = PLAYER_OUTLINE_COLORS[player.rainbowUnder][2];
      var blueOutline_1 = PLAYER_OUTLINE_COLORS[player.rainbowOver][2];
  
      var redFillDif = Math.abs(redFill_1 - redFill_0);
      var redOutlineDif = Math.abs(redOutline_1 - redOutline_0);
      var greenFillDif = Math.abs(greenFill_1 - greenFill_0);
      var greenOutlineDif = Math.abs(greenOutline_1 - greenOutline_0);
      var blueFillDif = Math.abs(blueFill_1 - blueFill_0);
      var blueOutlineDif = Math.abs(blueOutline_1 - blueOutline_0);
  
      if (player.rainbowPercent < 1) {
        player.rainbowPercent += RAINBOW_SPEED;
        if (player.rainbowPercent > 1) player.rainbowPercent = 1;
  
        // red
        if (redFill_0 > redFill_1) {
          player.redFill = Math.floor(redFill_0 - redFillDif * player.rainbowPercent);
        } else if (redFill_0 < redFill_1) {
          player.redFill = Math.floor(redFill_0 + redFillDif * player.rainbowPercent);
        }
        if (redOutline_0 > redOutline_1) {
          player.redOutline = Math.floor(redOutline_0 - redOutlineDif * player.rainbowPercent);
        } else if (redOutline_0 < redOutline_1) {
          player.redOutline = Math.floor(redOutline_0 + redOutlineDif * player.rainbowPercent);
        }
  
        // green
        if (greenFill_0 > greenFill_1) {
          player.greenFill = Math.floor(greenFill_0 - greenFillDif * player.rainbowPercent);
        } else if (greenFill_0 < greenFill_1) {
          player.greenFill = Math.floor(greenFill_0 + greenFillDif * player.rainbowPercent);
        }
        if (greenOutline_0 > greenOutline_1) {
          player.greenOutline = Math.floor(greenOutline_0 - greenOutlineDif * player.rainbowPercent);
        } else if (greenOutline_0 < greenOutline_1) {
          player.greenOutline = Math.floor(greenOutline_0 + greenOutlineDif * player.rainbowPercent);
        }
  
        // blue
        if (blueFill_0 > blueFill_1) {
          player.blueFill = Math.floor(blueFill_0 - blueFillDif * player.rainbowPercent);
        } else if (blueFill_0 < blueFill_1) {
          player.blueFill = Math.floor(blueFill_0 + blueFillDif * player.rainbowPercent);
        }
        if (blueOutline_0 > blueOutline_1) {
          player.blueOutline = Math.floor(blueOutline_0 - blueOutlineDif * player.rainbowPercent);
        } else if (blueOutline_0 < blueOutline_1) {
          player.blueOutline = Math.floor(blueOutline_0 + blueOutlineDif * player.rainbowPercent);
        }
      } else {
        player.rainbowPercent = 0;
        player.redFill = redFill_1;
        player.redOutline = redOutline_1;
        player.greenFill = greenFill_1;
        player.greenOutline = greenOutline_1;
        player.blueFill = blueFill_1;
        player.blueOutline = blueOutline_1;
        player.rainbowUnder = player.rainbowOver;
        player.rainbowOver++;
        if (player.rainbowOver == PLAYER_FILL_COLORS.length) player.rainbowOver = 0;
      }
    }
  }
  
var instructions = [
	[-1, "Touch anywhere on the screen and drag to move.", CANVAS_WIDTH / 2],
	[2, "Collect all the coins.", CANVAS_WIDTH / 2],
	[3, "Sometimes there's extra checkpoints to help out.", CANVAS_WIDTH / 2],
	[4, "Sometimes going", "diagonally helps.", CANVAS_WIDTH / 4],
	[6, "You can change the player color on the menu.", CANVAS_WIDTH / 2]
];

function initInstructions() {
	instrForLevel = null;
	for (var i = 0; i < instructions.length; i++) {
		if (instructions[i][0] == level) {
			instrForLevel = i;
			break;
		}
	}
	if (instrForLevel != null) {
		instructionsOn = true;
		instructionsWaiting = true;
		instructionsFadingIn = false;
		instructionsFadingOut = false;
		instructionsTimer = 0;
		instructionsAlpha = 0;
	}
}

function updateInstructions() {
	if (instructionsOn && instrForLevel != null) {
		if (instructionsWaiting) {
			if (instructionsTimer < INSTRUCTIONS_WAIT_TIME_TOT) {
				instructionsTimer++;
			} else {
				instructionsTimer = 0;
				instructionsAlpha = 0;
				instructionsFadingIn = true;
				instructionsFadingOut = false;
				instructionsWaiting = false;
			}
		}
		else if (instructionsFadingIn) {
			if (instructionsAlpha < 1) {
				instructionsAlpha += INSTRUCTIONS_FADE_IN_SPEED;
			} else {
				instructionsAlpha = 1;
				instructionsTimer = 0;
				instructionsFadingIn = false;
				instructionsFadingOut = false;
				instructionsWaiting = false;
			}
		} else if (!instructionsFadingIn &&
				   !instructionsFadingOut &&
				   !instructionsWaiting) {
			if (instructionsTimer < INSTRUCTIONS_TIMER_TOT) {
				instructionsTimer++;
			} else {
				instructionsFadingIn = false;
				instructionsFadingOut = true;
				instructionsWaiting = false;
				instructionsTimer = 0;
				instructionsAlpha = 1;
			}
		} else if (instructionsFadingOut) {
			if (instructionsAlpha > 0) {
				instructionsAlpha -= INSTRUCTIONS_FADE_OUT_SPEED;
				if(instructionsAlpha<0){
					instructionsAlpha = 0;
				}
			} else {
				finishInstructions();
			}
		}
	}
}

function drawInstructions() {
	if (instrForLevel != null) {
		canvas.fillStyle = INSTRUCTIONS_COLOR + instructionsAlpha + ")";
		canvas.font = "Bold " + cwh(INSTRUCTIONS_TEXT_SIZE) + "px Arial";
		canvas.textAlign = "center";
		if (instructions[instrForLevel].length == 3) {
			canvas.fillText(instructions[instrForLevel][1], cwh(instructions[instrForLevel][2]) + os.x, cwh(INSTRUCTIONS_Y_0) + os.y);
		} else if (instructions[instrForLevel].length == 4) {
			canvas.fillText(instructions[instrForLevel][1], cwh(instructions[instrForLevel][3]) + os.x, cwh(INSTRUCTIONS_Y_0) + os.y);
			canvas.fillText(instructions[instrForLevel][2], cwh(instructions[instrForLevel][3]) + os.x, cwh(INSTRUCTIONS_Y_1) + os.y);
		}
	}
}

function finishInstructions() {
	instructionsOn = false;
	instructionsFadingIn = false;
	instructionsFadingOut = false;
	instructionsWaiting = false;
	instructionsTimer = 0;
	instructionsAlpha = 0;
	instrForLevel = null;
}
var intermissions = [
    [],
    /*  L1 */["YOU DON'T KNOW WHAT", "YOU'RE GETTING INTO."],
    /*  L2 */["DON'T EVEN BOTHER", "TRYING."],
    /*  L3 */["I CAN ALMOST", "GUARANTEE THAT", "YOU WILL FAIL."],
    /*  L4 */["THAT ONE WAS EASY."],
    /*  L5 */["YEAH THAT'S RIGHT!"],
    /*  L6 */["DON'T GET DIZZY!"],
    /*  L7 */["HOW FAST CAN", "YOU GO?"],
    /*  L8 */["DON'T GET CONFUSED,", "NOW."],
    /*  L9 */["HOW GOOD ARE YOUR", "REFLEXES?"],
    /* L10 */["HARDER THAN IT", "LOOKS."],
    /* L11 */["JUST GIVE UP...", "IT KEEPS GETTING", "HARDER."],
    /* L12 */["I HOPE YOU'RE", "NOT IN A HURRY."],
    /* L13 */["THIS IS WAY TOO", "EASY. SERIOUSLY.", "NOT HARD."],
    /* L14 */["IT STARTS TO GET", "REAL TRICKY HERE."],
    /* L15 */["THERE'S AN EASY", "WAY AND A", "HARD WAY."],
    /* L16 */["GIVE UP, THIS ONE", "ISN'T EVEN HARD."],
    /* L17 */["YOU WON'T BEAT", "THE GAME."],
    /* L18 */["THIS ONE IS SO", "HARD YOU'LL NEVER", "DO IT."],
    /* L19 */["NOT SO EASY,", "IS IT?"],
    /* L20 */["IT GETS HARDER NOW."],
    /* L21 */["YOU'VE ALREADY LOST."],
    /* L22 */["DON'T CHOKE!"],
    /* L23 */["AROUND AND AROUND..."],
    /* L24 */["THIS ONE ISN'T", "HARD IF YOU KNOW", "THE TRICK."],
    /* L25 */["YOU'RE PROBABLY", "GETTING FRUSTRATED."],
    /* L26 */["THIS SHOULDN'T EVEN", "TAKE MORE THAN", "2 DEATHS."],
    /* L27 */["NOT HARD AT ALL."],
    /* L28 */["BABY WANT HIS", "BOTTLE?"],
    /* L29 */["MIGHT BE TRICKY."],
    /* L30 */["THE FOLLOWING", "LEVEL IS IMPOSSIBLE."]
];

function initIntermission() {
    state = "intermission";
    intermissionTimer = INTERMISSION_TIMER_TOT;
    finishInstructions();
}

function updateIntermission() {
    if (state == "intermission") {
        if (intermissionTimer > 0) {
            intermissionTimer--;
        } else {
            state = "game";
            resetPlayer();
            resetEnemies(level);
            playerAtCheck(true);
    		initInstructions();
            justLoaded = false;
        }
    }
}

function drawIntermission() {
    drawPlainBg();
    
    // text
    const TEXT_SIZE = 50;
    canvas.fillStyle = "black";
    canvas.font = "bold " + cwh(TEXT_SIZE) + "px Arial";
    canvas.textAlign = "center";
    if (intermissions[level].length == 1) {
        canvas.fillText(intermissions[level][0], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 + INTERMISSION_Y_FIX) + os.y);
    } else if (intermissions[level].length == 2) {
        canvas.fillText(intermissions[level][0], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 - TEXT_SIZE / 2 - INTERMISSION_TEXT_SPACE + INTERMISSION_Y_FIX) + os.y);
        canvas.fillText(intermissions[level][1], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 + TEXT_SIZE / 2 + INTERMISSION_TEXT_SPACE + INTERMISSION_Y_FIX) + os.y);
    } else if (intermissions[level].length == 3) {
        canvas.fillText(intermissions[level][0], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 - (TEXT_SIZE + INTERMISSION_TEXT_SPACE * 2) + INTERMISSION_Y_FIX) + os.y);
        canvas.fillText(intermissions[level][1], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 + INTERMISSION_Y_FIX) + os.y);
        canvas.fillText(intermissions[level][2], cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT / 2 + (TEXT_SIZE + INTERMISSION_TEXT_SPACE * 2) + INTERMISSION_Y_FIX) + os.y);
    }
}

function drawPlainBg() {
	var color0, color1;
	if (level >= WALLS_RED) {
		color0 = INTERMISSION_COLOR_2_0;
		color1 = INTERMISSION_COLOR_2_1;
	} else if (level >= WALLS_PURPLE) {
		color0 = INTERMISSION_COLOR_1_0;
		color1 = INTERMISSION_COLOR_1_1;
	} else {
		color0 = INTERMISSION_COLOR_0_0;
		color1 = INTERMISSION_COLOR_0_1;
	}
	
    var grad = canvas.createLinearGradient(os.x, os.y, os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2) + os.y);
    canvas.beginPath();
    canvas.rect(os.x, cwh(BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2));
    grad.addColorStop(0, color0);
    grad.addColorStop(1, color1);
    canvas.fillStyle = grad;
    canvas.fill();
}
var buttons = [
    ["pl_playGame", 175, 625, 205, 335, ["preloader"]],
    ["mm_playGame", 100, 293, 270, 440, ["main_menu"]],
    ["mm_loadGame", 293, 473, 270, 440, ["main_menu"]],
    ["mm_levelSelect", 473, 690, 270, 440, ["main_menu"]],
    //    ["mm_stephenCritoph",   1, 518,   0,  50, ["main_menu", "level_select", "finish"]],
    //    ["mm_snayk",          518, 800,   0,  50, ["main_menu", "level_select", "finish"]],
    ["mm_mute", 400, 800, 550, 600, ["main_menu", "level_select", "finish"]],
    ["bars_pause/menu", 0, 250, 550, 600, ["intermission", "game"]],
    ["fs", 250, 550, 550, 600, ["preloader", "main_menu", "level_select", "finish", "game", "intermission"]],
    ["bars_mute", 550, 800, 550, 600, ["intermission", "game"]],
    ["ig_resumeGame", 180, 620, 80, 145, ["intermission", "game"]],
    ["ig_mainMenu", 180, 620, 145, 195, ["intermission", "game"]],
    ["ig_levelSelect", 180, 620, 195, 245, ["intermission", "game"]],
    ["ig_playerColor", 180, 620, 245, 295, ["intermission", "game"]],
    ["ig_muteSFX", 180, 620, 295, 345, ["intermission", "game"]],
    ["ig_muteMusic", 180, 620, 345, 395, ["intermission", "game"]],
    ["ig_playerBouncing", 180, 620, 395, 445, ["intermission", "game"]],
    //    ["ig_stephenCritoph", 180, 620, 445, 510, ["intermission", "game"]],
    ["ls_back", 0, 205, 500, 550, ["level_select"]],
    ["ls_menu", 205, 590, 500, 550, ["level_select", "finish"]],
    ["ls_next", 590, 800, 500, 550, ["level_select"]],
    ["ls_1", 0, 150, 85, 220, ["level_select"]],
    ["ls_2", 150, 275, 85, 220, ["level_select"]],
    ["ls_3", 275, 400, 85, 220, ["level_select"]],
    ["ls_4", 400, 525, 85, 220, ["level_select"]],
    ["ls_5", 525, 650, 85, 220, ["level_select"]],
    ["ls_6", 650, 775, 85, 220, ["level_select"]],
    ["ls_7", 0, 150, 220, 350, ["level_select"]],
    ["ls_8", 150, 275, 220, 350, ["level_select"]],
    ["ls_9", 275, 400, 220, 350, ["level_select"]],
    ["ls_10", 400, 525, 220, 350, ["level_select"]],
    ["ls_11", 525, 650, 220, 350, ["level_select"]],
    ["ls_12", 650, 800, 220, 350, ["level_select"]],
    ["ls_13", 0, 150, 350, 485, ["level_select"]],
    ["ls_14", 150, 275, 350, 485, ["level_select"]],
    ["ls_15", 275, 400, 350, 485, ["level_select"]],
    ["ls_16", 400, 525, 350, 485, ["level_select"]],
    ["ls_17", 525, 650, 350, 485, ["level_select"]],
    ["ls_18", 650, 800, 350, 485, ["level_select"]],
    ["ls_19", 0, 150, 135, 280, ["level_select"]],
    ["ls_20", 150, 275, 135, 280, ["level_select"]],
    ["ls_21", 275, 400, 135, 280, ["level_select"]],
    ["ls_22", 400, 525, 135, 280, ["level_select"]],
    ["ls_23", 525, 650, 135, 280, ["level_select"]],
    ["ls_24", 650, 800, 135, 280, ["level_select"]],
    ["ls_25", 0, 150, 280, 420, ["level_select"]],
    ["ls_26", 150, 275, 280, 420, ["level_select"]],
    ["ls_27", 275, 400, 280, 420, ["level_select"]],
    ["ls_28", 400, 525, 280, 420, ["level_select"]],
    ["ls_29", 525, 650, 280, 420, ["level_select"]],
    ["ls_30", 650, 800, 280, 420, ["level_select"]],
  ];
  
  function correctButtonsTerms(name) {
    var group = 0;
    var group1 = ["ig_resumeGame", "ig_mainMenu", "ig_levelSelect", "ig_playerColor", "ig_muteSFX", "ig_muteMusic", "ig_playerBouncing", "ig_coolmathGames", "ig_stephenCritoph"];
  
    var group2 = ["ls_next", "ls_1", "ls_2", "ls_3", "ls_4", "ls_5", "ls_6", "ls_7", "ls_8", "ls_9", "ls_10", "ls_11", "ls_12", "ls_13", "ls_14", "ls_15", "ls_16", "ls_17", "ls_18"];
  
    var group3 = ["ls_back", "ls_19", "ls_20", "ls_21", "ls_22", "ls_23", "ls_24", "ls_25", "ls_26", "ls_27", "ls_28", "ls_29", "ls_30"];
  
    for (var i = 0; i < group1.length; i++) {
      if (name == group1[i]) {
        group = 1;
        break;
      }
    }
  
    if (group == 0) {
      for (var i = 0; i < group2.length; i++) {
        if (name == group2[i]) {
          group = 2;
          break;
        }
      }
    }
  
    if (group == 0) {
      for (var i = 0; i < group3.length; i++) {
        if (name == group3[i]) {
          group = 3;
          break;
        }
      }
    }
  
    if (name == "pl_playGame") {
      if (loadedAssets == TOTAL_ASSETS) return true;
      else return false;
    }
  
    if (group == 1) {
      if (paused) return true;
      else return false;
    } else if (group == 2) {
      if (ls_page == 1) return true;
      else return false;
    } else if (group == 3) {
      if (ls_page == 2) return true;
      else return false;
    }
  
    return true;
  }
  
  function clickButtons() {
    if (onButton("fs")) {
      //playSFX(sfx_click);
      //justClicked = true;
      /*
          if (FSOn)
              exitFullScreen();
          else
              goFullScreen();
          */
    } else if (onButton("pl_playGame")) {
      //playSFX(sfx_click);
      music.play();
      justClicked = true;
      if (localStorage.getItem("whg_level") == null) localStorage.setItem("whg_coins", "[-99]");
      state = "main_menu";
    } else if (onButton("mm_playGame")) {
      playSFX(sfx_intermission);
      justClicked = true;
      player.dying = false;
      paused = false;
      gameTimer = 0;
      level = 1;
      deaths = 0;
      coinsSave = [-99];
      localStorage.setItem("whg_gameTimer", gameTimer);
      localStorage.setItem("whg_level", level);
      localStorage.setItem("whg_deaths", deaths);
      localStorage.setItem("whg_curCheck", 0);
      localStorage.setItem("whg_coins", "[-99]");
      justLoaded = false;
      initIntermission();
    } else if (onButton("mm_loadGame")) {
      playSFX(sfx_intermission);
      justClicked = true;
      player.dying = false;
      paused = false;
      if (localStorage.getItem("whg_level") == null) {
        gameTimer = 0;
        level = 1;
        deaths = 0;
        curCheck = 0;
        coinsSave = [-99];
        localStorage.setItem("whg_gameTimer", gameTimer);
        localStorage.setItem("whg_level", level);
        localStorage.setItem("whg_deaths", deaths);
        localStorage.setItem("whg_curCheck", 0);
        localStorage.setItem("whg_coins", "[-99]");
        resetCoins(level);
      } else {
        gameTimer = parseInt(localStorage.getItem("whg_gameTimer"));
        level = parseInt(localStorage.getItem("whg_level"));
        deaths = parseInt(localStorage.getItem("whg_deaths"));
        curCheck = parseInt(localStorage.getItem("whg_curCheck"));
        loadSavedCoins();
      }
      justLoaded = true;
      justLoadedTimer = true;
      initIntermission();
    } else if (onButton("mm_levelSelect")) {
      playSFX(sfx_click);
      justClicked = true;
      paused = false;
      player.dying = false;
      level = null;
      ls_page = 1;
      state = "level_select";
    } else if (onButton("mm_mute")) {
    /*
      else if (onButton("mm_moreGames")) {
          playSFX(sfx_click);
          justClicked = true;
          window.open(LINK_COOLMATH, "_blank");
      }
      */
      if (muteSFX && muteMusic) {
        justClicked = true;
        doUnmuteSFX();
        doUnmuteMusic();
        playSFX(sfx_click);
      } else {
        justClicked = true;
        doMuteSFX();
        doMuteMusic();
      }
    } else if (onButton("mm_stephenCritoph")) {
      playSFX(sfx_click);
      justClicked = true;
      window.open(LINK_STEPHEN, "_blank");
    } else if (onButton("mm_snayk")) {
      playSFX(sfx_click);
      justClicked = true;
      window.open(LINK_SNAYK, "_blank");
    } else if (onButton("bars_mute")) {
    /*
      else if (onButton("mm_coolmathGames")) {
          playSFX(sfx_click);
          justClicked = true;
          window.open(LINK_COOLMATH, "_blank");
      }
      */
    /*
      else if (onButton("bars_coolmath")) {
          playSFX(sfx_click);
          justClicked = true;
          window.open(LINK_COOLMATH, "_blank");
      }
      */
      if (muteSFX && muteMusic) {
        justClicked = true;
        doUnmuteSFX();
        doUnmuteMusic();
        playSFX(sfx_click);
      } else {
        justClicked = true;
        doMuteSFX();
        doMuteMusic();
      }
    } else if (onButton("bars_pause/menu")) {
      if (paused) {
        playSFX(sfx_click);
        justClicked = true;
        paused = false;
  
        if (pauseTime != 0) gameTimer -= new Date().getTime() - pauseTime;
      } else {
        playSFX(sfx_click);
        justClicked = true;
        paused = true;
  
        pauseTime = new Date().getTime();
      }
    } else if (onButton("ig_resumeGame")) {
      if (paused) {
        playSFX(sfx_click);
        justClicked = true;
        paused = false;
  
        if (pauseTime != 0) gameTimer -= new Date().getTime() - pauseTime;
      }
    } else if (onButton("ig_mainMenu")) {
      if (paused) {
        playSFX(sfx_click);
        justClicked = true;
        paused = false;
        player.dying = false;
        level = null;
        state = "main_menu";
      }
    } else if (onButton("ig_levelSelect")) {
      if (paused) {
        resetCoins(level);
        playSFX(sfx_click);
        justClicked = true;
        paused = false;
        player.dying = false;
        level = null;
        ls_page = 1;
        state = "level_select";
      }
    } else if (onButton("ig_playerColor")) {
      if (paused) {
        if (player.color < PLAYER_FILL_COLORS.length - 1) {
          playSFX(sfx_click);
          justClicked = true;
          player.color++;
          player.redFill = PLAYER_FILL_COLORS[player.color][0];
          player.greenFill = PLAYER_FILL_COLORS[player.color][1];
          player.blueFill = PLAYER_FILL_COLORS[player.color][2];
          player.redOutline = PLAYER_OUTLINE_COLORS[player.color][0];
          player.greenOutline = PLAYER_OUTLINE_COLORS[player.color][1];
          player.blueOutline = PLAYER_OUTLINE_COLORS[player.color][2];
        } else if (player.color < PLAYER_FILL_COLORS.length) {
          playSFX(sfx_click);
          justClicked = true;
          player.color++;
          player.redFill = PLAYER_FILL_COLORS[RAINBOW_START][0];
          player.greenFill = PLAYER_FILL_COLORS[RAINBOW_START][1];
          player.blueFill = PLAYER_FILL_COLORS[RAINBOW_START][2];
          player.redOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][0];
          player.greenOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][1];
          player.blueOutline = PLAYER_OUTLINE_COLORS[RAINBOW_START][2];
          player.rainbowUnder = RAINBOW_START;
          player.rainbowOver = RAINBOW_START + 1;
          player.rainbowPercent = 0;
        } else {
          playSFX(sfx_click);
          justClicked = true;
          player.color = 0;
          player.redFill = PLAYER_FILL_COLORS[player.color][0];
          player.greenFill = PLAYER_FILL_COLORS[player.color][1];
          player.blueFill = PLAYER_FILL_COLORS[player.color][2];
          player.redOutline = PLAYER_OUTLINE_COLORS[player.color][0];
          player.greenOutline = PLAYER_OUTLINE_COLORS[player.color][1];
          player.blueOutline = PLAYER_OUTLINE_COLORS[player.color][2];
          player.rainbowUnder = null;
          player.rainbowOver = null;
          player.rainbowPercent = 0;
        }
      }
    } else if (onButton("ig_muteSFX")) {
      if (paused) {
        if (muteSFX) {
          justClicked = true;
          doUnmuteSFX();
          playSFX(sfx_click);
        } else {
          justClicked = true;
          doMuteSFX();
        }
      }
    } else if (onButton("ig_muteMusic")) {
      if (paused) {
        if (muteMusic) {
          playSFX(sfx_click);
          justClicked = true;
          doUnmuteMusic();
        } else {
          playSFX(sfx_click);
          justClicked = true;
          doMuteMusic();
        }
      }
    } else if (onButton("ig_playerBouncing")) {
      if (paused) {
        if (bouncingEnabled) {
          justClicked = true;
          bouncingEnabled = false;
  
          player.bouncing = false;
          player.bounceState = null;
          player.bounceY = null;
          player.bounceTarget = null;
          player.width = 1;
          player.height = 1;
  
          playSFX(sfx_click);
        } else {
          justClicked = true;
          bouncingEnabled = true;
          playSFX(sfx_click);
        }
      }
    } else if (onButton("ig_stephenCritoph")) {
    /*
      else if (onButton("ig_coolmathGames")) {
          if (paused) {
              playSFX(sfx_click);
              justClicked = true;
              window.open(LINK_COOLMATH, "_blank");
          }
      }
      */
      if (paused) {
        playSFX(sfx_click);
        justClicked = true;
        window.open(LINK_STEPHEN, "_blank");
      }
    } else if (onButton("ls_menu")) {
      playSFX(sfx_click);
      justClicked = true;
      state = "main_menu";
    } else if (onButton("ls_back")) {
      playSFX(sfx_click);
      justClicked = true;
      ls_page = 1;
    } else if (onButton("ls_next")) {
      playSFX(sfx_click);
      justClicked = true;
      ls_page = 2;
    }
  
    // level select
    if (state == "level_select") {
      for (var i = 0; i < LS_ALL_TOT; i++) {
        if (onButton("ls_" + (i + 1))) {
          if ((i < LS_PAGE_TOT && ls_page == 1) || (i >= LS_PAGE_TOT && ls_page == 2)) {
            playSFX(sfx_intermission);
            justClicked = true;
            player.dying = false;
            paused = false;
            level = i + 1;
            deaths = 0;
            gameTimer = 0;
            coinsSave = [-99];
            curCheck = 0;
            resetCoins(i + 1);
            localStorage.setItem("whg_gameTimer", gameTimer);
            localStorage.setItem("whg_level", level);
            localStorage.setItem("whg_deaths", deaths);
            localStorage.setItem("whg_curCheck", 0);
            localStorage.setItem("whg_coins", "[-99]");
            initIntermission();
          }
        }
      }
    }
  }
  
  function onButton(name) {
    if (!justClicked) {
      var id = -1;
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i][0] == name) {
          id = i;
          break;
        }
      }
      if (id != -1) {
        var correctState = false;
        for (var i = 0; i < buttons[id][5].length; i++) {
          if (state == buttons[id][5][i]) {
            correctState = true;
            break;
          }
        }
  
        if (correctState && correctButtonsTerms(name) && mouseX >= cwh(buttons[id][1]) + os.x && mouseX < cwh(buttons[id][2]) + os.x && mouseY >= cwh(buttons[id][3]) + os.y && mouseY < cwh(buttons[id][4]) + os.y) {
          if (cursorType == 0) {
            $("#twhgCanvas").css("cursor", "pointer");
            cursorType = 1;
          }
          touchOn = false;
          return true;
        }
      }
    }
    return false;
  }
function getMousePos(evt) {
  const rect = canvasElement.getBoundingClientRect();
  const scaleX = canvasElement.width / rect.width;
  const scaleY = canvasElement.height / rect.height;
  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  };
}

canvasElement.addEventListener("mousemove", function(evt) {
    var mousePos = getMousePos(evt);
	mouseX = mousePos.x;
    mouseY = mousePos.y;
}, false);

canvasElement.addEventListener("mousedown", function(evt) {
    mouseDown = true;
    clickButtons();
}, false);

canvasElement.addEventListener("mouseup", function(evt) {
    mouseDown = false;
}, false);

// not called in mobile version
function resetMouse() {
	if (justClicked) {
        justClicked = false;
    }
    else if (cursorType == 1) {
        $("#twhgCanvas").css("cursor", "auto");
        cursorType = 0;
    }
}
function drawBars() {
    if (mobile) {
      // bars
      canvas.beginPath();
      canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(BAR_HEIGHT));
      canvas.fillStyle = "black";
      canvas.fill();
  
      canvas.beginPath();
      canvas.rect(os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(BAR_HEIGHT));
      canvas.fillStyle = "black";
      canvas.fill();
  
      // game text
      if (state == "game" || state == "intermission") {
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        canvas.fillText("LEVEL: " + level, cwh(BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        if (getCoinsTotal() > 0) {
          canvas.fillStyle = "white";
          canvas.font = cwh(30) + "px Arial";
          canvas.textAlign = "center";
          canvas.fillText("COINS: " + getCoinsCollected() + "/" + getCoinsTotal(), cwh(CANVAS_WIDTH / 2) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        }
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        canvas.fillText("FAILS: " + numberWithCommas(deaths), cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        /*
              if (onButton("bars_coolmath"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(704) + os.x, cwh(591) + os.y, cwh(25), cwh(3));
          //canvas.fill();
        } else {
          canvas.fillText("MUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(704) + os.x, cwh(591) + os.y, cwh(25), cwh(3));
          //canvas.fill();
        }
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        if (paused) {
          canvas.fillText("UNPAUSE", cwh(BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(53) + os.x, cwh(591) + os.y, cwh(20), cwh(3));
          //canvas.fill();
        } else {
          canvas.fillText("PAUSE/MENU", cwh(BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
          //canvas.beginPath();
          //canvas.rect(cwh(8) + os.x, cwh(591) + os.y, cwh(20), cwh(3));
          //canvas.fill();
        }
      }
  
      // main menu / level select text
      else if (state == "main_menu" || state == "level_select" || state == "finish") {
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "left";
        canvas.fillText("CREATOR: STEPHEN CRITOPH", cwh(BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        canvas.fillText("MUSIC: SNAYK", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
  
        /*
              if (onButton("mm_coolmathGames"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH GAMES", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        canvas.fillStyle = "white";
        canvas.font = cwh(30) + "px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        } else {
          canvas.fillText("MUTE", cwh(CANVAS_WIDTH - BAR_TEXT_FIX) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
        }
        //canvas.beginPath();
        //canvas.rect(704, 591, 25, 3);
        //canvas.fill();
      }
    } else {
      // bars
      canvas.beginPath();
      canvas.rect(0, 0, CANVAS_WIDTH, BAR_HEIGHT);
      canvas.fillStyle = "black";
      canvas.fill();
  
      canvas.beginPath();
      canvas.rect(0, CANVAS_HEIGHT - BAR_HEIGHT, CANVAS_WIDTH, BAR_HEIGHT);
      canvas.fillStyle = "black";
      canvas.fill();
  
      // game text
      if (state == "game" || state == "intermission") {
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        canvas.fillText("LEVEL: " + level, BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        if (getCoinsTotal() > 0) {
          canvas.fillStyle = "white";
          canvas.font = "30px Arial";
          canvas.textAlign = "center";
          canvas.fillText("COINS: " + getCoinsCollected() + "/" + getCoinsTotal(), CANVAS_WIDTH / 2, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        }
  
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        canvas.fillText("FAILS: " + numberWithCommas(deaths), CANVAS_WIDTH - BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        /*
              if (onButton("bars_coolmath"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        if (onButton("bars_mute")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(704, 591, 25, 3);
          canvas.fill();
        } else {
          canvas.fillText("MUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(704, 591, 25, 3);
          canvas.fill();
        }
  
        if (onButton("bars_pause/menu")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        if (paused) {
          canvas.fillText("UNPAUSE", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(53, 591, 20, 3);
          canvas.fill();
        } else {
          canvas.fillText("PAUSE/MENU", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
          canvas.beginPath();
          canvas.rect(8, 591, 20, 3);
          canvas.fill();
        }
      }
  
      // main menu / level select text
      else if (state == "main_menu" || state == "level_select" || state == "finish") {
        //if (onButton("mm_stephenCritoph"))
        //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        //else
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "left";
        canvas.fillText("CREATOR: STEPHEN CRITOPH", BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        //if (onButton("mm_snayk"))
        //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        //else
        canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        canvas.fillText("MUSIC: SNAYK", CANVAS_WIDTH - BAR_TEXT_FIX, BAR_HEIGHT / 2 + BAR_TEXT_FIX);
  
        /*
              if (onButton("mm_coolmathGames"))
                  canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
              else
                  canvas.fillStyle = "white";
              canvas.font = "30px Arial";
              canvas.textAlign = "left";
              canvas.fillText("COOLMATH GAMES", BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
              */
  
        if (onButton("mm_mute")) canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
        else canvas.fillStyle = "white";
        canvas.font = "30px Arial";
        canvas.textAlign = "right";
        if (muteSFX && muteMusic) {
          canvas.fillText("UNMUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        } else {
          canvas.fillText("MUTE", CANVAS_WIDTH - BAR_TEXT_FIX, CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX);
        }
        canvas.beginPath();
        canvas.rect(704, 591, 25, 3);
        canvas.fill();
      }
    }
  }
  
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
const BOTTOM_BUTTONS_Y = cwh(CANVAS_HEIGHT - BAR_HEIGHT - 10);
const BOTTOM_FONT = cwh(20) + "px Arial";

function drawMainMenu() {
  // music
  if (firstTimeOnMainMenu && !muteMusic) {
    music.play();
    firstTimeOnMainMenu = false;
  }

  // buttons
  if (!mobile) {
    if (onButton("mm_playGame")) canvas.drawImage(img_mainMenu_playGame, 0, BAR_HEIGHT);
    else if (onButton("mm_loadGame")) canvas.drawImage(img_mainMenu_loadGame, 0, BAR_HEIGHT);
    else if (onButton("mm_levelSelect")) canvas.drawImage(img_mainMenu_levelSelect, 0, BAR_HEIGHT);
    else if (onButton("mm_moreGames")) canvas.drawImage(img_mainMenu_moreGames, 0, BAR_HEIGHT);
    else canvas.drawImage(img_mainMenu, 0, BAR_HEIGHT);
  } else {
    canvas.drawImage(img_mainMenu, os.x, cwh(BAR_HEIGHT) + os.y, cwh(MENU_IMG_WIDTH), cwh(MENU_IMG_HEIGHT));
  }

  /*
	// bottom text - label
	canvas.fillStyle = "black";
	canvas.font = BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("MORE FROM THE SERIES:", 128, BOTTOM_BUTTONS_Y);

	// bottom text - twhg2
	if (onButton("mm_twhg2"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG2", 393, BOTTOM_BUTTONS_Y);

	// bottom text - sep 0
	drawSep(482, 533);

	// bottom text - twhg3
	if (onButton("mm_twhg3"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG3", 497, BOTTOM_BUTTONS_Y);

	// bottom text - sep 1
	drawSep(585, 533);

	// bottom text - twhg4
	if (onButton("mm_twhg4"))
		canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
	else
		canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "left";
	canvas.fillText("TWHG4", 600, BOTTOM_BUTTONS_Y);
	
	// coming soon
	if (onButton("mm_twhg2"))
		drawComingSoon(430);
	else if (onButton("mm_twhg3"))
		drawComingSoon(534);
	else if (onButton("mm_twhg4"))
		drawComingSoon(637);
	*/
}

/*
function drawSep(x, y) {
	const SEP_SIZE = 10;
	const SEP_OUTLINE_SIZE = 3;
	canvas.beginPath();
	canvas.arc(x, y, SEP_SIZE / 2, 0, 2 * Math.PI, false);
	canvas.fillStyle = ENEMY_FILL_COLOR_0;
	canvas.fill();
	canvas.lineWidth = SEP_OUTLINE_SIZE;
	canvas.strokeStyle = ENEMY_OUTLINE_COLOR_0;
	canvas.stroke();
}

function drawComingSoon(x) {
	var y = 515;
	var triangle = 15;
	var rectWidth = 280;
	var rectHeight = 40;
	var strokeWidth = 2;
	var shadowOffset = 7;
	
	// shadow
	canvas.beginPath();
	canvas.moveTo(x + shadowOffset, y + shadowOffset);
	canvas.lineTo(x - triangle + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x - rectWidth / 2 + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x - rectWidth / 2 + shadowOffset, y - triangle - rectHeight + shadowOffset);
	canvas.lineTo(x + rectWidth / 2 + shadowOffset, y - triangle - rectHeight + shadowOffset);
	canvas.lineTo(x + rectWidth / 2 + shadowOffset, y - triangle + shadowOffset);
	canvas.lineTo(x + triangle + shadowOffset, y - triangle + shadowOffset);
	canvas.closePath();
	canvas.fillStyle = MENU_SHADOW_COLOR;
	canvas.fill();
	
	// main bubble
	canvas.beginPath();
	canvas.moveTo(x, y);
	canvas.lineTo(x - triangle, y - triangle);
	canvas.lineTo(x - rectWidth / 2, y - triangle);
	canvas.lineTo(x - rectWidth / 2, y - triangle - rectHeight);
	canvas.lineTo(x + rectWidth / 2, y - triangle - rectHeight);
	canvas.lineTo(x + rectWidth / 2, y - triangle);
	canvas.lineTo(x + triangle, y - triangle);
	canvas.closePath();
	canvas.fillStyle = "#fff";
	canvas.fill();
    canvas.lineWidth = strokeWidth;
    canvas.strokeStyle = "#000";
    canvas.stroke();
    
    // text
    canvas.fillStyle = "black";
	canvas.font = "bold " + BOTTOM_FONT;
	canvas.textAlign = "center";
	canvas.fillText("HTML5 COMING SOON...", x, y - 28);
}
*/
const LS_TILE_SIZE = 5;
const LS_TILES_WIDTH = 20;
const LS_TILES_HEIGHT = 15;
const LS_BDR_SIZE = 2;
const LS_ENEMY_SIZE = 3;
const LS_COIN_SIZE = 3;
const LS_PLAYER_SIZE = 4;

const startX = 37;
const startY = 125;
const sepX = 125;
const sepY = 130;
const LS_Y_ADD_P2 = 58;
const LS_SHADOW_OFFSET = 5;

function drawLevelSelect() {
	drawPlainBg();
	var addX, addY;
	var numOnPage;
	var addToLevel = 0;
	var yAddP2 = 0;
	
	if (ls_page == 1) {
		numOnPage = LS_PAGE_TOT;
	}
	else if (ls_page == 2) {
		numOnPage = LS_ALL_TOT - LS_PAGE_TOT;
		addToLevel = LS_PAGE_TOT;
		yAddP2 = LS_Y_ADD_P2;
	}
	
	for (i = 0; i < numOnPage; i++) {
		curX = startX + sepX * (i % 6);
		curY = startY + (sepY * Math.floor(i / 6)) + yAddP2;
	    LS_draw_border (i + 1 + addToLevel, curX, curY);
		LS_draw_walls  (i + 1 + addToLevel, curX, curY);
		LS_draw_floor  (i + 1 + addToLevel, curX, curY);
		LS_draw_checks (i + 1 + addToLevel, curX, curY);
		LS_draw_coins  (i + 1 + addToLevel, curX, curY);
		LS_draw_enemies(i + 1 + addToLevel, curX, curY);
		LS_draw_player (i + 1 + addToLevel, curX, curY);
	    LS_draw_text   (i + 1 + addToLevel, curX, curY);
	}
	LS_draw_nav();
}

function LS_draw_player(l, x, y) {
	canvas.beginPath();
	canvas.rect(
		cwh(x + Math.floor((checkpoints[l][0][0] + checkpoints[l][0][2] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2)) + os.x,
		cwh(y + Math.floor((checkpoints[l][0][1] + checkpoints[l][0][3] / 2) * LS_TILE_SIZE - LS_PLAYER_SIZE / 2)) + os.y,
		cwh(LS_PLAYER_SIZE), cwh(LS_PLAYER_SIZE));
	canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
	canvas.fill();
}

function LS_draw_enemies(l, x, y) {
	// colors
	var enemyFillColor;
	if (l >= WALLS_RED) {
		enemyFillColor = ENEMY_FILL_COLOR_2;
	} else if (l >= WALLS_PURPLE) {
		enemyFillColor = ENEMY_FILL_COLOR_1;
	} else {
		enemyFillColor = ENEMY_FILL_COLOR_0;
	}
	
	for (var i = 0; i < enemies[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + Math.floor(enemies[l][i].simpleX * LS_TILE_SIZE - ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.x,
			cwh(y + Math.floor(enemies[l][i].simpleY * LS_TILE_SIZE - ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.y,
			cwh(LS_ENEMY_SIZE),
			cwh(LS_ENEMY_SIZE));
		canvas.fillStyle = enemyFillColor;
		canvas.fill();
	}
}

function LS_draw_coins(l, x, y) {
	for (var i = 0; i < coins[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + Math.floor(coins[l][i].simpleX * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.x,
			cwh(y + Math.floor(coins[l][i].simpleY * LS_TILE_SIZE + ((LS_TILE_SIZE - LS_COIN_SIZE) / 2))) + os.y,
			cwh(LS_COIN_SIZE),
			cwh(LS_COIN_SIZE));
		canvas.fillStyle = COIN_FILL_COLOR + "1)";;
		canvas.fill();
	}
}

function LS_draw_text(l, x, y) {
    if (onButton("ls_" + l))
        canvas.fillStyle = LS_BORDER_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(15) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("LEVEL " + l,
		cwh(x + (LS_TILE_SIZE * LS_TILES_WIDTH / 2)) + os.x,
		cwh(y - 10) + os.y);
}

function LS_draw_checks(l, x, y) {
	for (var i = 0; i < checkpoints[l].length; i++) {
		canvas.beginPath();
		canvas.rect(
			cwh(x + checkpoints[l][i][0] * LS_TILE_SIZE) + os.x,
			cwh(y + checkpoints[l][i][1] * LS_TILE_SIZE) + os.y,
			cwh(checkpoints[l][i][2] * LS_TILE_SIZE),
			cwh(checkpoints[l][i][3] * LS_TILE_SIZE));
		canvas.fillStyle = CHECK_COLOR;
		canvas.fill();
	}
}

function LS_draw_walls(l, x, y) {
	// colors
	var wallsColor;
	if (l >= WALLS_RED) {
		wallsColor = WALLS_COLOR_2;
	} else if (l >= WALLS_PURPLE) {
		wallsColor = WALLS_COLOR_1;
	} else {
		wallsColor = WALLS_COLOR_0;
	}
	
	canvas.beginPath();
	canvas.rect(
		cwh(x) + os.x,
		cwh(y) + os.y,
		cwh(LS_TILE_SIZE * TILES_X), cwh(LS_TILE_SIZE * TILES_Y));
	canvas.fillStyle = wallsColor;
	canvas.fill();
	
	/*
	for (var i = 0; i < LS_TILES_HEIGHT; i++) {
		for (var j = 0; j < LS_TILES_WIDTH; j++) {
			if (walls[l][i][j] == 1) {
				canvas.beginPath();
				canvas.rect(
					cwh(x + j * LS_TILE_SIZE) + os.x,
					cwh(y + i * LS_TILE_SIZE) + os.y,
					cwh(LS_TILE_SIZE), cwh(LS_TILE_SIZE));
				canvas.fillStyle = wallsColor;
				canvas.fill();
			}
		}
	}
	*/
}

function LS_draw_floor(l, x, y) {
	// colors
	var floorColor0, floorColor1;
	if (l >= WALLS_RED) {
		floorColor0 = TILE_COLOR_2_0;
		floorColor1 = TILE_COLOR_2_1;
	} else if (l >= WALLS_PURPLE) {
		floorColor0 = TILE_COLOR_1_0;
		floorColor1 = TILE_COLOR_1_1;
	} else {
		floorColor0 = TILE_COLOR_0_0;
		floorColor1 = TILE_COLOR_0_1;
	}
	
	for (var i = 0; i < LS_TILES_HEIGHT; i++) {
		for (var j = 0; j < LS_TILES_WIDTH; j++) {
			if (walls[l][i][j] == 0) {
				var bgTileColor = floorColor0;
				if (j % 2 == 0 && i % 2 == 0 ||
					j % 2 == 1 && i % 2 == 1)
					bgTileColor = floorColor1;
				canvas.beginPath();
				canvas.rect(
					cwh(x + j * LS_TILE_SIZE) + os.x,
					cwh(y + i * LS_TILE_SIZE) + os.y,
					cwh(LS_TILE_SIZE), cwh(LS_TILE_SIZE));
				canvas.fillStyle = bgTileColor;
				canvas.fill();
			}
		}
	}
}

function LS_draw_border(l, x, y) {
	// shadow
	canvas.beginPath();
	canvas.rect(cwh(x - LS_BDR_SIZE + LS_SHADOW_OFFSET) + os.x, cwh(y - LS_BDR_SIZE + LS_SHADOW_OFFSET) + os.y,
		cwh(LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2), cwh(LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2));
	canvas.fillStyle = MENU_SHADOW_COLOR;
	canvas.fill();
	
	// border
	canvas.beginPath();
	canvas.rect(cwh(x - LS_BDR_SIZE) + os.x, cwh(y - LS_BDR_SIZE) + os.y,
		cwh(LS_TILE_SIZE * LS_TILES_WIDTH + LS_BDR_SIZE * 2), cwh(LS_TILE_SIZE * LS_TILES_HEIGHT + LS_BDR_SIZE * 2));
    if (onButton("ls_" + l))
        canvas.fillStyle = LS_BORDER_HOVER_COLOR;
    else
        canvas.fillStyle = LS_BORDER_COLOR;
	canvas.fill();
}

function LS_draw_nav() {
	// back
    if (ls_page == 2) {
        if (onButton("ls_back"))
            canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
        else
            canvas.fillStyle = "black";
    } else {
        canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
    }
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "left";
	canvas.fillText("<< BACK", cwh(15) + os.x, cwh(535) + os.y);
	
	// back to menu
    if (onButton("ls_menu"))
        canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("BACK TO MENU ", cwh(CANVAS_WIDTH / 2) + os.x, cwh(535) + os.y);
	
	// next
    if (ls_page == 1) {
        if (onButton("ls_next"))
            canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
        else
            canvas.fillStyle = "black";
    } else {
        canvas.fillStyle = LS_BUTTON_DISABLED_COLOR;
    }
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "right";
	canvas.fillText("NEXT >>", cwh(CANVAS_WIDTH - 15) + os.x, cwh(535) + os.y);
}
function updateFinish() {
	for (var i = 0; i < finishText.length; i++) {
		updateFinishLetter (i, 1);
	}
}

function updateFinishLetter (letterNum, frameNum) {
	while (frameNum > 0) {
		if (finishTextSpeed[letterNum][0] == 0 && finishTextSpeed[letterNum][2] < finish_text_speed_max) {
			finishTextSpeed[letterNum][2] += finish_text_speed_inc;
			finishTextSpeed[letterNum][1] += finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] >= finish_text_speed_max) {
				finishTextSpeed[letterNum][2] = finish_text_speed_max;
				finishTextSpeed[letterNum][0] = 1;
			}
		} else if (finishTextSpeed[letterNum][0] == 1 && finishTextSpeed[letterNum][2] > 0) {
			finishTextSpeed[letterNum][2] -= finish_text_speed_inc;
			finishTextSpeed[letterNum][1] += finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] <= 0) {
				finishTextSpeed[letterNum][2] = 0;
				finishTextSpeed[letterNum][0] = 2;
			}
		} else if (finishTextSpeed[letterNum][0] == 2 && finishTextSpeed[letterNum][2] < finish_text_speed_max) {
			finishTextSpeed[letterNum][2] += finish_text_speed_inc;
			finishTextSpeed[letterNum][1] -= finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] >= finish_text_speed_max) {
				finishTextSpeed[letterNum][2] = finish_text_speed_max;
				finishTextSpeed[letterNum][0] = 3;
			}
		} else if (finishTextSpeed[letterNum][0] == 3 && finishTextSpeed[letterNum][2] > 0) {
			finishTextSpeed[letterNum][2] -= finish_text_speed_inc;
			finishTextSpeed[letterNum][1] -= finishTextSpeed[letterNum][2];
			if (finishTextSpeed[letterNum][2] <= 0) {
				finishTextSpeed[letterNum][2] = 0;
				finishTextSpeed[letterNum][0] = 0;
			}
		}
		frameNum--;
	}
}

function initFinish() {
	for (var i = 0; i < finishText.length; i++) {
		finishTextSpeed[i] = [0, finish_text_startY, 0];
		updateFinishLetter(i, i * finish_text_staggerFrames);
	}
}

function drawFinish() {
	
	// bg
    var grad = canvas.createLinearGradient(os.x, os.y, os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2) + os.y);
    canvas.beginPath();
    canvas.rect(os.x, cwh(BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2));
    //grad.addColorStop(0, INTERMISSION_COLOR_2_0);
    //grad.addColorStop(1, INTERMISSION_COLOR_2_1);
    grad.addColorStop(0, INTERMISSION_COLOR_0_0);
    grad.addColorStop(1, INTERMISSION_COLOR_0_1);
    canvas.fillStyle = grad;
    canvas.fill();
    
    // you win
    canvas.fillStyle = "#006";
	canvas.font = cwh(48) + "px Arial Black";
	canvas.textAlign = "center";
	
	for (var i = 0; i < finishText.length; i++) {
		canvas.fillText(finishText[i], cwh(finish_text_startX + (finish_title_spacing * i)) + os.x, cwh(finishTextSpeed[i][1]) + os.y);
	}
	
	// text
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "center";
	canvas.fillText("Now try it with your eyes closed.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(280) + os.y);
	
	// data
	canvas.fillStyle = "#555";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "left";
	canvas.fillText("Fails:", cwh(finish_data_left) + os.x, cwh(370) + os.y);
	
	canvas.fillStyle = "#555";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "left";
	canvas.fillText("Time:", cwh(finish_data_left) + os.x, cwh(400) + os.y);
	
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "right";
	canvas.fillText(numberWithCommas(deaths), cwh(finish_data_right) + os.x, cwh(370) + os.y);
	
	canvas.fillStyle = "black";
	canvas.font = cwh(24) + "px Arial";
	canvas.textAlign = "right";
	canvas.fillText(msToTime(gameTimer), cwh(finish_data_right) + os.x, cwh(400) + os.y);
	
    
    // back to menu
    if (onButton("ls_menu"))
        canvas.fillStyle = LS_BUTTON_HOVER_COLOR;
    else
        canvas.fillStyle = "black";
	canvas.font = cwh(25) + "px Arial Black";
	canvas.textAlign = "center";
	canvas.fillText("BACK TO MENU ", cwh(CANVAS_WIDTH / 2) + os.x, cwh(535) + os.y);
    
}
var rainbowGradient = canvas.createLinearGradient(302, 0, 498, 0);
rainbowGradient.addColorStop(0,           "rgb(" + PLAYER_FILL_COLORS[0][0] + "," + PLAYER_FILL_COLORS[0][1] + "," + PLAYER_FILL_COLORS[0][2] + ")");
rainbowGradient.addColorStop(0 + (1 / 8), "rgb(" + PLAYER_FILL_COLORS[1][0] + "," + PLAYER_FILL_COLORS[1][1] + "," + PLAYER_FILL_COLORS[1][2] + ")");
rainbowGradient.addColorStop(0 + (2 / 8), "rgb(" + PLAYER_FILL_COLORS[2][0] + "," + PLAYER_FILL_COLORS[2][1] + "," + PLAYER_FILL_COLORS[2][2] + ")");
rainbowGradient.addColorStop(0 + (3 / 8), "rgb(" + PLAYER_FILL_COLORS[3][0] + "," + PLAYER_FILL_COLORS[3][1] + "," + PLAYER_FILL_COLORS[3][2] + ")");
rainbowGradient.addColorStop(0 + (4 / 8), "rgb(" + PLAYER_FILL_COLORS[4][0] + "," + PLAYER_FILL_COLORS[4][1] + "," + PLAYER_FILL_COLORS[4][2] + ")");
rainbowGradient.addColorStop(0 + (5 / 8), "rgb(" + PLAYER_FILL_COLORS[5][0] + "," + PLAYER_FILL_COLORS[5][1] + "," + PLAYER_FILL_COLORS[5][2] + ")");
rainbowGradient.addColorStop(0 + (6 / 8), "rgb(" + PLAYER_FILL_COLORS[6][0] + "," + PLAYER_FILL_COLORS[6][1] + "," + PLAYER_FILL_COLORS[6][2] + ")");
rainbowGradient.addColorStop(0 + (7 / 8), "rgb(" + PLAYER_FILL_COLORS[7][0] + "," + PLAYER_FILL_COLORS[7][1] + "," + PLAYER_FILL_COLORS[7][2] + ")");
rainbowGradient.addColorStop(1,           "rgb(" + PLAYER_FILL_COLORS[0][0] + "," + PLAYER_FILL_COLORS[0][1] + "," + PLAYER_FILL_COLORS[0][2] + ")");


function drawIGMenu() {
	if (!mobile) {
        if (paused && (state == "game" || state == "intermission")) {

            // bg
            canvas.beginPath();
            canvas.rect(0, BAR_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT - BAR_HEIGHT * 2);
            canvas.fillStyle = "rgba(0, 0, 0, " + INGAME_MENU_BG_ALPHA + ")";
            canvas.fill();

            // timer
            canvas.fillStyle = TIMER_COLOR;
            canvas.font = IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "right";
            canvas.fillText(msToTime(gameTimer), CANVAS_WIDTH - 10, BAR_HEIGHT + 30);

            // resume game
            if (onButton("ig_resumeGame"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("RESUME GAME", CANVAS_WIDTH / 2, IG_BUTTONS_TOP);

            // main menu
            if (onButton("ig_mainMenu"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("MAIN MENU", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE);

            // level select
            if (onButton("ig_levelSelect"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("LEVEL SELECT", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 2);

            // change player color
            if (onButton("ig_playerColor")) {
                if (player.color == PLAYER_OUTLINE_COLORS.length) {
                    canvas.fillStyle = rainbowGradient;
                } else {
                    canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
                }
            } else {
                canvas.fillStyle = "white";
            }
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("PLAYER COLOR", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 3);

            // mute SFX
            if (onButton("ig_muteSFX"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (muteSFX)
                canvas.fillText("UNMUTE SFX", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 4);
            else
                canvas.fillText("MUTE SFX", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 4);

            // mute music
            if (onButton("ig_muteMusic"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (muteMusic)
                canvas.fillText("UNMUTE MUSIC", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 5);
            else
                canvas.fillText("MUTE MUSIC", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 5);

            // player bouncing
            if (onButton("ig_playerBouncing"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            if (bouncingEnabled)
                canvas.fillText("DISABLE PLAYER BOUNCING", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 6);
            else
                canvas.fillText("ENABLE PLAYER BOUNCING", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 6);

            // coolmath games
            /*
            if (onButton("ig_coolmathGames"))
                canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("COOLMATH GAMES", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
            */

            // stephen critoph
            //if (onButton("ig_stephenCritoph"))
            //    canvas.fillStyle = BARS_BUTTON_HOVER_COLOR;
            //else
                canvas.fillStyle = "white";
            canvas.font = "Bold " + IG_BTN_TEXT_SIZE + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("BY: STEPHEN CRITOPH", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
        }
	} else {
        if (paused && (state == "game" || state == "intermission")) {

            // bg
            canvas.beginPath();
            canvas.rect(os.x, cwh(BAR_HEIGHT) + os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT - BAR_HEIGHT * 2));
            canvas.fillStyle = "rgba(0, 0, 0, " + INGAME_MENU_BG_ALPHA + ")";
            canvas.fill();

            // timer
            canvas.fillStyle = TIMER_COLOR;
            canvas.font = cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "right";
            canvas.fillText(msToTime(gameTimer), cwh(CANVAS_WIDTH - 10) + os.x, cwh(BAR_HEIGHT + 30) + os.y);

            // resume game
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("RESUME GAME", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP) + os.y);

            // main menu
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("MAIN MENU", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE) + os.y);

            // level select
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("LEVEL SELECT", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 2) + os.y);

            // change player color
            canvas.fillStyle = "rgba(" + player.redFill + ", " + player.greenFill + ", " + player.blueFill + ", 1)";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("PLAYER COLOR", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 3) + os.y);

            // mute SFX
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (muteSFX)
                canvas.fillText("UNMUTE SFX", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 4) + os.y);
            else
                canvas.fillText("MUTE SFX", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 4) + os.y);

            // mute music
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (muteMusic)
                canvas.fillText("UNMUTE MUSIC", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 5) + os.y);
            else
                canvas.fillText("MUTE MUSIC", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 5) + os.y);

            // player bouncing
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            if (bouncingEnabled)
                canvas.fillText("DISABLE PLAYER BOUNCING", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 6) + os.y);
            else
                canvas.fillText("ENABLE PLAYER BOUNCING", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 6) + os.y);

            // coolmath games
            /*
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("COOLMATH GAMES", CANVAS_WIDTH / 2, IG_BUTTONS_TOP + IG_BTN_SPACE * 7);
            */

            // stephen critoph
            canvas.fillStyle = "white";
            canvas.font = "Bold " + cwh(IG_BTN_TEXT_SIZE) + "px Arial";
            canvas.textAlign = "center";
            canvas.fillText("BY: STEPHEN CRITOPH", cwh(CANVAS_WIDTH / 2) + os.x, cwh(IG_BUTTONS_TOP + IG_BTN_SPACE * 7) + os.y);
        }
    }
}

// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime(s) {

  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}
function initPreloader() {
	initImages();
}

function initImages() {
    img_mainMenu             = new Image();
    img_mainMenu.src             = "images/main_menu.png";
    img_mainMenu.addEventListener            ("load", imageLoaded);
    if (!mobile) {
        img_mainMenu_playGame = new Image();
        img_mainMenu_loadGame = new Image();
        img_mainMenu_levelSelect = new Image();
        //img_mainMenu_moreGames   = new Image();

        img_mainMenu_playGame.src    = "images/main_menu_play_game.png";
        img_mainMenu_loadGame.src    = "images/main_menu_load_game.png";
        img_mainMenu_levelSelect.src = "images/main_menu_level_select.png";
        //img_mainMenu_moreGames.src   = "images/main_menu_more_games.png";

        img_mainMenu_playGame.addEventListener   ("load", imageLoaded);
        img_mainMenu_loadGame.addEventListener   ("load", imageLoaded);
        img_mainMenu_levelSelect.addEventListener("load", imageLoaded);
        //img_mainMenu_moreGames.addEventListener  ("load", imageLoaded);
    }
}

function initSounds() {
    if(!mobile){
	music = new Audio("sounds/music.mp3");
    music.loop = true;

    sfx_bounce0      = new Audio("sounds/sfx_bounce0.mp3");
    sfx_bounce1      = new Audio("sounds/sfx_bounce1.mp3");
    sfx_checkpoint   = new Audio("sounds/sfx_checkpoint.mp3");
    sfx_click        = new Audio("sounds/sfx_click.mp3");
    sfx_coin         = new Audio("sounds/sfx_coin.mp3");
    sfx_die          = new Audio("sounds/sfx_die.mp3");
    sfx_win          = new Audio("sounds/sfx_win.mp3");
    sfx_intermission = new Audio("sounds/sfx_intermission.mp3");
	}
	else {
		
		/*music = new Audio("sounds/music.ogg");
    music.loop = true;

    sfx_bounce0      = new Audio("sounds/sfx_bounce0.ogg");
    sfx_bounce1      = new Audio("sounds/sfx_bounce1.ogg");
    sfx_checkpoint   = new Audio("sounds/sfx_checkpoint.ogg");
    sfx_click        = new Audio("sounds/sfx_click.ogg");
    sfx_coin         = new Audio("sounds/sfx_coin.ogg");
    sfx_die          = new Audio("sounds/sfx_die.ogg");
    sfx_win          = new Audio("sounds/sfx_win.ogg");
    sfx_intermission = new Audio("sounds/sfx_intermission.ogg");*/
	alert("on mobiles it doesnt work");
	
	}
    soundsToMute.push(music);
    soundsToMute.push(sfx_bounce0);
    soundsToMute.push(sfx_bounce1);
    soundsToMute.push(sfx_checkpoint);
    soundsToMute.push(sfx_click);
    soundsToMute.push(sfx_coin);
    soundsToMute.push(sfx_die);
    soundsToMute.push(sfx_win);
    soundsToMute.push(sfx_intermission);

    music.addEventListener           ("canplaythrough", soundLoaded);
    sfx_bounce0.addEventListener     ("canplaythrough", soundLoaded);
    sfx_bounce1.addEventListener     ("canplaythrough", soundLoaded);
    sfx_checkpoint.addEventListener  ("canplaythrough", soundLoaded);
    sfx_click.addEventListener       ("canplaythrough", soundLoaded);
    sfx_coin.addEventListener        ("canplaythrough", soundLoaded);
    sfx_die.addEventListener         ("canplaythrough", soundLoaded);
    sfx_win.addEventListener         ("canplaythrough", soundLoaded);
    sfx_intermission.addEventListener("canplaythrough", soundLoaded);
}

function imageLoaded() {
    loadedImages++;
    loadedAssets++;
    if (loadedImages >= TOTAL_IMAGES) {
        img_mainMenu.removeEventListener            ("load", imageLoaded);
        if (!mobile) {
            img_mainMenu_playGame.removeEventListener("load", imageLoaded);
            img_mainMenu_loadGame.removeEventListener("load", imageLoaded);
            img_mainMenu_levelSelect.removeEventListener("load", imageLoaded);
        }
        initSounds();
    }
}

function soundLoaded() {
	
	loadedSounds++;
	loadedAssets++;
	if (loadedSounds >= TOTAL_SOUNDS) {
		music.removeEventListener           ("canplaythrough", soundLoaded);
		sfx_bounce0.removeEventListener     ("canplaythrough", soundLoaded);
		sfx_bounce1.removeEventListener     ("canplaythrough", soundLoaded);
		sfx_checkpoint.removeEventListener  ("canplaythrough", soundLoaded);
		sfx_click.removeEventListener       ("canplaythrough", soundLoaded);
		sfx_coin.removeEventListener        ("canplaythrough", soundLoaded);
		sfx_die.removeEventListener         ("canplaythrough", soundLoaded);
		sfx_win.removeEventListener         ("canplaythrough", soundLoaded);
		sfx_intermission.removeEventListener("canplaythrough", soundLoaded);
	}
}

function updatePreloader() {
	if (loadedAssets >= TOTAL_ASSETS && loadBarAlpha > 0) {
		loadBarAlpha -= loadBarFade;
		if (loadBarAlpha < 0)
			loadBarAlpha = 0;
	}
}

var loadBarWidth = 250;

function drawPreloader() {
	// bg
	canvas.beginPath();
    canvas.fillStyle = "black";
	canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT));
    canvas.fill();
    
    // load text
    canvas.fillStyle = "white";
	canvas.font = cwh(16) + "px Arial";
	canvas.textAlign = "left";
	
	if (loadedImages < TOTAL_IMAGES) {
		canvas.fillText("Loading Images... (" + loadedImages + " / " + TOTAL_IMAGES + ")", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	} else if (loadedSounds < TOTAL_SOUNDS) {
		canvas.fillText("Loading Sounds... (" + loadedSounds + " / " + TOTAL_SOUNDS + ")", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	} else {
		canvas.fillText("Finished Loading!", cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2) + os.x, cwh(245) + os.y);
	}
    
    // load bar fill
    if (onButton("pl_playGame") || loadBarAlpha > 0) {
		canvas.beginPath();
		
		canvas.fillStyle = "rgba(255, 255, 255, " + loadBarAlpha + ")";
	    
	    canvas.rect(cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2 + 0.5) + os.x, cwh(255 + 0.5) + os.y, cwh(Math.floor(loadedAssets / TOTAL_ASSETS * loadBarWidth)), cwh(30));
	    canvas.fill();
	}
	
	// load bar outline
	canvas.beginPath();
    canvas.strokeStyle = "white";
    canvas.lineWidth = cwh(1);
	canvas.rect(cwh(CANVAS_WIDTH / 2 - loadBarWidth / 2 + 0.5) + os.x, cwh(255 + 0.5) + os.y, cwh(loadBarWidth), cwh(30));
    canvas.stroke();
    
    // load bar button
    if (loadedAssets >= TOTAL_ASSETS) {
	    canvas.fillStyle = "white";
	    
		canvas.font = "Bold " + cwh(20) + "px Arial";
		canvas.textAlign = "center";
		canvas.fillText("PLAY GAME", cwh(CANVAS_WIDTH / 2) + os.x, cwh(277.5) + os.y);
	}
    
    // warning text
    canvas.fillStyle = "white";
	canvas.font = cwh(16) + "px Arial";
	canvas.textAlign = "center";
	canvas.fillText("This is The World's Hardest Game.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(310) + os.y);
	canvas.fillText("It is harder than any game you have", cwh(CANVAS_WIDTH / 2) + os.x, cwh(330) + os.y);
	canvas.fillText("ever played, or ever will play.", cwh(CANVAS_WIDTH / 2) + os.x, cwh(350) + os.y);
}
function hotkeys() {
	if (!mobile) {
        if (state == "preloader" && keydown.space && !hotkeyDown_space) {
            playSFX(sfx_click);
            if (localStorage.getItem("whg_level") == null)
                localStorage.setItem("whg_coins", "[-99]");
            hotkeyDown_space = true;
            state = "main_menu";
        } else if (state == "main_menu" && keydown.space && !hotkeyDown_space) {
            playSFX(sfx_intermission);
            player.dying = false;
            paused = false;
            level = 1;
            gameTimer = 0;
            deaths = 0;
            coinsSave = [-99];
            localStorage.setItem("whg_level", level);
            localStorage.setItem("whg_deaths", deaths);
            localStorage.setItem("whg_gameTimer", gameTimer);
            localStorage.setItem("whg_curCheck", 0);
            localStorage.setItem("whg_coins", "[-99]");
            justLoaded = false;
            initIntermission();
            hotkeyDown_space = true;
        } else if ((state == "game" || state == "intermission") && keydown.p && !hotkeyDown_p) {
            if (paused) {
                paused = false;
                if (pauseTime != 0)
                    gameTimer -= new Date().getTime() - pauseTime;
            } else {
                paused = true;
                pauseTime = new Date().getTime();
            }
            playSFX(sfx_click);
            hotkeyDown_p = true;
        } else if (keydown.m && !hotkeyDown_m) {
            if (muteSFX && muteMusic) {
                doUnmuteSFX();
                doUnmuteMusic();
                playSFX(sfx_click);
            } else {
                doMuteSFX();
                doMuteMusic();
            }
            hotkeyDown_m = true;
        }

        if (!keydown.space && hotkeyDown_space)
            hotkeyDown_space = false;
        if (!keydown.p && hotkeyDown_p)
            hotkeyDown_p = false;
        if (!keydown.m && hotkeyDown_m)
            hotkeyDown_m = false;
    }
}
