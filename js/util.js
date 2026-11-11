/* きらきら☆おしゃれスタジオ — 共通ユーティリティ（色・図形） */
(function (g) {
  'use strict';
  const U = {};
  let n = 0;
  U.uid = (p) => (p || 'u') + (++n).toString(36);

  /* ---------- 色 ---------- */
  U.rgb = (h) => {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const v = parseInt(h, 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };
  U.hex = (r, gg, b) =>
    '#' + [r, gg, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  U.mix = (a, b, t) => {
    const A = U.rgb(a), B = U.rgb(b);
    return U.hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
  };
  U.dark = (c, t) => U.mix(c, '#3d1f52', t == null ? 0.3 : t);
  U.light = (c, t) => U.mix(c, '#ffffff', t == null ? 0.3 : t);
  /* 明るさ（0-255） */
  U.lum = (c) => { const [r, gg, b] = U.rgb(c); return 0.299 * r + 0.587 * gg + 0.114 * b; };
  /* 線の色：塗りより少し濃い同系色 */
  U.line = (c) => (U.lum(c) > 235 ? U.mix(c, '#b98aa8', 0.55) : U.dark(c, 0.38));

  /* ---------- 乱数（シード付き） ---------- */
  U.rng = (seed) => () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const f = (v) => (Math.round(v * 10) / 10);
  U.f = f;

  /* ---------- グラデーション ---------- */
  U.lin = (id, stops, x1, y1, x2, y2, user) => {
    const s = stops.map((st, i) => {
      const off = st.length > 1 && typeof st[1] === 'number' ? st[1] : i / (stops.length - 1);
      const op = st.length > 2 ? ` stop-opacity="${st[2]}"` : '';
      return `<stop offset="${f(off)}" stop-color="${st[0]}"${op}/>`;
    }).join('');
    return `<linearGradient id="${id}" x1="${x1 == null ? 0 : x1}" y1="${y1 == null ? 0 : y1}" x2="${x2 == null ? 0 : x2}" y2="${y2 == null ? 1 : y2}"${user ? ' gradientUnits="userSpaceOnUse"' : ''}>${s}</linearGradient>`;
  };
  U.rad = (id, stops, cx, cy, r) => {
    const s = stops.map((st, i) => {
      const off = st.length > 1 && typeof st[1] === 'number' ? st[1] : i / (stops.length - 1);
      const op = st.length > 2 ? ` stop-opacity="${st[2]}"` : '';
      return `<stop offset="${f(off)}" stop-color="${st[0]}"${op}/>`;
    }).join('');
    return `<radialGradient id="${id}" cx="${cx == null ? 0.5 : cx}" cy="${cy == null ? 0.5 : cy}" r="${r == null ? 0.5 : r}">${s}</radialGradient>`;
  };

  /* ---------- 図形パス ---------- */
  U.starPath = (cx, cy, R, r, pts, rot) => {
    pts = pts || 5; r = r == null ? R * 0.48 : r; rot = rot == null ? -90 : rot;
    let d = '';
    for (let i = 0; i < pts * 2; i++) {
      const a = (rot + (i * 180) / pts) * Math.PI / 180, rr = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ',' + f(cy + rr * Math.sin(a));
    }
    return d + 'Z';
  };
  /* 4つ角のキラキラ */
  U.sparklePath = (cx, cy, R, k) => {
    k = k == null ? 0.22 : k; const q = R * k;
    return `M${f(cx)},${f(cy - R)}Q${f(cx + q)},${f(cy - q)} ${f(cx + R)},${f(cy)}Q${f(cx + q)},${f(cy + q)} ${f(cx)},${f(cy + R)}Q${f(cx - q)},${f(cy + q)} ${f(cx - R)},${f(cy)}Q${f(cx - q)},${f(cy - q)} ${f(cx)},${f(cy - R)}Z`;
  };
  U.heartPath = (cx, cy, s) =>
    `M${f(cx)},${f(cy + s * 0.92)}C${f(cx - s * 1.55)},${f(cy - s * 0.1)} ${f(cx - s * 0.9)},${f(cy - s * 1.25)} ${f(cx)},${f(cy - s * 0.4)}C${f(cx + s * 0.9)},${f(cy - s * 1.25)} ${f(cx + s * 1.55)},${f(cy - s * 0.1)} ${f(cx)},${f(cy + s * 0.92)}Z`;

  /* 先細りカプセル（腕・脚・そで） */
  U.capsule = (x1, y1, r1, x2, y2, r2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), s = Math.sin(a), c = Math.cos(a);
    const p1 = [x1 + r1 * s, y1 - r1 * c], p2 = [x2 + r2 * s, y2 - r2 * c];
    const p3 = [x2 - r2 * s, y2 + r2 * c], p4 = [x1 - r1 * s, y1 + r1 * c];
    return `M${f(p1[0])},${f(p1[1])}L${f(p2[0])},${f(p2[1])}A${r2},${r2} 0 0 1 ${f(p3[0])},${f(p3[1])}L${f(p4[0])},${f(p4[1])}A${r1},${r1} 0 0 1 ${f(p1[0])},${f(p1[1])}Z`;
  };

  /* 2次ベジェ上の点 */
  const qp = (p0, c, p1, t) => [
    (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0],
    (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1],
  ];
  /* フリル（スカラップ）：p0→p1 の2次曲線に沿って n 個の半円状のふくらみ。
     戻り値は "Q.. Q.." の続き（M は含まない）。depth>0 で進行方向の右手側へふくらむ */
  U.frill = (p0, c, p1, cnt, depth) => {
    let d = '';
    let prev = p0;
    for (let i = 1; i <= cnt; i++) {
      const p = qp(p0, c, p1, i / cnt);
      const dx = p[0] - prev[0], dy = p[1] - prev[1];
      const len = Math.hypot(dx, dy) || 1;
      d += `Q${f((prev[0] + p[0]) / 2 + (-dy / len) * depth)},${f((prev[1] + p[1]) / 2 + (dx / len) * depth)} ${f(p[0])},${f(p[1])}`;
      prev = p;
    }
    return d;
  };
  /* 直線版フリル */
  U.frillLine = (x1, y1, x2, y2, cnt, depth) =>
    U.frill([x1, y1], [(x1 + x2) / 2, (y1 + y2) / 2], [x2, y2], cnt, depth);
  /* ギザギザ */
  U.zig = (x1, y1, x2, y2, cnt, depth) => {
    let d = '';
    for (let i = 1; i <= cnt; i++) {
      const xa = x1 + ((x2 - x1) * (i - 0.5)) / cnt, ya = y1 + ((y2 - y1) * (i - 0.5)) / cnt;
      const xb = x1 + ((x2 - x1) * i) / cnt, yb = y1 + ((y2 - y1) * i) / cnt;
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      const nx = (-(y2 - y1) / len) * depth, ny = ((x2 - x1) / len) * depth;
      d += `L${f(xa + nx)},${f(ya + ny)}L${f(xb)},${f(yb)}`;
    }
    return d;
  };

  /* ---------- 部品 ---------- */
  U.P = (d, fill, stroke, sw, extra) =>
    `<path d="${d}" fill="${fill || 'none'}"${stroke ? ` stroke="${stroke}" stroke-width="${sw == null ? 2.5 : sw}" stroke-linejoin="round" stroke-linecap="round"` : ''}${extra ? ' ' + extra : ''}/>`;
  U.mirror = (s) => `<g transform="translate(600,0) scale(-1,1)">${s}</g>`;
  U.both = (s) => s + U.mirror(s);

  U.star = (cx, cy, R, fill, stroke, sw, rot) =>
    U.P(U.starPath(cx, cy, R, R * 0.5, 5, rot), fill, stroke || fill, sw == null ? R * 0.22 : sw);
  U.sparkle = (cx, cy, R, fill, op) =>
    `<path d="${U.sparklePath(cx, cy, R)}" fill="${fill || '#fff'}"${op != null ? ` opacity="${op}"` : ''}/>`;
  U.heart = (cx, cy, s, fill, stroke, sw) => U.P(U.heartPath(cx, cy, s), fill, stroke, sw);

  /* リボン（ちょうむすび） */
  U.bow = (cx, cy, w, h, fill, line, o) => {
    o = o || {};
    const hw = w / 2, hh = h / 2;
    const loop = (sx) =>
      `M${f(cx)},${f(cy)}C${f(cx + sx * hw * 0.3)},${f(cy - hh * 0.95)} ${f(cx + sx * hw * 1.02)},${f(cy - hh * 1.25)} ${f(cx + sx * hw)},${f(cy - hh * 0.35)}` +
      `C${f(cx + sx * hw * 1.02)},${f(cy + hh * 0.1)} ${f(cx + sx * hw * 1.02)},${f(cy + hh * 0.2)} ${f(cx + sx * hw)},${f(cy + hh * 0.45)}` +
      `C${f(cx + sx * hw * 1.0)},${f(cy + hh * 1.25)} ${f(cx + sx * hw * 0.3)},${f(cy + hh * 0.95)} ${f(cx)},${f(cy)}Z`;
    const fold = (sx) =>
      `M${f(cx + sx * hw * 0.2)},${f(cy - hh * 0.12)}Q${f(cx + sx * hw * 0.5)},${f(cy - hh * 0.3)} ${f(cx + sx * hw * 0.78)},${f(cy - hh * 0.3)}` +
      `M${f(cx + sx * hw * 0.2)},${f(cy + hh * 0.12)}Q${f(cx + sx * hw * 0.5)},${f(cy + hh * 0.3)} ${f(cx + sx * hw * 0.78)},${f(cy + hh * 0.34)}`;
    let s = '';
    if (o.tails) {
      const tl = o.tails === true ? h * 1.1 : o.tails;
      const tail = (sx) =>
        `M${f(cx + sx * w * 0.02)},${f(cy)}L${f(cx + sx * w * 0.34)},${f(cy + tl)}L${f(cx + sx * w * 0.2)},${f(cy + tl * 0.86)}L${f(cx + sx * w * 0.1)},${f(cy + tl * 1.02)}Z`;
      s += U.P(tail(-1), o.tailFill || fill, line, o.sw) + U.P(tail(1), o.tailFill || fill, line, o.sw);
    }
    s += U.P(loop(-1), fill, line, o.sw) + U.P(loop(1), fill, line, o.sw);
    s += U.P(fold(-1) + fold(1), 'none', line, (o.sw || 2.5) * 0.7, 'opacity="0.55"');
    const kw = w * 0.11, kh = h * 0.3;
    if (o.gem) {
      s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(kh * 0.95)}" fill="${o.gem}" stroke="${line}" stroke-width="${o.sw || 2.5}"/>` +
        `<circle cx="${f(cx - kh * 0.3)}" cy="${f(cy - kh * 0.3)}" r="${f(kh * 0.28)}" fill="#fff" opacity="0.85"/>`;
    } else {
      s += `<rect x="${f(cx - kw)}" y="${f(cy - kh)}" width="${f(kw * 2)}" height="${f(kh * 2)}" rx="${f(kw * 0.8)}" fill="${o.knot || fill}" stroke="${line}" stroke-width="${o.sw || 2.5}"/>`;
    }
    return s;
  };

  /* お花 */
  U.flower = (cx, cy, r, fill, center, pet, stroke) => {
    pet = pet || 5;
    let s = '';
    for (let i = 0; i < pet; i++) {
      const a = (-90 + (i * 360) / pet) * Math.PI / 180;
      s += `<circle cx="${f(cx + Math.cos(a) * r * 0.58)}" cy="${f(cy + Math.sin(a) * r * 0.58)}" r="${f(r * 0.46)}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.6"` : ''}/>`;
    }
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.34)}" fill="${center || '#ffd95a'}"/>`;
    return s;
  };

  /* 宝石（まる） */
  U.gem = (cx, cy, r, fill, line) =>
    `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}" stroke="${line || U.dark(fill, 0.35)}" stroke-width="${f(Math.max(1.2, r * 0.22))}"/>` +
    `<circle cx="${f(cx - r * 0.3)}" cy="${f(cy - r * 0.32)}" r="${f(r * 0.3)}" fill="#fff" opacity="0.9"/>`;

  /* キラキラを散らす */
  U.sprinkle = (seed, cnt, x0, y0, x1, y1, rmin, rmax, fill, op) => {
    const r = U.rng(seed); let s = '';
    for (let i = 0; i < cnt; i++) {
      s += U.sparkle(x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), rmin + r() * (rmax - rmin), fill || '#fff', op == null ? 0.85 : op);
    }
    return s;
  };

  g.U = U;
})(window);
