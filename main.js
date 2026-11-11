'use strict';
/* Alle Pfade relativ. Bilder: media/img (WebP), Videos: media/video, Loops: media/loop */
const W = 2092, H = 1177;
const IMG = 'media/img/', VID = 'media/video/', LOOP = 'media/loop/';
const im = (n, thumb) => IMG + encodeURIComponent(n + (thumb ? '_t' : '') + '.webp');
const $ = (s, r = document) => r.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;

const L = {
 de:{about:'Über mich',cv:'Lebenslauf herunterladen',legal:'Impressum & Datenschutz',menu:'Menü',scroll:'▼ scrollen für Info',rot:'Bitte drehe dein Gerät ins Querformat.',soon:'Bild folgt',info:'Info',dev:'Projektentwicklung',role:'Projektrolle',prob:'Problematik',desc:'Beschreibung',lyr:'Lyrics',pdf:'Analyse als PDF',lang:'EN',photo:'Foto folgt',play:'Abspielen',pause:'Pause',stop:'Stopp',rew:'10 Sekunden zurück',ff:'10 Sekunden vor',sound:'Ton an/aus',full:'Vollbild',prev:'Vorheriges Bild',next:'Nächstes Bild',close:'Schließen',open:'öffnen',img:'Bild',big:'groß anzeigen',pos:'Position',view:'Bildansicht',credit:'3D-Modell Fernbedienung: E. Puybaret / eTeks & Scopia, CC BY 3.0',stageAlt:'Vintage-Fernseher und Poster an einer Betonwand'},
 en:{about:'About me',cv:'Download CV',legal:'Legal notice & privacy',menu:'Menu',scroll:'▼ scroll for info',rot:'Please rotate your device to landscape.',soon:'Image coming soon',info:'Info',dev:'Development',role:'My role',prob:'Challenges',desc:'Description',lyr:'Lyrics',pdf:'Analysis (PDF)',lang:'DE',photo:'Photo coming soon',play:'Play',pause:'Pause',stop:'Stop',rew:'Back 10 seconds',ff:'Forward 10 seconds',sound:'Sound on/off',full:'Fullscreen',prev:'Previous image',next:'Next image',close:'Close',open:'open',img:'Image',big:'show large',pos:'Position',view:'Image view',credit:'3D model of the remote: E. Puybaret / eTeks & Scopia, CC BY 3.0',stageAlt:'Vintage TVs and posters on a concrete wall'}
};
/* Retro-Icons (Windows-95-Stil), schwarz, ohne Emojis */
const ICON = {
 play:'<path d="M5 3l8 5-8 5z"/>', pause:'<path d="M4 3h3v10H4zM9 3h3v10H9z"/>', stop:'<path d="M4 4h8v8H4z"/>',
 rew:'<path d="M8 3v10L2 8zM14 3v10L8 8z"/>', ff:'<path d="M2 3l6 5-6 5zM8 3l6 5-6 5z"/>',
 prev:'<path d="M11 3v10L4 8z"/>', next:'<path d="M5 3l7 5-7 5z"/>', left:'<path d="M10 3v10L4 8z"/>',
 snd:'<path d="M1 6h3l4-3v10L4 10H1z"/><path d="M10.5 5.5c1.2 1.4 1.2 3.6 0 5M12.5 3.5c2.3 2.6 2.3 6.4 0 9" fill="none" stroke="currentColor" stroke-width="1.4"/>',
 mute:'<path d="M1 6h3l4-3v10L4 10H1z"/><path d="M10 6l4 4M14 6l-4 4" stroke="currentColor" stroke-width="1.6"/>',
 full:'<path d="M1 1h5v2H3v3H1zM15 1v5h-2V3h-3V1zM1 15v-5h2v3h3v2zM15 15h-5v-2h3v-3h2z"/>',
 x:'<path d="M3 4.4L4.4 3 8 6.6 11.6 3 13 4.4 9.4 8 13 11.6 11.6 13 8 9.4 4.4 13 3 11.6 6.6 8z"/>'
};
const svg = n => `<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">${ICON[n]}</svg>`;

let lang = 'de';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'de'; } catch (e) {}
const t = k => L[lang][k] || L.de[k] || k;

/* Koordinaten in Pixeln des Hintergrundbilds (2092 x 1177). Taste "D" zeigt die Klickflächen.
   r  = ganzes Objekt (bleibt beim Öffnen scharf)
   sr = Bildschirm bzw. Bildfläche im Rahmen, sp = exakte Bildschirmform (aus dem Bild ausgemessen) */
