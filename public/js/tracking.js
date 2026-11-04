/* FATHIUM - Meta Pixel + TikTok Pixel (كل واحد كيتحمل غير إلا ID ديالو معمر فـ config.js) */
(function(){
  const clean=v=>String(v||'').trim();
  const META_ID=(typeof META_PIXEL_ID!=='undefined'&&clean(META_PIXEL_ID).replace(/\D/g,''))||'';
  const TT_ID=(typeof TIKTOK_PIXEL_ID!=='undefined'&&clean(TIKTOK_PIXEL_ID).replace(/[^A-Za-z0-9]/g,''))||'';
  const TT_ORDER=(typeof TIKTOK_ORDER_EVENT!=='undefined'&&TIKTOK_ORDER_EVENT)||'PlaceAnOrder';
  const META_ORDER=(typeof META_ORDER_EVENT!=='undefined'&&META_ORDER_EVENT)||'Lead';

  /* نحمل سكريبتات الـ pixels بعد load باش ما يزاحموش الصورة الرئيسية؛ الأحداث كتبقى فالـ queue وكتتبعت */
  const later=fn=>document.readyState==='complete'?setTimeout(fn,0):window.addEventListener('load',()=>setTimeout(fn,0));

  window.track=function(){}; window.trackUser=function(){};
  if(!META_ID&&!TT_ID) return;

  /* ---------- Meta Pixel ---------- */
  if(META_ID){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];later(function(){s.parentNode.insertBefore(t,s)})}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',META_ID);
    fbq('track','PageView');
  }

  /* ---------- TikTok Pixel ---------- */
  if(TT_ID){
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];later(function(){e.parentNode.insertBefore(n,e)})};
      ttq.load(TT_ID);
      ttq.page();
    }(window,document,'ttq');
  }

  /* تحويل أسماء الأحداث وبارامترات Meta لصيغة TikTok */
  const TT_MAP={ViewContent:'ViewContent',AddToCart:'AddToCart',InitiateCheckout:'InitiateCheckout',Contact:'Contact'};
  TT_MAP[META_ORDER]=TT_ORDER;           /* Lead/Purchase (الطلب) -> الحدث اللي مختار لـ TikTok */
  function ttParams(p){
    p=p||{};
    const out={};
    if(p.value!=null) out.value=p.value;
    if(p.currency) out.currency=p.currency;
    if(p.content_ids&&p.content_ids.length){
      const q=p.num_items||1;
      out.content_type='product';
      out.contents=[{content_id:p.content_ids[0],content_type:'product',content_name:p.content_name||'',quantity:q,price:p.value!=null?Math.round((p.value/q)*100)/100:undefined}];
    }else if(p.content_name){
      out.content_name=p.content_name;
    }
    return out;
  }

  /* track(اسم_الحدث, بارامترات, eventID?, custom?) — نفس الواجهة القديمة، كتبعت للمنصتين */
  window.track=function(name,params,eventID,custom){
    if(META_ID){
      try{
        const m=custom?'trackCustom':'track';
        if(eventID) fbq(m,name,params||{},{eventID:String(eventID)}); else fbq(m,name,params||{});
      }catch(e){}
    }
    if(TT_ID&&!custom&&TT_MAP[name]){
      try{
        if(eventID) ttq.track(TT_MAP[name],ttParams(params),{event_id:String(eventID)});
        else ttq.track(TT_MAP[name],ttParams(params));
      }catch(e){}
    }
  };

  /* Advanced Matching: Meta كتعمل hash للمعلومات، و TikTok كتعمل hash لـ phone_number */
  window.trackUser=function(d){
    const digits=String(d.phone||'').replace(/\D/g,'').replace(/^00/,'').replace(/^0/,'212');
    if(META_ID){
      try{
        const p=String(d.name||'').trim().toLowerCase().split(/\s+/);
        fbq('init',META_ID,{
          ph:digits,
          fn:p[0]||'', ln:p.slice(1).join(' '),
          country:'ma'
        });
      }catch(e){}
    }
    if(TT_ID&&digits){
      try{ ttq.identify({phone_number:'+'+digits}); }catch(e){}
    }
  };
})();