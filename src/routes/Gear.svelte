<script>
  import { t, tr } from '../lib/i18n.js';
  import { rigs, packingList } from '../data/gear.js';
  import { app } from '../lib/app.svelte.js';
  import RigArt from '../components/RigArt.svelte';
  import Speak from '../components/Speak.svelte';

  let { kid } = $props();
  let packed = $state(new Set());
  const toggle = (i) => {
    const next = new Set(packed);
    next.has(i) ? next.delete(i) : next.add(i);
    packed = next;
  };
</script>

<section class="page">
  <h1>{t('gearTitle')}</h1>

  <div class="card">
    <h2>{t('packing')}</h2>
    <ul class="pack">
      {#each packingList[app.settings.lang] as item, i}
        <li>
          <label class:done={packed.has(i)}>
            <input type="checkbox" checked={packed.has(i)} onchange={() => toggle(i)} />
            {item}
          </label>
        </li>
      {/each}
    </ul>
  </div>

  {#each Object.entries(rigs) as [key, rig]}
    <div class="card rig" id="rig-{key}">
      <div class="head">
        <RigArt rig={key} />
        <div>
          <h2>{tr(rig.name)}</h2>
          <p class="muted">{tr(rig.rod)}</p>
          {#if kid}<Speak text="{tr(rig.name)}. {tr(rig.steps).join(' ')}" />{/if}
        </div>
      </div>
      <ol>{#each tr(rig.steps) as step}<li>{step}</li>{/each}</ol>
    </div>
  {/each}
</section>

<style>
  .pack {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.3rem;
  }
  .pack label {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    padding: 0.35rem 0;
    font-size: 1.05rem;
  }
  .pack input {
    width: 1.4rem;
    height: 1.4rem;
    accent-color: var(--accent);
  }
  .done {
    color: var(--muted);
    text-decoration: line-through;
  }
  .head {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 0.9rem;
    align-items: center;
  }
  .head h2 {
    margin: 0 0 0.2rem;
  }
  .head p {
    margin: 0 0 0.4rem;
  }
  ol {
    padding-left: 1.3rem;
    margin-bottom: 0;
  }
  ol li {
    margin-bottom: 0.3rem;
  }
</style>