const P = [
 {id:'fuchs',k:'poster',r:[311,517,237,323],sr:[324,530,211,297],ch:1,t:'Form Farbe',y:2023,c:['Design','Design'],
  sl:['F3-Fuchsteufelswild','F3-Fuchsteufelswild-linien','F3-Tiger','F3-Tiger-lines'],lay:'grid2',g2:['F3-Fuchsteufelswild','F3-Fuchsteufelswild-linien','F3-Tiger','F3-Tiger-lines'],
  s:[['desc','Das Projekt ist im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden. Die Kunst, aus Formen Motive zu erschaffen. Die meisten Illustrationen, Logos und Bilder bestehen tatsächlich aus vielen kleinen, einfachen geometrischen Formen. Zusammen können Muster oder, wie hier, Tierformen nahezu zusammengepuzzelt werden. Viele kleine Teile ergeben ein Ganzes. Meine Ideen bei der Aufgabe basierten auf einem kurzen Sprichwort und einer Wortspielerei.']]},
 {id:'who',k:'poster',r:[617,170,211,290],sr:[628,181,189,268],ch:2,t:'Who am I?',y:2023,c:['Design','Design'],
  g1:['F3-MilleyCyrus','2-TheRock','Madonna'],g2:['F3-MilleyCyrus-plakat','2-TheRock+Name','Madonna+Name'],lay:'stack',
  sl:['F3-MilleyCyrus','2-TheRock','Madonna','F3-MilleyCyrus-plakat','2-TheRock+Name','Madonna+Name'],
  s:[['desc','Das Projekt ist im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden, welches ich im Anschluss selbstständig fortgeführt habe. Die Aufgabe war, basierend auf Formen aus der Geometrie eine berühmte Persönlichkeit abzubilden, mit einem „signature move“, anhand dessen man die Persönlichkeit erkennt.']]},
 {id:'coke',k:'poster',r:[1430,262,372,510],sr:[1449,281,334,472],ch:3,t:'Coca Cola Zero',y:2024,c:['Rebranding Werbeplakat','Rebranding ad poster'],
  sl:['CocaCola3-Werbeplakat_web','CocaCola1-Werbeplakat_web','CocaCola2-Werbeplakat_web'],g2:['CocaCola3-Werbeplakat_web','CocaCola1-Werbeplakat_web','CocaCola2-Werbeplakat_web'],doc:'media/CocaColaPlakatAnalyse_Jeanette_Birkemeyer.pdf',
  s:[['desc','Das Projekt ist ebenfalls im Rahmen des Uni-Kurses Grafik und Bild an der HMKW entstanden. Wir hatten hierbei die freie Auswahl, welche Marke wir rebranden möchten. Die Werbeplakate sollten wir jedoch nicht bloß illustrieren, sondern mit einem selbst geschossenen Foto als Basis arbeiten. Hierfür habe ich mir erst ein altes, typisches Plakat von Coca Cola Zero herausgesucht und anhand von Bildaufbau und Bildausschnitt, Typografie und Farbgebung analysiert. Daraufhin habe ich die Informationen für meine Ideenfindung berücksichtigt und am Ende ebenfalls eine Analyse durchgeführt.'],['','Konzeptarbeit im Rahmen eines Uni-Kurses, keine offizielle Kampagne von Coca-Cola.']]},
 {id:'hair',k:'tv',r:[701,525,231,324],sr:[720,548,168,248],ch:4,t:'The hair square',y:2025,c:['3D Animation','3D animation'],v:'hair',
  sp:'3.6% 0%,0% 2.4%,0% 97.2%,3.6% 99.6%,95.8% 99.6%,99.4% 97.2%,99.4% 2.4%,95.8% 0%',
  g2:['image5','SquareWegIdee','image3','image4'],
  s:[['info','Im Rahmen des Uni-Kurses BK5 – Transmediale Gestaltung war die Semesterabgabe eine 20-sekündige Animation. Nach ein paar Wochen waren die Grundlagen in Blender erlernt und uns stand es frei, damit zu machen, was wir wollen.'],
     ['dev','Die Idee mit dem Würfel voller Haare entwickelte sich durch mein fehlendes Wissen darin, komplexe Bewegungsabläufe einer Figur darzustellen. Da ein Würfel nur von Seite zu Seite kippt, konnte ich dadurch sehr einfach Bewegung reinbringen und verschiedene Gesichtsausdrücke einbauen, je nach Handlungsablauf.'],
     ['prob','Nach wochenlanger Arbeit kam das Projekt sehr schön zusammen, trotz vieler Momente der Verzweiflung. Mein Mac scheint nicht dafür gemacht zu sein, auch nur die Materialien zu öffnen, und bestrafte mich jedes Mal mit dem Systemabsturz. Glücklicherweise konnte ich die Uni-Rechner nutzen und schließlich auch dort, einen Tag lang, einmal mit Eevee und einmal mit Cycles mein Projekt rendern.']]},
 {id:'watch',k:'tv',r:[962,423,227,178],sr:[975,439,152,122],ch:5,t:'Rauch mal',y:2024,c:['Apple Watch App','Apple Watch app'],v:'watch',
  sp:'0.7% 5.7%,0% 84.4%,0.7% 91.8%,5.3% 97.5%,89.5% 99.2%,92.1% 98.4%,96.7% 92.6%,99.3% 68.9%,99.3% 22.1%,98% 17.2%,98% 8.2%,92.8% 1.6%,80.3% 0%,10.5% 0%,4.6% 0.8%',
  g2:['RauchMal_Screens','TeufelGanzkoerper','EngelGanzkoerper'],
  s:[['info','In dem Kurs BK6 – Audiovisuelle Gestaltung haben wir Informationsarchitekturen kennengelernt und sollten schließlich auch in Zweierteams eine eigene Apple Watch App gestalten. Die Voraussetzungen waren ein Fokus auf Mobilität, Agilität, Interaktion und Sensoren. Es sollte ein radikal mutiges Design sein, das Vernetzungsmöglichkeiten mit dem Browser oder dem iPhone bot.'],
     ['dev','Erst haben Stella und ich jeweils Ideen für Apps gesammelt und sie uns gegenseitig vorgestellt. Durch gemeinsames Spinnen sind dann zwei Ideen entstanden, von denen eine die „Rauch mal“-App war. Wir haben uns gefragt: Was würde nie in einem App Store landen? Eine App, die das Rauchen fördert, aber auch davon abhalten kann. Und somit war die Idee des Engels und des Teufels geboren.'],
     ['role','Wir haben die Idee, das Konzept und den Aufbau gemeinsam entwickelt. Beim Screendesign haben wir die Aufgaben aufgeteilt. Während ich die Animationen des Engels und Teufels gemacht habe, hat Stella die Statistiken sowie den interaktiven Rückblick gestaltet.'],
     ['prob','Uns fiel es anfänglich schwer, eine Idee zu finden, da wir uns beide mit dem Thema Apple Watch Apps noch nie zuvor befasst hatten. Unser Professor ermutigte uns, weiterzudenken und die Interaktionsmöglichkeiten tiefer zu betrachten.']]},
 {id:'shadows',k:'tv',r:[930,596,370,257],sr:[953,622,254,198],ch:6,t:'Dancing with shadows',y:2024,c:['Lyric Video','Lyric video'],v:'shadows',
  sp:'3.5% 4.5%,2.4% 8.1%,2.8% 14.6%,2.4% 17.2%,1.6% 18.2%,2% 24.7%,1.2% 26.8%,1.6% 27.8%,0.4% 30.3%,0.8% 43.9%,0% 46.5%,0% 85.9%,0.8% 90.9%,3.5% 94.4%,5.5% 95.5%,31.5% 98.5%,59.1% 99.5%,62.2% 98.5%,69.3% 99.5%,94.1% 99%,97.2% 95.5%,98% 90.9%,97.6% 89.9%,98.8% 76.8%,98.4% 65.7%,99.2% 63.6%,99.6% 56.6%,99.6% 9.6%,96.9% 5.6%,90.6% 4%,77.6% 3%,74.8% 2%,64.6% 2%,63.4% 1%,55.1% 1%,48.4% 0%,20.5% 0%,14.2% 1%,7.1% 1%,5.9% 1.5%',
  g2:['Storyboard-weiss'],pair:'lyr',
  s:[['info','In dem Kurs Motion Design war die Semesterabgabe ein Lyric Video, welches mit Hilfe von After Effects zu einem selbst gewählten oder auch selbst erstellten Song animiert werden sollte.'],
     ['dev','Bei Suno AI habe ich mir einen Song erstellt und anhand der Lyrics ein Storyboard erstellt. Verse für Verse habe ich meine Vorstellungen umgesetzt und bin dabei zwischen Frame-by-Frame-Zeichnungen auf dem iPad, Illustrator-Dateien und Photoshop-Bearbeitungen hin und her gesprungen, bis sich alles wie ein Puzzle zusammengesetzt hat.'],
     ['prob','After Effects hat viele tolle Funktionen und das Arbeiten in dem Programm hat mir schnell Spaß gemacht. Das Einzige, was ich mir zu dem Zeitpunkt gewünscht hätte, wäre ein Monitor, auf dem ich das Bild richtig sehen kann. Denn durch die vielen Einstellungsfenster und die immer länger wachsende Timeline wurde der Platz für das Video immer kleiner und somit meine Arbeitsfläche immer schwerer zu erkennen.'],
     ['lyr','[Verse]\nWoke up to the same old gray day\nMonotonous drone no light no way\nLifeless routine drains my soul\nSearching for spark to make me whole\n\n[Verse 2]\nEyes shut tight but I still see\nPainted colors dreams so free\nFingers bleed on the cold strings\nMelody forms my heart it sings\n\n[Chorus]\nDancing with shadows colors anew\nFound my escape where art\'s true\nBrushstrokes of fire burning bright\nChase my own sun through the night\n\n[Bridge]\nTruth in the chaos raw and loud\nArt makes life free from the shroud\nPurpose I find deep in the grind\nCreation heals this fractured mind']]},
 {id:'crowded',k:'tv',r:[678,853,358,237],sr:[698,878,245,193],ch:7,t:'Crowded',y:2026,c:['Expanded Animation','Expanded animation'],v:'crowded',
  sp:'2% 5.7%,1.2% 7.8%,0% 34.2%,0.4% 77.2%,1.2% 80.3%,1.6% 89.6%,5.7% 95.3%,10.6% 95.9%,11.8% 96.9%,14.3% 96.9%,15.9% 97.9%,23.7% 97.9%,24.9% 99%,75.1% 99%,93.9% 96.4%,96.3% 94.8%,99.2% 91.2%,99.6% 6.2%,96.7% 2.1%,91.4% 0.5%,80.8% 0%,28.2% 0%,25.3% 1%,18.8% 0.5%,5.3% 1.6%',
  g2:['Moodboard','StoryboardEA','Person'],
  s:[['info','Die Vorgabe war, eine Leinwand an der Wand und eine auf dem Boden gemeinsam zu bespielen und eine Interaktion einzubauen. Dafür konnten wir entweder Menschen auf der Bodenleinwand tracken oder mit einem Sensor arbeiten, der Bewegungen vor der Leinwand weitergibt.'],
     ['dev','Zu Beginn durchforstete jeder das Internet nach inspirierenden Projekten, um sich verschiedene Umsetzungsmöglichkeiten vorzustellen. Danach präsentierte jeder eine Projektidee und einen Stil, anhand derer sich vorzugsweise Zweierteams zusammenfinden sollten.\nMeine Idee war es, eine soziale Angststörung darzustellen: ein Blick in den Kopf, hinter das innere Auge. Dort beginnt die Storyline mit einer Wiese, die dafür steht, dass alles gut ist. Die Protagonistin wächst aus einer Blume, läuft, fällt und der Blick hinter das innere Auge folgt. Sobald in der Szene drei oder mehr Menschen die Bodenfläche betreten, wird diese Ruhe von einer Panikattacke unterbrochen. Verlassen die Menschen die Bodenplatte wieder, wird alles weiß. Silhouetten an der Wand und Füße auf dem Boden erscheinen: Menschen, die versuchen, der Protagonistin zu helfen, und deren Stimmen sie in diesem Moment wahrnimmt. Danach sieht man ihre Augen und hört ihre Gedanken, während sie versucht, sich zu beruhigen. Gelingt das, kehrt die Wiese zurück.\nNach der Teambildung verlief die Arbeit in Eigenarbeit. Am Semesterende wurde das Ganze in einem abgedunkelten Raum präsentiert.'],
     ['role','Ich habe die Idee entwickelt, die Animationen erstellt und das Voiceover eingesprochen. Mein Teampartner war für die Zusammenführung der Animationen in TouchDesigner und das Tracking der Menschen auf der Bodenleinwand verantwortlich. Sobald drei oder mehr Personen die Bodenfläche betraten, löste das Tracking die Panikattacke aus.'],
     ['prob','Da wir uns vorher nicht kannten, wussten mein Teampartner und ich noch nicht, dass wir sehr unterschiedliche Arbeitsweisen hatten, die nicht immer gut zusammenpassten. Dadurch kosteten viele Prozesse deutlich mehr Zeit als geplant, und ein großer Teil der Arbeit lag bei mir. Unser Professor hatte mir geraten, für die Zwischenframes eine KI zu verwenden, da meine Idee recht aufwändig war. Das Ausprobieren und Recherchieren der verschiedenen KIs kostete jedoch viel Zeit, Enttäuschung und am Ende auch Geld. Für einen selbstgemalten Stil waren sie wohl noch nicht weit genug entwickelt, sodass ich fast alles frame by frame zeichnen musste. Das wäre kein Problem gewesen, wenn nicht schon durch die Abstimmung im Team so viel Zeit verloren gegangen wäre.']]},
 {id:'adhd',k:'tv',r:[1054,858,320,237],sr:[1077,888,219,170],ch:8,t:'ADHD',y:2023,c:['2D Animation','2D animation'],v:'adhd',
  sp:'97.7% 5.9%,94.5% 1.8%,91.3% 0.6%,69.9% 0%,5% 1.2%,0.5% 7.6%,0.9% 9.4%,0% 14.1%,0.9% 84.7%,1.8% 90%,5.9% 95.3%,11.4% 98.2%,15.1% 98.8%,81.3% 98.8%,84.5% 97.6%,92.2% 97.1%,95% 95.3%,98.2% 91.2%,99.5% 87.1%,99.5% 29.4%,99.1% 10%',
  g2:['Skizze1','Skizze2','Skizze3','Skizze4','Skizze5'],
  s:[['info','Dieses Video entstand in der ersten Projektwoche an der HMKW. Die Aufgabe war, in Gruppen jeweils ein Erklärvideo zu einem psychischen Krankheitsbild zu erstellen.'],
     ['dev','Die Professorin hat uns nach unseren Stilen und Darstellungspräferenzen aufgeteilt und wir durften dann entscheiden, welche Krankheit wir bearbeiten möchten. Gemeinsam haben wir uns für eine Storyline entschieden und anschließend die Aufgaben verteilt. Da Indira Erfahrung mit Stop Motion hat und gerne Figuren selber modelliert, haben wir uns schnell für unseren Protagonisten entschieden. Der Rest der Gruppe war verantwortlich für die Hintergrundanimation. Hierbei hat jeder ein anderes Skillset mitgebracht und daher wollten wir unsere Stile auch einfach miteinander verbinden, was durch die anfängliche Gruppenaufteilung sehr harmonisch verlief. Das Ganze wurde zusammengeschnitten und im Anschluss gemeinsam präsentiert.'],
     ['role','Meine Rolle war es, einige der Hintergründe mit Procreate zu erstellen (siehe Bilder) und zu animieren, sowie die Präsentation passend dazu aufzubereiten. Im Allgemeinen haben wir uns allerdings auch gegenseitig viel geholfen und unterstützt.'],
     ['prob','In dieser Gruppenarbeit gab es meines Wissens keine Probleme, die nicht schnell gelöst werden konnten. Dabei ging es maximal um Schwierigkeiten mit Programmen und deren Bedienung, wobei sich durch die gegenseitige Unterstützung schnell Lösungen gefunden haben.']]}
];
/* Englische Projekttexte, gleiche Reihenfolge wie die Abschnitte in P[].s */
const EN = {
 fuchs:['This project was created in the Graphics and Image course at HMKW. The art of creating motifs from shapes. Most illustrations, logos and images actually consist of many small, simple geometric shapes. Put together, they can form patterns or, as here, animal figures that are almost puzzled together. Many small parts make up a whole. My ideas for the assignment were based on a short proverb and a play on words.'],
 who:['This project was created in the Graphics and Image course at HMKW, and I continued it on my own afterwards. The task was to depict a famous personality using geometric shapes, with a “signature move” that makes the person recognisable.'],
 coke:['This project was also created in the Graphics and Image course at HMKW. We were free to choose which brand we wanted to rebrand. However, instead of simply illustrating the ad posters, we had to build them on a photo we shot ourselves. First, I picked an old, typical Coca-Cola Zero poster and analysed its composition and framing, typography and colour scheme. I then used these insights for my ideation and, at the end, analysed my own posters as well.',
       'Concept work for a university course, not an official Coca-Cola campaign.'],
 hair:['In the course BK5 – Transmedia Design, the semester assignment was a 20-second animation. After a few weeks of learning the basics of Blender, we were free to do whatever we wanted with it.',
       'The idea of a cube full of hair came from my lack of experience in animating the complex movements of a character. Since a cube only tips from side to side, I could easily bring in movement and add different facial expressions depending on the story.',
       'After weeks of work, the project came together beautifully, despite many moments of despair. My Mac didn’t seem built to even open the materials and punished me with a system crash every time. Luckily, I was able to use the university computers and finally rendered my project there over the course of a day, once with Eevee and once with Cycles.'],
 watch:['In the course BK6 – Audiovisual Design, we learned about information architecture and were then asked to design our own Apple Watch app in teams of two. The requirements were a focus on mobility, agility, interaction and sensors. It was meant to be a radically bold design that offered ways to connect with the browser or the iPhone.',
        'First, Stella and I each collected app ideas and presented them to each other. Brainstorming together led to two ideas, one of which was the “Rauch mal” (“Have a smoke”) app. We asked ourselves: what would never make it into an App Store? An app that encourages smoking but can also stop you from doing it. And so the idea of the angel and the devil was born.',
        'We developed the idea, the concept and the structure together. For the screen design, we split the tasks: while I created the animations of the angel and the devil, Stella designed the statistics and the interactive review.',
        'At first, we struggled to find an idea, as neither of us had ever worked on Apple Watch apps before. Our professor encouraged us to think further and to take a deeper look at the possibilities for interaction.'],
 shadows:['In the Motion Design course, the semester assignment was a lyric video, animated in After Effects to a song of our own choice or even of our own making.',
          'I created a song with Suno AI and developed a storyboard based on the lyrics. Verse by verse, I brought my ideas to life, jumping back and forth between frame-by-frame drawings on the iPad, Illustrator files and Photoshop edits until everything came together like a puzzle.',
          'After Effects has many great features, and I quickly enjoyed working with it. The only thing I would have wished for at the time was a monitor on which I could see the picture properly. With all the settings panels and the ever-growing timeline, the space for the video kept shrinking, and my workspace became harder and harder to see.',
          null],
 crowded:['The brief was to use a screen on the wall and one on the floor together and to build in an interaction. To do this, we could either track people on the floor screen or work with a sensor that picks up movement in front of the screen.',
          'At the start, everyone searched the internet for inspiring projects to get a sense of different ways to realise the brief. Then each of us presented a project idea and a style, which ideally led to teams of two forming.\nMy idea was to depict social anxiety disorder: a look inside the head, behind the mind’s eye. The storyline begins with a meadow that stands for everything being fine. The protagonist grows out of a flower, walks, falls, and the view behind the mind’s eye follows. As soon as three or more people step onto the floor area, this calm is interrupted by a panic attack. When the people leave the floor area again, everything turns white. Silhouettes on the wall and feet on the floor appear: people trying to help the protagonist, whose voices she perceives in that moment. Then you see her eyes and hear her thoughts as she tries to calm down. If she succeeds, the meadow returns.\nAfter the teams were formed, we worked independently. At the end of the semester, the piece was presented in a darkened room.',
          'I developed the idea, created the animations and recorded the voiceover. My team partner was responsible for combining the animations in TouchDesigner and for tracking people on the floor screen. As soon as three or more people stepped onto the floor area, the tracking triggered the panic attack.',
          'Since we didn’t know each other beforehand, my team partner and I didn’t yet know that we had very different ways of working that didn’t always fit together. As a result, many processes took much longer than planned, and a large part of the work fell to me. Our professor had advised me to use AI for the in-between frames, as my idea was quite elaborate. However, trying out and researching the different AI tools cost a lot of time, frustration and, in the end, money. They apparently weren’t advanced enough yet for a hand-painted style, so I had to draw almost everything frame by frame. That wouldn’t have been a problem if so much time hadn’t already been lost coordinating within the team.'],
 adhd:['This video was created during the first project week at HMKW. The task was to create an explainer video about a mental illness in groups.',
       'The professor divided us into groups based on our styles and preferred ways of depicting things, and we were then allowed to choose which illness we wanted to work on. Together we decided on a storyline and then divided up the tasks. Since Indira has experience with stop motion and likes to model figures herself, we quickly settled on our protagonist. The rest of the group was responsible for the background animation. Everyone brought a different skill set, so we wanted to simply combine our styles, which went very smoothly thanks to the way the groups had been formed. Everything was edited together and then presented as a group.',
       'My role was to create and animate some of the backgrounds in Procreate (see images) and to prepare the presentation to go with it. In general, though, we also helped and supported each other a lot.',
       'As far as I know, there were no problems in this group project that couldn’t be solved quickly. At most, there were difficulties with software and how to use it, and thanks to our mutual support, solutions were found quickly.']
};
P.forEach(p => { const e = EN[p.id] || []; p.s.forEach((x, i) => { x[2] = e[i] || x[1]; }); });
const clip = p => p.sp ? `polygon(${p.sp})` : 'none';
const ch = p => 'CH ' + String(p.ch).padStart(2, '0');

