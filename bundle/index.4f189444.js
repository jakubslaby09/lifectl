const v=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}};v();const s={tap:new Audio("sounds/tap1.wav"),navForward:new Audio("sounds/nav1.flac"),navBackward:new Audio("sounds/nav2.flac"),refresh:new Audio("sounds/refresh.flac"),shutter:new Audio("sounds/shutter.flac")};s.tap.volume=.5;s.navForward.volume=.1;s.navBackward.volume=.2;s.shutter.volume=.05;function m(){s.tap.play()}function y(){s.refresh.play()}function b(){s.shutter.play()}function f(t=!0,e=!1){navigator.vibrate(e?20:15),t?s.navForward.play():s.navBackward.play()}var w=Object.freeze(Object.defineProperty({__proto__:null,sounds:s,tap:m,refresh:y,shutter:b,navigate:f},Symbol.toStringTag,{value:"Module"}));const l={ripple(t,e=0){t.getAttribute("disabled")==null&&(h("afterclick",t,e),m())},open(t){h("afteropen",t)},land(t){h("afterland",t)}};function h(t,e,r=0){e.removeAttribute(t),setTimeout(()=>e.setAttribute(t,""),r)}_();const u={get root(){let t=new URL(document.querySelector('head > link[rel="root"]')?.getAttribute("href")??"/",location.href).pathname;return t.slice(-1)=="/"&&(t=t.slice(0,-1)),t},get pathname(){return location.pathname.replace(u.root,"")+location.search}};Object.defineProperty(location,"params",{get(){let t={};return u.pathname.split("/").forEach(e=>{const r=e.split("?")[0],n=e.split("?")[1];n&&(t={...t,[r]:decodeURIComponent(n)})}),t}});const i={get mains(){return document.querySelectorAll("body > main")},get main(){return this.mains[this.mains.length-1]},nav:document.querySelector("body > nav"),links:document.querySelectorAll("body > nav > [page]"),header:document.querySelector("body > header")},c={_bottom:"home",get values(){return[this._bottom,...u.pathname.split("/").filter(t=>t!="").map(t=>t.split("?")[0])]},push(t){history.pushState(null,"",`${location.href}/${t}`),f(!0,!0),this.apply()},get bottom(){return this.values.length==1?this._bottom:null},set bottom(t){t&&this.values.length==1&&(this._bottom=t),f(!0),this.apply()},get top(){return this.values[this.values.length-1]},get path(){return this.values.join("/")},async apply(){console.time("applystack"),console.log(`%c${this.path}`,"color: gold"),this.values.forEach(async(t,e)=>{i.mains[e]||i.main.insertAdjacentHTML("afterend","<main/>")}),i.mains.length>this.values.length?(i.main.remove(),l.land(i.main)):l.open(i.main),await k(this.top,!!this.bottom),A(this.top),console.timeEnd("applystack")}};window.stack=c;c.apply();window.onpopstate=()=>c.apply();async function A(t){document.querySelectorAll("[page]").forEach(e=>e.getAttribute("page")==t?e.setAttribute("active",""):e.removeAttribute("active"))}async function k(t,e=!0){if(!e&&i.main.children.length)return;const r=await S(`/views/${t}.html`),n=r.match(/(<main>|<main\s([\s\S]*?)>)([\s\S]*?)<\/main>/);if(n?i.main.outerHTML=n[0]:i.main.innerHTML=r,!e){const o=i.main.querySelector("header");if(!o)return;o.prepend(document.createElement("button")),o.children[0].outerHTML="<button icon navback>arrow_back</button>",o.children[0].addEventListener("click",()=>history.back())}}async function S(t){let r=await(await self.caches?.open("views"))?.match(t);return r||(i.nav.setAttribute("loading",""),r=await fetch(t),i.nav.removeAttribute("loading")),await r.text()}function _(){const t=window.fetch;window.fetch=(e,r)=>{if(typeof e!="string"||!e.startsWith("/"))return t(e,r);const n=new URL(e.slice(1),location.origin+u.root+"/").href;return t(n,r)}}const g={'[ripple], [page], body > header, button, input[type="submit"], input[type="checkbox"] + label'(t){t.addEventListener("pointerdown",()=>l.ripple(t)),t.addEventListener("keydown",e=>{e.key=="Enter"&&l.ripple(t,10)})},dialog(t){t.setAttribute("open","")},"[view]"(t){t.onclick=()=>{const e=t.getAttribute("view");!e||c.push(e)}},"[page]"(t){t.onclick=()=>{const e=t.getAttribute("page");!e||(c.bottom=e)}},textfield(t){t.setAttribute("contenteditable","");const e=async()=>t.innerText==""?t.setAttribute("empty",""):t.removeAttribute("empty");e(),t.oninput=e}};function p(t){for(const e in g)t?.matches(e)&&g[e](t);for(const e in t.children){const r=t.children[e];r.getAttribute&&p(r)}}document.querySelectorAll("body *").forEach(t=>p(t));const L=new MutationObserver(t=>t.forEach(e=>e.addedNodes.forEach(r=>r.matches&&p(r))));L.observe(document.body,{childList:!0,subtree:!0});if(navigator.serviceWorker){location.host!="localhost:3500"&&navigator.serviceWorker?.register(new URL("/lifectl/sw.js",self.location).href),navigator.serviceWorker.onmessage=e=>{e.data=="update"&&location.reload()};const t=async()=>{if(!navigator.onLine){console.warn("%cCannot update caches while offline!","color: orange");return}navigator.serviceWorker.controller?.postMessage("update")};window.updateCaches=t}Object.defineProperty(window,"routines",{get:()=>JSON.parse(localStorage.getItem("routines")??"{}")});const O={get all(){return JSON.parse(localStorage.getItem("activities")??"{}")},get empty(){return Object.getOwnPropertyNames(this.all).length==0},get(t){return this.all[t]},_set(t,e){localStorage.setItem("activities",JSON.stringify({...this.all,[t]:{...this.get(t)??{created:new Date().valueOf(),records:[]},...e}}))},start(t){const e=this.get(t)?.records;!e||(e[this._today(t)]=[...e[this._today(t)]??[],{start:new Date().getTime()}],this._set(t,{records:e}))},finish(t){const e=this.get(t)?.records;if(!e)return;const r=e[this._today(t)],n=r[r.length-1];n.finish=new Date().valueOf(),this._set(t,{records:e})},remove(t){localStorage.setItem("activities",JSON.stringify({...this.all,[t]:void 0}))},lastAbsence(t){const e=this.get(t).records.length-1;return this._today(t)-e>0?this._today(t)-e:0},_today(t){return Math.floor((new Date().valueOf()-this.get(t).created)/864e5)}};window.activities=O;window.sounds=w;