'use strict';
/* Pfade: alles relativ. Videos, Bilder, PDF liegen im Ordner media/ */
const M = 'media/', W = 2092, H = 1177;
const u = n => M + encodeURIComponent(n);
const $ = (s, r = document) => r.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const S = {de:'Info',dev:'Projektentwicklung',role:'Projektrolle',prob:'Problematik',desc:'Beschreibung',lyr:'Lyrics'};

const L = {
 de:{about:'Über mich',cv:'Lebenslauf herunterladen',legal:'Impressum & Datenschutz',menu:'◀ MENU',scroll:'▼ scrollen für Info',rot:'Bitte drehe dein Gerät ins Querformat.',soon:'Bild folgt',info:'Info',dev:'Projektentwicklung',role:'Projektrolle',prob:'Problematik',desc:'Beschreibung',lyr:'Lyrics',pdf:'Analyse als PDF',lang:'EN'},
 en:{about:'About me',cv:'Download CV',legal:'Legal notice & privacy',menu:'◀ MENU',scroll:'▼ scroll for info',rot:'Please rotate your device to landscape.',soon:'Image coming soon',info:'Info',dev:'Development',role:'Role',prob:'Challenges',desc:'Description',lyr:'Lyrics',pdf:'Analysis (PDF)',lang:'DE'}
};
let lang = 'de';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'de'; } catch (e) {}
const t = k => L[lang][k] || L.de[k] || k;