/* ---------- Ton (per WebAudio, keine Dateien) ---------- */
const CLICK = new Audio('media/sound/ClickSound.mp3'); CLICK.preload = 'auto';
function clickSnd() { try { const a = CLICK.cloneNode(); a.volume = .8; a.play().catch(() => {}); } catch (e) {} }
let ac;
function snd(kind) {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const n = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = 'square'; o.frequency.value = kind === 'on' ? 90 : 1800;
    g.gain.setValueAtTime(kind === 'on' ? .1 : .04, n); g.gain.exponentialRampToValueAtTime(.001, n + (kind === 'on' ? .45 : .05));
    o.connect(g).connect(ac.destination); o.start(n); o.stop(n + .5);
  } catch (e) {}
}

/* ---------- Bühne: Bild füllt den Bildschirm (cover) ---------- */
const stage = $('#stage'), veil = $('#veil'), osd = $('#osd');
let B = {x: 0, y: 0, s: 1}, Z = {x: 0, y: 0, z: 1};    // Basis-Layout und aktueller Zoom
function layout() {
  const s = Math.max(innerWidth / W, innerHeight / H);
  B = {s, x: (innerWidth - W * s) / 2, y: (innerHeight - H * s) / 2};
  stage.style.width = W * s + 'px'; stage.style.height = H * s + 'px';
}
function setStage(z) { Z = z; stage.style.transform = `translate(${z.x}px,${z.y}px) scale(${z.z})`; }
const home = () => ({x: B.x, y: B.y, z: 1});
// Bildkoordinaten -> Bildschirmkoordinaten (bei gegebenem Zoom)
const toView = (r, z = Z) => ({x: z.x + r[0] * B.s * z.z, y: z.y + r[1] * B.s * z.z, w: r[2] * B.s * z.z, h: r[3] * B.s * z.z});

