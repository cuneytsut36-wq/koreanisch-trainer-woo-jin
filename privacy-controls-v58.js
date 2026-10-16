/* LinguaWorld V58 – privacy-by-default controls; no third-party call is made by this module. */
(function(){
'use strict';
var KEY='lw-privacy-v58';
var names=['media','youtube','translations','hostedAI','speech'];
var choices={};
try{var raw=JSON.parse(localStorage.getItem(KEY)||'{}');names.forEach(function(n){choices[n]=raw[n]===true})}catch(e){names.forEach(function(n){choices[n]=false})}
function allowed(n){return choices[n]===true}
function save(x){names.forEach(function(n){choices[n]=x[n]===true});try{localStorage.setItem(KEY,JSON.stringify(choices))}catch(e){}location.reload()}
function ask(n){
 if(allowed(n))return true;
 var notes={media:'Externe Fotos, Hintergründe und Woo-Jin-Videos können deine IP-Adresse an Bild- und Videoanbieter übermitteln.',youtube:'YouTube erhält beim Laden eingebetteter Videos technische Verbindungsdaten.',translations:'Eingegebene Übersetzungstexte werden an MyMemory übermittelt.',hostedAI:'Deine Chat-Nachrichten können an den Betreiber-Server und den eingestellten KI-Anbieter übertragen werden.',speech:'Die Spracherkennung des Browsers kann Audio an einen externen Sprachdienst übertragen.'};
 if(!confirm((notes[n]||'Externe Funktion aktivieren?')+'\n\nEinmalig freigeben und Auswahl jederzeit unter Datenschutz ändern?'))return false;
 choices[n]=true;try{localStorage.setItem(KEY,JSON.stringify(choices))}catch(e){}
 location.reload();return false;
}
function asset(url,fallback){return allowed('media')?url:(fallback!==undefined?fallback:'privacy-scene.svg')}
function open(){
 var old=document.getElementById('lw58-dialog');if(old){old.remove();return}
 var overlay=document.createElement('div');overlay.id='lw58-dialog';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Datenschutzeinstellungen');
 var labels={media:['Externe Bilder & Woo-Jin-Videos','Lädt Bilder und animierte Medien von externen Servern.'],youtube:['YouTube-Videos','Verbindung mit YouTube erst bei Aktivierung.'],translations:['Online-Übersetzungen','Textübermittlung an MyMemory.'],hostedAI:['Server-KI-Chat','Chatnachrichten an den Server/KI-Anbieter.'],speech:['Online-Spracherkennung','Mögliche Audioübermittlung durch den Browser.']};
 overlay.innerHTML='<div class="lw58-panel"><div class="lw58-head"><strong>Datenschutz & Einstellungen</strong><button class="lw58-close" type="button" aria-label="Schließen">×</button></div><p>Der Lernfortschritt bleibt in diesem Browser. Externe Dienste sind standardmäßig ausgeschaltet. Änderungen werden nach dem Neuladen aktiv.</p>'+names.map(function(n){return '<label class="lw58-option"><input type="checkbox" data-lw58="'+n+'" '+(allowed(n)?'checked':'')+'><span><strong>'+labels[n][0]+'</strong><small>'+labels[n][1]+'</small></span></label>'}).join('')+'<p class="lw58-mini">Einige Funktionen sind ohne externe Dienste eingeschränkt. Informationen: <a href="datenschutz.html">Datenschutzerklärung</a> · <a href="impressum.html">Impressum</a></p><div class="lw58-actions"><button class="lw58-essential" type="button">Nur lokal nutzen</button><button class="lw58-save" type="button">Auswahl speichern</button></div></div>';
 document.body.appendChild(overlay);
 overlay.querySelector('.lw58-close').addEventListener('click',function(){overlay.remove()});
 overlay.addEventListener('click',function(e){if(e.target===overlay)overlay.remove()});
 overlay.querySelector('.lw58-essential').addEventListener('click',function(){save({})});
 overlay.querySelector('.lw58-save').addEventListener('click',function(){var x={};overlay.querySelectorAll('input[data-lw58]').forEach(function(inp){x[inp.dataset.lw58]=inp.checked});save(x)});
 overlay.querySelector('.lw58-close').focus();
}
function init(){
 if(document.getElementById('lw58-privacy-shortcut'))return;
 var footer=document.createElement('div');footer.id='lw58-privacy-shortcut';
 footer.innerHTML='<button type="button" id="lw58-privacy-open">Datenschutz</button><a href="datenschutz.html">Datenschutzerklärung</a><a href="impressum.html">Impressum</a>';
 document.body.appendChild(footer);footer.querySelector('button').addEventListener('click',open);
}
window.LWPrivacy={allowed:allowed,ask:ask,asset:asset,open:open};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
