import{u as h,c as n}from"./chats_init-D5Bk5HmF.js";import{b as y,e as T}from"./utils-BX93cMPL.js";document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("messages"),E=document.getElementById("messageForm"),s=document.getElementById("messageInput");h.loadFromLocalStorage();let c=window.location.search.split("?chatId=")[1],d=parseInt(localStorage.getItem("currentUserId")),v=n.getChat(c);const L=document.getElementById("partner-name");L.textContent=y(v);const C=(e,t)=>{const a={id:T(),text:e,status:t,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),userId:d,chatId:c};n.addMessage(c,a),n.getChat(c);const l=p(a);o.appendChild(l),o.scrollTop=o.scrollHeight,n.saveToLocalStorage(),console.log(localStorage.getItem("chatData"))},f=e=>{const t=document.getElementById(e);t.classList.add("destroy"),setTimeout(()=>{t.remove();const a=n.getChat(c);a.messages=a.messages.filter(l=>l.id!==e),n.saveToLocalStorage()},500)},I=()=>{const e=n.getChat(c);e&&(o.innerHTML="",e.messages.forEach(t=>{t.userId!==d&&(t.status==="check"||t.status==="sent")&&(t.status="read");const a=p(t);o.appendChild(a)}),o.scrollTop=o.scrollHeight,n.saveToLocalStorage())},g=e=>{const t=e.value.trim().replace(/</g,"<").replace(/>/g,">").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");t&&(C(t,"sent"),e.value="",e.style.height="5vh",e.style.overflowY="hidden",e.setSelectionRange(0,0))},p=e=>{const t=document.createElement("li");t.id=e.id,t.classList.add("message",d===e.userId?"sent":"received");const a=document.createElement("span");a.classList.add("sender-name");const l=h.getUser(e.userId);l?a.textContent=d===e.userId?"Вы":l.lastName+" "+l.firstName:a.textContent="Пользователь не найден",t.appendChild(a);const m=document.createElement("span");m.classList.add("message-text"),m.innerHTML=e.text.replace(/\n/g,"<br>"),t.appendChild(m);const u=document.createElement("span");u.classList.add("timestamp"),u.textContent=e.timestamp,t.appendChild(u);const r=document.createElement("i");r.classList.add("material-icons","message-status-icon"),e.status==="read"?r.textContent="done_all":r.textContent="done",t.appendChild(r);const i=document.createElement("button");return i.classList.add("delete-button"),i.innerHTML='<i class="material-icons">delete</i>',t.appendChild(i),i.addEventListener("click",()=>{f(e.id)}),t};I(),E.addEventListener("submit",e=>{e.preventDefault(),g(s),s.dispatchEvent(new Event("input")),s.scrollTop=s.scrollHeight}),s.addEventListener("keydown",e=>{if(e.key==="Enter"){if(e.preventDefault(),e.shiftKey){const t=s.selectionStart;s.value=s.value,s.value=s.value.slice(0,t)+`
`+s.value.slice(t),s.selectionStart=s.selectionEnd=t+1}else g(s);s.dispatchEvent(new Event("input")),s.scrollTop=s.scrollHeight}}),s.addEventListener("input",()=>{const e=s;e.style.height="auto",e.style.minHeight="5vh",e.style.height=e.scrollHeight+"px",e.style.overflowY="auto"})});
