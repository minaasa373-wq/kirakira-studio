/* きらきら☆おしゃれスタジオ — アクセサリー・ペット */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f, ell = U.ell;
  const C = A.scheme;
  const GOLD = '#ffd24a', GOLDL = '#c9860f';
  const goldDefs = (id) => `<defs>${U.lin(id, [['#fff3b0'], ['#ffd24a'], ['#f2a41e']])}</defs>`;
  const two = (d, cOut, wOut, cIn, wIn) => P(d, 'none', cOut, wOut) + P(d, 'none', cIn, wIn);
  const fluffy = (cx, cy, r, n) => {
    let d = '', prev = null;
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2, p = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      if (!prev) d += `M${f(p[0])},${f(p[1])}`;
      else { const am = ((i - 0.5) / n) * Math.PI * 2; d += `Q${f(cx + r * 1.32 * Math.cos(am))},${f(cy + r * 1.32 * Math.sin(am))} ${f(p[0])},${f(p[1])}`; }
      prev = p;
    }
    return d + 'Z';
  };
  A.fluffy = fluffy;

  /* ================= あたま ================= */
  A.HEADS = [
    { id: 'none', n: 'なし' },
    { id: 'tiara', n: 'ティアラ', tags: ['princess', 'ballet', 'yume'], tb: [220, 40, 160, 110],
      draw(c) {
        const id = U.uid('gd');
        let s = goldDefs(id) + P('M246,121 L253,95 L268,111 L283,80 L293,105 L300,62 L307,105 L317,80 L332,111 L347,95 L354,121 Q300,101 246,121Z', `url(#${id})`, GOLDL, 2.2);
        s += [[253, 93], [283, 78], [300, 60], [317, 78], [347, 93]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4.2" fill="#fff" stroke="${GOLDL}" stroke-width="1.4"/>`).join('');
        s += U.heart(300, 95, 7.5, c.a, c.al, 1.4) + U.gem(277, 105, 4.2, '#7fd4ff') + U.gem(323, 105, 4.2, '#7fd4ff') + U.sparkle(314, 70, 5, '#fff', 0.95);
        return { front: s };
      } },
    { id: 'ribbon', n: 'おおきなリボン', tags: ['yume', 'idol', 'casual', 'school'], tb: [190, 30, 220, 130],
      draw(c) { return { front: c.defs + U.bow(300, 98, 176, 94, c.M, c.ml, { sw: 2.5, knot: c.a }) + U.sparkle(244, 84, 5, '#fff', 0.8) }; } },
    { id: 'band', n: 'カチューシャ', tags: ['school', 'casual', 'idol', 'yume'], tb: [170, 60, 260, 170],
      draw(c) {
        const d = 'M189,214 C186,134 244,99 300,99 C356,99 414,134 411,214';
        return { front: c.defs + two(d, c.ml, 10, c.m, 6.5) + `<g transform="rotate(26 356 116)">${U.bow(356, 112, 60, 36, c.M, c.ml, { sw: 2, knot: c.a })}</g>` };
      } },
    { id: 'neko', n: 'ねこみみ', tags: ['neko', 'cool', 'idol'], tb: [180, 40, 240, 140],
      draw(c) {
        const ear = P('M207,152 C202,116 207,86 219,64 C246,80 268,104 276,130 C252,130 226,138 207,152Z', c.M, c.ml) +
          P('M217,136 C214,113 217,95 223,82 C241,94 255,109 261,124 C245,125 229,129 217,136Z', '#ffc2d8');
        return { front: c.defs + two('M204,156 Q300,80 396,156', c.ml, 9.5, c.m, 6) + U.both(ear) };
      } },
    { id: 'usa', n: 'うさみみ', tags: ['yume', 'idol', 'magic'], tb: [190, 10, 220, 150],
      draw(c) {
        const ear = `<g transform="rotate(-11 250 112)">${P(ell(250, 68, 17, 46), c.M, c.ml)}${P(ell(250, 72, 8.5, 33), '#ffc2d8')}</g>`;
        return { front: c.defs + two('M204,156 Q300,80 396,156', c.ml, 9.5, c.m, 6) + U.both(ear) };
      } },
    { id: 'flower', n: 'はなかんむり', tags: ['fairy', 'princess', 'beach', 'yume'], tb: [170, 70, 260, 110],
      draw(c) {
        let s = P('M198,156 Q300,58 402,156', 'none', '#5fc872', 5), fl = '';
        const cols = [c.m, '#ffffff', c.a, '#fff3a8', c.m, '#ffffff', c.a];
        for (let i = 0; i < 7; i++) {
          const t = i / 6, x = 200 + 200 * t, y = 154 - 47 * Math.sin(Math.PI * t), r = 13 + 4 * Math.sin(Math.PI * t);
          s += P(`M${f(x + 12)},${f(y + 2)} q10,-8 18,-2 q-8,8 -18,2Z`, '#8fdc9a', '#4fae62', 1.2);
          fl += U.flower(x, y, r, cols[i], cols[i] === '#fff3a8' ? '#ffb347' : '#ffe27a', 5, U.line(cols[i]));
        }
        return { front: s + fl };
      } },
    { id: 'beret', n: 'ベレーぼう', tags: ['casual', 'winter', 'school', 'cool'], tb: [160, 30, 280, 140],
      draw(c) {
        let s = c.defs + P('M312,56 q2,-11 9,-13', 'none', c.ml, 5) + P('M188,140 C166,84 246,46 320,54 C392,62 436,106 412,148 C378,121 262,113 188,140Z', c.M, c.ml);
        s += P('M188,140 C262,113 378,121 412,148', 'none', U.dark(c.m, 0.2), 6) + P('M236,82 q30,-18 70,-16', 'none', '#fff', 5, 'opacity=".35"');
        return { front: s };
      } },
    { id: 'pins', n: 'ほしのピン', tags: ['idol', 'yume', 'casual', 'magic'], tb: [180, 140, 110, 100],
      draw(c) {
        return { front: P('M206,196 L236,182 M208,208 L238,196', 'none', c.al, 4.5) + P('M206,196 L236,182 M208,208 L238,196', 'none', c.a, 2.5) +
          U.star(226, 180, 14, GOLD, '#e0a020', 2.4) + U.star(246, 204, 8.5, c.m, c.ml, 1.6) + U.sparkle(210, 168, 4, '#fff', 0.9) };
      } },
    { id: 'witch', n: 'まじょのぼうし', tags: ['magic'], tb: [130, 10, 340, 150],
      draw(c) {
        let s = c.defs + P('M146,119 C146,101 214,91 300,91 C386,91 454,101 454,119 C454,137 386,145 300,145 C214,145 146,137 146,119Z', c.M, c.ml);
        s += P('M222,113 C246,64 280,32 324,25 C315,38 331,43 346,36 C340,60 357,90 378,113 C340,126 260,126 222,113Z', c.M, c.ml);
        s += P('M228,102 C262,116 338,116 372,102 L378,113 C340,127 260,127 222,113Z', c.a, c.al, 2) + U.star(300, 114, 10, GOLD, '#e0a020', 2);
        s += U.sparkle(268, 66, 5, '#fff', 0.85) + U.sparkle(318, 80, 4, '#fff', 0.85);
        return { front: s };
      } },
    { id: 'crown', n: 'おうかん', tags: ['princess', 'cool'], tb: [280, 40, 130, 90],
      draw(c) {
        const id = U.uid('gd');
        let s = goldDefs(id) + `<g transform="rotate(13 346 100)">` + P('M316,112 L320,76 L333,94 L346,66 L359,94 L372,76 L376,112Z', `url(#${id})`, GOLDL, 2.2) +
          P('M316,104 h60 v10 q-30,7 -60,0Z', c.a, c.al, 1.8);
        s += [[320, 74], [346, 64], [372, 74]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff" stroke="${GOLDL}" stroke-width="1.4"/>`).join('');
        s += U.gem(346, 92, 4.5, '#7fd4ff') + U.gem(330, 109, 2.6, '#fff') + U.gem(346, 110.5, 2.6, '#fff') + U.gem(362, 109, 2.6, '#fff') + '</g>';
        return { front: s };
      } },
    { id: 'muff', n: 'みみあて', tags: ['winter'], tb: [140, 80, 320, 230],
      draw(c) {
        const d = 'M184,250 C178,150 240,93 300,93 C360,93 422,150 416,250';
        return { front: c.defs + two(d, c.al, 10, c.a, 6.5) + U.both(P(fluffy(186, 266, 24, 9), c.M, c.ml, 2.2) + `<circle cx="180" cy="258" r="6" fill="#fff" opacity=".45"/>`) };
      } },
    { id: 'halo', n: 'てんしのわ', tags: ['fairy', 'yume'], tb: [220, 30, 160, 80],
      draw() {
        return { front: `<ellipse cx="300" cy="68" rx="58" ry="13" fill="none" stroke="#f0b730" stroke-width="10"/><ellipse cx="300" cy="68" rx="58" ry="13" fill="none" stroke="#ffe680" stroke-width="6.5"/>` +
          `<path d="M250,62 q20,-8 46,-8" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>` + U.sparkle(368, 56, 6, '#fff7c2') + U.sparkle(236, 80, 4, '#fff7c2') };
      } },
    { id: 'straw', n: 'むぎわらぼうし', tags: ['beach', 'fairy', 'casual'], tb: [130, 30, 340, 140],
      draw(c) {
        let s = c.defs + P('M140,131 C140,109 212,99 300,99 C388,99 460,109 460,131 C460,151 388,159 300,159 C212,159 140,151 140,131Z', '#f7d98f', '#c99a45');
        s += P('M214,125 C214,71 252,45 300,45 C348,45 386,71 386,125 C350,137 250,137 214,125Z', '#f7d98f', '#c99a45');
        s += P('M232,70 q68,-22 136,0 M222,92 q78,-20 156,0 M160,138 q140,26 280,0', 'none', '#c99a45', 1.4, 'opacity=".45"');
        s += P('M215,106 C250,120 350,120 385,106 L386,125 C350,139 250,139 214,125Z', c.M, c.ml, 2) + U.bow(376, 124, 40, 24, c.M, c.ml, { sw: 1.8, tails: 22 });
        return { front: s };
      } },
    { id: 'elf', n: 'エルフのみみ', tags: ['magic', 'fairy'], tb: [100, 180, 400, 150],
      draw(c, k) {
        k = k || { c: '#FDD9C0', line: '#c08a80', shade: '#f0b0a8' };
        return { front: U.both(P('M203,250 C178,247 152,236 128,212 C135,250 158,280 201,292Z', k.c, k.line, 2.5) + P('M190,262 C172,258 158,250 146,238', 'none', k.shade, 2.5)) };
      } },
  ];

  /* ================= めがね ================= */
  const temples = (col) => U.both(P('M221,262 L199,256', 'none', col, 3.2));
  A.GLASSES = [
    { id: 'none', n: 'なし' },
    { id: 'round', n: 'まるめがね', tags: ['school', 'casual', 'magic'], tb: [190, 220, 220, 100],
      draw() {
        const c = '#9a5f3a';
        return temples(c) + P('M281,262 Q300,253 319,262', 'none', c, 3.2) + U.both(`<circle cx="250" cy="267" r="31" fill="#ffffff" fill-opacity=".14" stroke="${c}" stroke-width="3.6"/>` + P('M232,252 q6,-8 16,-10', 'none', '#fff', 3, 'opacity=".8"'));
      } },
    { id: 'heart', n: 'ハートサングラス', tags: ['idol', 'beach', 'yume', 'cool'], tb: [190, 220, 220, 100],
      draw() {
        const c = '#ff4f8f';
        return temples(c) + P('M284,258 Q300,250 316,258', 'none', c, 3.6) + U.both(P(U.heartPath(249, 268, 27), '#ff8fc0', c, 3.6, 'fill-opacity=".6"') + P('M228,256 q5,-8 13,-7', 'none', '#fff', 3.2, 'opacity=".85"'));
      } },
    { id: 'star', n: 'ほしサングラス', tags: ['idol', 'cool', 'magic'], tb: [190, 220, 220, 100],
      draw() {
        const c = '#f0a81e';
        return temples(c) + P('M282,262 Q300,256 318,262', 'none', c, 3.6) + U.both(P(U.starPath(249, 268, 37, 20), '#ffe27a', c, 3.6, 'fill-opacity=".6"') + P('M238,258 q4,-6 10,-6', 'none', '#fff', 3, 'opacity=".85"'));
      } },
    { id: 'cool', n: 'サングラス', tags: ['cool', 'beach'], tb: [190, 220, 220, 100],
      draw() {
        const c = '#2e2a44';
        return temples(c) + P('M283,256 Q300,250 317,256', 'none', c, 4) + U.both(P('M216,249 L283,249 Q288,250 287,258 C284,284 270,293 252,293 C232,293 219,284 214,258 Q213,250 216,249Z', '#4a4468', c, 3, 'fill-opacity=".86"') +
          P('M226,258 l12,-5 M232,266 l18,-8', 'none', '#fff', 3, 'opacity=".55"'));
      } },
  ];

  /* ================= みみ（イヤリング） ================= */
  A.EARS = [
    { id: 'none', n: 'なし' },
    { id: 'pearl', n: 'パール', tags: ['princess', 'ballet'], tb: [168, 262, 60, 60], draw: () => U.both(U.gem(198, 291, 6.5, '#fffaf2', '#d9b0c4')) },
    { id: 'heart', n: 'ハート', tags: ['yume', 'idol'], tb: [168, 262, 60, 60], draw: () => U.both(P('M198,286 v7', 'none', GOLDL, 1.8) + U.heart(198, 301, 7.5, '#ff5a8f', '#d93a70', 1.5) + `<circle cx="195" cy="298" r="1.6" fill="#fff"/>`) },
    { id: 'star', n: 'ほし', tags: ['idol', 'magic', 'cool'], tb: [168, 262, 60, 60], draw: () => U.both(P('M198,286 v8', 'none', GOLDL, 1.8) + U.star(198, 304, 8.5, GOLD, '#e0a020', 1.6)) },
    { id: 'ribbon', n: 'リボン', tags: ['yume', 'school'], tb: [168, 262, 60, 60], draw: () => U.both(U.bow(198, 293, 24, 15, '#ff7fb0', '#d9508a', { sw: 1.5 })) },
    { id: 'hoop', n: 'わっか', tags: ['cool', 'beach'], tb: [168, 262, 60, 60], draw: () => U.both(`<circle cx="198" cy="298" r="9.5" fill="none" stroke="${GOLDL}" stroke-width="4.6"/><circle cx="198" cy="298" r="9.5" fill="none" stroke="${GOLD}" stroke-width="2.6"/>`) },
    { id: 'flower', n: 'おはな', tags: ['fairy', 'beach', 'matsuri'], tb: [168, 262, 60, 60], draw: () => U.both(U.flower(198, 293, 9, '#ffffff', GOLD, 5, '#f0a0c0')) },
    { id: 'drop', n: 'しずく', tags: ['princess', 'fairy', 'winter'], tb: [168, 262, 60, 60], draw: () => U.both(P('M198,286 v5', 'none', GOLDL, 1.8) + P('M198,291 C192,300 191,308 198,309 C205,308 204,300 198,291Z', '#7fd4ff', '#3a8fe8', 1.5) + `<circle cx="196" cy="302" r="1.6" fill="#fff"/>`) },
  ];

  /* ================= くび ================= */
  const neckArc = (n, x0, cy, fn) => { let s = ''; for (let i = 0; i <= n; i++) { const t = i / n, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * 300 + t * t * (600 - x0), y = (1 - t) * (1 - t) * 371 + 2 * (1 - t) * t * cy + t * t * 371; s += fn(x, y, i); } return s; };
  A.NECKS = [
    { id: 'none', n: 'なし' },
    { id: 'pearl', n: 'パール', tags: ['princess', 'ballet'], tb: [250, 345, 100, 70], draw: () => neckArc(9, 279, 408, (x, y) => U.gem(x, y, 4.3, '#fffaf2', '#d9b0c4')) },
    { id: 'heart', n: 'ハート', tags: ['yume', 'idol', 'casual'], tb: [250, 345, 100, 70], draw: () => P('M281,370 Q300,402 319,370', 'none', '#e0a020', 1.8) + U.heart(300, 392, 8, '#ff5a8f', '#d93a70', 1.5) + `<circle cx="296.5" cy="389" r="1.8" fill="#fff"/>` },
    { id: 'choker', n: 'すずチョーカー', tags: ['neko', 'cool'], tb: [250, 340, 100, 70],
      draw: () => P('M287,356 Q300,363 313,356 L313,367 Q300,374 287,367Z', '#40395a', '#262040', 1.6) + `<circle cx="300" cy="374" r="6.5" fill="${GOLD}" stroke="${GOLDL}" stroke-width="1.6"/>` + P('M296,375 h8 M300,375 v4', 'none', GOLDL, 1.5) },
    { id: 'tie', n: 'リボンタイ', tags: ['school', 'idol'], tb: [250, 350, 100, 80], draw: () => U.bow(300, 383, 48, 28, '#f2485c', '#b8182e', { tails: 30, sw: 2 }) },
    { id: 'scarf', n: 'マフラー', tags: ['winter'], tb: [240, 330, 120, 140],
      draw() {
        const c = '#ff7f9f', l = '#d9507a';
        const W = 'M273,349 C290,360 310,360 327,349 C333,362 333,375 329,384 C310,396 290,396 271,384 C267,375 267,362 273,349Z', E = 'M304,385 L329,381 L335,446 L313,450Z';
        const id = U.uid('sc');
        return P(E, c, l) + `<defs><clipPath id="${id}"><path d="${E}"/><path d="${W}"/></clipPath></defs><g clip-path="url(#${id})">` +
          P('M300,426 h44 M300,436 h44 M260,372 q40,16 80,0', 'none', '#fff', 4, 'opacity=".9"') + '</g>' +
          P('M314,450 v9 M321,449 v9 M328,448 v9 M334,446 v9', 'none', l, 2.2) + P(W, c, l) + P('M276,366 q24,10 48,0', 'none', '#fff', 4, 'opacity=".9"') + P('M272,378 q28,14 56,2', 'none', l, 1.4, 'opacity=".5"');
      } },
    { id: 'star', n: 'まほうのペンダント', tags: ['magic', 'fairy'], tb: [250, 345, 100, 70],
      draw: () => P('M281,370 Q300,402 319,370', 'none', '#e0a020', 1.8) + U.star(300, 394, 10, GOLD, '#e0a020', 1.8) + U.gem(300, 395, 3.4, '#b184f5') + U.sparkle(313, 384, 3.5, '#fff', 0.9) },
    { id: 'lei', n: 'はなのレイ', tags: ['beach', 'fairy'], tb: [240, 345, 120, 90],
      draw: () => neckArc(7, 268, 436, (x, y, i) => U.flower(x, y, 9.5, ['#ff8fb8', '#fff3a8', '#ffffff', '#ffb25e'][i % 4], i % 4 === 1 ? '#ffb347' : '#ffe27a', 5, '#e89ab8')) },
  ];

  /* ================= て ================= */
  const fingers = (x, y, k) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.5" fill="${k.c}" stroke="${k.line}" stroke-width="2"/>`;
  A.HANDS = [
    { id: 'none', n: 'なし' },
    { id: 'wand', n: 'まほうのステッキ', tags: ['magic', 'fairy', 'princess', 'yume'], tb: [370, 370, 140, 210],
      draw(k) {
        return two('M388,566 L444,428', '#d9668a', 9, '#ffb0d0', 5.5) + U.bow(438, 442, 34, 20, '#ff8fc0', '#d9508a', { sw: 1.6, tails: 20 }) +
          U.star(451, 408, 29, '#ffe27a', '#e0a020', 3) + U.heart(451, 410, 8.5, '#ff7fb0', '#d9508a', 1.5) +
          U.sparkle(490, 386, 8, '#fff7c2') + U.sparkle(416, 382, 6, '#fff7c2') + U.sparkle(482, 440, 5, '#ffffff') + fingers(394, 548, k);
      } },
    { id: 'bag', n: 'ハートのバッグ', tags: ['yume', 'casual', 'idol', 'school', 'princess'], tb: [150, 530, 110, 130],
      draw(k) {
        return P('M197,548 C183,566 185,584 192,594 M213,548 C227,566 225,584 218,594', 'none', '#d93a70', 3.5) + U.heart(205, 614, 27, '#ff7fb0', '#d93a70', 2.5) +
          P('M178,606 Q205,624 232,606', 'none', '#d93a70', 1.8, 'opacity=".6"') + U.gem(205, 615, 5, GOLD, GOLDL) + P('M186,598 q4,-8 12,-9', 'none', '#fff', 3.5, 'opacity=".7"') + fingers(205, 549, k);
      } },
    { id: 'bouquet', n: 'はなたば', tags: ['fairy', 'princess', 'ballet'], tb: [140, 470, 110, 120],
      draw(k) {
        return P('M170,512 q-12,-12 -8,-26 q14,6 12,24Z M224,506 q10,-14 22,-12 q-2,14 -18,16Z', '#8fdc9a', '#4fae62', 1.4) + P('M214,568 L170,512 Q196,490 228,506Z', '#ffffff', '#e8b0c8', 2) +
          P('M190,538 l24,-22', 'none', '#f3c4d6', 1.6) + U.flower(182, 505, 12, '#ff8fb8', '#ffe27a') + U.flower(202, 494, 12, '#fff3a8', '#ffb347') + U.flower(220, 506, 11, '#c7a4ff', '#ffe27a') +
          U.flower(196, 514, 10, '#ffffff', '#ffd447', 5, '#f0b8cc') + U.bow(209, 556, 26, 15, '#ff7fb0', '#d9508a', { sw: 1.5, tails: 16 }) + fingers(206, 550, k);
      } },
    { id: 'balloon', n: 'ふうせん', tags: ['yume', 'casual', 'matsuri'], tb: [370, 280, 160, 290],
      draw(k) {
        return P('M397,546 C402,490 430,440 449,386', 'none', '#b8a8c0', 1.8) + P('M444,380 L456,380 L450,390Z', '#ff6f9f', '#d93a70', 1.5) +
          U.heart(452, 338, 42, '#ff7fa8', '#d93a70', 2.5) + P('M424,312 q6,-14 20,-14', 'none', '#fff', 5, 'opacity=".75"') + fingers(395, 548, k);
      } },
    { id: 'ice', n: 'アイス', tags: ['beach', 'casual', 'matsuri'], tb: [350, 450, 100, 130],
      draw(k) {
        return P('M383,522 L413,522 L398,568Z', '#f7c46c', '#c98a35', 2) + P('M388,528 l14,22 M398,524 l8,13 M408,528 l-14,22 M398,524 l-8,13', 'none', '#c98a35', 1.2, 'opacity=".6"') +
          `<circle cx="398" cy="511" r="17.5" fill="#ffb3d1" stroke="#e07fa8" stroke-width="2"/><circle cx="398" cy="489" r="14.5" fill="#a8ecd8" stroke="#5fc0a4" stroke-width="2"/>` +
          P('M398,476 q2,-8 8,-10', 'none', '#7a4a2a', 1.6) + `<circle cx="398" cy="474" r="5.5" fill="#f2485c" stroke="#b8182e" stroke-width="1.4"/><circle cx="391" cy="505" r="3" fill="#fff" opacity=".6"/>` + fingers(397, 552, k);
      } },
    { id: 'mic', n: 'マイク', tags: ['idol'], tb: [360, 460, 100, 120],
      draw(k) {
        return two('M396,562 L410,508', '#262040', 11, '#5a5278', 7) + two('M408,514 L410,506', '#d9508a', 12, '#ff8fc0', 8) +
          `<circle cx="414" cy="492" r="15" fill="#dfe3f0" stroke="#8a90a8" stroke-width="2"/>` + P('M402,488 q12,-6 24,0 M401,496 q13,6 26,0 M409,479 q-4,13 2,27 M419,479 q4,13 -2,27', 'none', '#8a90a8', 1.2) +
          U.sparkle(438, 474, 6, '#fff7c2') + U.star(446, 500, 5, '#ffd447', '#e0a020', 1) + fingers(397, 548, k);
      } },
    { id: 'uchiwa', n: 'うちわ', tags: ['matsuri'], tb: [350, 430, 130, 150],
      draw(k) {
        return two('M396,564 L404,526', '#8a5a2c', 7, '#d9a05c', 4) + `<circle cx="410" cy="486" r="43" fill="#ffffff" stroke="#f0607a" stroke-width="3.5"/>` +
          P('M376,500 q8,-6 16,0 q8,6 16,0 q8,-6 16,0 q8,6 16,0 M382,512 q8,-6 16,0 q8,6 16,0 q8,-6 16,0', 'none', '#7fc8f0', 2.4) +
          P('M420,474 l16,-10 l-2,20Z', '#ff8a70', '#d9503a', 1.4) + `<ellipse cx="406" cy="474" rx="16" ry="10" fill="#ff6f5c" stroke="#d9503a" stroke-width="1.6"/><circle cx="398" cy="472" r="2.4" fill="#fff"/><circle cx="397.5" cy="472" r="1.2" fill="#3b2430"/>` + fingers(396, 549, k);
      } },
    { id: 'staff', n: 'まほうのつえ', tags: ['magic', 'fairy'], tb: [350, 240, 170, 420],
      draw(k) {
        const H = 'M462,330 C438,320 430,290 446,272 C458,260 478,262 486,276';
        return two('M372,650 L462,330', '#8a5a2c', 10, '#c98b4d', 6) + P(H, 'none', '#c9860f', 9) + P(H, 'none', GOLD, 5.5) +
          U.gem(464, 296, 10, '#f2485c', '#b8182e') + U.sparkle(494, 258, 7, '#fff7c2') + U.sparkle(440, 250, 5, '#fff7c2') + fingers(399, 548, k);
      } },
  ];

  /* ================= せなか ================= */
  A.BACKS = [
    { id: 'none', n: 'なし' },
    { id: 'fairy', n: 'ようせいのはね', tags: ['fairy', 'yume', 'magic'], tb: [80, 280, 440, 300],
      draw() {
        const id = U.uid('fw');
        const up = 'M284,410 C232,330 142,288 104,326 C76,356 110,422 180,442 C220,452 262,442 284,426Z', lo = 'M282,430 C222,440 150,470 150,522 C152,558 202,562 242,520 C264,496 278,460 286,440Z';
        const w = P(lo, `url(#${id})`, '#8fc8f0', 2, 'fill-opacity=".78"') + P(up, `url(#${id})`, '#8fc8f0', 2, 'fill-opacity=".78"') +
          P('M280,416 C230,376 170,346 122,340 M278,422 C230,410 180,410 136,400 M278,438 C236,462 196,492 168,524', 'none', '#fff', 2, 'opacity=".8"') +
          U.sparkle(150, 350, 7, '#fff') + U.sparkle(204, 400, 5, '#fff') + U.sparkle(186, 506, 6, '#fff');
        return { back: `<defs>${U.lin(id, [['#c8f0ff'], ['#e6d4ff'], ['#ffd0e8']], 0, 0, 1, 1)}</defs>` + U.both(w) };
      } },
    { id: 'angel', n: 'てんしのはね', tags: ['fairy', 'princess', 'yume', 'ballet'], tb: [90, 290, 420, 190],
      draw() {
        const w = P('M286,412 C250,350 180,304 116,310 C127,329 123,346 108,356 C129,366 129,383 116,395 C141,401 145,417 135,430 C164,432 172,448 166,460 C210,464 262,448 288,430Z', '#ffffff', '#c3cbe6', 2.4) +
          P('M148,340 C190,350 230,376 264,410 M146,374 C190,380 228,398 260,422 M160,412 C198,416 232,424 264,434', 'none', '#d5daee', 2.2);
        return { back: U.both(w) };
      } },
    { id: 'butterfly', n: 'ちょうちょのはね', tags: ['fairy', 'yume'], tb: [80, 270, 440, 310],
      draw() {
        const a = U.uid('bw'), b = U.uid('bw');
        const up = 'M286,414 C262,340 190,288 130,298 C90,308 94,382 140,418 C190,452 250,442 286,428Z', lo = 'M284,432 C230,440 172,470 176,522 C182,562 238,554 264,512 C278,490 286,460 288,440Z';
        const w = P(lo, `url(#${b})`, '#7a4ab8', 3) + P(up, `url(#${a})`, '#7a4ab8', 3) +
          `<circle cx="140" cy="340" r="12" fill="#fff" opacity=".85"/><circle cx="170" cy="386" r="8" fill="#fff" opacity=".85"/><circle cx="196" cy="330" r="6" fill="#fff7c2" opacity=".9"/><circle cx="206" cy="512" r="9" fill="#fff" opacity=".85"/>` +
          P('M282,418 C240,380 190,346 150,326 M280,424 C240,416 190,410 150,400', 'none', '#7a4ab8', 1.6, 'opacity=".5"');
        return { back: `<defs>${U.lin(a, [['#ff9cc6'], ['#c79cff'], ['#8fc8ff']], 1, 0, 0, 1)}${U.lin(b, [['#ffd27a'], ['#ff9cc6']], 1, 0, 0, 1)}</defs>` + U.both(w) };
      } },
    { id: 'cape', n: 'マント', tags: ['magic', 'princess', 'cool'], tb: [140, 350, 320, 390],
      draw() {
        const D = 'M246,376 C204,440 178,590 164,700 Q232,726 300,712 Q368,726 436,700 C422,590 396,440 354,376Z';
        const id = U.uid('cp');
        const back = P(D, '#8a5cf0', '#5a34b8') + `<defs><clipPath id="${id}"><path d="${D}"/></clipPath></defs><g clip-path="url(#${id})">` +
          P('M230,400 C210,500 196,610 190,720 M370,400 C390,500 404,610 410,720', 'none', '#5a34b8', 2, 'opacity=".4"') +
          [[196, 560, 9], [214, 650, 7], [404, 560, 9], [388, 650, 7], [226, 470, 6], [374, 470, 6], [184, 690, 6], [416, 690, 6]].map((p) => U.star(p[0], p[1], p[2], '#ffe27a', '#ffe27a', 1)).join('') + '</g>';
        const front = P('M262,373 Q300,392 338,373 L339,384 Q300,404 261,384Z', '#a47bf5', '#5a34b8', 2) + U.gem(300, 392, 7, GOLD, GOLDL);
        return { back, front };
      } },
    { id: 'bow', n: 'せなかリボン', tags: ['idol', 'yume', 'princess'], tb: [150, 380, 300, 260],
      draw() { return { back: U.bow(300, 462, 230, 116, '#ff8fc0', '#d9508a', { tails: 140, sw: 2.5, knot: '#ff5c93' }) }; } },
    { id: 'bat', n: 'こうもりのはね', tags: ['cool', 'magic'], tb: [110, 320, 380, 150],
      draw() {
        const w = P('M286,410 C250,360 198,338 146,348 C164,366 166,380 158,394 C178,390 190,398 192,412 C208,404 224,410 230,426 C246,416 264,418 286,430Z', '#6a5a98', '#3a2e5a', 2.4) +
          P('M282,414 C240,380 196,360 156,354 M282,420 C250,402 222,398 196,404', 'none', '#3a2e5a', 1.8, 'opacity=".6"');
        return { back: U.both(w) };
      } },
  ];

  /* ================= ペット ================= */
  const PX = 500;
  const mir = (s) => `<g transform="translate(${PX * 2},0) scale(-1,1)">${s}</g>`;
  const pboth = (s) => s + mir(s);
  const pface = (y, o) => {
    o = o || {};
    const e = o.eye || '#3b2430';
    return pboth(`<ellipse cx="${PX - 11}" cy="${y}" rx="3.8" ry="4.8" fill="${e}"/><circle cx="${PX - 12.2}" cy="${y - 1.6}" r="1.4" fill="#fff"/>` +
      `<ellipse cx="${PX - 19}" cy="${y + 8}" rx="5.5" ry="3.2" fill="${o.blush || '#ff9cb8'}" opacity=".7"/>`) +
      (o.noNose ? '' : P(`M${PX - 3.2},${y + 5.5} h6.4 l-3.2,3.6Z`, o.nose || '#ff8fb0', o.nose || '#ff8fb0', 1)) +
      (o.noMouth ? '' : P(`M${PX - 6},${y + 11.5} q3,3.6 6,0 q3,3.6 6,0`, 'none', e, 1.7));
  };
  A.PETS = [
    { id: 'none', n: 'なし' },
    { id: 'cat', n: 'ねこ', tags: ['neko', 'magic', 'casual'], tb: [440, 640, 120, 140],
      draw() {
        const c = '#fff6ea', l = '#d2ab90';
        return two('M520,758 C548,754 552,722 538,710', l, 11, c, 6.5) + P(ell(PX, 746, 25, 26), c, l) + pboth(P(ell(PX - 10, 767, 8, 6), c, l, 2)) +
          pboth(P('M474,690 L470,656 L494,676Z', c, l) + P('M477,684 L475,666 L488,677Z', '#ffc2d8')) + P(ell(PX, 702, 31, 27), c, l) +
          P('M488,682 l3,8 M500,680 v9 M512,682 l-3,8', 'none', '#e8b890', 2.4, 'opacity=".8"') + pface(702) + pboth(P('M476,708 l-12,-2 M476,712 l-12,3', 'none', l, 1.4)) +
          U.bow(PX, 727, 24, 14, '#ff7fb0', '#d9508a', { sw: 1.5 });
      } },
    { id: 'bunny', n: 'うさぎ', tags: ['yume', 'fairy', 'school'], tb: [440, 610, 120, 170],
      draw() {
        const c = '#ffffff', l = '#dcc0d0';
        return `<circle cx="524" cy="756" r="9" fill="${c}" stroke="${l}" stroke-width="2.5"/>` + P(ell(PX, 746, 24, 26), c, l) + pboth(P(ell(PX - 10, 767, 8, 6), c, l, 2)) +
          pboth(`<g transform="rotate(-9 488 680)">${P(ell(488, 652, 9.5, 30), c, l)}${P(ell(488, 655, 4.5, 21), '#ffc2d8')}</g>`) + P(ell(PX, 702, 30, 26), c, l) + pface(702) +
          U.bow(PX, 727, 24, 14, '#c79cff', '#8a5cf0', { sw: 1.5 });
      } },
    { id: 'bear', n: 'くま', tags: ['casual', 'winter', 'school'], tb: [440, 640, 120, 140],
      draw() {
        const c = '#d09a68', l = '#8a5a36';
        return P(ell(PX, 746, 26, 26), c, l) + P(ell(PX, 750, 15, 16), '#f5dcbc') + pboth(P(ell(PX - 12, 767, 9, 6.5), c, l, 2)) +
          pboth(`<circle cx="476" cy="680" r="11.5" fill="${c}" stroke="${l}" stroke-width="2.5"/><circle cx="476" cy="681" r="5.5" fill="#f5dcbc"/>`) + P(ell(PX, 702, 31, 27), c, l) +
          P(ell(PX, 710, 12.5, 9.5), '#f5dcbc') + pface(700, { nose: '#6a3f24', blush: '#ff9c9c' }) + U.bow(PX, 728, 24, 14, '#f2485c', '#b8182e', { sw: 1.5 });
      } },
    { id: 'dog', n: 'いぬ', tags: ['casual', 'cool', 'beach'], tb: [440, 640, 120, 140],
      draw() {
        const c = '#fbe4b8', l = '#c79a5c', e = '#b5784a';
        return two('M522,752 C540,744 544,728 540,716', l, 10, c, 5.5) + P(ell(PX, 746, 25, 26), c, l) + pboth(P(ell(PX - 10, 767, 8.5, 6), c, l, 2)) + P(ell(PX, 702, 31, 27), c, l) +
          pboth(P('M476,682 C460,686 456,714 466,728 C478,720 484,702 482,688Z', e, '#7e4f2c', 2.2)) + `<ellipse cx="511" cy="700" rx="10" ry="11" fill="${e}" opacity=".45"/>` +
          pface(702, { nose: '#5a3a2a' }) + P('M497,716 q3,8 6,0Z', '#ff8fa5', '#d9668a', 1.2) + P('M478,726 q22,10 44,0', 'none', '#3a8fe8', 5) + U.star(PX, 733, 5, GOLD, '#e0a020', 1);
      } },
    { id: 'unicorn', n: 'ユニコーン', tags: ['yume', 'magic', 'princess', 'fairy'], tb: [440, 610, 120, 170],
      draw() {
        const c = '#ffffff', l = '#d8c4e0', id = U.uid('uh');
        return `<defs>${U.lin(id, [['#fff3b0'], ['#ffc94a']])}</defs>` +
          two('M520,752 C544,756 552,734 544,718', '#b79cf0', 12, '#cdb0ff', 7) + two('M524,760 C540,766 548,752 546,742', '#e88fb8', 9, '#ffb0d8', 5) +
          P(ell(PX, 746, 25, 26), c, l) + pboth(P(ell(PX - 10, 767, 8.5, 6), '#ffd0e4', '#e0a0c0', 2)) +
          pboth(P('M478,686 L476,664 L492,678Z', c, l)) + P('M493,678 L500,636 L507,678Z', `url(#${id})`, '#d99a18', 2) + P('M496,664 l8,-3 M495,672 l10,-4 M498,653 l5,-2', 'none', '#d99a18', 1.4) +
          P(ell(PX, 702, 31, 27), c, l) + `<circle cx="474" cy="694" r="10" fill="#ffb0d8" stroke="#e88fb8" stroke-width="1.6"/><circle cx="470" cy="710" r="9" fill="#cdb0ff" stroke="#b79cf0" stroke-width="1.6"/><circle cx="476" cy="724" r="8" fill="#9fd8ff" stroke="#7fbde8" stroke-width="1.6"/>` +
          `<circle cx="486" cy="680" r="8" fill="#ffb0d8" stroke="#e88fb8" stroke-width="1.6"/>` + pface(703, { nose: '#ffb0d8', noNose: true }) + U.star(518, 714, 4.5, '#ffd447', '#ffd447', 1);
      } },
    { id: 'chick', n: 'ひよこ', tags: ['fairy', 'casual', 'matsuri'], tb: [450, 680, 100, 100],
      draw() {
        const c = '#ffe680', l = '#dba82c';
        return P('M490,772 l-4,6 M490,772 l4,6 M510,772 l-4,6 M510,772 l4,6', 'none', '#ff9a3c', 2.6) + P('M496,716 q-2,-12 6,-14 q-1,8 4,12Z', c, l, 2) +
          `<circle cx="${PX}" cy="744" r="29" fill="${c}" stroke="${l}" stroke-width="2.5"/>` + pboth(P('M473,744 q-8,8 -2,18 q8,-4 8,-14Z', '#ffd24a', l, 1.8)) +
          pface(738, { noNose: true, noMouth: true, blush: '#ffb07a' }) + P('M494,744 h12 l-6,8Z', '#ff9a3c', '#d9702a', 1.5);
      } },
    { id: 'penguin', n: 'ペンギン', tags: ['winter', 'beach', 'cool'], tb: [440, 660, 120, 130],
      draw() {
        const c = '#5a6ca8', l = '#36447a';
        return P('M486,774 h-10 q4,-8 12,-6Z M514,774 h10 q-4,-8 -12,-6Z', '#ffa83c', '#d9782a', 1.6) + P(ell(PX, 732, 29, 40), c, l) +
          pboth(P('M472,722 q-12,14 -6,32 q10,-8 10,-24Z', c, l, 2)) + P(ell(PX, 740, 20, 30), '#ffffff') + P('M480,706 Q488,692 500,704 Q512,692 520,706 Q512,722 500,716 Q488,722 480,706Z', '#ffffff') +
          pface(708, { noNose: true, noMouth: true }) + P('M495,714 h10 l-5,7Z', '#ffa83c', '#d9782a', 1.5) + P('M476,728 q24,12 48,0', 'none', '#f2485c', 6) + P('M514,730 l6,16', 'none', '#f2485c', 6);
      } },
    { id: 'puppy', n: 'しろいこいぬ', tags: ['casual', 'school', 'yume'], tb: [440, 640, 120, 140],
      draw() {
        const c = '#ffffff', l = '#c9c4d6', e = '#8f8aa8';
        return two('M522,754 C538,748 542,734 538,722', l, 10, c, 5.5) + P(ell(PX, 746, 25, 26), c, l) + pboth(P(ell(PX - 10, 767, 8.5, 6), c, l, 2)) + P(ell(PX, 702, 32, 27), c, l) +
          pboth(P('M478,680 C462,680 452,704 458,724 C472,720 482,704 484,688Z', e, '#6a6588', 2.2)) + pface(702, { nose: '#5a5270' }) + P('M478,727 q22,10 44,0', 'none', '#62d6b8', 5) + U.gem(PX, 734, 4, GOLD, GOLDL);
      } },
    { id: 'flowerbun', n: 'はなうさぎ', tags: ['fairy', 'yume', 'princess'], tb: [440, 610, 120, 170],
      draw() {
        const c = '#fff0f5', l = '#e0b0c6';
        return `<circle cx="524" cy="756" r="9" fill="#fff" stroke="${l}" stroke-width="2.5"/>` + P(ell(PX, 746, 24, 26), c, l) + pboth(P(ell(PX - 10, 767, 8, 6), c, l, 2)) +
          pboth(`<g transform="rotate(-14 486 682)">${P(ell(486, 654, 9.5, 28), c, l)}${P(ell(486, 657, 4.5, 19), '#ffc2d8')}</g>`) + P(ell(PX, 702, 30, 26), c, l) + pface(703) +
          U.flower(482, 682, 8, '#ff9ec6', '#ffe27a') + U.flower(PX, 677, 9, '#fff3a8', '#ffb347') + U.flower(518, 682, 8, '#c4a7ff', '#ffe27a') + U.bow(PX, 727, 22, 13, '#8de8cc', '#27b592', { sw: 1.5 });
      } },
  ];

  /* ================= くみあわせ ================= */
  A.accParts = function (st) {
    const o = { back: '', headBack: '', neck: '', hand: '', glasses: '', ear: '', head: '', pet: '' };
    const k = A.skin(st);
    const hd = A.HEADS[st.head | 0];
    if (hd && hd.draw) { const r = hd.draw(C(st.headC | 0), k); o.head = r.front || ''; o.headBack = r.back || ''; }
    const gl = A.GLASSES[st.glasses | 0]; if (gl && gl.draw) o.glasses = gl.draw();
    const er = A.EARS[st.ear | 0]; if (er && er.draw) o.ear = er.draw();
    const nk = A.NECKS[st.neck | 0]; if (nk && nk.draw) o.neck = nk.draw();
    const hn = A.HANDS[st.hand | 0]; if (hn && hn.draw) o.hand = hn.draw(k);
    const bk = A.BACKS[st.back | 0]; if (bk && bk.draw) { const r = bk.draw(); o.back = r.back || ''; o.neck = (r.front || '') + o.neck; }
    const pt = A.PETS[st.pet | 0]; if (pt && pt.draw) o.pet = `<g transform="translate(506,774) scale(1.28) translate(-500,-774)">${pt.draw()}</g>`;
    return o;
  };
})(window);
