import{u as o,c as u}from"./chats_init-D5Bk5HmF.js";o.loadFromLocalStorage();u.loadFromLocalStorage();const d=document.getElementById("login-form"),r=document.getElementById("error-message"),y=document.getElementById("registration-form"),p=document.getElementById("register-button"),c=document.getElementById("registration-error-message"),f=document.getElementById("nickname"),E=document.getElementById("password"),s=document.getElementById("welcome-message");function a(e){d.style.display=e?"block":"none",y.style.display=e?"none":"block"}function g(e){r.textContent=e,r.style.opacity=1,setTimeout(()=>{r.style.opacity=0},3e3)}function I(){const e=f.value,n=E.value,t=o.getUserByNickname(e);t&&t.password===n?(localStorage.setItem("currentUserId",t.id),s.style.display="block",s.classList.remove("fade-out"),s.classList.add("fade-in"),setTimeout(()=>{s.classList.remove("fade-in"),s.classList.add("fade-out"),setTimeout(()=>{window.location.href="messages_page/messenger.html",s.style.display="none"},1e3)},3e3)):(g("Такого пользователя нет в базе! Пожалуйста, зарегистрируйтесь."),a(!1))}d.addEventListener("submit",e=>{e.preventDefault(),I()});p.addEventListener("click",e=>{e.preventDefault();const n=document.getElementById("reg-nickname").value,t=document.getElementById("reg-password").value,m=document.getElementById("reg-lastname").value,i=document.getElementById("reg-firstname").value,l=document.getElementById("reg-patronymic").value;if(!n||!t||!m||!i||!l){a(!0),g("Пожалуйста, заполните все поля!");return}if(o.getUser(n)){c.textContent="Пользователь с таким никнеймом уже существует!",c.style.opacity=1,setTimeout(()=>{c.style.opacity=0},3e3);return}o.addUser({lastName:m,firstName:i,patronymic:l,nickname:n,password:t,about:""}),alert("Регистрация прошла успешно! Теперь вы можете войти."),a(!0)});document.getElementById("registration-button").addEventListener("click",e=>{e.preventDefault(),a(!1)});
