/* V18 – context-specific illustrated vocabulary scenes, rendered locally without videos or external requests. */
(function(){
const glyphs={
 water:['💧','#69cafc'],coffee:['☕','#ecb677'],food:['🍜','#f2a872'],apple:['🍎','#fb777b'],cat:['🐈','#fbc28f'],friend:['🧑‍🤝‍🧑','#f5b2c4'],school:['🏫','#90bce8'],
 train:['🚆','#81c5ed'],plane:['✈️','#d3dff9'],bus:['🚌','#f3d18a'],temple:['⛩️','#ec7d86'],tower:['🗼','#e99581'],castle:['🏰','#c6b6f4'],city:['🏙️','#85c0f1'],beach:['🏖️','#efc481'],mountain:['🏔️','#b7d5ee'],
 book:['📚','#dec0e6'],home:['🏠','#f9b88a'],shop:['🛍️','#eeb4c6'],sun:['🌞','#f7d07a'],flower:['🌸','#f5bad3'],heart:['💛','#ffb8ac'],time:['🕰️','#d5b2ee'],phone:['📱','#b6cbdf'],greet:['👋','#e5acfb'],travel:['🧳','#b5dc9b'],chat:['💬','#8fd8eb'],numbers:['🔢','#b7b0ef']
};
const rules=[
 ['water',/wasser|water|mul\b|mureul|flasche|drinken|masyeo|trink|juice|saft|eoreum|ice/],
 ['coffee',/café|cafe|kaffee|coffee|keopi|tee\b|tea\b|americano/],
 ['apple',/apfel|apple|sagwa|ringo/],['cat',/katze|cat\b|goyangi|neko/],
 ['train',/zug|train|bahn|rail|jiha|metro|u-bahn|bahnhof|station/],
 ['plane',/flughafen|airport|airplane|flug|plane|gate|passport|reisepass/],
 ['bus',/\bbus\b|beoseu/],['temple',/tempel|temple|shrine|torii|asakusa|buddha|gyeongbok|palace/],
 ['tower',/tower|turm|big ben|tokio tower|tokyo tower|fernsehturm|n seoul/],
 ['castle',/schloss|castle|burg|neuschwanstein/],
 ['beach',/strand|beach|meer|ocean|sea|jeju|urlaub|sunset/],
 ['mountain',/berg|mountain|fuji|alpen|wald|hiking/],
 ['school',/schule|school|student|uni|studier|lernen|gakgyo/],
 ['food',/essen|eat|food|meoge|sushi|ramen|restaurant|reis|rice|brot|bread|mahlzeit|frühstück/],
 ['friend',/freund|friend|meeting|treffen|mannaseo|meet|people|person/],
 ['book',/buch|book|lesen|read|history|geschicht|geschichte|bibliothek/],
 ['home',/haus|home|house|zuhause|apartment|wohnung|family|familie/],
 ['shop',/shop|einkaufen|shopping|kaufen|markt|market|ticket|preis|bezahlen|price/],
 ['sun',/sonne|sun|weather|wetter|heute|today|hot|warm|kalt|cold|snow/],
 ['flower',/blume|flower|sakura|kirschbl|cherry|frühling/],
 ['heart',/liebe|love|herz|heart|sarang/],
 ['time',/uhr|clock|zeit|time|yesterday|gestern|tomorrow|morgen/],
 ['phone',/telefon|phone|handy|mobile|call/],
 ['greet',/hallo|hello|hi\b|guten morgen|annyeong|willkommen|welcome|danke|thanks/],
 ['travel',/reise|travel|koffer|luggage|hotel|reisebüro/],
 ['numbers',/zahl|number|isipsam|sip\b|eins|zwei|one|two/],
 ['city',/stadt|city|berlin|london|seoul|münchen|hamburg|straße|street|platz|bridge|brücke/]
];
function pick(s){for(const r of rules){if(r[1].test(s))return r[0]}return 'chat'}
function scene(type){
 const item=glyphs[type]||glyphs.chat,color=item[1];
 const skyline=type==='city'||type==='tower'||type==='castle'||type==='school'||type==='temple';
 const base=skyline?'<rect x="45" y="182" width="63" height="92" fill="#21436d"/><rect x="119" y="155" width="70" height="119" fill="#1b355b"/><rect x="283" y="164" width="70" height="110" fill="#26446d"/><rect x="353" y="193" width="50" height="81" fill="#193357"/><g fill="#fee7b0"><rect x="70" y="205" width="10" height="13"/><rect x="142" y="190" width="12" height="13"/><rect x="313" y="198" width="12" height="11"/></g>':'<ellipse cx="210" cy="238" rx="120" ry="25" fill="#07192f" opacity=".45"/><path d="M78 259L150 238 206 259 278 238 348 259v25H78Z" fill="#183c64"/>';
 const stars=Array.from({length:12},(_,i)=>'<rect x="'+(18+i*34)+'" y="'+(19+(i*39)%100)+'" width="'+(i%3===0?7:4)+'" height="'+(i%3===0?7:4)+'" fill="#fff0d2" opacity=".62"/>').join('');
 const foreground=type==='water'?'<g><path d="M140 107h140l-17 146H157Z" fill="#b8e8ff" stroke="#e9ffff" stroke-width="8"/><path d="M163 164h93l-12 78h-71Z" fill="#4db9ef" opacity=".88"/><path d="M181 126v16" stroke="#fff" stroke-width="7"/></g>':type==='apple'?'<path d="M208 110q-26-26-64 4-46 30-30 80 18 72 82 75 24-4 29-1 70 4 88-79 11-72-42-90-23-10-49 9Z" fill="#e8505b" stroke="#ff9fa5" stroke-width="9"/><path d="M213 114q20-48 63-41-5 37-49 39" fill="#7aba67"/><path d="M213 119q-2-29 11-54" stroke="#463e33" stroke-width="9"/>':type==='coffee'?'<rect x="122" y="142" width="169" height="105" rx="12" fill="#f8e5d2"/><path d="M290 158h35v52q-1 25-35 19" fill="none" stroke="#f8e5d2" stroke-width="19"/><path d="M131 149h153v24H131Z" fill="#71492d"/><path d="M153 126q-14-26 3-46m41 45q-14-25 2-44m42 43q-16-25 0-45" stroke="#dbecf7" stroke-width="7" fill="none"/>':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#102c5a"/><stop offset=".7" stop-color="#376c9c"/><stop offset="1" stop-color="#224978"/></linearGradient></defs><rect width="420" height="300" rx="14" fill="url(#b)"/><circle cx="343" cy="62" r="32" fill="'+color+'" opacity=".4"/>'+stars+base+(foreground||'<text x="210" y="207" font-family="Apple Color Emoji,Segoe UI Emoji,sans-serif" font-size="130" text-anchor="middle">'+item[0]+'</text>')+'<rect x="0" y="275" width="420" height="25" fill="#0c2542"/></svg>';
}
const cache=new Map();
v42VocabScene=function(text){const type=pick(String(text||'').toLocaleLowerCase('de'));if(!cache.has(type))cache.set(type,'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(scene(type)));return cache.get(type)};
})();