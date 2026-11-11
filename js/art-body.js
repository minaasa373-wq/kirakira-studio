/* きらきら☆おしゃれスタジオ — からだ・かお・かみ */
(function (g) {
  'use strict';
  const U = g.U, P = U.P, f = U.f;
  const A = (g.Art = {});
  const EY = 266, EXL = 250, EXR = 350;
  A.EY = EY;

  /* ================= パレット ================= */
  A.SKINS = [
    { n: 'しろ', c: '#FFE8DA' }, { n: 'ピーチ', c: '#FDD9C0' }, { n: 'ナチュラル', c: '#F6C6A4' },
    { n: 'こむぎ', c: '#E2A980' }, { n: 'ブラウン', c: '#BC825B' }, { n: 'ダーク', c: '#8E5E41' },
  ];
  A.EYES = [
    { id: 'maru', n: 'ぱっちり' }, { id: 'tare', n: 'たれめ', rot: -10 }, { id: 'tsuri', n: 'ねこめ', rot: 10 },
    { id: 'kira', n: 'きらきら', kira: true, big: 1.08 }, { id: 'niko', n: 'にっこり', closed: true }, { id: 'wink', n: 'ウインク', wink: true },
  ];
  A.EYE_COLORS = [
    { n: 'ちゃいろ', c: '#8a5230' }, { n: 'くろ', c: '#4a4458' }, { n: 'あお', c: '#3b82e6' }, { n: 'みずいろ', c: '#3fbfee' },
    { n: 'みどり', c: '#34b36b' }, { n: 'むらさき', c: '#8b5cf0' }, { n: 'ピンク', c: '#f0569a' }, { n: 'あか', c: '#e2463f' },
    { n: 'きん', c: '#e9a519' }, { n: 'にじ', g: ['#ff6fb0', '#a56bff', '#39b8ff'] },
  ];
  A.LASHES = [{ n: 'なし' }, { n: 'ナチュラル' }, { n: 'ぱっちり' }, { n: 'ゴージャス' }];
  A.BROWS = [{ n: 'ふつう' }, { n: 'きりっ' }, { n: 'こまり' }, { n: 'まる' }];
  A.SHADOWS = [{ n: 'なし' }, { n: 'ふんわり' }, { n: 'キャット' }, { n: 'キラキラ' }, { n: 'グラデ' }];
  A.SHADOW_COLORS = [
    { n: 'ピンク', c: '#ff7fb8' }, { n: 'むらさき', c: '#b184f5' }, { n: 'あお', c: '#62b0ff' }, { n: 'ミント', c: '#5fdcb8' },
    { n: 'きん', c: '#ffc53d' }, { n: 'オレンジ', c: '#ff9a55' }, { n: 'ブラウン', c: '#b57f60' }, { n: 'あか', c: '#f0607a' },
    { n: 'シルバー', c: '#b9c4de' }, { n: 'にじ', g: ['#ff7fb8', '#ffd24a', '#62b0ff'] },
  ];
  A.CHEEKS = [{ n: 'なし' }, { n: 'まる' }, { n: 'よこなが' }, { n: 'ハート' }, { n: 'キラキラ' }, { n: 'てれてれ' }, { n: 'ほし' }];
  A.CHEEK_COLORS = [
    { n: 'ピンク', c: '#ff86ac' }, { n: 'コーラル', c: '#ff957c' }, { n: 'オレンジ', c: '#ffab66' }, { n: 'あか', c: '#f2647a' },
    { n: 'むらさき', c: '#e287d8' }, { n: 'ピーチ', c: '#ffb9a6' },
  ];
  A.LIPS = [
    { n: 'なし' }, { n: 'ピンク', c: '#ff7fab' }, { n: 'ローズ', c: '#ea4c84' }, { n: 'あか', c: '#e3263f' },
    { n: 'コーラル', c: '#ff7a5c' }, { n: 'オレンジ', c: '#ff9838' }, { n: 'ピーチ', c: '#ffa890' }, { n: 'ベリー', c: '#b9306c' },
    { n: 'むらさき', c: '#a05be2' }, { n: 'ブラウン', c: '#b0624c' }, { n: 'みずいろ', c: '#5cc2f2' }, { n: 'ゴールド', c: '#f2b01e', glitter: true },
  ];
  A.MOUTHS = [{ n: 'にっこり' }, { n: 'わーい' }, { n: 'ねこぐち' }, { n: 'ちゅっ' }, { n: 'てへぺろ' }];
  A.SEALS = [
    { n: 'なし' }, { n: 'ほし' }, { n: 'ハート' }, { n: 'ジュエル' }, { n: 'そばかす' }, { n: 'ねこひげ', tags: ['neko'] },
    { n: 'ラメ' }, { n: 'ばんそうこう' }, { n: 'にじ' }, { n: 'おはな' },
  ];
  A.HAIR_COLORS = [
    { n: 'くろ', c: '#3a3446' }, { n: 'こげちゃ', c: '#5e3d2c' }, { n: 'ちゃいろ', c: '#8e5c38' }, { n: 'キャラメル', c: '#c98b4d' },
    { n: 'きんぱつ', c: '#f4cf66' }, { n: 'ミルク', c: '#f6ead0' }, { n: 'ピンク', c: '#ff9cc6' }, { n: 'あか', c: '#e8546f' },
    { n: 'オレンジ', c: '#ff9a4a' }, { n: 'むらさき', c: '#b497f2' }, { n: 'あお', c: '#6bb1f5' }, { n: 'ミント', c: '#7fdcc2' },
    { n: 'シルバー', c: '#cdd5e6' },
    { n: 'ゆめかわ', g: ['#ffa8d2', '#c7a4ff', '#8fd0ff'] }, { n: 'ゆうやけ', g: ['#ffb44a', '#ff7fa6', '#c978f0'] },
    { n: 'マーメイド', g: ['#8ae6c8', '#6fb9f5', '#a98cf2'] }, { n: 'いちごミルク', g: ['#fff0f0', '#ffc2d8', '#ff8fb8'] },
  ];
  A.HAIR_BACK = [
    { id: 'long', n: 'ロング' }, { id: 'bob', n: 'ボブ' }, { id: 'short', n: 'ショート' }, { id: 'twin', n: 'ツインテール' },
    { id: 'pony', n: 'ポニーテール' }, { id: 'buns', n: 'おだんご' }, { id: 'wavy', n: 'ゆるふわ' }, { id: 'braid', n: 'みつあみ' },
    { id: 'osage', n: 'おさげ' }, { id: 'side', n: 'サイドテール' }, { id: 'hime', n: 'プリンセス' },
  ];
  A.HAIR_FRONT = [
    { id: 'patsun', n: 'ぱっつん' }, { id: 'naname', n: 'ななめ' }, { id: 'center', n: 'まんなかわけ' }, { id: 'giza', n: 'ギザギザ' },
    { id: 'fuwa', n: 'ふんわり' }, { id: 'odeko', n: 'おでこ' }, { id: 'hime', n: 'ひめカット' },
  ];

  function skin(st) {
    const c = (A.SKINS[st.skin] || A.SKINS[1]).c;
    return { c, line: U.mix(c, '#7a2e30', 0.45), shade: U.mix(c, '#d0607a', 0.25), lip: U.mix(c, '#ea4f70', 0.48) };
  }
  A.skin = skin;

  const HEAD_D = 'M197,234 C194,160 240,120 300,120 C360,120 406,160 403,234 C402,274 388,307 356,329 C336,343 318,348 300,348 C282,348 264,343 244,329 C212,307 198,274 197,234Z';
  A.HEAD_D = HEAD_D;
  const ell = (cx, cy, rx, ry) => `M${f(cx - rx)},${f(cy)}a${rx},${ry} 0 1 0 ${rx * 2},0a${rx},${ry} 0 1 0 ${-rx * 2},0Z`;
  U.ell = ell;
  /* 重なる図形をひとつの輪郭にまとめて描く */
  U.union = (ds, fill, line, sw) => {
    sw = sw == null ? 2.5 : sw;
    return ds.map((d) => P(d, fill, line, sw * 2)).join('') + ds.map((d) => P(d, fill)).join('');
  };

  /* ================= からだ ================= */
  const TORSO_D = 'M250,376 C270,370 285,369 300,369 C315,369 330,370 350,376 C360,382 360,395 356,410 C352,428 336,440 334,455 C333,470 346,486 346,505 C346,520 325,528 300,528 C275,528 254,520 254,505 C254,486 267,470 266,455 C264,440 248,428 244,410 C240,395 240,382 250,376Z';
  const NECK_D = 'M287,338 L287,372 C293,380 307,380 313,372 L313,338Z';
  const ANK = 742, FOOT = 758;
  A.ANK = ANK; A.FOOT = FOOT;
  const LEG_L = U.capsule(276, 508, 21.5, 279, ANK, 12.5), LEG_R = U.capsule(324, 508, 21.5, 321, ANK, 12.5);
  A.LEG_L = LEG_L; A.LEG_R = LEG_R; A.TORSO_D = TORSO_D;
  /* うでの軸上の点（t=0 かた → t=1 てくび） */
  A.armPt = (t, right) => { const x = 250 - 42 * t, y = 391 + 143 * t; return [right ? 600 - x : x, y]; };

  A.body = function (st) {
    const k = skin(st);
    let s = '';
    s += U.union([LEG_L, LEG_R, ell(276, FOOT, 17, 10.5), ell(324, FOOT, 17, 10.5)], k.c, k.line);
    s += P('M267,628 q6,5 14,2 M333,628 q-6,5 -14,2', 'none', k.shade, 2, 'opacity=".7"');
    s += U.union([TORSO_D, NECK_D], k.c, k.line);
    s += `<path d="M287,356 C294,363 306,363 313,356 L313,338 L287,338Z" fill="${k.shade}" opacity=".55"/>`;
    /* インナー */
    s += P('M266,378 L268,400 M334,378 L332,400', 'none', '#f3c4d6', 6.5) + P('M266,378 L268,400 M334,378 L332,400', 'none', '#ffffff', 4);
    s += P('M262,398 C275,404 290,405 300,404 C310,405 325,404 338,398 C340,420 336,440 334,455 C333,470 346,486 346,505 C346,520 325,528 300,528 C275,528 254,520 254,505 C254,486 267,470 266,455 C264,440 260,420 262,398Z', '#ffffff', '#f3c4d6', 2.2);
    s += U.bow(300, 406, 16, 10, '#ffb3cd', '#f08fb2', { sw: 1.4 });
    return s;
  };
  A.arms = function (st) {
    const k = skin(st);
    const aL = U.capsule(250, 392, 13, 208, 535, 10.5), aR = U.capsule(350, 392, 13, 392, 535, 10.5);
    return U.union([aL, aR, ell(205, 546, 12, 13), ell(395, 546, 12, 13)], k.c, k.line) +
      P('M199,552 q4,4 8,1 M401,552 q-4,4 -8,1', 'none', k.line, 1.6, 'opacity=".6"');
  };
  /* まねきん（サムネ用のうすい体） */
  A.mannequin = function () {
    const c = '#f5e3ec';
    return [LEG_L, LEG_R, ell(276, FOOT, 17, 10.5), ell(324, FOOT, 17, 10.5), TORSO_D, NECK_D,
      U.capsule(250, 392, 13, 208, 535, 10.5), U.capsule(350, 392, 13, 392, 535, 10.5), ell(205, 546, 12, 13), ell(395, 546, 12, 13)]
      .map((d) => P(d, c)).join('') + P(HEAD_D, c);
  };

  /* ================= かお ================= */
  A.head = function (st) {
    const k = skin(st);
    const ear = `<ellipse cx="199" cy="270" rx="13" ry="18" fill="${k.c}" stroke="${k.line}" stroke-width="2.5"/>` +
      P('M196,262 q-5,8 1,16', 'none', k.shade, 2.5);
    return U.both(ear) + P(HEAD_D, k.c, k.line, 2.5);
  };

  const LC = '#3b2430';
  const LID = 'M-27,-1 C-26,-19 -12,-30 2,-30 C15,-30 24,-21 26,-8 C21,-17 12,-23.5 1,-23.5 C-10,-23.5 -19,-17 -22.5,-5 C-24,-3 -26,-1 -27,-1Z';

  function eyeT(cx, flip, st) {
    const shp = A.EYES[st.eye] || A.EYES[0];
    const T0 = `translate(${cx},${EY}) scale(${flip},1)`;
    return { shp, T0, T: T0 + (shp.rot ? ` rotate(${shp.rot})` : ''), closed: !!(shp.closed || (shp.wink && flip === -1)) };
  }

  function eyeOne(cx, flip, st) {
    const { shp, T0, T, closed } = eyeT(cx, flip, st);
    const col = A.EYE_COLORS[st.eyeColor] || A.EYE_COLORS[0];
    const lash = st.lash | 0;
    let s = '';
    if (closed) {
      s += `<g transform="${T0}">` + P('M-25,5 C-15,-13 13,-14 25,4', 'none', LC, 6);
      if (lash >= 1) s += P('M-25,5 L-34,3 M-21,-3 L-30,-8', 'none', LC, 3.2);
      if (lash >= 2) s += P('M-13,-8.5 L-19,-17', 'none', LC, 3.2);
      if (lash >= 3) s += P('M-3,-9.5 L-5,-19 M9,-8 L13,-17', 'none', LC, 3.2);
      return s + '</g>';
    }
    const cid = U.uid('ec'), gid = U.uid('eg');
    const base = col.g ? col.g[1] : col.c;
    const stops = col.g ? [[U.dark(col.g[0], 0.2)], [col.g[1]], [U.light(col.g[2], 0.2)]]
      : [[U.dark(col.c, 0.6)], [col.c, 0.55], [U.light(col.c, 0.5)]];
    const b = shp.big || 1, icy = EY + 1.5;
    s += `<defs><clipPath id="${cid}"><ellipse rx="23" ry="25.5" transform="${T}"/></clipPath>${U.lin(gid, stops)}</defs>`;
    s += `<ellipse rx="23" ry="25.5" transform="${T}" fill="#ffffff"/>`;
    s += `<g clip-path="url(#${cid})">` +
      `<ellipse cx="${cx}" cy="${icy}" rx="${f(17.5 * b)}" ry="${f(21 * b)}" fill="url(#${gid})" stroke="${U.dark(base, 0.62)}" stroke-width="2"/>` +
      `<ellipse cx="${cx}" cy="${icy - 1}" rx="${f(7.5 * b)}" ry="${f(10.5 * b)}" fill="${U.dark(base, 0.8)}"/>` +
      `<ellipse cx="${cx}" cy="${icy + 12.5}" rx="${f(11 * b)}" ry="6" fill="${U.light(base, 0.65)}" opacity=".75"/>` +
      `<ellipse cx="${cx}" cy="${EY - 24}" rx="30" ry="13" fill="#3d2450" opacity=".2"/></g>`;
    s += `<circle cx="${cx - 7.5}" cy="${EY - 8.5}" r="${f(6.3 * b)}" fill="#fff"/><circle cx="${cx + 8}" cy="${EY + 9.5}" r="${f(3 * b)}" fill="#fff" opacity=".95"/>`;
    if (shp.kira) s += U.sparkle(cx + 8.5, EY - 8, 6, '#fff') + `<circle cx="${cx - 9}" cy="${EY + 11}" r="1.8" fill="#fff"/>`;
    /* まぶた・まつげ */
    s += `<g transform="${T}">` + P(LID, LC);
    if (lash >= 1) s += P('M-27,-2 L-36,-7 L-24.5,-10Z', LC, LC, 1);
    if (lash >= 2) s += P('M-23.5,-13 L-33,-21 L-19.5,-18Z M-14.5,-23 L-20.5,-34 L-9.5,-26.5Z', LC, LC, 1);
    if (lash >= 3) s += P('M-3,-28.5 L-4.5,-40 L4,-29.5Z M10,-27.5 L14,-37.5 L17,-24.5Z', LC, LC, 1) +
      P('M-20,15 L-27,19.5 M-14,21 L-19,27.5 M-6,24.5 L-8.5,31.5', 'none', LC, 2.2);
    s += P('M-19,17.5 C-10,25.5 6,27 15,21.5', 'none', LC, 1.8, 'opacity=".42"');
    s += '</g>';
    return s;
  }

  function shadowOne(cx, flip, st, k) {
    const sty = st.shadow | 0;
    if (!sty) return '';
    const { T, T0, closed } = eyeT(cx, flip, st);
    const col = A.SHADOW_COLORS[st.shadowColor] || A.SHADOW_COLORS[0];
    const c1 = col.g ? col.g[0] : col.c, c2 = col.g ? col.g[2] : U.light(col.c, 0.45);
    const gid = U.uid('sh');
    let s = '';
    if (closed) {
      s += `<defs>${U.lin(gid, [[c1, 0, 0.1], [c1, 1, 0.8]])}</defs><g transform="${T0}">` +
        `<path d="M-27,6 C-24,-18 -10,-27 1,-27 C13,-27 24,-18 27,5 C16,-11 -14,-11 -27,6Z" fill="url(#${gid})"/></g>`;
      return s;
    }
    const D = 'M-30,0 C-31,-24 -15,-42 3,-42 C18,-42 28,-32 30,-14 C24,-24 14,-30.5 2,-30.5 C-11,-30.5 -22,-22 -27,-2Z';
    if (sty === 4) {
      s += `<defs>${U.lin(gid, [[c2, 0, 0.15], [c2, 0.4, 0.85], [c1, 0.75, 0.9], [c1, 1, 0.95]])}</defs>`;
    } else {
      s += `<defs>${U.lin(gid, [[c1, 0, 0.12], [c1, 0.55, 0.75], [c1, 1, 0.95]])}</defs>`;
    }
    s += `<g transform="${T}"><path d="${D}" fill="url(#${gid})"/>`;
    if (sty === 2) s += `<path d="M-28,-3 L-42,-13 L-27,-15Z" fill="${c1}" opacity=".9"/>`;
    if (sty === 3) s += U.sparkle(-14, -30, 4.2, '#fff', 0.95) + U.sparkle(4, -36, 3.2, '#fff', 0.9) + U.sparkle(19, -29, 3.6, '#fff', 0.95) +
      `<circle cx="-22" cy="-18" r="1.4" fill="#fff"/><circle cx="12" cy="-36" r="1.2" fill="#fff"/>`;
    s += P('M-21,-27 C-12,-37 10,-38 22,-27', 'none', k.line, 1.4, 'opacity=".35"') + '</g>';
    return s;
  }

  function browOne(cx, flip, st, color) {
    const b = st.brow | 0;
    const T0 = `translate(${cx},${EY}) scale(${flip},1)`;
    if (b === 3) return `<g transform="${T0}"><ellipse cx="3" cy="-48" rx="6.5" ry="4.2" fill="${color}"/></g>`;
    const d = ['M-22,-45 C-12,-51 4,-52 18,-47', 'M-22,-51 C-10,-53 6,-50 18,-43', 'M-23,-43 C-12,-49 4,-53 17,-53'][b] || 'M-22,-45 C-12,-51 4,-52 18,-47';
    return `<g transform="${T0}">${P(d, 'none', color, 3.4)}</g>`;
  }
  A.brows = function (st) {
    const hp = hairPaint(st);
    const c = U.lum(hp.base) > 150 ? U.dark(hp.base, 0.45) : U.dark(hp.base, 0.15);
    return `<g opacity=".82">${browOne(EXL, 1, st, c)}${browOne(EXR, -1, st, c)}</g>`;
  };

  function cheeks(st) {
    const sty = st.cheek | 0;
    if (!sty) return '';
    const c = (A.CHEEK_COLORS[st.cheekColor] || A.CHEEK_COLORS[0]).c;
    const gid = U.uid('ck');
    let s = `<defs>${U.rad(gid, [[c, 0, 0.8], [c, 0.55, 0.5], [c, 1, 0]])}</defs>`;
    const one = (cx) => {
      const cy = 304; let t = '';
      const glow = (rx, ry, op) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${gid})"${op ? ` opacity="${op}"` : ''}/>`;
      if (sty === 1) t += glow(23, 15);
      else if (sty === 2) t += glow(32, 12);
      else if (sty === 3) t += glow(22, 14, 0.55) + U.heart(cx, cy - 1, 9.5, c, null) + `<circle cx="${cx - 4}" cy="${cy - 5}" r="2" fill="#fff" opacity=".7"/>`;
      else if (sty === 4) t += glow(23, 15) + U.sparkle(cx - 7, cy - 3, 5.5, '#fff', 0.95) + U.sparkle(cx + 8, cy + 3, 3.6, '#fff', 0.9) + `<circle cx="${cx + 3}" cy="${cy - 7}" r="1.4" fill="#fff"/>`;
      else if (sty === 5) t += glow(24, 14, 0.8) + P(`M${cx - 11},${cy + 5} l5,-10 M${cx - 2},${cy + 5} l5,-10 M${cx + 7},${cy + 5} l5,-10`, 'none', U.dark(c, 0.12), 2.4, 'opacity=".85"');
      else if (sty === 6) t += glow(22, 14, 0.5) + U.star(cx, cy, 9.5, c, c, 2.5) + `<circle cx="${cx - 3}" cy="${cy - 3}" r="1.8" fill="#fff" opacity=".8"/>`;
      return t;
    };
    return s + one(232) + one(368);
  }

  function mouth(st, k) {
    const m = st.mouth | 0;
    const lip = A.LIPS[st.lip] || A.LIPS[0];
    const on = !!lip.c, c = lip.c || k.lip, cl = on ? U.dark(c, 0.3) : k.line;
    const gloss = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f(w * 0.36)}" fill="#fff" opacity=".75"/>` +
      (lip.glitter ? U.sparkle(x + w + 3, y - 2, 3, '#fff', 0.95) + U.sparkle(x - w - 2, y + 1, 2.2, '#fff', 0.9) : '');
    let s = '';
    if (m === 0) {
      if (!on) {
        s += `<ellipse cx="300" cy="324" rx="9" ry="3.6" fill="${k.lip}" opacity=".45"/>` + P('M284,315.5 Q300,329.5 316,315.5', 'none', k.line, 2.8);
      } else {
        s += P('M283,317 C288,313.5 294,312 297.5,314.2 C299,315.2 301,315.2 302.5,314.2 C306,312 312,313.5 317,317 C314,328 306,332 300,332 C294,332 286,328 283,317Z', c, cl, 1.6);
        s += P('M283,317 C291,321.5 309,321.5 317,317', 'none', cl, 1.8) + P('M280.5,314.5 l2.5,2.5 M319.5,314.5 l-2.5,2.5', 'none', cl, 2);
        s += gloss(300, 326.5, 6);
      }
    } else if (m === 1) {
      const cid = U.uid('mc');
      const D = 'M281,313.5 C292,317 308,317 319,313.5 C319.5,330 309,339 300,339 C291,339 280.5,330 281,313.5Z';
      s += `<defs><clipPath id="${cid}"><path d="${D}"/></clipPath></defs>`;
      s += P(D, '#a12f47') + `<g clip-path="url(#${cid})"><ellipse cx="300" cy="336" rx="10" ry="6.5" fill="#ff8fa5"/><path d="M281,313 C292,317 308,317 319,313 L318,319.5 C308,322 292,322 282,319.5Z" fill="#fff"/></g>`;
      s += P(D, 'none', on ? c : k.line, on ? 3.6 : 2.4);
      if (on) s += gloss(300, 339.5, 5);
    } else if (m === 2) {
      s += P('M285,315 Q292.5,325 300,316.5 Q307.5,325 315,315', 'none', on ? c : k.line, on ? 3.8 : 2.8);
      if (on) s += `<circle cx="300" cy="323" r="1.6" fill="#fff" opacity=".8"/>`;
    } else if (m === 3) {
      s += U.heart(300, 320.5, 8, c, cl, 1.6) + `<ellipse cx="296.5" cy="317.5" rx="2.4" ry="1.5" fill="#fff" opacity=".8"/>`;
      if (lip.glitter) s += U.sparkle(309, 313, 3, '#fff', 0.95);
    } else {
      s += P('M303,321 q-0.5,10.5 6.5,10.5 q7,0 6,-12Z', '#ff8fa5', U.dark('#ff8fa5', 0.3), 1.8) + P('M309.5,324 v4', 'none', U.dark('#ff8fa5', 0.25), 1.4);
      s += P('M284,315.5 Q300,329.5 316,315.5', 'none', on ? c : k.line, on ? 3.8 : 2.8);
    }
    return s;
  }

  function seal(st) {
    const v = st.seal | 0;
    switch (v) {
      case 1: return U.star(377, 294, 8.5, '#ffd447', '#f0a81e', 2) + U.star(390, 307, 4.2, '#fff3a8', '#f0a81e', 1.2);
      case 2: return U.heart(376, 295, 7.5, '#ff5a8f', '#d93a70', 1.6) + U.heart(389, 307, 3.6, '#ff9cc0', '#d93a70', 1) + `<circle cx="373" cy="292" r="1.6" fill="#fff"/>`;
      case 3: return U.both(U.gem(226, 296, 3.6, '#7fd4ff') + U.gem(236, 300.5, 3, '#ff9cc4') + U.gem(245.5, 302, 2.4, '#fff7c2', '#e0b040'));
      case 4: return U.both([[224, 293], [233, 297], [242, 292], [229, 302]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="1.9" fill="#a8623c" opacity=".55"/>`).join('')) +
        `<circle cx="293" cy="294" r="1.6" fill="#a8623c" opacity=".45"/><circle cx="307" cy="294" r="1.6" fill="#a8623c" opacity=".45"/>`;
      case 5: return U.both(P('M228,300 L200,294 M228,306 L198,308 M230,312 L202,322', 'none', '#5a3a40', 2.2, 'opacity=".85"')) +
        P('M294.5,297 Q300,294.5 305.5,297 Q303,303.5 300,304 Q297,303.5 294.5,297Z', '#ff8fb0', '#d9668a', 1.4);
      case 6: return U.both(U.sparkle(213, 281, 6, '#fff7c2') + U.sparkle(221, 292, 4, '#ffffff') + U.sparkle(206, 293, 3, '#ffe27a') + `<circle cx="214" cy="301" r="1.5" fill="#fff"/>`);
      case 7: return `<g transform="rotate(-18 372 300)"><rect x="357" y="294" width="30" height="12" rx="6" fill="#ffd8b5" stroke="#e0a377" stroke-width="1.6"/><rect x="367" y="294.8" width="10" height="10.4" fill="#fff0de"/>${U.heart(372, 300, 2.6, '#ff7fa6')}</g>`;
      case 8: return ['#ff7b8a', '#ffd24a', '#6fc8ff'].map((c, i) => `<path d="M${364 + i * 3.4},302 a${12 - i * 3.4},${12 - i * 3.4} 0 0 1 ${24 - i * 6.8},0" fill="none" stroke="${c}" stroke-width="3.4"/>`).join('') +
        `<circle cx="364" cy="303" r="3.6" fill="#fff"/><circle cx="388" cy="303" r="3.6" fill="#fff"/>`;
      case 9: return P('M386,300 q8,2 10,10 q-9,0 -10,-10Z', '#8fdc9a', '#4fae62', 1.2) + U.flower(380, 294, 9, '#ff9cc4', '#ffe27a', 5, '#f06a9c');
      default: return '';
    }
  }

  A.face = function (st) {
    const k = skin(st);
    let s = '';
    s += cheeks(st);
    s += shadowOne(EXL, 1, st, k) + shadowOne(EXR, -1, st, k);
    s += `<g class="eyes">${eyeOne(EXL, 1, st)}${eyeOne(EXR, -1, st)}</g>`;
    if ((st.seal | 0) !== 5) s += P('M296.5,298.5 Q300,302.5 304,299', 'none', k.line, 2, 'opacity=".75"');
    s += mouth(st, k);
    s += seal(st);
    return s;
  };

  /* ================= かみ ================= */
  function hairPaint(st) {
    const h = A.HAIR_COLORS[st.hairColor] || A.HAIR_COLORS[2];
    if (h.g) {
      const id = U.uid('hg');
      return { defs: `<defs>${U.lin(id, h.g.map((c) => [c]), 0, 110, 0, 540, true)}</defs>`, fill: `url(#${id})`, base: h.g[0],
        line: U.dark(h.g[1], 0.36), hi: U.light(h.g[0], 0.6), sh: U.dark(h.g[2], 0.3) };
    }
    const dk = U.lum(h.c) < 80;
    return { defs: '', fill: h.c, base: h.c, line: U.dark(h.c, dk ? 0.5 : 0.36), hi: U.light(h.c, dk ? 0.38 : 0.55), sh: U.dark(h.c, 0.3) };
  }
  A.hairPaint = hairPaint;

  const CAP = 'M178,255 C168,150 228,94 300,94 C372,94 432,150 422,255';
  const NAPE = CAP + ' C424,300 416,336 398,352 L202,352 C184,336 176,300 178,255Z';
  const R_LOCK = ' C423,282 419,306 410,326 C401,300 395,262 393,218';
  const L_LOCK = ' C205,262 199,300 190,326 C181,306 177,282 178,255Z';
  const FR_PATSUN = ' C380,222 362,224.5 344,225.5 L340,214 L335,226 C312,227.5 288,227.5 265,226 L260,214 L256,225.5 C238,224.5 220,222 207,218';

  function frontD(id) {
    switch (id) {
      case 'naname': return CAP + R_LOCK + ' C388,190 374,150 352,114 C338,160 304,200 266,222 L253,206 L244,228 C231,232 217,229 207,220' + L_LOCK;
      case 'center': return CAP + R_LOCK + ' C391,178 352,128 303,108 L297,108 C248,128 209,178 207,218' + L_LOCK;
      case 'giza': return CAP + R_LOCK + ' Q386,218 378,229 Q372,216 364,206 Q356,219 346,232 Q340,218 330,205 Q322,221 312,233 Q306,218 300,206 Q294,218 288,233 Q278,221 270,205 Q260,218 254,232 Q244,219 236,206 Q228,216 222,229 Q214,218 207,218' + L_LOCK;
      case 'fuwa': return CAP + R_LOCK + U.frillLine(393, 218, 207, 218, 5, -12) + L_LOCK;
      case 'odeko': return CAP + R_LOCK + ' C395,180 374,146 338,134 C318,127 282,127 262,134 C226,146 205,180 207,218' + L_LOCK;
      case 'hime': return CAP + ' C425,300 421,336 415,358 L391,358 C390,310 389,262 389,220' +
        ' C378,223 362,225 344,226 L340,214 L335,226.5 C312,228 288,228 265,226.5 L260,214 L256,226 C238,225 222,223 211,220' +
        ' C211,262 210,310 209,358 L185,358 C179,336 175,300 178,255Z';
      default: return CAP + R_LOCK + FR_PATSUN + L_LOCK;
    }
  }

  A.hairFront = function (st) {
    const hp = hairPaint(st), k = skin(st);
    const id = (A.HAIR_FRONT[st.hairFront] || A.HAIR_FRONT[0]).id;
    const d = frontD(id);
    const c1 = U.uid('hc'), c2 = U.uid('hf');
    let s = hp.defs + `<defs><clipPath id="${c1}"><path d="${HEAD_D}"/></clipPath><clipPath id="${c2}"><path d="${d}"/></clipPath></defs>`;
    /* まえがみの かげ */
    s += `<g clip-path="url(#${c1})"><path d="${d}" transform="translate(0,7)" fill="${k.shade}" opacity=".5"/></g>`;
    s += P(d, hp.fill, hp.line, 2.5);
    let det = '';
    if (id === 'patsun' || id === 'hime' || id === 'giza' || id === 'fuwa') {
      det += P('M300,97 C297,140 290,186 286,224 M300,97 C303,140 310,186 314,224 M270,101 C252,136 240,180 234,218 M330,101 C348,136 360,180 366,218 M236,116 C222,146 214,180 211,212 M364,116 C378,146 386,180 389,212', 'none', hp.line, 1.6, 'opacity=".28"');
    } else if (id === 'naname') {
      det += P('M352,114 C330,150 296,186 262,206 M352,114 C320,138 276,160 236,172 M352,114 C300,124 250,130 212,150 M356,118 C372,150 382,186 388,214', 'none', hp.line, 1.6, 'opacity=".28"');
    } else if (id === 'center') {
      det += P('M300,108 C262,122 228,160 214,206 M300,108 C338,122 372,160 386,206 M296,100 C250,104 210,134 194,190 M304,100 C350,104 390,134 406,190', 'none', hp.line, 1.6, 'opacity=".28"');
    } else {
      det += P('M300,96 C270,98 232,116 210,160 M300,96 C330,98 368,116 390,160', 'none', hp.line, 1.6, 'opacity=".28"');
      det += P('M300,95 C294,78 306,68 318,71 C309,78 307,86 309,96Z', hp.fill, hp.line, 2);
    }
    /* てんしのわ（ハイライト） */
    det += `<path d="M216,160 Q256,186 300,186 Q344,186 384,160" fill="none" stroke="${hp.hi}" stroke-width="9" stroke-linecap="round" stroke-dasharray="74 18 74 400" opacity=".42"/>`;
    det += `<path d="M236,150 Q266,166 300,166 Q334,166 364,150" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="52 26 52 400" opacity=".5"/>`;
    s += `<g clip-path="url(#${c2})">${det}</g>`;
    if (id === 'odeko') s += P('M300,95 C294,78 306,68 318,71 C309,78 307,86 309,96Z', hp.fill, hp.line, 2);
    return s;
  };

  /* うしろがみ：{ back, mid, top } */
  A.hairBack = function (st, tie) {
    const hp = hairPaint(st);
    const id = (A.HAIR_BACK[st.hairBack] || A.HAIR_BACK[0]).id;
    tie = tie || '#ff6fa5';
    const tl = U.dark(tie, 0.35);
    const o = { back: hp.defs, mid: '', top: '' };
    const body = (d, extra) => {
      const cid = U.uid('hb'), gid = U.uid('hs');
      return `<defs><clipPath id="${cid}"><path d="${d}"/></clipPath>${U.rad(gid, [[hp.sh, 0, 0.6], [hp.sh, 0.6, 0.4], [hp.sh, 1, 0]])}</defs>` + P(d, hp.fill, hp.line, 2.5) +
        `<g clip-path="url(#${cid})"><ellipse cx="300" cy="340" rx="150" ry="110" fill="url(#${gid})"/>${extra || ''}</g>`;
    };
    const strand = (d) => P(d, 'none', hp.line, 1.6, 'opacity=".3"');
    switch (id) {
      case 'long':
        o.back += body(CAP + ' C426,340 438,450 452,546' + U.frillLine(452, 546, 148, 546, 6, -13) + ' C162,450 174,340 178,255Z',
          strand('M196,330 C192,400 180,480 172,548 M404,330 C408,400 420,480 428,548 M216,360 C212,420 206,490 202,552 M384,360 C388,420 394,490 398,552'));
        break;
      case 'bob':
        o.back += body(CAP + ' C432,300 436,348 416,376 C402,388 382,386 372,376 L228,376 C218,386 198,388 184,376 C164,348 168,300 178,255Z',
          strand('M194,320 C190,345 192,362 200,376 M406,320 C410,345 408,362 400,376'));
        break;
      case 'short':
        o.back += body(CAP + ' C426,290 432,318 446,332 C430,344 410,340 398,330 L202,330 C190,340 170,344 154,332 C168,318 174,290 178,255Z');
        break;
      case 'twin': {
        const tail = 'M192,192 C150,184 106,236 98,318 C92,394 110,470 140,528 C146,476 166,438 182,390 C194,342 202,290 200,236Z';
        o.back += U.both(P(tail, hp.fill, hp.line, 2.5) + strand('M170,214 C136,250 118,320 124,400 M184,232 C160,280 150,350 158,430')) + body(NAPE);
        o.top += U.both(U.bow(186, 208, 40, 26, tie, tl, { sw: 2 }));
        break;
      }
      case 'pony': {
        const tail = 'M348,100 C390,66 456,90 474,150 C492,216 478,304 448,382 C442,334 438,284 424,238 C414,196 392,150 354,126Z';
        o.back += P(tail, hp.fill, hp.line, 2.5) + strand('M380,96 C430,110 458,170 456,250 M366,112 C410,140 436,200 442,290') + body(NAPE);
        o.top += U.bow(368, 104, 44, 28, tie, tl, { sw: 2 });
        break;
      }
      case 'buns': {
        const bun = `<circle cx="210" cy="118" r="38" fill="${hp.fill}" stroke="${hp.line}" stroke-width="2.5"/>` +
          strand('M186,104 C196,90 222,88 234,104 C242,118 232,136 214,136 C200,136 194,122 204,112') +
          `<path d="M186,100 Q198,84 216,86" fill="none" stroke="${hp.hi}" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
        o.back += U.both(bun) + body(NAPE);
        o.top += U.both(U.bow(226, 147, 26, 16, tie, tl, { sw: 1.8 }));
        break;
      }
      case 'wavy':
        o.back += body(CAP + ' C442,290 420,322 442,352 C464,386 432,412 454,446 C474,480 446,506 464,540 C472,560 452,576 432,566 C412,586 382,582 370,566 L230,566 C218,582 188,586 168,566 C148,576 128,560 136,540 C154,506 126,480 146,446 C168,412 136,386 158,352 C180,322 158,290 178,255Z',
          strand('M196,330 C210,372 176,408 192,450 C206,490 178,520 186,556 M404,330 C390,372 424,408 408,450 C394,490 422,520 414,556'));
        break;
      case 'braid': {
        o.back += body(NAPE);
        let b = '';
        for (let i = 0; i < 7; i++) {
          const y = 326 + i * 27, x = 200 - i * 2.2, r = 18 - i * 0.9;
          b += `<ellipse cx="${f(x)}" cy="${y}" rx="${f(r)}" ry="${f(r * 0.74)}" transform="rotate(${i % 2 ? 26 : -26} ${f(x)} ${y})" fill="${hp.fill}" stroke="${hp.line}" stroke-width="2.3"/>`;
        }
        b += P('M176,512 C172,540 180,560 188,568 C198,556 202,538 198,512Z', hp.fill, hp.line, 2.3) + U.bow(186, 512, 36, 22, tie, tl, { sw: 2 });
        o.mid += hp.defs + U.both(b);
        break;
      }
      case 'osage': {
        o.back += body(NAPE);
        const t = P('M198,306 C170,322 156,386 162,448 C166,480 178,500 190,508 C200,480 216,440 220,398 C223,356 218,322 208,306Z', hp.fill, hp.line, 2.5) +
          strand('M194,330 C178,370 174,430 184,486 M206,336 C200,380 198,430 196,480') + U.bow(203, 318, 34, 22, tie, tl, { sw: 2 });
        o.mid += hp.defs + U.both(t);
        break;
      }
      case 'side': {
        const tail = 'M408,190 C452,180 498,230 506,314 C512,390 494,468 464,526 C458,474 438,436 422,388 C410,340 402,290 404,236Z';
        o.back += P(tail, hp.fill, hp.line, 2.5) + strand('M430,212 C464,250 482,320 476,400 M416,232 C440,280 450,350 444,430') + body(NAPE);
        o.top += U.bow(416, 208, 42, 27, tie, tl, { sw: 2 });
        break;
      }
      case 'hime':
        o.back += body(CAP + ' C440,300 430,360 452,410 C480,470 452,520 478,580 C498,630 470,664 486,700 C470,722 440,720 424,704 C400,724 372,716 364,700 L236,700 C228,716 200,724 176,704 C160,720 130,722 114,700 C130,664 102,630 122,580 C148,520 120,470 148,410 C170,360 160,300 178,255Z',
          strand('M194,340 C208,400 166,450 180,520 C192,580 150,620 152,690 M406,340 C392,400 434,450 420,520 C408,580 450,620 448,690 M214,380 C210,460 200,560 190,690 M386,380 C390,460 400,560 410,690'));
        break;
      default: o.back += body(NAPE);
    }
    return o;
  };
})(window);