/* x,y,w,h in Pixeln des Hintergrundbilds (2092x1177). Mit Taste "D" sichtbar machen und nachjustieren. */
const P = [
 {id:'fuchs',k:'poster',r:[311,517,237,323],ch:1,t:'Form Farbe',y:2023,c:['Design','Design'],
  sl:['F3-Fuchsteufelswild.png','F3-Fuchsteufelswild-linien.png','F3-Tiger.png','F3-Tiger-lines.png'],
  s:[['desc','Das Projekt ist im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden. Die Kunst, aus Formen Motive zu erschaffen. Die meisten Illustrationen, Logos und Bilder bestehen tatsächlich aus vielen kleinen, einfachen geometrischen Formen. Zusammen können Muster oder, wie hier, Tierformen nahezu zusammengepuzzelt werden. Viele kleine Teile ergeben ein Ganzes. Meine Ideen bei der Aufgabe basierten auf einem kurzen Sprichwort und einer Wortspielerei.']]},
 {id:'who',k:'poster',r:[617,170,211,290],ch:2,t:'Who am I?',y:2023,c:['Design','Design'],
  g1:['F3-MilleyCyrus.png','2-TheRock.png','Madonna.png'],g2:['F3-MilleyCyrus-plakat.png','2-TheRock+Name.png','Madonna+Name.png'],
  sl:['F3-MilleyCyrus.png','2-TheRock.png','Madonna.png','F3-MilleyCyrus-plakat.png','2-TheRock+Name.png','Madonna+Name.png'],
  s:[['desc','Das Projekt ist im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden, welches ich im Anschluss selbstständig fortgeführt habe. Die Aufgabe war, basierend auf Formen aus der Geometrie eine berühmte Persönlichkeit abzubilden, mit einem „signature move“, anhand dessen man die Persönlichkeit erkennt.']]},
 {id:'coke',k:'poster',r:[1430,262,372,510],ch:3,t:'Coca Cola Zero',y:2024,c:['Rebranding Werbeplakat','Rebranding ad poster'],
  sl:['CocaCola1-Werbeplakat_web.jpg','CocaCola2-Werbeplakat_web.jpg','CocaCola3-Werbeplakat_web.jpg'],doc:'CocaColaPlakatAnalyse_Jeanette_Birkemeyer.pdf',
  s:[['desc','Das Projekt ist ebenfalls im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden. Wir hatten hierbei die freie Auswahl, welche Marke wir rebranden möchten. Die Werbeplakate sollten wir jedoch nicht bloß illustrieren, sondern mit einem selbst geschossenen Foto als Basis arbeiten. Hierfür habe ich mir erst ein altes, typisches Plakat von Coca Cola Zero herausgesucht und anhand von Bildaufbau und Bildausschnitt, Typografie und Farbgebung analysiert. Daraufhin habe ich die Informationen für meine Ideenfindung berücksichtigt und am Ende ebenfalls eine Analyse durchgeführt.'],['',' Konzeptarbeit im Rahmen eines Uni-Kurses, keine offizielle Kampagne von Coca-Cola.']]},
 {id:'hair',k:'tv',r:[722,550,166,245],ch:4,t:'The hair square',y:2025,c:['3D Animation','3D animation'],v:'Birkemeyer_Jeanette_SquareHair_Blender_web.mp4',
  g2:['SquareWegIdee.jpg','image5.jpg','image4.png','image3.png'],
  s:[['de','Im Rahmen des Uni-Kurses BK5 – Transmediale Gestaltung war die Semesterabgabe eine 20-sekündige Animation. Nach ein paar Wochen waren die Grundlagen in Blender erlernt und uns stand es frei, damit zu machen, was wir wollen.'],
     ['dev','Die Idee mit dem Würfel voller Haare entwickelte sich durch mein fehlendes Wissen darin, komplexe Bewegungsabläufe einer Figur darzustellen. Da ein Würfel nur von Seite zu Seite kippt, konnte ich dadurch sehr einfach Bewegung reinbringen und verschiedene Gesichtsausdrücke einbauen, je nach Handlungsablauf.'],
     ['prob','Nach wochenlanger Arbeit kam das Projekt sehr schön zusammen, trotz vieler Momente der Verzweiflung. Mein Mac scheint nicht dafür gemacht zu sein, auch nur die Materialien zu öffnen, und bestrafte mich jedes Mal mit dem Systemabsturz. Glücklicherweise konnte ich die Uni-Rechner nutzen und schließlich auch dort, einen Tag lang, einmal mit Eevee und einmal mit Cycles mein Projekt rendern.']]},
 {id:'watch',k:'tv',r:[976,442,150,116],ch:5,t:'Rauch mal',y:2024,c:['Apple Watch App','Apple Watch app'],v:'Engel & Teufel Watch App -Prototype Video_web.mp4',
  g2:['RauchMal_Screens.png','TeufelGanzkörper.gif','EngelGanzkörper.gif'],
  s:[['de','In dem Kurs BK6 – Audiovisuelle Gestaltung haben wir Informationsarchitekturen kennengelernt und sollten schließlich auch in Zweierteams eine eigene Apple Watch App gestalten. Die Voraussetzungen waren ein Fokus auf Mobilität, Agilität, Interaktion und Sensoren. Es sollte ein radikal mutiges Design sein, das Vernetzungsmöglichkeiten mit dem Browser oder dem iPhone bot.'],
     ['dev','Erst haben Stella und ich jeweils Ideen für Apps gesammelt und sie uns gegenseitig vorgestellt. Durch gemeinsames Spinnen sind dann zwei Ideen entstanden, von denen eine die „Rauch mal“-App war. Wir haben uns gefragt: Was würde nie in einem App Store landen? Eine App, die das Rauchen fördert, aber auch davon abhalten kann. Und somit war die Idee des Engels und des Teufels geboren.'],
     ['role','Wir haben die Idee, das Konzept und den Aufbau gemeinsam entwickelt. Beim Screendesign haben wir die Aufgaben aufgeteilt. Während ich die Animationen des Engels und Teufels gemacht habe, hat Stella die Statistiken sowie den interaktiven Rückblick gestaltet.'],
     ['prob','Uns fiel es anfänglich schwer, eine Idee zu finden, da wir uns beide mit dem Thema Apple Watch Apps noch nie zuvor befasst hatten. Unser Professor ermutigte uns, weiterzudenken und die Interaktionsmöglichkeiten tiefer zu betrachten.']]},
 {id:'shadows',k:'tv',r:[955,620,258,200],ch:6,t:'Dancing with shadows',y:2024,c:['Lyric Video','Lyric video'],v:'Dancing with Shadows - Lyric Video_web.mp4',
  g2:['Storyboard weiß.png'],
  s:[['de','In dem Kurs Motion Design war die Semesterabgabe ein Lyric Video, welches mit Hilfe von After Effects zu einem selbst gewählten oder auch selbst erstellten Song animiert werden sollte.'],
     ['dev','Bei Suno AI habe ich mir einen Song erstellt und anhand der Lyrics ein Storyboard erstellt. Verse für Verse habe ich meine Vorstellungen umgesetzt und bin dabei zwischen Frame-by-Frame-Zeichnungen auf dem iPad, Illustrator-Dateien und Photoshop-Bearbeitungen hin und her gesprungen, bis sich alles wie ein Puzzle zusammengesetzt hat.'],
     ['prob','After Effects hat viele tolle Funktionen und das Arbeiten in dem Programm hat mir schnell Spaß gemacht. Das Einzige, was ich mir zu dem Zeitpunkt gewünscht hätte, wäre ein Monitor, auf dem ich das Bild richtig sehen kann. Denn durch die vielen Einstellungsfenster und die immer länger wachsende Timeline wurde der Platz für das Video immer kleiner und somit meine Arbeitsfläche immer schwerer zu erkennen.'],
     ['lyr','[Verse]\nWoke up to the same old gray day\nMonotonous drone no light no way\nLifeless routine drains my soul\nSearching for spark to make me whole\n\n[Verse 2]\nEyes shut tight but I still see\nPainted colors dreams so free\nFingers bleed on the cold strings\nMelody forms my heart it sings\n\n[Chorus]\nDancing with shadows colors anew\nFound my escape where art\'s true\nBrushstrokes of fire burning bright\nChase my own sun through the night\n\n[Bridge]\nTruth in the chaos raw and loud\nArt makes life free from the shroud\nPurpose I find deep in the grind\nCreation heals this fractured mind']]},
 {id:'crowded',k:'tv',r:[697,876,250,196],ch:7,t:'Crowded',y:2026,c:['Expanded Animation','Expanded animation'],v:'Crowded - Expanded Animation_web.mp4',
  g2:['StoryboardEA.jpg','Person.png','Moodboard.jpg'],
  s:[['de','Die Vorgabe war, eine Leinwand an der Wand und eine auf dem Boden gemeinsam zu bespielen und eine Interaktion einzubauen. Dafür konnten wir entweder Menschen auf der Bodenleinwand tracken oder mit einem Sensor arbeiten, der Bewegungen vor der Leinwand weitergibt.'],
     ['dev','Zu Beginn durchforstete jeder das Internet nach inspirierenden Projekten, um sich verschiedene Umsetzungsmöglichkeiten vorzustellen. Danach präsentierte jeder eine Projektidee und einen Stil, anhand derer sich vorzugsweise Zweierteams zusammenfinden sollten.\nMeine Idee war es, eine soziale Angststörung darzustellen: ein Blick in den Kopf, hinter das innere Auge. Dort beginnt die Storyline mit einer Wiese, die dafür steht, dass alles gut ist. Die Protagonistin wächst aus einer Blume, läuft, fällt und der Blick hinter das innere Auge folgt. Sobald in der Szene drei oder mehr Menschen die Bodenfläche betreten, wird diese Ruhe von einer Panikattacke unterbrochen. Verlassen die Menschen die Bodenplatte wieder, wird alles weiß. Silhouetten an der Wand und Füße auf dem Boden erscheinen: Menschen, die versuchen, der Protagonistin zu helfen, und deren Stimmen sie in diesem Moment wahrnimmt. Danach sieht man ihre Augen und hört ihre Gedanken, während sie versucht, sich zu beruhigen. Gelingt das, kehrt die Wiese zurück.\nNach der Teambildung verlief die Arbeit in Eigenarbeit. Am Semesterende wurde das Ganze in einem abgedunkelten Raum präsentiert.'],
     ['role','Ich habe die Idee entwickelt, die Animationen erstellt und das Voiceover eingesprochen. Mein Teampartner war für die Zusammenführung der Animationen in TouchDesigner und das Tracking der Menschen auf der Bodenleinwand verantwortlich. Sobald drei oder mehr Personen die Bodenfläche betraten, löste das Tracking die Panikattacke aus.'],
     ['prob','Da wir uns vorher nicht kannten, wussten mein Teampartner und ich noch nicht, dass wir sehr unterschiedliche Arbeitsweisen hatten, die nicht immer gut zusammenpassten. Dadurch kosteten viele Prozesse deutlich mehr Zeit als geplant, und ein großer Teil der Arbeit lag bei mir. Unser Professor hatte mir geraten, für die Zwischenframes eine KI zu verwenden, da meine Idee recht aufwändig war. Das Ausprobieren und Recherchieren der verschiedenen KIs kostete jedoch viel Zeit, Enttäuschung und am Ende auch Geld. Für einen selbstgemalten Stil waren sie wohl noch nicht weit genug entwickelt, sodass ich fast alles frame by frame zeichnen musste. Das wäre kein Problem gewesen, wenn nicht schon durch die Abstimmung im Team so viel Zeit verloren gegangen wäre.']]},
 {id:'adhd',k:'tv',r:[1082,890,215,165],ch:8,t:'ADHD',y:2023,c:['2D Animation','2D animation'],v:'ADHD_Animation_web.mp4',
  g2:['Skizze1.jpg','Skizze2.jpg','Skizze3.jpg','Skizze4.jpg','Skizze5.jpg'],
  s:[['de','Dieses Video entstand in der ersten Projektwoche an der HMKW. Die Aufgabe war, in Gruppen jeweils ein Erklärvideo zu einem psychischen Krankheitsbild zu erstellen.'],
     ['dev','Die Professorin hat uns nach unseren Stilen und Darstellungspräferenzen aufgeteilt und wir durften dann entscheiden, welche Krankheit wir bearbeiten möchten. Gemeinsam haben wir uns für eine Storyline entschieden und anschließend die Aufgaben verteilt. Da Indira Erfahrung mit Stop Motion hat und gerne Figuren selber modelliert, haben wir uns schnell für unseren Protagonisten entschieden. Der Rest der Gruppe war verantwortlich für die Hintergrundanimation. Hierbei hat jeder ein anderes Skillset mitgebracht und daher wollten wir unsere Stile auch einfach miteinander verbinden, was durch die anfängliche Gruppenaufteilung sehr harmonisch verlief. Das Ganze wurde zusammengeschnitten und im Anschluss gemeinsam präsentiert.'],
     ['role','Meine Rolle war es, einige der Hintergründe mit Procreate zu erstellen (siehe Bilder) und zu animieren, sowie die Präsentation passend dazu aufzubereiten. Im Allgemeinen haben wir uns allerdings auch gegenseitig viel geholfen und unterstützt.'],
     ['prob','In dieser Gruppenarbeit gab es meines Wissens keine Probleme, die nicht schnell gelöst werden konnten. Dabei ging es maximal um Schwierigkeiten mit Programmen und deren Bedienung, wobei sich durch die gegenseitige Unterstützung schnell Lösungen gefunden haben.']]}
];
// Hinweis: In s steht der Schlüssel "de" für den Abschnitt "Info".
P.forEach(p => p.s.forEach(x => { if (x[0] === 'de') x[0] = 'info'; }));

