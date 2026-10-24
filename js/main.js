/* FATHIUM - order logic: offers, quantity, total, validation */
const $=id=>document.getElementById(id), fmt=n=>n.toLocaleString('en')+' DH';
let offer='bundle', qty=1;
$('ing').innerHTML=ING.map((n,i)=>`<li style="--i:${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span>${n}</span></li>`).join('');
$('cities').innerHTML=CITIES.map(c=>`<option value="${c}">`).join('');
function calc(){
  if(!offer) return null;
  if(offer==='single'){const sub=SINGLE*qty;return{label:'علبة واحدة',q:`${qty} علبة · ${qty} كغ`,sub,save:0,fee:SINGLE_DELIVERY_FEE,total:SINGLE_DELIVERY_FEE==null?null:sub+SINGLE_DELIVERY_FEE};}
  const sub=BUNDLE*qty;return{label:'عرض جوج علب',q:`${qty} عرض · ${qty*JARS} علب · ${qty*JARS} كغ`,sub,save:(SINGLE*JARS-BUNDLE)*qty,fee:0,total:sub};
}
function bump(el){ if(!el||!el.animate) return; el.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'}); }
function render(){
  document.querySelectorAll('input[type=radio]').forEach(r=>r.checked=r.value===offer);
  $('qty').textContent=qty; $('ql').textContent=offer==='bundle'?'عدد العروض':'عدد العلب';
  const c=calc();
  const tl=$('s-total'); if(tl) tl.textContent=!c?'—':(c.total==null?fmt(c.sub)+' + التوصيل':fmt(c.total));
  if(!c){$('b-offer').textContent='اختار العرض';$('b-price').textContent='من 299 DH';return;}
  $('b-offer').textContent=c.label;$('b-price').textContent=fmt(c.sub);
  bump($('b-price'));bump($('s-total'));
}
function updateHeroPricing(){return;
  const p=$('hero-price'),o=$('hero-original-price'),b=$('hero-save-badge');
  if(offer==='bundle'){p.innerHTML='499 <small class="text-lg">DH</small>';o.style.display='inline';b.style.display='inline';}
  else{p.innerHTML='299 <small class="text-lg">DH</small>';o.style.display='none';b.style.display='none';}
  bump(p);
}
document.querySelectorAll('input[type=radio]').forEach(r=>r.addEventListener('change',()=>{
  offer=r.value;$('e-offer').textContent='';render();updateHeroPricing();
}));
updateHeroPricing();
$('qm').onclick=()=>{if(qty>1){qty--;render();bump($('qty'));}};
$('qp').onclick=()=>{if(qty<20){qty++;render();bump($('qty'));}};
function validate(){
  let ok=true;const set=(k,m)=>{$('e-'+k).textContent=m;if(m)ok=false;};
  const n=$('name').value.trim();set('name',n.length>=4&&n.split(/\s+/).length>=2?'':'المرجو إدخال الاسم الكامل.');
  set('phone',/^(?:\+212|00212|0)[5-7]\d{8}$/.test($('phone').value.replace(/[\s.\-()]/g,''))?'':'رقم غير صحيح. مثال: 0612345678 أو +212612345678');
  set('city',$('city').value.trim().length>=2?'':'المرجو إدخال اسم المدينة.');
  set('offer',offer?'':'المرجو اختيار العرض.');return ok;
}
$('f').addEventListener('submit',e=>{
  e.preventDefault();const b=$('ok');
  if(!validate()){b.classList.add('hidden');const x=document.querySelector('.err:not(:empty)');x&&x.parentElement.querySelector('input,textarea')?.focus();return;}
  // TODO: عند الربط أرسل البيانات إلى ORDER_ENDPOINT (fetch POST) أو افتح wa.me
  console.info('Validated order (not sent):',{name:$('name').value.trim(),phone:$('phone').value.trim(),city:$('city').value.trim(),offer,qty,summary:calc()});
  b.textContent='تم التحقق من المعلومات محلياً فقط. لم يتم إرسال أي طلب، ويجب ربط الصفحة بخادم طلبات أو بواتساب قبل استقبال الطلبات الحقيقية.';
  b.classList.remove('hidden');b.focus();
});
new IntersectionObserver(([e])=>$('bar').style.display=e.isIntersecting?'none':'',{threshold:.05}).observe($('order'));
document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>{offer=b.dataset.pick;$('e-offer').textContent='';render();updateHeroPricing();$('order').scrollIntoView({behavior:'smooth'});}));
{const a=$('wa');a.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('السلام عليكم، بغيت نطلب بروثين رشاقة من FATHIUM');a.hidden=false;}
render();
