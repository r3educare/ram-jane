# राम जाने (निजी उपयोग की स्थिर वेबसाइट)

## GitHub Pages पर चढ़ाने के चरण
1. github.com पर नया रेपो बनाएँ (नाम जैसे `command-center`, **Public**)।
2. इस पूरे फ़ोल्डर की फ़ाइलें (`.github`, `assets`, `data`, `scripts`, सभी `.html`, `.nojekyll`) रेपो में अपलोड करें (Add file → Upload files)। छिपे फ़ोल्डर `.github` को भी चढ़ाना है।
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / root → Save। कुछ मिनट बाद पता मिलेगा: `https://आपका-नाम.github.io/command-center/`
4. लाइव न्यूज़ के लिए: रेपो के **Actions** टैब में Workflows चालू करें, `news-refresh` चुनकर **Run workflow** दबाएँ। फिर हर ~30 मिनट में अपने-आप ताज़ा होगा (GitHub कभी-कभी देर करता है)।
5. फ़ोन/iPad पर पेज खोलकर "Add to Home Screen" करें।

## सुरक्षा और गोपनीयता
- पासवर्ड, API-कुंजी, खाता-संख्या, ट्रेडिंग-लॉगिन इस साइट में **न** डालें।
- नोट्स/आय/रिमाइंडर केवल आपके ब्राउज़र (localStorage) में रहते हैं; ब्राउज़र का डेटा साफ़ करने पर मिट जाएँगे। इसलिए समय-समय पर "एक्सपोर्ट" से बैकअप रखें।
- साइट खोज-इंजन से छिपाने के लिए `noindex` लगा है, पर पता जानने वाला इसे खोल सकता है।
- `assets/Mahasuchi.pdf` PDF का सार्वजनिक संस्करण है (निजी भाग हटे हैं)।


## नई सुविधाएँ (v4)
- **Ticker (3 पंक्तियाँ):** हिंदी राष्ट्रीय · World (English) · Markets (रेट + समाचार)। ⏸ से रोकें, ⚙ से गति, कीवर्ड और अपने खोज-विषय बदलें (केवल आपके ब्राउज़र में सेव)।
- **बाज़ार-रेट:** `scripts/fetch_news.py` Yahoo Finance से Nifty, Sensex, Midcap, Smallcap, Nasdaq, Dow, Gold, Silver, Crude, USD/INR लाता है (थोड़ी देरी से) और `data/market.js` बनाता है।
- **अपने विषय हमेशा के लिए जोड़ने के लिए** `scripts/topics.txt` में पंक्ति जोड़ें (जैसे `1|बलिया प्रशासन`); Action उन्हें हर 30 मिनट में लाएगा।
- **Daily Log, Files, Family Timeline, Income (Position/Budget/Earning Plans):** सारा डेटा केवल आपके ब्राउज़र में रहता है; Settings से Export/Import करें। Files (PDF) JSON-बैकअप में शामिल नहीं होतीं।


## v3 (राम जाने) — नया क्या है
- साइट का नाम **राम जाने**; ट्रिकर तेज़ (डिफ़ॉल्ट Normal), चौथी पंक्ति (AI·Science·Spirit) जोड़ी गई।
- `pdfs.html` — सभी PDF (as-is): `assets/Mahasuchi.pdf` और `assets/pdf/*.pdf`।
- `theosophy.html`, `people.html` (406 लोग), `sources.html` (71 शोध-स्रोत + शब्दकोश), `map.html` (Site Map)।
- मेन्यू/होम अब श्रेणी-समूहों में। आपके ब्राउज़र का सेव डेटा (नोट्स, आय आदि) वैसा ही चलेगा।

### GitHub Pages पर चढ़ाना
1. इस फ़ोल्डर की सारी फ़ाइलें अपने GitHub repo में डालें (Add file → Upload files)। `.github` और `.nojekyll` भी।
2. Settings → Pages → Branch `main` / root → Save।
3. बड़ी फ़ाइल: `assets/Mahasuchi.pdf` ~9 MB है (सीमा 100 MB से बहुत कम)।
