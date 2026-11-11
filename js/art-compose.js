/* きらきら☆おしゃれスタジオ — キャラクターの くみたて */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art;

  A.DEFAULT = {
    skin: 1, eye: 0, eyeColor: 0, lash: 1, brow: 0, shadow: 0, shadowColor: 0, cheek: 1, cheekColor: 0, lip: 0, mouth: 0, seal: 0,
    hairBack: 0, hairFront: 0, hairColor: 2,
    dress: 1, dressC: 0, top: 0, topC: 0, bottom: 0, bottomC: 0, socks: 1, socksC: 6, shoes: 1, shoesC: 5,
    head: 0, headC: 0, glasses: 0, ear: 0, neck: 0, hand: 0, back: 0, pet: 0, bg: 0,
  };

  const L = (name, s) => (s ? `<g data-l="${name}">${s}</g>` : '');

  A.character = function (st) {
    st = Object.assign({}, A.DEFAULT, st);
    const w = A.wearParts ? A.wearParts(st) : { back: '', legs: '', main: '', over: '', tie: '#ff6fa5' };
    const ac = A.accParts ? A.accParts(st) : { back: '', neck: '', hand: '', glasses: '', ear: '', head: '', headBack: '', pet: '' };
    const hb = A.hairBack(st, w.tie);
    return L('accBack', ac.back) + L('headBack', ac.headBack) + L('hairBack', hb.back) + L('wearBack', w.back) +
      L('body', A.body(st)) + L('legs', w.legs) + L('wear', w.main) + L('arms', A.arms(st)) + L('wearOver', w.over) +
      L('hairMid', hb.mid) + L('neck', ac.neck) + L('hand', ac.hand) +
      L('head', A.head(st) + A.face(st)) + L('hairFront', A.hairFront(st)) + L('brows', A.brows(st)) +
      L('glasses', ac.glasses) + L('ear', ac.ear) + L('hairTop', hb.top) + L('headAcc', ac.head) + L('pet', ac.pet);
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
    inner += A.floorShadow() + A.character(st);
    if (o.frame && A.frame) inner += A.frame(o.frame, vb);
    if (o.stamps && A.stamp) inner += o.stamps.map((p) => A.stamp(p.id, p.x, p.y, p.s, p.r)).join('');
    const wh = o.w ? ` width="${o.w}" height="${Math.round(o.w * vb[3] / vb[2])}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"${wh}${o.attrs ? ' ' + o.attrs : ''}>` +
      `<defs><clipPath id="${cid}"><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/></clipPath></defs>` +
      `<g clip-path="url(#${cid})">${inner}</g></svg>`;
  };
})(window);
