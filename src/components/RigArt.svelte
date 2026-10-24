<script>
  // Small diagrams of each rig: water surface, line, float or weight, hook.
  let { rig } = $props();
</script>

<svg viewBox="0 0 120 120" role="img" aria-hidden="true">
  <rect x="0" y="34" width="120" height="86" fill="var(--water)" />
  <path d="M0,34 q10,-4 20,0 t20,0 t20,0 t20,0 t20,0 t20,0" fill="none" stroke="var(--water-line)" stroke-width="2" />
  <rect x="0" y="108" width="120" height="12" fill="var(--mud)" />

  {#if rig === 'float'}
    <line x1="60" y1="0" x2="60" y2="96" stroke="var(--ink)" stroke-width="1.2" />
    <ellipse cx="60" cy="36" rx="6" ry="11" fill="#fff" stroke="var(--ink)" />
    <path d="M54,32 h12 v-6 a6,6 0 0 0 -12,0 z" fill="#e8402c" />
    <circle cx="60" cy="60" r="2.6" fill="#555" />
    <circle cx="60" cy="68" r="2.2" fill="#555" />
    <circle cx="60" cy="80" r="1.8" fill="#555" />
    <path d="M60,96 v6 a4,4 0 0 1 -8,0" fill="none" stroke="#333" stroke-width="1.6" />
  {:else if rig === 'feeder'}
    <path d="M0,0 L80,104" stroke="var(--ink)" stroke-width="1.2" fill="none" />
    <rect x="72" y="92" width="12" height="16" rx="3" fill="#7a8a90" stroke="var(--ink)" />
    <path d="M78,104 q14,-2 30,2" stroke="var(--ink)" stroke-width="1.1" fill="none" />
    <path d="M108,106 v-4 a4,4 0 0 0 -8,0" fill="none" stroke="#333" stroke-width="1.6" />
    <circle cx="104" cy="104" r="2.5" fill="#f1c232" />
  {:else if rig === 'lure'}
    <path d="M0,0 L58,60" stroke="var(--ink)" stroke-width="1.2" />
    <path d="M58,60 L70,66" stroke="#999" stroke-width="2" />
    <path d="M70,66 q12,-10 30,-2 q-6,8 -30,2 z" fill="#f5a623" stroke="var(--ink)" />
    <circle cx="94" cy="64" r="1.8" fill="#111" />
    <path d="M80,70 l-3,7 m6,-7 l0,7" stroke="#333" stroke-width="1.4" />
  {:else if rig === 'dropshot'}
    <line x1="60" y1="0" x2="60" y2="104" stroke="var(--ink)" stroke-width="1.2" />
    <path d="M60,76 h10" stroke="#333" stroke-width="1.6" />
    <path d="M70,76 q10,-4 18,2 q-8,4 -18,-2 z" fill="#6bbf59" stroke="var(--ink)" />
    <ellipse cx="60" cy="104" rx="5" ry="4" fill="#555" />
  {:else if rig === 'net'}
    <path d="M10,0 L60,64" stroke="#8a6a3a" stroke-width="4" stroke-linecap="round" />
    <ellipse cx="72" cy="70" rx="18" ry="8" fill="none" stroke="#555" stroke-width="2" />
    <path d="M54,70 q18,34 36,0" fill="rgba(255,255,255,.4)" stroke="#555" stroke-dasharray="2 2" />
    <path d="M30,92 q6,-4 12,0 q-6,4 -12,0 z" fill="#a7b79a" />
  {/if}
</svg>

<style>
  svg {
    width: 100%;
    max-width: 120px;
    border-radius: 12px;
    display: block;
  }
</style>
