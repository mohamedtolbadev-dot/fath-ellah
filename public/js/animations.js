/* FATHIUM - animations: hero sequence, checklist cascade, scroll reveal */
(function(){
  if(!document.documentElement.classList.contains('js')) return;
  requestAnimationFrame(()=>document.querySelectorAll('.hseq').forEach(el=>el.classList.add('in')));
  document.querySelectorAll('.cascade').forEach(c=>c.querySelectorAll('li').forEach((li,i)=>li.style.setProperty('--i',i)));
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.15});
  document.querySelectorAll('.cascade').forEach(el=>io.observe(el));
})();

/* scroll reveal */
(function(){
  if(!document.documentElement.classList.contains('js')||!('IntersectionObserver' in window)) return;
  const add=(sel,cls,stagger)=>document.querySelectorAll(sel).forEach((el,i)=>{
    if(el.closest('.hseq')||el.classList.contains('rv')) return;
    el.classList.add('rv'); if(cls) el.classList.add(cls);
    if(stagger) el.style.setProperty('--rd',(Math.min(i,6)*.1)+'s');
  });
  document.querySelectorAll('.hero-checks').forEach(ul=>ul.querySelectorAll('.hc').forEach((h,i)=>h.style.setProperty('--k',i)));
  add('.band3 > div > div','rv-zoom',true);
  add('.banner-wrap','rv-zoom');
  add('#details p,#details .reasons li',null,true);
  add('#details img','rv-zoom',true);
  add('.usage-imgs .img-frame','rv-zoom',true);
  add('#ingredients img','rv-l');
  add('#ing li','rv-zoom',true);
  add('.review','rv-zoom',true);
  add('.order-card > div:first-child .pick','rv-zoom',true);
  add('.order-card .rule',null);
  add('.order-card .space-y-5 > div',null,true);
  add('.total-line,.order-card .btn-lg,.order-card .pay',null);
  add('.trust-box li','rv-r',true);
  add('#order .text-center.mb-10',null);
  add('.how > li','rv-zoom',true);
  add('details',null,true);
  add('main > section:last-of-type > div > *',null,true);
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();