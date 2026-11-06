#!/usr/bin/env python3
"""RSS खींचकर data/news.json बनाता है (GitHub Actions से चलता है; किसी कुंजी की ज़रूरत नहीं)."""
import json, re, sys, urllib.request, urllib.parse, xml.etree.ElementTree as ET, html, email.utils, datetime, os
G='https://news.google.com/rss/search?hl=hi&gl=IN&ceid=IN:hi&q='
G_EN='https://news.google.com/rss/search?hl=en-IN&gl=IN&ceid=IN:en&q='
FEEDS=[
('Markets','Moneycontrol','https://www.moneycontrol.com/rss/marketreports.xml'),
('Markets','Economic Times','https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms'),
('Markets','Mint','https://www.livemint.com/rss/markets'),
('Markets','Business Standard','https://www.business-standard.com/rss/markets-106.rss'),
('National','The Hindu','https://www.thehindu.com/news/national/feeder/default.rss'),
('National','Indian Express','https://indianexpress.com/section/india/feed/'),
('National','BBC हिंदी','https://feeds.bbci.co.uk/hindi/rss.xml'),
('National','Google News: India',G_EN+'India+politics'),
('Local','Google News: बलिया',G+'बलिया'),
('Local','Google News: बैरिया',G+'बैरिया+बलिया'),
('Local','Google News: उत्तर प्रदेश',G+'उत्तर+प्रदेश'),
('Local','Google News: बिहार',G+'बिहार'),
('AI','TechCrunch AI','https://techcrunch.com/category/artificial-intelligence/feed/'),
('AI','MIT Tech Review','https://www.technologyreview.com/feed/'),
('AI','Google News: AI',G_EN+'artificial+intelligence'),
('Geopolitics','Google News: US-Russia-China-India',G_EN+'India+China+Russia+US+geopolitics'),
('Geopolitics','Al Jazeera','https://www.aljazeera.com/xml/rss/all.xml'),
('Spirit','Google News: अध्यात्म',G+'अध्यात्म+ध्यान+चेतना+शोध'),
('Spirit','Google News: Consciousness',G_EN+'consciousness+research+meditation+neuroscience'),
('Events','Google News: प्रमुख खबरें','https://news.google.com/rss?hl=hi&gl=IN&ceid=IN:hi'),
('Events','Google News: देश-विदेश',G+'देश+विदेश+प्रमुख+घटनाक्रम'),
('Science','Google News: स्वास्थ्य शोध',G+'स्वास्थ्य+वैज्ञानिक+शोध+अध्ययन'),
('Science','Google News: विज्ञान',G+'विज्ञान+खोज+अनुसंधान'),
('Science','Google News: Health research',G_EN+'new+study+health+science+breakthrough'),
('Crisis','Google News: वैश्विक संकट',G+'वैश्विक+संकट+युद्ध+अकाल+महामारी'),
('Crisis','Google News: Humanitarian',G_EN+'humanitarian+crisis+famine+war+refugees'),
('Economy','Google News: अर्थव्यवस्था',G+'अर्थव्यवस्था+जीडीपी+महंगाई+आंकड़े'),
('Economy','Google News: India economy',G_EN+'India+economy+GDP+inflation+data'),
('Ashrams','Google News: आश्रम',G+'आश्रम+संत+महंत'),
('Ashrams','Google News: ध्यान-योग',G+'योग+ध्यान+साधना+शिविर'),
('LocalGov','Google News: बलिया प्रशासन',G+'बलिया+जिलाधिकारी+प्रशासन'),
('LocalGov','Google News: बलिया नेता',G+'बलिया+विधायक+सांसद'),
('LocalGov','Google News: उ.प्र. अधिकारी',G+'उत्तर+प्रदेश+अधिकारी+तबादला+सरकार'),
('Exams','Google News: परीक्षा',G+'JEE+NEET+परीक्षा+तारीख'),
('Exams','Google News: Exams',G_EN+'JEE+Main+NEET+exam+date+NTA'),
('Exams','Google News: बोर्ड',G+'बोर्ड+परीक्षा+रिज़ल्ट+डेट+शीट'),
('Spiritual','Google News: आश्रम',G+'आश्रम'),
('Spiritual','Google News: Meditation',G_EN+'meditation+ashram'),
('International','BBC World','https://feeds.bbci.co.uk/news/world/rss.xml'),
('International','DW','https://rss.dw.com/xml/rss-en-world'),
('International','Google News: World',G_EN+'world+news'),
]
if os.path.exists('scripts/topics.txt'):
    for ln in open('scripts/topics.txt',encoding='utf-8'):
        ln=ln.strip()
        if not ln or ln.startswith('#'): continue
        m=re.match(r'^([123])\s*[|:]\s*(.+)$',ln); line=int(m.group(1)) if m else 1; q=m.group(2) if m else ln
        hi=bool(re.search('[\u0900-\u097F]',q))
        FEEDS.append(('My topic:%d'%line,'Topic: '+q,(G if hi else G_EN)+q.replace(' ','+')))
