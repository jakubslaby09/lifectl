var k=Object.defineProperty;var S=(t,e,r)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var f=(t,e,r)=>(S(t,typeof e!="symbol"?e+"":e,r),r);const E=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}};E();const n={tap:new Audio("sounds/tap1.wav"),navForward:new Audio("sounds/nav1.flac"),navBackward:new Audio("sounds/nav2.flac"),refresh:new Audio("sounds/refresh.flac"),shutter:new Audio("sounds/shutter.flac")};n.tap.volume=.5;n.navForward.volume=.1;n.navBackward.volume=.2;n.shutter.volume=.05;function b(){n.tap.play()}function O(){n.refresh.play()}function L(){n.shutter.play()}function u(t=!0,e=!1){navigator.vibrate(e?20:15),t?n.navForward.play():n.navBackward.play()}var N=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",sounds:n,tap:b,refresh:O,shutter:L,navigate:u});const v=location.origin+(document.querySelector('head > link[rel="root"]')?.getAttribute("href")??"/");q();const a={get mains(){return document.querySelectorAll("body > main")},get main(){return this.mains[this.mains.length-1]},nav:document.querySelector("body > nav"),links:document.querySelectorAll("body > nav > [page]"),header:document.querySelector("body > header")},c={_values:[{_page:"home",get page(){return this._page},set page(t){this._page=t,g(t)}},...location.href.replace(v,"").split("/").filter(t=>t!="")],get bottom(){return this._values.length==1?this._values[0]:null},apply(){this._values.forEach((t,e)=>{e!=0&&(a.mains[e]||(a.main.insertAdjacentHTML("afterend","<main></main>"),g(t,e)))}),this.bottom&&g(this.bottom.page),A("afterload")},onback(){this.bottom||(u(!1,!0),a.main.remove(),this._values.pop(),this.apply())},async push(t){u(!0,!0),this._values.push(t),history.pushState(t,"",v+this._values.slice(1).join("/")),console.log(this._values),await this.apply()}};window.stack=c;window.onpopstate=()=>c.onback();c.apply();async function g(t,e=0){if(document.body.removeAttribute("fullview"),a.main.removeAttribute("afterload"),setTimeout(()=>a.main.setAttribute("afterload",""),0),a.main.innerHTML=await _(`/views/${t}.html`),document.querySelectorAll("[page]").forEach(r=>r.getAttribute("page")==t?r.setAttribute("active",""):r.removeAttribute("active")),!c.bottom&&(document.body.setAttribute("fullview",""),A("afterclick"),e!=0)){const r=a.mains[e].querySelector("header");r&&(r.innerHTML="<button icon navback>arrow_back</button>"+r?.innerHTML);const s=r?.querySelector("[navback]");s&&(s.onclick=()=>history.back())}}a.links.forEach(t=>t.addEventListener("click",()=>{c.bottom&&(c.bottom.page=t.getAttribute("page")),u()}));async function _(t){let r=await(await self.caches?.open("views"))?.match(t);return r||(a.nav.setAttribute("loading",""),r=await fetch(t),a.nav.removeAttribute("loading")),await r.text()}function q(){const t=window.fetch;window.fetch=(e,r)=>{if(e instanceof Request||!e.startsWith("/"))return t(e,r);const s=new URL(e.slice(1),v).href;return t(s,r)}}const m={ripple(t){return t.getAttribute("ripple")!=null||t.getAttribute("page")!=null||t.nodeName=="BUTTON"||t.nodeName=="HEADER"||!1},dialog(t){return t.nodeName=="DIALOG"},view(t){return!!t.getAttribute("view")}},D=[{if:m.ripple,then(t){t.addEventListener("pointerdown",()=>y(t)),t.addEventListener("keydown",e=>{e.key=="Enter"&&y(t,10)})}},{if:m.dialog,then(t){t.setAttribute("open","")}},{if:m.view,then(t){t.onclick=()=>{const e=t.getAttribute("view");!e||c.push(e)}}}];function y(t,e=0){t.getAttribute("disabled")==null&&(t.removeAttribute("afterclick"),setTimeout(()=>t.setAttribute("afterclick",""),e),b())}function A(t){document.querySelectorAll(`[${t}]`).forEach(async e=>e.removeAttribute(t))}const I=new MutationObserver(t=>{t.forEach(e=>{e.addedNodes.forEach(r=>r.nodeName!="#text"?p(r):0)})});I.observe(document.body,{childList:!0,subtree:!0});document.querySelectorAll("body *").forEach(t=>p(t));function p(t){D.forEach(e=>{e.if(t)&&e.then(t)});for(const e in t.children){const r=t.children[e];r.getAttribute&&p(r)}}if(navigator.serviceWorker){location.host!="localhost:3500"&&navigator.serviceWorker?.register(new URL("/pwa-template/sw.js",self.location).href),navigator.serviceWorker.onmessage=e=>{e.data=="update"&&location.reload()};const t=async()=>{if(!navigator.onLine){console.warn("%cCannot update caches while offline!","color: orange");return}navigator.serviceWorker.controller?.postMessage("update")};window.updateCaches=t}localStorage.setItem("intents",JSON.stringify({"Testovac\xED rutina":{history:[],tasks:["1. Krok","testovac\xED aktivita","3. Krok","4. Krok"]},"Dal\u0161\xED rutina":{history:[],tasks:[]}}));const T=JSON.parse(localStorage.getItem("intents"));window.Alpine.store("intents",T);const w=class{constructor(e,r="",s=[]){f(this,"created");this.duration=e,this.icon=r,this.records=s,this.created=new Date().valueOf()}get missing(){return this.nowIndex-this.records.length>=0?this.nowIndex-this.records.length:0}get stats(){return{done:this.records.filter(e=>e).length,rate:this.records.slice(-10).filter(e=>e).length/this.records.slice(-10).length}}get time(){return this.record?((this.record?.finish??new Date().getTime())-this.record.start)/1e3:null}get timeleft(){return this.time?this.duration-this.time:null}get record(){return this.records[this.records.length-1]??null}start(){return this.records[this.nowIndex]={start:new Date().getTime()},this.record}get nowIndex(){return Math.floor((new Date().valueOf()-this.created)/w.period)}finish(){!this.record||this.record.finish||(this.record.finish=new Date().getTime(),x())}cancel(){this.record&&(this.records[this.records.length-1].finish=void 0)}};let l=w;f(l,"period",6e4);window.Activity=l;localStorage.getItem("activities")||localStorage.setItem("activities",JSON.stringify({"testovac\xED aktivita":new l(180,"",[{start:1638696955630,finish:1638696957596},null,{start:1638697127965,finish:1638697129239},null,null,null,{start:1638697435715,finish:1638697437630}]),"dal\u0161\xED aktivita":new l(600)}));const d={};for(const t in JSON.parse(localStorage.getItem("activities"))){const e=JSON.parse(localStorage.getItem("activities"))[t];Object.setPrototypeOf(e,l.prototype),d[t]=e}window.Alpine.store("activities",d);window.activities=d;function x(){localStorage.setItem("activities",JSON.stringify(d))}window.sounds=N;