P.forEach(p => {
  const b = document.createElement('button');
  b.className = 'hs ' + p.k; b.type = 'button'; p.el = b;
  p.label = () => `${p.t} (${p.y}) ${t('open')}`; b.setAttribute('aria-label', p.label());
  const r = p.k === 'tv' ? p.sr : p.r;
  b.style.cssText = `left:${r[0] / W * 100}%;top:${r[1] / H * 100}%;width:${r[2] / W * 100}%;height:${r[3] / H * 100}%`;
  if (p.v) {
    const s = document.createElement('div'); s.className = 'scr'; s.style.clipPath = clip(p);
    const v = document.createElement('video');
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = 'auto';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('autoplay', '');
    v.poster = LOOP + p.v + '.jpg'; v.src = LOOP + p.v + '.mp4';
    s.append(v); b.append(s); p.loop = v;
  }
  b.onclick = () => openP(p);
  b.onpointerenter = () => { osd.textContent = ch(p) + ' ▶ ' + p.t; osd.classList.add('on'); };
  b.onpointerleave = () => osd.classList.remove('on');
  stage.append(b);
});
const loops = on => P.forEach(p => { if (p.loop) on ? p.loop.play().catch(() => {}) : p.loop.pause(); });
// Autoplay absichern (manche Browser starten erst nach dem ersten Klick)
addEventListener('load', () => loops(true));
addEventListener('pointerdown', function kick() { loops(!cur); removeEventListener('pointerdown', kick); }, {once: true});
document.addEventListener('visibilitychange', () => loops(!document.hidden && !cur));

