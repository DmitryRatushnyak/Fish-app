<script>
  // Draws a simple, friendly side view of a fish from a few parameters (see species.js art).
  let { art, id = 'fish', size = '100%', silhouette = false } = $props();

  const W = 200;
  const CY = 52;

  const shapes = {
    slim: { h: 20, x0: 20, x1: 158, pow: 0.75, tail: 'fork' },
    normal: { h: 27, x0: 20, x1: 156, pow: 0.7, tail: 'fork' },
    deep: { h: 36, x0: 22, x1: 154, pow: 0.65, tail: 'fork' },
    long: { h: 19, x0: 10, x1: 162, pow: 0.95, tail: 'fork' },
    goby: { h: 22, x0: 22, x1: 160, pow: 0.45, tail: 'round' },
    catfish: { h: 22, x0: 14, x1: 168, pow: 0.4, tail: 'round' },
    eel: { h: 9, x0: 12, x1: 186, pow: 1, tail: 'none' }
  };

  const s = $derived(shapes[art.shape] ?? shapes.normal);
  const len = $derived(s.x1 - s.x0);

  // Half-height of the body at position t (0 = nose, 1 = tail base).
  function half(t) {
    if (art.shape === 'eel') return s.h * Math.min(1, t * 7) * (1 - 0.55 * t);
    const body = Math.sin(Math.PI * Math.pow(t, s.pow) * 0.93);
    return s.h * Math.max(0.16, Math.pow(Math.max(body, 0), 0.7));
  }
  const xAt = (t) => s.x0 + t * len;
  const topY = (t) => CY - half(t);
  const botY = (t) => CY + half(t) * (art.shape === 'catfish' || art.shape === 'goby' ? 0.75 : 0.85);

  const bodyPath = $derived.by(() => {
    const n = 40;
    const top = [];
    const bot = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      top.push(`${xAt(t).toFixed(1)},${topY(t).toFixed(1)}`);
      bot.push(`${xAt(t).toFixed(1)},${botY(t).toFixed(1)}`);
    }
    return `M${top.join(' L')} L${bot.reverse().join(' L')} Z`;
  });

  const tailPath = $derived.by(() => {
    const x = s.x1 - 2;
    const ht = half(1);
    if (s.tail === 'none') return '';
    if (s.tail === 'round') {
      return `M${x},${CY - ht} C${x + 26},${CY - ht - 14} ${x + 34},${CY + ht + 12} ${x},${CY + ht} Z`;
    }
    const spread = s.h * 0.95 + 6;
    return `M${x},${CY - ht} L${x + 30},${CY - spread} Q${x + 18},${CY} ${x + 30},${CY + spread} L${x},${CY + ht} Z`;
  });

  // Fin from t1 to t2 along the back, rising by `rise`. Spiky fins get a zigzag edge.
  function backFin(t1, t2, rise, spiky = false) {
    const a = [xAt(t1), topY(t1) + 1];
    const b = [xAt(t2), topY(t2) + 1];
    if (spiky) {
      const pts = [];
      const n = 6;
      for (let i = 0; i <= n; i++) {
        const t = t1 + ((t2 - t1) * i) / n;
        const r = rise * (1 - (i / n) * 0.6);
        pts.push(`${xAt(t).toFixed(1)},${(topY(t) - (i % 2 === 0 ? r : r * 0.55)).toFixed(1)}`);
      }
      return `M${a} L${pts.join(' L')} L${b} Z`;
    }
    const peak = [xAt(t1 + (t2 - t1) * 0.3), Math.min(topY(t1), topY(t2)) - rise];
    return `M${a} Q${peak[0]},${peak[1]} ${xAt(t2)},${topY(t2) - rise * 0.25} L${b} Z`;
  }

  const dorsal = $derived.by(() => {
    switch (art.dorsal) {
      case 'spiny': return [backFin(0.3, 0.52, 15, true), backFin(0.54, 0.74, 11)];
      case 'back': return [backFin(0.68, 0.84, 13)];
      case 'long': return [backFin(0.36, 0.78, 10)];
      case 'round': return [backFin(0.42, 0.6, 13)];
      case 'goby': return [backFin(0.3, 0.46, 9), backFin(0.5, 0.82, 8)];
      case 'tiny': return [backFin(0.3, 0.36, 6)];
      case 'spines3': return [backFin(0.25, 0.3, 9, true), backFin(0.35, 0.4, 9, true), backFin(0.45, 0.5, 6, true), backFin(0.58, 0.72, 9)];
      case 'eel': return [backFin(0.38, 1, 4)];
      default: return [backFin(0.42, 0.6, 15)];
    }
  });

  const analFin = $derived.by(() => {
    if (art.shape === 'eel') return `M${xAt(0.5)},${botY(0.5)} L${xAt(1)},${botY(1) + 4} L${xAt(1)},${botY(1)} Z`;
    const t1 = art.shape === 'catfish' ? 0.42 : 0.7;
    const t2 = art.shape === 'catfish' ? 0.98 : 0.82;
    const drop = art.shape === 'catfish' ? 6 : 11;
    return `M${xAt(t1)},${botY(t1) - 1} L${xAt(t1 + 0.03)},${botY(t1) + drop} L${xAt(t2)},${botY(t2) + drop * 0.4} L${xAt(t2)},${botY(t2) - 1} Z`;
  });

  const pelvic = $derived(
    art.shape === 'eel' ? '' : `M${xAt(0.42)},${botY(0.42) - 1} l12,${art.shape === 'deep' ? 10 : 9} l-3,-${art.shape === 'deep' ? 11 : 9} Z`
  );
  const pectoral = $derived(`M${xAt(0.22)},${CY + half(0.22) * 0.35} q14,4 18,12 q-12,0 -18,-8 Z`);

  const eye = $derived.by(() => {
    const t = art.shape === 'long' ? 0.13 : art.shape === 'catfish' ? 0.08 : 0.1;
    const x = xAt(t) + (art.shape === 'eel' ? 3 : 0);
    const y = CY - half(t) * (art.eye === 'top' ? 0.55 : 0.3);
    const r = { big: 5.5, small: 2.6, top: 4.2, glow: 6 }[art.eye] ?? 4.5;
    const ring = { red: '#e04a3a', gold: '#e8b33c', glow: '#cfd8c8' }[art.eye] ?? '#ffffff';
    return { x, y, r, ring };
  });

  const gill = $derived.by(() => {
    const t = art.shape === 'long' ? 0.27 : art.shape === 'eel' ? 0.07 : 0.2;
    const x = xAt(t);
    return `M${x},${topY(t) + 4} Q${x + 7},${CY} ${x},${botY(t) - 4}`;
  });

  const mouth = $derived(`M${s.x0 + 1},${CY + 1} q6,2 9,${art.shape === 'catfish' ? 4 : 1}`);

  const barbels = $derived.by(() => {
    const out = [];
    const n = art.barbels ?? 0;
    for (let i = 0; i < n; i++) {
      const long = art.shape === 'catfish' && i < 2;
      const dy = (i % 2 === 0 ? 1 : -1) * (long ? 14 : 4) + (long ? 10 : 6);
      const dx = long ? 26 - i * 4 : 8 + i * 2;
      out.push(`M${s.x0 + 4},${CY + 2} q${-6},${dy * 0.6} ${dx * (long ? 1 : 0.2)},${dy}`);
    }
    return out;
  });

  const pattern = $derived.by(() => {
    const out = [];
    if (art.pattern === 'bars' || art.pattern === 'bars-faint') {
      for (let i = 0; i < 6; i++) {
        const t = 0.3 + i * 0.1;
        out.push({ kind: 'bar', x: xAt(t), w: 7, op: art.pattern === 'bars' ? 0.5 : 0.22 });
      }
    } else if (art.pattern === 'spots' || art.pattern === 'dots' || art.pattern === 'blotches' || art.pattern === 'marble') {
      const light = art.pattern === 'spots';
      let seed = 7;
      const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      const count = { spots: 26, dots: 30, blotches: 9, marble: 14 }[art.pattern];
      for (let i = 0; i < count; i++) {
        const t = 0.18 + rnd() * 0.8;
        const y = topY(t) + rnd() * (botY(t) - topY(t)) * 0.75;
        const r = { spots: 2.4, dots: 1.2, blotches: 5, marble: 6 }[art.pattern] * (0.7 + rnd() * 0.6);
        out.push({ kind: 'spot', x: xAt(t), y, rx: r * (light ? 1.6 : 1.2), ry: r, fill: light ? '#f1edb4' : '#1f1d16', op: light ? 0.75 : 0.35 });
      }
    } else if (art.pattern === 'scales') {
      for (let row = -2; row <= 2; row++) {
        for (let i = 0; i < 9; i++) {
          const t = 0.25 + i * 0.08 + (row % 2 ? 0.04 : 0);
          out.push({ kind: 'scale', x: xAt(t), y: CY + row * 8 });
        }
      }
    }
    return out;
  });

  const uid = $derived(`${id}-${art.shape}`);
