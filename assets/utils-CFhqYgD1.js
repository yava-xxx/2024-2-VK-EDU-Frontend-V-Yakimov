import{u as c,b as h}from"./chats-bC-h7T0w.js";const U=t=>{const r=l(),a=t.users.filter(e=>e!==r).map(e=>c.getUser(e));return t.title||a.map(e=>`${e.lastName} ${e.firstName}`).join(", ")},D=t=>(t=l(),c.getUser(t)),l=()=>Number(h("currentUserId")??0),I=()=>Math.floor(Math.random()*1e6).toString(),N=t=>{const r=new Date,o=new Date(t),a=r.getTime()-o.getTime();if(isNaN(a))return"Сегодня";const e=Math.floor(a/1e3),g=Math.floor(e/60),d=Math.floor(g/60),n=Math.floor(d/24);if(n===0)return"Сегодня";if(n===1)return"Вчера";const i=Math.floor(n/365),s=Math.floor(n%365/30),f=n%30;return i>0?`${i} ${m(i)} и ${s} ${u(s)} назад`:s>0?`${s} ${u(s)} назад`:`${f} ${M(f)} назад`},m=t=>t===1?"год":t<5?"года":"лет",u=t=>t===1?"месяц":t<5?"месяца":"месяцев",M=t=>t===1?"день":t<5?"дня":"дней",S=(t,r)=>t.length!==r.length?!1:t.every(o=>r.includes(o));export{D as a,U as b,N as c,S as d,I as e,l as g};
