import{u as p,c as i}from"./chats-3Lt7tHit.js";import{G as w,g as y,a as E}from"./utils-YGOX322K.js";const g=Number(localStorage.getItem("currentUserId")),b=p.getUser(g);i.loadFromLocalStorage();const I=i.chats.filter(n=>n.users.includes(Number(b.id)));if(I.length>0){const n=document.getElementById("chats");I.forEach(t=>{const s=document.createElement("li");s.classList.add("chat"),t.users.filter(e=>e!==g).map(e=>p.getUser(e));const a=t.messages.length>0?t.messages[t.messages.length-1]:null;let c=w(t);s.innerHTML=`
          <div class="chat-avatar"></div>
          <div class="chat-info">
            <div class="chat-name">${c}</div>
            <div class="chat-last-message">${a?a.text:"Нет сообщений"}</div>
          </div>
          <div class="chat-status ${a&&a.userId===g?"sent":""} ${a&&a.status==="read"?"read":""}">
            <i class="material-icons">${a?a.status==="read"?"done_all":"done":""}</i>
          </div>
          <div class="chat-timestamp">
            <div class="timestamp-date">${a?y(a.date):""}</div>
            <div class="timestamp-time">${a?a.timestamp.substring(0,5):""}</div>
          </div>
          <button class="material-icons delete-chat-button" data-chat-id="${t.id}">delete_forever</button>
          <div data-chat-id="${t.id}"></div>
        `,s.addEventListener("click",e=>{if(e.target.classList.contains("delete-chat-button")){const l=e.target.dataset.chatId;confirm("Вы точно хотите удалить данный чат?")&&(i.chats=i.chats.filter(o=>o.id!==Number(l)),i.saveToLocalStorage(),s.remove())}else{const l=window.innerWidth,d=e.target.closest(".chat").querySelector("[data-chat-id]").dataset.chatId;l>=1400?C(d):(window.location.href=`../chat_page/chat.html?chatId=${d}`,window.open(url,"_blank"))}}),n.appendChild(s)})}else{const n=document.getElementById("chats"),t=document.createElement("p");t.textContent="У вас нет чатов",n.appendChild(t)}const C=n=>{if(window.innerWidth<1400)window.location.href=`../chat_page/chat.html?chatId=${n}`;else{const s=document.getElementById("chat-page"),h=`
      <iframe src="../chat_page/chat.html?chatId=${n}" frameborder="0" width="100%" height="100%"></iframe>
    `;s.innerHTML=h}};document.addEventListener("DOMContentLoaded",function(){const n=document.querySelector(".new-chat-button"),t=document.createElement("div");t.classList.add("new-chat-menu"),t.innerHTML=`
      <input id="chat-title-input" type="text" placeholder="Введите название чата">
      <div class="user-select">
        <div class="user-select-input" id="user-select-input">Выберите пользователей</div>
        <ul id="user-list"></ul>
      </div>
      <button id="create-chat-button">Создать чат</button>
    `,document.body.appendChild(t),t.style.display="none";const s=document.getElementById("user-list");p.getAllUsers().forEach(c=>{const e=document.createElement("li");e.textContent=c.nickname,e.dataset.userId=c.id,s.appendChild(e)}),document.getElementById("user-select-input").addEventListener("click",()=>{s.classList.toggle("show")}),s.addEventListener("click",c=>{if(c.target.tagName==="LI"){c.target.classList.toggle("selected");const e=Array.from(s.children).filter(d=>d.classList.contains("selected")).length,l=document.getElementById("chat-title-input");l.disabled=e<=1}}),n.addEventListener("click",()=>{t.style.display==="block"?t.style.display="none":t.style.display="block"}),document.getElementById("create-chat-button").addEventListener("click",()=>{const c=document.getElementById("chat-title-input").value,e=Array.from(s.children).filter(r=>r.classList.contains("selected")),l=Number(localStorage.getItem("currentUserId")),d=e.map(r=>r instanceof HTMLElement?parseInt(r.dataset.userId,10):null).concat([l]),o=i.chats.find(r=>{const L=r.users;return E(L.sort((u,m)=>u-m),d.sort((u,m)=>u-m))});if(o){console.log("Чат с такими пользователями уже существует"),window.location.href=`../chat_page/chat.html?chatId=${o.id}`;return}let v=i.chats.length+1,f=i.addChat(v);f.title=c,f.users=d,i.saveToLocalStorage(),window.location.href=`../chat_page/chat.html?chatId=${v}`})});
