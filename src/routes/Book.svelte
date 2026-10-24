<script>
  import { app, activeProfile } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { species } from '../data/species.js';
  import { caughtSpecies } from '../lib/model.js';
  import FishArt from '../components/FishArt.svelte';

  const profile = $derived(activeProfile());
  const caught = $derived(profile ? caughtSpecies(app, profile.id) : new Set());
</script>

<section class="page">
  <h1>{t('bookTitle')}</h1>
  <p class="muted">{t('bookProgress', { n: caught.size, total: species.length })}</p>
  <div class="progress"><div style="width:{(caught.size / species.length) * 100}%"></div></div>

  <div class="book">
    {#each species as fish (fish.id)}
      {@const got = caught.has(fish.id)}
      <a class="card tile" class:got href="#/fish/{fish.id}">
        <FishArt art={fish.art} id="book-{fish.id}" silhouette={!got} />
        <span>{got ? tr(fish.name) : '?'}</span>
      </a>
    {/each}
  </div>
</section>

<style>
  .progress {
    height: 14px;
    border-radius: 7px;
    background: var(--line);
    overflow: hidden;
    margin-bottom: 1rem;
  }
  .progress div {
    height: 100%;
    background: var(--good);
    border-radius: 7px;
    transition: width 0.5s;
  }
  .book {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .tile {
    text-decoration: none;
    color: inherit;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    text-align: center;
    font-weight: 700;
    padding: 0.9rem 0.6rem;
  }
  .tile:not(.got) {
    background: var(--card-dim);
  }
  .tile:not(.got) span {
    font-size: 1.4rem;
    color: var(--muted);
  }
</style>
