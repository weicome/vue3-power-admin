System.register(["./mockjs-legacy-82b07359.js"],(function(t,e){"use strict";var n;return{setters:[t=>{t.c,n=t.g}],execute:function(){var e={exports:{}};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
       * @license MIT */!function(t,e){t.exports=function(){var t,e,n={version:"0.2.0"},r=n.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function i(t,e,n){return t<e?e:t>n?n:t}function s(t){return 100*(-1+t)}function o(t,e,n){var i;return(i="translate3d"===r.positionUsing?{transform:"translate3d("+s(t)+"%,0,0)"}:"translate"===r.positionUsing?{transform:"translate("+s(t)+"%,0)"}:{"margin-left":s(t)+"%"}).transition="all "+e+"ms "+n,i}n.configure=function(t){var e,n;for(e in t)void 0!==(n=t[e])&&t.hasOwnProperty(e)&&(r[e]=n);return this},n.status=null,n.set=function(t){var e=n.isStarted();t=i(t,r.minimum,1),n.status=1===t?null:t;var s=n.render(!e),c=s.querySelector(r.barSelector),l=r.speed,f=r.easing;return s.offsetWidth,a((function(e){""===r.positionUsing&&(r.positionUsing=n.getPositioningCSS()),u(c,o(t,l,f)),1===t?(u(s,{transition:"none",opacity:1}),s.offsetWidth,setTimeout((function(){u(s,{transition:"all "+l+"ms linear",opacity:0}),setTimeout((function(){n.remove(),e()}),l)}),l)):setTimeout(e,l)})),this},n.isStarted=function(){return"number"==typeof n.status},n.start=function(){n.status||n.set(0);var t=function(){setTimeout((function(){n.status&&(n.trickle(),t())}),r.trickleSpeed)};return r.trickle&&t(),this},n.done=function(t){return t||n.status?n.inc(.3+.5*Math.random()).set(1):this},n.inc=function(t){var e=n.status;return e?("number"!=typeof t&&(t=(1-e)*i(Math.random()*e,.1,.95)),e=i(e+t,0,.994),n.set(e)):n.start()},n.trickle=function(){return n.inc(Math.random()*r.trickleRate)},t=0,e=0,n.promise=function(r){return r&&"resolved"!==r.state()?(0===e&&n.start(),t++,e++,r.always((function(){0==--e?(t=0,n.done()):n.set((t-e)/t)})),this):this},n.render=function(t){if(n.isRendered())return document.getElementById("nprogress");l(document.documentElement,"nprogress-busy");var e=document.createElement("div");e.id="nprogress",e.innerHTML=r.template;var i,o=e.querySelector(r.barSelector),a=t?"-100":s(n.status||0),c=document.querySelector(r.parent);return u(o,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),r.showSpinner||(i=e.querySelector(r.spinnerSelector))&&d(i),c!=document.body&&l(c,"nprogress-custom-parent"),c.appendChild(e),e},n.remove=function(){f(document.documentElement,"nprogress-busy"),f(document.querySelector(r.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&d(t)},n.isRendered=function(){return!!document.getElementById("nprogress")},n.getPositioningCSS=function(){var t=document.body.style,e="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return e+"Perspective"in t?"translate3d":e+"Transform"in t?"translate":"margin"};var a=function(){var t=[];function e(){var n=t.shift();n&&n(e)}return function(n){t.push(n),1==t.length&&e()}}(),u=function(){var t=["Webkit","O","Moz","ms"],e={};function n(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(t,e){return e.toUpperCase()}))}function r(e){var n=document.body.style;if(e in n)return e;for(var r,i=t.length,s=e.charAt(0).toUpperCase()+e.slice(1);i--;)if((r=t[i]+s)in n)return r;return e}function i(t){return t=n(t),e[t]||(e[t]=r(t))}function s(t,e,n){e=i(e),t.style[e]=n}return function(t,e){var n,r,i=arguments;if(2==i.length)for(n in e)void 0!==(r=e[n])&&e.hasOwnProperty(n)&&s(t,n,r);else s(t,i[1],i[2])}}();function c(t,e){return("string"==typeof t?t:m(t)).indexOf(" "+e+" ")>=0}function l(t,e){var n=m(t),r=n+e;c(n,e)||(t.className=r.substring(1))}function f(t,e){var n,r=m(t);c(t,e)&&(n=r.replace(" "+e+" "," "),t.className=n.substring(1,n.length-1))}function m(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function d(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return n}()}(e),t("N",n(e.exports))}}}));