/* ---------- 3D-Fernbedienung als Cursor (nur Maus) ---------- */
const remote = $('#remote'), ir = $('#ir');
let R = null, tip = [0, 0], fallback = null;
if (FINE) {
  const cv = document.createElement('canvas'); remote.append(cv);
  import('./media/lib/remote3d.js').then(m => m.initRemote(cv, 'media/remote/')).then(r => { R = r; tip = r.tip; })
    .catch(() => { cv.remove(); fallback = new Image(); fallback.src = 'media/remote/fallback.png'; fallback.alt = ''; remote.append(fallback); tip = [10, 6]; });
}
let mx = -999, my = -999, raf = 0;
addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  document.body.classList.add('rc'); mx = e.clientX; my = e.clientY;
  if (R) R.move(mx, my);
  if (!raf) raf = requestAnimationFrame(() => {
    raf = 0;
    remote.style.transform = `translate3d(${mx - tip[0]}px,${my - tip[1]}px,0)`;
    osd.style.transform = `translate3d(${mx + 30}px,${my + 120}px,0)`;
  });
}, {passive: true});
addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  snd('click'); if (R) R.press(true); if (fallback) fallback.classList.add('press');
  ir.style.setProperty('--t', `translate(${mx}px,${my}px)`); ir.classList.remove('go'); void ir.offsetWidth; ir.classList.add('go');
});
addEventListener('pointerup', () => { if (R) R.press(false); if (fallback) fallback.classList.remove('press'); });
document.addEventListener('mouseleave', () => document.body.classList.remove('rc'));

/* ---------- Projekt öffnen: Zoom auf TV-Bildschirm bzw. Bilderrahmen ---------- */
const view = $('#view'), sc = $('.sc', view), player = $('#player'), ctl = $('#ctl'), panel = $('#panel');
let cur = null, idx = 0, last = null, timers = [];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const tabW = () => parseFloat(getComputedStyle(panel).getPropertyValue('--tab')) * parseFloat(getComputedStyle(document.documentElement).fontSize) || 136;

function zoomFor(p) {
  const a = p.sr, free = innerWidth - tabW();
  const fit = p.k === 'tv' ? Math.min(free * .74 / a[2], (innerHeight - 150) * .82 / a[3]) : Math.min(free * .7 / a[2], (innerHeight - 140) * .86 / a[3]);
  const z = Math.max(1, fit / B.s);
  const cx = free / 2, cy = (innerHeight - 60) / 2 + 4;
  return {z, x: cx - (a[0] + a[2] / 2) * B.s * z, y: cy - (a[1] + a[3] / 2) * B.s * z};
}
function placeUI(p) {
  const s = toView(p.sr), o = toView(p.r);
  Object.assign(player.style, {left: s.x + 'px', top: s.y + 'px', width: s.w + 'px', height: s.h + 'px', clipPath: clip(p)});
  // Loch in der Unschärfe: das ganze Objekt bleibt scharf
  const x1 = o.x, y1 = o.y, x2 = o.x + o.w, y2 = o.y + o.h;
  veil.style.clipPath = `polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,${x1}px ${y1}px,${x1}px ${y2}px,${x2}px ${y2}px,${x2}px ${y1}px,${x1}px ${y1}px)`;
  const cw = Math.max(Math.min(s.w, 420), 300), ch2 = ctl.offsetHeight || 96;
  const top = Math.min(innerHeight - ch2 - 12, Math.max(s.y + s.h + 14, 0));
  Object.assign(ctl.style, {left: (s.x + s.w / 2 - cw / 2) + 'px', width: cw + 'px', top: top + 'px'});
}

function fill(p) {
  const big = p.lay !== 'grid2' && p.lay !== 'stack';
  const pic = (n, multi) => multi
    ? `<img src="${im(n, 1)}" srcset="${im(n, 1)} 640w, ${im(n)} 1800w" sizes="${big ? '(max-width:900px) 100vw, 46vw' : '(max-width:900px) 50vw, 24vw'}" alt="" loading="lazy" decoding="async">`
    : `<img src="${im(n)}" alt="" loading="lazy" decoding="async">`;
  const gal = (a, g, cls = '') => a ? `<div class="gal ${cls}">${a.map((n, i) => `<button type="button" data-g="${g}" data-n="${i}" aria-label="${t('img')} ${i + 1} ${t('big')}">${pic(n, a.length > 1)}</button>`).join('')}</div>` : '';
  const sec = ([k, de, en]) => { const x = lang === 'en' ? en : de; return k ? `<h3>${t(k)}</h3>${k === 'lyr' ? `<pre>${esc(x)}</pre>` : `<p>${esc(x)}</p>`}` : `<p class="nt">${esc(x)}</p>`; };
  const pdf = p.doc ? `<p><a class="key" href="${p.doc}" target="_blank" rel="noopener">${t('pdf')}</a></p>` : '';
  let body;
  if (p.lay === 'stack') {            // Who am I: 3 Bilder über, 3 unter dem Text
    body = `${gal(p.g1, 1, 'row3')}<div class="txt">${p.s.map(sec).join('')}${pdf}</div>${gal(p.g2, 2, 'row3')}`;
  } else if (p.pair) {                // Lyrics links, Storyboard rechts daneben
    const main = p.s.filter(x => x[0] !== p.pair), side = p.s.filter(x => x[0] === p.pair);
    body = `<div class="txt">${main.map(sec).join('')}${pdf}</div><div class="cols pair"><div class="txt">${side.map(sec).join('')}</div><div class="imgs">${gal(p.g2, 2, 'stack')}</div></div>`;
  } else {                            // Text links, Bilder rechts (Form Farbe 2x2, sonst untereinander)
    body = `<div class="cols"><div class="txt">${p.s.map(sec).join('')}${pdf}</div><div class="imgs">${gal(p.g1, 1, 'stack')}${gal(p.g2, 2, p.lay === 'grid2' ? 'grid2' : 'stack')}</div></div>`;
  }
  panel.innerHTML = `<div class="tab"><b>${esc(p.t)}</b><span>${t('scroll')}</span></div>
  <div class="bd"><div class="meta">${ch(p)} · ${p.y} · ${p.c[lang === 'en' ? 1 : 0]}</div><h2 id="pTitle">${esc(p.t)}</h2>${body}</div>`;
  panel.querySelectorAll('.gal img').forEach(i => i.onerror = () => { i.parentNode.outerHTML = `<div class="ph">${t('soon')}</div>`; });
}
panel.addEventListener('click', e => {
  const b = e.target.closest('[data-g]');
  if (b) { const a = b.dataset.g === '1' ? cur.g1 : cur.g2; openLB(a, +b.dataset.n); return; }
  if (e.target.closest('.tab')) sc.scrollTo({top: innerHeight * .62, behavior: RM ? 'auto' : 'smooth'});
});