def get(u):
    req=urllib.request.Request(u.replace(' ','+'),headers={'User-Agent':'Mozilla/5.0 (personal-news-reader)'})
    with urllib.request.urlopen(req,timeout=25) as r: return r.read()
def parse(data):
    root=ET.fromstring(data); out=[]
    for it in root.iter('item'):
        t=(it.findtext('title') or '').strip(); l=(it.findtext('link') or '').strip(); d=it.findtext('pubDate') or ''
        try: ts=email.utils.parsedate_to_datetime(d); key=ts.timestamp(); ds=ts.astimezone(datetime.timezone(datetime.timedelta(hours=5,minutes=30))).strftime('%d %b %H:%M')
        except Exception: key=0; ds=''
        if t and l: out.append((key,html.unescape(re.sub('<[^>]+>','',t)),l,ds))
    return out
old={}
if os.path.exists('data/news.json'):
    try: old=json.load(open('data/news.json'))
    except Exception: old={}
prev=old.get('items',[]) if isinstance(old,dict) else []
items=[];ok=set()
for cat,src,u in FEEDS:
    try:
        for key,t,l,ds in sorted(parse(get(u)),reverse=True)[:15]:
            items.append({'cat':cat,'src':src,'title':t,'link':l,'date':ds,'k':key}); ok.add(src)
    except Exception as e:
        print('FAIL',src,e,file=sys.stderr)
        items+= [x for x in prev if x.get('src')==src]
for x in items:
    m=re.match(r'My topic:(\d)',x['cat'])
    if m: x['cat']='My topic'; x['line']=int(m.group(1))
items.sort(key=lambda x:-x.get('k',0))
cnt={};cap=[]
for x in items:
    cnt[x['cat']]=cnt.get(x['cat'],0)+1
    if cnt[x['cat']]<=45: cap.append(x)
items=cap
ist=datetime.datetime.utcnow()+datetime.timedelta(hours=5,minutes=30)
data={'updated':ist.strftime('%d-%m-%Y %H:%M IST'),'items':items[:1200]}
json.dump(data,open('data/news.json','w'),ensure_ascii=False)
open('data/news.js','w').write('window.NEWS_DATA='+json.dumps(data,ensure_ascii=False)+';')
print('feeds ok:',len(ok),'items:',len(items))

# ---- market rates (Yahoo Finance public chart endpoint; delayed; best effort) ----
SYMS=[('Nifty 50','^NSEI'),('Sensex','^BSESN'),('Bank Nifty','^NSEBANK'),('Nifty Midcap 50','^NSEMDCP50'),('Nifty Smallcap','^CNXSC'),('Nasdaq','^IXIC'),('Dow Jones','^DJI'),('S&P 500','^GSPC'),('Gold $/oz','GC=F'),('Silver $/oz','SI=F'),('Crude WTI','CL=F'),('Brent','BZ=F'),('USD/INR','INR=X'),('Dollar Index','DX-Y.NYB'),('India VIX','^INDIAVIX')]
rows=[]
for n,sym in SYMS:
    try:
        u='https://query1.finance.yahoo.com/v8/finance/chart/%s?range=5d&interval=1d'%urllib.parse.quote(sym)
        j=json.loads(get(u)); m=j['chart']['result'][0]['meta']
        p=m.get('regularMarketPrice'); pc=m.get('chartPreviousClose') or m.get('previousClose')
        rows.append({'n':n,'s':sym,'p':p,'c':(round((p-pc)/pc*100,2) if p and pc else None)})
    except Exception as e:
        print('MKT FAIL',sym,e,file=sys.stderr)
if rows:
    md={'updated':ist.strftime('%d %b %H:%M IST'),'rows':rows}
    open('data/market.json','w').write(json.dumps(md,ensure_ascii=False))
    open('data/market.js','w').write('window.MARKET_DATA='+json.dumps(md,ensure_ascii=False)+';')
print('market rows:',len(rows))
