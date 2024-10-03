(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))f(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&f(m)}).observe(document,{childList:!0,subtree:!0});function d(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(o){if(o.ep)return;o.ep=!0;const r=d(o);fetch(o.href,r)}})();document.addEventListener("DOMContentLoaded",function(){const c=document.getElementById("messages"),u=document.getElementById("messageForm"),d=document.getElementById("messageInput");function f(){const e=document.querySelectorAll(".message");let t=[];e.forEach(s=>{const i={id:s.id,senderName:s.querySelector(".sender-name").textContent,text:s.querySelector(".message-text").innerHTML,timestamp:s.querySelector(".timestamp").textContent,status:s.querySelector(".message-status-icon").textContent,sentOrReceived:s.classList.contains("sent")?"sent":"received"};t.push(i)});const a=localStorage.getItem("messages");a&&JSON.parse(a).forEach(i=>{t.find(g=>g.id===i.id)||(t=t.filter(g=>g.id!==i.id))});const n=t.map(s=>s.id);n.length!==new Set(n).size&&(t=t.map((s,i)=>(n.indexOf(s.id)!==i&&(s.id=o()),s))),localStorage.setItem("messages",JSON.stringify(t))}function o(){return Math.floor(Math.random()*1e6).toString()}function r(e){const t=e.value.trim().replace(/</g,"&lt;").replace(/^\s*\n+|\n+\s*$/g,"").replace(/\n+/g,`
`);t?(h(t,"sent","read"),e.value="",e.style.height="5vh",e.style.overflowY="hidden",e.setSelectionRange(0,0),f()):alert("Сообщение не может быть пустым!")}function m(e){const t=document.createElement("div");t.id=e.id,t.classList.add("message",e.sentOrReceived);const a=document.createElement("span");a.classList.add("sender-name"),a.textContent=e.senderName,t.appendChild(a);const n=document.createElement("span");n.classList.add("message-text"),n.innerHTML=e.text.replace(/\n/g,"<br>"),t.appendChild(n);const s=document.createElement("span");s.classList.add("timestamp"),s.textContent=e.timestamp,t.appendChild(s);const i=document.createElement("i");i.classList.add("material-icons","message-status-icon"),e.status==="check"?i.textContent="check":i.textContent="done_all",t.appendChild(i);const l=document.createElement("button");return l.classList.add("delete-button"),l.innerHTML='<i class="material-icons">delete</i>',t.appendChild(l),e.id==="1"||e.id==="0"?l.style.display="none":l.addEventListener("click",()=>{t.classList.add("destroy"),setTimeout(()=>{t.remove(),f()},500)}),t}function p(){const e=localStorage.getItem("messages"),t=[{id:1,text:"Привет! Как дела???",sentOrReceived:"received",status:"",timestamp:"10:00",senderName:"Иван Иванов",isDefault:!0},{id:0,text:"Ты сделал домашку по VK Frontend?????",sentOrReceived:"received",status:"",timestamp:"10:05",senderName:"Иван Иванов",isDefault:!0}],a=localStorage.getItem("defaultMessagesAdded");let n=e?JSON.parse(e):[];if(!a){const s=i=>n.some(l=>l.id===i);t.forEach(i=>{s(i.id)||n.push(i)}),localStorage.setItem("defaultMessagesAdded","true")}c.innerHTML="",n.forEach(s=>{const i=m(s);c.appendChild(i)}),localStorage.setItem("messages",JSON.stringify(n))}p(),u.addEventListener("submit",function(e){e.preventDefault(),r(d)}),d.addEventListener("keydown",function(e){e.key==="Enter"&&!e.shiftKey?(e.preventDefault(),r(d)):e.key==="Enter"&&e.shiftKey&&(d.value=d.value.slice(0,d.selectionStart)+`
`,e.preventDefault(),d.dispatchEvent(new Event("input")))}),d.addEventListener("input",function(){const e=this,t=5,a=document.getElementById("messages");e.value.trim()!==""?e.scrollHeight>t?(e.style.height=e.scrollHeight+"px",e.style.overflowY="auto"):(e.style.height=t+"vh",e.style.overflowY="hidden"):(e.style.height="5vh",e.style.overflowY="hidden",e.setSelectionRange(0,0)),e.style.height="auto",e.style.height=e.scrollHeight+"px";const n=a.lastChild;n&&n.offsetTop+n.offsetHeight>a.scrollTop+a.offsetHeight&&(a.scrollTop=n.offsetTop+n.offsetHeight-a.offsetHeight-50)});function h(e,t,a){const n=m({id:o(),text:e,sentOrReceived:t,status:a,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),senderName:"Вы"});c.appendChild(n),c.scrollTop=c.scrollHeight}});
