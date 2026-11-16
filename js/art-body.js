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
    { id: 'heart', n: 'ハートめ', heart: true }, { id: 'star', n: 'ほしめ', star: true }, { id: 'sleepy', n: 'ねむねむ', sleepy: true },
    { id: 'kiri', n: 'きりっ', kiri: true, rot: 5 }, { id: 'fire', n: 'めらめら', fire: true, tags: ['hero', 'sports'] },
  ];
  A.EYE_COLORS = [
    { n: 'ちゃいろ', c: '#8a5230' }, { n: 'くろ', c: '#4a4458' }, { n: 'あお', c: '#3b82e6' }, { n: 'みずいろ', c: '#3fbfee' },
    { n: 'みどり', c: '#34b36b' }, { n: 'むらさき', c: '#8b5cf0' }, { n: 'ピンク', c: '#f0569a' }, { n: 'あか', c: '#e2463f' },
    { n: 'きん', c: '#e9a519' }, { n: 'にじ', g: ['#ff6fb0', '#a56bff', '#39b8ff'] },
  ];
  A.LASHES = [{ n: 'なし' }, { n: 'ナチュラル' }, { n: 'ぱっちり' }, { n: 'ゴージャス' }];
  A.BROWS = [{ n: 'ふつう' }, { n: 'きりっ' }, { n: 'こまり' }, { n: 'まる' }, { n: 'ふとまゆ' }, { n: 'りりしい' }];
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
    { n: 'ラメピンク', c: '#ff8cc0', glitter: true, lame: true }, { n: 'にじいろ', g: ['#ff7fa8', '#ffc94a', '#7fd0ff'] }, { n: 'グロスクリア', c: '#f7b9c6', clear: true },
  ];
  A.MOUTHS = [{ n: 'にっこり' }, { n: 'わーい' }, { n: 'ねこぐち' }, { n: 'ちゅっ' }, { n: 'てへぺろ' }, { n: 'にかっ' }];
  /* ひょうじょう：め・くち・まゆ・チークを いちじてきに うわがき（くち 90〜92・まゆ 90〜91 は ひょうじょうせんよう） */
  A.EXPRS = [
    { id: 'none', n: 'いつもの' },
    { id: 'smile', n: 'にこにこ', eye: 'niko', mouth: 1 },
    { id: 'wink', n: 'ウインク', eye: 'wink', mouth: 4 },
    { id: 'wow', n: 'びっくり', mouth: 90, brow: 90, deco: 'wow' },
    { id: 'shy', n: 'てれてれ', eye: 'niko', cheek: 5, mouth: 0, deco: 'shy' },
    { id: 'angry', n: 'ぷんぷん', mouth: 91, brow: 91, deco: 'angry' },
    { id: 'sleepy', n: 'ねむねむ', eye: 'sleepy', mouth: 92, deco: 'zzz' },
    { id: 'love', n: 'らぶらぶ', eye: 'heart', mouth: 1, deco: 'love' },
  ];
  A.exprState = function (st) {
    const e = A.EXPRS[st.expr | 0];
    if (!e || !(st.expr | 0)) return st;
    const o = Object.assign({}, st);
    if (e.eye) o.eye = Math.max(0, A.EYES.findIndex((x) => x.id === e.eye));
    if (e.mouth != null) o.mouth = e.mouth;
    if (e.brow != null) o.brow = e.brow;
    if (e.cheek != null) { o.cheek = e.cheek; }
    o._deco = e.deco;
    return o;
  };
  A.SEALS = [
    { n: 'なし' }, { n: 'ほし' }, { n: 'ハート' }, { n: 'ジュエル' }, { n: 'そばかす' }, { n: 'ねこひげ', tags: ['neko'] },
    { n: 'ラメ' }, { n: 'ばんそうこう' }, { n: 'にじ' }, { n: 'おはな' },
    { n: 'ちょうちょ', tags: ['fairy'] }, { n: 'おつきさま', tags: ['magic'] }, { n: 'にじペイント', tags: ['matsuri', 'yume'] },
    { n: 'バッテンきず', tags: ['pirate', 'ninja'] }, { n: 'いなずま', tags: ['hero'] }, { n: 'おうえんペイント', tags: ['sports'] },
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
    { id: 'long', n: 'ロング' }, { id: 'bob', n: 'ボブ' }, { id: 'short', n: 'ショート', b: 1 }, { id: 'vshort', n: 'ベリーショート', b: 1 }, { id: 'twin', n: 'ツインテール' },
    { id: 'pony', n: 'ポニーテール' }, { id: 'buns', n: 'おだんご' }, { id: 'wavy', n: 'ゆるふわ' }, { id: 'braid', n: 'みつあみ' },
    { id: 'osage', n: 'おさげ' }, { id: 'side', n: 'サイドテール' }, { id: 'hime', n: 'プリンセス' }, { id: 'lowtwin', n: 'ロングツイン' }, { id: 'usabun', n: 'うさぎだんご' }, { id: 'highpony', n: 'たかいポニー' }, { id: 'curl', n: 'ふんわりカール' },
    { id: 'spiky', n: 'ツンツン', ss: 1, b: 1 }, { id: 'mash', n: 'マッシュ', b: 1 }, { id: 'wolf', n: 'ウルフ', b: 1 }, { id: 'kuru', n: 'くるくるショート', b: 1 },
    { id: 'mohawk', n: 'ソフトモヒカン', ss: 1, b: 1 }, { id: 'chonmage', n: 'ちょんまげ', ss: 1, b: 1 }, { id: 'chokon', n: 'ちょこんむすび', ss: 1, b: 1 },
    { id: 'super', n: 'スーパーツンツン', ss: 1, b: 1 }, { id: 'negu', n: 'ねぐせ', ss: 1, b: 1 }, { id: 'ahoge', n: 'アホげ', ss: 1, b: 1 },
    { id: 'afro', n: 'アフロ', b: 1 }, { id: 'bosa', n: 'ぼさぼさ', b: 1 }, { id: 'lion', n: 'ライオンヘア', b: 1 }, { id: 'musubi', n: 'うしろむすび', b: 1 }, { id: 'topbun', n: 'トップおだんご', ss: 1, b: 1 },
  ];
  A.HAIR_FRONT = [
    { id: 'patsun', n: 'ぱっつん' }, { id: 'naname', n: 'ななめ' }, { id: 'center', n: 'まんなかわけ' }, { id: 'giza', n: 'ギザギザ' },
    { id: 'fuwa', n: 'ふんわり' }, { id: 'odeko', n: 'おでこ' }, { id: 'hime', n: 'ひめカット' },
    { id: 'seethru', n: 'シースルー' }, { id: 'heart', n: 'ハートまえがみ' }, { id: 'asym', n: 'アシンメトリー' },
    { id: 'up', n: 'アップバング', b: 1 }, { id: 'zanbara', n: 'ざんばら', b: 1 }, { id: 'mash', n: 'マッシュ', b: 1 }, { id: 'shichisan', n: 'しちさん', b: 1 }, { id: 'tanpatsu', n: 'たんぱつ', b: 1 },
    { id: 'nagashi', n: 'よこながし', b: 1 }, { id: 'kakiage', n: 'かきあげ', b: 1 }, { id: 'nagame', n: 'ながめまえがみ', b: 1 },
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
    const ST = 'M266,378 L268,400 M334,378 L332,400';
    if ((st.chara | 0) === 1) {
      /* おとこのこ：タンクトップ と パンツ */
      s += P(ST, 'none', '#b4d2ec', 6.5) + P(ST, 'none', '#ffffff', 4);
      s += P('M262,398 C275,404 290,405 300,404 C310,405 325,404 338,398 C340,420 336,440 334,455 Q300,463 266,455 C264,440 260,420 262,398Z', '#ffffff', '#b4d2ec', 2.2);
      s += P('M266,455 Q300,463 334,455 C333,470 346,486 346,505 C346,520 325,528 300,528 C275,528 254,520 254,505 C254,486 267,470 266,455Z', '#9fd2f7', '#5fa4d8', 2.2);
      s += P('M264,463 Q300,471 336,463', 'none', '#ffffff', 3.4) + U.star(300, 500, 6.5, '#ffffff', '#ffffff', 1);
      return s;
    }
    s += P(ST, 'none', '#f3c4d6', 6.5) + P(ST, 'none', '#ffffff', 4);
    s += P('M262,398 C275,404 290,405 300,404 C310,405 325,404 338,398 C340,420 336,440 334,455 C333,470 346,486 346,505 C346,520 325,528 300,528 C275,528 254,520 254,505 C254,486 267,470 266,455 C264,440 260,420 262,398Z', '#ffffff', '#f3c4d6', 2.2);
    s += U.bow(300, 406, 16, 10, '#ffb3cd', '#f08fb2', { sw: 1.4 });
    return s;
  };
  /* ---------- ネイル ---------- */
  A.NAIL_COLORS = [
    { n: 'ピンク', c: '#ff8cc0' }, { n: 'あか', c: '#ec3a52' }, { n: 'コーラル', c: '#ff8a72' }, { n: 'オレンジ', c: '#ffa045' }, { n: 'きいろ', c: '#ffd84a' },
    { n: 'ミント', c: '#6fdcbf' }, { n: 'みどり', c: '#4fbf6a' }, { n: 'みずいろ', c: '#6cc8f5' }, { n: 'あお', c: '#4a7ae8' }, { n: 'ラベンダー', c: '#c3a6ff' },
    { n: 'むらさき', c: '#9a5cf0' }, { n: 'しろ', c: '#fbfbff' }, { n: 'くろ', c: '#3a3446' }, { n: 'ゴールド', c: '#f2b829' }, { n: 'シルバー', c: '#c4cbe0' },
    { n: 'にじ', g: ['#ff7fa8', '#ffd24a', '#7fd0ff', '#b48cff'] },
  ];
  A.NAIL_PATS = [{ n: 'ぬる' }, { n: 'グラデ' }, { n: 'フレンチ' }, { n: 'ドット' }, { n: 'しましま' }, { n: 'ハート' }, { n: 'ラメ' }];
  A.NAIL_STKS = [{ n: 'なし' }, { n: 'ストーン' }, { n: 'ハート' }, { n: 'ほし' }, { n: 'リボン' }, { n: 'おはな' }, { n: 'パール' }];
  const nailBase = (n) => { const c = A.NAIL_COLORS[n.c | 0] || A.NAIL_COLORS[0]; return c.g ? c.g[1] : c.c; };
  A.nailColor = nailBase;
  /* つめ 1まい（中心が 0,0／うえが ゆびさき） */
  A.nailArt = function (n, w, h) {
    const hw = w / 2, hh = h / 2;
    const D = `M${f(-hw)},${f(hh)} L${f(-hw)},${f(-hh + hw)} A${f(hw)},${f(hw)} 0 0 1 ${f(hw)},${f(-hh + hw)} L${f(hw)},${f(hh)} Q0,${f(hh + h * 0.12)} ${f(-hw)},${f(hh)}Z`;
    if (!n) return P(D, '#ffe6ec', '#e8b4c4', Math.max(1, w * 0.06)) + P(`M${f(-hw * 0.45)},${f(-hh + hw * 0.6)} L${f(-hw * 0.45)},${f(hh * 0.4)}`, 'none', '#fff', w * 0.14, 'opacity=".7"');
    const col = A.NAIL_COLORS[n.c | 0] || A.NAIL_COLORS[0], base = nailBase(n), line = U.dark(base, 0.3);
    const cid = U.uid('nc');
    let fill = base, defs = `<clipPath id="${cid}"><path d="${D}"/></clipPath>`;
    if (col.g) { const id = U.uid('ng'); defs += U.lin(id, col.g.map((x) => [x])); fill = `url(#${id})`; }
    const p = n.p | 0;
    let inner = '';
    if (p === 1) { const id = U.uid('ngr'); defs += U.lin(id, [[base], [base, 0.35], ['#ffffff', 1, 0.95]]); inner += `<rect x="${f(-hw)}" y="${f(-hh)}" width="${f(w)}" height="${f(h * 1.2)}" fill="url(#${id})"/>`; }
    else if (p === 2) { inner += `<rect x="${f(-hw)}" y="${f(-hh)}" width="${f(w)}" height="${f(h * 1.2)}" fill="#ffe4ea"/>` + P(`M${f(-hw - 2)},${f(-hh)} L${f(hw + 2)},${f(-hh)} L${f(hw + 2)},${f(-hh + h * 0.3)} Q0,${f(-hh + h * 0.46)} ${f(-hw - 2)},${f(-hh + h * 0.3)}Z`, fill); }
    else inner += `<rect x="${f(-hw)}" y="${f(-hh)}" width="${f(w)}" height="${f(h * 1.2)}" fill="${fill}"/>`;
    const lt = U.lum(base) > 200 ? '#ff8cc0' : '#ffffff';
    if (p === 3) [[-0.4, -0.5], [0.35, -0.2], [-0.25, 0.15], [0.3, 0.45], [-0.35, 0.65], [0.05, -0.75]].forEach((q) => { inner += `<circle cx="${f(q[0] * hw)}" cy="${f(q[1] * hh)}" r="${f(w * 0.1)}" fill="${lt}"/>`; });
    if (p === 4) for (let k = -3; k <= 3; k++) inner += `<line x1="${f(-hw + k * w * 0.32)}" y1="${f(hh * 1.2)}" x2="${f(hw + k * w * 0.32)}" y2="${f(-hh)}" stroke="${lt}" stroke-width="${f(w * 0.12)}"/>`;
    if (p === 5) inner += U.heart(0, 0, w * 0.26, lt);
    if (p === 6) { const r = U.rng(7 + (n.c | 0)); for (let k = 0; k < 12; k++) inner += `<circle cx="${f((r() - 0.5) * w)}" cy="${f((r() - 0.5) * h)}" r="${f(w * (0.03 + r() * 0.04))}" fill="#fff" opacity=".95"/>`; inner += U.sparkle(hw * 0.2, -hh * 0.2, w * 0.2, '#fff'); }
    inner += P(`M${f(-hw * 0.5)},${f(-hh + hw * 0.7)} L${f(-hw * 0.5)},${f(hh * 0.35)}`, 'none', '#fff', w * 0.13, 'opacity=".55"');
    let s = `<defs>${defs}</defs><g clip-path="url(#${cid})">${inner}</g>` + P(D, 'none', line, Math.max(1, w * 0.06));
    const sk = n.s | 0, sy = hh * 0.28, sr = w * 0.3;
    if (sk === 1) s += U.gem(0, sy, sr, '#bfe9ff', '#5fa8d8');
    if (sk === 2) s += U.heart(0, sy, sr * 0.95, '#ff5c93', '#ffffff', w * 0.05);
    if (sk === 3) s += U.star(0, sy, sr * 1.15, '#ffe27a', '#e0a020', w * 0.05);
    if (sk === 4) s += U.bow(0, sy, w * 0.78, w * 0.46, '#ff8fc0', '#d9508a', { sw: w * 0.05 });
    if (sk === 5) s += U.flower(0, sy, sr * 1.1, '#ffffff', '#ffd24a', 5, '#f0a0c0');
    if (sk === 6) s += U.gem(0, sy, sr * 0.85, '#fffaf2', '#d9b0c4');
    return s;
  };
  /* キャラの てさきに ちいさく ひょうじ（ひだりての ざひょう） */
  A.nailDots = function (st, peace) {
    const ns = st.nails; if (!Array.isArray(ns) || !ns.some(Boolean)) return '';
    const pts = peace ? [[188, 573, 3], [207, 577, 2]] : [[197.5, 556.5, 1], [204, 558.8, 2], [210.5, 556.5, 3]];
    return pts.map((p) => { const n = ns[p[2]]; return n ? `<ellipse cx="${p[0]}" cy="${p[1]}" rx="2.6" ry="3" fill="${nailBase(n)}" stroke="${U.dark(nailBase(n), 0.3)}" stroke-width=".8"/>` : ''; }).join('');
  };
  /* ネイルサロンの おおきな て（viewBox 0 0 600 700） */
  A.FINGERS = [
    { x1: 196, y1: 520, x2: 104, y2: 372, r1: 44, r2: 38, w: 44, h: 52 },
    { x1: 236, y1: 420, x2: 220, y2: 170, r1: 36, r2: 32, w: 40, h: 50 },
    { x1: 298, y1: 410, x2: 296, y2: 132, r1: 37, r2: 33, w: 42, h: 52 },
    { x1: 360, y1: 420, x2: 372, y2: 160, r1: 36, r2: 31, w: 40, h: 50 },
    { x1: 416, y1: 450, x2: 448, y2: 250, r1: 31, r2: 27, w: 34, h: 42 },
  ];
  A.bigHand = function (st, nails, sel) {
    const k = skin(st);
    const ds = [ell(305, 545, 152, 150)].concat(A.FINGERS.map((g) => U.capsule(g.x1, g.y1, g.r1, g.x2, g.y2, g.r2)));
    let s = `<path d="M200,640 L410,640 L430,720 L180,720Z" fill="#ff9ec6" stroke="#e0609a" stroke-width="4"/>` + P('M186,660' + U.frillLine(186, 660, 424, 660, 9, 10), '#ffffff', '#f0b0c8', 3);
    s += U.union(ds, k.c, k.line, 4);
    s += P('M250,560 q50,26 110,0 M262,600 q40,14 90,0', 'none', k.shade, 4, 'opacity=".5"');
    A.FINGERS.forEach((g, i) => {
      const a = Math.atan2(g.y2 - g.y1, g.x2 - g.x1) * 180 / Math.PI + 90;
      const dx = g.x2 - g.x1, dy = g.y2 - g.y1, L = Math.hypot(dx, dy);
      const cx = g.x2 + (dx / L) * (g.r2 * 0.05 - g.h * 0.32), cy = g.y2 + (dy / L) * (g.r2 * 0.05 - g.h * 0.32);
      s += P(`M${f(g.x1 + (dx / L) * L * 0.62 - (dy / L) * g.r2 * 0.5)},${f(g.y1 + (dy / L) * L * 0.62 + (dx / L) * g.r2 * 0.5)} q${f((dy / L) * -6)},${f(6)} ${f(-(dy / L) * -g.r2)},${f((dx / L) * -g.r2)}`, 'none', k.shade, 3, 'opacity=".45"');
      s += `<g data-nail="${i}" transform="translate(${f(cx)},${f(cy)}) rotate(${f(a)})" style="cursor:pointer">` +
        (sel === i ? `<rect x="${-g.w / 2 - 9}" y="${-g.h / 2 - 9}" width="${g.w + 18}" height="${g.h + 22}" rx="${g.w / 2 + 6}" fill="none" stroke="#ffd95a" stroke-width="5" stroke-dasharray="8 6"/>` : '') +
        A.nailArt(nails[i], g.w, g.h) + '</g>';
    });
    s += `<path d="M180,632 Q305,660 430,632" fill="none" stroke="#ffd24a" stroke-width="7"/>` + [200, 240, 280, 320, 360, 400].map((x, i) => U.gem(x, 634 + Math.sin(i) * 3, 7, ['#ff9ec6', '#8ed4ff', '#c4a7ff'][i % 3])).join('');
    return s;
  };

  /* ---------- ポーズ：うでを かたを じくに まわす ---------- */
  A.POSES = [
    { id: 'normal', n: 'ふつう', L: 0, R: 0 },
    { id: 'wave', n: 'てをふる', L: 0, R: 125, wave: 'R' },
    { id: 'banzai', n: 'バンザイ', L: 128, R: 128 },
    { id: 'peace', n: 'ピース', L: 0, R: 120, peace: true },
    { id: 'open', n: 'ひろげる', L: 70, R: 70 },
    { id: 'hai', n: 'はーい！', L: 128, R: 0 },
    { id: 'kira', n: 'キラッ', L: 40, R: 150, peace: true, wave: 'L' },
  ];
  A._pose = null; A._live = false;
  const poseA = (side) => (A._pose ? (side === 'R' ? A._pose.R : A._pose.L) : 0);
  const waveAnim = (side, cx, sign) => (A._live && A._pose && A._pose.wave === side ?
    `<animateTransform attributeName="transform" type="rotate" additive="sum" values="0 ${cx} 392;${sign * 16} ${cx} 392;0 ${cx} 392" dur=".9s" repeatCount="indefinite"/>` : '');
  /* うでに くっつく もの（うで・そで）：ひだりうでの ざひょうで かいて、みぎは かがみうつし */
  A.armG = (s, side) => { const a = poseA(side); return a ? `<g transform="rotate(${a} 250 392)">${waveAnim(side, 250, 1)}${s}</g>` : s; };
  A.armBoth = (s) => A.armG(s, 'L') + U.mirror(A.armG(s, 'R'));
  /* てに もつ もの：むきは そのまま、てくびの いちだけ ついていく */
  A.handG = (s, side) => {
    const a = poseA(side); if (!a) return s;
    return side === 'R' ? `<g transform="rotate(${-a} 350 392)">${waveAnim('R', 350, -1)}<g transform="rotate(${a} 392 535)">${s}</g></g>`
      : `<g transform="rotate(${a} 250 392)">${waveAnim('L', 250, 1)}<g transform="rotate(${-a} 208 535)">${s}</g></g>`;
  };
  A.arms = function (st) {
    const k = skin(st);
    const one = (peace) => {
      const ds = [U.capsule(250, 392, 13, 208, 535, 10.5), ell(205, 546, 12, 13)];
      if (peace) ds.push(U.capsule(201, 550, 4.6, 188, 573, 4), U.capsule(208, 551, 4.6, 207, 577, 4));
      return U.union(ds, k.c, k.line) + P('M199,552 q4,4 8,1', 'none', k.line, 1.6, 'opacity=".6"') + (A.nailDots ? A.nailDots(st, peace) : '');
    };
    const pz = !!(A._pose && A._pose.peace);
    return A.armG(one(pz && A._pose.wave === 'L'), 'L') + U.mirror(A.armG(one(pz && A._pose.wave !== 'L'), 'R'));
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
      (shp.heart ? U.heart(cx, icy - 3, 10 * b, U.dark(base, 0.8)) : `<ellipse cx="${cx}" cy="${icy - 1}" rx="${f(7.5 * b)}" ry="${f(10.5 * b)}" fill="${U.dark(base, 0.8)}"/>`) +
      `<ellipse cx="${cx}" cy="${icy + 12.5}" rx="${f(11 * b)}" ry="6" fill="${U.light(base, 0.65)}" opacity=".75"/>` +
      `<ellipse cx="${cx}" cy="${EY - 24}" rx="30" ry="13" fill="#3d2450" opacity=".2"/>` +
      (shp.sleepy ? `<g transform="${T}">${P('M-32,-40 L32,-40 L32,-3 C16,-11 -16,-11 -32,-2Z', A.skin(st).c)}</g>` : '') +
      (shp.kiri ? `<g transform="${T}">${P('M-36,-46 L36,-46 L36,-9.5 L-36,-22Z', A.skin(st).c)}</g>` : '') + '</g>';
    if (shp.heart) s += U.heart(cx - 7, EY - 8, 5.6, '#fff') + `<circle cx="${cx + 8}" cy="${EY + 9.5}" r="2.8" fill="#fff" opacity=".95"/>`;
    else if (shp.star) s += P(U.starPath(cx, icy - 1, 10, 4.6, 5, -90), '#fff8c8', '#fff8c8', 1.2) + `<circle cx="${cx - 9}" cy="${EY - 11}" r="3.4" fill="#fff"/><circle cx="${cx + 8}" cy="${EY + 11}" r="2.4" fill="#fff" opacity=".95"/>`;
    else if (shp.sleepy) s += `<circle cx="${cx - 6}" cy="${EY + 3}" r="4" fill="#fff"/><circle cx="${cx + 8}" cy="${EY + 11}" r="2.2" fill="#fff" opacity=".95"/>`;
    else if (shp.kiri) s += `<circle cx="${cx - 6.5}" cy="${EY - 3.5}" r="5.2" fill="#fff"/><circle cx="${cx + 8}" cy="${EY + 10}" r="2.6" fill="#fff" opacity=".95"/>`;
    else if (shp.fire) s += `<g transform="translate(${cx},${f(icy + 1)})">` + P('M0,13 C-10,13 -12,3 -8,-4 C-7,1 -3.5,1 -3.5,-4 C-3.5,-9 1,-11 0,-17 C8,-11 12,-2 10,5 C9,10.5 4.5,13 0,13Z', '#ff9a3c', '#ffd24a', 1.4) +
      P('M0,11 C-5,11 -6,5 -3,1 C-1.5,4 1.5,3 1,-2 C5,1 6,6 4,9 C3,10.5 1.5,11 0,11Z', '#fff3a8') + '</g>' + `<circle cx="${cx - 9}" cy="${EY - 11}" r="3.2" fill="#fff"/>`;
    else s += `<circle cx="${cx - 7.5}" cy="${EY - 8.5}" r="${f(6.3 * b)}" fill="#fff"/><circle cx="${cx + 8}" cy="${EY + 9.5}" r="${f(3 * b)}" fill="#fff" opacity=".95"/>`;
    if (shp.kira) s += U.sparkle(cx + 8.5, EY - 8, 6, '#fff') + `<circle cx="${cx - 9}" cy="${EY + 11}" r="1.8" fill="#fff"/>`;
    /* まぶた・まつげ */
    if (shp.sleepy) {
      s += `<g transform="${T}">` + P('M-26,-1.5 C-13,-11 13,-11 26,-4', 'none', LC, 5.5);
      if (lash >= 1) s += P('M-26,-1.5 L-35,-4 M-22,-6 L-30,-11', 'none', LC, 3);
      if (lash >= 2) s += P('M-12,-9.5 L-16,-17', 'none', LC, 3);
      if (lash >= 3) s += P('M0,-10.5 L0,-18.5 M12,-9 L15,-16.5', 'none', LC, 3) + P('M-20,15 L-27,19.5 M-14,21 L-19,27.5', 'none', LC, 2.2);
      return s + P('M-19,17.5 C-10,25.5 6,27 15,21.5', 'none', LC, 1.8, 'opacity=".42"') + '</g>';
    }
    if (shp.kiri) {
      s += `<g transform="${T}">` + P('M-28.5,-21.5 L27,-9.5', 'none', LC, 6) + P('M-28,-21 L-36.5,-27.5', 'none', LC, 4);
      if (lash >= 1) s += P('M-21,-21 L-27,-31', 'none', LC, 3);
      if (lash >= 2) s += P('M-9,-18.5 L-13,-28', 'none', LC, 3);
      if (lash >= 3) s += P('M4,-15.5 L3,-25 M16,-13 L18,-22', 'none', LC, 3) + P('M-20,15 L-27,19.5 M-14,21 L-19,27.5', 'none', LC, 2.2);
      return s + P('M-19,17.5 C-10,25.5 6,27 15,21.5', 'none', LC, 1.8, 'opacity=".42"') + '</g>';
    }
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

  const BROW_D = { 0: 'M-22,-45 C-12,-51 4,-52 18,-47', 1: 'M-22,-51 C-10,-53 6,-50 18,-43', 2: 'M-23,-43 C-12,-49 4,-53 17,-53', 4: 'M-22,-46 C-12,-52.5 4,-53.5 18,-48',
    90: 'M-22,-55 C-12,-63 4,-64 18,-57', 91: 'M-22,-57 C-8,-55 6,-48 18,-38' };
  function browOne(cx, flip, st, color) {
    const b = st.brow | 0, boy = (st.chara | 0) === 1;
    const T0 = `translate(${cx},${EY}) scale(${flip},1)`;
    if (b === 3) return `<g transform="${T0}"><ellipse cx="3" cy="-48" rx="${boy ? 7.6 : 6.5}" ry="${boy ? 5 : 4.2}" fill="${color}"/></g>`;
    if (b === 5) return `<g transform="${T0}">${P('M-23,-55 C-10,-57 6,-52.5 19,-42.5 C5,-47 -9,-48.5 -22,-47.5Z', color, color, 1.6)}</g>`;
    return `<g transform="${T0}">${P(BROW_D[b] || BROW_D[0], 'none', color, b === 4 ? 6.8 : boy ? 4.5 : 3.4)}</g>`;
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
    const on = !!(lip.c || lip.g);
    const cb = lip.clear ? U.mix(k.lip, '#ffffff', 0.12) : lip.g ? lip.g[1] : (lip.c || k.lip);
    let c = cb, s = '';
    if (lip.g) { const id = U.uid('lg'); s += `<defs>${U.lin(id, lip.g.map((x) => [x]), 0, 0, 1, 0)}</defs>`; c = `url(#${id})`; }
    const cl = on ? U.dark(cb, 0.3) : k.line;
    const gloss = (x, y, w) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f(w * 0.36)}" fill="#fff" opacity="${lip.clear ? 0.95 : 0.75}"/>` +
      (lip.clear ? `<ellipse cx="${x - w * 0.9}" cy="${y - 4}" rx="${f(w * 0.45)}" ry="1.4" fill="#fff" opacity=".9"/>` + U.sparkle(x + w + 2, y - 3, 2.6, '#fff', 0.95) : '') +
      (lip.glitter ? U.sparkle(x + w + 3, y - 2, 3, '#fff', 0.95) + U.sparkle(x - w - 2, y + 1, 2.2, '#fff', 0.9) : '') +
      (lip.lame ? [[-9, -6], [-4, -1], [3, -5], [8, 0], [-1, -8], [11, -6]].map((p) => `<circle cx="${x + p[0]}" cy="${y + p[1]}" r="0.9" fill="#fff" opacity=".95"/>`).join('') : '');
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
    } else if (m === 5) {
      const D = 'M281,314 C292,317 308,317 319,314 C319.5,326 311,333.5 300,333.5 C289,333.5 280.5,326 281,314Z';
      s += P(D, '#ffffff', on ? c : k.line, on ? 3.4 : 2.6) + P('M285,323.5 Q300,328 315,323.5', 'none', k.line, 1.3, 'opacity=".3"');
    } else if (m === 90) {
      s += `<ellipse cx="300" cy="323" rx="6.5" ry="8" fill="#a12f47" stroke="${on ? c : k.line}" stroke-width="${on ? 3.2 : 2.2}"/><ellipse cx="300" cy="327" rx="4" ry="3" fill="#ff8fa5"/>`;
    } else if (m === 91) {
      s += P('M288,324 Q294,318 300,322 Q306,318 312,324', 'none', on ? c : k.line, on ? 3.8 : 2.8);
    } else if (m === 92) {
      s += `<ellipse cx="300" cy="325" rx="9" ry="11" fill="#a12f47" stroke="${on ? c : k.line}" stroke-width="${on ? 3.2 : 2.2}"/><ellipse cx="300" cy="331" rx="6" ry="4" fill="#ff8fa5"/>`;
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
      case 10: return `<g transform="rotate(-12 378 300)">` +
        `<ellipse cx="370" cy="294" rx="8" ry="6.5" fill="#c79cff" stroke="#8a5cf0" stroke-width="1.4"/><ellipse cx="386" cy="294" rx="8" ry="6.5" fill="#c79cff" stroke="#8a5cf0" stroke-width="1.4"/>` +
        `<ellipse cx="372" cy="305" rx="5.5" ry="4.6" fill="#ff9ec6" stroke="#e0609a" stroke-width="1.3"/><ellipse cx="384" cy="305" rx="5.5" ry="4.6" fill="#ff9ec6" stroke="#e0609a" stroke-width="1.3"/>` +
        `<circle cx="368" cy="292" r="2.2" fill="#fff" opacity=".85"/><circle cx="388" cy="292" r="2.2" fill="#fff" opacity=".85"/>` +
        `<rect x="376.4" y="288" width="3.2" height="20" rx="1.6" fill="#6a4a8a"/>` + P('M377,288 q-3,-6 -7,-7 M379,288 q3,-6 7,-7', 'none', '#6a4a8a', 1.3) + '</g>';
      case 11: return P('M218,276 A12,12 0 1 0 226,296 A9.5,9.5 0 1 1 218,276Z', '#ffe680', '#e0a820', 1.4) + U.star(229, 279, 3.6, '#fff3a8', '#e0a820', 0.8) + U.sparkle(208, 300, 2.8, '#fff7c2');
      case 12: return U.both(['#ff6f8f', '#ffc94a', '#5fc8f0'].map((c, i) => P(`M${216 + i * 1.5},${300 + i * 6} q15,-9 30,0`, 'none', c, 4.6)).join(''));
      case 13: return P('M366,290 l14,14 M380,290 l-14,14', 'none', '#fff', 6) + P('M366,290 l14,14 M380,290 l-14,14', 'none', '#d9604e', 3.2);
      case 14: return P('M382,284 L369,301 L377,301 L370,317 L388,297 L379,297Z', '#ffe14a', '#e0a020', 1.6);
      case 15: return U.both(P('M216,296 l24,3', 'none', '#f2485c', 5) + P('M217,305 l24,3', 'none', '#3a8fe8', 5));
      default: return '';
    }
  }

  A.exprDeco = function (st) {
    let s = '';
    switch (st._deco) {
      case 'wow': s += P('M394,214 l14,-10 M398,232 l18,-2 M386,198 l6,-15', 'none', '#ff7fb2', 4) + `<ellipse cx="226" cy="236" rx="5" ry="7" fill="#9fdcff" stroke="#5fb0e8" stroke-width="1.6"/>`; break;
      case 'shy': s += U.heart(392, 214, 9, '#ff7fb2', '#fff', 1.6) + U.heart(410, 188, 6, '#ff9ec6', '#fff', 1.4); break;
      case 'angry': s += `<g transform="translate(376,176)">` + P('M-12,-4 q8,2 8,-8 M4,-12 q-2,8 8,8 M12,4 q-8,-2 -8,8 M-4,12 q2,-8 -8,-8', 'none', '#f2485c', 3.4) + '</g>' +
        `<ellipse cx="232" cy="306" rx="20" ry="13" fill="#ff8a9c" opacity=".35"/><ellipse cx="368" cy="306" rx="20" ry="13" fill="#ff8a9c" opacity=".35"/>`; break;
      case 'zzz': s += ['Z', 'z', 'z'].map((z, i) => `<text x="${388 + i * 16}" y="${208 - i * 22}" font-size="${24 - i * 5}" font-weight="bold" fill="#8a90c8" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="sans-serif">${z}</text>`).join(''); break;
      case 'love': s += U.heart(392, 214, 10, '#ff5c93', '#fff', 1.6) + U.heart(212, 200, 7, '#ff9ec6', '#fff', 1.4) + U.heart(406, 182, 6, '#ff7fb2', '#fff', 1.3); break;
    }
    return s;
  };

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
  /* ベリーショート用：みじかい もみあげ */
  const R_LOCK_S = ' C421,262 415,282 405,294 C399,272 395,246 393,218';
  const L_LOCK_S = ' C205,246 201,272 195,294 C185,282 179,264 178,255Z';
  const VS = ' C425,280 419,298 406,304 L194,304 C181,298 175,280 178,255Z';
  const FR_PATSUN = ' C380,222 362,224.5 344,225.5 L340,214 L335,226 C312,227.5 288,227.5 265,226 L260,214 L256,225.5 C238,224.5 220,222 207,218';

  /* シースルー：ほそい けたばが すきまを あけて ならぶ */
  function seeThru() {
    let d = ' C391,196 386,206 382,214';
    const tips = [362, 338, 314, 290, 266, 242];
    let x0 = 382;
    tips.forEach((x) => {
      d += ` Q${x0 - 3},186 ${x0 - 8},170 L${x + 6},166 Q${x + 3},194 ${x},217 Q${x - 3},194 ${x - 6},166 L${x - 10},168`;
      x0 = x - 10;
    });
    return d + ' L222,170 Q218,192 216,214 C212,212 209,214 207,218';
  }
  function frontD(id) {
    switch (id) {
      case 'seethru': return CAP + R_LOCK + seeThru() + L_LOCK;
      case 'heart': return CAP + R_LOCK + FR_PATSUN + L_LOCK + ' ' + U.heartPath(300, 199, 18);
      case 'asym': return CAP + R_LOCK + ' C387,190 377,176 362,170 L351,183 L341,166 C321,170 301,186 287,205 L277,195 L267,227 C246,235 224,234 207,222' + L_LOCK;
      case 'naname': return CAP + R_LOCK + ' C388,190 374,150 352,114 C338,160 304,200 266,222 L253,206 L244,228 C231,232 217,229 207,220' + L_LOCK;
      case 'center': return CAP + R_LOCK + ' C391,178 352,128 303,108 L297,108 C248,128 209,178 207,218' + L_LOCK;
      case 'giza': return CAP + R_LOCK + ' Q386,218 378,229 Q372,216 364,206 Q356,219 346,232 Q340,218 330,205 Q322,221 312,233 Q306,218 300,206 Q294,218 288,233 Q278,221 270,205 Q260,218 254,232 Q244,219 236,206 Q228,216 222,229 Q214,218 207,218' + L_LOCK;
      case 'fuwa': return CAP + R_LOCK + U.frillLine(393, 218, 207, 218, 5, -12) + L_LOCK;
      case 'odeko': return CAP + R_LOCK + ' C395,180 374,146 338,134 C318,127 282,127 262,134 C226,146 205,180 207,218' + L_LOCK;
      case 'nagashi': return CAP + R_LOCK + ' C390,222 376,238 358,238 C318,232 268,202 236,158 C224,182 214,202 207,218' + L_LOCK;
      case 'kakiage': return CAP + R_LOCK + ' C397,168 382,124 344,110 C322,103 278,103 256,110 C218,124 203,168 207,218' + L_LOCK;
      case 'nagame': return CAP + R_LOCK + ' L380,240 L362,224 L344,248 L322,228 L300,252 L278,228 L256,248 L238,224 L220,240 L207,218' + L_LOCK;
      case 'up': return CAP + R_LOCK + ' C394,186 372,150 340,140 C318,132 282,132 260,140 C228,150 206,186 207,218' + L_LOCK;
      case 'zanbara': return CAP + R_LOCK + ' L381,198 L374,236 L358,204 L346,244 L328,206 L308,250 L292,208 L274,240 L260,204 L246,232 L233,200 L221,226 L207,218' + L_LOCK;
      case 'mash': return CAP + R_LOCK + ' C390,234 350,241 300,241 C250,241 210,234 207,218' + L_LOCK;
      case 'shichisan': return CAP + R_LOCK + ' C389,188 362,160 322,150 C292,143 266,134 250,114 C233,146 213,182 207,218' + L_LOCK;
      case 'tanpatsu': return CAP + R_LOCK + ' C392,194 380,170 352,160 L345,174 L333,158 L319,174 L305,158 L291,174 L277,158 L263,174 L250,160 C222,170 208,194 207,218' + L_LOCK;
      case 'hime': return CAP + ' C425,300 421,336 415,358 L391,358 C390,310 389,262 389,220' +
        ' C378,223 362,225 344,226 L340,214 L335,226.5 C312,228 288,228 265,226.5 L260,214 L256,226 C238,225 222,223 211,220' +
        ' C211,262 210,310 209,358 L185,358 C179,336 175,300 178,255Z';
      default: return CAP + R_LOCK + FR_PATSUN + L_LOCK;
    }
  }

  A.hairFront = function (st) {
    const hp = hairPaint(st), k = skin(st);
    const id = (A.HAIR_FRONT[st.hairFront] || A.HAIR_FRONT[0]).id;
    const hbk = A.HAIR_BACK[st.hairBack] || {};
    const vshort = hbk.id === 'vshort' || !!hbk.ss;
    const TUFT = id === 'up' ? 'M232,132 L240,84 L258,112 L270,62 L288,104 L302,54 L316,104 L334,64 L344,112 L364,86 L368,134 C330,120 270,120 232,132Z' : '';
    const d = vshort ? frontD(id).replace(R_LOCK, R_LOCK_S).replace(L_LOCK, L_LOCK_S) : frontD(id);
    const c1 = U.uid('hc'), c2 = U.uid('hf');
    const ev = id === 'heart' ? ' fill-rule="evenodd" clip-rule="evenodd"' : '';
    let s = hp.defs + `<defs><clipPath id="${c1}"><path d="${HEAD_D}"/></clipPath><clipPath id="${c2}"><path d="${d}"${ev}/></clipPath></defs>`;
    /* まえがみの かげ */
    s += `<g clip-path="url(#${c1})"><path d="${d}"${ev} transform="translate(0,7)" fill="${k.shade}" opacity=".5"/></g>`;
    s += TUFT ? U.union([TUFT, d], hp.fill, hp.line, 2.5) : P(d, hp.fill, hp.line, 2.5, ev.trim());
    let det = '';
    if (id === 'patsun' || id === 'hime' || id === 'giza' || id === 'fuwa' || id === 'seethru' || id === 'heart' || id === 'zanbara' || id === 'mash' || id === 'nagame') {
      det += P('M300,97 C297,140 290,186 286,224 M300,97 C303,140 310,186 314,224 M270,101 C252,136 240,180 234,218 M330,101 C348,136 360,180 366,218 M236,116 C222,146 214,180 211,212 M364,116 C378,146 386,180 389,212', 'none', hp.line, 1.6, 'opacity=".28"');
    } else if (id === 'naname' || id === 'asym' || id === 'nagashi') {
      det += P('M352,114 C330,150 296,186 262,206 M352,114 C320,138 276,160 236,172 M352,114 C300,124 250,130 212,150 M356,118 C372,150 382,186 388,214', 'none', hp.line, 1.6, 'opacity=".28"');
    } else if (id === 'up' || id === 'tanpatsu' || id === 'kakiage') {
      det += P('M262,140 C256,122 260,104 268,90 M300,134 C297,116 299,100 302,84 M338,140 C344,122 340,104 332,90 M230,152 C224,136 226,120 234,108 M370,152 C376,136 374,120 366,108', 'none', hp.line, 1.6, 'opacity=".28"');
    } else if (id === 'shichisan') {
      det += P('M250,116 C280,140 330,150 384,190 M250,116 C290,120 350,128 394,168 M252,112 C300,100 360,108 404,150 M246,120 C232,150 218,180 212,210', 'none', hp.line, 1.6, 'opacity=".28"');
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
      case 'highpony': {
        const tail = 'M286,86 C292,38 360,20 404,56 C446,92 458,170 446,258 C438,318 420,362 404,392 C408,338 408,286 400,240 C390,182 364,128 318,102Z';
        o.back += P(tail, hp.fill, hp.line, 2.5) + strand('M330,62 C390,60 430,120 432,220 M318,84 C370,96 404,160 410,270') +
          `<path d="M350,46 C388,52 414,84 420,128" fill="none" stroke="${hp.hi}" stroke-width="6" stroke-linecap="round" opacity=".5"/>` + body(NAPE);
        o.top += `<ellipse cx="303" cy="88" rx="22" ry="12" fill="${tie}" stroke="${tl}" stroke-width="2"/>` + P('M285,86 q6,5 12,0 M297,84 q6,5 12,0 M309,86 q6,5 12,0', 'none', tl, 1.4, 'opacity=".6"') +
          `<circle cx="294" cy="84" r="2.6" fill="#fff" opacity=".7"/>`;
        break;
      }
      case 'curl': {
        const d = CAP + ' C434,296 452,340 440,384' + U.frillLine(440, 384, 160, 384, 7, -22) + ' C148,340 166,296 178,255Z';
        let cur = '';
        [[184, 330], [178, 368], [416, 330], [422, 368], [212, 396], [388, 396]].forEach((p) => {
          cur += P(`M${p[0] - 8},${p[1] - 4} c4,-8 16,-6 16,2 c0,8 -12,9 -12,2`, 'none', hp.line, 1.8, 'opacity=".38"');
        });
        o.back += body(d, strand('M196,320 C188,350 194,372 186,396 M404,320 C412,350 406,372 414,396') + cur);
        break;
      }
      case 'usabun': {
        const ear = (sx) => `<ellipse cx="${300 + sx * 58}" cy="78" rx="21" ry="44" transform="rotate(${sx * 16} ${300 + sx * 58} 78)" fill="${hp.fill}" stroke="${hp.line}" stroke-width="2.5"/>` +
          P(`M${300 + sx * 50},52 C${300 + sx * 46},70 ${300 + sx * 48},92 ${300 + sx * 56},108`, 'none', hp.line, 1.6, 'opacity=".3"') +
          `<path d="M${300 + sx * 62},44 q${sx * 8},6 ${sx * 7},20" fill="none" stroke="${hp.hi}" stroke-width="5" stroke-linecap="round" opacity=".55"/>`;
        o.back += ear(-1) + ear(1) + body(NAPE);
        o.top += U.bow(244, 118, 30, 18, tie, tl, { sw: 1.8 }) + U.bow(356, 118, 30, 18, tie, tl, { sw: 1.8 });
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
      case 'lowtwin': {
        const tail = 'M198,286 C160,298 138,380 133,470 C129,560 140,624 157,672 C172,640 186,590 197,520 C207,450 216,360 213,298Z';
        o.back += U.both(P(tail, hp.fill, hp.line, 2.5) + strand('M186,330 C162,400 154,520 160,640 M202,340 C192,430 182,540 172,640')) + body(NAPE);
        break;
      }
      case 'vshort':
        o.back += body(CAP + VS);
        break;
      case 'spiky': {
        const n = 9, pt = (a, rx, ry) => [300 + rx * Math.cos(a * Math.PI / 180), 238 + ry * Math.sin(a * Math.PI / 180)];
        const p0 = pt(172, 131, 153);
        let d = `M${f(p0[0])},${f(p0[1])}`;
        for (let i = 1; i <= n; i++) {
          const L = i % 2 ? 44 : 30, tip = pt(172 + 196 * (i - 0.5) / n + (i % 2 ? -6 : 6), 131 + L, 153 + L), b = pt(172 + 196 * i / n, 131, 153);
          d += `L${f(tip[0])},${f(tip[1])}L${f(b[0])},${f(b[1])}`;
        }
        o.back += body(d + ` C432,284 421,300 406,304 L194,304 C179,300 168,284 ${f(p0[0])},${f(p0[1])}Z`);
        break;
      }
      case 'mash':
        o.back += body(CAP + ' C430,292 432,322 416,338 C404,348 388,344 380,334 L220,334 C212,344 196,348 184,338 C168,322 170,292 178,255Z',
          strand('M192,300 C188,318 190,328 196,336 M408,300 C412,318 410,328 404,336'));
        break;
      case 'wolf':
        o.back += body(CAP + ' C426,296 430,326 444,352 L424,346 L430,378 L404,360 L400,392 L374,366 L226,366 L200,392 L196,360 L170,378 L176,346 L156,352 C170,326 174,296 178,255Z',
          strand('M196,320 C192,340 188,354 178,368 M404,320 C408,340 412,354 422,368'));
        break;
      case 'kuru': {
        const n = 10, pt = (a, rx, ry) => [300 + rx * Math.cos(a * Math.PI / 180), 240 + ry * Math.sin(a * Math.PI / 180)];
        const p0 = pt(170, 128, 150);
        let d = `M${f(p0[0])},${f(p0[1])}`, cur = '';
        for (let i = 1; i <= n; i++) {
          const q = pt(170 + 200 * (i - 0.5) / n, 154, 176), b = pt(170 + 200 * i / n, 128, 150);
          d += `Q${f(q[0])},${f(q[1])} ${f(b[0])},${f(b[1])}`;
        }
        d += ` Q446,290 430,308 Q438,332 414,338 Q402,352 384,340 L216,340 Q198,352 186,338 Q162,332 170,308 Q154,290 ${f(p0[0])},${f(p0[1])}Z`;
        [[184, 292], [416, 292], [196, 322], [404, 322]].forEach((p) => { cur += P(`M${p[0] - 8},${p[1] - 4} c4,-8 16,-6 16,2 c0,8 -12,9 -12,2`, 'none', hp.line, 1.8, 'opacity=".38"'); });
        o.back += body(d, cur);
        break;
      }
      case 'mohawk':
        o.back += P('M256,114 L250,70 L268,88 L274,44 L291,76 L302,30 L313,74 L328,44 L334,88 L350,68 L344,114Z', hp.fill, hp.line, 2.5) + body(CAP + VS);
        break;
      case 'chonmage':
        o.back += body(CAP + VS);
        o.top += P('M287,104 C281,84 285,58 300,50 C315,58 319,84 313,104Z', hp.fill, hp.line, 2.5) + P('M300,58 C297,72 297,88 299,100', 'none', hp.line, 1.6, 'opacity=".3"') +
          `<rect x="285" y="94" width="30" height="11" rx="5.5" fill="${tie}" stroke="${tl}" stroke-width="2"/>`;
        break;
      case 'chokon':
        o.back += P('M392,158 C420,134 458,150 460,188 C461,210 448,226 432,232 C438,210 428,190 402,184Z', hp.fill, hp.line, 2.5) + strand('M412,160 C436,160 448,180 446,206') + body(CAP + VS);
        o.top += `<ellipse cx="405" cy="171" rx="7.5" ry="13" transform="rotate(-30 405 171)" fill="${tie}" stroke="${tl}" stroke-width="2"/>`;
        break;
      case 'super': {
        const n = 7, pt = (a, rx, ry) => [300 + rx * Math.cos(a * Math.PI / 180), 220 + ry * Math.sin(a * Math.PI / 180)];
        const p0 = pt(190, 126, 138);
        let d = `M${f(p0[0])},${f(p0[1])}`;
        for (let i = 1; i <= n; i++) {
          const L = i % 2 ? 96 : 66, tip = pt(190 + 160 * (i - 0.5) / n, 126 + L, 138 + L), b = pt(190 + 160 * i / n, 126, 138);
          d += `L${f(tip[0])},${f(tip[1])}L${f(b[0])},${f(b[1])}`;
        }
        o.back += body(d + ` C432,252 424,290 406,304 L194,304 C176,290 168,252 ${f(p0[0])},${f(p0[1])}Z`,
          `<path d="M300,90 L300,10 M250,100 L210,30 M350,100 L390,30" fill="none" stroke="${hp.hi}" stroke-width="5" stroke-linecap="round" opacity=".45"/>`);
        break;
      }
      case 'negu':
        o.back += body(CAP + VS);
        o.top += P('M330,99 C340,72 366,62 384,74 C366,78 356,90 352,106Z', hp.fill, hp.line, 2.3) + P('M282,96 C274,76 282,58 298,54 C292,70 296,84 302,96Z', hp.fill, hp.line, 2.3) +
          P('M216,152 C194,144 182,122 190,102 C198,122 212,130 228,134Z', hp.fill, hp.line, 2.3) + P('M410,170 C430,166 446,150 446,130 C436,146 424,150 404,150Z', hp.fill, hp.line, 2.3);
        break;
      case 'ahoge':
        o.back += body(CAP + VS);
        o.top += P('M296,98 C288,62 308,36 338,40 C350,42 354,54 346,62 C340,50 322,50 316,62 C310,74 310,86 312,98Z', hp.fill, hp.line, 2.3);
        break;
      case 'afro': {
        const n = 16, cx = 300, cy = 200, rx = 152, ry = 138;
        let d = '';
        for (let i = 0; i <= n; i++) {
          const a = (i / n) * Math.PI * 2, p = [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
          if (!i) d += `M${f(p[0])},${f(p[1])}`;
          else { const am = ((i - 0.5) / n) * Math.PI * 2; d += `Q${f(cx + rx * 1.18 * Math.cos(am))},${f(cy + ry * 1.18 * Math.sin(am))} ${f(p[0])},${f(p[1])}`; }
        }
        let cur = '';
        [[190, 150], [240, 92], [360, 92], [410, 150], [176, 230], [424, 230], [200, 300], [400, 300]].forEach((p) => { cur += P(`M${p[0] - 9},${p[1] - 4} c4,-9 18,-7 18,2 c0,9 -13,10 -13,2`, 'none', hp.line, 1.8, 'opacity=".38"'); });
        o.back += body(d + 'Z', cur);
        break;
      }
      case 'bosa':
        o.back += body(CAP + ' C428,300 434,330 440,358' + U.zig(440, 358, 160, 358, 8, -20) + ' C166,330 172,300 178,255Z',
          strand('M196,300 C192,330 188,350 180,370 M404,300 C408,330 412,350 420,370'));
        break;
      case 'lion': {
        const n = 22, cx = 300, cy = 232;
        let d = '';
        for (let i = 0; i < n; i++) {
          const a = ((i / n) * 360 - 90) * Math.PI / 180, am = (((i + 0.5) / n) * 360 - 90) * Math.PI / 180;
          const p = [cx + 142 * Math.cos(a), cy + 150 * Math.sin(a)], t = [cx + 186 * Math.cos(am), cy + 194 * Math.sin(am)];
          d += `${i ? 'L' : 'M'}${f(p[0])},${f(p[1])}L${f(t[0])},${f(t[1])}`;
        }
        o.back += body(d + 'Z', strand('M190,170 L150,140 M410,170 L450,140 M180,300 L140,320 M420,300 L460,320'));
        break;
      }
      case 'musubi':
        o.back += body(NAPE);
        o.mid += hp.defs + P('M384,296 C412,322 422,372 414,422 C410,450 402,470 392,484 C392,454 390,424 384,396 C378,368 368,344 358,320Z', hp.fill, hp.line, 2.5) +
          strand('M392,330 C404,370 404,420 396,470') + `<rect x="376" y="318" width="30" height="12" rx="6" transform="rotate(40 391 324)" fill="${tie}" stroke="${tl}" stroke-width="2"/>`;
        break;
      case 'topbun':
        o.back += body(CAP + VS);
        o.top += `<circle cx="300" cy="74" r="30" fill="${hp.fill}" stroke="${hp.line}" stroke-width="2.5"/>` + strand('M280,72 C284,56 312,54 318,70 C322,84 304,92 296,82') +
          `<path d="M278,64 Q288,50 304,50" fill="none" stroke="${hp.hi}" stroke-width="5" stroke-linecap="round" opacity=".5"/>` +
          `<rect x="282" y="96" width="36" height="11" rx="5.5" fill="${tie}" stroke="${tl}" stroke-width="2"/>`;
        break;
      default: o.back += body(NAPE);
    }
    return o;
  };
})(window);