</script>

<svg viewBox="0 0 {W} 104" width={size} role="img" aria-hidden="true" class:silhouette>
  <defs>
    <linearGradient id="g-{uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color={art.back} />
      <stop offset="0.55" stop-color={art.side} />
      <stop offset="1" stop-color={art.belly} />
    </linearGradient>
    <clipPath id="c-{uid}"><path d={bodyPath} /></clipPath>
  </defs>

  <g class="fins" fill={art.fin} stroke="rgba(0,0,0,.25)" stroke-width="0.8">
    {#each dorsal as d}<path {d} />{/each}
    <path d={analFin} />
    {#if tailPath}<path d={tailPath} />{/if}
    {#if pelvic}<path d={pelvic} />{/if}
  </g>

  <path d={bodyPath} fill="url(#g-{uid})" stroke="rgba(0,0,0,.3)" stroke-width="1" />

  <g clip-path="url(#c-{uid})">
    {#each pattern as p}
      {#if p.kind === 'bar'}
        <rect x={p.x} y="0" width={p.w} height="104" fill="#1f2a12" opacity={p.op} rx="3" />
      {:else if p.kind === 'spot'}
        <ellipse cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={p.fill} opacity={p.op} />
      {:else}
        <path d="M{p.x - 5},{p.y} q5,6 10,0" fill="none" stroke="rgba(60,40,10,.35)" stroke-width="1" />
      {/if}
    {/each}
  </g>

  <path d={pectoral} fill={art.fin} stroke="rgba(0,0,0,.25)" stroke-width="0.8" opacity="0.9" />
  <path d={gill} fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.2" />
  <path d={mouth} fill="none" stroke="rgba(0,0,0,.45)" stroke-width="1.2" stroke-linecap="round" />
  {#each barbels as d}<path {d} fill="none" stroke={art.back} stroke-width="1.4" stroke-linecap="round" />{/each}

  <circle cx={eye.x} cy={eye.y} r={eye.r} fill={eye.ring} stroke="rgba(0,0,0,.35)" stroke-width="0.6" />
  <circle cx={eye.x - eye.r * 0.15} cy={eye.y} r={eye.r * 0.55} fill="#111" />
  <circle cx={eye.x - eye.r * 0.35} cy={eye.y - eye.r * 0.3} r={eye.r * 0.2} fill="#fff" />
</svg>

<style>
  svg {
    display: block;
    height: auto;
    overflow: visible;
  }
  .silhouette :global(*) {
    fill: var(--muted-fish, #b9c6c4) !important;
    stroke: none !important;
  }
</style>
