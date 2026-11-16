/* きらきら☆おしゃれスタジオ — ついかの ふく（おとこのこも おんなのこも じゆうに きられる） */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f, ell = U.ell, K = A._wk;
  const sleeve = K.sleeve, cuff = K.cuff, clipG = K.clipG, belt = K.belt, sockBase = K.sockBase, sockTop = K.sockTop, shine = K.shine;
  const BOD_TEE = K.BOD_TEE, BOD_FIT = K.BOD_FIT, BOD_WIDE = K.BOD_WIDE, SHOE = K.SHOE;
  const ANK = A.ANK;
  const GOLD = '#ffd24a', GOLDL = '#c9860f', WH = '#ffffff', WHL = '#d3c9dc';
  const RR = (x, y, w, h, r, fill, line, sw) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${line ? ` stroke="${line}" stroke-width="${sw || 2}"` : ''}/>`;
  const TX = (t, x, y, sz, fill, line) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz}" font-weight="bold" fill="${fill}"${line ? ` stroke="${line}" stroke-width="1.6" paint-order="stroke"` : ''} font-family="'Arial Black','Segoe UI','Yu Gothic UI',sans-serif">${t}</text>`;
  const dots = (ys, fill, r) => ys.map((y) => `<circle cx="300" cy="${y}" r="${r || 2.6}" fill="${fill}"/>`).join('');

  /* よく つかう かたち */
  const PANTS = `M262,452 L338,452 C344,474 349,494 350,514 L343,${ANK - 4} L303,${ANK - 4} L300,534 L297,${ANK - 4} L257,${ANK - 4} L250,514 C251,494 256,474 262,452Z`;
  const SHORTS = 'M262,452 L338,452 C344,474 350,494 351,514 L350,554 L305,554 L300,531 L295,554 L250,554 L249,514 C250,494 256,474 262,452Z';
  const JACKET = 'M251,375 C266,371 280,371 288,373 C292,386 308,386 312,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 340,440 338,455 L345,500 Q322,509 300,499 Q278,509 255,500 L262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
  const ONESIE = 'M249,374 C266,370 281,370 289,373 C293,387 307,387 311,373 C319,370 334,370 351,374 C361,381 363,394 360,410 C357,430 351,444 351,462 C355,484 357,504 353,526 C330,540 270,540 247,526 C243,504 245,484 249,462 C249,444 243,430 240,410 C237,394 239,381 249,374Z';
  const COLLAR = 'M300,383 C291,372 277,371 267,377 C268,392 283,401 299,394Z';
  const crease = (line) => P('M300,462 L300,534', 'none', line, 1.6, 'opacity=".45"');

  /* ================= ドレス・セット ================= */
  A.DRESSES.push(
    { id: 'prince', n: 'おうじさま', b: 1, tags: ['prince', 'cool'], tb: [170, 350, 260, 410],
      draw(c) {
        let m = c.defs + P(PANTS, c.s, c.sl) + crease(c.sl) + P(`M254,524 L259,${ANK - 8} M346,524 L341,${ANK - 8}`, 'none', GOLD, 3.2);
        m += P(JACKET, c.M, c.ml) + clipG(JACKET, P('M322,366 L272,506', 'none', c.al, 16) + P('M322,366 L272,506', 'none', c.a, 12) + P('M250,492 Q278,502 300,492 Q322,502 350,492', 'none', GOLD, 4.5));
        m += [[287, 414], [313, 414], [289, 436], [311, 436]].map((p) => U.gem(p[0], p[1], 3.4, GOLD, GOLDL)).join('');
        m += belt(c, 457, c.s, c.sl) + U.gem(300, 461, 5.5, GOLD, GOLDL);
        let o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.8, 0.95, 14.6, c.s, c.sl) + cuff(0.8, 0.83, 15, GOLD, GOLDL);
        o += U.both(`<ellipse cx="246" cy="379" rx="17" ry="8.5" fill="${GOLD}" stroke="${GOLDL}" stroke-width="2"/>` + P('M233,384 v9 M239.5,386 v10 M246,387 v10 M252.5,386 v10 M259,384 v9', 'none', GOLDL, 2.4));
        o += P('M285,366 C291,374 309,374 315,366 L316,381 C308,388 292,388 284,381Z', c.a, c.al, 2) + U.gem(300, 385, 4.5, GOLD, GOLDL);
        return { main: m, over: o };
      } },

    { id: 'tuxedo', n: 'タキシード', b: 1, tags: ['prince', 'idol', 'cool'], tb: [170, 350, 260, 410],
      draw(c) {
        const dk = U.dark(c.m, 0.2);
        let m = c.defs + P(PANTS, c.M, c.ml) + crease(c.ml) + P(`M277,540 L278,${ANK - 8} M323,540 L322,${ANK - 8}`, 'none', c.ml, 1.4, 'opacity=".3"');
        m += P(JACKET, c.M, c.ml);
        m += P('M286,372 C292,386 308,386 314,372 L319,378 L300,474 L281,378Z', WH, WHL, 1.6) + dots([406, 426, 446], c.a);
        m += U.both(P('M287,372 L277,376 L282,424 L300,476 L296,440 L290,400Z', dk, c.ml, 1.6));
        m += U.gem(300, 485, 3.4, GOLD, GOLDL) + P('M318,420 l14,-3 l-1,9 l-11,3Z', c.a, c.al, 1.2);
        const o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.9, 0.97, 13.4, WH, WHL) + U.bow(300, 385, 32, 18, c.a, c.al, { sw: 1.6 });
        return { main: m, over: o };
      } },

    { id: 'gakuran', n: 'がくせいふく', b: 1, tags: ['school', 'cool'], tb: [170, 350, 260, 410],
      draw(c) {
        const J = 'M251,375 C266,371 280,371 288,373 C292,380 308,380 312,373 C320,371 334,371 349,375 C358,381 360,394 357,408 C353,426 340,440 338,455 L344,502 Q300,512 256,502 L262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
        let m = c.defs + P(PANTS, c.M, c.ml) + crease(c.ml);
        m += P(J, c.M, c.ml) + P('M300,382 L300,508', 'none', c.ml, 1.8, 'opacity=".55"') + [398, 421, 444, 467, 490].map((y) => U.gem(300, y, 3.6, GOLD, GOLDL)).join('');
        m += P('M316,428 h24', 'none', c.ml, 1.8, 'opacity=".5"');
        let o = sleeve(0.9, 16.5, 14, c.M, c.ml) + cuff(0.86, 0.89, 14.4, GOLD, GOLDL);
        o += P('M284,362 C291,371 309,371 316,362 L317,381 C308,388 292,388 283,381Z', c.M, c.ml, 2) + P('M286,366 C292,373 308,373 314,366', 'none', WH, 2.2) + P('M300,372 v13', 'none', c.ml, 1.6);
        return { main: m, over: o };
      } },

    { id: 'ninja', n: 'にんじゃ', b: 1, tags: ['ninja', 'cool'], tb: [170, 350, 260, 410],
      draw(c) {
        const Y = ANK - 62;
        const S = `M262,452 L338,452 C354,494 368,566 360,${Y} L303,${Y} L300,534 L297,${Y} L240,${Y} C232,566 246,494 262,452Z`;
        let m = c.defs + P(S, c.M, c.ml) + clipG(S, P('M254,520 q10,40 2,100 M346,520 q-10,40 -2,100 M280,560 q2,40 -6,90 M320,560 q-2,40 6,90', 'none', c.ml, 1.6, 'opacity=".35"'));
        m += U.both(RR(261, ANK - 66, 35, 60, 9, c.a, c.al) + P(`M262,${ANK - 50} l33,9 M262,${ANK - 32} l33,9 M262,${ANK - 14} l33,7`, 'none', c.al, 1.6, 'opacity=".7"'));
        m += P(BOD_TEE, c.M, c.ml);
        m += P('M291,369 L282,373 L300,414 L307,402Z', c.a, c.al, 1.8) + P('M309,369 L318,373 L290,452 L279,452Z', c.a, c.al, 1.8);
        m += P('M260,440 Q300,449 340,440 L340,470 Q300,479 260,470Z', c.a, c.al) + P('M260,455 Q300,464 340,455', 'none', c.s, 2.4, 'opacity=".8"');
        m += P('M318,471 l-4,34 l10,-7 l8,9 l-2,-38Z', c.a, c.al, 1.8);
        const o = sleeve(0.3, 16.5, 16, c.M, c.ml) + cuff(0.56, 0.95, 13.4, U.dark(c.m, 0.16), c.ml) + cuff(0.56, 0.61, 13.9, c.a, c.al) + cuff(0.9, 0.95, 13.9, c.a, c.al);
        return { main: m, over: o };
      } },

    { id: 'soccer', n: 'サッカーユニフォーム', b: 1, tags: ['sports', 'casual'], tb: [180, 350, 240, 230],
      draw(c) {
        let m = c.defs + P(SHORTS, c.s, c.sl) + P('M253,476 L252,552 M347,476 L348,552', 'none', c.a, 4) + P('M300,462 L300,530', 'none', c.sl, 1.6, 'opacity=".5"') + TX('10', 273, 540, 15, c.a);
        m += P(BOD_TEE, c.M, c.ml) + clipG(BOD_TEE, P('M246,400 L262,490 M354,400 L338,490', 'none', c.s, 7, 'opacity=".85"'));
        m += P('M288,373 L300,394 L312,373', 'none', c.al, 7) + P('M288,373 L300,394 L312,373', 'none', c.a, 4);
        m += TX('10', 300, 452, 40, c.s, c.ml);
        return { main: m, over: sleeve(0.27, 16.5, 16, c.M, c.ml) + cuff(0.2, 0.3, 16.6, c.a, c.al) };
      } },

    { id: 'hero', n: 'ヒーロースーツ', b: 1, tags: ['hero', 'cool'], tb: [170, 350, 260, 410],
      draw(c) {
        const L1 = U.capsule(276, 508, 23, 279, ANK - 16, 14.5), L2 = U.capsule(324, 508, 23, 321, ANK - 16, 14.5);
        let m = c.defs + U.union([L1, L2], c.M, c.ml);
        m += P('M262,455 Q300,463 338,455 C340,474 350,490 350,508 C350,525 326,533 300,533 C274,533 250,525 250,508 C250,490 260,474 262,455Z', c.a, c.al);
        m += P(BOD_FIT, c.M, c.ml);
        m += `<circle cx="300" cy="418" r="19" fill="${c.s}" stroke="${c.sl}" stroke-width="2"/>` + P('M305,402 L291,421 L299,421 L294,436 L310,415 L301,415Z', c.a, c.al, 1.3);
        m += belt(c, 457, GOLD, GOLDL) + RR(291, 452, 18, 14, 3, '#fff3b0', GOLDL, 1.6);
        const o = sleeve(0.93, 15, 12.6, c.M, c.ml) + cuff(0.74, 0.97, 13.4, c.a, c.al) + cuff(0.72, 0.76, 14.4, c.s, c.sl);
        return { main: m, over: o };
      } },

    { id: 'pirate', n: 'かいぞく', b: 1, tags: ['pirate', 'cool'], tb: [170, 350, 260, 310],
      draw(c) {
        const Y = 640, dk = U.dark(c.m, 0.25), dkl = U.dark(dk, 0.3);
        const PT = `M262,452 L338,452 C344,474 350,494 351,514 L352,${Y}` + U.zig(352, Y, 304, Y, 3, -9) + `L300,534L296,${Y}` + U.zig(296, Y, 248, Y, 3, -9) + 'L249,514 C250,494 256,474 262,452Z';
        let m = c.defs + P(PT, dk, dkl) + crease(dkl) + RR(262, 588, 22, 18, 3, c.s, c.sl, 1.6) + P('M262,594 h22 M270,588 v18', 'none', c.sl, 1.2);
        let st = '';
        for (let y = 384; y < 490; y += 16) st += `<rect x="230" y="${y}" width="140" height="7" fill="${c.a}"/>`;
        m += P(BOD_TEE, WH, WHL) + clipG(BOD_TEE, st) + P(BOD_TEE, 'none', '#b8aec4');
        const V = 'M251,375 C262,372 272,371 281,372 C277,400 279,444 283,484 C273,486 264,485 256,481 C259,472 262,463 262,455 C260,440 247,426 243,408 C240,394 242,381 251,375Z';
        m += U.both(P(V, c.M, c.ml) + `<circle cx="275" cy="428" r="3" fill="${GOLD}" stroke="${GOLDL}" stroke-width="1"/>`);
        m += P('M258,448 Q300,458 342,448 L342,470 Q300,480 258,470Z', c.a, c.al) + P('M274,468 l-12,40 l13,-7 l7,11 l6,-42Z', c.a, c.al, 1.8) + U.gem(300, 464, 6, GOLD, GOLDL);
        const o = sleeve(0.3, 16.5, 16, WH, WHL) + cuff(0.08, 0.14, 16.4, c.a, c.al) + cuff(0.22, 0.3, 16.6, c.a, c.al);
        return { main: m, over: o };
      } },

    { id: 'dino', n: 'きょうりゅうきぐるみ', b: 1, tags: ['dino', 'yume'], tb: [140, 350, 340, 410],
      draw(c) {
        const L1 = U.capsule(276, 506, 27, 278, ANK - 22, 20), L2 = U.capsule(324, 506, 27, 322, ANK - 22, 20);
        let m = c.defs + U.union([L1, L2, ONESIE], c.M, c.ml);
        m += P(ell(300, 462, 31, 46), c.s, c.sl, 1.8) + P('M275,442 Q300,450 325,442 M271,462 Q300,470 329,462 M275,482 Q300,490 325,482', 'none', c.sl, 1.6, 'opacity=".6"');
        m += U.both(RR(257, ANK - 20, 42, 13, 6.5, c.s, c.sl, 1.8));
        const o = sleeve(0.93, 18, 15.5, c.M, c.ml) + cuff(0.87, 0.97, 16, c.s, c.sl);
        const b = P('M330,496 C392,496 446,538 456,602 C459,628 440,638 428,622 C414,590 382,560 334,550Z', c.M, c.ml) + P('M370,506 l12,-20 l8,23Z M408,532 l16,-15 l1,24Z M436,570 l18,-8 l-5,22Z', c.a, c.al, 1.6);
        return { main: m, over: o, back: b };
      } },

    { id: 'jinbei', n: 'じんべい', b: 1, tags: ['matsuri', 'beach'], tb: [180, 350, 240, 240],
      draw(c) {
        let ln = '';
        for (let x = 238; x <= 362; x += 12) ln += `<rect x="${x}" y="360" width="2.4" height="210" fill="${c.s}" opacity=".7"/>`;
        let m = c.defs + P(SHORTS, c.M, c.ml) + clipG(SHORTS, ln) + P('M300,462 L300,530', 'none', c.ml, 1.6, 'opacity=".45"');
        m += P(BOD_WIDE, c.M, c.ml) + clipG(BOD_WIDE, ln);
        m += P('M291,369 L282,373 L300,416 L307,403Z', c.a, c.al, 1.8) + P('M309,369 L318,373 L286,488 L275,486Z', c.a, c.al, 1.8);
        m += U.bow(279, 468, 20, 11, c.s, c.sl, { sw: 1.3, tails: 12 });
        return { main: m, over: sleeve(0.36, 17.5, 18.5, c.M, c.ml) + cuff(0.3, 0.37, 18.9, c.a, c.al) };
      } },

    { id: 'overall', n: 'オーバーオール', b: 1, tags: ['casual', 'dino'], tb: [180, 350, 240, 410],
      draw(c) {
        const den = U.mix(c.m, '#5b7fbf', 0.55), dl = U.dark(den, 0.35);
        let st = '';
        for (let y = 384; y < 480; y += 14) st += `<rect x="230" y="${y}" width="140" height="6" fill="${c.a}" opacity=".6"/>`;
        let m = c.defs + P(BOD_TEE, c.s, c.sl) + clipG(BOD_TEE, st);
        m += P(PANTS, den, dl) + P('M276,402 Q300,398 324,402 L327,456 L273,456Z', den, dl);
        m += P('M278,404 L270,375 M322,404 L330,375', 'none', dl, 12) + P('M278,404 L270,375 M322,404 L330,375', 'none', den, 8);
        m += U.gem(279, 409, 4, GOLD, GOLDL) + U.gem(321, 409, 4, GOLD, GOLDL);
        m += P('M288,418 L312,418 L311,440 Q300,446 289,440Z', U.light(den, 0.2), dl, 1.6) + U.star(300, 430, 6, c.a, c.al, 1.2);
        m += crease(dl) + P('M258,474 q8,14 20,14 M342,474 q-8,14 -20,14', 'none', '#ffcf7a', 1.6, 'stroke-dasharray="4 3"');
        m += P(`M256,${ANK - 18} L298,${ANK - 18} L298,${ANK - 3} L256,${ANK - 3}Z M302,${ANK - 18} L344,${ANK - 18} L344,${ANK - 3} L302,${ANK - 3}Z`, U.light(den, 0.35), dl, 2);
        return { main: m, over: sleeve(0.27, 16.5, 16, c.s, c.sl) + cuff(0.2, 0.3, 16.6, c.a, c.al) };
      } },

    { id: 'astro', n: 'うちゅうふく', b: 1, tags: ['space', 'hero'], tb: [150, 350, 300, 410],
      draw(c) {
        const w = '#ffffff', wl = '#aebbd8';
        const L1 = U.capsule(276, 506, 26, 278, ANK - 20, 19), L2 = U.capsule(324, 506, 26, 322, ANK - 20, 19);
        let m = U.union([L1, L2, ONESIE], w, wl);
        m += U.both(RR(253, 606, 47, 12, 6, c.m, c.ml, 1.8) + RR(257, ANK - 20, 42, 14, 7, c.a, c.al, 1.8));
        m += RR(278, 408, 44, 32, 6, '#e6edf8', wl, 2) + `<circle cx="289" cy="419" r="4" fill="${c.a}"/><circle cx="300" cy="419" r="4" fill="#ffd24a"/><circle cx="311" cy="419" r="4" fill="#8de8cc"/>` + P('M285,431 h30', 'none', wl, 3);
        m += P('M250,462 Q300,474 350,462 L351,476 Q300,488 249,476Z', c.m, c.ml, 2) + U.star(334, 396, 7, c.a, c.al, 1.2);
        let o = sleeve(0.93, 18, 15.5, w, wl) + cuff(0.4, 0.47, 17.4, c.m, c.ml) + cuff(0.84, 0.97, 16, c.a, c.al);
        o += P('M281,364 C290,375 310,375 319,364 L321,383 C309,392 291,392 279,383Z', c.m, c.ml, 2);
        return { main: m, over: o };
      } },

    { id: 'explorer', n: 'たんけんたい', b: 1, tags: ['dino', 'casual', 'beach'], tb: [180, 350, 240, 240],
      draw(c) {
        const kh = U.mix(c.m, '#d9b878', 0.55), kl = U.dark(kh, 0.35), kp = U.light(kh, 0.2);
        let m = P(SHORTS, kh, kl) + P('M249,541 L295,541 L296,556 L249,556Z M305,541 L351,541 L351,556 L304,556Z', kp, kl, 2) + RR(254, 498, 22, 24, 3, kp, kl, 1.5) + RR(324, 498, 22, 24, 3, kp, kl, 1.5);
        m += P('M300,462 L300,530', 'none', kl, 1.6, 'opacity=".45"');
        m += P(BOD_TEE, kh, kl) + P('M300,392 L300,484', 'none', kl, 1.6, 'opacity=".5"') + dots([410, 432], kl);
        m += U.both(RR(264, 408, 24, 22, 3, kp, kl, 1.5) + P('M264,415 h24', 'none', kl, 1.4));
        m += belt(c, 457, '#8a5a36', '#5a3a20') + RR(292, 452, 16, 13, 3, GOLD, GOLDL, 1.6);
        let o = sleeve(0.27, 16.5, 16, kh, kl) + cuff(0.22, 0.3, 16.6, kp, kl);
        o += U.both(P(COLLAR, kp, kl, 2)) + P('M284,372 Q300,384 316,372 L312,386 L300,404 L288,386Z', c.a, c.al, 1.8);
        return { main: m, over: o };
      } },
  );

  /* ================= トップス ================= */
  A.TOPS.push(
    { id: 'shirt', n: 'えりつきシャツ', b: 1, tags: ['school', 'casual', 'prince'], tb: [196, 356, 208, 150],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.M, c.ml) + P('M300,392 L300,484', 'none', c.ml, 1.6, 'opacity=".5"') + dots([408, 430, 452, 474], c.a);
        m += RR(316, 412, 22, 22, 3, U.light(c.m, 0.2), c.ml, 1.5);
        const o = sleeve(0.27, 16.5, 16, c.M, c.ml) + cuff(0.22, 0.3, 16.6, c.s, c.sl) + U.both(P(COLLAR, c.s, c.sl, 2));
        return { main: m, over: o };
      } },
    { id: 'vest', n: 'ベスト', b: 1, tags: ['school', 'prince', 'idol'], tb: [196, 356, 208, 150],
      draw(c) {
        const V = 'M252,376 C262,372 272,371 282,372 L300,440 L318,372 C328,371 338,372 348,376 C357,382 359,394 356,408 C352,426 340,440 338,455 L343,482 Q300,500 257,482 L262,455 C260,440 248,426 244,408 C241,394 243,382 252,376Z';
        let m = c.defs + P(BOD_TEE, WH, WHL);
        m += P('M295,384 L305,384 L303,393 L297,393Z', c.a, c.al, 1.4) + P('M297,393 L303,393 L306,424 L300,432 L294,424Z', c.a, c.al, 1.4);
        m += P(V, c.M, c.ml) + P('M300,444 L300,490', 'none', c.ml, 1.6, 'opacity=".5"') + [454, 470, 486].map((y) => U.gem(300, y, 2.8, GOLD, GOLDL)).join('');
        const o = sleeve(0.9, 16.5, 14, WH, WHL) + cuff(0.86, 0.95, 14.4, WH, WHL) + U.both(P(COLLAR, WH, WHL, 2));
        return { main: m, over: o };
      } },
    { id: 'stajan', n: 'スタジャン', b: 1, tags: ['cool', 'casual', 'sports', 'winter'], tb: [190, 340, 220, 170],
      draw(c) {
        let m = c.defs + P(BOD_WIDE, c.M, c.ml);
        m += clipG(BOD_WIDE, `<rect x="230" y="472" width="140" height="26" fill="${c.s}"/><rect x="230" y="477" width="140" height="4" fill="${c.a}"/><rect x="230" y="485" width="140" height="4" fill="${c.a}"/>`) + P(BOD_WIDE, 'none', c.ml);
        m += P('M300,386 L300,474', 'none', c.ml, 1.8, 'opacity=".5"') + [400, 420, 440, 460].map((y) => `<circle cx="300" cy="${y}" r="3" fill="${c.s}" stroke="${c.sl}" stroke-width="1.2"/>`).join('');
        m += TX('K', 325, 428, 24, c.a, WH);
        let o = sleeve(0.9, 16.5, 14, c.s, c.sl) + cuff(0.84, 0.95, 14.6, c.M, c.ml) + cuff(0.87, 0.9, 15, c.a, c.al);
        o += P('M282,364 C290,374 310,374 318,364 L319,383 C309,391 291,391 281,383Z', c.s, c.sl, 2) + P('M283,373 C291,381 309,381 317,373', 'none', c.a, 3);
        return { main: m, over: o };
      } },
    { id: 'tank', n: 'タンクトップ', b: 1, tags: ['sports', 'beach', 'casual'], tb: [196, 356, 208, 150],
      draw(c) {
        const D = 'M265,376 L280,376 C283,394 291,401 300,401 C309,401 317,394 320,376 L335,376 C339,392 350,402 354,412 C351,430 340,440 338,456 L342,482 C320,489 280,489 258,482 L262,456 C260,440 249,430 246,412 C250,402 261,392 265,376Z';
        let m = c.defs + P(D, c.M, c.ml) + P('M280,376 C283,394 291,401 300,401 C309,401 317,394 320,376', 'none', c.s, 3.4) + P('M259,470 Q300,480 341,470', 'none', c.s, 3.4);
        m += U.star(300, 436, 13, c.a, c.al, 1.8);
        return { main: m };
      } },
    { id: 'aloha', n: 'アロハシャツ', b: 1, tags: ['beach', 'pirate', 'casual'], tb: [196, 356, 208, 150],
      draw(c) {
        const r = U.rng(57);
        let fl = '';
        for (let i = 0; i < 9; i++) { const x = 250 + r() * 100, y = 392 + r() * 86; fl += U.flower(x, y, 7 + r() * 4, i % 2 ? c.s : c.a, i % 2 ? c.a : c.s, 5); }
        const m = c.defs + P(BOD_TEE, c.M, c.ml) + clipG(BOD_TEE, fl) + P(BOD_TEE, 'none', c.ml) + P('M300,398 L300,484', 'none', c.ml, 1.6, 'opacity=".5"');
        const o = sleeve(0.3, 17, 17, c.M, c.ml) + U.both(P('M300,397 C290,381 278,372 267,376 C270,390 282,400 296,405Z', U.light(c.m, 0.35), c.ml, 2));
        return { main: m, over: o };
      } },
    { id: 'raglan', n: 'ラグランTシャツ', b: 1, tags: ['casual', 'sports', 'cool'], tb: [196, 356, 208, 150],
      draw(c) {
        let m = c.defs + P(BOD_TEE, c.s, c.sl) + P('M289,373 C293,386 307,386 311,373', 'none', c.m, 4.5);
        m += P('M307,404 L290,429 L299,429 L293,450 L313,421 L302,421Z', c.a, c.al, 1.6);
        return { main: m, over: sleeve(0.62, 16.5, 14.5, c.M, c.ml) + cuff(0.56, 0.64, 15, c.a, c.al) };
      } },
  );

  /* ================= ボトムス ================= */
  A.BOTTOMS.push(
    { id: 'half', n: 'ハーフパンツ', b: 1, tags: ['casual', 'sports', 'cool', 'dino', 'beach'], tb: [200, 440, 200, 190],
      draw(c) {
        const S = 'M262,452 L338,452 C344,474 350,494 351,514 L350,606 L304,606 L300,533 L296,606 L250,606 L249,514 C250,494 256,474 262,452Z';
        let m = c.defs + P(S, c.M, c.ml) + P('M251,592 L296,592 M304,592 L349,592', 'none', c.s, 4);
        m += P('M300,462 L300,532', 'none', c.ml, 1.6, 'opacity=".45"') + P('M260,474 q8,14 20,14 M340,474 q-8,14 -20,14', 'none', c.ml, 1.6, 'opacity=".5"');
        m += U.both(RR(253, 534, 22, 26, 3, U.light(c.m, 0.15), c.ml, 1.5) + P('M253,542 h22', 'none', c.ml, 1.4));
        m += belt(c, 457, U.dark(c.m, 0.08), c.ml) + P('M294,462 q-2,12 -6,18 M306,462 q2,12 6,18', 'none', c.s, 2.2);
        return { main: m };
      } },
    { id: 'jeans', n: 'ジーンズ', b: 1, tags: ['casual', 'cool'], tb: [200, 440, 200, 320],
      draw(c) {
        const den = U.mix(c.m, '#4f74c0', 0.62), dl = U.dark(den, 0.38), stc = '#ffcf7a';
        let m = P(PANTS, den, dl) + crease(dl);
        m += P('M260,474 q8,14 20,14 M340,474 q-8,14 -20,14', 'none', stc, 1.6, 'stroke-dasharray="4 3"') + P(`M254,520 L259,${ANK - 26} M346,520 L341,${ANK - 26}`, 'none', stc, 1.4, 'stroke-dasharray="4 4" opacity=".8"');
        m += P(`M255,${ANK - 22} L299,${ANK - 22} L298,${ANK - 2} L256,${ANK - 2}Z M301,${ANK - 22} L345,${ANK - 22} L344,${ANK - 2} L302,${ANK - 2}Z`, U.light(den, 0.4), dl, 2);
        m += `<ellipse cx="277" cy="612" rx="9" ry="13" fill="#fff" opacity=".16"/><ellipse cx="323" cy="612" rx="9" ry="13" fill="#fff" opacity=".16"/>`;
        m += belt(c, 457, den, dl) + `<circle cx="300" cy="461" r="3.2" fill="${GOLD}" stroke="${GOLDL}" stroke-width="1"/>` + RR(318, 453, 14, 10, 2, c.a, c.al, 1.2);
        return { main: m };
      } },
    { id: 'track', n: 'ジャージズボン', b: 1, tags: ['sports', 'casual', 'school'], tb: [200, 440, 200, 320],
      draw(c) {
        let m = c.defs + P(PANTS, c.M, c.ml) + crease(c.ml);
        m += P(`M255,480 L261,${ANK - 20} M345,480 L339,${ANK - 20}`, 'none', c.s, 3.4) + P(`M261,480 L267,${ANK - 20} M339,480 L333,${ANK - 20}`, 'none', c.s, 2.2);
        m += U.both(RR(255, ANK - 20, 44, 16, 6, U.dark(c.m, 0.12), c.ml, 2));
        m += belt(c, 457, U.dark(c.m, 0.1), c.ml) + P('M294,462 q-2,12 -6,18 M306,462 q2,12 6,18', 'none', c.s, 2.2);
        return { main: m };
      } },
    { id: 'suspants', n: 'サスペンダーパンツ', b: 1, tags: ['school', 'prince', 'casual'], tb: [200, 370, 200, 230],
      draw(c) {
        let m = c.defs + P(SHORTS, c.M, c.ml) + P('M249,541 L295,541 L296,556 L249,556Z M305,541 L351,541 L351,556 L304,556Z', c.s, c.sl, 2);
        m += P('M300,462 L300,530', 'none', c.ml, 1.6, 'opacity=".45"') + belt(c, 457, c.M, c.ml);
        let o = P('M277,454 L268,376 M323,454 L332,376', 'none', c.al, 10) + P('M277,454 L268,376 M323,454 L332,376', 'none', c.a, 6.5);
        o += U.gem(277, 456, 4.2, GOLD, GOLDL) + U.gem(323, 456, 4.2, GOLD, GOLDL);
        return { main: m, over: o };
      } },
  );

  /* ================= くつした ================= */
  A.SOCKS.push(
    { id: 'ankle', n: 'くるぶしソックス', b: 1, tags: ['sports', 'casual', 'beach'], tb: [236, 700, 128, 86],
      draw(c) { const y = 730; return c.defs + sockBase(y, 0, c, c.M, c.ml) + sockTop(y, c.a, c.al, 6); } },
    { id: 'line', n: 'ラインソックス', b: 1, tags: ['casual', 'sports', 'school', 'cool'], tb: [236, 650, 128, 136],
      draw(c) {
        const y = 682;
        return c.defs + sockBase(y, 0, c, c.M, c.ml, `<rect x="200" y="${y + 10}" width="200" height="5" fill="${c.a}"/><rect x="200" y="${y + 19}" width="200" height="5" fill="${c.s}"/><rect x="200" y="${y + 28}" width="200" height="5" fill="${c.a}"/>`) + sockTop(y, c.M, c.ml);
      } },
    { id: 'soccer', n: 'サッカーソックス', b: 1, tags: ['sports'], tb: [226, 570, 148, 216],
      draw(c) {
        const y = 600;
        return c.defs + sockBase(y, 0, c, c.M, c.ml, `<rect x="200" y="${y + 9}" width="200" height="9" fill="${c.s}"/><rect x="200" y="${y + 23}" width="200" height="5" fill="${c.s}"/>`) + sockTop(y, c.a, c.al, 8);
      } },
  );

  /* ================= くつ ================= */
  A.SHOES.push(
    { id: 'hightop', n: 'ハイカット', b: 1, tags: ['cool', 'sports', 'casual', 'hero'], tb: [232, 690, 136, 102],
      draw(c) {
        const B = 'M258,714 L296,714 C298,736 300,750 300,757 C300,770 290,776 276,776 C262,776 252,770 252,757 C252,750 254,736 258,714Z';
        const one = P(B, c.M, c.ml) + P('M254,762 C258,753 268,750 276,750 C284,750 294,753 298,762 C296,772 288,776 276,776 C264,776 256,772 254,762Z', c.s, c.sl, 2) +
          P('M266,724 h20 M265,732 h22 M265,740 h22', 'none', c.s, 2.6) + P('M254,768 Q276,781 298,768', 'none', c.a, 2.6) +
          P('M256,711 h42 a4,4 0 0 1 0,8 h-42 a4,4 0 0 1 0,-8Z', c.a, c.al, 1.6);
        return c.defs + U.both(one);
      } },
    { id: 'loafer', n: 'ローファー', b: 1, tags: ['school', 'prince', 'idol'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = P(SHOE, c.M, c.ml) + P('M258,752 Q276,744 294,752 L294,759 Q276,751 258,759Z', U.dark(c.m, 0.15), c.ml, 1.4) + RR(271, 748, 10, 6, 1.5, c.a, c.al, 1) +
          P('M254,768 Q276,780 298,768', 'none', U.dark(c.m, 0.35), 2.6) + shine();
        return c.defs + U.both(one);
      } },
    { id: 'geta', n: 'げた', b: 1, tags: ['matsuri', 'ninja'], tb: [236, 706, 128, 86],
      draw(c) {
        const one = RR(260, 770, 9, 10, 1.5, '#a8744a', '#6a4424', 1.6) + RR(283, 770, 9, 10, 1.5, '#a8744a', '#6a4424', 1.6) + RR(252, 760, 48, 12, 4, '#d9a066', '#8a5a2c', 2) +
          P('M276,748 L261,762 M276,748 L291,762', 'none', c.al, 7) + P('M276,748 L261,762 M276,748 L291,762', 'none', c.a, 4);
        return c.defs + U.both(one);
      } },
    { id: 'longboots', n: 'ロングブーツ', b: 1, tags: ['pirate', 'prince', 'hero', 'cool'], tb: [232, 640, 136, 152],
      draw(c) {
        const B = 'M258,676 L298,676 L296,738 C298,746 300,752 300,758 C300,770 290,776 276,776 C262,776 252,770 252,758 C252,752 254,746 256,738Z';
        const one = P(B, c.M, c.ml) + P('M252,664 L304,664 L300,690 L256,690Z', c.s, c.sl, 2) + P('M256,730 h40', 'none', U.dark(c.m, 0.3), 5) + RR(268, 723, 18, 13, 2, GOLD, GOLDL, 1.6) + RR(272, 726.5, 10, 6, 1, c.m) +
          P('M254,768 Q276,781 298,768', 'none', U.dark(c.m, 0.3), 2.8) + P('M262,696 q-2,14 0,26', 'none', '#fff', 3, 'opacity=".45"');
        return c.defs + U.both(one);
      } },
    { id: 'spike', n: 'スパイク', b: 1, tags: ['sports'], tb: [236, 700, 128, 92],
      draw(c) {
        const B = 'M258,734 L296,734 C298,744 300,750 300,757 C300,769 290,774 276,774 C262,774 252,769 252,757 C252,750 254,744 258,734Z';
        const one = [258, 270, 282, 294].map((x) => RR(x - 3, 771, 6, 7, 1.5, '#5a5278')).join('') + P(B, c.M, c.ml) + P('M256,763 C264,753 284,749 298,753', 'none', c.s, 4) + P('M267,739 h18 M266,745 h20', 'none', c.s, 2.4) + shine();
        return c.defs + U.both(one);
      } },
  );

  /* おまかせの ときに おとこのこが えらびやすい もの（もとから ある アイテム） */
  [[A.DRESSES, ['salopette']], [A.TOPS, ['tee', 'hoodie', 'jersey', 'border', 'knit', 'sailor']], [A.BOTTOMS, ['shorts', 'pants', 'harem']],
    [A.SOCKS, ['high']], [A.SHOES, ['sneaker', 'boots', 'rain', 'sandal']]]
    .forEach((p) => p[1].forEach((id) => { const it = p[0].find((x) => x.id === id); if (it) it.b = 1; }));
})(window);