/* ---------- Ton (ohne Dateien, per WebAudio) ---------- */
let ac;
function snd(kind) {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const n = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = 'square'; o.frequency.value = kind === 'on' ? 90 : 1800;
    g.gain.setValueAtTime(kind === 'on' ? .12 : .05, n); g.gain.exponentialRampToValueAtTime(.001, n + (kind === 'on' ? .5 : .05));
    o.connect(g).connect(ac.destination); o.start(n); o.stop(n + .5);
    if (kind === 'on') {
      const b = ac.createBuffer(1, ac.sampleRate * .35, ac.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) * .18;
      const s = ac.createBufferSource(); s.buffer = b; s.connect(ac.destination); s.start(n);
    }
  } catch (e) {}
}

/* ---------- Bühne ---------- */
const stage = $('#stage'), osd = $('#osd'), remote = $('#remote'), rm = $('#rm');
let last = null;
P.forEach(p => {
  const b = document.createElement('button');
  b.className = 'hs ' + p.k; b.type = 'button'; p.el = b;
  b.style.cssText = `left:${p.r[0] / W * 100}%;top:${p.r[1] / H * 100}%;width:${p.r[2] / W * 100}%;height:${p.r[3] / H * 100}%`;
  if (p.v) {
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.src = u(p.v); b.append(v);
  }
  b.onclick = () => openP(p);
  b.onpointerenter = () => { osd.textContent = 'CH ' + String(p.ch).padStart(2, '0') + ' ▶ ' + p.t; osd.classList.add('on'); };
  b.onpointerleave = () => osd.classList.remove('on');
  stage.append(b);
});

