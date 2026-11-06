(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
window.$=$;window.$$=$$;
var KEY='vcc_';
window.store={get:function(k,d){try{var v=localStorage.getItem(KEY+k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem(KEY+k,JSON.stringify(v))}catch(e){alert('ब्राउज़र ने सेव नहीं करने दिया (निजी विंडो?)')}}};
window.uid=function(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)};
window.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
// theme
var th=store.get('theme','dark');document.documentElement.setAttribute('data-theme',th);
window.toggleTheme=function(){th=th==='dark'?'light':'dark';store.set('theme',th);document.documentElement.setAttribute('data-theme',th)};
// nav
var NAV=[['index.html','Home'],['news.html','News'],['market.html','Market'],['exams.html','Exams'],['planner.html','Planner'],['ai.html','AI'],['pdfs.html','📚 PDFs']];
var EXP=[['map.html','🗺 Site Map (कहाँ क्या मिलेगा)'],['govt.html','🏛 Govt'],['global.html','🌐 Global'],['ngo.html','🤝 NGOs & Humanitarian'],['startup.html','💡 Startup Lab'],['sites.html','🧭 Useful Websites'],['channels.html','🎬 Channels'],['research.html','🗂 Research']];
var KB=window.KB_PAGES||[];var MY=[['daily.html','🗓 Daily Log & Files'],['family.html','👪 Family Timeline'],['media.html','🎵 Media'],['library.html','📚 Library & Books'],['work.html','📊 Work Progress'],['vault.html','🔗 Link Vault'],['launch.html','🚀 Channel Launch']];
var SOC=[['youtube','▶ YouTube'],['instagram','📷 Instagram'],['facebook','👍 Facebook'],['linkedin','💼 LinkedIn'],['x','𝕏 X'],['urbanpro','UrbanPro'],['teacheron','TeacherOn'],['mathvani','🌐 MATHVANI'],['gemini','✨ Gemini'],['chatgpt','💬 ChatGPT'],['claude','🤖 Claude'],['gmail','✉ Gmail'],['kindle','📖 Kindle'],['ignou','🎓 IGNOU']];
window.mountNav=function(active){
 var h='<header class="top"><div class="bar"><a class="brand" href="index.html">राम <i>जाने</i><small>Research · Insight · Action</small></a><button class="burger" onclick="document.querySelector(\'nav.m\').classList.toggle(\'open\')">☰</button><nav class="m">';
 NAV.forEach(function(n){h+='<a href="'+n[0]+'"'+(n[0]===active?' class="on"':'')+'>'+n[1]+'</a>'});
 h+='<div class="dd"><button>Explore ▾</button><div class="menu">';EXP.forEach(function(n){h+='<a href="'+n[0]+'"'+(n[0]===active?' class="on"':'')+'>'+n[1]+'</a>'});h+='</div></div><div class="dd"><button>My Space ▾</button><div class="menu">';MY.forEach(function(n){h+='<a href="'+n[0]+'"'+(n[0]===active?' class="on"':'')+'>'+n[1]+'</a>'});
 h+='</div></div><div class="dd"><button>Knowledge Hub ▾</button><div class="menu">';var lg='';KB.forEach(function(n){if(n[2]&&n[2]!==lg){lg=n[2];h+='<small class="gh">'+n[2]+'</small>'}h+='<a href="'+n[0]+'"'+(n[0]===active?' class="on"':'')+'>'+n[1]+'</a>'});
 h+='</div></div><a href="income.html"'+(active==='income.html'?' class="on"':'')+'>₹ Income</a><a href="settings.html" title="Settings">⚙</a><a href="#" onclick="toggleTheme();return false" title="Day/Night">◐</a></nav></div>';
 var L=getLinks();h+='<div class="soc">'+SOC.filter(function(s){return L[s[0]]}).map(function(s){return '<a href="'+esc(L[s[0]])+'" target="_blank" rel="noopener" title="Open '+esc(s[1].replace(/^\S+\s/,''))+'">'+s[1]+'</a>'}).join('')+'</div>';
 h+='<div id="tk"></div></header>';
 document.body.insertAdjacentHTML('afterbegin',h);
 mountTicker();
};
window.mountFooter=function(){document.body.insertAdjacentHTML('beforeend','<footer>राम जाने · Private use · Educational information, not investment/medical/legal advice · Verify links & data before use · Your notes stay only in your browser</footer>')};
// external links
document.addEventListener('DOMContentLoaded',function(){$$('a[href^="http"]').forEach(function(a){a.target='_blank';a.rel='noopener noreferrer'})});
// ticker + news data
var FEEDS=[['International','https://feeds.bbci.co.uk/news/world/rss.xml','BBC'],['International','https://www.aljazeera.com/xml/rss/all.xml','Al Jazeera'],['National','https://www.thehindu.com/news/national/feeder/default.rss','The Hindu'],['National','https://indianexpress.com/section/india/feed/','Indian Express'],['Local','https://news.google.com/rss/search?hl=hi&gl=IN&ceid=IN:hi&q=%E0%A4%AC%E0%A4%B2%E0%A4%BF%E0%A4%AF%E0%A4%BE','Google News · बलिया'],['Local','https://news.google.com/rss/search?hl=hi&gl=IN&ceid=IN:hi&q=%E0%A4%89%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A4%B0+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A6%E0%A5%87%E0%A4%B6','Google News · उत्तर प्रदेश'],['Markets','https://www.moneycontrol.com/rss/marketreports.xml','Moneycontrol'],['Markets','https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms','Economic Times'],['AI','https://techcrunch.com/category/artificial-intelligence/feed/','TechCrunch AI'],['AI','https://www.technologyreview.com/feed/','MIT Tech Review'],['Geopolitics','https://news.google.com/rss/search?hl=en-IN&gl=IN&ceid=IN:en&q=India+China+US+Russia+relations','Google News · Geopolitics'],['Spiritual','https://news.google.com/rss/search?hl=hi&gl=IN&ceid=IN:hi&q=%E0%A4%86%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%AE+%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A8','Google News · Ashram']];
window.NEWS_CATS=['International','National','Local','Markets','AI','Geopolitics','Spiritual'];
var _nq=[];var _live=null;
window.getNews=function(cb){
 if(window.NEWS_DATA&&window.NEWS_DATA.items&&window.NEWS_DATA.items.length)return cb(window.NEWS_DATA);
 if(_live)return cb(_live);_nq.push(cb);if(_nq.length>1)return;
 try{var c=sessionStorage.getItem('vcc_news');if(c){var o=JSON.parse(c);if(Date.now()-o.t<900000){_live=o.d;var q=_nq.splice(0);q.forEach(function(f){f(_live)});return}}}catch(e){}
 var items=[],left=FEEDS.length;
 FEEDS.forEach(function(f){fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(f[1])).then(function(r){return r.json()}).then(function(j){if(j&&j.items)j.items.slice(0,12).forEach(function(it){items.push({cat:f[0],src:f[2],title:it.title,link:it.link,date:(it.pubDate||'').slice(0,16),k:Date.parse((it.pubDate||'').replace(' ','T')+'Z')||0})})}).catch(function(){}).then(function(){if(--left===0){items.sort(function(a,b){return b.k-a.k});_live=items.length?{updated:new Date().toLocaleString('en-IN'),items:items}:null;try{if(_live)sessionStorage.setItem('vcc_news',JSON.stringify({t:Date.now(),d:_live}))}catch(e){}var q=_nq.splice(0);q.forEach(function(f2){f2(_live)})}})})};
