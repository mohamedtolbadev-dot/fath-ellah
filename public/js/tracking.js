/* FATHIUM - Meta Pixel (كيتحمل غير إلا META_PIXEL_ID معمر فـ config.js) */
(function(){
  const ID=(typeof META_PIXEL_ID!=='undefined'&&String(META_PIXEL_ID).replace(/\D/g,''))||'';
  window.track=function(){}; window.trackUser=function(){};
  if(!ID) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init',ID);
  fbq('track','PageView');
  /* track(اسم_الحدث, بارامترات, eventID?, custom?) */
  window.track=function(name,params,eventID,custom){
    try{
      const m=custom?'trackCustom':'track';
      if(eventID) fbq(m,name,params||{},{eventID:String(eventID)}); else fbq(m,name,params||{});
    }catch(e){}
  };
  /* Advanced Matching: Pixel كيعمل hash للمعلومات قبل ما يبعتها لـ Meta */
  window.trackUser=function(d){
    try{
      const p=String(d.name||'').trim().toLowerCase().split(/\s+/);
      fbq('init',ID,{
        ph:String(d.phone||'').replace(/\D/g,'').replace(/^00/,'').replace(/^0/,'212'),
        fn:p[0]||'', ln:p.slice(1).join(' '),
        ct:String(d.city||'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,''),
        country:'ma'
      });
    }catch(e){}
  };
})();
