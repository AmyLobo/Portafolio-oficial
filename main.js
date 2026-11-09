document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* Para poner tus imágenes o videos: escribe la ruta o URL en "m" (3 por proyecto). */
const P=[
 {n:"KESO",r:"Scrum Master y Front-End",t:"Tienda en línea para una pastelería",c:["Scrum","Jira","QA funcional","Bootstrap"],col:["#ffd1bf","#ffc9dd","#d9f36b"],m:["img/keso-1.jpg","img/keso-2.jpg","img/keso-3.jpg"],
  d:["Equipo de 10 personas y cronograma de 3 meses","Tablero, backlog e historias de usuario en Jira","Coordiné QA funcional y componentes de front-end"]},
 {n:"SYNAPSE",r:"Scrum Master y Front-End",t:"Landing page deportiva",c:["Seguimiento diario","Lineamientos visuales","Bootstrap"],col:["#c9f2dc","#bfe3ff","#d9f36b"],m:["img/synapse-1.jpg","img/synapse-2.jpg","img/synapse-3.jpg"],
  d:["Seguimiento diario de avances del equipo","Lineamientos visuales base","Componentes de navegación con HTML, CSS y JavaScript"]},
 {n:"OXXO",r:"Analista de procesos y estrategia",t:"Plan de responsabilidad social para OXXO",c:["Grupos de interés","Propuestas","Indicadores"],col:["#d9c8ff","#ffe9a8","#ffc9dd"],m:["img/oxxo-1.jpg","img/oxxo-2.jpg","img/oxxo-3.jpg"],
  d:["Análisis de grupos de interés y acciones de responsabilidad social con datos del informe de sostenibilidad 2023","Propuestas en gobernanza, medio ambiente y comunidad, como Tiendas Verdes y la app Caminos Verdes","Indicadores para medir el avance de cada propuesta"]}
];
const isV=u=>/\.(mp4|webm|mov)(\?|$)|^data:video/i.test(u);
const med=(u,i)=>!u?'<div class="ph">Tu imagen o video aquí</div>':isV(u)?`<video src="${u}" autoplay muted loop playsinline></video>`:`<img src="${u}" alt="Captura ${i+1}" loading="lazy">`;
const stage=$('#stage');
stage.innerHTML=P.map((p,i)=>`<article class="slide${i?'':' on'}" style="--a:${p.col[0]};--b:${p.col[1]};--c:${p.col[2]}" aria-label="${p.n}">
<div class="info"><p class="role serif">${p.r}</p><p class="line">${p.t}</p><div class="chips">${p.c.map(x=>`<span>${x}</span>`).join('')}</div><button class="more-b" aria-expanded="false">Ver detalles</button><ul class="more">${p.d.map(x=>`<li>${x}</li>`).join('')}</ul></div>
<div class="cards">${p.m.map((u,j)=>`<figure class="card k${j}">${med(u,j)}</figure>`).join('')}</div>
<h3 class="name">${p.n}</h3></article>`).join('')+
`<div class="ctrl">${P.map((p,i)=>`<button class="tab${i?'':' on'}">${p.n}</button>`).join('')}<div class="arr"><button id="sp" aria-label="Proyecto anterior">←</button><button id="sn" aria-label="Proyecto siguiente">→</button></div></div>`;
let cur=0;
function go(n){cur=(n+P.length)%P.length;
 $$('.slide',stage).forEach((s,i)=>{s.classList.toggle('on',i===cur);if(i!==cur){s.classList.remove('open');$('.more-b',s).setAttribute('aria-expanded','false')}});
 $$('.tab',stage).forEach((t,i)=>t.classList.toggle('on',i===cur));
 stage.classList.remove('hold')}
$$('.tab',stage).forEach((t,i)=>t.onclick=()=>go(i));
$('#sp').onclick=()=>go(cur-1);$('#sn').onclick=()=>go(cur+1);
stage.addEventListener('animationend',e=>{if(e.animationName==='fill')go(cur+1)});
stage.addEventListener('click',e=>{const b=e.target.closest('.more-b');if(!b)return;const s=b.closest('.slide'),o=s.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Cerrar':'Ver detalles';stage.classList.toggle('hold',o)});
stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
let x0=null;stage.addEventListener('pointerdown',e=>{x0=e.clientX});
stage.addEventListener('pointerup',e=>{if(x0!==null&&Math.abs(e.clientX-x0)>60)go(cur+(e.clientX<x0?1:-1));x0=null});
$$('.mq').forEach(m=>{const t=m.dataset.t;const h=t.includes('|')?t.split('|').map(x=>`<span>${x}</span>`).join(''):`<span>${t}</span>`;m.innerHTML=h+h+h+h;m.style.animationName='mq';});
$$('.mq').forEach(m=>{m.innerHTML=m.innerHTML.slice(0,m.innerHTML.length)});
const rail=$('#rail');$('#rp').onclick=()=>rail.scrollBy({left:-360,behavior:'smooth'});$('#rn').onclick=()=>rail.scrollBy({left:360,behavior:'smooth'});

const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));