window.mountNewsPanel=function(id,cats,opts){opts=opts||{};var el=document.getElementById(id);var cur=cats[0];
 function draw(j){var h='<div class="tabs" style="position:static;margin:0 0 8px">'+cats.map(function(c){return '<button data-c="'+c+'" class="'+(c===cur?'on':'')+'">'+c+'</button>'}).join('')+'</div>';
  if(!j){h+='<div class="note">Live headlines could not load (offline, blocked, or limit reached). Open source sites from the <a href="news.html">News page</a>.</div>'}
  else{var it=j.items.filter(function(x){return x.cat===cur}).slice(0,opts.n||8);h+=(it.length?it.map(function(x){return '<div class="ni" style="margin:6px 0"><a href="'+esc(x.link)+'" target="_blank" rel="noopener">'+esc(x.title)+'</a><small>'+esc(x.src)+' · '+esc(x.date||'')+'</small></div>'}).join(''):'<div class="note">No items in this category yet</div>')+'<small style="color:var(--mut)">Updated: '+esc(j.updated||'')+'</small>'}
  el.innerHTML=h;Array.prototype.forEach.call(el.querySelectorAll('.tabs button'),function(b){b.onclick=function(){cur=b.dataset.c;draw(j)}})}
 el.innerHTML='Loading…';getNews(draw)};
