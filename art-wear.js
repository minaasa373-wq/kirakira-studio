/* きらきら☆おしゃれスタジオ — ふく・くつした・くつ */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f, ell = U.ell;
  const ANK = A.ANK, FOOT = A.FOOT;

  /* ================= いろ（カラーセット） ================= */
  A.SCHEMES = [
    { n: 'ピンク', m: '#ff9ec6', s: '#ffffff', a: '#ff5c93' },
    { n: 'むらさき', m: '#c4a7ff', s: '#f6eeff', a: '#8a5cf0' },
    { n: 'みずいろ', m: '#8ed4ff', s: '#ffffff', a: '#3a8fe8' },
    { n: 'ミント', m: '#8de8cc', s: '#ffffff', a: '#27b592' },
    { n: 'きいろ', m: '#ffe37a', s: '#fffbe6', a: '#ff9f2e' },
    { n: 'あか', m: '#f2485c', s: '#ffffff', a: '#ffd24a' },
    { n: 'しろ', m: '#ffffff', s: '#ffe6f0', a: '#ffa3c8' },
    { n: 'くろ', m: '#40395a', s: '#ff8fc4', a: '#ffd95a' },
    { n: 'オレンジ', m: '#ffb25e', s: '#fff3dc', a: '#ff6f3c' },
    { n: 'こん', m: '#4662b0', s: '#ffffff', a: '#ff5c7a' },
    { n: 'ゆめかわ', m: '#e3b0f0', g: ['#ffb0d8', '#cdb0ff', '#9fd8ff'], s: '#ffffff', a: '#ffcf4a' },
    { n: 'にじ', m: '#ffc46b', g: ['#ff8fa8', '#ffc46b', '#fff07a', '#8fe6a8', '#8fc8ff', '#c79cff'], s: '#ffffff', a: '#ff5c93' },
  ];
  function C(i) {
    const S = A.SCHEMES[i] || A.SCHEMES[0];
    const o = { m: S.m, s: S.s, a: S.a, ml: U.line(S.m), sl: U.line(S.s), al: U.line(S.a), defs: '', M: S.m };
    if (S.g) {
      const id = U.uid('wg');
      o.defs = `<defs>${U.lin(id, S.g.map((x) => [x]), 0, 380, 0, 720, true)}</defs>`;
      o.M = `url(#${id})`;
    }
    return o;
  }
  A.scheme = C;

  /* ================= 部品 ================= */
  const armP = A.armPt;
  /* うでの向き（単位ベクトル）と法線 */
  const AD = [-42 / 149.04, 143 / 149.04], AN = [143 / 149.04, 42 / 149.04];
  /* そで：かた側はまるく、そで口はほぼ平ら */
  const sleeve = (t, r1, r2, fill, line) => {
    const p = armP(t), x1 = 250, y1 = 391;
    const p1 = [x1 + AN[0] * r1, y1 + AN[1] * r1], p2 = [p[0] + AN[0] * r2, p[1] + AN[1] * r2];
    const p3 = [p[0] - AN[0] * r2, p[1] - AN[1] * r2], p4 = [x1 - AN[0] * r1, y1 - AN[1] * r1];
    const d = `M${f(p1[0])},${f(p1[1])}L${f(p2[0])},${f(p2[1])}Q${f(p[0] + AD[0] * 3)},${f(p[1] + AD[1] * 3)} ${f(p3[0])},${f(p3[1])}L${f(p4[0])},${f(p4[1])}A${r1},${r1} 0 0 1 ${f(p1[0])},${f(p1[1])}Z`;
    return U.both(P(d, fill, line));
  };
  /* そで口・リストバンド：うでに直角な帯 */
  const cuff = (t0, t1, r, fill, line) => {
    const a = armP(t0), b = armP(t1);
    const d = `M${f(a[0] + AN[0] * r)},${f(a[1] + AN[1] * r)}Q${f(a[0] + AD[0] * 2)},${f(a[1] + AD[1] * 2)} ${f(a[0] - AN[0] * r)},${f(a[1] - AN[1] * r)}` +
      `L${f(b[0] - AN[0] * r)},${f(b[1] - AN[1] * r)}Q${f(b[0] + AD[0] * 3)},${f(b[1] + AD[1] * 3)} ${f(b[0] + AN[0] * r)},${f(b[1] + AN[1] * r)}Z`;
    return U.both(P(d, fill, line, 2));
  };
  const puff = (fill, line, band) => U.both(P('M259,381 C247,371 226,374 221,392 C217,407 225,421 240,423 C253,424 262,414 263,399Z', fill, line) +
    (band ? P('M223,410 C231,421 248,424 260,415', 'none', band, 4.5) : '') + P('M236,381 q-6,10 -4,22', 'none', line, 1.4, 'opacity=".35"'));
  const clipG = (d, inner) => { const id = U.uid('cl'); return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><g clip-path="url(#${id})">${inner}</g>`; };

  function skirt(len, flare, o) {
    o = o || {};
    const y0 = o.y0 || 455, xl = o.xl || 264, xr = 600 - xl, y1 = y0 + len, hl = xl - flare, hr = xr + flare;
    const sag = o.sag == null ? 8 : o.sag, b = o.bell == null ? 0.6 : o.bell;
    let hem;
    if (o.frill) hem = U.frill([hr, y1], [300, y1 + sag * 2], [hl, y1], o.frill, -(o.depth || 9));
    else if (o.zig) hem = U.zig(hr, y1, hl, y1, o.zig, -(o.depth || 14));
    else hem = `Q300,${y1 + sag * 2} ${hl},${y1}`;
    return `M${xl},${y0}Q300,${y0 + 5} ${xr},${y0}C${f(xr + flare * b)},${f(y0 + len * 0.25)} ${f(hr - flare * 0.1)},${f(y0 + len * 0.7)} ${hr},${y1}${hem}C${f(hl + flare * 0.1)},${f(y0 + len * 0.7)} ${f(xl - flare * b)},${f(y0 + len * 0.25)} ${xl},${y0}Z`;
  }
  function tier(y0, y1, h0, h1, n, depth) {
    const hem = U.frill([300 + h1, y1], [300, y1 + 12], [300 - h1, y1], n, -(depth || 8));
    const dy = y1 - y0, dh = h1 - h0;
    return `M${300 - h0},${y0}Q300,${y0 + 5} ${300 + h0},${y0}C${f(300 + h0 + dh * 0.75)},${f(y0 + dy * 0.3)} ${300 + h1},${f(y0 + dy * 0.7)} ${300 + h1},${y1}${hem}C${300 - h1},${f(y0 + dy * 0.7)} ${f(300 - h0 - dh * 0.75)},${f(y0 + dy * 0.3)} ${300 - h0},${y0}Z`;
  }
  function tutu(cy, rx, ry, n, depth) {
    let d = `M${300 + rx},${cy}`, prev = [300 + rx, cy];
    for (let i = 1; i <= n; i++) {
      const a = (Math.PI * i) / n, p = [300 + rx * Math.cos(a), cy + ry * Math.sin(a)];
      const mx = (prev[0] + p[0]) / 2, my = (prev[1] + p[1]) / 2, ox = mx - 300, oy = my - cy + ry * 0.4, l = Math.hypot(ox, oy) || 1;
      d += `Q${f(mx + (ox / l) * depth)},${f(my + (oy / l) * depth)} ${f(p[0])},${f(p[1])}`;
      prev = p;
    }
    return d + `Q300,${f(cy - ry * 0.6)} ${300 + rx},${cy}Z`;
  }
  const belt = (c, y, fill, line) => P(`M263,${y - 5}Q300,${y + 3} 337,${y - 5}L337,${y + 5}Q300,${y + 13} 263,${y + 5}Z`, fill, line, 2);

  /* みごろ（上半身） */
  const BOD_TEE = 'M251,375 C266,371 280,371 289,373 C293,386 307,386 311,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 340,440 338,455 C338,463 340,472 342,480 C320,486 280,486 258,480 C260,472 262,463 262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
  const BOD_FIT = 'M251,375 C266,371 280,371 288,373 C292,388 308,388 312,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 338,440 336,458 Q300,466 264,458 C262,440 247,426 243,408 C240,394 242,381 251,375Z';
  const BOD_CAMI = 'M267,377 L277,377 C280,396 290,403 300,403 C310,403 320,396 323,377 L333,377 C340,392 352,402 355,412 C351,430 338,440 336,458 Q300,466 264,458 C262,440 249,430 245,412 C248,402 260,392 267,377Z';
  const BOD_WIDE = 'M249,374 C266,370 281,370 289,373 C293,387 307,387 311,373 C319,370 334,370 351,374 C361,381 363,394 360,410 C357,430 347,444 346,458 L347,485 C320,493 280,493 253,485 L254,458 C253,444 243,430 240,410 C237,394 239,381 249,374Z';

  const sparkles = (seed, n, x0, y0, x1, y1) => U.sprinkle(seed, n, x0, y0, x1, y1, 2.5, 6, '#fff', 0.85);

  /* ================= ワンピース・ドレス ================= */
  A.DRESSES = [
    { id: 'none', n: 'なし' },

    { id: 'onepiece', n: 'ワンピース', tags: ['casual', 'school'], tb: [170, 350, 260, 300],
      draw(c) {
        const D = 'M251,375 C266,371 280,371 288,373 C292,386 308,386 312,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 340,440 338,455 C352,500 372,558 384,608 Q300,630 216,608 C228,558 248,500 262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
        let m = c.defs + P(D, c.M, c.ml);
        m += clipG(D, P('M206,592 Q300,616 394,592', 'none', c.s, 9) + P('M206,577 Q300,601 394,577', 'none', c.s, 3) +
          P('M282,470 C276,520 262,570 250,612 M318,470 C324,520 338,570 350,612', 'none', c.ml, 1.6, 'opacity=".3"'));
        m += belt(c, 457, c.a, c.al) + U.bow(327, 459, 30, 19, c.a, c.al, { sw: 1.8, tails: 20 });
        m += [404, 421, 438].map((y) => `<circle cx="300" cy="${y}" r="3.6" fill="${c.s}" stroke="${c.sl}" stroke-width="1.4"/>`).join('');
        m += U.heart(266, 548, 9, c.s, c.sl, 1.6);
        let o = sleeve(0.27, 16.5, 16, c.M, c.ml) + cuff(0.2, 0.3, 16.6, c.s, c.sl);
        o += U.both(P('M300,381 C291,372 277,371 267,377 C268,392 283,400 299,392Z', c.s, c.sl, 2)) + U.bow(300, 389, 22, 13, c.a, c.al, { sw: 1.6 });
        return { main: m, over: o };
      } },

    { id: 'princess', n: 'プリンセス', tags: ['princess', 'yume'], tb: [140, 350, 320, 390],
      draw(c) {
        const s1 = skirt(258, 100, { frill: 9, depth: 10, bell: 0.8, sag: 9 }), s2 = skirt(236, 92, { frill: 8, depth: 9, bell: 0.8, sag: 9 });
        let m = c.defs + P(s1, c.s, c.sl) + P(s2, c.M, c.ml);
        m += clipG(s2, P('M300,470 C286,540 262,640 240,710 M300,470 C314,540 338,640 360,710 M276,470 C254,530 220,620 196,690 M324,470 C346,530 380,620 404,690', 'none', c.ml, 1.8, 'opacity=".28"') +
          sparkles(11, 16, 180, 520, 420, 690));
        const sw = 'M264,457 C248,482 226,520 212,566 Q240,600 268,566 Q300,604 332,566 Q360,600 388,566 C374,520 352,482 336,457Z';
        m += P(sw, U.light(c.m, 0.45), c.ml, 2.2) + U.bow(268, 570, 26, 16, c.a, c.al, { sw: 1.6 }) + U.bow(332, 570, 26, 16, c.a, c.al, { sw: 1.6 });
        const B = 'M258,385 C272,393 288,396 300,394 C312,396 328,393 342,385 C346,400 350,412 352,420 C346,436 339,446 336,456 Q318,462 300,476 Q282,462 264,456 C261,446 254,436 248,420 C250,412 254,400 258,385Z';
        m += P(B, c.M, c.ml) + P('M290,398 L310,398 L305,466 L300,472 L295,466Z', U.light(c.m, 0.5), c.ml, 1.6);
        m += [412, 430, 448].map((y) => U.gem(300, y, 3.6, c.a)).join('');
        m += P('M256,383' + U.frill([256, 383], [300, 404], [344, 383], 7, 5) + 'Q300,395 256,383Z', c.s, c.sl, 1.8);
        m += U.gem(300, 476, 6, c.a);
        return { main: m, over: puff(c.M, c.ml, c.a) };
      } },

    { id: 'tutu', n: 'チュチュ', tags: ['ballet', 'yume', 'princess'], tb: [160, 350, 280, 200],
      draw(c) {
        const L = 'M267,377 L277,377 C280,396 290,403 300,403 C310,403 320,396 323,377 L333,377 C340,392 352,402 355,412 C351,430 336,440 334,455 C333,470 347,486 347,505 C347,521 325,529 300,529 C275,529 253,521 253,505 C253,486 267,470 266,455 C264,440 249,430 245,412 C248,402 260,392 267,377Z';
        let m = c.defs + P(L, c.M, c.ml);
        m += P(tutu(480, 130, 42, 14, 9), U.light(c.m, 0.62), c.ml, 2, 'opacity=".92"');
        m += P(tutu(473, 113, 33, 12, 8), U.light(c.m, 0.35), c.ml, 2, 'opacity=".95"');
        m += P(tutu(466, 95, 24, 10, 7), c.M, c.ml, 2);
        m += sparkles(23, 12, 190, 468, 410, 512);
        m += belt(c, 457, c.a, c.al) + U.bow(300, 459, 30, 18, c.a, c.al, { sw: 1.6 });
        m += P('M280,402 Q300,410 320,402', 'none', c.s, 3) + U.sparkle(300, 428, 6, '#fff', 0.9);
        return { main: m };
      } },

    { id: 'magical', n: 'まほうしょうじょ', tags: ['magic', 'idol', 'yume'], tb: [150, 350, 300, 280],
      draw(c) {
        const s1 = skirt(128, 66, { zig: 9, depth: 16 }), s2 = skirt(98, 54, { frill: 7, depth: 8 });
        let m = c.defs + P(s1, c.s, c.sl) + P(s2, c.M, c.ml);
        m += clipG(s2, P('M300,465 L300,560 M282,465 L268,560 M318,465 L332,560 M268,462 L236,556 M332,462 L364,556', 'none', c.ml, 1.6, 'opacity=".3"'));
        m += U.star(236, 540, 6, c.a, c.al, 1.4) + U.star(364, 540, 6, c.a, c.al, 1.4) + U.star(300, 548, 6, c.a, c.al, 1.4);
        m += P(BOD_FIT, c.s, c.sl) + P('M262,420 Q300,434 338,420 L336,458 Q300,466 264,458Z', c.M, c.ml);
        m += P('M300,430 L300,462', 'none', c.ml, 1.6, 'opacity=".4"') + belt(c, 457, c.a, c.al) + U.gem(300, 461, 7, '#ffe27a', '#e0a020');
        let o = puff(c.s, c.sl, c.a) + cuff(0.84, 0.97, 13.2, c.M, c.ml) + cuff(0.82, 0.86, 13.6, c.s, c.sl);
        const col = 'M289,372 L300,404 L311,372 C322,370 338,371 349,377 C347,392 339,403 327,409 L300,404 L273,409 C261,403 253,392 251,377 C262,371 278,370 289,372Z';
        o += P(col, c.M, c.ml) + P('M257,381 C259,391 266,399 275,403 L300,398.5 L325,403 C334,399 341,391 343,381', 'none', c.s, 2.4);
        o += U.bow(300, 410, 50, 30, c.a, c.al, { gem: '#ffe27a', tails: 30, sw: 2 });
        const b = c.defs + U.bow(300, 468, 170, 80, c.a, c.al, { tails: 110, sw: 2.5 });
        return { main: m, over: o, back: b };
      } },

    { id: 'yukata', n: 'ゆかた', tags: ['matsuri'], tb: [170, 350, 260, 390],
      draw(c) {
        const R = 'M252,375 C266,371 280,371 289,373 L300,394 L311,373 C320,371 334,371 348,375 C356,381 358,394 355,408 C352,426 340,440 338,455 C343,540 349,636 353,712 Q300,724 247,712 C251,636 257,540 262,455 C260,440 248,426 245,408 C242,394 244,381 252,375Z';
        const r = U.rng(77); let fl = '';
        for (let i = 0; i < 15; i++) {
          const x = 248 + r() * 104, y = 388 + r() * 318, rr = 7 + r() * 5;
          fl += U.flower(x, y, rr, i % 3 ? c.s : c.a, i % 3 ? c.a : c.s, 5);
        }
        let m = c.defs + P(R, c.M, c.ml) + clipG(R, `<g opacity=".92">${fl}</g>` + P('M292,470 C294,550 296,640 297,720', 'none', c.ml, 1.8, 'opacity=".45"'));
        m += P('M292,369 L283,373 L300,410 L306,399Z', c.s, c.sl, 1.8) + P('M308,369 L318,373 L292,456 L281,456Z', c.s, c.sl, 1.8);
        m += P('M260,437 Q300,446 340,437 L340,480 Q300,489 260,480Z', c.a, c.al) + P('M260,458 Q300,467 340,458', 'none', c.s, 3.2) + U.flower(300, 463, 8, c.s, c.m, 5, c.sl);
        const SL = 'M246,375 C232,378 221,400 213,430 C207,452 201,470 197,488 C196,502 205,518 216,530 C229,535 241,527 247,514 C253,482 259,440 263,408 C265,392 259,378 246,375Z';
        let sl = P(SL, c.M, c.ml) + clipG(SL, U.flower(226, 440, 9, c.s, c.a) + U.flower(236, 494, 8, c.a, c.s) + U.flower(214, 500, 7, c.s, c.a)) +
          P('M199,490 C203,506 210,518 217,527', 'none', c.s, 3);
        const b = c.defs + U.bow(300, 452, 150, 70, c.a, c.al, { sw: 2.5 });
        return { main: m, over: U.both(sl), back: b };
      } },

    { id: 'cake', n: 'フリルドレス', tags: ['princess', 'yume', 'idol'], tb: [160, 350, 280, 290],
      draw(c) {
        let m = c.defs + P(tier(536, 606, 64, 102, 9, 8), c.M, c.ml) + P(tier(494, 556, 50, 84, 8, 8), c.s, c.sl) + P(tier(452, 512, 36, 64, 6, 8), c.M, c.ml);
        m += P('M214,590 Q300,614 386,590', 'none', c.a, 2.6, 'opacity=".9"') + P('M230,541 Q300,561 370,541', 'none', c.a, 2.6, 'opacity=".9"') + P('M248,498 Q300,514 352,498', 'none', c.a, 2.6, 'opacity=".9"');
        m += U.heart(244, 580, 5, c.a) + U.heart(300, 592, 5, c.a) + U.heart(356, 580, 5, c.a);
        m += P(BOD_CAMI, c.M, c.ml) + P('M267,377 L277,377 M323,377 L333,377', 'none', c.ml, 1.5);
        m += P('M278,399' + U.frill([278, 399], [300, 412], [322, 399], 4, 4) + 'Q300,404 278,399Z', c.s, c.sl, 1.6);
        m += belt(c, 457, c.a, c.al) + U.bow(300, 460, 44, 26, c.a, c.al, { tails: 34, sw: 2 });
        m += U.sparkle(300, 430, 6, '#fff', 0.9);
        return { main: m, over: puff(c.s, c.sl, c.a) };
      } },

    { id: 'idol', n: 'アイドル', tags: ['idol', 'cool'], tb: [150, 350, 300, 280],
      draw(c) {
        const pid = U.uid('ck');
        const s1 = skirt(118, 62, { frill: 8, depth: 8 }), s2 = skirt(92, 52, { sag: 6 });
        let m = c.defs + `<defs><pattern id="${pid}" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="20" fill="${c.s}"/><rect width="10" height="10" fill="${c.a}"/><rect x="10" y="10" width="10" height="10" fill="${c.a}"/></pattern></defs>`;
        m += P(s1, `url(#${pid})`, c.al) + P(s2, c.M, c.ml);
        m += clipG(s2, P('M196,536 Q300,560 404,536', 'none', c.s, 5) + P('M300,462 L300,560 M276,462 L258,556 M324,462 L342,556', 'none', c.ml, 1.6, 'opacity=".3"'));
        m += P(BOD_FIT, c.M, c.ml) + P('M291,378 L309,378 L307,460 L293,460Z', c.s, c.sl, 1.6);
        m += [[283, 404], [317, 404], [283, 428], [317, 428]].map((p) => U.gem(p[0], p[1], 3.8, '#ffd95a', '#d99a18')).join('');
        m += belt(c, 457, c.a, c.al) + U.star(300, 461, 8, '#ffd95a', '#d99a18', 1.6);
        m += U.star(332, 396, 7, '#ffd95a', '#d99a18', 1.4);
        let o = U.both(P('M262,374 C248,370 232,376 226,390 C236,400 252,400 264,392Z', c.s, c.sl, 2) + P('M230,388 q3,5 9,6 M240,381 q2,7 9,9', 'none', c.sl, 1.3, 'opacity=".6"'));
        o += cuff(0.82, 0.97, 13.4, c.s, c.sl) + cuff(0.86, 0.9, 13.8, c.a, c.al);
        o += P('M286,370 C292,378 308,378 314,370 L315,381 C308,387 292,387 285,381Z', c.s, c.sl, 1.8) + U.bow(300, 388, 34, 20, c.a, c.al, { tails: 22, sw: 1.8 });
        const b = c.defs + U.both(P('M270,462 L226,600 L246,590 L256,612 L286,470Z', c.a, c.al, 2));
        return { main: m, over: o, back: b };
      } },

    { id: 'salopette', n: 'サロペット', tags: ['casual', 'cool'], tb: [180, 350, 240, 240],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.s, c.sl) + clipG(BOD_TEE, [384, 398, 412, 426, 440, 454, 468].map((y) => `<rect x="230" y="${y}" width="140" height="6" fill="${c.a}" opacity=".55"/>`).join(''));
        const S = 'M260,452 L340,452 C345,472 351,492 352,514 L351,562 L305,562 L300,532 L295,562 L249,562 L248,514 C249,492 255,472 260,452Z';
        m += P(S, c.M, c.ml) + P('M276,402 Q300,398 324,402 L327,456 L273,456Z', c.M, c.ml);
        m += P('M278,404 L270,375 M322,404 L330,375', 'none', c.ml, 12) + P('M278,404 L270,375 M322,404 L330,375', 'none', c.m, 8);
        m += U.gem(279, 409, 4, '#ffd95a', '#d99a18') + U.gem(321, 409, 4, '#ffd95a', '#d99a18');
        m += P('M288,420 L312,420 L311,440 Q300,446 289,440Z', U.light(c.m, 0.3), c.ml, 1.6) + U.heart(300, 430, 5, c.a);
        m += P('M250,548 L294,548 M306,548 L350,548', 'none', c.ml, 1.6, 'opacity=".5"') + P('M258,474 q8,14 20,14 M342,474 q-8,14 -20,14', 'none', c.ml, 1.6, 'opacity=".5"');
        m += P('M300,462 L300,530', 'none', c.ml, 1.6, 'opacity=".45"');
        const o = sleeve(0.27, 16.5, 16, c.s, c.sl) + cuff(0.2, 0.3, 16.6, c.a, c.al);
        return { main: m, over: o };
      } },

    { id: 'fairy', n: 'ようせいドレス', tags: ['fairy', 'yume'], tb: [160, 350, 280, 290],
      draw(c) {
        const pet = (x0, x1, y1, w) => {
          const y0 = 458, mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy), nx = (-dy / l) * w, ny = (dx / l) * w;
          return `M${x0},${y0}Q${f(mx + nx)},${f(my + ny + 14)} ${x1},${y1}Q${f(mx - nx)},${f(my - ny + 14)} ${x0},${y0}Z`;
        };
        let m = c.defs;
        [[276, 196, 560], [288, 248, 604], [300, 300, 616], [312, 352, 604], [324, 404, 560]].forEach((p) => { m += P(pet(p[0], p[1], p[2], 30), c.s, c.sl, 2); });
        [[282, 222, 586], [294, 274, 610], [306, 326, 610], [318, 378, 586]].forEach((p) => { m += P(pet(p[0], p[1], p[2], 30), c.M, c.ml, 2) + P(`M${p[0]},470 L${p[1]},${p[2] - 14}`, 'none', c.ml, 1.4, 'opacity=".35"'); });
        m += sparkles(41, 10, 210, 490, 390, 600);
        m += P(BOD_CAMI, c.M, c.ml);
        m += P('M278,399 Q289,412 300,400 Q311,412 322,399', 'none', c.s, 3.2);
        m += P('M262,455 Q300,466 338,455', 'none', '#5fc872', 6) + P('M270,452 q-8,-9 -16,-4 q4,9 16,4Z M330,452 q8,-9 16,-4 q-4,9 -16,4Z', '#8fdc9a', '#4fae62', 1.4);
        m += U.flower(300, 461, 12, c.s, c.a, 5, c.sl) + U.flower(278, 457, 7, c.a, '#fff') + U.flower(322, 457, 7, c.a, '#fff');
        const o = U.both(P('M258,377 C243,374 226,386 221,404 C238,407 254,400 262,388Z', c.M, c.ml, 2) + P('M256,381 C246,384 238,392 234,402 C246,402 256,396 261,389Z', c.s, c.sl, 1.6));
        return { main: m, over: o };
      } },

    { id: 'robe', n: 'まほうのローブ', tags: ['magic', 'winter', 'cool'], tb: [150, 350, 300, 380],
      draw(c) {
        const D = 'M251,375 C266,371 280,371 288,373 C292,386 308,386 312,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 340,440 338,455 C352,520 372,620 384,690 Q300,712 216,690 C228,620 248,520 262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
        let m = c.defs + P(D, c.M, c.ml);
        m += clipG(D, P('M206,672 Q300,696 394,672', 'none', c.a, 9) + P('M206,656 Q300,680 394,656', 'none', c.a, 2.5) +
          P('M300,440 L300,700', 'none', c.a, 5) + P('M282,470 C272,540 256,620 244,690 M318,470 C328,540 344,620 356,690', 'none', c.ml, 1.6, 'opacity=".28"'));
        m += belt(c, 457, c.a, c.al) + U.gem(300, 461, 6, '#ffe27a', '#e0a020');
        let o = sleeve(0.9, 16.5, 15, c.M, c.ml) + cuff(0.8, 0.94, 15.6, c.a, c.al);
        const K = 'M286,369 C270,369 252,373 240,384 C231,400 229,420 233,437 C262,449 338,449 367,437 C371,420 369,400 360,384 C348,373 330,369 314,369 C308,383 292,383 286,369Z';
        o += P(K, c.M, c.ml) + clipG(K, P('M228,428 C262,442 338,442 372,428', 'none', c.a, 5)) + P('M300,384 L300,440', 'none', c.ml, 1.5, 'opacity=".4"');
        o += P('M285,366 C291,374 309,374 315,366 L316,380 C308,387 292,387 284,380Z', c.a, c.al, 2) + U.gem(300, 392, 6, '#f2485c', '#b8182e');
        return { main: m, over: o };
      } },
  ];

  /* ================= トップス ================= */
  A.TOPS = [
    { id: 'tee', n: 'Tシャツ', tags: ['casual', 'cool', 'beach'], tb: [196, 356, 208, 150],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.M, c.ml) + P('M289,373 C293,386 307,386 311,373', 'none', c.s, 4.5);
        m += U.heart(300, 430, 15, c.a, c.al, 2) + `<circle cx="293" cy="423" r="3" fill="#fff" opacity=".8"/>`;
        return { main: m, over: sleeve(0.27, 16.5, 16, c.M, c.ml) + cuff(0.22, 0.3, 16.6, c.s, c.sl) };
      } },
    { id: 'blouse', n: 'フリルブラウス', tags: ['princess', 'yume', 'school'], tb: [196, 356, 208, 150],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.M, c.ml);
        m += P('M300,392' + U.frillLine(300, 392, 300, 478, 6, 9) + 'Z', c.s, c.sl, 1.6) + P('M300,392' + U.frillLine(300, 392, 300, 478, 6, -9) + 'Z', c.s, c.sl, 1.6);
        m += [404, 422, 440, 458].map((y) => `<circle cx="300" cy="${y}" r="2.6" fill="${c.a}"/>`).join('');
        let o = puff(c.M, c.ml, c.s);
        o += U.both(P('M300,382 C291,372 277,371 267,377 C268,392 283,401 299,393Z', c.s, c.sl, 2)) + U.bow(300, 390, 30, 18, c.a, c.al, { sw: 1.6, tails: 18 });
        return { main: m, over: o };
      } },
    { id: 'hoodie', n: 'パーカー', tags: ['casual', 'cool', 'winter'], tb: [190, 340, 220, 170],
      draw(c) {
        let m = c.defs + P(BOD_WIDE, c.M, c.ml);
        m += clipG(BOD_WIDE, `<rect x="230" y="474" width="140" height="24" fill="${U.dark(c.m, 0.12)}" opacity=".55"/>`) + P('M254,474 Q300,484 346,474', 'none', c.ml, 1.6, 'opacity=".5"');
        m += P('M274,438 L326,438 L336,470 Q300,478 264,470Z', U.light(c.m, 0.18), c.ml, 2);
        m += U.star(300, 414, 9, c.a, c.al, 1.6);
        let o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.84, 0.95, 14.6, U.dark(c.m, 0.1), c.ml);
        o += P('M270,371 C278,392 291,399 300,399 C309,399 322,392 330,371 C322,381 310,386 300,386 C290,386 278,381 270,371Z', U.light(c.m, 0.25), c.ml, 2);
        o += P('M291,390 L289,420 M309,390 L311,420', 'none', c.s, 3) + `<circle cx="289" cy="422" r="3" fill="${c.a}"/><circle cx="311" cy="422" r="3" fill="${c.a}"/>`;
        const b = c.defs + P('M234,376 C226,326 262,312 300,312 C338,312 374,326 366,376 C340,388 260,388 234,376Z', U.dark(c.m, 0.08), c.ml);
        return { main: m, over: o, back: b };
      } },
    { id: 'sailor', n: 'セーラー', tags: ['school', 'casual', 'beach'], tb: [196, 356, 208, 150],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.s, c.sl) + clipG(BOD_TEE, P('M256,470 Q300,480 344,470', 'none', c.m, 4));
        let o = sleeve(0.27, 16.5, 16, c.s, c.sl) + cuff(0.2, 0.3, 16.6, c.M, c.ml);
        const col = 'M289,372 L300,412 L311,372 C322,370 338,371 349,377 C347,394 339,406 327,412 L300,412 L273,412 C261,406 253,394 251,377 C262,371 278,370 289,372Z';
        o += P(col, c.M, c.ml) + P('M257,382 C259,393 266,402 275,406 L296,407 M343,382 C341,393 334,402 325,406 L304,407', 'none', c.s, 2.4);
        o += U.bow(300, 416, 44, 24, c.a, c.al, { tails: 30, sw: 2 });
        return { main: m, over: o };
      } },
    { id: 'cardigan', n: 'カーディガン', tags: ['casual', 'winter', 'yume', 'school'], tb: [190, 350, 220, 160],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.s, c.sl) + P('M282,384 Q300,394 318,384', 'none', c.sl, 1.6) + U.heart(300, 420, 7, c.a);
        const L = 'M251,375 C262,372 274,371 285,372 C283,400 287,444 291,484 C279,486 266,485 256,481 C259,472 262,463 262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
        m += U.both(P(L, c.M, c.ml)) + [420, 442, 464].map((y) => `<circle cx="286" cy="${y}" r="3" fill="${c.a}" stroke="${c.al}" stroke-width="1"/>`).join('');
        m += U.both(P('M256,468 Q272,474 290,472', 'none', c.ml, 1.5, 'opacity=".45"'));
        const o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.84, 0.95, 14.6, U.light(c.m, 0.3), c.ml);
        return { main: m, over: o };
      } },
    { id: 'knit', n: 'セーター', tags: ['winter', 'casual'], tb: [190, 340, 220, 170],
      draw(c) {
        let m = c.defs + P(BOD_WIDE, c.M, c.ml);
        m += clipG(BOD_WIDE, `<rect x="230" y="408" width="140" height="11" fill="${c.s}"/><rect x="230" y="424" width="140" height="6" fill="${c.a}"/>` +
          P('M240,413.5 h120', 'none', c.a, 2.5, 'stroke-dasharray="1 9"') + `<rect x="230" y="474" width="140" height="24" fill="${U.dark(c.m, 0.12)}" opacity=".5"/>` +
          P('M262,476 v12 M276,478 v12 M290,479 v12 M310,479 v12 M324,478 v12 M338,476 v12', 'none', c.ml, 1.4, 'opacity=".4"'));
        let o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.84, 0.95, 14.6, U.dark(c.m, 0.1), c.ml) + cuff(0.4, 0.46, 15.7, c.s, c.sl);
        o += P('M284,364 C290,372 310,372 316,364 L317,381 C309,388 291,388 283,381Z', U.light(c.m, 0.2), c.ml, 2) + P('M292,372 v10 M300,373 v11 M308,372 v10', 'none', c.ml, 1.3, 'opacity=".4"');
        return { main: m, over: o };
      } },
    { id: 'cami', n: 'キャミソール', tags: ['beach', 'casual', 'idol'], tb: [196, 356, 208, 150],
      draw(c) {
        const D = 'M267,377 L277,377 C280,396 290,403 300,403 C310,403 320,396 323,377 L333,377 C340,392 352,402 355,412 C351,430 340,440 338,456 L342,476' + U.frillLine(342, 476, 258, 476, 7, -6) + 'L262,456 C260,440 249,430 245,412 C248,402 260,392 267,377Z';
        let m = c.defs + P(D, c.M, c.ml) + P('M258,462 Q300,472 342,462', 'none', c.s, 3);
        m += P('M279,399' + U.frill([279, 399], [300, 411], [321, 399], 4, 4) + 'Q300,404 279,399Z', c.s, c.sl, 1.6) + U.bow(300, 412, 24, 14, c.a, c.al, { sw: 1.5 });
        m += U.star(300, 440, 7, c.a, c.al, 1.4);
        return { main: m };
      } },
  ];

  /* ================= ボトムス ================= */
  A.BOTTOMS = [
    { id: 'pleats', n: 'プリーツ', tags: ['school', 'casual', 'cool', 'idol'], tb: [200, 440, 200, 150],
      draw(c) {
        const S = skirt(104, 48, { sag: 6, bell: 0.5 });
        let m = c.defs + P(S, c.M, c.ml);
        m += clipG(S, P('M300,460 L300,580 M286,460 L276,580 M314,460 L324,580 M274,460 L250,580 M326,460 L350,580 M266,460 L226,580 M334,460 L374,580', 'none', c.ml, 1.7, 'opacity=".4"') +
          P('M210,544 Q300,562 390,544', 'none', c.s, 5));
        m += belt(c, 457, c.M, c.ml);
        return { main: m };
      } },
    { id: 'frill', n: 'フリルスカート', tags: ['yume', 'princess', 'idol'], tb: [200, 440, 200, 150],
      draw(c) {
        let m = c.defs + P(tier(500, 572, 54, 88, 8, 8), c.s, c.sl) + P(tier(452, 520, 36, 66, 7, 8), c.M, c.ml);
        m += P('M246,506 Q300,522 354,506', 'none', c.a, 2.6) + P('M222,556 Q300,578 378,556', 'none', c.a, 2.6);
        m += belt(c, 457, c.a, c.al) + U.bow(326, 459, 28, 17, c.a, c.al, { sw: 1.6, tails: 16 });
        return { main: m };
      } },
    { id: 'tulle', n: 'チュール', tags: ['princess', 'fairy', 'yume', 'ballet'], tb: [180, 440, 240, 230],
      draw(c) {
        let m = c.defs + P(skirt(176, 74, { frill: 9, depth: 9, bell: 0.75 }), U.light(c.m, 0.65), c.ml, 2, 'opacity=".85"');
        m += P(skirt(152, 66, { frill: 8, depth: 9, bell: 0.75 }), U.light(c.m, 0.35), c.ml, 2, 'opacity=".9"');
        const S = skirt(126, 58, { frill: 7, depth: 9, bell: 0.75 });
        m += P(S, c.M, c.ml, 2) + clipG(S, P('M300,462 L300,590 M280,462 L258,590 M320,462 L342,590 M268,462 L226,580 M332,462 L374,580', 'none', c.ml, 1.5, 'opacity=".28"'));
        m += sparkles(51, 14, 200, 480, 400, 620) + belt(c, 457, c.a, c.al) + U.bow(300, 460, 34, 20, c.a, c.al, { sw: 1.7 });
        return { main: m };
      } },
    { id: 'shorts', n: 'ショートパンツ', tags: ['casual', 'cool', 'beach', 'idol'], tb: [210, 440, 180, 130],
      draw(c) {
        const S = 'M262,452 L338,452 C344,474 350,494 351,514 L350,554 L305,554 L300,531 L295,554 L250,554 L249,514 C250,494 256,474 262,452Z';
        let m = c.defs + P(S, c.M, c.ml);
        m += P('M249,541 L295,541 L296,556 L249,556Z M305,541 L351,541 L351,556 L304,556Z', c.s, c.sl, 2);
        m += P('M300,462 L300,530', 'none', c.ml, 1.6, 'opacity=".45"') + P('M260,474 q8,14 20,14 M340,474 q-8,14 -20,14', 'none', c.ml, 1.6, 'opacity=".5"');
        m += belt(c, 457, U.dark(c.m, 0.08), c.ml) + U.gem(300, 461, 4, c.a);
        return { main: m };
      } },
    { id: 'pants', n: 'ながズボン', tags: ['cool', 'casual', 'winter'], tb: [200, 440, 200, 320],
      draw(c) {
        const S = `M262,452 L338,452 C344,474 349,494 350,514 L343,${ANK - 4} L303,${ANK - 4} L300,534 L297,${ANK - 4} L257,${ANK - 4} L250,514 C251,494 256,474 262,452Z`;
        let m = c.defs + P(S, c.M, c.ml);
        m += P(`M256,${ANK - 20} L298,${ANK - 20} L298,${ANK - 2} L256,${ANK - 2}Z M302,${ANK - 20} L344,${ANK - 20} L344,${ANK - 2} L302,${ANK - 2}Z`, c.s, c.sl, 2);
        m += P('M300,462 L300,534', 'none', c.ml, 1.6, 'opacity=".45"') + P('M260,474 q8,14 20,14 M340,474 q-8,14 -20,14', 'none', c.ml, 1.6, 'opacity=".5"');
        m += P(`M276,560 L277,${ANK - 24} M324,560 L323,${ANK - 24}`, 'none', c.ml, 1.4, 'opacity=".3" stroke-dasharray="6 5"');
        m += U.star(272, 640, 8, c.a, c.al, 1.5) + belt(c, 457, U.dark(c.m, 0.08), c.ml) + U.gem(300, 461, 4, c.a);
        return { main: m };
      } },
    { id: 'suspender', n: 'つりスカート', tags: ['school', 'casual'], tb: [200, 370, 200, 230],
      draw(c) {
        const S = skirt(108, 56, { sag: 8, bell: 0.55 });
        let m = c.defs + P(S, c.M, c.ml) + clipG(S, P('M200,548 Q300,570 400,548', 'none', c.a, 6) + P('M284,462 L266,580 M316,462 L334,580', 'none', c.ml, 1.6, 'opacity=".3"'));
        m += belt(c, 457, c.M, c.ml);
        let o = P('M277,454 L268,376 M323,454 L332,376', 'none', c.ml, 12) + P('M277,454 L268,376 M323,454 L332,376', 'none', c.m, 8);
        o += U.gem(277, 456, 4.5, '#ffd95a', '#d99a18') + U.gem(323, 456, 4.5, '#ffd95a', '#d99a18');
        return { main: m, over: o };
      } },
  ];

  /* ================= くつした ================= */
  const legAt = (y) => { const t = (y - 508) / (ANK - 508); return { c: 276 + 3 * t, r: 21.5 + (12.5 - 21.5) * t }; };
  function sockBase(y0, y1, c, fill, line, deco, ex) {
    ex = ex || 1.6;
    const id = U.uid('sk');
    const L1 = U.capsule(276, 508, 21.5 + ex, 279, ANK, 12.5 + ex), R1 = U.capsule(324, 508, 21.5 + ex, 321, ANK, 12.5 + ex);
    const ds = y1 ? [L1, R1] : [L1, R1, ell(276, FOOT, 17 + ex, 10.5 + ex), ell(324, FOOT, 17 + ex, 10.5 + ex)];
    const id2 = U.uid('sk');
    return `<defs><clipPath id="${id}"><rect x="200" y="${y0}" width="200" height="${(y1 || 800) - y0}"/></clipPath>` +
      `<clipPath id="${id2}">${ds.map((d) => `<path d="${d}"/>`).join('')}</clipPath></defs>` +
      `<g clip-path="url(#${id})">${U.union(ds, fill, line)}${deco ? `<g clip-path="url(#${id2})">${deco}</g>` : ''}</g>`;
  }
  const sockTop = (y, fill, line, h) => {
    const a = legAt(y), w = a.r + 2.4; h = h || 7;
    return U.both(`<rect x="${f(a.c - w)}" y="${y - 1}" width="${f(w * 2)}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${line}" stroke-width="2"/>`);
  };
  A.SOCKS = [
    { id: 'none', n: 'なし' },
    { id: 'frill', n: 'フリルソックス', tags: ['school', 'yume', 'princess', 'casual'], tb: [236, 690, 128, 96],
      draw(c) {
        const y = 722, a = legAt(y), w = a.r + 3;
        const fr = P(`M${f(a.c - w)},${y + 4}` + U.frillLine(a.c - w, y + 4, a.c + w, y + 4, 4, -7) + 'Z', c.s, c.sl, 1.8);
        return c.defs + sockBase(y, 0, c, c.M, c.ml) + U.both(fr);
      } },
    { id: 'high', n: 'ハイソックス', tags: ['school', 'casual', 'cool', 'idol'], tb: [236, 610, 128, 176],
      draw(c) {
        const y = 636;
        return c.defs + sockBase(y, 0, c, c.M, c.ml, `<rect x="200" y="${y + 12}" width="200" height="5" fill="${c.a}"/><rect x="200" y="${y + 22}" width="200" height="5" fill="${c.a}"/>`) + sockTop(y, c.M, c.ml);
      } },
    { id: 'stripe', n: 'しましまニーハイ', tags: ['idol', 'magic', 'cool', 'yume'], tb: [226, 560, 148, 226],
      draw(c) {
        const y = 584; let d = '';
        for (let yy = y + 14; yy < 780; yy += 26) d += `<rect x="200" y="${yy}" width="200" height="12" fill="${c.a}"/>`;
        return c.defs + sockBase(y, 0, c, c.M, c.ml, d) + sockTop(y, c.M, c.ml);
      } },
    { id: 'tights', n: 'タイツ', tags: ['ballet', 'winter', 'princess'], tb: [226, 500, 148, 286],
      draw(c) {
        const d = [[270, 560], [282, 620], [272, 680], [330, 560], [318, 620], [328, 680]].map((p) => U.heart(p[0], p[1], 4, c.a)).join('');
        return c.defs + sockBase(500, 0, c, c.M, c.ml, `<g opacity=".7">${d}</g>`, 1.2);
      } },
    { id: 'warmer', n: 'レッグウォーマー', tags: ['idol', 'cool', 'winter', 'ballet'], tb: [232, 630, 136, 140],
      draw(c) {
        const d = [676, 690, 704, 718].map((y) => P(`M240,${y} Q276,${y + 7} 300,${y} Q324,${y + 7} 360,${y}`, 'none', c.ml, 1.6, 'opacity=".45"')).join('');
        return c.defs + sockBase(660, ANK - 4, c, c.M, c.ml, d, 5.5) + sockTop(658, c.s, c.sl, 8);
      } },
  ];

  /* ================= くつ ================= */
  const SHOE = 'M254,756 C254,745 262,743 266,747 C272,753 280,753 286,747 C290,743 298,745 298,756 C298,769 289,775 276,775 C263,775 254,769 254,756Z';
  const shine = () => P('M260,760 q2,7 9,9', 'none', '#fff', 2.4, 'opacity=".7"');
  A.SHOES = [
    { id: 'none', n: 'なし' },
    { id: 'strap', n: 'ストラップ', tags: ['school', 'casual', 'princess', 'yume'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P(SHOE, c.M, c.ml) + P('M257,746 Q276,738 295,746', 'none', c.ml, 8) + P('M257,746 Q276,738 295,746', 'none', c.m, 4.6) + U.gem(293, 746, 3, c.a) + shine();
        return c.defs + U.both(one);
      } },
    { id: 'sneaker', n: 'スニーカー', tags: ['casual', 'cool', 'idol', 'school'], tb: [236, 700, 128, 92],
      draw(c) {
        const B = 'M258,732 L296,732 C298,742 300,750 300,757 C300,770 290,776 276,776 C262,776 252,770 252,757 C252,750 254,742 258,732Z';
        const one = P(B, c.M, c.ml) + P('M254,762 C258,753 268,750 276,750 C284,750 294,753 298,762 C296,772 288,776 276,776 C264,776 256,772 254,762Z', c.s, c.sl, 2) +
          P('M267,737 h18 M266,743 h20', 'none', c.s, 2.6) + P('M254,768 Q276,781 298,768', 'none', c.a, 2.6) + U.star(291, 742, 4, c.a, c.al, 1);
        return c.defs + U.both(one);
      } },
    { id: 'boots', n: 'ブーツ', tags: ['cool', 'winter', 'magic', 'idol'], tb: [232, 660, 136, 132],
      draw(c) {
        const B = 'M259,692 L297,692 L296,738 C298,746 300,752 300,758 C300,770 290,776 276,776 C262,776 252,770 252,758 C252,752 254,746 256,738Z';
        const one = P(B, c.M, c.ml) + P('M255,686 h46 a6,6 0 0 1 0,14 h-46 a6,6 0 0 1 0,-14Z', c.s, c.sl, 2) +
          P('M270,708 l12,7 M282,708 l-12,7 M270,720 l12,7 M282,720 l-12,7', 'none', c.a, 2.2) + U.bow(276, 738, 20, 11, c.a, c.al, { sw: 1.3 }) +
          P('M254,768 Q276,781 298,768', 'none', U.dark(c.m, 0.25), 2.6) + shine();
        return c.defs + U.both(one);
      } },
    { id: 'ribbon', n: 'リボンパンプス', tags: ['princess', 'idol', 'yume', 'magic'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P(SHOE, c.M, c.ml) + shine() + U.bow(276, 757, 28, 16, c.a, c.al, { sw: 1.6 });
        return c.defs + U.both(one);
      } },
    { id: 'sandal', n: 'サンダル', tags: ['beach', 'casual', 'fairy'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P('M253,759 C255,772 265,777 276,777 C287,777 297,772 299,759 C293,769 285,771 276,771 C267,771 259,769 253,759Z', U.dark(c.m, 0.12), c.ml, 2) +
          P('M258,753 Q276,744 294,753', 'none', c.ml, 8) + P('M258,753 Q276,744 294,753', 'none', c.m, 4.6) +
          P('M261,765 Q276,758 291,765', 'none', c.ml, 7) + P('M261,765 Q276,758 291,765', 'none', c.m, 3.8) + U.flower(276, 750, 8, c.a, '#fff6b8', 5, c.al);
        return c.defs + U.both(one);
      } },
    { id: 'glass', n: 'ガラスのくつ', tags: ['princess', 'fairy', 'yume'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P(SHOE, c.M, U.light(c.ml, 0.1), 2.2, 'fill-opacity=".55"') + P('M259,758 q2,9 10,11', 'none', '#fff', 3, 'opacity=".9"') +
          U.sparkle(288, 752, 6, '#fff', 0.95) + U.sparkle(264, 748, 3.5, '#fff', 0.9) + U.gem(276, 753, 4, c.a);
        return c.defs + U.both(one);
      } },
    { id: 'ballet', n: 'バレエシューズ', tags: ['ballet', 'princess'], tb: [232, 680, 136, 112],
      draw(c) {
        const one = P('M264,744 L291,716 M290,744 L265,716', 'none', c.ml, 5.5) + P('M264,744 L291,716 M290,744 L265,716', 'none', c.m, 3) +
          P(SHOE, c.M, c.ml) + shine() + U.bow(278, 714, 22, 12, c.M, c.ml, { sw: 1.3, tails: 12 });
        return c.defs + U.both(one);
      } },
    { id: 'zori', n: 'ぞうり', tags: ['matsuri'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P('M252,759 C254,773 265,778 276,778 C287,778 298,773 300,759 C294,769 285,772 276,772 C267,772 258,769 252,759Z', '#c98b4d', '#8a5a2c', 2) +
          P('M276,749 L260,763 M276,749 L292,763', 'none', c.al, 7) + P('M276,749 L260,763 M276,749 L292,763', 'none', c.a, 4);
        return c.defs + U.both(one);
      } },
  ];

  /* ================= くみあわせ ================= */
  A.wearParts = function (st) {
    const o = { back: '', legs: '', main: '', over: '', tie: '#ff6fa5' };
    const add = (r) => { if (!r) return; o.back += r.back || ''; o.main += r.main || ''; o.over += r.over || ''; };
    if ((st.socks | 0) > 0 && A.SOCKS[st.socks]) o.legs += A.SOCKS[st.socks].draw(C(st.socksC));
    if ((st.shoes | 0) > 0 && A.SHOES[st.shoes]) o.legs += A.SHOES[st.shoes].draw(C(st.shoesC));
    if ((st.dress | 0) > 0 && A.DRESSES[st.dress]) {
      add(A.DRESSES[st.dress].draw(C(st.dressC)));
      o.tie = (A.SCHEMES[st.dressC] || A.SCHEMES[0]).a;
    } else {
      add((A.BOTTOMS[st.bottom] || A.BOTTOMS[0]).draw(C(st.bottomC)));
      add((A.TOPS[st.top] || A.TOPS[0]).draw(C(st.topC)));
      o.tie = (A.SCHEMES[st.topC] || A.SCHEMES[0]).a;
    }
    return o;
  };
})(window);
