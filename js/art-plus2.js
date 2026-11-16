/* きらきら☆おしゃれスタジオ — ついかの アクセ・おとも・はいけい・スタンプ */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f, ell = U.ell, K = A._ak, B = A._bk;
  const GOLD = K.GOLD, GOLDL = K.GOLDL, goldDefs = K.goldDefs, two = K.two, clipG = K.clipG, fingers = K.fingers, PX = K.PX, pboth = K.pboth, pface = K.pface;
  const RR = (x, y, w, h, r, fill, line, sw) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${line ? ` stroke="${line}" stroke-width="${sw || 2}"` : ''}/>`;
  const DK = '#3a3446';

  /* ================= あたま ================= */
  A.HEADS.push(
    { id: 'cap', n: 'キャップ', b: 1, tags: ['sports', 'casual', 'cool', 'dino'], tb: [90, 30, 350, 160],
      draw(c) {
        let s = c.defs + P('M214,150 C150,146 112,156 104,172 C140,186 206,180 262,156Z', c.a, c.al);
        s += P('M192,152 C180,84 240,54 300,54 C360,54 420,84 408,152 C376,136 224,136 192,152Z', c.M, c.ml);
        s += P('M300,54 C292,84 290,112 292,138 M246,64 C234,90 230,118 232,142 M354,64 C366,90 370,118 368,142', 'none', c.ml, 1.5, 'opacity=".4"') + `<circle cx="300" cy="54" r="6" fill="${c.a}" stroke="${c.al}" stroke-width="1.6"/>`;
        s += U.star(262, 108, 14, c.s, c.sl, 2);
        return { front: s };
      } },
    { id: 'headphone', n: 'ヘッドホン', b: 1, tags: ['cool', 'idol', 'casual'], tb: [140, 70, 320, 250],
      draw(c) {
        const d = 'M184,250 C178,150 240,93 300,93 C360,93 422,150 416,250';
        return { front: c.defs + two(d, c.ml, 11, c.m, 7) + U.both(RR(166, 230, 36, 64, 15, c.M, c.ml, 2.2) + RR(160, 244, 12, 36, 6, c.a, c.al, 1.6) + `<circle cx="184" cy="262" r="8" fill="${c.s}" stroke="${c.sl}" stroke-width="1.4"/>`) };
      } },
    { id: 'hachimaki', n: 'はちまき', b: 1, tags: ['sports', 'matsuri'], tb: [170, 110, 300, 150],
      draw(c) {
        let s = c.defs + P('M400,196 C426,190 446,196 458,214 C444,214 432,218 424,228Z', c.M, c.ml, 2) + P('M402,202 C424,206 440,220 446,244 C432,238 420,236 410,240Z', c.M, c.ml, 2);
        s += P('M190,192 C230,172 370,172 410,192 L411,212 C370,192 230,192 189,212Z', c.M, c.ml) + `<circle cx="403" cy="202" r="8" fill="${c.M}" stroke="${c.ml}" stroke-width="2"/>`;
        s += `<circle cx="300" cy="186" r="9" fill="${c.a}" stroke="${c.al}" stroke-width="1.6"/>`;
        return { front: s };
      } },
    { id: 'goggles', n: 'ゴーグル', b: 1, tags: ['hero', 'space', 'cool', 'dino'], tb: [170, 100, 260, 130],
      draw(c) {
        const lens = `<circle cx="258" cy="160" r="27" fill="${c.M}" stroke="${c.ml}" stroke-width="2.5"/><circle cx="258" cy="160" r="19" fill="#bfe9ff" stroke="#5fa8d8" stroke-width="2"/>` + P('M246,152 q5,-8 14,-9', 'none', '#fff', 3.4, 'opacity=".85"');
        return { front: c.defs + P('M190,186 C220,150 380,150 410,186', 'none', c.al, 12) + P('M190,186 C220,150 380,150 410,186', 'none', c.a, 8) + RR(284, 152, 32, 14, 6, c.M, c.ml, 2) + U.both(lens) };
      } },
    { id: 'piratehat', n: 'かいぞくぼうし', b: 1, tags: ['pirate'], tb: [120, 10, 360, 160],
      draw(c) {
        const D = 'M140,140 C160,104 200,92 226,104 C238,50 362,50 374,104 C400,92 440,104 460,140 C408,122 192,122 140,140Z';
        let s = c.defs + P('M366,96 C380,60 400,46 422,50 C410,64 404,82 400,102Z', '#f2485c', '#b8182e', 1.8) + P(D, c.M, c.ml) + P('M150,133 C198,116 402,116 450,133', 'none', GOLD, 4);
        s += P('M282,106 L318,82 M282,82 L318,106', 'none', '#ffffff', 5) + RR(293, 95, 14, 10, 3, '#fff', '#c9c4d6', 1.4) + `<circle cx="300" cy="88" r="13" fill="#fff" stroke="#c9c4d6" stroke-width="1.6"/>` +
          `<circle cx="295" cy="88" r="3.4" fill="${DK}"/><circle cx="305" cy="88" r="3.4" fill="${DK}"/>`;
        return { front: s };
      } },
    { id: 'dinohood', n: 'きょうりゅうフード', b: 1, tags: ['dino'], tb: [160, 0, 280, 170],
      draw(c) {
        let s = c.defs + P('M262,62 L274,30 L288,58 L300,22 L312,58 L326,30 L338,62Z', c.a, c.al, 2);
        s += U.union([ell(246, 70, 22, 20), ell(354, 70, 22, 20), 'M190,150 C180,86 240,56 300,56 C360,56 420,86 410,150 C380,138 220,138 190,150Z'], c.M, c.ml);
        s += `<circle cx="246" cy="70" r="12" fill="#fff"/><circle cx="354" cy="70" r="12" fill="#fff"/><circle cx="249" cy="72" r="6" fill="#3b2430"/><circle cx="351" cy="72" r="6" fill="#3b2430"/><circle cx="251" cy="69" r="2" fill="#fff"/><circle cx="353" cy="69" r="2" fill="#fff"/>`;
        s += `<ellipse cx="288" cy="104" rx="3" ry="4.5" fill="${c.ml}"/><ellipse cx="312" cy="104" rx="3" ry="4.5" fill="${c.ml}"/>`;
        s += P('M196,146' + U.zig(196, 146, 404, 146, 9, 12) + ' C380,134 220,134 196,146Z', '#ffffff', '#d3c9dc', 1.6);
        return { front: s };
      } },
    { id: 'astrohelmet', n: 'うちゅうヘルメット', b: 1, tags: ['space'], tb: [120, 60, 360, 340],
      draw(c) {
        return { front: `<circle cx="300" cy="232" r="152" fill="#cfeaff" fill-opacity=".2" stroke="#9fc4e8" stroke-width="5"/>` + P('M186,170 C200,120 240,92 284,86', 'none', '#fff', 9, 'opacity=".75"') + P('M176,214 C176,200 178,190 181,182', 'none', '#fff', 7, 'opacity=".6"') +
          RR(232, 366, 136, 24, 12, c.m, c.ml, 2.5) + `<circle cx="300" cy="378" r="5" fill="${c.a}"/>` };
      } },
    { id: 'hachigane', n: 'にんじゃのはちがね', b: 1, tags: ['ninja'], tb: [170, 110, 300, 150],
      draw(c) {
        let s = c.defs + P('M402,200 C430,204 448,222 452,250 C438,240 424,238 412,242Z', c.M, c.ml, 2) + P('M400,198 C424,190 446,194 462,208 C446,210 434,216 426,226Z', c.M, c.ml, 2);
        s += P('M190,192 C230,172 370,172 410,192 L411,214 C370,194 230,194 189,214Z', c.M, c.ml);
        s += P('M252,172 C284,166 316,166 348,172 L348,200 C316,194 284,194 252,200Z', '#d8dce8', '#8a90a8', 2) + P('M293,184 c0,-8 14,-8 14,0 c0,7 -10,7 -10,1 c0,-3 5,-3 5,0', 'none', '#6a7090', 2) +
          `<circle cx="259" cy="179" r="1.6" fill="#8a90a8"/><circle cx="341" cy="179" r="1.6" fill="#8a90a8"/>`;
        return { front: s };
      } },
    { id: 'safari', n: 'たんけんぼう', b: 1, tags: ['dino', 'beach'], tb: [130, 30, 340, 150],
      draw(c) {
        const kh = U.mix(c.m, '#e0c080', 0.6), kl = U.dark(kh, 0.35);
        let s = P('M146,134 C146,114 214,104 300,104 C386,104 454,114 454,134 C454,152 386,160 300,160 C214,160 146,152 146,134Z', kh, kl);
        s += P('M210,128 C208,70 250,44 300,44 C350,44 392,70 390,128 C352,140 248,140 210,128Z', kh, kl) + P('M300,44 C296,72 296,100 298,132 M256,54 C246,80 244,104 246,128 M344,54 C354,80 356,104 354,128', 'none', kl, 1.5, 'opacity=".4"');
        s += P('M211,110 C250,124 350,124 389,110 L390,128 C352,142 248,142 210,128Z', c.a, c.al, 2);
        return { front: s };
      } },
    { id: 'horns', n: 'ドラゴンのつの', b: 1, tags: ['dino', 'hero', 'halloween'], tb: [180, 30, 240, 140],
      draw(c) {
        const h = P('M228,140 C214,110 214,76 232,50 C240,80 256,106 272,122Z', c.M, c.ml) + P('M226,112 q10,-4 18,2 M224,88 q8,-3 14,1', 'none', c.ml, 1.6, 'opacity=".5"');
        return { front: c.defs + U.both(h) };
      } },
    { id: 'bandana', n: 'バンダナ', b: 1, tags: ['pirate', 'casual'], tb: [160, 50, 310, 200],
      draw(c) {
        const D = 'M190,196 C180,110 240,82 300,82 C360,82 420,110 410,196 C372,176 228,176 190,196Z';
        let s = c.defs + P('M404,186 C428,190 444,206 448,232 C434,224 422,222 412,226Z', c.M, c.ml, 2) + P('M402,184 C424,176 444,180 458,192 C444,194 432,200 426,210Z', c.M, c.ml, 2);
        s += P(D, c.M, c.ml) + clipG(D, [[226, 130], [262, 108], [300, 132], [338, 108], [374, 130], [244, 160], [282, 156], [320, 156], [358, 160], [300, 100]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${c.s}" opacity=".9"/>`).join(''));
        s += P('M190,196 C228,176 372,176 410,196', 'none', c.al, 5) + `<circle cx="405" cy="190" r="8" fill="${c.M}" stroke="${c.ml}" stroke-width="2"/>`;
        return { front: s };
      } },
  );

  /* ================= めがね ================= */
  A.GLASSES.push(
    { id: 'mask', n: 'ヒーローマスク', b: 1, tags: ['hero', 'ninja'], tb: [190, 220, 220, 100],
      draw() {
        const D = 'M206,254 C232,236 282,242 300,256 C318,242 368,236 394,254 C400,278 376,298 350,296 C328,294 312,280 300,274 C288,280 272,294 250,296 C224,298 200,278 206,254Z ' + ell(250, 267, 21, 22) + ' ' + ell(350, 267, 21, 22);
        return P(D, '#f2485c', '#b8182e', 2.5, 'fill-rule="evenodd"') + P('M216,256 q12,-9 26,-10', 'none', '#fff', 3, 'opacity=".6"');
      } },
    { id: 'eyepatch', n: 'がんたい', b: 1, tags: ['pirate'], tb: [190, 200, 220, 110],
      draw() {
        return P('M198,232 L326,252 M374,256 L404,244', 'none', DK, 4) + P('M324,250 C338,238 372,240 378,258 C382,280 366,296 348,296 C330,294 320,272 324,250Z', '#4a4458', '#2a2438', 2.5) + P('M336,258 q8,-8 18,-7', 'none', '#fff', 2.6, 'opacity=".35"');
      } },
  );

  /* ================= くび ================= */
  A.NECKS.push(
    { id: 'necktie', n: 'ネクタイ', b: 1, tags: ['school', 'prince', 'idol'], tb: [250, 350, 100, 120],
      draw: () => P('M293,373 L307,373 L304,385 L296,385Z', '#3a6fe8', '#2448a8', 1.6) + P('M296,385 L304,385 L310,438 L300,450 L290,438Z', '#3a6fe8', '#2448a8', 1.6) + P('M294,402 l13,8 M292,420 l16,9', 'none', '#ffd24a', 2.6) },
    { id: 'bowtie', n: 'ちょうネクタイ', b: 1, tags: ['prince', 'idol', 'school'], tb: [250, 350, 100, 70],
      draw: () => U.bow(300, 382, 42, 23, '#f2485c', '#b8182e', { sw: 1.8, knot: '#ffd24a' }) },
    { id: 'heroscarf', n: 'ヒーローマフラー', b: 1, tags: ['hero', 'ninja'], tb: [240, 330, 230, 120],
      draw() {
        const c = '#f2485c', l = '#b8182e';
        return P('M322,366 C362,356 404,372 436,360 C432,380 438,394 448,404 C410,410 370,392 326,392Z', c, l) + P('M340,374 C370,372 400,384 430,378', 'none', l, 1.5, 'opacity=".5"') +
          P('M273,349 C290,360 310,360 327,349 C333,362 333,375 329,384 C310,396 290,396 271,384 C267,375 267,362 273,349Z', c, l) + P('M274,372 q26,12 52,2', 'none', l, 1.4, 'opacity=".5"');
      } },
    { id: 'medal', n: 'きんメダル', b: 1, tags: ['sports'], tb: [250, 345, 100, 120],
      draw: () => P('M283,368 L300,424 L317,368', 'none', '#2448a8', 9) + P('M283,368 L300,424 L317,368', 'none', '#3a8fe8', 6) + P('M283,368 L300,424 L317,368', 'none', '#fff', 1.6) +
        `<circle cx="300" cy="432" r="14" fill="${GOLD}" stroke="${GOLDL}" stroke-width="2.2"/>` + U.star(300, 432, 7, '#fff3b0', GOLDL, 1) },
    { id: 'whistle', n: 'ホイッスル', b: 1, tags: ['sports'], tb: [250, 345, 100, 110],
      draw: () => P('M281,370 Q300,430 319,370', 'none', '#f2485c', 2.6) + RR(290, 413, 26, 12, 4, GOLD, GOLDL, 1.8) + `<circle cx="297" cy="424" r="9" fill="${GOLD}" stroke="${GOLDL}" stroke-width="1.8"/><circle cx="297" cy="424" r="3" fill="${GOLDL}"/>` },
    { id: 'neckerchief', n: 'くびのバンダナ', b: 1, tags: ['pirate', 'dino', 'casual'], tb: [250, 345, 100, 80],
      draw: () => P('M276,362 Q300,376 324,362 L321,382 L300,408 L279,382Z', '#f2485c', '#b8182e', 2) + [[290, 381], [310, 381], [300, 394], [300, 373]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="#fff"/>`).join('') },
  );

  /* ================= て ================= */
  const pent = (x, y, r, rot) => P(U.starPath(x, y, r, r * 0.81, 5, rot), DK);
  const soccerBall = (cx, cy, R) => {
    const k = R / 34;
    return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#8a90a8" stroke-width="${f(2.5 * k)}"/>` + clipG(ell(cx, cy, R, R), pent(cx, cy, 12 * k, -90) + [0, 1, 2, 3, 4].map((i) => {
      const a = (-90 + i * 72) * Math.PI / 180;
      return pent(cx + 31 * k * Math.cos(a), cy + 31 * k * Math.sin(a), 11 * k, 90 + i * 72) + P(`M${f(cx + 12 * k * Math.cos(a))},${f(cy + 12 * k * Math.sin(a))} L${f(cx + 21 * k * Math.cos(a))},${f(cy + 21 * k * Math.sin(a))}`, 'none', DK, 2 * k);
    }).join('')) + P(`M${f(cx - 22 * k)},${f(cy - 20 * k)} q${f(8 * k)},${f(-10 * k)} ${f(20 * k)},${f(-12 * k)}`, 'none', '#fff', 4 * k, 'opacity=".8"');
  };
  A.soccerBall = soccerBall;
  A.HANDS.push(
    { id: 'ball', n: 'サッカーボール', b: 1, tags: ['sports'], tb: [360, 510, 130, 130],
      draw(k) { return soccerBall(418, 580, 34) + fingers(398, 552, k); } },
    { id: 'sword', n: 'おもちゃのけん', b: 1, tags: ['prince', 'hero', 'pirate'], tb: [360, 340, 150, 250],
      draw(k) {
        return P('M455,370 L467,353 L465,374Z', '#e8ecf6', '#8a90a8', 2) + two('M407,520 L460,372', '#8a90a8', 15, '#e8ecf6', 10) + P('M436,446 L444,424', 'none', '#fff', 3, 'opacity=".8"') +
          two('M392,560 L404,528', '#5a3a8a', 10, '#8a5cf0', 6) + two('M386,512 L426,528', GOLDL, 11, GOLD, 7) + `<circle cx="390" cy="566" r="6.5" fill="${GOLD}" stroke="${GOLDL}" stroke-width="1.8"/>` + U.gem(406, 520, 4, '#f2485c') + fingers(397, 546, k);
      } },
    { id: 'net', n: 'むしとりあみ', b: 1, tags: ['dino', 'casual'], tb: [340, 240, 200, 350],
      draw(k) {
        return two('M388,580 L452,330', '#8a5a2c', 7, '#d9a05c', 4) + P('M418,318 C426,360 452,392 478,392 C492,372 494,340 488,314', '#ffffff', '#c9cfe0', 2, 'fill-opacity=".55"') +
          P('M430,330 C440,356 456,376 474,384 M450,324 C456,348 466,368 480,378 M420,340 C440,344 470,340 490,332 M428,362 C446,366 470,362 490,352', 'none', '#b8c0d6', 1.3) +
          `<ellipse cx="453" cy="318" rx="36" ry="11" fill="none" stroke="#3a8fe8" stroke-width="5"/>` + fingers(396, 548, k);
      } },
    { id: 'game', n: 'ゲームき', b: 1, tags: ['casual', 'cool'], tb: [350, 500, 120, 90],
      draw(k) {
        return RR(374, 526, 70, 42, 10, '#ff6f8f', '#c93a60', 2.2) + RR(392, 533, 34, 26, 4, '#bfe9ff', '#5fa8d8', 1.6) + P('M398,552 l8,-10 l6,6 l4,-4 l6,8Z', '#8de8cc') + P('M379,547 h9 M383.5,542.5 v9', 'none', '#fff', 2.6) +
          `<circle cx="433" cy="543" r="2.6" fill="#ffe680"/><circle cx="438" cy="551" r="2.6" fill="#8ed4ff"/>` + fingers(392, 548, k);
      } },
    { id: 'shuriken', n: 'しゅりけん', b: 1, tags: ['ninja'], tb: [360, 480, 120, 120],
      draw(k) {
        return P(U.starPath(424, 528, 34, 11, 4, -70), '#d8dce8', '#6a7090', 2.5) + `<circle cx="424" cy="528" r="6" fill="#ffffff" stroke="#6a7090" stroke-width="2"/>` + P('M410,506 l8,14', 'none', '#fff', 3, 'opacity=".8"') + fingers(399, 546, k);
      } },
    { id: 'telescope', n: 'ぼうえんきょう', b: 1, tags: ['pirate', 'dino', 'space'], tb: [360, 430, 140, 150],
      draw(k) {
        return two('M392,556 L424,510', GOLDL, 17, GOLD, 13) + two('M422,513 L448,476', '#8a5a2c', 21, '#c98b4d', 17) + two('M447,478 L462,456', GOLDL, 25, GOLD, 21) + P('M455,451 L471,463', 'none', '#bfe9ff', 6) + fingers(398, 548, k);
      } },
    { id: 'trophy', n: 'トロフィー', b: 1, tags: ['sports', 'prince'], tb: [350, 430, 130, 150],
      draw(k) {
        const id = U.uid('tg');
        return goldDefs(id) + P('M388,470 C372,470 372,500 392,504 M440,470 C456,470 456,500 436,504', 'none', GOLDL, 5) + P('M386,456 L442,456 C442,496 432,516 414,518 C396,516 386,496 386,456Z', `url(#${id})`, GOLDL, 2.2) +
          RR(409, 516, 10, 20, 2, GOLD, GOLDL, 1.8) + RR(396, 534, 36, 12, 4, '#8a5a36', '#5a3a20', 1.8) + U.star(414, 482, 11, '#fff', GOLDL, 1.4) + U.sparkle(452, 446, 7, '#fff7c2') + fingers(398, 548, k);
      } },
    { id: 'skate', n: 'スケボー', b: 1, tags: ['cool', 'sports'], tb: [360, 380, 120, 260],
      draw(k) {
        const wh = (x, y) => RR(x, y, 10, 20, 4, '#5a5278', '#2e2a44', 1.6);
        return `<g transform="rotate(8 420 510)">` + wh(394, 432) + wh(436, 432) + wh(394, 558) + wh(436, 558) + RR(402, 400, 36, 210, 18, '#ff8a2c', '#c9601a', 2.5) + P('M420,420 v170', 'none', '#ffe680', 5) + U.star(420, 505, 11, '#fff', '#c9601a', 1.4) + '</g>' + fingers(404, 546, k);
      } },
    { id: 'megaphone', n: 'メガホン', b: 1, tags: ['sports', 'idol'], tb: [360, 470, 140, 120],
      draw(k) {
        return P('M398,538 L460,494 L474,560Z', '#ffd24a', '#c9860f', 2.5) + P('M447,503 L458,556', 'none', '#f2485c', 6) + `<ellipse cx="467" cy="527" rx="9" ry="34" transform="rotate(-12 467 527)" fill="#fff3b0" stroke="#c9860f" stroke-width="2.5"/>` +
          RR(388, 534, 16, 12, 4, '#f2485c', '#b8182e', 1.8) + P('M488,500 l12,-8 M492,524 l14,0 M488,548 l12,8', 'none', '#ff9ec6', 4) + fingers(399, 550, k);
      } },
  );

  /* ================= せなか ================= */
  A.BACKS.push(
    { id: 'ruck', n: 'リュック', b: 1, tags: ['casual', 'school', 'dino', 'sports'], tb: [200, 340, 200, 220],
      draw() {
        const c = '#4f8fe8', l = '#2a5cb0';
        const back = P('M282,364 q18,-18 36,0', 'none', l, 6) + RR(232, 366, 136, 164, 30, c, l, 2.5) + RR(250, 452, 100, 62, 14, U.light(c, 0.2), l, 2) + P('M250,474 h100', 'none', l, 2, 'opacity=".6"') + RR(292, 468, 16, 10, 3, GOLD, GOLDL, 1.4);
        const strap = U.both(P('M264,377 C256,404 254,436 258,462', 'none', l, 9.5) + P('M264,377 C256,404 254,436 258,462', 'none', c, 6));
        return { back, front: strap };
      } },
    { id: 'jet', n: 'ジェットパック', b: 1, tags: ['space', 'hero'], tb: [170, 340, 260, 290],
      draw() {
        const tank = P('M220,522 C212,560 226,584 232,604 C238,584 252,560 244,522Z', '#ffb347', '#ff7a2c', 2) + P('M226,524 C222,548 230,566 232,580 C234,566 242,548 238,524Z', '#fff3a8') +
          P('M214,502 L250,502 L244,522 L220,522Z', '#8a90a8', '#5a6078', 2) + RR(206, 372, 52, 132, 24, '#d8dce8', '#8a90a8', 2.5) + `<rect x="207.5" y="420" width="49" height="14" fill="#f2485c"/>` + P('M218,384 q-2,40 0,100', 'none', '#fff', 5, 'opacity=".6"');
        const strap = U.both(P('M262,376 C254,404 252,440 256,470', 'none', '#5a6078', 9) + P('M262,376 C254,404 252,440 256,470', 'none', '#8a90a8', 5.5));
        return { back: RR(252, 400, 96, 60, 10, '#b9c0d6', '#8a90a8', 2.5) + U.both(tank), front: strap };
      } },
    { id: 'katana', n: 'せなかのかたな', b: 1, tags: ['ninja'], tb: [180, 280, 260, 300],
      draw() {
        const back = two('M236,560 L372,344', '#2a2438', 13, '#40395a', 9) + two('M372,344 L398,302', '#5a3a8a', 12, '#8a5cf0', 8) + P('M377,336 L383,326 M385,323 L391,313', 'none', GOLD, 3) +
          `<ellipse cx="371" cy="346" rx="13" ry="6" transform="rotate(32 371 346)" fill="${GOLD}" stroke="${GOLDL}" stroke-width="2"/>`;
        const front = P('M338,378 L264,452', 'none', '#262040', 9) + P('M338,378 L264,452', 'none', '#5a5278', 5.5);
        return { back, front };
      } },
    { id: 'herocape', n: 'ヒーローマント', b: 1, tags: ['hero', 'prince'], tb: [130, 350, 340, 330],
      draw() {
        const D = 'M246,376 C200,430 160,540 138,640 Q170,632 196,652 Q228,634 258,656 Q300,640 342,656 Q372,634 404,652 Q430,632 462,640 C440,540 400,430 354,376Z';
        const back = P(D, '#f2485c', '#b8182e') + clipG(D, P('M232,400 C206,480 186,570 176,660 M368,400 C394,480 414,570 424,660 M300,420 L300,650', 'none', '#b8182e', 2, 'opacity=".35"'));
        const front = P('M262,373 Q300,392 338,373 L339,385 Q300,405 261,385Z', '#ff6f80', '#b8182e', 2) + U.star(300, 393, 9, GOLD, GOLDL, 1.6);
        return { back, front };
      } },
  );

  /* ================= おとも ================= */
  A.PETS.push(
    { id: 'dino', n: 'きょうりゅう', b: 1, tags: ['dino', 'cool'], tb: [440, 630, 135, 150],
      draw() {
        const c = '#8fd4f5', l = '#3a8fc8', b = '#fff3c4', pl = '#ffb347', pll = '#d9782a';
        return two('M522,756 C546,760 558,744 554,726', l, 12, c, 7.5) + P('M476,724 l-10,-16 l16,6Z M470,744 l-14,-8 l14,-6Z', pl, pll, 1.4) +
          P(ell(PX, 746, 26, 27), c, l) + P(ell(PX, 752, 14, 17), b) + pboth(P(ell(PX - 11, 768, 9, 6.5), c, l, 2)) +
          P(`M${PX - 20},684 l6,-13 l7,11 l7,-15 l7,15 l7,-11 l6,13Z`, pl, pll, 1.6) + P(ell(PX, 704, 32, 27), c, l) + P(ell(PX, 714, 16, 10), U.light(c, 0.4)) +
          pface(699, { noNose: true, blush: '#ffb0a0' }) + `<circle cx="${PX - 5}" cy="706" r="1.5" fill="${l}"/><circle cx="${PX + 5}" cy="706" r="1.5" fill="${l}"/>` +
          P(`M${PX - 10},717 l3,5 l3,-4 M${PX + 4},718 l3,4 l3,-5`, '#fff', l, 1);
      } },
    { id: 'robot', n: 'ロボット', b: 1, tags: ['space', 'hero', 'cool'], tb: [445, 630, 110, 150],
      draw() {
        const c = '#cfd8ea', l = '#7a86a8';
        return P(`M${PX},668 v-14`, 'none', l, 3) + `<circle cx="${PX}" cy="652" r="5" fill="#f2485c" stroke="#b8182e" stroke-width="1.4"/>` +
          pboth(RR(PX - 40, 730, 12, 26, 6, c, l, 2) + RR(PX - 20, 764, 16, 12, 4, c, l, 2)) + RR(PX - 26, 722, 52, 46, 10, c, l, 2.5) + RR(PX - 15, 730, 30, 18, 4, '#8ee6ff', '#3a9cc8', 1.6) + P(`M${PX - 10},740 l5,-5 l5,8 l5,-6 l4,3`, 'none', '#fff', 1.6) +
          `<circle cx="${PX - 9}" cy="757" r="3" fill="#ffd24a"/><circle cx="${PX}" cy="757" r="3" fill="#ff7fb2"/><circle cx="${PX + 9}" cy="757" r="3" fill="#8de8cc"/>` +
          RR(PX - 32, 668, 64, 50, 14, c, l, 2.5) + pboth(RR(PX - 39, 684, 8, 16, 3, '#ffd24a', '#c9860f', 1.4) + `<circle cx="${PX - 13}" cy="690" r="8" fill="#fff" stroke="${l}" stroke-width="1.6"/><circle cx="${PX - 13}" cy="690" r="4.5" fill="#3ab8e8"/><circle cx="${PX - 14.5}" cy="688.5" r="1.5" fill="#fff"/>`) +
          P(`M${PX - 9},705 q9,7 18,0`, 'none', l, 2.2) + pboth(`<ellipse cx="${PX - 23}" cy="703" rx="4.5" ry="2.8" fill="#ff9cb8" opacity=".7"/>`);
      } },
    { id: 'beetle', n: 'カブトムシ', b: 1, tags: ['dino', 'casual'], tb: [450, 670, 100, 115],
      draw() {
        const c = '#a8623c', l = '#6a3a1e', H = `M${PX - 3},718 L${PX - 2},694 L${PX - 12},682 M${PX - 2},694 L${PX + 9},684`;
        return pboth(P(`M${PX - 22},750 l-14,-6 M${PX - 24},760 l-14,2 M${PX - 20},770 l-12,8`, 'none', l, 3)) + P(ell(PX, 754, 27, 23), c, l) + P(`M${PX},736 v40`, 'none', l, 2) + P(`M${PX - 16},744 q4,-6 10,-7`, 'none', '#fff', 3, 'opacity=".4"') +
          P(H, 'none', l, 8) + P(H, 'none', c, 4.5) + P(ell(PX, 728, 20, 14), U.dark(c, 0.12), l) + pface(726, { noNose: true, noMouth: true, blush: '#ffb07a' }) + P(`M${PX - 4},735 q4,3 8,0`, 'none', '#3b2430', 1.6);
      } },
    { id: 'lion', n: 'ライオン', b: 1, tags: ['hero', 'cool', 'dino'], tb: [435, 630, 130, 150],
      draw() {
        const c = '#ffd27a', l = '#c98f35', mn = '#e8873a', ml = '#b05f1c';
        return two('M522,754 C542,750 548,734 544,722', l, 9, c, 5) + `<circle cx="545" cy="718" r="7" fill="${mn}" stroke="${ml}" stroke-width="1.6"/>` + P(ell(PX, 746, 25, 26), c, l) + P(ell(PX, 752, 14, 16), '#fff3d6') + pboth(P(ell(PX - 11, 767, 8.5, 6), c, l, 2)) +
          P(A.fluffy(PX, 702, 37, 11), mn, ml, 2.4) + pboth(`<circle cx="${PX - 24}" cy="680" r="8" fill="${c}" stroke="${l}" stroke-width="2"/>`) + P(ell(PX, 704, 28, 25), c, l) + P(ell(PX, 713, 12, 8.5), '#fff3d6') +
          pface(701, { nose: '#8a4a2a', blush: '#ffa08a' });
      } },
    { id: 'parrot', n: 'オウム', b: 1, tags: ['pirate', 'beach'], tb: [450, 640, 100, 160],
      draw() {
        const c = '#f2485c', l = '#b8182e';
        return P(`M${PX - 6},760 L${PX - 12},792 L${PX - 2},781 L${PX + 4},794 L${PX + 8},762Z`, '#3a8fe8', '#2448a8', 1.8) + P('M490,772 l-4,6 M490,772 l4,6 M510,772 l-4,6 M510,772 l4,6', 'none', '#ffa83c', 2.6) +
          P(ell(PX, 738, 24, 34), c, l) + P(ell(PX, 748, 13, 20), '#ffe680') + pboth(P(`M${PX - 22},728 q-12,16 -4,36 q12,-8 12,-28Z`, '#3a8fe8', '#2448a8', 2) + P(`M${PX - 24},744 q4,6 10,6`, 'none', '#8de8cc', 3)) +
          P(`M${PX - 6},700 q-4,-18 8,-22 q0,10 6,18Z`, '#ffd24a', '#c9860f', 1.6) + P(ell(PX, 712, 21, 19), c, l) + pboth(`<circle cx="${PX - 10}" cy="709" r="6.5" fill="#fff"/>`) + pface(709, { noNose: true, noMouth: true, blush: '#ffb0a0' }) +
          P(`M${PX - 6},715 h12 q0,12 -6,14 q-6,-2 -6,-14Z`, '#ffb347', '#c9760f', 1.6);
      } },
    { id: 'fox', n: 'きつね', b: 1, tags: ['ninja', 'matsuri', 'casual'], tb: [435, 630, 140, 150],
      draw() {
        const c = '#ffa95a', l = '#c9702a', w = '#fff6ea';
        return P('M520,760 C552,762 566,736 554,712 C548,728 536,738 522,742Z', c, l, 2.2) + P('M554,712 C562,724 560,738 552,748 C550,736 548,728 546,722Z', w, l, 1.6) +
          P(ell(PX, 746, 24, 26), c, l) + P(ell(PX, 752, 13, 17), w) + pboth(P(ell(PX - 10, 767, 8, 6), '#6a4a3a', '#4a3020', 2)) +
          pboth(P('M472,692 L466,652 L494,676Z', c, l) + P('M474,684 L471,664 L486,677Z', '#5a3a2a')) + P(ell(PX, 702, 31, 26), c, l) +
          pboth(P(`M${PX - 30},704 C${PX - 26},722 ${PX - 12},728 ${PX},728 L${PX},712 C${PX - 10},712 ${PX - 20},708 ${PX - 30},704Z`, w)) + pface(700, { nose: '#3b2430' });
      } },
  );

  /* ================= はいけい ================= */
  const X0 = B.X0, Y0 = B.Y0, W = B.W, H = B.H, FL = B.FL, R = B.R, Ci = B.Ci, El = B.El, sky = B.sky, cloud = B.cloud, hill = B.hill, glow = B.glow;
  const floorLines = (c, op) => { let s = ''; for (let x = -400; x <= 1000; x += 100) s += P(`M${x},${FL} L${f(300 + (x - 300) * 1.9)},1050`, 'none', c, 2.5, `opacity="${op || 0.6}"`); return s; };
  A.BGS.push(
    { id: 'ground', n: 'サッカーじょう', tags: ['sports'],
      draw() {
        const nt = U.uid('nt'), r = U.rng(77), cc = ['#ff7fb2', '#ffe680', '#8ed4ff', '#ffffff', '#8de8cc', '#f2485c'];
        let s = sky([['#7cc4ff'], ['#d6f0ff']]) + cloud(-60, 110, 1.2, '#fff', 0.95) + cloud(520, 80, 1, '#fff', 0.9) + cloud(240, 190, 0.7, '#fff', 0.8);
        s += R(X0, 330, W, 260, '#b9c6e6') + R(X0, 322, W, 16, '#8a98c4');
        for (let row = 0; row < 6; row++) for (let i = 0; i < 42; i++) s += Ci(-400 + i * 34 + (row % 2 ? 17 : 0) + r() * 6, 366 + row * 34, 11, cc[Math.floor(r() * cc.length)], 'opacity=".9"');
        s += R(X0, 556, W, 30, '#ffffff') + [-340, -120, 100, 760].map((x, i) => R(x, 560, 180, 22, ['#ff9ec6', '#8ed4ff', '#ffe37a', '#8de8cc'][i], 'rx="4"')).join('');
        s += R(X0, 584, W, H, '#63c56b');
        for (let i = 0; i < 9; i += 2) s += P(`M${-400 + i * 160},584 L${-240 + i * 160},584 L${f(300 + (-240 + i * 160 - 300) * 2.2)},1050 L${f(300 + (-400 + i * 160 - 300) * 2.2)},1050Z`, '#58b862');
        s += P('M-400,640 H1000', 'none', '#fff', 6) + El(300, 800, 250, 62, 'none', 'stroke="#fff" stroke-width="6"') + Ci(300, 800, 7, '#fff');
        s += `<defs><pattern id="${nt}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0,0 L18,18 M18,0 L0,18" stroke="#fff" stroke-width="1.6" opacity=".8"/></pattern></defs>` + R(442, 442, 256, 150, `url(#${nt})`) +
          P('M440,596 L440,440 L700,440 L700,596', 'none', '#aab2c8', 12) + P('M440,596 L440,440 L700,440 L700,596', 'none', '#fff', 8);
        s += P('M-70,640 V520', 'none', '#fff', 5) + P('M-70,520 l40,14 l-40,16Z', '#f2485c', '#b8182e', 2);
        return s;
      } },

    { id: 'ninja', n: 'にんじゃやしき', tags: ['ninja'],
      draw() {
        const r = U.rng(19);
        let s = sky([['#1c1850'], ['#3a2e7a', 0.55], ['#6a4a9a']]) + glow(470, 170, 190, '#fff7c2', 0.5) + Ci(470, 170, 86, '#fff7c2') + Ci(444, 150, 12, '#f0e0a0', 'opacity=".6"') + Ci(492, 196, 18, '#f0e0a0', 'opacity=".5"');
        for (let i = 0; i < 46; i++) s += U.sparkle(-380 + r() * 1360, -120 + r() * 520, 2.5 + r() * 5, '#fff', 0.5 + r() * 0.5);
        const roof = (x, y, w) => P(`M${x - w / 2 - 26},${y} Q${x - w / 2},${y - 8} ${x - w / 2 + 14},${y - 40} L${x + w / 2 - 14},${y - 40} Q${x + w / 2},${y - 8} ${x + w / 2 + 26},${y}Z`, '#2a2458', '#16123a', 2.5);
        s += R(30, 470, 150, 240, '#4a4290') + roof(105, 470, 150) + R(52, 380, 106, 60, '#4a4290') + roof(105, 380, 106) + R(74, 310, 62, 40, '#4a4290') + roof(105, 310, 62) +
          [[66, 400], [124, 400], [70, 500], [120, 500], [70, 590], [120, 590]].map((p) => R(p[0], p[1], 20, 26, '#ffe680', 'rx="3"')).join('');
        for (let i = 0; i < 5; i++) {
          const x = 560 + i * 46 + r() * 14;
          s += P(`M${f(x)},700 L${f(x + 6)},160`, 'none', '#2f7a52', 13) + P(`M${f(x)},700 L${f(x + 6)},160`, 'none', '#4fae72', 8) + [600, 500, 400, 300, 220].map((y) => P(`M${f(x - 5 + (700 - y) * 0.011)},${y} h12`, 'none', '#2f7a52', 2.5)).join('') +
            P(`M${f(x + 5)},260 q30,-20 54,-4 q-28,8 -54,4Z M${f(x + 4)},350 q-30,-18 -52,-2 q26,8 52,2Z`, '#5fc87a', '#2f7a52', 1.6);
        }
        s += R(X0, FL, W, H, '#3a3470');
        for (let row = 0; row < 8; row++) for (let i = 0; i < 30; i++) s += P(`M${-420 + i * 50 + (row % 2 ? 25 : 0)},${FL + row * 46} q25,26 50,0`, 'none', '#221c50', 3, 'opacity=".7"');
        s += R(X0, FL - 10, W, 18, '#221c50');
        return s;
      } },

    { id: 'ship', n: 'かいぞくせん', tags: ['pirate', 'beach'],
      draw() {
        let s = sky([['#6cc4ff'], ['#c8ecff', 0.6], ['#eaf8ff']]) + cloud(380, 120, 1.2, '#fff', 0.95) + cloud(700, 60, 0.9, '#fff', 0.9) + Ci(560, 190, 54, '#fff3a8');
        s += R(X0, 520, W, 200, '#3fa8e8') + [540, 570, 610, 650].map((y, i) => P(`M-400,${y} ` + Array.from({ length: 12 }, () => `q30,${i % 2 ? -12 : 12} 60,0 q30,${i % 2 ? 12 : -12} 60,0`).join(' '), 'none', '#fff', 3, 'opacity=".5"')).join('');
        s += El(620, 530, 120, 34, '#f7dc9a') + P('M640,520 C636,470 646,440 660,420', 'none', '#a8744a', 9) +
          [[-56, 6], [-36, -26], [4, -40], [42, -24], [58, 8]].map((p) => P(`M660,420 Q${660 + p[0] * 0.6},${420 + p[1] - 16} ${660 + p[0]},${420 + p[1] + 16} Q${f(660 + p[0] * 0.4)},${f(420 + p[1] * 0.4 + 8)} 660,420Z`, '#5fcf7a', '#2f9a52', 2)).join('');
        s += R(92, -150, 22, 860, '#a8744a', 'stroke="#6a4424" stroke-width="3"') + P('M-60,60 Q104,110 270,60 L250,330 Q104,380 -40,330Z', '#fff8ea', '#d8c8a8', 3) + P('M-50,150 Q104,196 262,150 M-46,240 Q104,288 256,240', 'none', '#e8d8b8', 3);
        s += R(-90, 48, 390, 14, '#8a5a36', 'rx="7"') + P('M114,-120 L230,-90 L114,-56Z', '#3a3446', '#1a1626', 2.5) + P('M146,-76 L174,-104 M146,-104 L174,-76', 'none', '#fff', 4) + Ci(160, -90, 10, '#fff');
        s += R(X0, 596, W, 16, '#b97f4a', 'stroke="#6a4424" stroke-width="3"');
        for (let x = -380; x < 1000; x += 70) s += R(x, 612, 16, 90, '#c98b4d', 'stroke="#6a4424" stroke-width="2.5" rx="6"');
        s += R(X0, FL, W, H, '#d9a066');
        for (let y = FL; y < 1050; y += 44) s += P(`M-400,${y} H1000`, 'none', '#a8744a', 3, 'opacity=".7"');
        for (let i = 0; i < 16; i++) s += P(`M${-380 + i * 92 + (i % 2) * 40},${FL + (i % 4) * 44} v44`, 'none', '#a8744a', 3, 'opacity=".6"');
        s += Ci(560, 660, 9, '#ffd24a', 'stroke="#c9860f" stroke-width="2"') + Ci(584, 652, 9, '#ffd24a', 'stroke="#c9860f" stroke-width="2"') + Ci(604, 662, 8, '#ffd24a', 'stroke="#c9860f" stroke-width="2"') +
          R(520, 680, 120, 70, '#a8623c', 'stroke="#6a3a1e" stroke-width="3" rx="6"') + P('M520,682 C520,642 640,642 640,682Z', '#c98b4d', '#6a3a1e', 3) + R(520, 676, 120, 10, '#ffd24a', 'stroke="#c9860f" stroke-width="2"') +
          R(572, 670, 16, 24, '#ffd24a', 'stroke="#c9860f" stroke-width="2" rx="3"') + U.sparkle(540, 630, 9, '#fff7c2') + U.sparkle(626, 640, 6, '#fff7c2');
        return s;
      } },

    { id: 'jungle', n: 'きょうりゅうのもり', tags: ['dino'],
      draw() {
        const r = U.rng(13);
        let s = sky([['#9fe0ff'], ['#e6f8d8', 0.6], ['#f6ffd8']]) + cloud(-40, 100, 1.1, '#fff', 0.9) + cloud(260, 60, 0.8, '#fff', 0.85);
        s += P('M330,600 L470,250 L520,250 L690,600Z', '#b98a6a', '#8a6248', 3) + P('M470,250 L520,250 L540,304 L516,288 L500,316 L480,286 L456,304Z', '#ff7a3c', '#d9501a', 2) + cloud(500, 190, 0.8, '#e8e0e8', 0.9) + cloud(548, 128, 0.6, '#e8e0e8', 0.8);
        s += hill(-150, 660, 420, 150, '#7fd08a') + hill(760, 680, 460, 160, '#6cc47a');
        /* くびなが きょうりゅう */
        s += R(-116, 590, 28, 70, '#8fb8e8', 'stroke="#4f7ab8" stroke-width="3" rx="10"') + R(-28, 596, 28, 64, '#8fb8e8', 'stroke="#4f7ab8" stroke-width="3" rx="10"') +
          P('M-190,596 C-150,560 -150,530 -70,524 C-20,522 36,548 56,500 C66,470 62,430 86,412 C104,400 134,406 138,424 C140,440 122,446 108,446 C98,470 100,520 80,570 C60,612 -20,624 -80,620 C-130,618 -160,610 -190,596Z', '#8fb8e8', '#4f7ab8', 3) +
          Ci(118, 424, 3.6, '#3b2430') + P('M124,436 q6,2 10,-2', 'none', '#4f7ab8', 2);
        s += R(X0, FL - 30, W, H, '#8fd88a') + hill(300, FL + 160, 900, 150, '#7fcf7a');
        const leaf = (x, y, rot, l, c) => `<g transform="rotate(${rot} ${x} ${y})">` + P(`M${x},${y} Q${f(x + l * 0.5)},${f(y - l * 0.36)} ${x + l},${f(y - l * 0.04)} Q${f(x + l * 0.5)},${f(y + l * 0.2)} ${x},${y}Z`, c, U.dark(c, 0.3), 2.5) + P(`M${x},${y} L${f(x + l * 0.9)},${f(y - l * 0.04)}`, 'none', U.dark(c, 0.3), 1.6, 'opacity=".5"') + '</g>';
        s += [-150, -120, -86, -50].map((a, i) => leaf(-70, 780, a, 190 + i * 14, i % 2 ? '#4fae62' : '#5fcf7a')).join('') + [-30, -60, -94, -130].map((a, i) => leaf(670, 790, a, 190 + i * 14, i % 2 ? '#4fae62' : '#5fcf7a')).join('');
        s += El(540, 764, 44, 12, '#4f9a52', 'opacity=".4"') + El(520, 738, 20, 26, '#fff8e0', 'stroke="#d8c8a0" stroke-width="2.5"') + El(560, 742, 18, 24, '#fff8e0', 'stroke="#d8c8a0" stroke-width="2.5"') + Ci(514, 730, 4, '#8fd4f5') + Ci(526, 746, 3, '#ffb347') + Ci(564, 738, 4, '#ff9ec6');
        for (let i = 0; i < 14; i++) { const x = -120 + r() * 840, y = 760 + r() * 220; if (Math.abs(x - 300) < 150) continue; s += U.flower(x, y, 7 + r() * 4, ['#ffe37a', '#ff9ec6', '#fff'][i % 3], '#ffb347'); }
        return s;
      } },

    { id: 'city', n: 'ヒーローのまち', tags: ['hero', 'cool'],
      draw() {
        const r = U.rng(23);
        let s = sky([['#2a2470'], ['#6a4aa8', 0.5], ['#ff9a7a', 0.86], ['#ffd27a']]);
        for (let i = 0; i < 30; i++) s += U.sparkle(-380 + r() * 1360, -130 + r() * 380, 2.5 + r() * 4, '#fff', 0.4 + r() * 0.5);
        const beam = (x, tx) => { const id = U.uid('bm'); return `<defs>${U.lin(id, [['#fff7c2', 0, 0], ['#fff7c2', 1, 0.5]])}</defs><path d="M${tx - 70},-150 L${tx + 70},-150 L${x + 8},640 L${x - 8},640Z" fill="url(#${id})"/>`; };
        s += beam(60, -120) + beam(560, 700);
        let x = -400, i = 0;
        while (x < 1000) {
          const w = 70 + r() * 70, h = 160 + r() * 300, c = ['#3a3478', '#443c8a', '#2e2a66'][i % 3];
          s += R(f(x), f(690 - h), f(w), f(h + 20), c);
          for (let yy = 690 - h + 18; yy < 670; yy += 30) for (let xx = x + 12; xx < x + w - 18; xx += 24) if (r() < 0.6) s += R(f(xx), f(yy), 12, 16, r() < 0.8 ? '#ffe680' : '#8ed4ff', 'opacity=".9"');
          x += w + 6; i++;
        }
        s += R(X0, FL - 6, W, H, '#5a5490') + R(X0, FL - 18, W, 18, '#7a74b0') + floorLines('#4a4480');
        s += El(300, 800, 250, 46, 'none', 'stroke="#ffe680" stroke-width="5" stroke-dasharray="18 14" opacity=".7"') + `<g transform="translate(300,800) scale(1,.34)" opacity=".45">${U.star(0, 0, 70, '#ffe680', '#ffe680', 2)}</g>`;
        return s;
      } },

    { id: 'throne', n: 'おうきゅう', tags: ['prince', 'princess'],
      draw() {
        const pt = U.uid('tp');
        let s = sky([['#fff0d6'], ['#ffe0ec']]) + `<defs><pattern id="${pt}" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M45,10 l8,22 l22,8 l-22,8 l-8,22 l-8,-22 l-22,-8 l22,-8Z" fill="#fff" opacity=".5"/></pattern></defs>` + R(X0, Y0, W, FL + 150, `url(#${pt})`);
        const win = (x) => P(`M${x - 50},540 V310 a50,50 0 0 1 100,0 V540Z`, '#bfe6ff', '#e6cfa8', 6) + P(`M${x},262 V540 M${x - 50},400 h100`, 'none', '#fff', 5);
        s += win(90) + win(510);
        const col = (x) => R(x - 34, 60, 68, 640, '#fffaf2', 'stroke="#e6cfa8" stroke-width="3"') + P(`M${x - 14},70 v620 M${x + 14},70 v620`, 'none', '#ecdcc0', 3) + R(x - 50, 30, 100, 36, '#ffe6a8', 'stroke="#d9a84a" stroke-width="3" rx="8"') + R(x - 50, 670, 100, 36, '#ffe6a8', 'stroke="#d9a84a" stroke-width="3" rx="8"');
        s += col(-90) + col(690);
        s += P('M-400,-150 H1000 V40 Q840,120 690,36 Q560,130 430,40 Q300,120 170,40 Q40,130 -90,36 Q-240,120 -400,40Z', '#d93a5c', '#a81a3c', 3) + P('M-400,40 Q-240,120 -90,36 Q40,130 170,40 Q300,120 430,40 Q560,130 690,36 Q840,120 1000,40', 'none', '#ffd24a', 7);
        s += R(196, 560, 30, 150, '#ffd24a', 'stroke="#c9860f" stroke-width="3" rx="10"') + R(374, 560, 30, 150, '#ffd24a', 'stroke="#c9860f" stroke-width="3" rx="10"') +
          P('M214,700 V330 C214,270 250,236 300,236 C350,236 386,270 386,330 V700Z', '#d93a5c', '#a81a3c', 4) + P('M232,696 V334 C232,284 262,256 300,256 C338,256 368,284 368,334 V696Z', '#ff7f9a', '#d93a5c', 2) +
          Ci(300, 236, 16, '#ffd24a', 'stroke="#c9860f" stroke-width="3"') + U.gem(300, 236, 7, '#7fd4ff');
        s += R(X0, FL - 10, W, 14, '#fff') + R(X0, FL, W, H, '#f6e2c0') + floorLines('#e0c090', 0.7) + P(`M-400,${FL + 60} H1000 M-400,${FL + 150} H1000 M-400,${FL + 270} H1000`, 'none', '#e0c090', 2.5, 'opacity=".7"');
        s += P(`M230,${FL} L370,${FL} L520,1050 L80,1050Z`, '#d93a5c', '#a81a3c', 3) + P(`M246,${FL} L112,1050 M354,${FL} L488,1050`, 'none', '#ffd24a', 5);
        return s;
      } },
  );

  /* ================= スタンプ ================= */
  const TXT = (t, sz, fill, st) => `<text x="0" y="${f(sz * 0.36)}" text-anchor="middle" font-size="${sz}" font-weight="bold" fill="${fill}" stroke="${st}" stroke-width="6" paint-order="stroke" stroke-linejoin="round" font-family="'UD デジタル 教科書体 NK-B','Hiragino Maru Gothic ProN','Yu Gothic UI',sans-serif">${t}</text>`;
  const CROWN = 'M-36,24 L-40,-14 L-20,4 L0,-30 L20,4 L40,-14 L36,24Z', SHIELD = 'M0,-40 L34,-27 C34,6 22,28 0,40 C-22,28 -34,6 -34,-27Z';
  const free = [
    { id: 'kakkoii', n: 'かっこいい', draw: () => `<rect x="-66" y="-26" width="132" height="52" rx="26" fill="#fff" stroke="#6fb1f5" stroke-width="4"/>` + TXT('かっこいい', 24, '#3a7fe8', '#fff') },
    { id: 'nice', n: 'ナイス', draw: () => P(U.starPath(0, 0, 48, 34, 10, -90), '#ffe14a', '#fff', 6) + TXT('ナイス!', 24, '#ff7a2c', '#fff') },
    { id: 'foot', n: 'きょうりゅうのあしあと', draw: () => { const D = 'M-22,34 C-30,10 -24,-6 -10,-8 L-22,-34 L-4,-16 L2,-42 L10,-14 L26,-30 L18,-4 C30,6 30,24 20,34 C8,40 -10,40 -22,34Z'; return P(D, '#8fdc9a', '#fff', 8) + P(D, '#8fdc9a', '#4fae62', 2.5); } },
  ];
  const rewards = [
    { id: 'r_prince', n: 'おうかん', reward: 'prince', draw: () => P(CROWN, GOLD, '#fff', 8) + P(CROWN, GOLD, GOLDL, 2.5) + RR(-36, 12, 72, 13, 3, '#f2485c', '#b8182e', 2) + Ci(-40, -14, 5, '#fff', `stroke="${GOLDL}" stroke-width="2"`) + Ci(0, -30, 5, '#fff', `stroke="${GOLDL}" stroke-width="2"`) + Ci(40, -14, 5, '#fff', `stroke="${GOLDL}" stroke-width="2"`) + U.gem(0, 0, 6, '#7fd4ff') + U.sparkle(30, -30, 8, '#fff') },
    { id: 'r_ninja', n: 'しゅりけん', reward: 'ninja', draw: () => P(U.starPath(0, 0, 42, 13, 4, -45), '#fff', '#fff', 9) + P(U.starPath(0, 0, 42, 13, 4, -45), '#c9d0e4', '#5a6078', 3) + Ci(0, 0, 8, '#fff', 'stroke="#5a6078" stroke-width="3"') + P('M-24,-24 l12,12', 'none', '#fff', 4, 'opacity=".8"') },
    { id: 'r_sports', n: 'サッカーボール', reward: 'sports', draw: () => Ci(0, 0, 41, '#fff') + soccerBall(0, 0, 36) },
    { id: 'r_hero', n: 'ヒーローバッジ', reward: 'hero', draw: () => P(SHIELD, '#f2485c', '#fff', 8) + P(SHIELD, '#f2485c', '#b8182e', 2.5) + P('M8,-26 L-14,4 L-2,4 L-8,28 L16,-6 L3,-6Z', '#ffe14a', '#e0a020', 2) + P('M-24,-22 q6,-6 16,-8', 'none', '#fff', 4, 'opacity=".6"') },
    { id: 'r_pirate', n: 'たからばこ', reward: 'pirate', draw: () => RR(-40, -30, 80, 64, 10, '#fff') + Ci(-16, -16, 8, GOLD, `stroke="${GOLDL}" stroke-width="2"`) + Ci(4, -22, 8, GOLD, `stroke="${GOLDL}" stroke-width="2"`) + Ci(20, -14, 7, GOLD, `stroke="${GOLDL}" stroke-width="2"`) + RR(-34, -4, 68, 36, 5, '#a8623c', '#6a3a1e', 2.5) + P('M-34,-2 C-34,-22 34,-22 34,-2Z', '#c98b4d', '#6a3a1e', 2.5) + RR(-34, -6, 68, 8, 2, GOLD, GOLDL, 1.6) + RR(-6, -10, 12, 18, 3, GOLD, GOLDL, 1.6) + U.sparkle(30, -32, 8, '#fff7c2') },
    { id: 'r_dino', n: 'きょうりゅう', reward: 'dino', draw: () => P('M-22,-24 l8,-16 l8,14 l8,-18 l8,18 l8,-14 l8,16Z', '#ffb347', '#fff', 6) + El(0, 4, 40, 32, '#8fdc9a', 'stroke="#fff" stroke-width="7"') + P('M-22,-24 l8,-16 l8,14 l8,-18 l8,18 l8,-14 l8,16Z', '#ffb347', '#d9782a', 2) + El(0, 4, 37, 29, '#8fdc9a', 'stroke="#4fae62" stroke-width="2.5"') +
        El(-14, -2, 5, 6.5, '#3b2430') + El(14, -2, 5, 6.5, '#3b2430') + Ci(-15.5, -4, 1.8, '#fff') + Ci(12.5, -4, 1.8, '#fff') + P('M-12,14 Q0,24 12,14', 'none', '#3b2430', 3) + P('M-8,17 l3,6 l3,-5 M2,18 l3,5 l3,-6', '#fff', '#4fae62', 1) + El(-24, 10, 6, 4, '#ff9cb8', 'opacity=".7"') + El(24, 10, 6, 4, '#ff9cb8', 'opacity=".7"') },
  ];
  const at = A.STAMPS.findIndex((s) => s.reward);
  A.STAMPS.splice.apply(A.STAMPS, [at < 0 ? A.STAMPS.length : at, 0].concat(free));
  rewards.forEach((s) => A.STAMPS.push(s));
  A.STAMPS.forEach((s) => { A.stampIndex[s.id] = s; });
})(window);