// tabs
window.initTabs=function(){var bs=$$('.tabs button'),ps=$$('.panel');function sel(id){bs.forEach(function(b){b.classList.toggle('on',b.dataset.t===id)});ps.forEach(function(p){p.classList.toggle('on',p.id===id)});if(history.replaceState)history.replaceState(null,'','#'+id)}
 bs.forEach(function(b){b.addEventListener('click',function(){sel(b.dataset.t)})});var h=location.hash.slice(1);var f=bs.length?bs[0].dataset.t:null;sel(h&&$('#'+h)?h:f);window.addEventListener('hashchange',function(){var h=location.hash.slice(1);if(h&&$('#'+h)&&$('#'+h).classList.contains('panel'))sel(h)});};
// row filter
window.initFilter=function(){var s=$('#flt');if(!s)return;s.addEventListener('input',function(){var q=s.value.toLowerCase().trim().split(/\s+/);$$('.panel.on tr').forEach(function(tr){if(tr.querySelector('th'))return;var t=tr.textContent.toLowerCase();var ok=q.every(function(w){return !w||t.indexOf(w)>-1});if(tr.classList.contains('lk')){var p=tr.previousElementSibling;while(p&&p.classList.contains('lk'))p=p.previousElementSibling;ok=p&&!p.classList.contains('hide')}tr.classList.toggle('hide',!ok)})});
 $$('.tabs button').forEach(function(b){b.addEventListener('click',function(){s.dispatchEvent(new Event('input'))})});};
window.initFilterAny=function(){var s=$('#flt');if(!s)return;function run(){var q=s.value.toLowerCase().trim().split(/\s+/).filter(Boolean);$$('.panel.on tr,.panel.on .pc,.panel.on li,.panel.on .tbox').forEach(function(e){if(e.querySelector&&e.querySelector('th'))return;var t=e.textContent.toLowerCase();e.style.display=(!q.length||q.every(function(w){return t.indexOf(w)>-1}))?'':'none'})}
 s.addEventListener('input',run);$$('.tabs button').forEach(function(b){b.addEventListener('click',run)})};
