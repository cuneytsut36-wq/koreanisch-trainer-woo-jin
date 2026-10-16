/* LinguaWorld V49 — use the user's real Sakura logo and repair shared headers. */
(function(){
'use strict';
function applyBrand(){
  const h=document.querySelector('#main .lw48-brand');
  if(h&&!h.querySelector('.lw49-brand-image')){
    h.innerHTML='<span class="lw49-brand-image" role="img" aria-label="LinguaWorld"></span>';
    h.classList.add('lw49-branded');
  }
  document.querySelectorAll('.lw45-welcome .lw45-wordmark').forEach(e=>{
    if(!e.querySelector('.lw49-brand-image')){
      e.innerHTML='<span class="lw49-brand-image" role="img" aria-label="LinguaWorld"></span>';
      e.classList.add('lw49-branded');
    }
  });
  document.querySelectorAll('#main .lw34-topbar .lw34-brand').forEach(e=>{
    let text=e.querySelector('strong,.lw35-wordmark');
    if(!text)return;
    if(!text.querySelector('.lw49-brand-image')){
      text.innerHTML='<span class="lw49-brand-image" role="img" aria-label="LinguaWorld"></span>';
      text.classList.add('lw49-branded');
    }
    e.querySelector('.lw34-brand-icon')?.setAttribute('hidden','');
  });
}
document.documentElement.classList.toggle('lw49-ios',/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1));
if(typeof render==='function'){
 const prior=render;
 render=function(){const r=prior.apply(this,arguments);applyBrand();return r;};
}
if(typeof window.lw36OpenWorldPicker==='function'){
 const prior=window.lw36OpenWorldPicker;
 window.lw36OpenWorldPicker=function(){const result=prior.apply(this,arguments);applyBrand();return result;};
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',applyBrand,{once:true})}else applyBrand();
window.lw49RefreshBrand=applyBrand;
})();