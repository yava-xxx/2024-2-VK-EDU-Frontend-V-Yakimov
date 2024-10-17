import{c as r,u as C}from"./chats_init-D5Bk5HmF.js";import{c as L,g as w,a as E,b as y,d as b,e as $}from"./utils-BSdJjFwl.js";L();let v=w();const U=E(v),I=r.getChatsForUser(U.id),k=i=>{if(window.innerWidth<1400)window.location.href=`../chat_page/chat.html?chatId=${i}`;else{const a=document.getElementById("chat-page"),f=`
            <iframe src="../chat_page/chat.html?chatId=${i}" frameborder="0" width="100%" height="100%"></iframe>
        `;a.innerHTML=f}};if(I.length>0){const i=document.getElementById("chats");I.forEach(t=>{const a=document.createElement("li");a.classList.add("chat"),t.users.filter(s=>s!==v).map(s=>C.getUser(s));const e=t.messages.length>0?t.messages[t.messages.length-1]:null;let n=y(t);e&&e.userId,e&&e.status;const c=e?e.text:"Нет сообщений",u=e?b(e.date):"",h=e?e.timestamp.substring(0,5):"",m=`${e&&e.userId===v?"sent":""} ${e&&e.status==="read"?"read":""}`,g=e?e.status==="read"?"done_all":"done":"";a.innerHTML=`
          <div class="chat-avatar"></div>
          <div class="chat-info">
            <div class="chat-name">${n}</div>
            <div class="chat-last-message">${c}</div>
          </div>
          <div class="chat-status ${m}">
            <i class="material-icons">${g}</i>
          </div>
          <div class="chat-timestamp">
            <div class="timestamp-date">${u}</div>
            <div class="timestamp-time">${h}</div>
          </div>
          <button class="material-icons delete-chat-button" data-chat-id="${t.id}">delete_forever</button>
          <div data-chat-id="${t.id}"></div>
        `;const p=s=>{confirm("Вы точно хотите удалить данный чат?")&&(r.chats=r.chats.filter(o=>o.id!==s),r.saveToLocalStorage(),a.remove())},l=s=>{if(window.innerWidth>=1400)k(s);else{const o=`../chat_page/chat.html?chatId=${s}`;window.location.href=o,window.open(o,"_blank")}};a.addEventListener("click",s=>{if(s.target.classList.contains("delete-chat-button")){const d=s.target.dataset.chatId;p(d)}else{const d=s.target.closest(".chat").querySelector("[data-chat-id]").dataset.chatId;l(d)}}),i.appendChild(a)})}else{const i=document.getElementById("chats"),t=document.createElement("p");t.textContent="У вас нет чатов",i.appendChild(t)}let T=function(){const i=document.querySelector(".new-chat-button"),t=document.createElement("div");t.classList.add("new-chat-menu"),t.innerHTML=`
      <input id="chat-title-input" type="text" placeholder="Введите название чата">
      <div class="user-select">
        <div class="user-select-input" id="user-select-input">Выберите пользователей</div>
        <ul id="user-list"></ul>
      </div>
      <button id="create-chat-button">Создать чат</button>
    `,document.body.appendChild(t),t.style.display="none";const a=document.getElementById("user-list");C.getAllUsers().forEach(n=>{const c=document.createElement("li");c.textContent=n.nickname,c.dataset.userId=n.id,a.appendChild(c)}),document.getElementById("user-select-input").addEventListener("click",()=>{a.classList.toggle("show")}),a.addEventListener("click",n=>{if(n.target.tagName==="LI"){n.target.classList.toggle("selected");const c=Array.from(a.children).filter(h=>h.classList.contains("selected")).length,u=document.getElementById("chat-title-input");u.disabled=c<=1}}),i.addEventListener("click",()=>{t.style.display=t.style.display==="block"?"none":"block"}),document.getElementById("create-chat-button").addEventListener("click",()=>{const n=document.getElementById("chat-title-input").value,c=Array.from(a.children).filter(l=>l.classList.contains("selected")),u=w(),h=c.map(l=>l instanceof HTMLElement?parseInt(l.dataset.userId,10):null).concat([u]),m=r.chats.find(l=>{const s=l.users;return $(s.sort((d,o)=>d-o),h.sort((d,o)=>d-o))});if(m){console.log("Чат с такими пользователями уже существует"),window.location.href=`../chat_page/chat.html?chatId=${m.id}`;return}let g=r.chats.length+1,p=r.addChat(g);p.title=n,p.users=h,r.saveToLocalStorage(),window.location.href=`../chat_page/chat.html?chatId=${g}`})};document.addEventListener("DOMContentLoaded",T);