// export / import
window.exportAll=function(){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k.indexOf(KEY)===0)o[k]=localStorage.getItem(k)}
 var b=new Blob([JSON.stringify(o,null,1)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='command-center-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();};
window.importAll=function(f){var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);Object.keys(o).forEach(function(k){if(k.indexOf(KEY)===0)localStorage.setItem(k,o[k])});alert('इम्पोर्ट हो गया। पेज रीलोड हो रहा है।');location.reload()}catch(e){alert('फ़ाइल सही नहीं है')}};r.readAsText(f)};
window.dateHi=function(){var d=new Date();return d.toLocaleDateString('hi-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})};
// links (editable)
window.getLinks=function(){var l=JSON.parse(JSON.stringify(window.LINKS||{}));var o=store.get('links',{});Object.keys(o).forEach(function(k){if(o[k])l[k]=o[k]});return l};
// reminders notifier
setInterval(function(){var r=store.get('reminders',[]),ch=false,now=Date.now();r.forEach(function(x){if(!x.done&&!x.fired&&x.when&&new Date(x.when).getTime()<=now){x.fired=1;ch=true;try{if(window.Notification&&Notification.permission==='granted')new Notification('याद दिलाना',{body:x.text})}catch(e){}if($('#remlist')&&window.renderRem)renderRem()}});if(ch)store.set('reminders',r)},20000);
})();
// reusable collection component
window.mountCollection=function(id,key,cats,o){o=o||{};var el=document.getElementById(id);var cur=cats[0];var q='';
var fields=o.fields||[['t','शीर्षक'],['u','लिंक (https://…)'],['n','नोट']];
function draw(){var D=store.get(key,[]);
var h='<div class="row"><div><label>खोज (सभी श्रेणियों में)</label><input class="cq" value="'+esc(q)+'" placeholder="खोजें…"></div></div><div class="tabs" style="position:static">'+cats.map(function(c){return '<button data-c="'+esc(c)+'" class="'+(c===cur?'on':'')+'">'+esc(c)+' ('+D.filter(function(x){return x.c===c}).length+')</button>'}).join('')+'</div>';
h+='<details class="card"><summary style="cursor:pointer;color:var(--gold2)">➕ नया जोड़ें ('+esc(cur)+')</summary><div class="row">'+fields.map(function(f){return '<div><label>'+f[1]+'</label><input data-f="'+f[0]+'"></div>'}).join('')+'<button class="btn add">सेव</button></div></details>';
var L=D.filter(function(x){return q?JSON.stringify(x).toLowerCase().indexOf(q.toLowerCase())>-1:x.c===cur});
h+=L.map(function(x){var t=x.t||x.u||'(बिना नाम)';var yt=x.u&&String(x.u).match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
return '<div class="item"><div class="vid">'+(yt&&o.thumbs?'<img src="https://img.youtube.com/vi/'+yt[1]+'/mqdefault.jpg" alt="">':'')+'<div>'+(x.u?'<a href="'+esc(x.u)+'" target="_blank" rel="noopener"><b>'+esc(t)+'</b></a>':'<b>'+esc(t)+'</b>')+(q?' <span class="tag">'+esc(x.c)+'</span>':'')+(x.s?' <span class="tag">'+esc(x.s)+'</span>':'')+((x.p!==undefined&&x.p!=='')?' <span class="tag">'+esc(x.p)+'%</span>':'')+(x.amt?' <span class="tag">₹'+esc(x.amt)+'/mo</span>':'')+(x.amt?' <span class="tag">₹'+esc(x.amt)+'/mo</span>':'')+(x.n?'<div style="white-space:pre-wrap;color:var(--mut)">'+esc(x.n)+'</div>':'')+'</div></div><button class="x" data-e="'+x.id+'" title="Edit">✎</button><button class="x" data-d="'+x.id+'">✕</button></div>'}).join('')||'<div class="note">अभी कुछ नहीं जुड़ा</div>';
el.innerHTML=h;
var qi=el.querySelector('.cq');qi.addEventListener('input',function(e){q=e.target.value;var pos=e.target.selectionStart;draw();var n=el.querySelector('.cq');n.focus();n.setSelectionRange(pos,pos)});
Array.prototype.forEach.call(el.querySelectorAll('.tabs button'),function(b){b.onclick=function(){cur=b.dataset.c;q='';draw()}});
var editId=null;el.querySelector('.add').onclick=function(){var x={id:editId||uid(),c:cur},any=false;Array.prototype.forEach.call(el.querySelectorAll('[data-f]'),function(i){x[i.dataset.f]=i.value.trim();if(i.value.trim())any=true});if(!any)return;if(x.u&&!/^https?:/i.test(x.u))x.u='https://'+x.u;var D=store.get(key,[]);if(editId){D=D.map(function(y){return y.id===editId?Object.assign({},y,x,{c:y.c}):y})}else D.unshift(x);store.set(key,D);editId=null;draw()};
Array.prototype.forEach.call(el.querySelectorAll('[data-e]'),function(b){b.onclick=function(){var y=store.get(key,[]).filter(function(z){return z.id===b.dataset.e})[0];if(!y)return;editId=y.id;var d=el.querySelector('details');d.open=true;Array.prototype.forEach.call(el.querySelectorAll('[data-f]'),function(i){i.value=y[i.dataset.f]||''});d.scrollIntoView({block:'center'});el.querySelector('.add').textContent='अपडेट करें'}});
Array.prototype.forEach.call(el.querySelectorAll('[data-d]'),function(b){b.onclick=function(){if(!confirm('हटाएँ?'))return;store.set(key,store.get(key,[]).filter(function(x){return x.id!==b.dataset.d}));draw()}});}
draw();};

