/* きらきら☆おしゃれスタジオ — おと（ぜんぶ Web Audio で その場で つくる） */
(function (g) {
  'use strict';
  const S = { on: { se: true, bgm: true }, ctx: null };
  let seG, bgmG, delay, noiseBuf, timer = null, step = 0, nextT = 0;

  function ctx() {
    if (!S.ctx) {
      const C = g.AudioContext || g.webkitAudioContext;
      if (!C) return null;
      const c = (S.ctx = new C());
      seG = c.createGain(); seG.gain.value = 0.5; seG.connect(c.destination);
      bgmG = c.createGain(); bgmG.gain.value = 0.045; bgmG.connect(c.destination);
      /* やさしい こだま */
      delay = c.createDelay(1); delay.delayTime.value = 0.3;
      const fb = c.createGain(); fb.gain.value = 0.28;
      const wet = c.createGain(); wet.gain.value = 0.35;
      delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(bgmG);
      const len = c.sampleRate * 0.5; noiseBuf = c.createBuffer(1, len, c.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    if (S.ctx.state === 'suspended') S.ctx.resume();
    return S.ctx;
  }

  function tone(f0, t, dur, type, vol, dest, f1) {
    const c = S.ctx, o = c.createOscillator(), gn = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(vol, t + 0.012); gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(gn); gn.connect(dest || seG); o.start(t); o.stop(t + dur + 0.03);
  }
  function noise(t, dur, vol, f0, f1, q) {
    const c = S.ctx, n = c.createBufferSource(), bp = c.createBiquadFilter(), gn = c.createGain();
    n.buffer = noiseBuf; bp.type = 'bandpass'; bp.Q.value = q || 1.2; bp.frequency.setValueAtTime(f0, t);
    if (f1) bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(vol, t + 0.015); gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(bp); bp.connect(gn); gn.connect(seG); n.start(t); n.stop(t + dur + 0.03);
  }
  const N = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const fq = (name) => { const m = /^([A-G])(#?)(\d)$/.exec(name); return 440 * Math.pow(2, (N[m[1]] + (m[2] ? 1 : 0) - 9 + (m[3] - 4) * 12) / 12); };
  const ARPS = [['C6', 'E6', 'G6'], ['D6', 'G6', 'B6'], ['E6', 'G6', 'C7'], ['G5', 'C6', 'E6'], ['A5', 'C6', 'E6'], ['F5', 'A5', 'C6']];

  S.play = function (name, arg) {
    if (!S.on.se) return;
    const c = ctx(); if (!c) return;
    const t = c.currentTime + 0.005;
    switch (name) {
      case 'tap': tone(880, t, 0.08, 'sine', 0.2, null, 1240); break;
      case 'tab': tone(660, t, 0.06, 'triangle', 0.16); tone(990, t + 0.05, 0.1, 'triangle', 0.16); break;
      case 'pick': { const a = ARPS[Math.floor(Math.random() * ARPS.length)]; a.forEach((n, i) => tone(fq(n), t + i * 0.055, 0.22, 'triangle', 0.17)); tone(fq(a[2]) * 2, t + 0.17, 0.3, 'sine', 0.07); break; }
      case 'color': tone(1319, t, 0.14, 'sine', 0.18); tone(1976, t + 0.05, 0.16, 'sine', 0.08); break;
      case 'swish': noise(t, 0.28, 0.16, 900, 3600, 1.4); break;
      case 'undo': tone(784, t, 0.09, 'triangle', 0.16); tone(523, t + 0.08, 0.14, 'triangle', 0.16); break;
      case 'tick': tone(1100 + Math.random() * 500, t, 0.04, 'square', 0.045); break;
      case 'pop': tone(480, t, 0.1, 'sine', 0.22, null, 980); break;
      case 'giggle': [1047, 1319, 1175, 1568].forEach((f, i) => tone(f, t + i * 0.07, 0.1, 'sine', 0.16)); break;
      case 'shutter': noise(t, 0.05, 0.4, 3000, 1500, 0.8); noise(t + 0.09, 0.09, 0.3, 1800, 900, 0.8); tone(1568, t + 0.2, 0.3, 'sine', 0.1); tone(2093, t + 0.27, 0.4, 'sine', 0.08); break;
      case 'fanfare': ['C5', 'E5', 'G5', 'C6'].forEach((n, i) => tone(fq(n), t + i * 0.1, 0.3, 'triangle', 0.2)); ['C6', 'E6', 'G6'].forEach((n) => tone(fq(n), t + 0.45, 0.8, 'triangle', 0.13)); tone(fq('C7'), t + 0.5, 0.9, 'sine', 0.06); break;
      case 'star': { const f = 784 * Math.pow(2, (arg || 0) * 2 / 12); tone(f, t, 0.2, 'triangle', 0.2); tone(f * 2, t + 0.06, 0.3, 'sine', 0.09); break; }
      case 'stamp': tone(300, t, 0.09, 'sine', 0.3, null, 160); tone(1319, t + 0.03, 0.14, 'sine', 0.1); break;
      case 'save': ['G5', 'C6', 'E6', 'G6'].forEach((n, i) => tone(fq(n), t + i * 0.07, 0.25, 'sine', 0.16)); break;
      case 'drum': for (let i = 0; i < 26; i++) noise(t + i * 0.042, 0.05, 0.05 + i * 0.006, 1800, 900, 0.9); noise(t + 1.12, 0.6, 0.3, 5000, 2500, 0.5); tone(98, t + 1.1, 0.4, 'sine', 0.35, null, 60); break;
      case 'applause': for (let i = 0; i < 90; i++) { const d = Math.random() * 2.8; noise(t + d, 0.03 + Math.random() * 0.03, (0.06 + Math.random() * 0.12) * (1 - d / 3.4), 1400 + Math.random() * 1600, null, 1.4); } break;
      case 'spot': tone(220, t, 0.25, 'sine', 0.2, null, 880); noise(t, 0.3, 0.08, 600, 4000, 0.7); break;
      case 'melody': ['E6', 'G6', 'C7', 'G6', 'E6', 'C6', 'D6', 'G6'].forEach((n, i) => { tone(fq(n), t + i * 0.17, 0.5, 'sine', 0.16); tone(fq(n) * 2.005, t + i * 0.17, 0.4, 'sine', 0.04); }); break;
      case 'don': tone(150, t, 0.22, 'sine', 0.42, null, 70); noise(t, 0.07, 0.14, 900, 300, 0.8); break;
      case 'open': tone(523, t, 0.1, 'triangle', 0.15); tone(784, t + 0.07, 0.1, 'triangle', 0.15); tone(1047, t + 0.14, 0.18, 'triangle', 0.15); break;
    }
  };

  /* ---------- BGM：オルゴールふうの ループ ---------- */
  const MEL = [
    'E5 G5 C6 G5 E6 . C6 G5', 'E5 A5 C6 A5 E6 . C6 A5', 'F5 A5 C6 A5 F6 . E6 C6', 'D5 G5 B5 G5 D6 . B5 G5',
    'C6 . E6 . G6 E6 C6 .', 'A5 . C6 . E6 C6 A5 .', 'F5 A5 C6 F6 E6 . C6 A5', 'G5 B5 D6 G6 . D6 B5 .',
  ].join(' ').split(' ');
  const BASS = ['C3', 'A2', 'F2', 'G2', 'C3', 'A2', 'F2', 'G2'], BASS5 = ['G3', 'E3', 'C3', 'D3', 'G3', 'E3', 'C3', 'D3'];
  const STEP = 0.3;
  function box(f, t, vol) {
    const c = S.ctx, o = c.createOscillator(), o2 = c.createOscillator(), gn = c.createGain(), g2 = c.createGain();
    o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2.005; g2.gain.value = 0.28;
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(vol, t + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(gn); o2.connect(g2); g2.connect(gn); gn.connect(bgmG); gn.connect(delay);
    o.start(t); o2.start(t); o.stop(t + 1.15); o2.stop(t + 1.15);
  }
  function schedule() {
    const c = S.ctx; if (!c) return;
    if (nextT < c.currentTime) nextT = c.currentTime + 0.05;
    while (nextT < c.currentTime + 0.7) {
      const i = step % 64, m = MEL[i];
      if (m && m !== '.') box(fq(m), nextT, 0.8);
      if (i % 8 === 0) box(fq(BASS[i / 8]), nextT, 0.9);
      if (i % 8 === 4) box(fq(BASS5[(i - 4) / 8]), nextT, 0.55);
      nextT += STEP; step++;
    }
  }
  /* BGM：audio/bgm.mp3 を ちいさめの おとで くりかえし ながす */
  const BGM_VOL = 0.22;
  let bgmEl = null, fadeT = null;
  function fadeTo(v, ms, done) {
    clearInterval(fadeT);
    const from = bgmEl.volume, t0 = performance.now();
    fadeT = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      bgmEl.volume = Math.max(0, Math.min(1, from + (v - from) * k));
      if (k >= 1) { clearInterval(fadeT); if (done) done(); }
    }, 40);
  }
  let bgmMuted = false;
  S.startBgm = function () {
    if (!S.on.bgm || bgmMuted) return;
    if (!bgmEl) { bgmEl = new Audio('audio/bgm.mp3'); bgmEl.loop = true; bgmEl.preload = 'auto'; bgmEl.volume = 0; }
    const pr = bgmEl.play();
    if (pr && pr.catch) pr.catch(() => { /* まだ タッチされていない ときは あとで ならす */ });
    fadeTo(BGM_VOL, 800);
  };
  S.stopBgm = function () {
    if (!bgmEl) return;
    fadeTo(0, 300, () => bgmEl.pause());
  };
  S.setBgm = (v) => { S.on.bgm = v; if (v) S.startBgm(); else S.stopBgm(); };
  /* ショーの あいだだけ BGM を とめる（せっていは かえない） */
  S.muteBgm = (v) => {
    if (bgmMuted === !!v) return;
    bgmMuted = !!v;
    if (bgmMuted) S.stopBgm(); else if (S.on.bgm && bgmEl) S.startBgm();
  };

  /* ---------- ファイルの こうかおん（ショー用） ---------- */
  const FILES = { drumroll: 'audio/drumroll.mp3', jajan: 'audio/jajan.mp3', cheer: 'audio/cheer.mp3' };
  const cache = {}, playing = new Set();
  S.preloadFiles = () => { Object.keys(FILES).forEach((k) => { if (!cache[k]) { const a = new Audio(FILES[k]); a.preload = 'auto'; cache[k] = a; } }); };
  /* ならせた ときは audio を かえす（こうかおん OFF・しっぱい のときは null） */
  S.playFile = function (name, vol) {
    if (!S.on.se || !FILES[name]) return null;
    S.preloadFiles();
    const a = cache[name];
    try { a.pause(); a.currentTime = 0; } catch (e) { /* */ }
    a.volume = vol == null ? 0.9 : vol;
    playing.add(a);
    a.onended = null;
    const pr = a.play();
    if (pr && pr.catch) pr.catch(() => { playing.delete(a); if (a.__fail) a.__fail(); });
    return a;
  };
  S.stopFiles = function (fadeMs) {
    playing.forEach((a) => {
      a.onended = null; a.__fail = null;
      if (!fadeMs) { a.pause(); return; }
      const v0 = a.volume, t0 = performance.now();
      const tm = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / fadeMs); a.volume = Math.max(0, v0 * (1 - k)); if (k >= 1) { clearInterval(tm); a.pause(); } }, 40);
    });
    playing.clear();
  };
  S.setSe = (v) => { S.on.se = v; };
  /* さいしょの タッチで おとを ならせるようにする */
  S.unlock = () => { ctx(); if (S.on.bgm) S.startBgm(); };
  void schedule; /* むかしの オルゴールBGM（いまは つかわない） */
  document.addEventListener('visibilitychange', () => { if (document.hidden) { S.stopBgm(); S.stopFiles(); } else if (S.on.bgm && bgmEl) S.startBgm(); });

  g.Sound = S;
})(window);
