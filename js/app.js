/* きらきら☆おしゃれスタジオ — ゲームほんたい */
(function () {
  'use strict';
  const A = window.Art, U = window.U, S = window.Sound;
  const $ = (s, r) => (r || document).querySelector(s);
  const SVGNS = 'http://www.w3.org/2000/svg';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[rnd(a.length)];
  const PHOTO_VB = [-30, 0, 660, 880];
  const APP_VERSION = '4.1.1'; /* こうしんの たびに あげる */
  const STORE = 'kirakira-oshare-studio-v1';
  const ALBUM_MAX = 30;

  const G = {
    st: clone(A.DEFAULT), other: clone(A.BOY_DEFAULT), hist: [], mode: 'free', theme: null, tab: 'make', sub: 'chara',
    album: [], rewards: [], best: {}, opt: { se: true, bgm: true }, photo: null, busy: false, house: null,
  };

  /* ================= カタログ ================= */
  const TABS = [
    { id: 'make', n: 'メイク', icon: '💄', subs: ['chara', 'skin', 'eye', 'lash', 'brow', 'shadow', 'cheek', 'lip', 'mouth', 'seal', 'nail'] },
    { id: 'hair', n: 'ヘア', icon: '🎀', subs: ['hairBack', 'hairFront'] },
    { id: 'wear', n: 'ふく', icon: '👗', subs: ['dress', 'top', 'bottom', 'socks', 'shoes'] },
    { id: 'acc', n: 'アクセ', icon: '👑', subs: ['head', 'glasses', 'ear', 'neck', 'hand', 'back', 'pet'] },
    { id: 'pose', n: 'ポーズ', icon: '💃', subs: ['pose', 'expr'] },
    { id: 'bg', n: 'はいけい', icon: '🌈', subs: ['bg', 'weather'] },
  ];
  const HB_TB = { long: [90, 70, 420, 520], bob: [130, 70, 340, 350], short: [130, 70, 340, 340], vshort: [140, 70, 320, 300], twin: [70, 70, 460, 500], pony: [110, 50, 400, 400],
    buns: [130, 50, 340, 350], wavy: [90, 70, 420, 540], braid: [110, 70, 380, 530], osage: [110, 70, 380, 470], side: [110, 70, 430, 500], hime: [70, 70, 460, 690], lowtwin: [90, 70, 420, 660], usabun: [130, 20, 340, 340], highpony: [140, 10, 340, 400], curl: [120, 70, 360, 360],
    spiky: [120, 10, 360, 360], mash: [130, 70, 340, 340], wolf: [120, 70, 360, 370], kuru: [120, 40, 360, 360], mohawk: [130, 10, 340, 340], chonmage: [130, 30, 340, 340], chokon: [130, 70, 360, 340],
    super: [80, -20, 440, 400], negu: [130, 30, 340, 340], ahoge: [130, 20, 340, 340], afro: [110, 30, 380, 380], bosa: [120, 70, 360, 360], lion: [80, 20, 440, 440], musubi: [130, 70, 360, 440], topbun: [130, 20, 340, 340] };
  const SCH = { list: A.SCHEMES, n: 'いろ', scheme: true };
  const SUBS = {
    chara: { n: 'キャラ', key: 'chara', items: [{ n: 'おんなのこ' }, { n: 'おとこのこ' }], kind: 'chara', zoom: 'full', fx: [300, 420, 240], say: 'だれを おしゃれに する？ ふくも かみがたも じゆうに えらべるよ' },
    skin: { n: 'はだ', key: 'skin', items: A.SKINS, kind: 'swatch', zoom: 'face', tool: 'puff', fx: [300, 262, 90], say: 'はだの いろを えらんでね' },
    eye: { n: 'め', key: 'eye', items: A.EYES, kind: 'face', tb: [208, 224, 84, 84], pal: { key: 'eyeColor', list: A.EYE_COLORS, n: 'めのいろ' }, zoom: 'face', fx: [300, 266, 80], say: 'どんな おめめに する？' },
    lash: { n: 'まつげ', key: 'lash', items: A.LASHES, kind: 'face', tb: [208, 224, 84, 84], zoom: 'face', tool: 'mascara', fx: [300, 252, 80], say: 'まつげで ぱっちり！' },
    brow: { n: 'まゆげ', key: 'brow', items: A.BROWS, kind: 'face', tb: [212, 188, 76, 76], zoom: 'face', tool: 'pencil', fx: [300, 222, 80], say: 'まゆげも かえられるよ' },
    shadow: { n: 'アイシャドウ', key: 'shadow', items: A.SHADOWS, kind: 'face', tb: [206, 218, 88, 88], pal: { key: 'shadowColor', list: A.SHADOW_COLORS, n: 'いろ', auto: 1 }, zoom: 'face', tool: 'tip', fx: [300, 244, 90], say: 'まぶたを キラキラに しよう！' },
    cheek: { n: 'チーク', key: 'cheek', items: A.CHEEKS, kind: 'face', tb: [192, 264, 80, 80], pal: { key: 'cheekColor', list: A.CHEEK_COLORS, n: 'いろ', auto: 1 }, zoom: 'face', tool: 'brush', fx: [300, 304, 100], say: 'ほっぺを ぽっと かわいく' },
    lip: { n: 'リップ', key: 'lip', items: A.LIPS, kind: 'lip', zoom: 'face', tool: 'lip', fx: [300, 320, 50], say: 'すきな いろの リップを ぬろう' },
    mouth: { n: 'くち', key: 'mouth', items: A.MOUTHS, kind: 'face', tb: [264, 288, 72, 72], zoom: 'face', fx: [300, 320, 50], say: 'おくちの かたちは どれに する？' },
    seal: { n: 'シール', key: 'seal', items: A.SEALS, kind: 'face', tb: [190, 216, 220, 150], zoom: 'face', fx: [300, 296, 110], say: 'かおに シールを はっちゃおう！' },
    nail: { n: 'ネイル', key: '_nail', items: null, kind: 'nail', zoom: 'hand', fx: [300, 550, 180], say: '💅 ネイルサロンで つめを かわいく しよう！' },
    hairBack: { n: 'かみがた', key: 'hairBack', items: A.HAIR_BACK, kind: 'hair', tbOf: (it) => HB_TB[it.id], pal: { key: 'hairColor', list: A.HAIR_COLORS, n: 'かみのいろ' }, zoom: 'hair', fx: [300, 200, 150], say: 'どんな かみがたに する？' },
    hairFront: { n: 'まえがみ', key: 'hairFront', items: A.HAIR_FRONT, kind: 'hair', tbOf: (it) => (it.id === 'up' ? [150, 36, 300, 300] : [150, 70, 300, 300]), pal: { key: 'hairColor', list: A.HAIR_COLORS, n: 'かみのいろ' }, zoom: 'head', fx: [300, 170, 120], say: 'まえがみを えらぼう' },
    dress: { n: 'ドレス・セット', key: 'dress', items: A.DRESSES, kind: 'wear', pal: Object.assign({ key: 'dressC' }, SCH), zoom: 'full', fx: [300, 500, 150], say: 'ドレスも かっこいい ふくも いっぱい！' },
    top: { n: 'トップス', key: 'top', items: A.TOPS, kind: 'wear', pal: Object.assign({ key: 'topC' }, SCH), zoom: 'full', fx: [300, 430, 110], say: 'うえに きる ふくを えらぼう' },
    bottom: { n: 'ボトムス', key: 'bottom', items: A.BOTTOMS, kind: 'wear', pal: Object.assign({ key: 'bottomC' }, SCH), zoom: 'full', fx: [300, 540, 120], say: 'スカート？ それとも ズボン？' },
    socks: { n: 'くつした', key: 'socks', items: A.SOCKS, kind: 'wear', pal: Object.assign({ key: 'socksC' }, SCH), zoom: 'legs', fx: [300, 680, 90], say: 'くつしたも おしゃれに！' },
    shoes: { n: 'くつ', key: 'shoes', items: A.SHOES, kind: 'wear', pal: Object.assign({ key: 'shoesC' }, SCH), zoom: 'legs', fx: [300, 755, 90], say: 'どの くつを はこうかな？' },
    head: { n: 'あたま', key: 'head', items: A.HEADS, kind: 'acc', pal: Object.assign({ key: 'headC' }, SCH), zoom: 'head', fx: [300, 110, 130], say: 'あたまに なにを つける？' },
    glasses: { n: 'めがね', key: 'glasses', items: A.GLASSES, kind: 'acc', zoom: 'face', fx: [300, 266, 100], say: 'めがねで へんしん！' },
    ear: { n: 'みみ', key: 'ear', items: A.EARS, kind: 'acc', zoom: 'face', fx: [300, 296, 130], say: 'イヤリングが キラリ！' },
    neck: { n: 'くび', key: 'neck', items: A.NECKS, kind: 'acc', zoom: 'neck', fx: [300, 388, 70], say: 'くびかざりを つけよう' },
    hand: { n: 'て', key: 'hand', items: A.HANDS, kind: 'acc', zoom: 'full', fx: [300, 500, 200], say: 'てに なにを もつ？' },
    back: { n: 'せなか', key: 'back', items: A.BACKS, kind: 'acc', zoom: 'full', fx: [300, 430, 220], say: 'せなかに はねを つけちゃう？' },
    pet: { n: 'おとも', key: 'pet', items: A.PETS, kind: 'acc', zoom: 'full', fx: [500, 720, 70], say: 'おともだちを つれて いこう！' },
    pose: { n: 'ポーズ', key: 'pose', items: A.POSES, kind: 'pose', zoom: 'full', fx: [300, 400, 220], say: 'すきな ポーズを えらんでね！' },
    expr: { n: 'ひょうじょう', key: 'expr', items: A.EXPRS, kind: 'expr', zoom: 'face', fx: [300, 270, 120], say: 'いまの きもちは どれかな？' },
    bg: { n: 'ばしょ', key: 'bg', items: A.BGS, kind: 'bg', zoom: 'full', say: 'どこに おでかけ する？' },
    weather: { n: 'てんき', key: 'weather', items: A.WEATHERS, kind: 'weather', zoom: 'full', say: 'そらから なにを ふらせる？' },
  };
  const THEMES = [
    { id: 'princess', n: 'おひめさま', icon: '👑', msg: 'おしろの パーティーに いくの！ おひめさまみたいに してね', hint: 'ドレスや ティアラが にあうよ' },
    { id: 'idol', n: 'アイドル', icon: '🎤', msg: 'きょうは ライブの ひ！ キラキラの アイドルに なりたいな', hint: 'マイクや ステージを さがしてみよう' },
    { id: 'fairy', n: 'ようせい', icon: '🧚', msg: 'おはなばたけで あそぶ ようせいさんに なりたい！', hint: 'はねや おはなが にあうよ' },
    { id: 'magic', n: 'まほうつかい', icon: '🔮', msg: 'まほうの がっこうに いくよ！ まほうつかいに してね', hint: 'ぼうしや ステッキを さがしてみよう' },
    { id: 'matsuri', n: 'おまつり', icon: '🏮', msg: 'なつまつりに いくの！ ゆかたで おしゃれ したいな', hint: 'ゆかたや うちわが にあうよ' },
    { id: 'beach', n: 'うみ', icon: '🏖️', msg: 'うみに あそびに いくよ！ なつの おしゃれを おねがい', hint: 'サンダルや ぼうしを さがしてみよう' },
    { id: 'cool', n: 'かっこいい', icon: '😎', msg: 'きょうは かっこよく きめたい きぶん！', hint: 'サングラスや ブーツが にあうよ' },
    { id: 'neko', n: 'ねこちゃん', icon: '🐱', msg: 'ねこちゃんに へんしん したいにゃ！', hint: 'ねこみみや おひげを さがしてにゃ' },
    { id: 'yume', n: 'ゆめかわ', icon: '🦄', msg: 'ふわふわ ゆめかわいい コーデに して ほしいな', hint: 'ユニコーンや リボンが にあうよ' },
    { id: 'winter', n: 'ゆきのひ', icon: '⛄', msg: 'ゆきの ひの おでかけ。 あったかく してね', hint: 'マフラーや ブーツで ぽかぽかに' },
    { id: 'ballet', n: 'バレリーナ', icon: '🩰', msg: 'バレエの はっぴょうかい！ バレリーナに してね', hint: 'チュチュや トウシューズが にあうよ' },
    { id: 'school', n: 'がっこう', icon: '🎒', msg: 'きょうは がっこうの ひ！ げんきな コーデに してね', hint: 'セーラーや スカートを さがしてみよう' },
    { id: 'casual', n: 'おでかけ', icon: '🎈', msg: 'おともだちと あそびに いくよ！ うごきやすい ふくが いいな', hint: 'Tシャツや スニーカーが にあうよ' },
  ];
  THEMES.push(
    { id: 'doctor', n: 'おいしゃさん', icon: '🩺', msg: 'みんなを げんきに する おいしゃさんごっこ しよう！', hint: 'ナースふくや ちょうしんきが にあうよ' },
    { id: 'space', n: 'うちゅうひこうし', icon: '🚀', msg: 'ロケットで うちゅうへ しゅっぱつ！ ほしみたいに キラキラに してね', hint: 'うちゅうの はいけいや ほしめを さがしてみよう' },
    { id: 'sweets', n: 'おかしやさん', icon: '🧁', msg: 'きょうは おかしやさんの おみせばん！ あまくて かわいい コーデに してね', hint: 'ケーキやさんや メイドふくが にあうよ' },
  );
  /* ほかの アイテムにも あたらしい おだいの タグを つける */
  [[['space'], [[A.GLASSES, 'star'], [A.EARS, 'star'], [A.NECKS, 'star'], [A.SHOES, 'boots'], [A.HEADS, 'pins'], [A.PETS, 'babydragon'], [A.HANDS, 'wand']]],
    [['doctor'], [[A.SHOES, 'strap'], [A.SOCKS, 'high'], [A.HANDS, 'bag'], [A.PETS, 'bear'], [A.BGS, 'room'], [A.EARS, 'heart']]],
    [['sweets'], [[A.SHOES, 'ribbon'], [A.SOCKS, 'frill'], [A.NECKS, 'heart'], [A.PETS, 'hamster'], [A.BACKS, 'bow']]],
  ].forEach(([tag, list]) => list.forEach(([arr, id]) => { const it = arr.find((x) => x.id === id); if (it) it.tags = (it.tags || []).concat(tag); }));
  /* め・シールにも おだいの タグ */
  (A.EYES.find((e) => e.id === 'star') || {}).tags = ['space', 'magic'];
  (A.EYES.find((e) => e.id === 'heart') || {}).tags = ['idol', 'yume', 'sweets'];

  THEMES.push(
    { id: 'halloween', n: 'ハロウィン', icon: '🎃', msg: 'トリック・オア・トリート！ ハロウィンの かそうを しよう！', hint: 'かぼちゃや おばけちゃんが にあうよ' },
    { id: 'xmas', n: 'クリスマス', icon: '🎄', msg: 'メリークリスマス！ サンタさんみたいに おしゃれ しよう！', hint: 'サンタぼうしや ツリーの はいけいが にあうよ' },
  );
  THEMES.push(
    { id: 'prince', n: 'おうじさま', icon: '🤴', msg: 'おしろの ぶとうかいに いくよ！ おうじさまみたいに きめてね', hint: 'おうじさまの ふくや おうかんが にあうよ' },
    { id: 'ninja', n: 'にんじゃ', icon: '🥷', msg: 'しのびの しゅぎょうに しゅっぱつ！ にんじゃに へんしん でござる', hint: 'にんじゃの ふくや しゅりけんを さがしてみよう' },
    { id: 'sports', n: 'スポーツ', icon: '⚽', msg: 'きょうは サッカーの しあい！ うごきやすい かっこうで がんばろう', hint: 'ユニフォームや スパイクが にあうよ' },
    { id: 'hero', n: 'ヒーロー', icon: '🦸', msg: 'まちの へいわを まもる ヒーローに へんしん！', hint: 'ヒーロースーツや マントが にあうよ' },
    { id: 'pirate', n: 'かいぞく', icon: '🏴‍☠️', msg: 'たからじまを めざして しゅっこうだ！ かいぞくに なろう', hint: 'かいぞくぼうしや がんたいを さがしてみよう' },
    { id: 'dino', n: 'きょうりゅう', icon: '🦖', msg: 'きょうりゅうの もりを たんけんするよ！ じゅんびは いい？', hint: 'たんけんの ふくや きょうりゅうの おともが にあうよ' },
  );
  [[['prince'], [[A.HEADS, 'crown'], [A.BACKS, 'cape'], [A.BGS, 'castle'], [A.SHOES, 'boots'], [A.SOCKS, 'high'], [A.EARS, 'star'], [A.PETS, 'unicorn']]],
    [['ninja'], [[A.BGS, 'night'], [A.SOCKS, 'tights'], [A.EARS, 'hoop'], [A.PETS, 'cat']]],
    [['sports'], [[A.TOPS, 'jersey'], [A.TOPS, 'tee'], [A.BOTTOMS, 'shorts'], [A.SHOES, 'sneaker'], [A.HEADS, 'band'], [A.PETS, 'dog'], [A.EARS, 'star'], [A.BACKS, 'bearpack']]],
    [['hero'], [[A.BACKS, 'cape'], [A.SHOES, 'boots'], [A.BGS, 'night'], [A.HANDS, 'wand'], [A.EARS, 'star'], [A.SOCKS, 'stripe']]],
    [['pirate'], [[A.EARS, 'hoop'], [A.BGS, 'beach'], [A.SHOES, 'boots'], [A.SOCKS, 'stripe'], [A.BACKS, 'cape']]],
    [['dino'], [[A.PETS, 'babydragon'], [A.BACKS, 'dragon'], [A.HEADS, 'straw'], [A.BGS, 'flower'], [A.SHOES, 'boots'], [A.SOCKS, 'high'], [A.NECKS, 'clover'], [A.EARS, 'flower']]],
  ].forEach(([tag, list]) => list.forEach(([arr, id]) => { const it = arr.find((x) => x.id === id); if (it) it.tags = (it.tags || []).concat(tag); }));

  /* いまの きせつ（10がつ＝ハロウィン、11がつ15にち〜12がつ＝クリスマス） */
  const SEASON = (() => { const d = new Date(), m = d.getMonth() + 1; return m === 10 ? 'halloween' : (m === 12 || (m === 11 && d.getDate() >= 15)) ? 'xmas' : null; })();
  const SEASON_MARK = { halloween: '🎃', xmas: '🎄' };
  [[A.HEADS, 'witch', 'halloween'], [A.BACKS, 'bat', 'halloween'], [A.BACKS, 'cape', 'halloween'], [A.PETS, 'cat', 'halloween'], [A.HANDS, 'wand', 'halloween'],
    [A.NECKS, 'scarf', 'xmas'], [A.EARS, 'star', 'xmas'], [A.SHOES, 'boots', 'xmas'], [A.HEADS, 'muff', 'xmas'], [A.PETS, 'penguin', 'xmas'], [A.BGS, 'snow', 'xmas']]
    .forEach(([arr, id, tag]) => { const it = arr.find((x) => x.id === id); if (it) it.tags = (it.tags || []).concat(tag); });

  /* ネイルの セット（さいしょは サロン、つぎは けす） */
  const NS = (c, p, s) => ({ c, p: p || 0, s: s || 0 });
  const NAIL_SETS = [
    { n: 'ネイルサロン', salon: true },
    { n: 'なし', nails: [] },
    { n: 'ピンクラメ', nails: [0, 1, 2, 3, 4].map((i) => NS(0, 6, i === 2 ? 1 : 0)) },
    { n: 'ゆめかわ', nails: [NS(0), NS(9), NS(7), NS(5), NS(4)].map((n, i) => Object.assign(n, { s: i % 2 ? 6 : 0 })) },
    { n: 'いちご', nails: [0, 1, 2, 3, 4].map((i) => NS(1, i === 2 ? 5 : 3, i === 3 ? 2 : 0)) },
    { n: 'フレンチ', nails: [0, 1, 2, 3, 4].map((i) => NS(0, 2, i === 2 ? 6 : 0)) },
    { n: 'ほしぞら', nails: [0, 1, 2, 3, 4].map((i) => NS(i % 2 ? 10 : 8, 1, i === 1 || i === 3 ? 3 : 0)) },
    { n: 'にじいろ', nails: [1, 3, 4, 6, 8].map((c, i) => NS(c, 0, i === 2 ? 5 : 0)) },
    { n: 'キラキラ', nails: [0, 1, 2, 3, 4].map((i) => NS(15, 6, i === 2 ? 3 : 0)) },
    { n: 'リボン', nails: [0, 1, 2, 3, 4].map((i) => NS(i % 2 ? 11 : 0, i % 2 ? 3 : 0, i === 2 ? 4 : 0)) },
  ];
  SUBS.nail.items = NAIL_SETS;

  const PRAISE = ['かわいい！', 'かっこいい！', 'すてき！', 'にあってる！', 'おしゃれ！', 'キラキラだね！', 'いいね！', 'さいこう！', 'わあ、きれい！'];
  const GIGGLE = ['えへへ', 'うふふ', 'ありがとう！', 'たのしいね！', 'だいすき！'];
  const tabOf = (id) => TABS.find((t) => t.id === id);
  const NOACC = { head: 0, glasses: 0, ear: 0, neck: 0, hand: 0, back: 0, pet: 0 };

  /* ================= ほぞん ================= */
  /* ふたりの キャラ：G.st が いま あそんでいる こ、G.other が もうひとり */
  const normSt = (st) => { const o = Object.assign(clone(A.defaultOf(st && st.chara)), st || {}); o.chara = (o.chara | 0) === 1 ? 1 : 0; return o; };
  const stOf = (ch) => ((G.st.chara | 0) === ch ? G.st : G.other);
  function fixPair() {
    G.st = normSt(G.st);
    G.other = G.other && ((G.other.chara | 0) === 1 ? 1 : 0) !== G.st.chara ? normSt(G.other) : clone(A.defaultOf(1 - G.st.chara));
  }
  const saveData = () => ({ st: G.st, st2: G.other, album: G.album, rewards: G.rewards, best: G.best, opt: G.opt, house: G.house });
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(saveData())); } catch (e) { /* ほぞんできなくても あそべる */ }
  }
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (d) {
        if (d.st) G.st = d.st;
        if (d.st2) G.other = d.st2;
        if (Array.isArray(d.album)) G.album = d.album;
        if (Array.isArray(d.rewards)) G.rewards = d.rewards;
        if (d.best) G.best = d.best;
        if (d.opt) G.opt = Object.assign(G.opt, d.opt);
        if (d.house) G.house = d.house;
      }
    } catch (e) { /* こわれていたら さいしょから */ }
    fixPair();
  }

  /* ---------- セーブデータの かきだし・よみこみ ---------- */
  function exportSave() {
    const d = new Date(), z = (n) => String(n).padStart(2, '0');
    const body = JSON.stringify({ app: 'kirakira-oshare-studio', v: 1, date: d.toISOString(), data: saveData() });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'application/json' }));
    a.download = `oshare_save_${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    S.play('save'); toast('セーブデータを かきだしたよ！');
  }
  function parseSave(text) {
    const j = JSON.parse(text);
    if (!j || j.app !== 'kirakira-oshare-studio' || !j.data || typeof j.data.st !== 'object' || !j.data.st) throw new Error('bad save');
    return j.data;
  }
  function applySave(d) {
    G.st = d.st; G.other = d.st2 || null; fixPair();
    G.house = d.house && typeof d.house === 'object' ? d.house : null; HS.ensure();
    G.album = Array.isArray(d.album) ? d.album.filter((p) => p && (p.state || p.room)).slice(0, ALBUM_MAX) : [];
    G.rewards = Array.isArray(d.rewards) ? d.rewards : [];
    G.best = d.best && typeof d.best === 'object' ? d.best : {};
    if (d.opt) { G.opt = Object.assign(G.opt, d.opt); S.setBgm(!!G.opt.bgm); S.setSe(!!G.opt.se); }
    G.hist = []; save();
  }
  function importSave(file) {
    const rd = new FileReader();
    rd.onerror = () => toast('よみこめなかったよ');
    rd.onload = () => {
      let d;
      try { d = parseSave(rd.result); } catch (e) { toast('この ファイルは つかえないよ'); return; }
      modal(`<div class="ic">📂</div><h3>セーブデータを よみこむ？</h3><p>いまの コーデ・おへや・アルバムは<br>よみこんだ データに かわるよ</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">よみこむ</button></div>`, {
        no: closeModal,
        yes: () => { applySave(d); closeModal(); renderTitle(); S.play('fanfare'); toast('よみこんだよ！'); },
      });
    };
    rd.readAsText(file);
  }
  function saveMenu() {
    modal(`<div class="ic">💾</div><h3>セーブデータ</h3><p>コーデ・おへや・アルバム・おだいの きろくを<br>ファイルに して のこせるよ</p><div class="row"><button class="mid-btn mint" data-act="ex">📤 かきだす</button><button class="mid-btn purple" data-act="im">📂 よみこむ</button></div><div class="row"><button class="mid-btn gray" data-act="no">とじる</button></div>`, {
      no: closeModal, ex: () => { closeModal(); exportSave(); }, im: () => { closeModal(); $('#saveFile').click(); },
    });
  }

  /* ================= 画面きりかえ ================= */
  function show(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('on', s.id === 'scr-' + name));
    G.screen = name;
    if (name === 'title') renderTitle();
    if (name === 'themes') renderThemes();
    if (name === 'album') renderAlbum();
    if (name === 'photo') { renderPhoto(); renderPhotoTools(); }
    if (name === 'house') HS.enter();
  }
  let toastT;
  function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 2200); }
  function modal(html, handlers) {
    const m = $('#modal');
    m.innerHTML = `<div class="dlg">${html}</div>`; m.classList.add('on');
    m.onclick = (e) => { const b = e.target.closest('[data-act]'); if (!b) return; S.play('tap'); const fn = handlers && handlers[b.dataset.act]; if (fn) fn(b); };
  }
  function closeModal() { const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; m.onclick = null; }
  function confetti(n) {
    const box = $('#confetti'), cols = ['#ff7fb2', '#ffd95a', '#8ed4ff', '#b392f5', '#8de8cc', '#ffffff'];
    for (let i = 0; i < n; i++) {
      const e = document.createElement('i');
      e.style.left = Math.random() * 100 + '%'; e.style.background = pick(cols);
      e.style.animationDuration = 1.6 + Math.random() * 1.6 + 's'; e.style.animationDelay = Math.random() * 0.5 + 's';
      e.style.transform = `rotate(${rnd(360)}deg)`; if (i % 3 === 0) e.style.borderRadius = '50%';
      box.appendChild(e); setTimeout(() => e.remove(), 3800);
    }
  }
  function flash() { const f = $('#flash'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }

  /* ================= タイトル ================= */
  function renderTitle() {
    /* ふたり ならんで おでむかえ（てまえが いま あそんでいる こ。タッチで こうたい） */
    const o = { live: !CALM };
    $('#titleChara').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-70 20 760 790">` +
      `<g transform="translate(250,40) scale(.86) translate(-70,0)">${A.floorShadow()}${A.character(Object.assign({}, G.other, { pet: 0 }), o)}</g>` +
      `<g transform="translate(-60,0)">${A.floorShadow()}${A.character(G.st, o)}</g></svg>`;
    syncOpts();
  }
  function makeFloaties() {
    const box = $('#floaties'), ch = ['♥', '★', '✦', '♪', '✿', '♥', '★'], cols = ['#ff9ec6', '#ffd95a', '#ffffff', '#b392f5', '#8ed4ff', '#ffb3d1'];
    let h = '';
    for (let i = 0; i < 26; i++) h += `<i style="left:${rnd(100)}%;font-size:${14 + rnd(34)}px;color:${cols[i % cols.length]};animation-duration:${9 + rnd(12)}s;animation-delay:-${rnd(20)}s">${ch[i % ch.length]}</i>`;
    box.innerHTML = h;
  }
  function syncOpts() {
    ['#optBgm', '#stBgm', '#hBgm'].forEach((s) => $(s).classList.toggle('off', !G.opt.bgm));
    ['#optSe', '#stSe', '#hSe'].forEach((s) => $(s).classList.toggle('off', !G.opt.se));
  }
  function toggleBgm() { G.opt.bgm = !G.opt.bgm; S.setBgm(G.opt.bgm); syncOpts(); save(); }
  function toggleSe() { G.opt.se = !G.opt.se; S.setSe(G.opt.se); if (G.opt.se) S.play('tap'); syncOpts(); save(); }

  /* ================= スタジオ：えがく ================= */
  const svgWrap = (vb, inner, par) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" preserveAspectRatio="${par || 'xMidYMid meet'}">${inner}</svg>`;
  const CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let avT;
  function renderChara() { $('#chara').innerHTML = A.character(G.st, { live: !CALM }); renderWx(); clearTimeout(avT); avT = setTimeout(renderAvatars, 350); }
  /* キャラきりかえボタンの かお */
  function renderAvatars() {
    [0, 1].forEach((ch) => {
      const e = $('#av' + ch); if (!e) return;
      e.innerHTML = svgWrap([172, 66, 256, 300], A.character(Object.assign({}, stOf(ch), { pose: 0, pet: 0, hand: 0, back: 0, expr: 0 })), 'xMidYMid slice');
      e.classList.toggle('on', (G.st.chara | 0) === ch);
    });
  }
  function switchChara(quiet) {
    const t = G.st; G.st = G.other; G.other = t; G.hist = [];
    save();
    if (G.screen !== 'studio') return;
    renderBg(); renderChara(); renderItems(false); renderPal(); renderAvatars();
    if (!quiet) { S.play('fanfare'); bounce(); burst(300, 420, 300, 22); say((G.st.chara | 0) === 1 ? 'おとこのこに チェンジ！' : 'おんなのこに チェンジ！', 1800); }
  }
  let wxNow = -1;
  function renderWx() { const w = G.st.weather | 0; if (w === wxNow) return; wxNow = w; $('#wxL').innerHTML = A.weather(w, !CALM); }
  /* ときどき ひとりで にこっ・ウインク */
  function idleLoop() {
    setTimeout(() => {
      if (G.screen === 'studio' && !G.busy && !(G.st.expr | 0) && !$('#modal').classList.contains('on')) {
        const snap = JSON.stringify(G.st), e = pick(['smile', 'wink', 'love', 'shy']);
        $('#chara').innerHTML = A.character(Object.assign({}, G.st, { expr: A.EXPRS.findIndex((x) => x.id === e) }), { live: !CALM });
        setTimeout(() => { if (G.screen === 'studio' && JSON.stringify(G.st) === snap) renderChara(); }, 1500);
      }
      idleLoop();
    }, 7000 + Math.random() * 6000);
  }
  function renderBg() { $('#bgL').innerHTML = A.bg(G.st.bg | 0); }
  /* カメラ：みせたい はんい（キャラ座標の箱）を、ボタンに かくれない ところへ じどうで おさめる */
  const ZOOMS = { hand: [140, 440, 460, 640], full: [60, 28, 560, 792], face: [168, 96, 432, 372], head: [140, 30, 460, 420], hair: [84, 50, 516, 650], neck: [185, 250, 415, 500], legs: [165, 540, 435, 800] };
  let zoomName = 'full';
  function setZoom(name) {
    zoomName = ZOOMS[name] ? name : 'full';
    const box = ZOOMS[zoomName], st = $('#stage').getBoundingClientRect();
    if (!st.width || !st.height) return;
    const k = Math.min(st.width / 600, st.height / 800), visW = st.width / k, visH = st.height / k;
    const bar = $('.stage-btns').getBoundingClientRect();
    const resB = bar.height ? (st.bottom - bar.top + 6) / k : 0, resT = 6 / k;
    const ax0 = 300 - visW / 2 + 6, ax1 = 300 + visW / 2 - 6, ay0 = 420 - visH / 2 + resT, ay1 = 420 + visH / 2 - resB;
    const s = Math.min((ax1 - ax0) / (box[2] - box[0]), (ay1 - ay0) / (box[3] - box[1]), 2.4);
    const tx = (ax0 + ax1) / 2 - ((box[0] + box[2]) / 2) * s, ty = (ay0 + ay1) / 2 - ((box[1] + box[3]) / 2) * s;
    $('#cam').style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})`;
  }
  window.addEventListener('resize', () => { if (G.screen === 'studio') setZoom(zoomName); });

  function thumb(subId, i) {
    const sub = SUBS[subId], it = sub.items[i];
    if (it.n === 'なし' && sub.kind !== 'pose' && sub.kind !== 'expr') return '<span class="none-ic"></span>';
    const st = Object.assign({}, G.st, { [sub.key]: i });
    switch (sub.kind) {
      case 'chara': return svgWrap([60, 30, 480, 760], A.character(Object.assign({}, stOf(i), { pet: 0 })));
      case 'swatch': return `<span class="sw" style="background:${it.c}"></span>`;
      case 'lip': return svgWrap([-26, -14, 52, 90], A.tool('lip', it.c || it.g[1], 0) + (it.g ? (() => { const id = U.uid('tl'); return `<defs>${U.lin(id, it.g.map((x) => [x]), 0, 0, 1, 0)}</defs><path d="M-6,3 L-6,20 L6,20 L6,-5Z" fill="url(#${id})"/>`; })() : '') + (it.lame ? U.sparkle(-1, 8, 4, '#fff') + U.sparkle(2, 15, 2.5, '#fff') : '') + (it.clear ? `<path d="M-3,1 L-3,17" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>` : '') + (it.glitter ? U.sparkle(12, -4, 7, '#ffe680') + U.sparkle(-13, 8, 4.5, '#ffe680') : ''));
      case 'face': return svgWrap(sub.tb, A.head(st) + A.face(st) + (subId === 'brow' ? A.brows(st) : ''));
      case 'hair': {
        const hb = A.hairBack(st, '#ff6fa5');
        return svgWrap(sub.tbOf ? sub.tbOf(it) : sub.tb, hb.back + A.mannequin() + hb.mid + A.head(st) + A.face(st) + A.hairFront(st) + A.brows(st) + hb.top);
      }
      case 'wear': {
        const r = it.draw(A.scheme(G.st[sub.pal.key] | 0));
        return svgWrap(it.tb, (typeof r === 'string' ? '' : r.back || '') + A.mannequin() + (typeof r === 'string' ? r : (r.main || '') + (r.over || '')));
      }
      case 'acc': {
        const ac = A.accParts(Object.assign({}, NOACC, { skin: G.st.skin, headC: G.st.headC, [sub.key]: i }));
        const base = sub.key === 'glasses' || sub.key === 'ear' ? A.head(G.st) + A.face(G.st) : sub.key === 'pet' ? '' : A.mannequin();
        return svgWrap(it.tb, ac.back + ac.headBack + base + ac.neck + ac.hand + ac.glasses + ac.ear + ac.head + ac.pet);
      }
      case 'bg': return svgWrap([0, 20, 600, 800], A.bg(i), 'xMidYMid slice');
      case 'weather': { const id = U.uid('ws'); return svgWrap([-30, 0, 660, 880], `<defs>${U.lin(id, [['#7fa8e0'], ['#cfe0ff']])}</defs><rect x="-30" y="0" width="660" height="880" fill="url(#${id})"/>` + A.weather(i, false), 'xMidYMid slice'); }
      case 'nail': {
        if (it.salon) return '<span style="font-size:clamp(34px,6vmin,52px);line-height:1">💅</span>';
        return svgWrap([-6, -40, 172, 80], it.nails.map((n, k) => `<g transform="translate(${k * 32 + 16},${k === 0 ? 8 : k === 2 ? -4 : 0})">${A.nailArt(n, 26, 34)}</g>`).join(''));
      }
      case 'pose': return svgWrap([60, 30, 480, 760], A.character(Object.assign({}, G.st, { pose: i, pet: 0 })));
      case 'expr': return svgWrap([186, 150, 228, 228], A.character(Object.assign({}, G.st, { expr: i, glasses: 0 })));
    }
    return '';
  }
  const isOn = (subId, i) => {
    const sub = SUBS[subId];
    if (subId === 'nail') { const it = sub.items[i]; return !!it.nails && JSON.stringify(it.nails) === JSON.stringify(G.st.nails || []); }
    if (subId === 'top' || subId === 'bottom') return (G.st.dress | 0) === 0 && (G.st[sub.key] | 0) === i;
    return (G.st[sub.key] | 0) === i;
  };
  const isRec = (it) => G.mode === 'challenge' && G.theme && it.tags && it.tags.indexOf(G.theme.id) >= 0;
  const isSeason = (it) => G.mode !== 'challenge' && SEASON && it.tags && it.tags.indexOf(SEASON) >= 0;

  function renderTabs() {
    $('#tabs').innerHTML = TABS.map((t) => `<button class="tab${t.id === G.tab ? ' on' : ''}" data-tab="${t.id}"><span class="ti">${t.icon}</span><span class="tn">${t.n}</span></button>`).join('');
  }
  function renderSubs() {
    const t = tabOf(G.tab);
    $('#subs').innerHTML = t.subs.map((id) => {
      const rec = G.mode === 'challenge' && SUBS[id].items.some(isRec);
      return `<button class="sub${id === G.sub ? ' on' : ''}" data-sub="${id}">${SUBS[id].n}${rec ? ' ✨' : ''}</button>`;
    }).join('');
    const on = $('#subs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function renderItems(anim) {
    const sub = SUBS[G.sub], box = $('#items');
    box.innerHTML = sub.items.map((it, i) =>
      `<button class="item${isOn(G.sub, i) ? ' on' : ''}" data-i="${i}" style="${anim ? `animation-delay:${Math.min(i, 14) * 22}ms` : 'animation:none'}"><span class="th">${thumb(G.sub, i)}</span><span class="nm">${it.n}</span>${isRec(it) ? '<span class="rec">✨</span>' : isSeason(it) ? `<span class="rec season">${SEASON_MARK[SEASON]}</span>` : ''}</button>`).join('');
    if (anim) box.scrollTop = 0;
  }
  function markItems() { document.querySelectorAll('#items .item').forEach((b) => b.classList.toggle('on', isOn(G.sub, +b.dataset.i))); }
  const chipBg = (c, scheme) => {
    if (scheme) return c.g ? `linear-gradient(135deg, ${c.g.join(',')})` : `linear-gradient(135deg, ${c.m} 0 60%, ${c.a} 60%)`;
    return c.g ? `linear-gradient(135deg, ${c.g.join(',')})` : c.c;
  };
  function renderPal() {
    const sub = SUBS[G.sub], box = $('#pal');
    if (!sub.pal) { box.classList.remove('on'); box.innerHTML = ''; return; }
    const cur = G.st[sub.pal.key] | 0;
    box.classList.add('on');
    box.classList.toggle('dim', G.sub === 'dress' && (G.st.dress | 0) === 0);
    box.innerHTML = `<span class="pl">${sub.pal.n}</span><div class="pc">` + sub.pal.list.map((c, i) => `<button class="chip${i === cur ? ' on' : ''}" data-c="${i}" style="background:${chipBg(c, sub.pal.scheme)}" aria-label="${c.n}"></button>`).join('') + '</div>';
    const on = $('#pal .on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function renderPanel(anim) { renderTabs(); renderSubs(); renderItems(anim); renderPal(); }
  function renderStudio() { renderBg(); $('#shadowL').innerHTML = A.floorShadow(); renderChara(); renderPanel(true); setZoom(SUBS[G.sub].zoom); }

  /* ================= えんしゅつ ================= */
  let bubT;
  function say(text, ms) {
    const b = $('#bubble'); b.textContent = text; b.classList.add('on');
    clearTimeout(bubT); if (ms !== 0) bubT = setTimeout(() => b.classList.remove('on'), ms || 3400);
  }
  function burst(x, y, spread, n, hearts) {
    const fx = $('#fx'), cols = ['#ffffff', '#fff3a8', '#ffe27a', '#ffd0e4'];
    for (let i = 0; i < n; i++) {
      const p = document.createElementNS(SVGNS, 'path'), r = 5 + Math.random() * 9, hrt = hearts || Math.random() < 0.22;
      p.setAttribute('d', hrt ? U.heartPath(0, 0, r * 0.75) : U.sparklePath(0, 0, r));
      p.setAttribute('fill', hrt ? pick(['#ff7fb2', '#ff9ec6', '#ff5c93']) : pick(cols));
      p.setAttribute('stroke', hrt ? '#fff' : '#ffc93c'); p.setAttribute('stroke-width', hrt ? '1.5' : '0.8');
      const a = Math.random() * Math.PI * 2, d = spread * (0.45 + Math.random() * 0.75);
      const x0 = x + (Math.random() - 0.5) * spread * 0.7, y0 = y + (Math.random() - 0.5) * spread * 0.5;
      const dx = Math.cos(a) * d, dy = Math.sin(a) * d - spread * 0.25, rot = (Math.random() - 0.5) * 240;
      fx.appendChild(p);
      const an = p.animate([
        { transform: `translate(${x0}px,${y0}px) scale(0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x0 + dx * 0.65}px,${y0 + dy * 0.65}px) scale(1.25) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x0 + dx}px,${y0 + dy}px) scale(0) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: 650 + Math.random() * 500, easing: 'ease-out', fill: 'forwards' });
      an.onfinish = () => p.remove();
    }
  }
  const TOOLP = {
    lip: [[282, 317], [300, 324], [318, 317]], brush: [[222, 310], [242, 298], [226, 304], [364, 310], [378, 298], [366, 304]],
    tip: [[226, 246], [270, 238], [330, 238], [374, 246]], mascara: [[224, 248], [264, 240], [336, 240], [376, 248]],
    pencil: [[228, 222], [270, 216], [330, 216], [372, 222]], puff: [[236, 236], [300, 306], [364, 240], [300, 190], [246, 290]],
  };
  function toolColor(sub) {
    const st = G.st;
    if (sub.key === 'lip') { const l = A.LIPS[st.lip] || {}; return l.c || (l.g && l.g[1]) || '#ffb3c8'; }
    if (sub.key === 'cheek') return (A.CHEEK_COLORS[st.cheekColor] || A.CHEEK_COLORS[0]).c;
    if (sub.key === 'shadow') { const c = A.SHADOW_COLORS[st.shadowColor] || A.SHADOW_COLORS[0]; return c.c || c.g[0]; }
    if (sub.key === 'skin') return U.light((A.SKINS[st.skin] || A.SKINS[1]).c, 0.3);
    if (sub.key === 'brow') return '#b5784a';
    return '#ff7fab';
  }
  function toolAnim(kind, color) {
    const pts = TOOLP[kind]; if (!pts) return;
    const g = document.createElementNS(SVGNS, 'g');
    g.innerHTML = A.tool(kind, color);
    $('#fx').appendChild(g);
    const tr = (p) => `translate(${p[0]}px,${p[1]}px)`, first = pts[0], last = pts[pts.length - 1];
    const kf = [{ transform: tr([first[0] + 46, first[1] + 60]), opacity: 0 }].concat(pts.map((p) => ({ transform: tr(p), opacity: 1 })), [{ transform: tr([last[0] + 46, last[1] + 60]), opacity: 0 }]);
    const an = g.animate(kf, { duration: 300 + pts.length * 130, easing: 'ease-in-out', fill: 'forwards' });
    an.onfinish = () => g.remove();
    S.play('swish');
  }
  function bounce() {
    $('#chara').animate([{ transform: 'scale(1,1)' }, { transform: 'scale(1.045,.955)' }, { transform: 'scale(.975,1.035)' }, { transform: 'scale(1,1)' }], { duration: 360, easing: 'ease-out' });
  }
  let praiseN = 0;
  function react(sub, isColor) {
    bounce();
    if (sub.fx) burst(sub.fx[0], sub.fx[1], sub.fx[2] || 80, isColor ? 6 : 10);
    if (sub.tool) toolAnim(sub.tool, toolColor(sub));
    if (++praiseN % 4 === 0) say(pick(PRAISE), 1600);
  }
  function blinkLoop() {
    setTimeout(() => {
      const e = $('#chara .eyes');
      if (e && G.screen === 'studio') { e.classList.add('blink'); setTimeout(() => e.classList.remove('blink'), 130); }
      blinkLoop();
    }, 2200 + Math.random() * 3200);
  }

  /* ================= そうさ ================= */
  function pushHist() { G.hist.push(JSON.stringify(G.st)); if (G.hist.length > 40) G.hist.shift(); }
  function change(patch, sub, isColor) {
    pushHist();
    Object.assign(G.st, patch);
    renderChara();
    if (patch.bg != null) { renderBg(); flashBg(); }
    if (isColor) { renderItems(false); renderPal(); } else { markItems(); renderPal(); }
    save();
    S.play(isColor ? 'color' : 'pick');
    react(sub, isColor);
  }
  function flashBg() { $('#bgL').animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' }); burst(300, 420, 320, 14); }
  function chooseItem(i) {
    if (G.sub === 'chara') { if (i !== (G.st.chara | 0)) switchChara(); else { S.play('tap'); bounce(); } return; }
    if (G.sub === 'nail') { const it = NAIL_SETS[i]; if (it.salon) { S.play('open'); openNail(); } else change({ nails: clone(it.nails) }, SUBS.nail, false); return; }
    const sub = SUBS[G.sub], patch = { [sub.key]: i };
    if (G.sub === 'top' || G.sub === 'bottom') patch.dress = 0;
    if (['eye', 'mouth', 'brow', 'cheek'].indexOf(G.sub) >= 0 && (G.st.expr | 0)) patch.expr = 0;
    change(patch, sub, false);
    if (G.sub === 'pose' || G.sub === 'expr') { const n = SUBS[G.sub].items[i].n; if (i) say(n + '！', 1400); }
  }
  function chooseColor(i) {
    const sub = SUBS[G.sub], patch = { [sub.pal.key]: i };
    if (sub.pal.auto && !(G.st[sub.key] | 0)) patch[sub.key] = 1;
    change(patch, sub, true);
  }
  function setTab(id) {
    if (G.tab === id) return;
    G.tab = id; G.sub = tabOf(id).subs[0];
    S.play('tab'); renderPanel(true); setZoom(SUBS[G.sub].zoom); say(SUBS[G.sub].say);
  }
  function setSub(id) {
    if (G.sub === id) return;
    G.sub = id; S.play('tap'); renderSubs(); renderItems(true); renderPal(); setZoom(SUBS[id].zoom); say(SUBS[id].say);
  }
  function undo() {
    if (!G.hist.length) { say('もどせるのは ここまでだよ', 1800); S.play('tap'); return; }
    G.st = JSON.parse(G.hist.pop()); S.play('undo');
    renderBg(); renderChara(); renderItems(false); renderPal(); save();
  }
  function reset() {
    modal(`<div class="ic">🧹</div><h3>さいしょから やりなおす？</h3><p>いまの コーデが きえちゃうよ</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">やりなおす</button></div>`, {
      no: closeModal,
      yes: () => { closeModal(); pushHist(); G.st = Object.assign(clone(A.defaultOf(G.st.chara)), { skin: G.st.skin }); renderBg(); renderChara(); renderItems(false); renderPal(); save(); burst(300, 420, 260, 16); },
    });
  }

  /* ---------- おまかせ ---------- */
  function randomState(themeId) {
    const st = clone(G.st), boy = (st.chara | 0) === 1;
    const rp = (list, from, pNone) => {
      if (pNone && Math.random() < pNone) return 0;
      const idx = []; for (let i = from; i < list.length; i++) idx.push(i);
      if (themeId && Math.random() < 0.75) { const m = idx.filter((i) => list[i].tags && list[i].tags.indexOf(themeId) >= 0); if (m.length) return pick(m); }
      /* どれでも えらべるけれど、おとこのこは おとこのこっぽい もの・おんなのこは おんなのこっぽい ものが すこし でやすい */
      if (Math.random() < 0.68) { const m = idx.filter((i) => !!list[i].b === boy); if (m.length) return pick(m); }
      return pick(idx);
    };
    const nS = A.SCHEMES.length;
    st.eye = Math.random() < 0.7 ? rnd(4) : rnd(A.EYES.length); st.eyeColor = rnd(A.EYE_COLORS.length); st.lash = boy && Math.random() < 0.7 ? 0 : 1 + rnd(3); st.brow = Math.random() < 0.6 ? 0 : rnd(A.BROWS.length);
    st.shadow = Math.random() < (boy ? 0.88 : 0.5) ? 0 : 1 + rnd(4); st.shadowColor = rnd(A.SHADOW_COLORS.length);
    st.cheek = Math.random() < 0.15 ? 0 : 1 + rnd(6); st.cheekColor = rnd(A.CHEEK_COLORS.length);
    st.lip = Math.random() < (boy ? 0.85 : 0.25) ? 0 : 1 + rnd(A.LIPS.length - 1); st.mouth = Math.random() < 0.6 ? rnd(2) : rnd(A.MOUTHS.length);
    st.seal = rp(A.SEALS, 1, 0.65);
    st.hairBack = rp(A.HAIR_BACK, 0); st.hairFront = rp(A.HAIR_FRONT, 0); st.hairColor = rnd(A.HAIR_COLORS.length);
    const wantDress = themeId ? (A.DRESSES.some((d) => d.tags && d.tags.indexOf(themeId) >= 0) ? Math.random() < 0.75 : false) : Math.random() < (boy ? 0.45 : 0.62);
    st.dress = wantDress ? rp(A.DRESSES, 1) : 0; st.dressC = rnd(nS);
    st.top = rp(A.TOPS, 0); st.topC = rnd(nS); st.bottom = rp(A.BOTTOMS, 0); st.bottomC = rnd(nS);
    st.socks = rp(A.SOCKS, 1, 0.3); st.socksC = Math.random() < 0.5 ? 6 : rnd(nS);
    st.shoes = rp(A.SHOES, 1, 0.04); st.shoesC = rnd(nS);
    st.head = rp(A.HEADS, 1, 0.35); st.headC = Math.random() < 0.5 ? st.dressC : rnd(nS);
    st.glasses = rp(A.GLASSES, 1, 0.85); st.ear = rp(A.EARS, 1, 0.5); st.neck = rp(A.NECKS, 1, 0.5);
    st.hand = rp(A.HANDS, 1, 0.5); st.back = rp(A.BACKS, 1, 0.7); st.pet = rp(A.PETS, 1, 0.5);
    st.bg = rp(A.BGS, 0);
    st.weather = Math.random() < 0.7 ? 0 : rnd(A.WEATHERS.length);
    st.pose = Math.random() < 0.45 ? 0 : rnd(A.POSES.length); st.expr = Math.random() < 0.7 ? 0 : rnd(A.EXPRS.length);
    return st;
  }
  function shuffle() {
    if (G.busy) return; G.busy = true;
    pushHist(); setZoom('full');
    let k = 0;
    const tm = setInterval(() => {
      G.st = randomState(G.mode === 'challenge' && G.theme ? G.theme.id : null);
      renderChara(); renderBg(); S.play('tick');
      if (++k >= 8) {
        clearInterval(tm); G.busy = false;
        renderItems(false); renderPal(); save(); S.play('fanfare'); bounce(); burst(300, 420, 300, 26); say('じゃーん！ ' + pick(PRAISE), 2200);
        setTimeout(() => setZoom(SUBS[G.sub].zoom), 1300);
      }
    }, 100);
  }

  /* ================= おだいチャレンジ ================= */
  function score(st, id) {
    const has = (it) => !!(it && it.tags && it.tags.indexOf(id) >= 0), any = (list) => list.some(has);
    let n = 0, max = 0;
    if (any(A.DRESSES) || any(A.TOPS) || any(A.BOTTOMS)) {
      max += 2;
      if ((st.dress | 0) > 0) { if (has(A.DRESSES[st.dress])) n += 2; } else n += (has(A.TOPS[st.top | 0]) ? 1 : 0) + (has(A.BOTTOMS[st.bottom | 0]) ? 1 : 0);
    }
    [['socks', A.SOCKS], ['shoes', A.SHOES], ['head', A.HEADS], ['glasses', A.GLASSES], ['ear', A.EARS], ['neck', A.NECKS], ['hand', A.HANDS], ['back', A.BACKS], ['pet', A.PETS], ['bg', A.BGS], ['seal', A.SEALS]]
      .forEach((p) => { if (any(p[1])) { max++; if (has(p[1][st[p[0]] | 0])) n++; } });
    return { n, max };
  }
  const starStr = (n) => '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i>';
  function renderThemes() {
    const cleared = THEMES.filter((t) => G.best[t.id]).length;
    $('#themeCount').textContent = `${cleared} / ${THEMES.length}`;
    const list = SEASON ? THEMES.filter((t) => t.id === SEASON).concat(THEMES.filter((t) => t.id !== SEASON)) : THEMES;
    $('#themeGrid').innerHTML = list.map((t, i) => {
      const b = G.best[t.id] | 0;
      return `<button class="theme-card${b ? ' clear' : ''}${t.id === SEASON ? ' season' : ''}" data-theme="${t.id}" style="animation-delay:${i * 35}ms">${t.id === SEASON ? '<span class="season-tag">いまの きせつ！</span>' : ''}<span class="ic">${t.icon}</span><span class="nm">${t.n}</span>` +
        (b ? `<span class="st">${starStr(b)}</span>` : '<span class="st"><span class="new">あたらしい</span></span>') + '</button>';
    }).join('');
  }
  function introTheme(id) {
    const t = THEMES.find((x) => x.id === id); if (!t) return;
    S.play('open');
    modal(`<div class="ic">${t.icon}</div><h3>おだい：${t.n}</h3><div class="msc">${A.mascot('happy')}</div><p class="say">${t.msg}</p><p style="font-size:.85em;color:#a8799a">✨の マークが ヒントだよ</p>` +
      `<div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="go">スタート！</button></div>`, {
      no: closeModal, go: () => { closeModal(); enterStudio('challenge', t); },
    });
  }
  function finishChallenge() {
    const t = G.theme, sc = score(G.st, t.id), ratio = sc.max ? sc.n / sc.max : 0;
    const stars = ratio >= 0.6 ? 5 : ratio >= 0.3 ? 4 : 3;
    const first = G.rewards.indexOf(t.id) < 0;
    if (stars > (G.best[t.id] | 0)) G.best[t.id] = stars;
    if (first) G.rewards.push(t.id);
    save(); setZoom('full');
    const msg = stars === 5 ? 'パーフェクト！ さいこうに すてき！' : stars === 4 ? 'とっても すてき！ にあってるよ！' : 'かわいい！ いい かんじ！';
    const rw = A.STAMPS.find((s) => s.reward === t.id);
    let h = `<h3>${t.icon} できたね！</h3><div class="res-chara">${A.svg(G.st, { vb: [40, 20, 520, 790] })}</div>`;
    h += `<div class="stars">${'<span>★</span>'.repeat(5)}</div><p class="say">${msg}</p>`;
    if (stars < 5) h += `<p style="font-size:.85em;color:#a8799a">ヒント：${t.hint}</p>`;
    if (first && rw) h += `<div class="reward">${A.stampSvg(rw.id)}<span>あたらしい スタンプ<br>「${rw.n}」を ゲット！</span></div>`;
    h += `<div class="row"><button class="mid-btn yellow" data-act="show">🌟 ドレスアップ・ショー</button></div>`;
    h += `<div class="row"><button class="mid-btn gray" data-act="more">もうすこし なおす</button><button class="mid-btn pink" data-act="photo">📷 しゃしんを とる</button><button class="mid-btn purple" data-act="next">べつの おだい</button></div>`;
    modal(h, {
      more: closeModal,
      show: () => { closeModal(); startShow(); },
      photo: () => { closeModal(); takePhoto(); },
      next: () => { closeModal(); show('themes'); },
    });
    const sp = document.querySelectorAll('#modal .stars span');
    for (let i = 0; i < stars; i++) setTimeout(() => { if (sp[i] && sp[i].isConnected) { sp[i].classList.add('on'); S.play('star', i); } }, 450 + i * 300);
    setTimeout(() => { if ($('#modal').classList.contains('on')) { S.play('fanfare'); confetti(stars * 14); } }, 450 + stars * 300 + 150);
  }

  function enterStudio(mode, theme) {
    G.mode = mode; G.theme = theme || null; G.hist = [];
    $('#scr-studio').classList.toggle('challenge', mode === 'challenge');
    const bn = $('#themeBanner');
    if (mode === 'challenge') { bn.innerHTML = `おだい <b>${theme.icon} ${theme.n}</b>`; bn.classList.add('on'); G.tab = 'wear'; G.sub = 'dress'; }
    else bn.classList.remove('on');
    G.fromHouse = false;
    show('studio'); renderStudio(); renderAvatars();
    $('#mascot').innerHTML = A.mascot();
    setTimeout(() => say(mode === 'challenge' ? theme.msg : 'すきな ものを えらんで、かわいく かっこよく へんしん させてね！', mode === 'challenge' ? 6000 : 4200), 400);
  }

  /* ================= ネイルサロン ================= */
  const NL = { work: [], mode: 'all', sel: 2 };
  const nailSvg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700">${inner}</svg>`;
  function openNail() {
    NL.work = Array.from({ length: 5 }, (_, i) => (G.st.nails && G.st.nails[i]) ? clone(G.st.nails[i]) : null);
    NL.mode = 'all'; NL.sel = 2;
    show('nail'); renderNail(); renderNailTools();
  }
  function renderNail() { $('#nailHand').innerHTML = nailSvg(A.bigHand(G.st, NL.work, NL.mode === 'one' ? NL.sel : -1) + '<g id="nailFx"></g>'); }
  function curNail() { return NL.work[NL.mode === 'one' ? NL.sel : 2] || NL.work.find(Boolean) || null; }
  function renderNailTools() {
    const cur = curNail();
    document.querySelectorAll('#nailMode button').forEach((b) => b.classList.toggle('on', b.dataset.m === NL.mode));
    $('#nailTip').textContent = NL.mode === 'all' ? 'いろを えらぶと ぜんぶの つめに ぬれるよ' : 'つめを タッチして えらんでから ぬってね';
    $('#nailColors').innerHTML = A.NAIL_COLORS.map((c, i) => `<button class="chip${cur && (cur.c | 0) === i ? ' on' : ''}" data-nc="${i}" style="background:${c.g ? `linear-gradient(135deg, ${c.g.join(',')})` : c.c}" aria-label="${c.n}"></button>`).join('');
    const sample = (n) => `<svg viewBox="-20 -28 40 56">${A.nailArt(n, 26, 36)}</svg>`;
    const bc = cur ? cur.c | 0 : 0;
    $('#nailPats').innerHTML = A.NAIL_PATS.map((p, i) => `<button class="nopt${cur && (cur.p | 0) === i ? ' on' : ''}" data-np="${i}">${sample({ c: bc, p: i, s: 0 })}<span>${p.n}</span></button>`).join('');
    $('#nailStks').innerHTML = A.NAIL_STKS.map((p, i) => `<button class="nopt${(cur ? cur.s | 0 : 0) === i ? ' on' : ''}" data-ns="${i}">${sample({ c: bc, p: 0, s: i })}<span>${p.n}</span></button>`).join('');
  }
  function nailTargets() { return NL.mode === 'all' ? [0, 1, 2, 3, 4] : [NL.sel]; }
  function nailEdit(fn, sound) {
    const ts = nailTargets();
    ts.forEach((i) => { const n = NL.work[i] || { c: 0, p: 0, s: 0 }; fn(n); NL.work[i] = n; });
    renderNail(); renderNailTools(); S.play(sound || 'color');
    ts.forEach((i) => { const g = A.FINGERS[i]; nailSparkle(g.x2, g.y2); });
  }
  function nailSparkle(x, y) {
    const fx = $('#nailFx'); if (!fx) return;
    for (let k = 0; k < 6; k++) {
      const p = document.createElementNS(SVGNS, 'path'); p.setAttribute('d', U.sparklePath(0, 0, 8 + Math.random() * 8)); p.setAttribute('fill', pick(['#fff', '#fff3a8', '#ffd0e4']));
      fx.appendChild(p);
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 40;
      const an = p.animate([{ transform: `translate(${x}px,${y}px) scale(0)` }, { transform: `translate(${x + Math.cos(a) * d}px,${y + Math.sin(a) * d}px) scale(1.2)`, offset: 0.5 }, { transform: `translate(${x + Math.cos(a) * d * 1.3}px,${y + Math.sin(a) * d * 1.3}px) scale(0)` }], { duration: 700, easing: 'ease-out' });
      an.onfinish = () => p.remove();
    }
  }
  function nailDone() {
    const ns = NL.work.map((n) => n || null);
    pushHist(); G.st.nails = ns.some(Boolean) ? ns : []; save();
    S.play('fanfare'); confetti(30);
    show('studio'); renderChara(); renderItems(false); setZoom('hand'); burst(300, 550, 200, 16);
    setTimeout(() => say('ネイル かわいい！ キラキラだね！', 2200), 300);
  }

  /* ================= ドレスアップ・ショー ================= */
  let showTimers = [], showAnims = [];
  const later = (ms, fn) => { showTimers.push(setTimeout(fn, ms)); };
  let showToken = 0;
  function stopShow(keepMute) {
    showToken++;
    S.stopFiles(350);
    if (!keepMute) S.muteBgm(false);
    showTimers.forEach(clearTimeout); showTimers = [];
    showAnims.forEach((a) => { try { a.cancel(); } catch (e) { /* */ } }); showAnims = [];
    $('#showFx').innerHTML = '';
  }
  const anim = (el, kf, o) => { const a = el.animate(kf, o); showAnims.push(a); return a; };
  function showLines(st) {
    const L = [];
    if ((st.dress | 0) > 0) L.push(`${A.DRESSES[st.dress].n}が とっても にあってる！`);
    else L.push(`${(A.TOPS[st.top | 0] || {}).n}と ${(A.BOTTOMS[st.bottom | 0] || {}).n}、すてきな くみあわせ！`);
    if ((st.head | 0) > 0) L.push(`${A.HEADS[st.head].n}が キラッと ひかってる！`);
    else if ((st.hairBack | 0) >= 0) L.push(`${A.HAIR_BACK[st.hairBack | 0].n}の かみがたも かわいい！`);
    if ((st.pet | 0) > 0) L.push(`${A.PETS[st.pet].n}も いっしょに ランウェイ！`);
    L.push(pick(['きょういちばんの スターだね！', 'かいじょうが おおもりあがり！', 'みんな めろめろだよ！', 'さいこうの ショーだった！']));
    return L;
  }
  function crowd() {
    let s = '';
    const r = U.rng(7), cols = ['#ff7fb2', '#ffe680', '#8ed4ff', '#c4a7ff', '#8de8cc'];
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 17; i++) {
        const x = -360 + i * 82 + (row ? 40 : 0) + (r() - 0.5) * 16, y = row ? 900 : 860;
        if (!row && x > 175 && x < 425) continue;
        const c = row ? '#1b0f33' : '#2b1a4c';
        if (r() < 0.55) {
          const sc = cols[(i + row) % cols.length], hx = x + 22, hy = y - 46;
          s += `<g><line x1="${hx}" y1="${hy}" x2="${hx + 10}" y2="${hy - 70}" stroke="${sc}" stroke-width="16" stroke-linecap="round" opacity=".35"/>` +
            `<line x1="${hx}" y1="${hy}" x2="${hx + 10}" y2="${hy - 70}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` +
            `<line x1="${hx}" y1="${hy}" x2="${hx + 10}" y2="${hy - 70}" stroke="${sc}" stroke-width="3.5" stroke-linecap="round"/>` +
            `<animateTransform attributeName="transform" type="rotate" values="-14 ${hx} ${hy};14 ${hx} ${hy};-14 ${hx} ${hy}" dur="${(1 + r() * 0.5).toFixed(2)}s" begin="-${(r()).toFixed(2)}s" repeatCount="indefinite"/></g>`;
        }
        s += `<ellipse cx="${x.toFixed(1)}" cy="${y}" rx="44" ry="34" fill="${c}"/><circle cx="${x.toFixed(1)}" cy="${y - 50}" r="27" fill="${c}"/>` +
          `<path d="M${(x - 20).toFixed(1)},${y - 70} q20,-14 40,0" fill="none" stroke="#6a4a9a" stroke-width="3" opacity=".6"/>`;
      }
    }
    return s;
  }
  function crowdHeart() {
    const fx = $('#showFx'), p = document.createElementNS(SVGNS, 'path');
    const x = -300 + Math.random() * 1200, sz = 9 + Math.random() * 12;
    p.setAttribute('d', U.heartPath(0, 0, sz)); p.setAttribute('fill', pick(['#ff7fb2', '#ff9ec6', '#ffd0e4', '#ff5c93', '#c4a7ff']));
    p.setAttribute('stroke', '#fff'); p.setAttribute('stroke-width', '2'); fx.appendChild(p);
    const a = anim(p, [{ transform: `translate(${x}px,860px) scale(.3)`, opacity: 0 }, { transform: `translate(${x + 20}px,700px) scale(1)`, opacity: 1, offset: 0.2 },
      { transform: `translate(${x - 25}px,450px) scale(1.1)`, opacity: 0.9, offset: 0.65 }, { transform: `translate(${x + 15}px,260px) scale(.9)`, opacity: 0 }], { duration: 2200 + Math.random() * 1200, easing: 'ease-out', fill: 'forwards' });
    a.onfinish = () => p.remove();
  }
  function crowdFlash() {
    const fx = $('#showFx'), g = document.createElementNS(SVGNS, 'g');
    let x = -330 + Math.random() * 1160; if (x > 180 && x < 420) x += 260;
    g.innerHTML = `<circle r="26" fill="#fff" opacity=".55"/>` + U.sparkle(0, 0, 22, '#ffffff');
    fx.appendChild(g);
    const a = anim(g, [{ transform: `translate(${x}px,${780 + Math.random() * 60}px) scale(0)`, opacity: 1 }, { transform: `translate(${x}px,${780}px) scale(1.2)`, opacity: 1, offset: 0.3 },
      { transform: `translate(${x}px,${780}px) scale(0)`, opacity: 0 }], { duration: 420, fill: 'forwards' });
    a.onfinish = () => g.remove();
  }
  function startShow() {
    stopShow(true);
    S.muteBgm(true);
    const tk = showToken;
    if (G.screen !== 'show') G.showFrom = G.screen;
    const st = clone(G.st), stageI = Math.max(0, A.BGS.findIndex((b) => b.id === 'stage'));
    G.showState = st;
    show('show');
    const sid = U.uid('sp');
    $('#showBg').innerHTML = A.bg(stageI);
    $('#showRunway').innerHTML = `<path d="M210,700 L390,700 L520,900 L80,900Z" fill="#ffd6ec" opacity=".18"/>` +
      [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${210 - i * 22}" cy="${700 + i * 36}" r="5" fill="#fff3a8"/><circle cx="${390 + i * 22}" cy="${700 + i * 36}" r="5" fill="#fff3a8"/>`).join('');
    $('#showSpot').innerHTML = `<defs>${U.lin(sid, [['#ffffff', 0, 0.02], ['#fff6d0', 1, 0.42]])}</defs><path d="M270,-60 L330,-60 L440,780 L160,780Z" fill="url(#${sid})" opacity="0"/>` +
      `<ellipse cx="300" cy="776" rx="150" ry="26" fill="#fff6d0" opacity="0"/>`;
    $('#showShadow').innerHTML = A.floorShadow();
    $('#showTurn').innerHTML = A.character(st, { live: true });
    $('#showCrowd').innerHTML = crowd();
    ['#showTitle', '#showMsg', '#showBtns'].forEach((q) => $(q).classList.remove('on'));
    $('#showDark').setAttribute('opacity', '.85');
    $('#showWalk').style.transform = 'translate(-640px,0)';
    /* おと：ドラムロール → ジャジャーン → かんせいと はくしゅ（おわりを まって つなぐ） */
    const drum = S.playFile('drumroll', 0.9);
    later(150, () => $('#showTitle').classList.add('on'));
    const WALK = 3100, T0 = 1300, STEPS = 7;
    let turned = false, clapped = false;
    later(T0, () => {
      anim($('#showDark'), [{ opacity: 0.85 }, { opacity: 0.4 }], { duration: 700, fill: 'forwards' });
      $('#showSpot').querySelectorAll('path,ellipse').forEach((e) => anim(e, [{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' }));
      anim($('#showWalk'), [{ transform: 'translate(-640px,0)' }, { transform: 'translate(0,0)' }], { duration: WALK, easing: 'cubic-bezier(.25,.55,.35,1)', fill: 'forwards' });
      anim($('#showStep'), [{ transform: 'translate(0,0) rotate(0deg)' }, { transform: 'translate(0,-14px) rotate(-1.2deg)', offset: 0.5 }, { transform: 'translate(0,0) rotate(0deg)' }],
        { duration: WALK / STEPS, iterations: STEPS, easing: 'ease-in-out' });
      for (let i = 0; i < STEPS; i++) later(i * (WALK / STEPS) + 200, () => S.play('tick'));
    });
    const doTurn = () => {
      if (turned || tk !== showToken) return; turned = true;
      $('#showTitle').classList.remove('on');
      anim($('#showTurn'), [{ transform: 'translate(0,0) scale(1,1)' }, { transform: 'translate(600px,0) scale(-1,1)', offset: 0.5 }, { transform: 'translate(0,0) scale(1,1)' }], { duration: 900, easing: 'ease-in-out' });
      const jj = S.playFile('jajan', 0.95);
      later(450, () => burstShow(300, 420, 300, 30));
      if (jj) { jj.onended = doClap; jj.__fail = () => later(600, doClap); later(2600, doClap); } else later(1100, doClap);
    };
    /* ドラムロールが おわったら ターン（あるきおわる まえには ならない） */
    if (drum) { drum.onended = () => { if (tk !== showToken) return; later(Math.max(0, T0 + WALK - 4400), doTurn); }; drum.__fail = () => later(T0 + WALK, doTurn); later(T0 + WALK + 1200, doTurn); }
    else later(T0 + WALK, doTurn);
    const lines = showLines(st);
    function doClap() {
      if (clapped || tk !== showToken) return; clapped = true;
      S.playFile('cheer', 0.9); confetti(60);
      if (!(st.pose | 0)) $('#showTurn').innerHTML = A.character(Object.assign({}, st, { pose: A.POSES.findIndex((p) => p.id === 'kira'), expr: (st.expr | 0) || 1 }), { live: true });
      for (let i = 0; i < 36; i++) later(i * 90, crowdHeart);
      for (let i = 0; i < 14; i++) later(i * 230 + Math.random() * 120, crowdFlash);
      lines.forEach((l, i) => later(i * 1500, () => {
        const m = $('#showMsg'); m.classList.remove('on'); void m.offsetWidth; m.textContent = l; m.classList.add('on');
      }));
      later(lines.length * 1500 - 600, () => { $('#showBtns').classList.add('on'); });
      later(lines.length * 1500 + 300, () => { for (let i = 0; i < 20; i++) later(i * 140, crowdHeart); });
    }
  }
  function burstShow(x, y, spread, n) {
    const fx = $('#showFx');
    for (let i = 0; i < n; i++) {
      const p = document.createElementNS(SVGNS, 'path'), r = 6 + Math.random() * 12, hrt = Math.random() < 0.3;
      p.setAttribute('d', hrt ? U.heartPath(0, 0, r * 0.8) : U.sparklePath(0, 0, r));
      p.setAttribute('fill', hrt ? pick(['#ff7fb2', '#ff9ec6']) : pick(['#ffffff', '#fff3a8', '#ffe27a']));
      fx.appendChild(p);
      const a = Math.random() * Math.PI * 2, d = spread * (0.4 + Math.random() * 0.8);
      const an = anim(p, [{ transform: `translate(${x}px,${y}px) scale(0)`, opacity: 1 }, { transform: `translate(${x + Math.cos(a) * d * 0.7}px,${y + Math.sin(a) * d * 0.7}px) scale(1.3)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x + Math.cos(a) * d}px,${y + Math.sin(a) * d}px) scale(0)`, opacity: 0 }], { duration: 900 + Math.random() * 600, easing: 'ease-out', fill: 'forwards' });
      an.onfinish = () => p.remove();
    }
  }
  function leaveShow() {
    stopShow();
    if (G.showFrom === 'studio') { show('studio'); setZoom(SUBS[G.sub].zoom); } else show('title');
  }

  /* ================= しゃしん ================= */
  const isRoom = (p) => !!(p && p.kind === 'room');
  const photoVB = (p) => (isRoom(p) ? A.ROOM_PHOTO_VB : PHOTO_VB);
  function photoSvg(p, o) {
    const opt = Object.assign({ vb: photoVB(p), frame: p.frame, stamps: p.stamps, date: p.id }, o || {});
    return isRoom(p) ? A.roomSvg(p.room, { sts: p.sts }, opt) : A.svg(p.state, opt);
  }
  const newPhoto = (extra) => Object.assign({ id: Date.now(), frame: 1, stamps: [], sel: 'heart', size: G.stampSize || 'm' }, extra);
  function takePhoto() {
    if (G.busy) return; G.busy = true;
    setZoom('full'); say('はい、チーズ！', 1500); S.play('pop');
    setTimeout(() => {
      flash(); S.play('shutter'); bounce();
      setTimeout(() => {
        G.busy = false;
        G.photo = newPhoto({ state: clone(G.st) });
        show('photo');
      }, 420);
    }, 750);
  }
  function renderPhoto() {
    const p = G.photo; if (!p) return;
    const c = $('#photoCard'); c.classList.toggle('wide', isRoom(p)); c.innerHTML = photoSvg(p);
  }
  const stampLocked = (s) => s.reward && G.rewards.indexOf(s.reward) < 0;
  function renderPhotoTools() {
    const p = G.photo; if (!p) return;
    const vb = photoVB(p), cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
    $('#frameRow').classList.toggle('wide', isRoom(p));
    $('#frameRow').innerHTML = A.FRAMES.map((f, i) => `<button class="fr${i === p.frame ? ' on' : ''}" data-f="${i}" aria-label="${f.n}">` +
      svgWrap(vb, `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#fff3f8"/>` + (i ? A.frame(i, vb) : `<text x="${cx}" y="${cy + 50}" text-anchor="middle" font-size="150" fill="#d9bfd0">なし</text>`)) + '</button>').join('');
    document.querySelectorAll('#stampSize [data-z]').forEach((b) => b.classList.toggle('on', b.dataset.z === (p.size || 'm')));
    $('#stampGrid').innerHTML = A.STAMPS.map((s) => `<button class="stp${s.id === p.sel ? ' on' : ''}${stampLocked(s) ? ' lock' : ''}" data-s="${s.id}" aria-label="${s.n}">${A.stampSvg(s.id)}</button>`).join('');
    $('#btnPhotoBack').textContent = isRoom(p) ? '🏠 おへやに もどる' : '👗 つづきを あそぶ';
  }
  function addStamp(e) {
    const p = G.photo, svg = $('#photoCard svg'); if (!p || !svg) return;
    const r = svg.getBoundingClientRect(), vb = photoVB(p);
    const x = vb[0] + ((e.clientX - r.left) / r.width) * vb[2], y = vb[1] + ((e.clientY - r.top) / r.height) * vb[3];
    if (p.stamps.length >= 60) { toast('スタンプが いっぱいだよ'); return; }
    const base = { s: 0.7, m: 1.2, l: 1.9 }[p.size || 'm'] * (vb[2] / PHOTO_VB[2]);
    p.stamps.push({ id: p.sel, x: Math.round(x), y: Math.round(y), s: +(base * (0.92 + Math.random() * 0.16)).toFixed(2), r: Math.round((Math.random() - 0.5) * 36) });
    p.dirty = true; renderPhoto(); S.play('stamp');
  }
  function saveAlbum() {
    const p = G.photo, rec = isRoom(p) ? { id: p.id, kind: 'room', room: p.room, sts: p.sts, frame: p.frame, stamps: p.stamps } : { id: p.id, state: p.state, frame: p.frame, stamps: p.stamps };
    const i = G.album.findIndex((a) => a.id === p.id);
    if (i >= 0) G.album[i] = rec;
    else {
      if (G.album.length >= ALBUM_MAX) { toast('アルバムが いっぱい！ ふるい しゃしんを けしてね'); return; }
      G.album.unshift(rec);
    }
    save(); S.play('save'); confetti(36); toast('アルバムに いれたよ！');
  }
  function savePng(ph) {
    const vb = photoVB(ph), W = isRoom(ph) ? 1200 : 990, H = Math.round(W * vb[3] / vb[2]);
    const svg = photoSvg(ph, { w: W });
    const img = new Image();
    img.onload = () => {
      try {
        const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
        cv.getContext('2d').drawImage(img, 0, 0, W, H);
        cv.toBlob((b) => {
          if (!b) { toast('ほぞん できなかったよ'); return; }
          const d = new Date(), z = (n) => String(n).padStart(2, '0');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(b); a.download = `oshare_${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}_${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}.png`;
          document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
          S.play('save'); toast('がぞうを ほぞんしたよ！');
        }, 'image/png');
      } catch (err) { toast('ほぞん できなかったよ'); }
    };
    img.onerror = () => toast('ほぞん できなかったよ');
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  /* アルバムの コーデを きる（しゃしんの キャラに あわせて こうたい） */
  function wearState(src) {
    const st = normSt(clone(src));
    if (st.chara !== (G.st.chara | 0)) { const t = G.st; G.st = G.other; G.other = t; }
    G.st = st; save();
  }

  /* ================= アルバム ================= */
  function renderAlbum() {
    $('#albumCount').textContent = `${G.album.length} まい`;
    const box = $('#albumGrid');
    if (!G.album.length) { box.innerHTML = `<div class="empty"><span class="big">📷</span>まだ しゃしんが ないよ。<br>コーデが できたら しゃしんを とってね！</div>`; return; }
    box.innerHTML = G.album.map((p, i) => `<button class="album-card" data-p="${p.id}" style="animation-delay:${Math.min(i, 12) * 40}ms">${photoSvg(p)}</button>`).join('');
  }
  function viewPhoto(id) {
    const p = G.album.find((a) => String(a.id) === String(id)); if (!p) return;
    S.play('open');
    modal(`<div class="view-photo${isRoom(p) ? ' wide' : ''}">${photoSvg(p)}</div>` +
      `<div class="row">${isRoom(p) ? '' : '<button class="mid-btn pink" data-act="wear">👗 この コーデで あそぶ</button>'}<button class="mid-btn mint" data-act="png">💾 がぞうを ほぞん</button></div>` +
      `<div class="row"><button class="mid-btn gray" data-act="del">🗑️ けす</button><button class="mid-btn purple" data-act="close">とじる</button></div>`, {
      close: closeModal,
      wear: () => { closeModal(); wearState(p.state); enterStudio('free'); },
      png: () => savePng(p),
      del: () => modal(`<div class="ic">🗑️</div><h3>この しゃしんを けす？</h3><p>けすと もとに もどせないよ</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">けす</button></div>`, {
        no: () => viewPhoto(id),
        yes: () => { G.album = G.album.filter((a) => a.id !== p.id); save(); closeModal(); renderAlbum(); S.play('undo'); },
      }),
    });
  }

  /* ================= イベント ================= */
  function bind() {
    document.addEventListener('pointerdown', () => S.unlock(), { once: true });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    $('#btnFree').onclick = () => { S.play('open'); enterStudio('free'); };
    $('#btnChallenge').onclick = () => { S.play('open'); show('themes'); };
    $('#btnAlbum').onclick = () => { S.play('open'); show('album'); };
    $('#btnHouse').onclick = () => { S.play('open'); show('house'); };
    $('#hHome').onclick = () => { S.play('tap'); save(); show('title'); };
    $('#titleChara').onclick = () => {
      switchChara(true); S.play('pop'); renderTitle();
      $('#titleChara').animate([{ transform: 'scale(.94)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
    };
    $('#btnChara').onclick = (e) => {
      const a = e.target.closest('.av'), ch = a ? +a.dataset.ch : 1 - (G.st.chara | 0);
      if (G.busy) return;
      if (ch !== (G.st.chara | 0)) switchChara(); else { S.play('tap'); bounce(); }
    };
    $('#optBgm').onclick = $('#stBgm').onclick = $('#hBgm').onclick = toggleBgm;
    $('#optSe').onclick = $('#stSe').onclick = $('#hSe').onclick = toggleSe;
    $('#optSave').onclick = () => { S.play('tap'); saveMenu(); };
    $('#saveFile').onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) importSave(f); };
    document.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { S.play('tap'); show(b.dataset.go); }; });

    $('#btnHome').onclick = () => { S.play('tap'); save(); const h = G.fromHouse; G.fromHouse = false; show(h ? 'house' : 'title'); };
    $('#tabs').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (b) setTab(b.dataset.tab); };
    $('#subs').onclick = (e) => { const b = e.target.closest('[data-sub]'); if (b) setSub(b.dataset.sub); };
    $('#items').onclick = (e) => { const b = e.target.closest('[data-i]'); if (b) chooseItem(+b.dataset.i); };
    $('#pal').onclick = (e) => { const b = e.target.closest('[data-c]'); if (b) chooseColor(+b.dataset.c); };
    $('#btnRandom').onclick = shuffle;
    $('#btnUndo').onclick = undo;
    $('#btnReset').onclick = () => { S.play('tap'); reset(); };
    $('#btnPhoto').onclick = takePhoto;
    $('#nailHand').addEventListener('click', (e) => {
      const g = e.target.closest('[data-nail]'); if (!g) return;
      const i = +g.getAttribute('data-nail');
      if (NL.mode === 'all') { NL.mode = 'one'; }
      NL.sel = i; S.play('tap'); renderNail(); renderNailTools(); nailSparkle(A.FINGERS[i].x2, A.FINGERS[i].y2);
    });
    $('#nailMode').onclick = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; NL.mode = b.dataset.m; S.play('tab'); renderNail(); renderNailTools(); };
    $('#nailColors').onclick = (e) => { const b = e.target.closest('[data-nc]'); if (b) nailEdit((n) => { n.c = +b.dataset.nc; }, 'swish'); };
    $('#nailPats').onclick = (e) => { const b = e.target.closest('[data-np]'); if (b) nailEdit((n) => { n.p = +b.dataset.np; }); };
    $('#nailStks').onclick = (e) => { const b = e.target.closest('[data-ns]'); if (b) nailEdit((n) => { n.s = +b.dataset.ns; }, 'stamp'); };
    $('#nailClear').onclick = () => { nailTargets().forEach((i) => { NL.work[i] = null; }); S.play('undo'); renderNail(); renderNailTools(); };
    $('#nailRandom').onclick = () => {
      const c = rnd(A.NAIL_COLORS.length), c2 = rnd(A.NAIL_COLORS.length), p = rnd(A.NAIL_PATS.length);
      NL.work = [0, 1, 2, 3, 4].map((i) => ({ c: i % 2 ? c2 : c, p: Math.random() < 0.6 ? p : rnd(A.NAIL_PATS.length), s: Math.random() < 0.4 ? 1 + rnd(A.NAIL_STKS.length - 1) : 0 }));
      S.play('pick'); renderNail(); renderNailTools(); A.FINGERS.forEach((g) => nailSparkle(g.x2, g.y2));
    };
    $('#nailDone').onclick = nailDone;
    $('#btnShow').onclick = () => { if (G.busy) return; S.play('open'); startShow(); };
    $('#showBack').onclick = $('#showClose').onclick = () => { S.play('tap'); leaveShow(); };
    $('#showAgain').onclick = () => { S.play('tap'); startShow(); };
    $('#showPhoto').onclick = () => {
      stopShow(); flash(); S.play('shutter');
      G.photo = newPhoto({ state: clone(G.showState || G.st) });
      setTimeout(() => show('photo'), 380);
    };
    $('#btnDone').onclick = () => { S.play('open'); finishChallenge(); };
    $('#themeBanner').onclick = () => { if (G.theme) say(G.theme.msg, 5000); };
    $('#mascot').onclick = () => {
      S.play('giggle');
      $('#mascot').innerHTML = A.mascot('happy'); setTimeout(() => { $('#mascot').innerHTML = A.mascot(); }, 1400);
      say(G.mode === 'challenge' && G.theme ? 'ヒント：' + G.theme.hint : pick(['いろんな いろを ためしてみてね！', 'ひだりの かおを タッチすると キャラが かわるよ！', '🎲 おまかせも おもしろいよ！', 'できたら 📷 しゃしんを とろう！', SUBS[G.sub].say]), 3600);
    };
    $('#chara').addEventListener('click', () => {
      S.play('giggle'); burst(300, 250, 150, 10, true); say(pick(GIGGLE), 1500);
      $('#chara').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-26px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0)' }], { duration: 520, easing: 'ease-out' });
    });

    $('#themeGrid').onclick = (e) => { const b = e.target.closest('[data-theme]'); if (b) introTheme(b.dataset.theme); };
    $('#albumGrid').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) viewPhoto(b.dataset.p); };

    $('#photoCard').addEventListener('click', addStamp);
    $('#frameRow').onclick = (e) => { const b = e.target.closest('[data-f]'); if (!b) return; G.photo.frame = +b.dataset.f; S.play('color'); renderPhoto(); renderPhotoTools(); };
    $('#stampGrid').onclick = (e) => {
      const b = e.target.closest('[data-s]'); if (!b) return;
      const s = A.stampIndex[b.dataset.s];
      if (stampLocked(s)) { S.play('tap'); const t = THEMES.find((x) => x.id === s.reward); toast(`おだい「${t ? t.n : ''}」で もらえるよ！`); return; }
      G.photo.sel = s.id; S.play('tap');
      document.querySelectorAll('#stampGrid .stp').forEach((x) => x.classList.toggle('on', x.dataset.s === s.id));
    };
    $('#stampSize').onclick = (e) => {
      const b = e.target.closest('[data-z]'); if (!b || !G.photo) return;
      G.photo.size = G.stampSize = b.dataset.z; S.play(b.dataset.z === 'l' ? 'pop' : 'tap');
      document.querySelectorAll('#stampSize [data-z]').forEach((x) => x.classList.toggle('on', x === b));
    };
    $('#btnStampUndo').onclick = () => { if (G.photo.stamps.length) { G.photo.stamps.pop(); S.play('undo'); renderPhoto(); } else S.play('tap'); };
    $('#btnSaveAlbum').onclick = saveAlbum;
    $('#btnSavePng').onclick = () => savePng(G.photo);
    $('#btnPhotoBack').onclick = () => { S.play('tap'); if (isRoom(G.photo)) show('house'); else { show('studio'); setZoom(SUBS[G.sub].zoom); } };
  }

  /* ================= おへやづくり ================= */
  const HS = window.House.init({
    G, S, $, clone, rnd, pick, save, modal, closeModal, toast, confetti, flash, CALM, stOf, chipBg,
    openPhoto: (extra) => { G.photo = newPhoto(extra); show('photo'); },
    dressUp: (ch) => { if ((G.st.chara | 0) !== ch) switchChara(true); enterStudio('free'); G.fromHouse = true; },
  });

  /* ================= はじまり ================= */
  load();
  HS.ensure();
  S.on.bgm = G.opt.bgm; S.on.se = G.opt.se;
  $('#appVer').textContent = 'Ver.' + APP_VERSION;
  makeFloaties();
  bind();
  blinkLoop();
  idleLoop();
  document.addEventListener('pointerdown', () => S.preloadFiles(), { once: true });
  show('title');
})();
