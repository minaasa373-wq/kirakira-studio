/* きらきら☆おしゃれスタジオ — キャラクターの くみたて */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art;

  A.DEFAULT = {
    skin: 1, eye: 0, eyeColor: 0, lash: 1, brow: 0, shadow: 0, shadowColor: 0, cheek: 1, cheekColor: 0, lip: 0, mouth: 0, seal: 0,
    hairBack: 0, hairFront: 0, hairColor: 2,
    dress: 1, dressC: 0, top: 0, topC: 0, bottom: 0, bottomC: 0, socks: 1, socksC: 6, shoes: 1, shoesC: 5,
    pose: 0, expr: 0, weather: 0, nails: [], head: 0, headC: 0, glasses: 0, ear: 0, neck: 0, hand: 0, back: 0, pet: 0, bg: 0,
    chara: 0,
  };
  /* おとこのこの さいしょの コーデ（かみがた・ふくは おんなのこと おなじ ものを ぜんぶ つかえる） */
  const ix = (list, id) => Math.max(0, list.findIndex((x) => x.id === id));
  A.BOY_DEFAULT = Object.assign({}, A.DEFAULT, {
    chara: 1, lash: 0, cheek: 1, cheekColor: 5, hairBack: ix(A.HAIR_BACK, 'spiky'), hairFront: ix(A.HAIR_FRONT, 'zanbara'), hairColor: 1,
    dress: 0, top: ix(A.TOPS, 'tee'), topC: 2, bottom: ix(A.BOTTOMS, 'half'), bottomC: 9, socks: ix(A.SOCKS, 'line'), socksC: 6, shoes: ix(A.SHOES, 'sneaker'), shoesC: 5,
  });
  A.defaultOf = (chara) => ((chara | 0) === 1 ? A.BOY_DEFAULT : A.DEFAULT);

  const L = (name, s, an) => (s ? `<g data-l="${name}">${an || ''}${s}</g>` : '');

  /* ---------- いきている みたいな うごき（スタジオ・ショーだけ） ---------- */
  const AT = (type, values, dur, extra) => `<animateTransform attributeName="transform" type="${type}" values="${values}" dur="${dur}s" repeatCount="indefinite"${extra || ''}/>`;
  const HEAD_SWAY = AT('rotate', '0 300 350;1.4 300 350;0 300 350;-1.4 300 350;0 300 350', 6.4);
  const HAIR_SWAY = HEAD_SWAY + AT('rotate', '0 300 170;-1.3 300 170;0 300 170;1.3 300 170;0 300 170', 3.6, ' additive="sum"');
  /* じくを きめて のびちぢみ（中心 cx,cy） */
  const pivotScale = (s, cx, cy, values, dur) => `<g transform="translate(${cx},${cy})"><g>${AT('scale', values, dur)}<g transform="translate(${-cx},${-cy})">${s}</g></g></g>`;
  const WINGS = ['fairy', 'angel', 'butterfly', 'bat', 'dragon'];

  A.character = function (st, o) {
    st = Object.assign({}, A.DEFAULT, st);
    const pp = A._pose, pl = A._live;
    A._pose = (st.pose | 0) && A.POSES ? A.POSES[st.pose | 0] || null : null;
    A._live = !!(o && o.live);
    try {
    const fc = A.exprState ? A.exprState(st) : st;
    const w = A.wearParts ? A.wearParts(st) : { back: '', legs: '', main: '', over: '', tie: '#ff6fa5' };
    const ac = A.accParts ? A.accParts(st) : { back: '', neck: '', hand: '', glasses: '', ear: '', head: '', headBack: '', pet: '' };
    const hb = A.hairBack(st, w.tie);
    const lv = A._live, H = lv ? HEAD_SWAY : '', HH = lv ? HAIR_SWAY : '';
    const bk = A.BACKS && A.BACKS[st.back | 0];
    const accBack = lv && ac.back && bk && WINGS.indexOf(bk.id) >= 0 ? pivotScale(ac.back, 300, 420, '1 1;0.84 1.02;1 1', 1.5) : ac.back;
    const wear = lv && w.main ? pivotScale(w.main, 300, 458, '1 1;1.018 1;1 1;0.992 1;1 1', 3.2) : w.main;
    const petA = lv ? AT('translate', '0 0;0 0;0 -16;0 0;0 -7;0 0', 3.4, ' keyTimes="0;0.62;0.72;0.82;0.9;1"') : '';
    return L('accBack', accBack) + L('headBack', ac.headBack, H) + L('hairBack', hb.back, HH) + L('wearBack', w.back) +
      L('body', A.body(st)) + L('legs', w.legs) + L('wear', wear) + L('arms', A.arms(st)) + L('wearOver', w.over) +
      L('hairMid', hb.mid, HH) + L('neck', ac.neck) + L('hand', ac.hand) +
      L('head', A.head(st) + A.face(fc), H) + L('hairFront', A.hairFront(st), H) + L('brows', A.brows(fc) + (A.exprDeco ? A.exprDeco(fc) : ''), H) +
      L('glasses', ac.glasses, H) + L('ear', ac.ear, H) + L('hairTop', hb.top, H) + L('headAcc', ac.head, H) + L('pet', ac.pet, petA);
    } finally { A._pose = pp; A._live = pl; }
  };

  /* じめんの かげ */
  A.floorShadow = () => `<ellipse cx="300" cy="772" rx="118" ry="15" fill="#5a3070" opacity=".16"/>`;

  /* まるごと SVG（しゃしん・サムネ用） */
  A.svg = function (st, o) {
    o = o || {};
    const vb = o.vb || [0, 0, 600, 900];
    const cid = U.uid('vb');
    let inner = '';
    if (o.bg !== false && A.bg) inner += A.bg(st.bg | 0);
    inner += A.floorShadow() + A.character(st, { live: !!o.live });
    if (A.weather && o.weather !== false) inner += A.weather(st.weather | 0, !!o.live);
    if (o.frame && A.frame) inner += A.frame(o.frame, vb, o.date);
    if (o.stamps && A.stamp) inner += o.stamps.map((p) => A.stamp(p.id, p.x, p.y, p.s, p.r)).join('');
    const wh = o.w ? ` width="${o.w}" height="${Math.round(o.w * vb[3] / vb[2])}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"${wh}${o.attrs ? ' ' + o.attrs : ''}>` +
      `<defs><clipPath id="${cid}"><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/></clipPath></defs>` +
      `<g clip-path="url(#${cid})">${inner}</g></svg>`;
  };
})(window);
