import{u as a,s as r}from"./chats-bC-h7T0w.js";const m=document.getElementById("login-form"),t=document.getElementById("error-message");m.addEventListener("submit",s=>{s.preventDefault();const o=document.getElementById("nickname").value,n=document.getElementById("password").value,e=a.getUserByNickname(o);e&&e.password===n&&(r(e.id,"currentUserId"),window.location.href="messages_page/messenger.html"),t.textContent="Такого пользователя нет в базе!",t.style.opacity=1,setTimeout(()=>{t.style.opacity=0},3e3)});
