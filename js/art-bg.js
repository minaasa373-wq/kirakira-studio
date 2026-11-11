/* きらきら☆おしゃれスタジオ — はいけい・フレーム・スタンプ・マスコット・メイクどうぐ */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f;
  const X0 = -400, Y0 = -150, W = 1400, H = 1200, FL = 700;
  const R = (x, y, w, h, fill, ex) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
  const Ci = (x, y, r, fill, ex) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
  const El = (x, y, rx, ry, fill, ex) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
  const sky = (stops) => { const id = U.uid('bg'); return `<defs>${U.lin(id, stops)}</defs>` + R(X0, Y0, W, H, `url(#${id})`); };
  const cloud = (x, y, s, fill, op) => `<g transform="translate(${x},${y}) scale(${s})" fill="${fill || '#fff'}"${op != null ? ` opacity="${op}"` : ''}><circle cx="0" cy="0" r="30"/><circle cx="-30" cy="10" r="22"/><circle cx="30" cy="10" r="24"/><circle cx="-12" cy="-16" r="22"/><circle cx="16" cy="-12" r="20"/><rect x="-52" y="8" width="106" height="24" rx="12"/></g>`;
  const hill = (cx, cy, rx, ry, fill) => El(cx, cy, rx, ry, fill);
  const glow = (cx, cy, r, c, op) => { const id = U.uid('gl'); return `<defs>${U.rad(id, [[c, 0, op == null ? 0.8 : op], [c, 1, 0]])}</defs>` + Ci(cx, cy, r, `url(#${id})`); };

  A.BGS = [
    { id: 'room', n: 'おへや', tags: ['casual', 'school'],
      draw() {
        const pt = U.uid('bp');
        let s = sky([['#ffeaf3'], ['#ffd5e7']]) + `<defs><pattern id="${pt}" width="84" height="84" patternUnits="userSpaceOnUse"><rect width="42" height="84" fill="#fff" opacity=".3"/></pattern></defs>` + R(X0, Y0, W, FL + 150, `url(#${pt})`);
        /* ガーランド */
        s += P('M-120,40 Q100,120 300,70 Q500,20 720,90', 'none', '#e8a8c4', 2.5);
        const fc = ['#ff9ec6', '#ffe37a', '#8ed4ff', '#c4a7ff', '#8de8cc'];
        for (let i = 0; i < 13; i++) {
          const t = i / 12, x = -110 + 820 * t, y = 46 + (t < 0.5 ? 1 : -1) * 58 * Math.sin(Math.PI * t * 2) * (t < 0.5 ? 1 : 0.9) + (t >= 0.5 ? 22 : 0);
          s += P(`M${f(x - 15)},${f(y)} L${f(x + 15)},${f(y)} L${f(x)},${f(y + 30)}Z`, fc[i % 5], '#fff', 2);
        }
        /* まど */
        s += R(-66, 166, 204, 268, '#fff', 'rx="16"') + R(-54, 178, 180, 244, '#bfe6ff', 'rx="8"') + cloud(0, 250, 0.7, '#fff', 0.95) + cloud(80, 330, 0.55, '#fff', 0.9) +
          R(33, 178, 6, 244, '#fff') + R(-54, 296, 180, 6, '#fff') + P('M-70,160 C-40,230 -44,330 -72,440 L-36,440 C-20,330 -24,230 -30,160Z', '#ffb3d1', '#f08fb8', 2) +
          P('M142,160 C112,230 116,330 144,440 L108,440 C92,330 96,230 102,160Z', '#ffb3d1', '#f08fb8', 2) + R(-84, 150, 240, 16, '#fff', 'rx="8" stroke="#f3c4d6" stroke-width="2"');
        /* ドレッサー */
        s += R(478, 470, 220, 232, '#fff', 'rx="14" stroke="#f3c4d6" stroke-width="3"') + R(494, 520, 188, 50, '#ffe9f2', 'rx="8"') + R(494, 584, 188, 50, '#ffe9f2', 'rx="8"') +
          Ci(588, 545, 7, '#ffd24a') + Ci(588, 609, 7, '#ffd24a') + El(588, 330, 96, 128, '#ffd24a') + El(588, 330, 84, 116, '#d8f2ff') +
          P('M540,270 q20,-40 60,-48', 'none', '#fff', 10, 'opacity=".8"') + P('M560,300 q10,-18 28,-22', 'none', '#fff', 6, 'opacity=".7"');
        for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += Ci(588 + 96 * Math.cos(a), 330 + 128 * Math.sin(a), 8, '#fff7c2', 'stroke="#f0b730" stroke-width="2"'); }
        s += R(500, 440, 22, 32, '#ff9ec6', 'rx="6"') + R(505, 428, 12, 14, '#ffd24a', 'rx="3"') + R(640, 446, 26, 26, '#c4a7ff', 'rx="8"') + Ci(653, 440, 7, '#ffd24a') + U.heart(566, 458, 9, '#ff7fb0');
        /* ゆか */
        s += R(X0, FL - 12, W, 16, '#fff') + R(X0, FL, W, H, '#fbd9b6');
        for (let x = -400; x <= 1000; x += 100) s += P(`M${x},${FL} L${f(300 + (x - 300) * 1.9)},1050`, 'none', '#edbf96', 2, 'opacity=".7"');
        s += El(300, 790, 262, 50, '#ffb3d1') + El(300, 790, 240, 42, 'none', 'stroke="#fff" stroke-width="4" stroke-dasharray="14 12"');
        return s;
      } },

    { id: 'castle', n: 'おしろ', tags: ['princess'],
      draw() {
        let s = sky([['#aedcff'], ['#e3ecff', 0.45], ['#ffe3f0', 0.62], ['#ffe3f0']]);
        s += cloud(-40, 150, 1.3, '#fff', 0.95) + cloud(560, 110, 1.1, '#fff', 0.9) + cloud(210, 60, 0.8, '#fff', 0.8) + cloud(700, 300, 0.9, '#fff', 0.85);
        s += hill(-150, 760, 520, 190, '#b9ecae') + hill(760, 780, 560, 200, '#a5e4a0');
        const tower = (x, y, w, h, roof) => R(x, y, w, h, '#fff7fb', 'stroke="#e6c4d8" stroke-width="2.5"') + P(`M${x - 8},${y} L${x + w / 2},${y - w * 1.25} L${x + w + 8},${y}Z`, roof, U.dark(roof, 0.25), 2.5) +
          P(`M${x + w / 2},${y - w * 1.25} v-22`, 'none', '#c9860f', 2.5) + P(`M${x + w / 2},${y - w * 1.25 - 22} l18,6 l-18,7Z`, '#ff5c93') + R(x + w / 2 - 7, y + 22, 14, 24, '#8fc8f0', 'rx="7"');
        s += tower(470, 360, 44, 260, '#b79cf0') + tower(636, 380, 44, 240, '#b79cf0') + R(500, 440, 150, 190, '#fff7fb', 'stroke="#e6c4d8" stroke-width="2.5"') +
          tower(546, 290, 58, 200, '#ff9cc6') + P('M500,440 h18 v-14 h16 v14 h16 v-14 h16 v14 h18 v-14 h16 v14 h16 v-14 h16 v14 h18', 'none', '#e6c4d8', 2.5) +
          P('M552,630 v-52 a23,23 0 0 1 46,0 v52Z', '#d99a6c', '#a86a3c', 2.5) + R(520, 520, 16, 26, '#8fc8f0', 'rx="8"') + R(614, 520, 16, 26, '#8fc8f0', 'rx="8"');
        s += tower(-20, 480, 36, 150, '#ff9cc6') + tower(40, 510, 30, 120, '#b79cf0');
        s += hill(300, 900, 760, 230, '#93dc8f') + P('M560,632 C540,680 420,700 360,760 C300,830 320,960 380,1050 L160,1050 C180,940 200,820 300,740 C380,690 520,670 548,632Z', '#ffeccb', '#ecd0a0', 2);
        const r = U.rng(5);
        for (let i = 0; i < 26; i++) { const x = -100 + r() * 800, y = 720 + r() * 280; if (Math.abs(x - 300) < 130) continue; s += U.flower(x, y, 7 + r() * 5, ['#ff9ec6', '#fff', '#ffe37a', '#c4a7ff'][i % 4], '#ffd24a'); }
        s += U.sprinkle(9, 14, -80, 20, 680, 420, 4, 9, '#fff', 0.9);
        return s;
      } },

    { id: 'flower', n: 'おはなばたけ', tags: ['fairy'],
      draw() {
        let s = sky([['#8fd4ff'], ['#d9f2ff', 0.6], ['#f2fbff']]);
        s += glow(60, 110, 150, '#fff3a8', 0.9) + Ci(60, 110, 54, '#ffe680');
        for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += P(`M${f(60 + 68 * Math.cos(a))},${f(110 + 68 * Math.sin(a))} L${f(60 + 92 * Math.cos(a))},${f(110 + 92 * Math.sin(a))}`, 'none', '#ffe680', 7); }
        s += cloud(420, 120, 1.2, '#fff', 0.95) + cloud(650, 240, 0.9, '#fff', 0.9) + cloud(220, 230, 0.7, '#fff', 0.8);
        s += hill(-100, 720, 520, 150, '#b4ecaa') + hill(700, 730, 520, 170, '#a2e69c') + hill(300, 960, 900, 300, '#8cdc88');
        const r = U.rng(21);
        for (let row = 0; row < 7; row++) {
          const y = 700 + row * 48, sc = 0.7 + row * 0.16, n = 13 - row;
          for (let i = 0; i < n; i++) {
            const x = -140 + (880 / n) * (i + r() * 0.7);
            if (Math.abs(x - 300) < 120 - row * 6 && row < 3) continue;
            const c = ['#ff9ec6', '#ffffff', '#ffe37a', '#ff8a70', '#c4a7ff'][Math.floor(r() * 5)];
            s += P(`M${f(x)},${f(y)} v${f(26 * sc)}`, 'none', '#5fbf6a', 3.5 * sc) + P(`M${f(x)},${f(y + 16 * sc)} q${f(12 * sc)},${f(-8 * sc)} ${f(16 * sc)},${f(2 * sc)} q${f(-10 * sc)},${f(4 * sc)} ${f(-16 * sc)},${f(-2 * sc)}Z`, '#7fd486');
            s += (i + row) % 3 === 0
              ? P(`M${f(x - 10 * sc)},${f(y - 16 * sc)} q${f(3 * sc)},${f(10 * sc)} ${f(10 * sc)},${f(4 * sc)} q${f(7 * sc)},${f(6 * sc)} ${f(10 * sc)},${f(-4 * sc)} v${f(14 * sc)} q${f(-10 * sc)},${f(10 * sc)} ${f(-20 * sc)},0Z`, c, U.dark(c, 0.2), 1.5)
              : U.flower(x, y - 4 * sc, 13 * sc, c, c === '#ffe37a' ? '#ff9f2e' : '#ffd24a', 6);
          }
        }
        const bf = (x, y, c, rot) => `<g transform="translate(${x},${y}) rotate(${rot})">` + El(-9, -4, 10, 8, c) + El(9, -4, 10, 8, c) + El(-6, 7, 7, 6, U.light(c, 0.3)) + El(6, 7, 7, 6, U.light(c, 0.3)) + R(-1.5, -8, 3, 18, '#6a4a3a', 'rx="1.5"') + '</g>';
        s += bf(120, 420, '#ff9ec6', -18) + bf(520, 380, '#ffd24a', 14) + bf(610, 520, '#c4a7ff', -8);
        return s;
      } },

    { id: 'night', n: 'ほしぞら', tags: ['magic', 'cool'],
      draw() {
        let s = sky([['#15143f'], ['#2f2a72', 0.45], ['#6a4aa8', 0.7], ['#b07ac8']]);
        s += glow(110, 130, 190, '#fff3c2', 0.5) + Ci(110, 130, 62, '#fff3b8') + Ci(136, 114, 54, '#231f5c');
        const r = U.rng(8);
        for (let i = 0; i < 110; i++) { const x = -160 + r() * 920, y = -20 + r() * 640, k = r(); s += k > 0.82 ? U.sparkle(x, y, 5 + r() * 7, k > 0.93 ? '#ffe9a8' : '#fff', 0.95) : Ci(x, y, 0.8 + r() * 1.8, '#fff', `opacity="${f(0.5 + r() * 0.5)}"`); }
        const sid = U.uid('ss');
        s += `<defs>${U.lin(sid, [['#fff', 0, 0], ['#fff', 1, 0.95]], 0, 0, 1, 0)}</defs><g transform="rotate(24 500 180)"><rect x="380" y="177" width="130" height="5" rx="2.5" fill="url(#${sid})"/></g>` + U.sparkle(512, 206, 12, '#fff');
        s += hill(-120, 760, 480, 150, '#2a2566') + hill(720, 770, 520, 170, '#241f5c') + hill(300, 980, 900, 300, '#352f78');
        s += glow(300, 780, 230, '#b79cf0', 0.45);
        for (let i = 0; i < 16; i++) s += glow(-120 + r() * 840, 620 + r() * 340, 9 + r() * 6, '#fff7a8', 0.95);
        return s;
      } },

    { id: 'candy', n: 'おかしのくに', tags: ['yume'],
      draw() {
        let s = sky([['#ffd9ec'], ['#fff1d6', 0.6], ['#fff8e8']]);
        s += cloud(-20, 140, 1.3, '#ffc2e0', 0.95) + cloud(540, 110, 1.2, '#bfe4ff', 0.95) + cloud(260, 60, 0.8, '#fff', 0.9) + cloud(700, 320, 0.9, '#e2ccff', 0.9);
        const lolli = (x, y, r, c1, c2) => {
          let t = R(x - 5, y, 10, FL - y + 60, '#fff', 'stroke="#e8c4d4" stroke-width="2"') + Ci(x, y, r, c1, `stroke="${U.dark(c1, 0.2)}" stroke-width="3"`);
          t += P(`M${x},${y} m0,${-r * 0.8} a${r * 0.8},${r * 0.8} 0 0 1 0,${r * 1.6} a${r * 0.55},${r * 0.55} 0 0 1 0,${-r * 1.1} a${r * 0.3},${r * 0.3} 0 0 1 0,${r * 0.6}`, 'none', c2, r * 0.2);
          return t + P(`M${x - r * 0.6},${y - r * 0.5} q${r * 0.2},${-r * 0.4} ${r * 0.6},${-r * 0.4}`, 'none', '#fff', 5, 'opacity=".7"');
        };
        s += lolli(-30, 330, 78, '#ff9ec6', '#fff') + lolli(120, 470, 52, '#8ed4ff', '#fff') + lolli(600, 300, 86, '#c4a7ff', '#fff') + lolli(480, 480, 48, '#ffe37a', '#ff9f2e');
        s += hill(-140, 760, 420, 130, '#ffc2dc') + hill(740, 770, 460, 150, '#cfe9ff');
        /* クリームのじめん */
        s += P(`M${X0},${FL + 6}` + U.frillLine(X0, FL + 6, X0 + W, FL + 6, 20, -26) + `V1050 H${X0}Z`, '#fffaf0', '#f3d9c0', 3);
        const r = U.rng(31), sc = ['#ff7fb0', '#7fc8ff', '#ffd24a', '#8de8cc', '#c4a7ff'];
        for (let i = 0; i < 70; i++) { const x = -160 + r() * 920, y = 740 + r() * 290; s += `<rect x="${f(x)}" y="${f(y)}" width="14" height="5" rx="2.5" fill="${sc[i % 5]}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`; }
        const donut = (x, y, c) => El(x, y, 44, 26, '#f2c078', 'stroke="#c98f45" stroke-width="3"') + P(`M${x - 40},${y - 4} q10,-22 40,-22 q30,0 40,22 q-8,10 -16,2 q-8,10 -16,0 q-8,12 -18,0 q-8,10 -16,0 q-8,8 -14,-2Z`, c, U.dark(c, 0.2), 2) + El(x, y - 6, 13, 6, '#fff8e8');
        s += donut(80, 800, '#ff9ec6') + donut(540, 830, '#b79cf0');
        return s;
      } },

    { id: 'beach', n: 'うみ', tags: ['beach'],
      draw() {
        let s = sky([['#6fc8ff'], ['#c8eeff', 0.5], ['#eafaff']]);
        s += glow(540, 110, 170, '#fff7c2', 0.9) + Ci(540, 110, 56, '#fff09a') + cloud(60, 130, 1.3, '#fff', 0.95) + cloud(330, 80, 0.8, '#fff', 0.9) + cloud(720, 260, 1, '#fff', 0.9);
        s += R(X0, 500, W, 220, '#3fb6ee') + R(X0, 560, W, 160, '#5fc8f2') + R(X0, 620, W, 100, '#8adcf6');
        for (let i = 0; i < 9; i++) { const y = 520 + i * 20, x = -180 + ((i * 137) % 300); s += P(`M${x},${y} q30,-10 60,0 q30,10 60,0 M${x + 360},${y + 6} q30,-10 60,0 q30,10 60,0 M${x + 640},${y - 4} q30,-10 60,0`, 'none', '#fff', 3, 'opacity=".7"'); }
        s += P(`M${X0},${FL}` + U.frillLine(X0, FL, X0 + W, FL, 12, 14) + `V1050 H${X0}Z`, '#ffe9b8') + P(`M${X0},${FL - 2}` + U.frillLine(X0, FL - 2, X0 + W, FL - 2, 12, 14), 'none', '#fff', 7, 'opacity=".9"');
        /* やしのき */
        s += P('M-40,720 C-20,600 -10,480 30,360 L52,366 C20,480 12,600 -4,724Z', '#c98b4d', '#8a5a2c', 2.5) + P('M-22,640 l24,6 M-14,560 l26,6 M0,480 l26,8 M14,410 l26,8', 'none', '#8a5a2c', 2.5);
        const leaf = (rot, l) => `<g transform="rotate(${rot} 42 360)">` + P(`M42,360 Q${42 + l * 0.5},${360 - l * 0.42} ${42 + l},${360 - l * 0.06} Q${42 + l * 0.5},${360 - l * 0.12} 42,360Z`, '#5fcf7a', '#2f9a52', 2.5) + '</g>';
        s += leaf(-150, 150) + leaf(-110, 130) + leaf(-60, 150) + leaf(-20, 170) + leaf(20, 150) + leaf(190, 140) + Ci(38, 366, 12, '#a86a3c') + Ci(54, 372, 11, '#a86a3c');
        /* パラソル */
        s += P('M600,470 L612,760', 'none', '#fff', 7) + P('M470,480 Q600,330 730,480 Q700,462 678,480 Q650,460 626,480 Q600,460 574,480 Q548,460 522,480 Q498,462 470,480Z', '#ff7fa8', '#d9507a', 2.5) +
          P('M574,480 Q586,380 600,366 Q614,380 626,480 Q600,460 574,480Z M470,480 Q520,380 600,366 Q548,400 522,480 Q498,462 470,480Z M730,480 Q680,380 600,366 Q652,400 678,480 Q702,462 730,480Z', '#fff', null, 0, 'opacity=".9"');
        const starfish = (x, y, c, rot) => `<g transform="rotate(${rot} ${x} ${y})">${U.star(x, y, 20, c, U.dark(c, 0.2), 5)}${Ci(x, y, 3, '#fff', 'opacity=".7"')}</g>`;
        s += starfish(130, 850, '#ff9a70', 10) + starfish(520, 900, '#ffd24a', -16);
        s += P('M430,820 q14,-26 34,-8 q-2,20 -34,8Z', '#ffd0e4', '#e89ab8', 2) + P('M436,818 q10,-10 22,-4 M440,822 q10,-4 20,0', 'none', '#e89ab8', 1.5);
        return s;
      } },

    { id: 'stage', n: 'ステージ', tags: ['idol', 'ballet'],
      draw() {
        let s = sky([['#241650'], ['#4a2a8a', 0.6], ['#7a3aa8']]);
        const beam = (x, tx, c) => { const id = U.uid('bm'); return `<defs>${U.lin(id, [[c, 0, 0.75], [c, 1, 0]])}</defs><path d="M${x - 14},-40 L${x + 14},-40 L${tx + 150},${FL + 20} L${tx - 150},${FL + 20}Z" fill="url(#${id})"/>`; };
        s += beam(40, -40, '#ff9ec6') + beam(300, 300, '#fff7c2') + beam(560, 640, '#8ed4ff');
        const r = U.rng(44);
        for (let i = 0; i < 40; i++) s += Ci(-140 + r() * 880, 40 + r() * 600, 6 + r() * 22, ['#ff9ec6', '#ffe37a', '#8ed4ff', '#fff'][i % 4], `opacity="${f(0.1 + r() * 0.22)}"`);
        s += U.sprinkle(45, 26, -120, 60, 720, 620, 4, 10, '#fff', 0.9);
        /* ゆか */
        const fid = U.uid('fl');
        s += `<defs>${U.lin(fid, [['#5a3a98'], ['#2e1c62']])}</defs>` + R(X0, FL, W, H, `url(#${fid})`) + R(X0, FL - 6, W, 10, '#ffd24a') + El(300, 790, 300, 60, '#fff', 'opacity=".16"') + El(300, 782, 170, 30, '#fff', 'opacity=".18"');
        for (let x = -360; x <= 960; x += 60) s += Ci(x, FL + 22, 7, '#fff7c2') + glow(x, FL + 22, 20, '#fff7a8', 0.7);
        /* カーテン */
        s += P(`M${X0},${Y0} H${X0 + W} V30` + U.frillLine(X0 + W, 30, X0, 30, 14, -34) + 'Z', '#e83a6a', '#a81a48', 3) + P(`M${X0},44 H${X0 + W}`, 'none', '#ffd24a', 6, 'stroke-dasharray="2 22"');
        const cur = (sx) => P(`M${300 + sx * 420},${Y0} C${300 + sx * 400},200 ${300 + sx * 330},420 ${300 + sx * 372},${FL} L${300 + sx * 700},${FL} L${300 + sx * 700},${Y0}Z`, '#d92e60', '#a81a48', 3) +
          P(`M${300 + sx * 470},-100 C${300 + sx * 450},200 ${300 + sx * 420},440 ${300 + sx * 440},${FL} M${300 + sx * 540},-100 C${300 + sx * 530},200 ${300 + sx * 500},440 ${300 + sx * 520},${FL}`, 'none', '#a81a48', 3, 'opacity=".5"');
        s += cur(-1) + cur(1);
        return s;
      } },

    { id: 'rainbow', n: 'にじのそら', tags: ['yume', 'fairy'],
      draw() {
        let s = sky([['#9fdcff'], ['#dff3ff', 0.55], ['#fff5fa']]);
        const cols = ['#ff8fa8', '#ffb86b', '#fff07a', '#9fe6a8', '#8fc8ff', '#c79cff'];
        cols.forEach((c, i) => { const rr = 430 - i * 30; s += `<path d="M${300 - rr},${FL + 40} A${rr},${rr} 0 0 1 ${300 + rr},${FL + 40}" fill="none" stroke="${c}" stroke-width="31" opacity=".92"/>`; });
        s += cloud(-90, 190, 1.4, '#fff', 0.95) + cloud(650, 150, 1.3, '#fff', 0.95) + cloud(300, 90, 0.8, '#fff', 0.85);
        s += U.sprinkle(61, 14, -100, 40, 700, 440, 5, 10, '#fff', 0.95) + U.heart(110, 420, 14, '#ffb3d1') + U.heart(520, 380, 11, '#ffd0e4') + U.star(470, 250, 12, '#fff3a8', '#fff3a8', 2) + U.star(150, 300, 10, '#fff3a8', '#fff3a8', 2);
        for (let i = 0; i < 9; i++) s += cloud(-330 + i * 160, FL + 30 + (i % 2) * 24, 2.1, '#fff', 1);
        s += R(X0, FL + 70, W, 400, '#fff');
        for (let i = 0; i < 6; i++) s += cloud(-200 + i * 200, FL + 150 + (i % 2) * 30, 2, '#f3f8ff', 1);
        return s;
      } },

    { id: 'snow', n: 'ゆきげしき', tags: ['winter'],
      draw() {
        let s = sky([['#b9dcff'], ['#e4f2ff', 0.6], ['#f6fbff']]);
        s += cloud(40, 120, 1.3, '#fff', 0.9) + cloud(560, 160, 1.1, '#fff', 0.9);
        s += hill(-120, 760, 500, 170, '#e6f2ff') + hill(720, 760, 520, 180, '#dcedff');
        const pine = (x, y, sc) => `<g transform="translate(${x},${y}) scale(${sc})">` + R(-9, 0, 18, 44, '#a8744a') +
          [[0, 70, 0], [-46, 58, -34], [-88, 46, -68]].map((p, i) => P(`M${-p[1]},${p[0]} L0,${p[0] - 76} L${p[1]},${p[0]}Z`, '#5fba8a', '#3a9068', 2.5) + P(`M${-p[1] * 0.5},${p[0] - 36} L0,${p[0] - 76} L${p[1] * 0.5},${p[0] - 36} q-8,10 -16,2 q-8,10 -16,0 q-6,8 ${-p[1] * 0.5 + 16},-2Z`, '#fff')).join('') + '</g>';
        s += pine(-40, 640, 1.2) + pine(90, 670, 0.85) + pine(640, 650, 1.3) + pine(520, 672, 0.8);
        s += hill(300, 980, 900, 300, '#ffffff');
        /* ゆきだるま */
        s += Ci(560, 800, 54, '#fff', 'stroke="#c8dcf0" stroke-width="3"') + Ci(560, 726, 38, '#fff', 'stroke="#c8dcf0" stroke-width="3"') + Ci(548, 720, 4.5, '#3b2430') + Ci(572, 720, 4.5, '#3b2430') +
          P('M560,728 l22,6 l-22,5Z', '#ff9a3c', '#d9702a', 1.5) + P('M546,742 q14,10 28,0', 'none', '#3b2430', 2.5) + P('M526,752 q34,18 68,0', 'none', '#f2485c', 12) + P('M584,756 l8,34', 'none', '#f2485c', 12) +
          R(536, 668, 48, 26, '#40395a', 'rx="4"') + R(524, 690, 72, 8, '#40395a', 'rx="4"') + Ci(560, 782, 4, '#3b2430') + Ci(560, 804, 4, '#3b2430');
        const r = U.rng(71);
        for (let i = 0; i < 80; i++) { const x = -160 + r() * 920, y = -20 + r() * 1040, k = r(); s += k > 0.8 ? U.sparkle(x, y, 6 + r() * 6, '#fff', 0.95) : Ci(x, y, 2.5 + r() * 4, '#fff', `opacity="${f(0.6 + r() * 0.4)}"`); }
        return s;
      } },

    { id: 'sakura', n: 'さくら', tags: ['school', 'casual', 'matsuri'],
      draw() {
        let s = sky([['#a8dcff'], ['#e6f4ff', 0.5], ['#ffeef5']]);
        s += cloud(300, 100, 0.9, '#fff', 0.85);
        s += hill(-100, 740, 520, 150, '#b4ecaa') + hill(700, 740, 520, 160, '#a8e6a0');
        const tree = (x, sx) => {
          let t = P(`M${x - 30},760 C${x - 20},600 ${x - 26},500 ${x - 6},400 L${x + 26},400 C${x + 14},500 ${x + 24},600 ${x + 40},760Z`, '#a8744a', '#7a4e2c', 3) +
            P(`M${x + 4},470 C${x + sx * 40},430 ${x + sx * 70},400 ${x + sx * 110},380`, 'none', '#7a4e2c', 14) + P(`M${x + 4},470 C${x + sx * 40},430 ${x + sx * 70},400 ${x + sx * 110},380`, 'none', '#a8744a', 9);
          const r = U.rng(x + 500);
          for (let i = 0; i < 26; i++) t += Ci(x - 170 + r() * 340, 150 + r() * 270, 46 + r() * 34, i % 3 ? '#ffc2dc' : '#ffd9e8', 'opacity=".96"');
          for (let i = 0; i < 16; i++) t += U.flower(x - 150 + r() * 300, 170 + r() * 240, 9, '#fff', '#ff9ec6');
          return t;
        };
        s += tree(-40, 1) + tree(650, -1);
        s += hill(300, 980, 900, 300, '#93dc8f') + P('M260,720 C240,820 220,940 200,1050 L400,1050 C380,940 360,820 340,720Z', '#ffeccb', null, 0, 'opacity=".9"');
        const r = U.rng(91);
        for (let i = 0; i < 60; i++) { const x = -160 + r() * 920, y = 60 + r() * 960, a = r() * 360; s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="7" ry="4" fill="${i % 2 ? '#ffb3d1' : '#ffd0e4'}" transform="rotate(${f(a)} ${f(x)} ${f(y)})" opacity=".95"/>`; }
        return s;
      } },

    { id: 'matsuri', n: 'おまつり', tags: ['matsuri'],
      draw() {
        let s = sky([['#141a4a'], ['#2e2a72', 0.5], ['#6a3a8a', 0.8], ['#b85a8a']]);
        const r = U.rng(101);
        for (let i = 0; i < 60; i++) s += Ci(-160 + r() * 920, -20 + r() * 420, 0.8 + r() * 1.6, '#fff', `opacity="${f(0.4 + r() * 0.6)}"`);
        const fw = (x, y, rad, c, n) => { let t = glow(x, y, rad * 1.1, c, 0.35); for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; t += P(`M${f(x + rad * 0.3 * Math.cos(a))},${f(y + rad * 0.3 * Math.sin(a))} L${f(x + rad * Math.cos(a))},${f(y + rad * Math.sin(a))}`, 'none', c, 4) + Ci(x + rad * 1.12 * Math.cos(a), y + rad * 1.12 * Math.sin(a), 4, '#fff7c2'); } return t + Ci(x, y, 7, '#fff'); };
        s += fw(90, 170, 100, '#ff7fb0', 16) + fw(520, 130, 120, '#ffd24a', 18) + fw(330, 60, 70, '#8ed4ff', 14) + fw(660, 330, 70, '#8de8cc', 12) + fw(-60, 350, 64, '#c4a7ff', 12);
        /* やたい */
        const yatai = (x, c) => R(x, 520, 200, 190, '#fff3dc', 'stroke="#c99a6a" stroke-width="3"') + R(x + 16, 560, 168, 90, '#ffe1a8') +
          P(`M${x - 16},520 h232 l-14,-64 h-204Z`, c, U.dark(c, 0.25), 3) + [0, 1, 2, 3, 4].map((i) => P(`M${x + 6 + i * 44},456 h22 l${4 - i * 2},64 h-${22 + (i < 2 ? 4 : -2)}Z`, '#fff', null, 0, 'opacity=".85"')).join('') +
          R(x - 6, 518, 212, 12, '#fff', 'rx="6" stroke="#c99a6a" stroke-width="2"');
        s += yatai(-150, '#f2485c') + yatai(550, '#3a8fe8');
        s += R(X0, FL, W, H, '#5a3a5e') + R(X0, FL, W, 14, '#7a5278');
        s += glow(300, 800, 260, '#ffb86b', 0.35);
        /* ちょうちん */
        s += P('M-200,70 Q300,170 800,70', 'none', '#3a2a2a', 3);
        for (let i = 0; i < 11; i++) { const t = i / 10, x = -160 + 920 * t, y = 76 + 50 * Math.sin(Math.PI * t) * 1 + 16; s += glow(x, y + 22, 44, '#ffb86b', 0.6) + El(x, y + 22, 20, 26, i % 2 ? '#fff' : '#f2485c', 'stroke="#a81a2e" stroke-width="2"') + R(x - 9, y - 8, 18, 7, '#3a2a2a', 'rx="2"') + R(x - 9, y + 46, 18, 7, '#3a2a2a', 'rx="2"') + P(`M${f(x - 18)},${f(y + 14)} h36 M${f(x - 19)},${f(y + 24)} h38 M${f(x - 17)},${f(y + 34)} h34`, 'none', '#a81a2e', 1.2, 'opacity=".5"'); }
        return s;
      } },

    { id: 'dots', n: 'みずたま', tags: ['idol', 'casual', 'yume', 'cool'],
      draw() {
        const pt = U.uid('dp');
        let s = sky([['#e9ddff'], ['#ffe3f1', 0.6], ['#fff3d6']]) + `<defs><pattern id="${pt}" width="90" height="90" patternUnits="userSpaceOnUse"><circle cx="22" cy="22" r="13" fill="#fff" opacity=".6"/><circle cx="67" cy="67" r="13" fill="#fff" opacity=".6"/></pattern></defs>` + R(X0, Y0, W, H, `url(#${pt})`);
        s += R(X0, FL, W, H, '#ffd0e6') + R(X0, FL, W, 10, '#fff', 'opacity=".8"') + El(300, 790, 280, 52, '#fff', 'opacity=".5"');
        s += U.star(60, 200, 30, '#ffe37a', '#ffe37a', 6) + U.heart(560, 240, 28, '#ff9ec6') + U.star(600, 520, 20, '#c4a7ff', '#c4a7ff', 4) + U.heart(10, 520, 20, '#8ed4ff') + U.sprinkle(111, 16, -120, 40, 720, 640, 6, 12, '#fff', 0.95);
        return s;
      } },
  ];
  A.bg = (i) => (A.BGS[i] || A.BGS[0]).draw();

  /* ================= フレーム ================= */
  function edgePts(vb, inset, step) {
    const x0 = vb[0] + inset, y0 = vb[1] + inset, x1 = vb[0] + vb[2] - inset, y1 = vb[1] + vb[3] - inset, pts = [];
    const nx = Math.round((x1 - x0) / step), ny = Math.round((y1 - y0) / step);
    for (let i = 0; i < nx; i++) pts.push([x0 + ((x1 - x0) * i) / nx, y0]);
    for (let i = 0; i < ny; i++) pts.push([x1, y0 + ((y1 - y0) * i) / ny]);
    for (let i = 0; i < nx; i++) pts.push([x1 - ((x1 - x0) * i) / nx, y1]);
    for (let i = 0; i < ny; i++) pts.push([x0, y1 - ((y1 - y0) * i) / ny]);
    return pts;
  }
  const border = (vb, inset, w, c, rx, ex) => `<rect x="${vb[0] + inset}" y="${vb[1] + inset}" width="${vb[2] - inset * 2}" height="${vb[3] - inset * 2}" rx="${rx || 0}" fill="none" stroke="${c}" stroke-width="${w}"${ex ? ' ' + ex : ''}/>`;
  A.FRAMES = [
    { id: 'none', n: 'なし', draw: () => '' },
    { id: 'heart', n: 'ハート', draw: (vb) => border(vb, 14, 30, '#ffb3d1') + border(vb, 31, 3, '#fff', 10, 'stroke-dasharray="10 9"') +
        edgePts(vb, 15, 56).map((p, i) => U.heart(p[0], p[1], i % 2 ? 9 : 12, i % 2 ? '#fff' : '#ff5c93')).join('') },
    { id: 'star', n: 'ほし', draw: (vb) => border(vb, 14, 30, '#5a4aa8') + border(vb, 31, 3, '#ffe37a', 10) +
        edgePts(vb, 15, 56).map((p, i) => (i % 2 ? U.sparkle(p[0], p[1], 9, '#fff') : U.star(p[0], p[1], 12, '#ffe37a', '#ffe37a', 2))).join('') },
    { id: 'ribbon', n: 'リボン', draw: (vb) => { const cx = vb[0] + vb[2] / 2; return border(vb, 12, 26, '#fff') + border(vb, 25, 4, '#ff9ec6', 12) + border(vb, 12, 3, '#ff9ec6', 0, 'stroke-dasharray="3 9" stroke-linecap="round"') +
        U.bow(cx, vb[1] + 30, 130, 64, '#ff7fb0', '#d9508a', { sw: 3, tails: 60, knot: '#ff5c93' }) + U.bow(vb[0] + 34, vb[1] + vb[3] - 34, 54, 32, '#c4a7ff', '#8a5cf0', { sw: 2 }) + U.bow(vb[0] + vb[2] - 34, vb[1] + vb[3] - 34, 54, 32, '#c4a7ff', '#8a5cf0', { sw: 2 }); } },
    { id: 'flower', n: 'おはな', draw: (vb) => border(vb, 14, 30, '#b4ecaa') + border(vb, 30, 3, '#5fbf6a', 10) +
        edgePts(vb, 15, 60).map((p, i) => U.flower(p[0], p[1], i % 2 ? 11 : 15, ['#ff9ec6', '#fff', '#ffe37a', '#c4a7ff'][i % 4], '#ffb347', 5, '#e89ab8')).join('') },
    { id: 'rainbow', n: 'にじ', draw: (vb) => ['#ff8fa8', '#ffb86b', '#fff07a', '#9fe6a8', '#8fc8ff', '#c79cff'].map((c, i) => border(vb, 4 + i * 6.5, 7, c, i * 2)).join('') +
        [[vb[0] + 46, vb[1] + 46], [vb[0] + vb[2] - 46, vb[1] + 46], [vb[0] + 46, vb[1] + vb[3] - 46], [vb[0] + vb[2] - 46, vb[1] + vb[3] - 46]].map((p) => U.star(p[0], p[1], 20, '#fff7c2', '#f0b730', 3)).join('') },
    { id: 'photo', n: 'しゃしん', draw: (vb) => `<path fill-rule="evenodd" fill="#fff" d="M${vb[0]},${vb[1]} h${vb[2]} v${vb[3]} h-${vb[2]}Z M${vb[0] + 26},${vb[1] + 26} v${vb[3] - 150} h${vb[2] - 52} v-${vb[3] - 150}Z"/>` +
        `<text x="${vb[0] + vb[2] / 2}" y="${vb[1] + vb[3] - 54}" text-anchor="middle" font-size="52" font-weight="bold" fill="#ff7fb0" font-family="'UD デジタル 教科書体 NK-B','Hiragino Maru Gothic ProN','Yu Gothic UI',sans-serif">だいすき</text>` +
        U.heart(vb[0] + 110, vb[1] + vb[3] - 72, 16, '#ff9ec6') + U.heart(vb[0] + vb[2] - 110, vb[1] + vb[3] - 72, 16, '#ff9ec6') + U.star(vb[0] + 60, vb[1] + vb[3] - 50, 10, '#ffe37a', '#ffe37a', 2) + U.star(vb[0] + vb[2] - 60, vb[1] + vb[3] - 50, 10, '#ffe37a', '#ffe37a', 2) },
  ];
  A.frame = (i, vb) => (A.FRAMES[i] ? A.FRAMES[i].draw(vb) : '');

  /* ================= スタンプ（原点中心・だいたい半径40） ================= */
  const TXT = (t, sz, fill, st) => `<text x="0" y="${f(sz * 0.36)}" text-anchor="middle" font-size="${sz}" font-weight="bold" fill="${fill}" stroke="${st}" stroke-width="6" paint-order="stroke" stroke-linejoin="round" font-family="'UD デジタル 教科書体 NK-B','Hiragino Maru Gothic ProN','Yu Gothic UI',sans-serif">${t}</text>`;
  A.STAMPS = [
    { id: 'heart', n: 'ハート', draw: () => U.heart(0, 0, 32, '#ff6fa5', '#fff', 6) + P('M-18,-12 q4,-10 14,-10', 'none', '#fff', 6, 'opacity=".8"') },
    { id: 'star', n: 'ほし', draw: () => U.star(0, 2, 36, '#ffe14a', '#fff', 7) + U.star(0, 2, 30, '#ffe14a', '#f0b020', 2.5) + Ci(-9, -8, 4, '#fff', 'opacity=".8"') },
    { id: 'bow', n: 'リボン', draw: () => U.bow(0, -4, 84, 50, '#ff8fc0', '#d9508a', { sw: 3, tails: 40, knot: '#ff5c93' }) },
    { id: 'flower', n: 'おはな', draw: () => U.flower(0, 0, 38, '#ffffff', '#ffd24a', 6, '#ff9ec6') + U.flower(0, 0, 30, '#ffc2dc', '#ffd24a', 6) },
    { id: 'kira', n: 'キラキラ', draw: () => U.sparkle(-6, 4, 32, '#fff7c2') + U.sparkle(-6, 4, 24, '#fff') + U.sparkle(26, -22, 14, '#fff') + U.sparkle(22, 26, 9, '#fff7c2') },
    { id: 'note', n: 'おんぷ', draw: () => P('M-12,22 V-26 L26,-34 V12', 'none', '#fff', 14) + Ci(-22, 22, 14, '#fff') + Ci(16, 12, 14, '#fff') + P('M-12,22 V-26 L26,-34 V12 M-12,-14 L26,-22', 'none', '#8a5cf0', 7) + El(-22, 22, 11, 9, '#8a5cf0') + El(16, 12, 11, 9, '#8a5cf0') },
    { id: 'cherry', n: 'さくらんぼ', draw: () => P('M-16,10 C-12,-14 0,-28 12,-34 C10,-18 14,-4 18,8', 'none', '#4fae62', 5) + P('M12,-34 q16,-4 22,8 q-14,6 -22,-8Z', '#8fdc9a', '#4fae62', 2) + Ci(-18, 18, 17, '#f2485c', 'stroke="#fff" stroke-width="4"') + Ci(18, 16, 17, '#f2485c', 'stroke="#fff" stroke-width="4"') + Ci(-24, 12, 4, '#fff', 'opacity=".8"') + Ci(12, 10, 4, '#fff', 'opacity=".8"') },
    { id: 'rainbow', n: 'にじ', draw: () => ['#ff8fa8', '#ffc46b', '#fff07a', '#8fe6a8', '#8fc8ff'].map((c, i) => `<path d="M${-36 + i * 6.5},16 a${36 - i * 6.5},${36 - i * 6.5} 0 0 1 ${72 - i * 13},0" fill="none" stroke="${c}" stroke-width="7"/>`).join('') + cloud(-30, 14, 0.42, '#fff') + cloud(30, 14, 0.42, '#fff') },
    { id: 'paw', n: 'にくきゅう', draw: () => El(0, 12, 22, 18, '#ffb3d1', 'stroke="#fff" stroke-width="5"') + [[-24, -10], [-9, -24], [9, -24], [24, -10]].map((p) => El(p[0], p[1], 9, 11, '#ffb3d1', 'stroke="#fff" stroke-width="5"')).join('') + El(0, 12, 22, 18, '#ff9ec6') + [[-24, -10], [-9, -24], [9, -24], [24, -10]].map((p) => El(p[0], p[1], 9, 11, '#ff9ec6')).join('') },
    { id: 'kawaii', n: 'かわいい', draw: () => `<rect x="-62" y="-26" width="124" height="52" rx="26" fill="#fff" stroke="#ff9ec6" stroke-width="4"/>` + TXT('かわいい', 26, '#ff5c93', '#fff') },
    { id: 'suki', n: 'すき', draw: () => U.heart(0, 2, 38, '#fff', '#ff9ec6', 4) + TXT('すき', 26, '#ff5c93', '#fff') },
    /* ごほうびスタンプ（おだいクリアで ふえる） */
    { id: 'r_princess', n: 'ティアラ', reward: 'princess', draw: () => P('M-38,22 L-32,-8 L-18,8 L-8,-22 L0,2 L8,-22 L18,8 L32,-8 L38,22Z', '#ffd24a', '#fff', 8) + P('M-38,22 L-32,-8 L-18,8 L-8,-22 L0,2 L8,-22 L18,8 L32,-8 L38,22Z', '#ffd24a', '#d99a18', 2.5) + U.gem(0, 12, 6, '#ff5c93') + U.gem(-20, 14, 4, '#7fd4ff') + U.gem(20, 14, 4, '#7fd4ff') + U.sparkle(26, -24, 8, '#fff') },
    { id: 'r_idol', n: 'マイク', reward: 'idol', draw: () => `<g transform="rotate(30)">` + R(-7, -4, 14, 44, '#5a5278', 'rx="6" stroke="#fff" stroke-width="5"') + Ci(0, -18, 20, '#dfe3f0', 'stroke="#fff" stroke-width="5"') + R(-7, -4, 14, 44, '#5a5278', 'rx="6"') + Ci(0, -18, 18, '#dfe3f0', 'stroke="#8a90a8" stroke-width="2"') + R(-9, 0, 18, 8, '#ff7fb0', 'rx="3"') + P('M-14,-22 q14,-8 28,0 M-15,-12 q15,8 30,0', 'none', '#8a90a8', 1.5) + '</g>' + U.star(30, -24, 9, '#ffe14a', '#ffe14a', 2) + U.sparkle(-30, 6, 8, '#fff7c2') },
    { id: 'r_fairy', n: 'ちょうちょ', reward: 'fairy', draw: () => El(-18, -10, 20, 17, '#c79cff', 'stroke="#fff" stroke-width="4"') + El(18, -10, 20, 17, '#c79cff', 'stroke="#fff" stroke-width="4"') + El(-13, 16, 14, 12, '#ff9ec6', 'stroke="#fff" stroke-width="4"') + El(13, 16, 14, 12, '#ff9ec6', 'stroke="#fff" stroke-width="4"') + Ci(-20, -12, 6, '#fff', 'opacity=".8"') + Ci(20, -12, 6, '#fff', 'opacity=".8"') + R(-3.5, -20, 7, 42, '#6a4a8a', 'rx="3.5"') + P('M-2,-20 q-6,-12 -12,-14 M2,-20 q6,-12 12,-14', 'none', '#6a4a8a', 2.5) },
    { id: 'r_magic', n: 'つきとほし', reward: 'magic', draw: () => P('M10,-36 A36,36 0 1 0 34,18 A28,28 0 1 1 10,-36Z', '#ffe680', '#fff', 7) + P('M10,-36 A36,36 0 1 0 34,18 A28,28 0 1 1 10,-36Z', '#ffe680', '#e0a820', 2.5) + U.star(22, -10, 12, '#fff', '#b184f5', 2.5) + U.sparkle(-34, -28, 7, '#fff') },
    { id: 'r_matsuri', n: 'きんぎょ', reward: 'matsuri', draw: () => P('M14,0 L40,-20 L36,0 L40,20Z', '#ff8a70', '#fff', 6) + El(-6, 0, 28, 19, '#ff6f5c', 'stroke="#fff" stroke-width="6"') + P('M14,0 L40,-20 L36,0 L40,20Z', '#ff8a70', '#d9503a', 2) + El(-6, 0, 28, 19, '#ff6f5c', 'stroke="#d9503a" stroke-width="2"') + Ci(-20, -4, 5, '#fff') + Ci(-21, -4, 2.5, '#3b2430') + P('M-4,-8 q8,8 0,16', 'none', '#d9503a', 2) + Ci(-38, -22, 4, '#bfe9ff') + Ci(-32, -32, 2.5, '#bfe9ff') },
    { id: 'r_beach', n: 'ひまわり', reward: 'beach', draw: () => { let s = ''; for (let i = 0; i < 12; i++) { const a = (i / 12) * 360; s += `<ellipse cx="0" cy="-27" rx="8" ry="14" fill="#ffd24a" stroke="#f0a020" stroke-width="1.5" transform="rotate(${a})"/>`; } return Ci(0, 0, 40, '#fff') + s + Ci(0, 0, 16, '#b5784a', 'stroke="#8a5a2c" stroke-width="2"') + Ci(-5, -5, 2, '#8a5a2c') + Ci(5, 2, 2, '#8a5a2c') + Ci(-3, 6, 2, '#8a5a2c'); } },
    { id: 'r_cool', n: 'かみなり', reward: 'cool', draw: () => P('M8,-40 L-24,6 L-4,6 L-12,40 L26,-10 L4,-10Z', '#ffe14a', '#fff', 8) + P('M8,-40 L-24,6 L-4,6 L-12,40 L26,-10 L4,-10Z', '#ffe14a', '#3a8fe8', 3) },
    { id: 'r_neko', n: 'ねこ', reward: 'neko', draw: () => P('M-30,-10 L-34,-40 L-10,-26Z M30,-10 L34,-40 L10,-26Z', '#fff6ea', '#d2ab90', 3) + El(0, 4, 36, 30, '#fff6ea', 'stroke="#d2ab90" stroke-width="3"') + El(-13, 0, 4.5, 6, '#3b2430') + El(13, 0, 4.5, 6, '#3b2430') + P('M-4,9 h8 l-4,4.5Z', '#ff8fb0') + P('M-8,17 q4,5 8,0 q4,5 8,0', 'none', '#3b2430', 2) + El(-23, 12, 6, 4, '#ff9cb8', 'opacity=".7"') + El(23, 12, 6, 4, '#ff9cb8', 'opacity=".7"') },
    { id: 'r_yume', n: 'ユニコーン', reward: 'yume', draw: () => cloud(0, 12, 0.8, '#fff') + P('M-7,-8 L0,-44 L7,-8Z', '#ffd24a', '#d99a18', 2) + P('M-4,-20 l8,-3 M-3,-30 l6,-2', 'none', '#d99a18', 1.5) + Ci(-22, 4, 9, '#ffb0d8') + Ci(22, 4, 9, '#9fd8ff') + Ci(0, -4, 9, '#cdb0ff') + U.star(30, -24, 7, '#ffe14a', '#ffe14a', 2) },
    { id: 'r_winter', n: 'ゆきのけっしょう', reward: 'winter', draw: () => { let s = Ci(0, 0, 40, '#fff', 'opacity=".9"'); for (let i = 0; i < 6; i++) s += `<g transform="rotate(${i * 60})">${P('M0,0 V-34 M0,-22 l-8,-8 M0,-22 l8,-8 M0,-12 l-6,-6 M0,-12 l6,-6', 'none', '#6fb8f0', 4)}</g>`; return s + Ci(0, 0, 5, '#bfe4ff'); } },
    { id: 'r_ballet', n: 'トウシューズ', reward: 'ballet', draw: () => P('M-12,-34 L16,-6 M14,-34 L-12,-8', 'none', '#fff', 9) + P('M-12,-34 L16,-6 M14,-34 L-12,-8', 'none', '#ff9ec6', 4) + P('M-20,4 C-20,-10 -8,-10 -4,-4 C2,2 8,2 12,-4 C16,-10 26,-10 26,4 C26,26 14,36 2,36 C-10,36 -20,26 -20,4Z', '#ffc2dc', '#fff', 6) + P('M-20,4 C-20,-10 -8,-10 -4,-4 C2,2 8,2 12,-4 C16,-10 26,-10 26,4 C26,26 14,36 2,36 C-10,36 -20,26 -20,4Z', '#ffc2dc', '#e889b0', 2.5) + U.bow(2, -36, 26, 15, '#ff9ec6', '#e06a9c', { sw: 1.6 }) },
    { id: 'r_school', n: 'ランドセル', reward: 'school', draw: () => P('M-30,-20 Q-30,-38 -12,-38 H12 Q30,-38 30,-20 V28 Q30,38 20,38 H-20 Q-30,38 -30,28Z', '#f2485c', '#fff', 7) + P('M-30,-20 Q-30,-38 -12,-38 H12 Q30,-38 30,-20 V28 Q30,38 20,38 H-20 Q-30,38 -30,28Z', '#f2485c', '#b8182e', 2.5) + P('M-30,-6 Q0,10 30,-6 V-20 Q30,-38 12,-38 H-12 Q-30,-38 -30,-20Z', '#ff6f80', '#b8182e', 2.5) + R(-7, -4, 14, 16, '#ffd24a', 'rx="4" stroke="#c9860f" stroke-width="2"') + P('M-18,-30 q6,-4 14,-4', 'none', '#fff', 4, 'opacity=".6"') },
    { id: 'r_casual', n: 'にこちゃん', reward: 'casual', draw: () => Ci(0, 0, 36, '#ffe14a', 'stroke="#fff" stroke-width="7"') + Ci(0, 0, 33, '#ffe14a', 'stroke="#f0a820" stroke-width="2.5"') + El(-12, -6, 4.5, 6.5, '#5a3a2a') + El(12, -6, 4.5, 6.5, '#5a3a2a') + P('M-16,8 Q0,26 16,8', 'none', '#5a3a2a', 4) + El(-21, 8, 6, 4, '#ff9c9c', 'opacity=".8"') + El(21, 8, 6, 4, '#ff9c9c', 'opacity=".8"') },
  ];
  A.stampIndex = {}; A.STAMPS.forEach((s) => { A.stampIndex[s.id] = s; });
  A.stamp = (id, x, y, sc, rot) => { const s = A.stampIndex[id]; return s ? `<g transform="translate(${f(x)},${f(y)}) rotate(${f(rot || 0)}) scale(${f(sc || 1)})">${s.draw()}</g>` : ''; };
  A.stampSvg = (id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-70 -50 140 100">${A.stampIndex[id].draw()}</svg>`;

  /* ================= マスコット「キララ」 ================= */
  A.mascot = function (mood) {
    const d = U.starPath(60, 64, 44, 25);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">`;
    s += El(22, 60, 14, 9, '#fff', 'stroke="#cfe0f5" stroke-width="2" transform="rotate(-24 22 60)"') + El(98, 60, 14, 9, '#fff', 'stroke="#cfe0f5" stroke-width="2" transform="rotate(24 98 60)"');
    s += P(d, '#f0b020', '#f0b020', 16) + P(d, '#ffe14a', '#ffe14a', 11);
    s += P('M40,44 q8,-10 20,-11', 'none', '#fff', 5, 'opacity=".7"');
    if (mood === 'happy') s += P('M43,62 q5,-7 10,0 M67,62 q5,-7 10,0', 'none', '#5a3a2a', 3.4);
    else s += El(48, 62, 4.6, 6, '#5a3a2a') + El(72, 62, 4.6, 6, '#5a3a2a') + Ci(46.5, 60, 1.7, '#fff') + Ci(70.5, 60, 1.7, '#fff');
    s += El(40, 72, 6, 3.6, '#ff9cb8', 'opacity=".8"') + El(80, 72, 6, 3.6, '#ff9cb8', 'opacity=".8"');
    s += mood === 'happy' ? P('M53,72 q7,10 14,0Z', '#e8506e', '#5a3a2a', 2) : P('M54,73 q6,6 12,0', 'none', '#5a3a2a', 3);
    s += U.bow(84, 30, 26, 16, '#ff7fb0', '#d9508a', { sw: 1.6 });
    return s + '</svg>';
  };

  /* ================= メイクどうぐ（先端が原点、右下へのびる） ================= */
  A.tool = function (kind, color, rotO) {
    color = color || '#ff7fab';
    const wrap = (s, rot) => `<g transform="rotate(${rotO != null ? rotO : rot == null ? -38 : rot})">${s}</g>`;
    switch (kind) {
      case 'lip': return wrap(P('M-6,3 L-6,20 L6,20 L6,-5Z', color, U.dark(color, 0.3), 1.5) + R(-7.5, 20, 15, 12, '#ffd24a', 'stroke="#c9860f" stroke-width="1.5" rx="2"') + R(-9, 32, 18, 36, '#ff9ec6', 'stroke="#d9508a" stroke-width="1.5" rx="4"') + R(-5, 36, 4, 26, '#fff', 'opacity=".5" rx="2"'));
      case 'brush': return wrap(El(0, 4, 13, 15, color, `stroke="${U.dark(color, 0.25)}" stroke-width="1.5"`) + P('M-6,-4 q2,8 0,16 M0,-8 v22 M6,-4 q-2,8 0,16', 'none', '#fff', 1.4, 'opacity=".6"') + R(-8, 17, 16, 12, '#ffd24a', 'stroke="#c9860f" stroke-width="1.5" rx="2"') + R(-6, 29, 12, 50, '#c4a7ff', 'stroke="#8a5cf0" stroke-width="1.5" rx="6"'));
      case 'tip': return wrap(El(0, 3, 6.5, 9, color, `stroke="${U.dark(color, 0.25)}" stroke-width="1.5"`) + R(-3.5, 11, 7, 8, '#ffd24a', 'stroke="#c9860f" stroke-width="1.2"') + R(-3, 19, 6, 52, '#8ed4ff', 'stroke="#3a8fe8" stroke-width="1.5" rx="3"'));
      case 'mascara': return wrap(P('M-4,-6 h8 M-5,-1 h10 M-5,4 h10 M-5,9 h10 M-4,14 h8', 'none', '#3b2430', 3) + R(-1.5, -8, 3, 30, '#3b2430') + R(-6, 22, 12, 46, '#40395a', 'stroke="#262040" stroke-width="1.5" rx="4"') + R(-6, 22, 12, 8, '#ffd24a'));
      case 'pencil': return wrap(P('M0,-2 L-5,12 L5,12Z', '#7a4a2a', '#5a3a2a', 1.2) + R(-5, 12, 10, 56, color, `stroke="${U.dark(color, 0.3)}" stroke-width="1.5"`) + R(-5, 60, 10, 8, '#ffd24a', 'stroke="#c9860f" stroke-width="1.2"'));
      case 'puff': return wrap(El(0, 0, 22, 17, color, `stroke="${U.dark(color, 0.22)}" stroke-width="2"`) + El(-6, -5, 8, 4, '#fff', 'opacity=".5"') + U.bow(0, 16, 22, 12, '#ff9ec6', '#d9508a', { sw: 1.4 }), 0);
      default: return U.sparkle(0, 0, 14, '#fff');
    }
  };
})(window);
