/* 3D-Fernbedienung als Mauszeiger.
   Modell: "TV remote control" von Emmanuel PUYBARET / eTeks und Scopia Visual Interfaces Systems, s.l., CC BY 3.0
   Die Spitze (Power-Taste) sitzt genau auf der Mausposition. Neigung folgt der Bewegung (Feder). */
import * as THREE from './three.module.min.js';
import { OBJLoader } from './OBJLoader.js';

const SIZE = 260;            // Canvas in CSS-Pixel
const TIPX = 130, TIPY = 28; // Spitze oben mittig im Canvas
const LEN_PX = 165;          // Länge der Fernbedienung (vor der Neigung)
const TILT = -0.42;          // ca. 24° nach hinten gekippt: liegt vor dir, Spitze zeigt zum Bildschirm
const LEAN = 0;               // gerade (keine seitliche Drehung)

export async function initRemote(canvas, base) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setSize(SIZE, SIZE, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x2a2622, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(-6, 14, -10); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffd9a8, 1.2); rim.position.set(10, 4, 8); scene.add(rim);

  // Modell laden
  const tex = await new THREE.TextureLoader().loadAsync(base + 'remote.jpg');
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const obj = await new OBJLoader().loadAsync(base + 'remote.obj');
  const rough = { base: .32, basemate: .7, buttons: .55 };
  obj.traverse(m => {
    if (!m.isMesh) return;
    const mk = name => new THREE.MeshStandardMaterial({ map: tex, roughness: rough[name] ?? .5, metalness: .05 });
    m.material = Array.isArray(m.material) ? m.material.map(x => mk(x.name)) : mk(m.material.name);
    m.geometry.computeVertexNormals();
  });

  // Maße: Spitze = -Z-Ende, Tasten zeigen nach +Y
  const box = new THREE.Box3().setFromObject(obj);
  const len = box.max.z - box.min.z;
  obj.position.set(-(box.min.x + box.max.x) / 2, -box.max.y, -box.min.z); // Spitze oben auf Ursprung
  const roll = new THREE.Group(); roll.add(obj); roll.rotation.x = TILT; // Rollen/Kippen um die eigene Achse
  const lean = new THREE.Group(); lean.add(roll); lean.rotation.y = LEAN;
  scene.add(lean);

  // Kamera: schaut von oben, Spitze landet auf (TIPX,TIPY)
  const k = len / LEN_PX, fov = 34;
  const cam = new THREE.PerspectiveCamera(fov, 1, .1, 1000);
  const d = (2 * SIZE * k) / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)));
  cam.position.set(0, d, 0); cam.up.set(0, 0, -1); cam.lookAt(0, 0, 0);
  cam.setViewOffset(SIZE * 2, SIZE * 2, SIZE - TIPX, SIZE - TIPY, SIZE, SIZE);

  // Feder-Physik
  let px = 0, py = 0, vx = 0, vy = 0, pressT = 0, raf = 0;
  const S = { pitch: [0, 0], roll: [0, 0], press: [0, 0] }; // [wert, geschwindigkeit]
  const target = { pitch: 0, roll: 0, press: 0 };
  const spring = (s, t, dt) => { const a = 210 * (t - s[0]) - 20 * s[1]; s[1] += a * dt; s[0] += s[1] * dt; };
  let lastT = performance.now();

  function frame(now) {
    const dt = Math.min(.034, (now - lastT) / 1000); lastT = now;
    vx *= .82; vy *= .82;
    target.roll = THREE.MathUtils.clamp(vx * .02, -.25, .25);   // nur leichtes Drehen um die eigene Längsachse
    target.pitch = THREE.MathUtils.clamp(-vy * .03, -.5, .5);
    for (const n in S) spring(S[n], target[n], dt);
    roll.rotation.z = S.roll[0];
    roll.rotation.x = TILT + S.pitch[0] + S.press[0] * .3;
    lean.rotation.y = LEAN;                                      // bleibt immer gerade
    lean.scale.setScalar(1 - S.press[0] * .06);
    renderer.render(scene, cam);
    const busy = Math.abs(vx) + Math.abs(vy) > .05 || Object.keys(S).some(n => Math.abs(S[n][0] - target[n]) > .001 || Math.abs(S[n][1]) > .001);
    raf = busy ? requestAnimationFrame(frame) : 0;
  }
  const kick = () => { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); } };

  renderer.render(scene, cam);
  return {
    move(x, y) { vx += (x - px) * .5; vy += (y - py) * .5; px = x; py = y; kick(); },
    press(on) { target.press = on ? 1 : 0; kick(); },
    tip: [TIPX, TIPY], size: SIZE
  };
}