function show(p, i) {
  idx = (i + p.sl.length) % p.sl.length;
  const img = new Image(); img.alt = `${p.t} – ${t('img')} ${idx + 1}`; img.decoding = 'async'; img.src = im(p.sl[idx]);
  img.onerror = () => { player.innerHTML = `<div class="ph" style="height:100%">${t('soon')}</div>`; };
  player.replaceChildren(img);
  const c = $('.lcd b', ctl); if (c) c.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(p.sl.length).padStart(2, '0')}`;
  // nächstes Bild schon vorladen
  new Image().src = im(p.sl[(idx + 1) % p.sl.length]);
}

const tm = x => isFinite(x) ? `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, '0')}` : '0:00';
const btn = (a, ic, lab, extra = '') => `<button type="button" class="key ic" data-a="${a}" aria-label="${lab}" title="${lab}"${extra}>${svg(ic)}</button>`;
function videoUI(v) {
  ctl.innerHTML = `<div class="row"><div class="lcd"><b>0:00 / 0:00</b><span class="trace"></span></div></div>
   <input class="w95" type="range" min="0" max="1000" value="0" aria-label="${t('pos')}">
   <div class="row">${btn('rew', 'rew', t('rew'))}${btn('pp', 'pause', t('pause'))}${btn('st', 'stop', t('stop'))}${btn('ff', 'ff', t('ff'))}<span class="gap"></span>${btn('mu', 'snd', t('sound'))}${btn('fs', 'full', t('full'))}</div>`;
  const q = a => $(`[data-a=${a}]`, ctl), rg = $('input', ctl), lcd = $('.lcd b', ctl);
  const sync = () => {
    q('pp').innerHTML = svg(v.paused ? 'play' : 'pause'); q('pp').setAttribute('aria-label', v.paused ? t('play') : t('pause'));
    q('mu').innerHTML = svg(v.muted ? 'mute' : 'snd'); ctl.classList.toggle('playing', !v.paused);
  };
  const time = () => { lcd.textContent = `${tm(v.currentTime)} / ${tm(v.duration)}`; if (v.duration && !rg.matches(':active')) rg.value = v.currentTime / v.duration * 1000; };
  ['play', 'pause', 'volumechange'].forEach(ev => v.addEventListener(ev, sync));
  ['timeupdate', 'loadedmetadata', 'seeked'].forEach(ev => v.addEventListener(ev, time));
  rg.oninput = () => { if (v.duration) v.currentTime = rg.value / 1000 * v.duration; };
  q('pp').onclick = () => v.paused ? v.play().catch(() => {}) : v.pause();
  q('st').onclick = () => { v.pause(); v.currentTime = 0; };
  q('rew').onclick = () => { v.currentTime = Math.max(0, v.currentTime - 10); };
  q('ff').onclick = () => { v.currentTime = Math.min(v.duration || 0, v.currentTime + 10); };
  q('mu').onclick = () => { v.muted = !v.muted; };
  q('fs').onclick = () => { const f = v.requestFullscreen || v.webkitEnterFullscreen || v.webkitRequestFullscreen; if (f) f.call(v); };
  player.onclick = () => q('pp').click();
  sync(); time();
}

function openP(p) {
  if (cur) return;
  clickSnd(); cur = p; last = document.activeElement;
  osd.classList.remove('on'); loops(false);
  fill(p); player.className = ''; player.onclick = null; ctl.className = ''; ctl.innerHTML = '';
  if (p.sl) {
    player.classList.add('pic');
    ctl.innerHTML = `<div class="row">${btn('', 'prev', t('prev'), ' data-d="-1"')}<div class="lcd"><b></b></div>${btn('', 'next', t('next'), ' data-d="1"')}</div>`;
    show(p, 0);
    player.onclick = () => openLB(p.sl, idx);
  } else {
    const v = document.createElement('video');
    v.playsInline = true; v.preload = 'auto'; v.setAttribute('playsinline', ''); v.poster = LOOP + p.v + '.jpg'; v.src = VID + p.v + '.mp4';
    player.replaceChildren(v); videoUI(v);
    // Klick ist eine Nutzergeste: Ton freischalten, dann nach dem Zoom starten
    v.play().then(() => { if (!v._go) { v.pause(); v.currentTime = 0; } }).catch(() => { if (!v._go) v.muted = true; });
    p.vid = v;
  }
  view.hidden = false; sc.scrollTop = 0; setP(0);
  document.body.classList.add('open');
  const z = zoomFor(p);
  stage.classList.toggle('anim', !RM); setStage(z); placeUI(p);
  if (!RM) panel.animate([{translate: tabW() + 'px 0'}, {translate: '0 0'}], {duration: 380, delay: 60, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'backwards'});
  const ready = () => {
    player.classList.add('on'); ctl.classList.add('on');
    if (!RM) player.animate([{transform: 'scale(1,.02)', filter: 'brightness(4)'}, {transform: 'scale(1,1)', filter: 'brightness(1.6)', offset: .6}, {transform: 'none', filter: 'none'}], {duration: 380, easing: 'cubic-bezier(.23,1,.32,1)'});
    if (p.vid) { p.vid._go = true; p.vid.play().catch(() => { p.vid.muted = true; p.vid.play().catch(() => {}); }); }
  };
  placeUI(p); // Steuerung steht jetzt, Höhe neu messen
  timers.push(setTimeout(ready, RM ? 0 : 640));
  sc.focus({preventScroll: true});
}
function closeP() {
  if (!cur) return;
  timers.forEach(clearTimeout); timers = [];
  if (cur.vid) { cur.vid.pause(); cur.vid.removeAttribute('src'); cur.vid.load(); cur.vid = null; }
  player.classList.remove('on'); ctl.classList.remove('on');
  view.hidden = true; player.replaceChildren(); ctl.innerHTML = '';
  document.body.classList.remove('open');
  stage.classList.toggle('anim', !RM); setStage(home());
  const p = cur; cur = null; loops(true);
  (last && last.focus ? last : p.el).focus({preventScroll: true});
}
function setP(v) { view.style.setProperty('--p', v); panel.classList.toggle('full', v > .98); }
sc.addEventListener('scroll', () => setP(Math.min(1, sc.scrollTop / (innerHeight * .6))), {passive: true});
ctl.addEventListener('click', e => { const d = e.target.closest('[data-d]'); if (d && cur && cur.sl) { snd('click'); show(cur, idx + +d.dataset.d); } });
$('#x').onclick = closeP;
// Player und Steuerung liegen in einer festen Ebene (nicht im Scroll-Container) und wackeln deshalb nie mit.
// Mausrad und Wischen über dieser Ebene steuern trotzdem das Infopanel.
sc.style.overscrollBehavior = 'none';
view.addEventListener('wheel', e => {
  if (!cur || e.target.closest('#panel')) return;
  e.preventDefault(); sc.scrollTop += e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
}, {passive: false});
let ty = null;
view.addEventListener('touchstart', e => { ty = e.target.closest('#panel') ? null : e.touches[0].clientY; }, {passive: true});
view.addEventListener('touchmove', e => { if (ty === null) return; const y = e.touches[0].clientY; sc.scrollTop += ty - y; ty = y; }, {passive: true});
// Klick neben das geöffnete Bild/TV schließt das Projekt
view.addEventListener('click', e => {
  if (!cur || e.target.closest('#panel,#player,#ctl,#x')) return;
  const o = toView(cur.r);
  if (e.clientX >= o.x && e.clientX <= o.x + o.w && e.clientY >= o.y && e.clientY <= o.y + o.h) return;
  closeP();
});

/* ---------- Lightbox ---------- */
const lb = $('#lb'), lbImg = $('img', lb);
let lbList = [], lbI = 0;
function lbShow(i) {
  lbI = (i + lbList.length) % lbList.length;
  lbImg.src = im(lbList[lbI]); lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
  $('#lbC').textContent = lbList.length > 1 ? `${lbI + 1} / ${lbList.length}` : '';
  $('#lbP').hidden = $('#lbN').hidden = lbList.length < 2;
}
function openLB(list, i) { lbList = list; lb.hidden = false; lbShow(i); $('#lbX').focus({preventScroll: true}); }
function closeLB() { lb.hidden = true; lbImg.removeAttribute('src'); }
$('#lbX').onclick = closeLB; $('#lbP').onclick = () => lbShow(lbI - 1); $('#lbN').onclick = () => lbShow(lbI + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });

/* ---------- Über mich & Impressum/Datenschutz ---------- */
const about = $('#about'), legal = $('#legal');
const FRAME = 'media/img/frame.webp';
function aboutHTML() {
  return `<figure class="photo"><div class="fr"><div class="slot">${t('photo')}<img src="media/ich.jpg" alt="Jeanette Birkemeyer" onerror="this.remove()"></div><img src="${FRAME}" alt="" width="1000" height="1192" onerror="this.closest('.fr').outerHTML='<div class=frame>${t('photo')}</div>'"></div></figure>
  <div><h2>${t('about')}</h2>
  ${lang === 'en' ? `<p>I was born in 2002 near Hamburg and grew up there in a family of six. As a child, I was able to pursue my interests and try things out from an early age. Every experience taught me something new, including that I won’t become a judo champion and that I’m not a talented pianist. Instead, it quickly became clear that painting, crafting and making art set off a little firework in my head, and that hasn’t changed to this day.</p>
  <p>I still love painting and crafting all day long. Only now it’s drawing tattoo designs, designing at the screen and crafting in everyday life to sweeten everyday objects and routines with a pinch of fun and aesthetics.</p>
  <p>After finishing school with a focus on art, I converted a small van and drove around Europe for 8 months. After that, there was only one city for me: Berlin. I’ve been studying there since 2023, first at HMKW in a dual study programme with team red, now at HTW.</p>
  <p>Alongside my studies, I became self-employed with tattooing, selling merch, photography, graphic design and much more. To this day, I find fulfilment in the varied everyday life, the self-organisation and the chance to keep learning something new, meet people and grow.</p>
  <p>Now it’s time for the next decision. What do I want to do after my studies? The thing that has always fascinated me. As a child, I was enchanted by Disney’s fabulous worlds, and today it’s every animated video that makes me wonder how on earth it was made. Animation. Where exactly it will take me remains to be seen. But one thing is certain: my fingers are tingling, and I’m looking for an internship in animation for my next adventure.</p>
  ` : `<p>Ich bin 2002 in der Nähe von Hamburg geboren und dort in einer 6-köpfigen Familie aufgewachsen. Als Kind durfte ich schon früh meine Interessen verfolgen und mich ausprobieren. Jede Erfahrung hat mir etwas Neues gezeigt, auch dass ich kein Judo-Meister werde und keine talentierte Klavierspielerin bin. Dafür hat sich schnell gezeigt, dass Malen, Basteln und Kunst machen ein kleines Feuerwerk in meinem Kopf auslösen, und das hat sich bis heute nicht geändert.</p>
  <p>Ich male und bastle immer noch am liebsten den ganzen Tag. Nur ist es jetzt das Zeichnen von Tattoo-Motiven, das Designen vorm Bildschirm und das Basteln im Alltag, um tägliche Gegenstände und Routinen mit einer Prise Spaß und Ästhetik zu versüßen.</p>
  <p>Nach dem Abi im Kunstprofil habe ich mir einen kleinen Van ausgebaut und bin damit 8 Monate durch Europa gedüst. Danach gab es nur eine Stadt für mich: Berlin. Dort studiere ich seit 2023, erst an der HMKW im Dualen Studium mit team red, jetzt an der HTW.</p>
  <p>Neben dem Studium habe ich mich selbstständig gemacht mit Tätowieren, Merch verkaufen, Fotografieren, Grafikdesign und und und. Bis heute erfüllt mich der abwechslungsreiche Alltag, die Selbstorganisation und die Möglichkeit, immer wieder etwas Neues zu lernen, Menschen kennenzulernen und daran zu wachsen.</p>
  <p>Jetzt ist es Zeit für die nächste Entscheidung. Was will ich nach dem Studium machen? Das, was mich schon immer in den Bann gezogen hat. Schon als Kind haben mich die fabelhaften Welten von Disney verzaubert, und heute ist es jedes animierte Video, bei dem ich mich frage, wie zur Hölle das gemacht worden ist. Animation. Wo genau es mich hinverschlagen wird, zeigt sich noch. Aber eins ist sicher: Meine Finger kribbeln und ich suche ein Praktikum in der Animation, für mein nächstes Abenteuer.</p>
  `}<p><a class="key" href="media/CV_Jeanette_Birkemeyer_2026.pdf" download="Lebenslauf_Jeanette_Birkemeyer.pdf">${t('cv')}</a></p></div>`;
}
function legalHTML() {
  if (lang === 'en') return legalEN();
  return `<div class="legal">
  <h2>Impressum</h2>
  <p>Angaben gemäß § 5 DDG</p>
  <p>Jeanette Birkemeyer<br>Viktoria-Luise-Platz 12A<br>10777 Berlin</p>
  <p>E-Mail: <a href="mailto:jeanettebirkemeyer@gmail.com">jeanettebirkemeyer@gmail.com</a></p>
  <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Jeanette Birkemeyer, Anschrift wie oben.</p>

  <h2 style="margin-top:48px">Datenschutzerklärung</h2>
  <h3>1. Verantwortliche</h3>
  <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br>Jeanette Birkemeyer, Viktoria-Luise-Platz 12A, 10777 Berlin, E-Mail: <a href="mailto:jeanettebirkemeyer@gmail.com">jeanettebirkemeyer@gmail.com</a></p>

  <h3>2. Allgemeines</h3>
  <p>Diese Website ist ein persönliches Portfolio. Sie verwendet keine Cookies, keine Analyse- oder Tracking-Werkzeuge, keine Social-Media-Plugins und keine Kontaktformulare. Schriftarten, Videos, Bilder und Programmbibliotheken werden ausschließlich vom eigenen Webspace geladen; es werden keine Inhalte von Drittanbietern (z. B. Google Fonts oder externe CDNs) eingebunden.</p>

  <h3>3. Hosting und Server-Logfiles</h3>
  <p>Diese Website wird bei GitHub Pages gehostet. Anbieter ist die GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Niederlande; Mutterunternehmen ist die GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.</p>
  <p>Beim Aufruf der Website verarbeitet GitHub automatisch Daten, die dein Browser übermittelt, insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite bzw. Datei, die übertragene Datenmenge, den Referrer (zuvor besuchte Seite) sowie Browsertyp und Betriebssystem. Diese Daten sind technisch erforderlich, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten.</p>
  <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung dieser Website. Dabei kann es zu einer Übermittlung von Daten in die USA kommen. GitHub, Inc. ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Ergänzend setzt GitHub EU-Standardvertragsklauseln ein. Auf die Speicherdauer der Logdaten habe ich keinen Einfluss; nähere Informationen findest du in der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub General Privacy Statement</a>.</p>

  <h3>4. Lokale Speicherung der Spracheinstellung</h3>
  <p>Wenn du die Sprache der Website umstellst (DE/EN), wird diese Auswahl im lokalen Speicher deines Browsers (localStorage) abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Die Information verbleibt auf deinem Gerät und wird nicht an mich oder Dritte übertragen. Die Speicherung ist für diese von dir ausdrücklich gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst den Eintrag jederzeit über die Einstellungen deines Browsers löschen.</p>

  <h3>5. Kontakt per E-Mail</h3>
  <p>Wenn du mir eine E-Mail schreibst, verarbeite ich deine E-Mail-Adresse und die Inhalte deiner Nachricht, um dein Anliegen zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen (z. B. eine Praktikums- oder Projektanfrage) abzielt, ansonsten Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Ich lösche die Daten, sobald sie für diesen Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Für den E-Mail-Empfang nutze ich Gmail (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).</p>

  <h3>6. Deine Rechte</h3>
  <p>Du hast im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO).</p>
  <p><strong>Widerspruchsrecht:</strong> Soweit eine Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, kannst du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch einlegen (Art. 21 DSGVO).</p>
  <p>Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für mich zuständig ist: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Alt-Moabit 59–61, 10555 Berlin.</p>

  <h3>7. Keine automatisierte Entscheidungsfindung</h3>
  <p>Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet nicht statt.</p>

  <h3>8. Verschlüsselung</h3>
  <p>Die Website wird über eine verschlüsselte HTTPS-Verbindung ausgeliefert.</p>

  <p class="nt" style="margin-top:28px">Stand: November 2026</p></div>`;
}
function legalEN() {
  return `<div class="legal">
  <p class="nt">This English version is provided for convenience. Only the German version is legally binding.</p>
  <h2>Legal notice</h2>
  <p>Information pursuant to § 5 DDG (German Digital Services Act)</p>
  <p>Jeanette Birkemeyer<br>Viktoria-Luise-Platz 12A<br>10777 Berlin<br>Germany</p>
  <p>Email: <a href="mailto:jeanettebirkemeyer@gmail.com">jeanettebirkemeyer@gmail.com</a></p>
  <p>Responsible for content pursuant to § 18 (2) MStV: Jeanette Birkemeyer, address as above.</p>

  <h2 style="margin-top:48px">Privacy policy</h2>
  <h3>1. Controller</h3>
  <p>The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:<br>Jeanette Birkemeyer, Viktoria-Luise-Platz 12A, 10777 Berlin, Germany, email: <a href="mailto:jeanettebirkemeyer@gmail.com">jeanettebirkemeyer@gmail.com</a></p>

  <h3>2. General information</h3>
  <p>This website is a personal portfolio. It does not use cookies, analytics or tracking tools, social media plugins or contact forms. Fonts, videos, images and software libraries are loaded exclusively from this website’s own web space; no third-party content (e.g. Google Fonts or external CDNs) is embedded.</p>

  <h3>3. Hosting and server log files</h3>
  <p>This website is hosted on GitHub Pages. The provider is GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Netherlands; its parent company is GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.</p>
  <p>When you visit the website, GitHub automatically processes data transmitted by your browser, in particular your IP address, the date and time of access, the page or file requested, the amount of data transferred, the referrer (previously visited page) and your browser type and operating system. This data is technically necessary to deliver the website and to ensure its security and stability.</p>
  <p>The legal basis is Art. 6 (1) (f) GDPR. My legitimate interest lies in providing this website securely and reliably. Data may be transferred to the USA in the process. GitHub, Inc. is certified under the EU-US Data Privacy Framework; the transfer is based on the European Commission’s adequacy decision (Art. 45 GDPR). In addition, GitHub uses EU Standard Contractual Clauses. I have no influence on how long log data is stored; further information can be found in GitHub’s privacy statement: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub General Privacy Statement</a>.</p>

  <h3>4. Local storage of the language setting</h3>
  <p>If you switch the website language (DE/EN), your choice is stored in your browser’s local storage (localStorage) so that it is kept for your next visit. This information remains on your device and is not transmitted to me or to third parties. The storage is strictly necessary for this function, which you have explicitly requested (§ 25 (2) no. 2 TDDDG). You can delete the entry at any time in your browser settings.</p>

  <h3>5. Contact by email</h3>
  <p>If you send me an email, I process your email address and the content of your message in order to respond to your request. The legal basis is Art. 6 (1) (b) GDPR if your request relates to a contract or pre-contractual measures (e.g. an internship or project enquiry), otherwise Art. 6 (1) (f) GDPR (legitimate interest in responding to enquiries). I delete the data as soon as it is no longer required for this purpose and no statutory retention obligations apply. I use Gmail (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland) to receive emails.</p>

  <h3>6. Your rights</h3>
  <p>Within the scope of the law, you have the right of access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR) and data portability (Art. 20 GDPR).</p>
  <p><strong>Right to object:</strong> Where processing is based on Art. 6 (1) (f) GDPR, you may object to it at any time on grounds relating to your particular situation (Art. 21 GDPR).</p>
  <p>You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for me is: Berliner Beauftragte für Datenschutz und Informationsfreiheit (Berlin Commissioner for Data Protection and Freedom of Information), Alt-Moabit 59–61, 10555 Berlin, Germany.</p>

  <h3>7. No automated decision-making</h3>
  <p>No automated decision-making, including profiling (Art. 22 GDPR), takes place.</p>

  <h3>8. Encryption</h3>
  <p>This website is delivered via an encrypted HTTPS connection.</p>

  <p class="nt" style="margin-top:28px">Last updated: November 2026</p></div>`;
}
let ovLast = null;
function openOv(o, html) {
  snd('on'); ovLast = document.activeElement; $('.in', o).innerHTML = html(); o.hidden = false; o.scrollTop = 0; document.body.classList.add('open'); loops(false);
  if (!RM) o.animate([{opacity: 0, transform: 'scale(.98)'}, {opacity: 1, transform: 'none'}], {duration: 240, easing: 'cubic-bezier(.23,1,.32,1)'});
  $('.close', o).focus({preventScroll: true});
}
function closeOv() {
  if (about.hidden && legal.hidden) return;
  about.hidden = legal.hidden = true; document.body.classList.remove('open'); loops(true);
  if (ovLast) ovLast.focus({preventScroll: true});
}
$('#bAbout').onclick = () => openOv(about, aboutHTML);
$('#bLegal').onclick = () => openOv(legal, legalHTML);
document.querySelectorAll('[data-close]').forEach(b => b.onclick = closeOv);

addEventListener('keydown', e => {
  if (!lb.hidden) {
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') lbShow(lbI + (e.key === 'ArrowRight' ? 1 : -1));
    return;
  }
  if (e.key === 'Escape') { closeP(); closeOv(); }
  else if (cur && cur.sl && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) show(cur, idx + (e.key === 'ArrowRight' ? 1 : -1));
  else if (e.key.toLowerCase() === 'd' && !cur && about.hidden && legal.hidden) document.body.classList.toggle('dbg');
});

/* ---------- Größe ändern ---------- */
let rz = 0;
addEventListener('resize', () => {
  cancelAnimationFrame(rz);
  rz = requestAnimationFrame(() => {
    layout(); stage.classList.remove('anim');
    if (cur) { setStage(zoomFor(cur)); placeUI(cur); } else setStage(home());
  });
});

/* ---------- Sprache ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
  $('#bLang').textContent = t('lang'); $('#rotT').textContent = t('rot');
  document.querySelectorAll('#x,[data-close]').forEach(b => b.innerHTML = `${svg('left')}<span>${t('menu')}</span>`);
  $('#lbX').innerHTML = svg('x'); $('#lbP').innerHTML = svg('prev'); $('#lbN').innerHTML = svg('next');
  $('#lbX').setAttribute('aria-label', t('close')); $('#lbP').setAttribute('aria-label', t('prev')); $('#lbN').setAttribute('aria-label', t('next'));
  lb.setAttribute('aria-label', t('view')); $('#stage img').alt = t('stageAlt');
  P.forEach(p => p.el.setAttribute('aria-label', p.label()));
  if (cur) fill(cur);
  if (!about.hidden) $('.in', about).innerHTML = aboutHTML();
  if (!legal.hidden) $('.in', legal).innerHTML = legalHTML();
}
$('#bLang').onclick = () => { lang = lang === 'de' ? 'en' : 'de'; try { localStorage.setItem('lang', lang); } catch (e) {} applyLang(); };

layout(); setStage(home()); applyLang();