/* ---------- Fernbedienung als Cursor (nur Maus) ---------- */
let mx = 0, my = 0, raf = 0;
addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  document.body.classList.add('rc'); mx = e.clientX; my = e.clientY;
  if (!raf) raf = requestAnimationFrame(() => {
    raf = 0;
    remote.style.transform = `translate3d(${mx}px,${my}px,0)`;
    osd.style.transform = `translate3d(${mx + 40}px,${my + 34}px,0)`;
  });
}, {passive: true});
addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  snd('click'); rm.classList.add('press'); remote.classList.remove('ir'); void remote.offsetWidth; remote.classList.add('ir');
});
addEventListener('pointerup', () => rm.classList.remove('press'));
document.addEventListener('mouseleave', () => document.body.classList.remove('rc'));
const img = new Image();
img.onload = () => { rm.classList.remove('css'); rm.style.backgroundImage = `url(${M}remote-cursor.png)`; };
img.src = M + 'remote-cursor.png';

/* ---------- Projekt-Ansicht (Retro-TV) ---------- */
const view = $('#view'), sc = $('.sc', view), tv = $('.tv', view), screen = $('.screen', view), ctl = $('.ctl', view), panel = $('#panel');
let cur = null, idx = 0;
const gal = (a, ) => a ? `<div class="gal">${a.map(n => `<img src="${u(n)}" alt="" loading="lazy" onerror="this.outerHTML='<div class=ph>${t('soon')}</div>'">`).join('')}</div>` : '';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function fill(p) {
  const secs = p.s.map(([k, x]) => k ? `<h3>${t(k)}</h3>${k === 'lyr' ? `<pre>${esc(x)}</pre>` : `<p>${esc(x)}</p>`}` : `<p class="nt">${esc(x)}</p>`).join('');
  panel.innerHTML = `<div class="tab"><span>${p.t} · ${p.y}</span><span>${t('scroll')}</span></div>
  <div class="bd"><div class="meta">CH ${String(p.ch).padStart(2, '0')} · ${p.y} · ${p.c[lang === 'en' ? 1 : 0]}</div><h2>${esc(p.t)}</h2>
  ${gal(p.g1)}${secs}${p.doc ? `<p><a class="key ac" href="${u(p.doc)}" target="_blank" rel="noopener">${t('pdf')}</a></p>` : ''}${gal(p.g2)}</div>`;
  if (lang === 'en') panel.querySelector('.bd').insertAdjacentHTML('afterbegin', '<p class="nt">Project texts are currently available in German.</p>');
}
function show(p, i) {
  idx = (i + p.sl.length) % p.sl.length;
  const im = new Image(); im.alt = p.t; im.src = u(p.sl[idx]); im.onerror = () => { screen.innerHTML = `<div class="ph" style="height:100%">${t('soon')}</div>`; };
  screen.replaceChildren(im); const c = $('i', ctl); if (c) c.textContent = `${idx + 1}/${p.sl.length}`;
}
function openP(p) {
  snd('on'); cur = p; document.body.classList.add('open');
  ctl.innerHTML = '';
  if (p.sl) {
    ctl.innerHTML = `<i></i><button class="key" data-d="-1">◀</button><button class="key" data-d="1">▶</button>`;
    show(p, 0);
  } else {
    const v = document.createElement('video'); v.src = u(p.v); v.playsInline = true; v.controls = true; v.preload = 'auto'; v.setAttribute('playsinline', '');
    screen.replaceChildren(v); ctl.innerHTML = `<i>CH ${String(p.ch).padStart(2, '0')} ▶ PLAY</i>`;
    // Klick = Nutzergeste, daher darf das Video mit Ton starten
    const go = () => v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
    setTimeout(go, RM ? 0 : 450);
  }
  fill(p); view.hidden = false; sc.scrollTop = 0; setP(0);
  const r = p.el.getBoundingClientRect(), b = tv.getBoundingClientRect();
  if (!RM) {
    const s = r.width / b.width;
    tv.animate([{transform: `translate(${r.left + r.width / 2 - b.left - b.width / 2}px,${r.top + r.height / 2 - b.top - b.height / 2}px) scale(${s})`, opacity: .6}, {transform: 'none', opacity: 1}], {duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)'});
    screen.animate([{transform: 'scale(0,.004)', filter: 'brightness(10)', offset: 0}, {transform: 'scale(1,.004)', filter: 'brightness(10)', offset: .35}, {transform: 'scale(1,1)', filter: 'brightness(2.4)', offset: .75}, {transform: 'scale(1,1)', filter: 'brightness(1)'}], {duration: 650, delay: 350, easing: 'ease-out', fill: 'backwards'});
  }
  last = document.activeElement; sc.focus({preventScroll: true});
  stage.querySelectorAll('video').forEach(v => v.pause());
}
function closeP() {
  if (!cur) return;
  const v = $('video', screen); if (v) v.pause();
  const done = () => { view.hidden = true; screen.replaceChildren(); document.body.classList.remove('open'); stage.querySelectorAll('video').forEach(v => v.play().catch(() => {})); cur = null; if (last) last.focus({preventScroll: true}); };
  RM ? done() : screen.animate([{transform: 'scale(1,1)'}, {transform: 'scale(1,.004)', filter: 'brightness(8)', offset: .6}, {transform: 'scale(0,.004)', filter: 'brightness(8)'}], {duration: 350, easing: 'ease-in'}).onfinish = done;
}
function setP(p) { view.style.setProperty('--p', p); panel.classList.toggle('full', p > .98); }
sc.addEventListener('scroll', () => setP(Math.min(1, sc.scrollTop / (innerHeight * .6))), {passive: true});
ctl.addEventListener('click', e => { const d = e.target.closest('[data-d]'); if (d && cur) { snd('click'); show(cur, idx + +d.dataset.d); } });
$('#x').onclick = closeP;

/* ---------- Über mich & Impressum ---------- */
const about = $('#about'), legal = $('#legal');
function aboutHTML() {
  return `<div class="frame">${lang === 'en' ? 'Photo coming soon' : 'Foto folgt<br>(Bilderrahmen an der Wand)'}</div>
  <div><h2>${t('about')}</h2>
  <p>Ich bin 2002 in der Nähe von Hamburg geboren und dort in einer 6-köpfigen Familie aufgewachsen. Als Kind durfte ich schon früh meine Interessen verfolgen und mich ausprobieren. Jede Erfahrung hat mir etwas Neues gezeigt, auch dass ich kein Judo-Meister werde und keine talentierte Klavierspielerin bin. Dafür hat sich schnell gezeigt, dass Malen, Basteln und Kunst machen ein kleines Feuerwerk in meinem Kopf auslösen, und das hat sich bis heute nicht geändert.</p>
  <p>Ich male und bastle immer noch am liebsten den ganzen Tag. Nur ist es jetzt das Zeichnen von Tattoo-Motiven, das Designen vorm Bildschirm und das Basteln im Alltag, um tägliche Gegenstände und Routinen mit einer Prise Spaß und Ästhetik zu versüßen.</p>
  <p>Nach dem Abi im Kunstprofil habe ich mir einen kleinen Van ausgebaut und bin damit 8 Monate durch Europa gedüst. Danach gab es nur eine Stadt für mich: Berlin. Dort studiere ich seit 2023, erst an der HMKW im Dualen Studium mit team red, jetzt an der HTW.</p>
  <p>Neben dem Studium habe ich mich selbstständig gemacht mit Tätowieren, Merch verkaufen, Fotografieren, Grafikdesign und und und. Bis heute erfüllt mich der abwechslungsreiche Alltag, die Selbstorganisation und die Möglichkeit, immer wieder etwas Neues zu lernen, Menschen kennenzulernen und daran zu wachsen.</p>
  <p>Jetzt ist es Zeit für die nächste Entscheidung. Was will ich nach dem Studium machen? Das, was mich schon immer in den Bann gezogen hat. Schon als Kind haben mich die fabelhaften Welten von Disney verzaubert, und heute ist es jedes animierte Video, bei dem ich mich frage, wie zur Hölle das gemacht worden ist. Animation. Wo genau es mich hinverschlagen wird, zeigt sich noch. Aber eins ist sicher: Meine Finger kribbeln und ich suche ein Praktikum in der Animation, für mein nächstes Abenteuer.</p>
  <h3>Tools</h3><p>Blender · After Effects · Illustrator · Photoshop · Procreate · TouchDesigner</p>
  <h3>Uni</h3><p>HMKW Berlin (Duales Studium mit team red) · HTW Berlin</p>
  <p class="nt">Weitere Stationen und Skills folgen aus dem Lebenslauf.</p>
  <p><a class="key ac" href="media/CV_Jeanette_Birkemeyer_2026.pdf" download="Lebenslauf_Jeanette_Birkemeyer.pdf">${t('cv')}</a></p></div>`;
}
function legalHTML() {
  return `<div><h2>Impressum</h2><p>Angaben gemäß § 5 DDG<br>Jeanette Birkemeyer<br>Viktoria-Luise-Platz 12A<br>10777 Berlin</p><p>Kontakt: <a href="mailto:jeanettebirkemeyer@gmail.com" style="color:var(--ac)">jeanettebirkemeyer@gmail.com</a></p>
  <h2 style="margin-top:34px">Datenschutz</h2>
  <p>Diese Seite ist statisch und setzt keine Cookies. Es werden keine Analyse- oder Tracking-Dienste und keine externen Schriftarten geladen. Die Spracheinstellung wird lokal in deinem Browser gespeichert (localStorage) und nicht übertragen. Gehostet wird die Seite bei GitHub Pages (GitHub Inc.), dabei werden technisch bedingt Server-Logdaten (z. B. IP-Adresse) verarbeitet.</p>
  <p class="nt">Platzhaltertext: Bitte vor der Veröffentlichung prüfen (z. B. über die Angebote von IHK oder Verbraucherzentrale) und bei Bedarf ergänzen.</p>
  <h3>Credits</h3><p>3D-Modell der Fernbedienung (Grundlage des Cursors): Emmanuel PUYBARET / eTeks und Scopia Visual Interfaces Systems, s.l., Lizenz CC BY 3.0.</p></div>`;
}
function openOv(o, html) {
  snd('on'); $('.in', o).innerHTML = html(); o.hidden = false; o.scrollTop = 0; document.body.classList.add('open');
  if (!RM) o.animate([{transform: 'scale(1,.004)', filter: 'brightness(8)', offset: 0}, {transform: 'scale(1,1)', filter: 'brightness(2)', offset: .7}, {filter: 'brightness(1)'}], {duration: 500, easing: 'ease-out'});
}
function closeOv(o) { o.hidden = true; document.body.classList.remove('open'); }
$('#bAbout').onclick = () => openOv(about, aboutHTML);
$('#bLegal').onclick = () => openOv(legal, legalHTML);
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => { closeOv(about); closeOv(legal); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeP(); closeOv(about); closeOv(legal); }
  else if (cur && cur.sl && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) show(cur, idx + (e.key === 'ArrowRight' ? 1 : -1));
  else if (e.key.toLowerCase() === 'd' && !cur && about.hidden && legal.hidden) document.body.classList.toggle('dbg');
});

/* ---------- Sprache ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
  $('#bLang').textContent = t('lang'); $('#rotT').textContent = t('rot'); $('#x').textContent = t('menu');
  if (cur) fill(cur); if (!about.hidden) $('.in', about).innerHTML = aboutHTML();
}
$('#bLang').onclick = () => { lang = lang === 'de' ? 'en' : 'de'; try { localStorage.setItem('lang', lang); } catch (e) {} applyLang(); };
applyLang();
