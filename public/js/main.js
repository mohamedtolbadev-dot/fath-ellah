/* FATHIUM - order logic: offers, quantity, total, validation */
const $=id=>document.getElementById(id), fmt=n=>n.toLocaleString('en')+' DH';
let offer='bundle', qty=1;
$('ing').innerHTML=ING.map((n,i)=>`<li style="--i:${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span>${n}</span></li>`).join('');
function calc(){
  if(!offer) return null;
  if(offer==='single'){const sub=SINGLE*qty;return{label:'علبة واحدة',q:`${qty} علبة · ${qty} كغ`,sub,save:0,fee:SINGLE_DELIVERY_FEE,total:SINGLE_DELIVERY_FEE==null?null:sub+SINGLE_DELIVERY_FEE};}
  const sub=BUNDLE*qty;return{label:'عرض جوج علب',q:`${qty} عرض · ${qty*JARS} علب · ${qty*JARS} كغ`,sub,save:(SINGLE*JARS-BUNDLE)*qty,fee:0,total:sub};
}
function bump(el){ if(!el||!el.animate) return; el.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'}); }
function render(){
  document.querySelectorAll('input[type=radio]').forEach(r=>r.checked=r.value===offer);
  $('qty').textContent=qty; $('ql').textContent=offer==='bundle'?'عدد العروض':'عدد العلب';
  $('qm').disabled=qty<=1; $('qp').disabled=qty>=20;
  const c=calc();
  const tl=$('s-total'); if(tl) tl.textContent=!c?'—':(c.total==null?fmt(c.sub)+' + التوصيل':fmt(c.total));
  if(!c){$('b-offer').textContent='اختار العرض';$('b-price').textContent='من 299 DH';return;}
  $('b-offer').textContent=c.label;$('b-price').textContent=fmt(c.sub);
  bump($('b-price'));bump($('s-total'));
}
document.querySelectorAll('input[type=radio]').forEach(r=>r.addEventListener('change',()=>{
  offer=r.value;$('e-offer').textContent='';render();
}));
$('qm').onclick=()=>{if(qty>1){qty--;render();bump($('qty'));}};
$('qp').onclick=()=>{if(qty<20){qty++;render();bump($('qty'));}};

/* حقول الفورم: مسح الخطأ فاش كيكتب المستعمل + تحويل الأرقام العربية فالهاتف */
const AR_DIGITS='٠١٢٣٤٥٦٧٨٩', FA_DIGITS='۰۱۲۳۴۵۶۷۸۹';
function markField(k,msg){
  $('e-'+k).textContent=msg;
  const i=$(k);
  if(i){i.setAttribute('aria-invalid',msg?'true':'false');i.closest('.pill')?.classList.toggle('invalid',!!msg);}
}
['name','phone','city','address'].forEach(k=>$(k).addEventListener('input',e=>{
  if(k==='phone'){
    const v=e.target.value.replace(/[٠-٩]/g,d=>AR_DIGITS.indexOf(d)).replace(/[۰-۹]/g,d=>FA_DIGITS.indexOf(d));
    if(v!==e.target.value) e.target.value=v;
  }
  if($('e-'+k).textContent) markField(k,'');
}));

function validate(){
  let ok=true;const set=(k,m)=>{markField(k,m);if(m)ok=false;};
  const n=$('name').value.trim();set('name',n.length>=4&&n.split(/\s+/).length>=2?'':'المرجو إدخال الاسم الكامل.');
  set('phone',/^(?:\+212|00212|0)[5-7]\d{8}$/.test($('phone').value.replace(/[\s.\-()]/g,''))?'':'رقم غير صحيح. مثال: 0612345678 أو +212612345678');
  set('city',$('city').value.trim().length>=2?'':'المرجو إدخال اسم المدينة.');
  set('address',$('address').value.trim().length>=6?'':'المرجو إدخال العنوان كامل (الحي، الشارع، رقم الدار).');
  set('offer',offer?'':'المرجو اختيار العرض.');return ok;
}
/* modal ديال التأكيد */
const cm=$('cm');
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showConfirm(kind,title,msg,c,data,dbg){
  $('cm-ic').className='cm-ic '+kind;
  $('cm-ic').innerHTML=kind==='err'?'<span aria-hidden="true">!</span>':'<svg class="ico"><use href="#i-check"/></svg>';
  $('cm-t').textContent=title;$('cm-msg').textContent=msg;
  let d=$('cm-dbg');if(!d){d=document.createElement('p');d.id='cm-dbg';d.className='cm-dbg';$('cm-msg').after(d);}
  d.textContent=dbg?'تفاصيل تقنية: '+dbg:'';
  const tot=c.total==null?fmt(c.sub)+' + التوصيل (كيتحدد قبل التأكيد)':fmt(c.total);
  $('cm-list').innerHTML=[['الاسم',data.name],['الهاتف',data.phone],['المدينة',data.city],['العنوان',data.address],['العرض',c.label],['الكمية',c.q],['المجموع',tot]]
    .map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
  if(cm.showModal) cm.showModal(); else cm.setAttribute('open','');
  $('cm-ok').focus();
}
$('cm-ok').addEventListener('click',()=>cm.close?cm.close():cm.removeAttribute('open'));
cm.addEventListener('click',e=>{if(e.target===cm)cm.close();});

let sending=false;
$('f').addEventListener('submit',async e=>{
  e.preventDefault();
  if(sending) return;
  if(!validate()){$('f').querySelector('[aria-invalid="true"]')?.focus();return;}
  const c=calc(),data={name:$('name').value.trim(),phone:$('phone').value.trim(),city:$('city').value.trim(),address:$('address').value.trim()};
  const btn=e.submitter||$('f').querySelector('[type=submit]'),label=btn.innerHTML;
  const okMsg='شكراً ليك! توصلنا بالطلب ديالك، وغنتصلو بيك فأقرب وقت باش نأكدو ليك الطلب. الدفع كيكون عند الاستلام.';
  const failMsg='ما قدرناش نرسلو الطلب. عاود المحاولة بعد شوية ولا تواصل معانا فواتساب.';
  sending=true;btn.disabled=true;btn.textContent='جاري الإرسال...';
  try{
    if(ORDER_ENDPOINT){
      /* text/plain باش Google Apps Script ما يطلبش preflight (CORS) */
      const r=await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...data,offer,qty})});
      if(!r.ok) throw new Error('HTTP '+r.status);
      const j=await r.json().catch(()=>null);
      if(!j||j.ok!==true) throw new Error('Server: '+JSON.stringify(j));
      showConfirm('ok','تم إرسال طلبك بنجاح',okMsg,c,data);
      $('f').reset();offer='bundle';qty=1;render();
    }else if(WHATSAPP){
      const t=`السلام عليكم، بغيت نطلب:\nالعرض: ${c.label} (${c.q})\nالمجموع: ${c.total==null?fmt(c.sub)+' + التوصيل':fmt(c.total)}\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالمدينة: ${data.city}\nالعنوان: ${data.address}`;
      window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(t),'_blank','noopener');
      showConfirm('ok','تم تجهيز طلبك','فتحنا ليك واتساب بالمعلومات ديالك. المرجو إرسال الرسالة باش نأكدو الطلب.',c,data);
    }else{
      throw new Error('config.js: ORDER_ENDPOINT و WHATSAPP فارغين');
    }
  }catch(err){
    console.error('Order not sent:',err);
    showConfirm('err','وقع مشكل',failMsg,c,data,String(err&&err.message||err));
  }
  sending=false;btn.disabled=false;btn.innerHTML=label;
});
new IntersectionObserver(([e])=>$('bar').style.display=e.isIntersecting?'none':'',{threshold:.05}).observe($('order'));
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{offer=b.dataset.pick;$('e-offer').textContent='';render();$('order').scrollIntoView({behavior:'smooth'});}));
{const a=$('wa');
  if(WHATSAPP){a.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('السلام عليكم، بغيت نطلب بروثين رشاقة من FATHIUM');a.hidden=false;}
  else a.hidden=true;}
render();

/* reviews lightbox */
(function(){
  const lb=document.getElementById('lb'); if(!lb||!lb.showModal) return;
  const img=lb.querySelector('img');
  document.querySelectorAll('.review-btn').forEach(b=>b.addEventListener('click',()=>{
    const s=b.querySelector('img'); img.src=s.currentSrc||s.src; img.alt=s.alt; lb.showModal();
  }));
  lb.querySelector('.lb-x').addEventListener('click',()=>lb.close());
  lb.addEventListener('click',e=>{if(e.target===lb)lb.close();});
})();