// ===== Ticker (3 calm lines) + subject sliders =====
(function(){
var HI=/[ऀ-ॿ]/;
var DEF={l1:'',l2:'',l3:'',l4:'',speed:60,paused:false,hidden:false,topics:''};
function cfg(){var c=store.get('tk',{});var o={};for(var k in DEF)o[k]=(c[k]===undefined?DEF[k]:c[k]);if(!(o.speed>18))o.speed=60;return o}
function kws(s){return String(s||'').split(',').map(function(x){return x.trim().toLowerCase()}).filter(Boolean)}
function hit(it,k){if(!k.length)return true;var t=(it.title+' '+it.src+' '+it.cat).toLowerCase();return k.some(function(w){return t.indexOf(w)>-1})}
function uniq(a){var s={};return a.filter(function(x){if(s[x.link])return false;s[x.link]=1;return true})}
function fmt(n,d){return Number(n).toLocaleString('en-IN',{maximumFractionDigits:d==null?2:d})}
// user topics (Google News search through rss2json; best effort, cached 15 min)
var _extra=[];
function fetchTopics(cb){var c=cfg();var L=String(c.topics||'').split('\n').map(function(x){return x.trim()}).filter(Boolean);if(!L.length)return cb([]);
 var key='vcc_tp',now=Date.now();try{var o=JSON.parse(sessionStorage.getItem(key)||'null');if(o&&o.s===c.topics&&now-o.t<900000)return cb(o.d)}catch(e){}
 var out=[],left=L.length;L.forEach(function(ln){var m=ln.match(/^([1234])\s*[|:]\s*(.+)$/);var line=m?+m[1]:1,q=m?m[2]:ln;var hi=HI.test(q);
  var u='https://news.google.com/rss/search?q='+encodeURIComponent(q)+(hi?'&hl=hi&gl=IN&ceid=IN:hi':'&hl=en-IN&gl=IN&ceid=IN:en');
  fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(u)).then(function(r){return r.json()}).then(function(j){(j.items||[]).slice(0,8).forEach(function(it){out.push({cat:'My topic',src:q,title:it.title,link:it.link,date:'',line:line,k:0})})}).catch(function(){}).then(function(){if(--left===0){try{sessionStorage.setItem(key,JSON.stringify({s:c.topics,t:now,d:out}))}catch(e){}cb(out)}})})}
function rateHTML(){var M=window.MARKET_DATA,rows=(M&&M.rows)||[];
 if(!rows.length)return '<a href="market.html"><b>Rates</b> · Nifty · Sensex · Nasdaq · Dow · Gold · Silver · USD/INR · Crude — live values appear after the GitHub Action runs (see Market page)</a>';
 return rows.map(function(r){var up=r.c>=0;return '<a class="rt" href="https://finance.yahoo.com/quote/'+encodeURIComponent(r.s)+'"><b>'+esc(r.n)+'</b> '+(r.p==null?'—':fmt(r.p))+(r.c==null?'':' <em class="'+(up?'up':'dn')+'">'+(up?'▲':'▼')+Math.abs(r.c).toFixed(2)+'%</em>')+'</a>'}).join('')+(M.updated?'<span class="mut">updated '+esc(M.updated)+'</span>':'')}
function items(a){return a.slice(0,40).map(function(it){return '<a href="'+esc(it.link)+'" target="_blank" rel="noopener"><i>'+esc(it.cat)+'</i>'+esc(it.title)+'</a>'}).join('')}
function build(j,extra,c){var all=((j&&j.items)||[]).concat(extra),pool=uniq(all);
 var k1=kws(c.l1),k2=kws(c.l2),k3=kws(c.l3);
 var n1=pool.filter(function(x){return x.line?x.line===1:(HI.test(x.title)&&/National|Local|Events|LocalGov|Ashrams|Spirit|Science|Economy|Crisis|Spiritual/.test(x.cat))}).filter(function(x){return x.line===1||hit(x,k1)});
 var n2=pool.filter(function(x){return x.line?x.line===2:(!HI.test(x.title)&&/International|Geopolitics|AI|Science|Crisis|Economy/.test(x.cat))}).filter(function(x){return x.line===2||hit(x,k2)});
 var n3=pool.filter(function(x){return x.line?x.line===3:/Markets|Economy/.test(x.cat)}).filter(function(x){return x.line===3||hit(x,k3)});
 var k4=kws(c.l4),n4=pool.filter(function(x){return x.line?x.line===4:/AI|Science|Spirit|Spiritual|Geopolitics|Events/.test(x.cat)}).filter(function(x){return x.line===4||hit(x,k4)});
 if(k1.length)n1=pool.filter(function(x){return HI.test(x.title)&&hit(x,k1)||x.line===1});
 if(k2.length)n2=pool.filter(function(x){return !HI.test(x.title)&&hit(x,k2)||x.line===2});
 if(k3.length)n3=pool.filter(function(x){return hit(x,k3)||x.line===3});
 return [items(n1)||'<span class="mut">No matching Hindi headlines yet…</span>',items(n2)||'<span class="mut">No matching English headlines yet…</span>',rateHTML()+items(n3),items(n4)||'<span class="mut">No matching items yet…</span>']}
function setSpeed(){var c=cfg();Array.prototype.forEach.call(document.querySelectorAll('#tk .in'),function(el){var vp=el.parentNode.clientWidth||600;el.style.setProperty('--vw',vp+'px');var w=el.scrollWidth;el.style.animationDuration=Math.max(12,(w+vp)/Math.max(5,c.speed))+'s'})}
function applyState(init){var c=cfg(),t=$('#tk');if(!t)return;t.classList.toggle('stat',!!(init&&c.paused));t.classList.toggle('paused',!!c.paused);t.classList.toggle('hid',!!c.hidden);$('#tkp').textContent=c.paused?'▶':'⏸';$('#tkp').title=c.paused?'Resume ticker':'Pause ticker';$('#tkh').textContent=c.hidden?'▾':'▴';$('#tkh').title=c.hidden?'Show ticker':'Hide ticker'}
window.mountTicker=function(){var t=$('#tk');if(!t)return;
 t.innerHTML='<div class="lines"><div class="tl"><span class="lb">राष्ट्रीय</span><div class="vp"><div class="in" id="tk1">Loading…</div></div></div><div class="tl"><span class="lb">World</span><div class="vp"><div class="in" id="tk2">Loading…</div></div></div><div class="tl"><span class="lb">Markets</span><div class="vp"><div class="in" id="tk3">Loading…</div></div></div><div class="tl"><span class="lb">AI·Sci·Spirit</span><div class="vp"><div class="in" id="tk4">Loading…</div></div></div></div><div class="ctl"><button id="tkp"></button><button id="tkc" title="Customise ticker">⚙</button><button id="tkh"></button></div><div id="tkpanel" class="pop" hidden></div>';
 applyState(true);
 $('#tkp').onclick=function(){var c=cfg();c.paused=!c.paused;store.set('tk',c);applyState()};
 $('#tkh').onclick=function(){var c=cfg();c.hidden=!c.hidden;store.set('tk',c);applyState()};
 $('#tkc').onclick=function(){var p=$('#tkpanel');if(!p.hidden){p.hidden=true;return}var c=cfg();
  p.innerHTML='<b>Ticker settings</b><label>Speed</label><select id="tks"><option value="30">Slow</option><option value="60">Normal (default)</option><option value="100">Fast</option><option value="160">Very fast</option></select><label>Line 1 – Hindi national: only headlines containing (comma-separated words)</label><input id="tk1k" value="'+esc(c.l1)+'" placeholder="e.g. बलिया, योगी, शिक्षा"><label>Line 2 – World (English)</label><input id="tk2k" value="'+esc(c.l2)+'" placeholder="e.g. India, China, Russia, AI"><label>Line 3 – Markets</label><input id="tk3k" value="'+esc(c.l3)+'" placeholder="e.g. Nifty, gold, crude, RBI"><label>Line 4 – AI, Science &amp; Spiritual</label><input id="tk4k" value="'+esc(c.l4)+'" placeholder="e.g. AI, ISRO, meditation"><label>Extra topics to search live (one per line; start with 1| 2| 3| or 4| to choose the line)</label><textarea id="tkt" rows="3" placeholder="1|बलिया प्रशासन&#10;2|nuclear treaty&#10;3|small cap stocks">'+esc(c.topics)+'</textarea><div style="margin-top:8px"><button class="btn s" id="tksv">Save</button> <button class="btn s g" id="tkrs">Reset</button> <button class="btn s g" id="tkx">Close</button></div><div class="mut" style="font-size:.75rem;margin-top:6px">Tip: leave words empty to see everything. Saved only in this browser.</div>';
  p.hidden=false;$('#tks').value=String(c.speed);
  $('#tkx').onclick=function(){p.hidden=true};
  $('#tkrs').onclick=function(){store.set('tk',{});p.hidden=true;mountTicker()};
  $('#tksv').onclick=function(){store.set('tk',{l1:$('#tk1k').value,l2:$('#tk2k').value,l3:$('#tk3k').value,l4:$('#tk4k').value,speed:+$('#tks').value,paused:cfg().paused,hidden:cfg().hidden,topics:$('#tkt').value});try{sessionStorage.removeItem('vcc_tp')}catch(e){}p.hidden=true;mountTicker()}};
 getNews(function(j){fetchTopics(function(ex){var c=cfg(),b=build(j,ex,c);$('#tk1').innerHTML=b[0];$('#tk2').innerHTML=b[1];$('#tk3').innerHTML=b[2];$('#tk4').innerHTML=b[3];setSpeed();window.addEventListener('resize',setSpeed)})})};
window.loadTicker=window.mountTicker;
// ===== Subject sliders =====
var SUBJ=[['spirit','अध्यात्म और शोध','Spirit'],['events','प्रमुख घटनाएँ','Events'],['science','विज्ञान, स्वास्थ्य और शोध','Science'],['crisis','वैश्विक संकट','Crisis'],['economy','आर्थिक और वित्तीय आँकड़े','Economy'],['ashrams','आश्रम और संत','Ashrams'],['localgov','स्थानीय प्रशासन, अधिकारी और नेता (बलिया/उ.प्र.)','LocalGov'],['exams','परीक्षा और शिक्षा समाचार','Exams']];
window.mountSliders=function(id){var el=document.getElementById(id);if(!el)return;
 getNews(function(j){var all=((j&&j.items)||[]);var S=store.get('sl',{});var CU=store.get('sl_custom',[]);
  var list=SUBJ.map(function(s){return {id:s[0],t:s[1],cat:s[2]}}).concat(CU.map(function(c){return {id:c.id,t:c.t,cat:null,custom:1}}));
  function draw(){var h='<div class="row" style="align-items:center"><div style="flex:1"><b style="color:var(--gold2)">विषय-वार समाचार</b> <span class="mut">— कीवर्ड बदलने के लिए ✎, छिपाने के लिए 👁</span></div><button class="btn s g" id="slnew">+ नया स्लाइडर</button></div>';
   list.forEach(function(s){var st=S[s.id]||{};if(st.hide)return;var k=kws(st.kw||s.kw),it;
    if(k.length)it=uniq(all.filter(function(x){return hit(x,k)}));else it=s.cat?uniq(all.filter(function(x){return x.cat===s.cat})):[];
    it=it.slice(0,20);
    h+='<section class="slw" data-id="'+s.id+'"><div class="slh"><h3>'+esc(s.t)+(k.length?' <span class="tag">'+esc(k.join(', '))+'</span>':'')+'</h3><span><button class="x" data-a="e" title="Edit keywords">✎</button><button class="x" data-a="h" title="Hide">👁</button>'+(s.custom?'<button class="x" data-a="d" title="Delete">✕</button>':'')+'<button class="x" data-a="l">◀</button><button class="x" data-a="r">▶</button></span></div><div class="sl">'+(it.length?it.map(function(x){return '<a class="sc" href="'+esc(x.link)+'" target="_blank" rel="noopener"><span>'+esc(x.title)+'</span><small>'+esc(x.src)+(x.date?' · '+esc(x.date):'')+'</small></a>'}).join(''):'<div class="note" style="min-width:260px">अभी कोई समाचार नहीं (GitHub Action चालू होने पर या कीवर्ड बदलने पर आएँगे)</div>')+'</div></section>'});
   var hidden=list.filter(function(s){return (S[s.id]||{}).hide});if(hidden.length)h+='<div class="mut" style="margin-top:8px">छिपे: '+hidden.map(function(s){return '<a href="#" data-show="'+s.id+'">'+esc(s.t)+'</a>'}).join(' · ')+'</div>';
   el.innerHTML=h;
   $$('.slw .x',el).forEach(function(b){b.onclick=function(){var w=b.closest('.slw'),sid=w.dataset.id,a=b.dataset.a;
    if(a==='l'||a==='r'){w.querySelector('.sl').scrollBy({left:(a==='l'?-1:1)*270,behavior:'smooth'});return}
    if(a==='h'){S[sid]=S[sid]||{};S[sid].hide=1;store.set('sl',S);draw();return}
    if(a==='d'){CU=CU.filter(function(c){return c.id!==sid});list=list.filter(function(s){return s.id!==sid});store.set('sl_custom',CU);draw();return}
    if(a==='e'){var cur=(S[sid]||{}).kw||'';var v=prompt('इस स्लाइडर के कीवर्ड (अल्पविराम से अलग). खाली छोड़ें = डिफ़ॉल्ट',cur);if(v===null)return;S[sid]=S[sid]||{};S[sid].kw=v;store.set('sl',S);draw()}}});
   $$('[data-show]',el).forEach(function(a){a.onclick=function(e){e.preventDefault();S[a.dataset.show].hide=0;store.set('sl',S);draw()}});
   $('#slnew').onclick=function(){var t=prompt('स्लाइडर का नाम (जैसे: मेरे आश्रम)');if(!t)return;var kw=prompt('कीवर्ड (अल्पविराम से), जैसे: आश्रम, महंत, ध्यान');if(!kw)return;var c={id:'c'+uid(),t:t};CU.push(c);S[c.id]={kw:kw};store.set('sl_custom',CU);store.set('sl',S);list.push({id:c.id,t:t,cat:null,custom:1});draw()}}
  draw()})};
})();
