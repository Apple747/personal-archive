const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const loader=$('.loader');if(loader){let p=0;const out=$('output',loader),line=$('.loader-progress i',loader);const t=setInterval(()=>{p=Math.min(100,p+Math.ceil(Math.random()*11));out.value=p+'%';line.style.width=p+'%';if(p===100){clearInterval(t);setTimeout(()=>{loader.classList.add('done');document.body.classList.remove('is-loading')},250)}},45)}
const toggle=$('.menu-toggle'),menu=$('.site-menu');if(toggle&&menu){toggle.onclick=()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));$('span',toggle).textContent=open?'CLOSE':'MENU'};$$('.site-menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')))}
addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX/innerWidth-.5);document.documentElement.style.setProperty('--my',e.clientY/innerHeight-.5)});
const wipe=$('.page-wipe');$$('a[href$=".html"],a[href*=".html#"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();wipe.classList.remove('active');requestAnimationFrame(()=>wipe.classList.add('active'));setTimeout(()=>location.href=a.href,470)}));
const track=$('.cover-track');if(track){let current=0,timer;const dots=$$('.dots button'),slides=$$('.cover-slide');function show(n){current=(n+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}vw)`;dots.forEach((d,i)=>d.classList.toggle('active',i===current));slides.forEach((s,i)=>s.classList.toggle('active',i===current));clearInterval(timer);timer=setInterval(()=>show(current+1),6500)}dots.forEach((d,i)=>d.onclick=()=>show(i));$('.prev').onclick=()=>show(current-1);$('.next').onclick=()=>show(current+1);show(0)}
const rail=$('.photo-rail');if(rail){let dragging=false,start=0,x=0,last=0,velocity=0,min=0;const clamp=v=>Math.max(min,Math.min(0,v));const recalc=()=>min=Math.min(0,innerWidth-rail.scrollWidth-40);recalc();addEventListener('resize',recalc);rail.onpointerdown=e=>{dragging=true;start=e.clientX-x;last=e.clientX;rail.setPointerCapture(e.pointerId);rail.style.transition='none'};rail.onpointermove=e=>{if(!dragging)return;velocity=e.clientX-last;last=e.clientX;x=clamp(e.clientX-start);rail.style.transform=`translateX(${x}px)`};rail.onpointerup=()=>{dragging=false;x=clamp(x+velocity*9);rail.style.transition='transform .85s cubic-bezier(.2,.75,.2,1)';rail.style.transform=`translateX(${x}px)`};rail.onkeydown=e=>{if(e.key==='ArrowRight')x=clamp(x-280);if(e.key==='ArrowLeft')x=clamp(x+280);rail.style.transform=`translateX(${x}px)`}}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});$$('.reveal').forEach(e=>io.observe(e));

// Load the refinement layer separately so the original concept remains easy to compare.
const refinement=document.createElement('link');refinement.rel='stylesheet';refinement.href='assets/enhanced.css';document.head.append(refinement);

// Subpages arrive through the same color field used by the outgoing page.
if(!loader){const arrival=document.createElement('div');arrival.className='page-arrival';arrival.setAttribute('aria-hidden','true');document.body.append(arrival);requestAnimationFrame(()=>requestAnimationFrame(()=>arrival.classList.add('leave')));setTimeout(()=>arrival.remove(),950)}

// Opening mascot and small archive symbols.
if(loader){
  const scene=document.createElement('div');
  scene.className='loader-scene';
  scene.innerHTML='<span class="loader-code">NODE 01 / OPENING</span><span class="charm charm-star">✦</span><span class="charm charm-cross">＋</span><span class="charm charm-ring"></span><img src="assets/images/miku-chibi.png" alt="Q 版 Miku"><i class="chibi-shadow"></i>';
  loader.append(scene);
}
const charms=document.createElement('div');
charms.className='page-charms';charms.setAttribute('aria-hidden','true');
charms.innerHTML='<i></i><i></i><i></i><span>✦</span><small>PA–026</small>';
document.body.append(charms);

// Four finalist palettes can be compared on the real site, not only on swatches.
const paletteNames={'23':'夏日天空','17':'初音青','19':'电子蓝','20':'樱花粉','22':'珊瑚橙','24':'午夜初音','25':'深海蓝','26':'夜樱紫','27':'炭黑珊瑚'};
const savedPalette=localStorage.getItem('pa-palette-v2');
const activePalette=paletteNames[savedPalette]?savedPalette:'23';
document.body.dataset.palette=activePalette;
const paletteSwitch=document.createElement('div');
paletteSwitch.className='palette-switch';
paletteSwitch.innerHTML='<button class="palette-switch-toggle" aria-expanded="false"><i></i><span>COLOR</span></button><div class="palette-options">'+Object.entries(paletteNames).map(([id,name])=>'<button data-theme="'+id+'"><i></i><b>'+id+'</b><span>'+name+'</span></button>').join('')+'</div>';
document.body.append(paletteSwitch);
const paletteToggle=$('.palette-switch-toggle',paletteSwitch),paletteOptions=$('.palette-options',paletteSwitch);
const paintPalette=id=>{document.body.dataset.palette=id;localStorage.setItem('pa-palette-v2',id);$$('[data-theme]',paletteSwitch).forEach(b=>b.classList.toggle('active',b.dataset.theme===id))};
paletteToggle.addEventListener('click',()=>{const open=paletteSwitch.classList.toggle('open');paletteToggle.setAttribute('aria-expanded',String(open))});
$$('[data-theme]',paletteSwitch).forEach(button=>button.addEventListener('click',()=>{paintPalette(button.dataset.theme);paletteSwitch.classList.remove('open');paletteToggle.setAttribute('aria-expanded','false')}));
paintPalette(activePalette);

// A quiet "memory signal" connects every page and turns scrolling into part of the story.
const signal=document.createElement('div');
signal.className='memory-signal';
signal.setAttribute('aria-hidden','true');
signal.innerHTML='<span class="signal-label">MEMORY SIGNAL</span><svg viewBox="0 0 40 1000" preserveAspectRatio="none"><path class="signal-ghost" d="M20 0V135 C20 160 6 165 6 190S34 220 34 248 10 285 10 318 30 360 30 396 20 430 20 470V570 C20 605 5 620 5 650S35 690 35 725 20 770 20 810V1000"/><path class="signal-live" d="M20 0V135 C20 160 6 165 6 190S34 220 34 248 10 285 10 318 30 360 30 396 20 430 20 470V570 C20 605 5 620 5 650S35 690 35 725 20 770 20 810V1000"/></svg><i></i>';
document.body.append(signal);

const status=document.createElement('div');
status.className='signal-status';
status.innerHTML='<i></i><span>SIGNAL 026</span><small>CONNECTED</small>';
document.body.append(status);

// Give each part of the archive its own Miku pose instead of repeating one cutout.
const onHome=document.body.classList.contains('home');
if(onHome){
  const hero=$('.character-wrap');
  if(hero){const echo=document.createElement('span');echo.className='miku-echo';hero.prepend(echo);hero.title='点击接通信号';hero.addEventListener('click',()=>{hero.classList.toggle('is-singing');status.classList.add('ping');$('small',status).textContent='VOICE FOUND';setTimeout(()=>{status.classList.remove('ping');$('small',status).textContent='CONNECTED'},1500)})}
  const record=$('.record-art img');if(record){record.src='assets/images/miku-headphones.png';record.alt='戴耳机的 Miku'}
  const summer=$('.photo-item.color-a');if(summer&&!$('img',summer)){summer.classList.add('miku-card');const img=document.createElement('img');img.src='assets/images/miku-headphones.png';img.alt='戴耳机散步的 Miku';summer.prepend(img)}
  const stage=$('.book-stage');if(stage){const img=document.createElement('img');img.className='reading-miku';img.src='assets/images/miku-reading.png';img.alt='正在阅读的 Miku';stage.prepend(img)}
  const orbit=$('.orbit-center img');if(orbit){orbit.src='assets/images/miku-headphones.png';orbit.alt='戴耳机的 Miku'}
}

const page=location.pathname.split('/').pop();
const subHero=$('.sub-hero');
if(subHero){
  const pose=(page==='books.html'||page.startsWith('reading-'))?'miku-reading.png':(page==='life.html'||page==='hobbies.html'?'miku-headphones.png':'miku-hero.png');
  let img=$('img',subHero);
  if(!img){img=document.createElement('img');subHero.append(img)}
  img.src='assets/images/'+pose;img.alt='Miku 页面引导角色';img.classList.add('sub-miku',pose.includes('reading')?'sub-miku-read':'sub-miku-walk');
}

let signalTick=0;
const updateSignal=()=>{
  signalTick=0;
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  const progress=Math.min(1,scrollY/max);
  document.documentElement.style.setProperty('--page-progress',progress);
  document.documentElement.style.setProperty('--scroll-shift',Math.round(progress*46)+'px');
  const live=$('.signal-live',signal);if(live)live.style.strokeDashoffset=String(1120-(1120*progress));
};
addEventListener('scroll',()=>{if(!signalTick)signalTick=requestAnimationFrame(updateSignal)},{passive:true});updateSignal();

// Real previous-page navigation and a visible path to the local content studio.
if(document.body.classList.contains('subpage')){
  const back=document.createElement('button');back.className='history-back';back.innerHTML='<i>←</i><span>上一页</span>';
  back.addEventListener('click',()=>{if(history.length>1)history.back();else location.href='index.html'});document.body.append(back);
}
const manage=document.createElement('a');manage.className='manage-link';const manageQuery=page==='life.html'?'?type=life':(page==='hobbies.html'?'?type=hobby':(page==='books.html'?'?type=book':(page==='reading-now.html'?'?type=book&status=current':(page==='reading-favorites.html'?'?type=book&status=favorite':(page==='reading-finished.html'?'?type=book&status=finished':'')))));manage.href='manage.html'+manageQuery;manage.innerHTML='<i>＋</i><span>'+((page.startsWith('reading-')||page==='books.html')?'添加书籍':(page==='hobbies.html'?'添加收藏':'添加记录'))+'</span>';document.body.append(manage);

// Locally authored entries appear at the top of the life archive.
if(page==='life.html'){
  const list=$('.archive-list');
  try{
    const entries=JSON.parse(localStorage.getItem('pa-entries')||'[]');
    entries.filter(entry=>!entry.type||entry.type==='life'||entry.type==='note').forEach(entry=>{
      const item=document.createElement('article');item.className='user-entry';
      item.innerHTML=(entry.image?'<img src="'+entry.image+'" alt="">':'')+'<div><time>'+entry.date+'</time><small>'+entry.category+'</small><h3>'+entry.title+'</h3><p>'+entry.text.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')+'</p></div>';
      list.prepend(item);
    });
  }catch(e){console.warn('Local archive could not be read.',e)}
}

const safeText=value=>String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let storedEntries=[];try{storedEntries=JSON.parse(localStorage.getItem('pa-entries')||'[]')}catch{}

// Books land on the exact shelf selected in the editor.
const readingPageStatus={'reading-now.html':'current','reading-favorites.html':'favorite','reading-finished.html':'finished'}[page];
if(readingPageStatus){
  const detail=$('.reading-detail');
  storedEntries.filter(entry=>entry.type==='book'&&entry.subtype===readingPageStatus).forEach(entry=>{
    const article=document.createElement('article');article.className='reading-detail-head user-book';
    article.innerHTML=(entry.image?'<img src="'+entry.image+'" alt="'+safeText(entry.title)+' 封面">':'<div class="book-placeholder">BOOK</div>')+'<div><time>'+safeText(entry.date)+'</time><small>'+safeText(entry.author)+(entry.rating?' · '+safeText(entry.rating):'')+'</small><h2>'+safeText(entry.title)+'</h2><p>'+safeText(entry.text).replace(/\n/g,'<br>')+'</p>'+(readingPageStatus==='current'?'<div class="reading-progress" style="--progress:'+Math.max(0,Math.min(100,entry.progress||0))+'%"><i></i></div>':'')+'</div>';
    detail.prepend(article);
  });
}

if(page==='books.html'){
  const statuses=['current','favorite','finished'];
  $$('.shelf article').forEach((card,index)=>{const number=storedEntries.filter(entry=>entry.type==='book'&&entry.subtype===statuses[index]).length;if(number){const badge=document.createElement('em');badge.className='content-count';badge.textContent=number+' 本已添加';card.append(badge)}});
}

// Hobby entries land in ANIME / GAME / MUSIC / PHOTO instead of a generic list.
if(page==='hobbies.html'){
  ['anime','game','music','photo'].forEach(type=>{
    const section=$('#'+type);if(!section)return;const items=storedEntries.filter(entry=>entry.type==='hobby'&&entry.subtype===type);if(!items.length)return;
    const list=document.createElement('div');list.className='hobby-user-items';
    items.forEach(entry=>{const item=document.createElement('div');item.className='hobby-user-card';item.innerHTML=(entry.image?'<img src="'+entry.image+'" alt="">':'')+'<small>'+safeText(entry.status)+' · '+safeText(entry.date)+'</small><b>'+safeText(entry.title)+'</b><p>'+safeText(entry.text)+'</p>';list.append(item)});section.append(list);
  });
}

// Reading cards are three real destinations.
const readingRoutes=['reading-now.html','reading-favorites.html','reading-finished.html'];
$$('.book-stage .book').forEach((card,index)=>{if(readingRoutes[index])card.href=readingRoutes[index]});
$$('.shelf article').forEach((card,index)=>{
  const route=readingRoutes[index];if(!route)return;card.classList.add('reading-route');card.tabIndex=0;card.setAttribute('role','link');card.setAttribute('aria-label','打开'+$('h2',card).textContent);
  const go=()=>{wipe?.classList.add('active');setTimeout(()=>location.href=route,470)};card.addEventListener('click',go);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
});

// Typography moves in quiet layers: blur clears, baseline settles, marker grows.
const movingText=$$('.cover-copy h1,.cover-copy p,.memory-copy h2,.now-copy h2,.statement h2,.statement p,.section-title h2,.reading-heading h2,.sub-hero h1,.sub-hero p,.essay h2,.essay p,.archive-list h3,.shelf h2,.hobby-list h2,.hobby-list p,.user-entry h3,.user-entry p,.reading-detail h2,.reading-detail p');
movingText.forEach((el,index)=>{el.classList.add('text-motion');el.style.setProperty('--text-delay',(index%4)*70+'ms')});
const textObserver=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('text-in');textObserver.unobserve(item.target)}}),{threshold:.18});
movingText.forEach(el=>textObserver.observe(el));
