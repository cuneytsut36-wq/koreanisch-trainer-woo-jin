(function(){
const files=['https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_154838_680232c9-9ba0-4ddd-8be2-78b606d93fe2.png','https://d8j0ntlcm91z4.cloudfront.net/user_3KgDSNgRcYHCEkF9DO7qAnjsYND/hf_20261015_160300_716f50af-6ae9-4713-8a51-99a8df052612.png'];
function index(){return ({ko:0,de:1,en:2})[wjTarget]||0}
function decorate(){
const root=document.getElementById('main');if(!root)return;
root.querySelectorAll('.rpg26-avatar img').forEach(img=>{
if(img.parentElement.querySelector('.rpg29-human'))return;
let s=document.createElement('span');s.className='rpg29-human';s.style.backgroundImage='url('+files[0]+')';s.style.backgroundPosition=(index()*50)+'% 0';s.setAttribute('role','img');s.setAttribute('aria-label',img.alt);
img.after(s);img.style.display='none';
});
root.querySelectorAll('.rpg26-scenery .rpg26-monument:not(.rpg29-monument),.rpg26-mini-monuments .rpg26-monument:not(.rpg29-monument),.rpg26-map-monument:not(.rpg29-monument),.rpg26-chapter-icon .rpg26-monument:not(.rpg29-monument)').forEach((node,i)=>{
const slot=(i%4),row=index();let s=document.createElement('span');s.className=(node.className.baseVal||node.className)+' rpg29-monument';
s.style.backgroundImage='url('+files[1]+')';s.style.backgroundPosition=(slot*100/3)+'% '+(row*50)+'%';s.setAttribute('aria-hidden','true');node.replaceWith(s);
});
}
const old=render;render=function(){const r=old.apply(this,arguments);decorate();return r};decorate();
})();