<script>
  import { app, persist, activeProfile } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { species, speciesById } from '../data/species.js';
  import { caughtSpecies, catchesOf, removeCatch } from '../lib/model.js';
  import { shortDate } from '../lib/dates.js';
  import FishArt from '../components/FishArt.svelte';

  const profile = $derived(activeProfile());
  const caught = $derived(profile ? caughtSpecies(app, profile.id) : new Set());
  const mine = $derived(profile ? catchesOf(app, profile.id) : []);

  // Two taps to delete: the first asks, the second deletes.
  let asking = $state(null);
  let all = $state(false);

  function remove(c) {
    if (asking !== c.id) {
      asking = c.id;
      return;
    }
    asking = null;
    removeCatch(app, c.id);
    persist();
  }

</script>

<section class="page">
  <h1>{t('bookTitle')}</h1>
  <p class="muted">{t('bookProgress', { n: caught.size, total: species.length })}</p>
  <div class="progress"><div style="width:{(caught.size / species.length) * 100}%"></div></div>

  <h2 class="mine">{t('myCatches')}</h2>
  {#if mine.length === 0}
    <p class="muted">{t('noCatches')}</p>
  {:else}
    <ul class="list">
      {#each all ? mine : mine.slice(0, 3) as c (c.id)}
        {@const fish = speciesById[c.speciesId]}
        <li class="card row">
          <a class="what" href="#/fish/{c.speciesId}">
            <span class="mini">{#if fish}<FishArt art={fish.art} id="mine-{c.id}" />{/if}</span>
            <span>
              <strong>{fish ? tr(fish.name) : c.speciesId}</strong>
              <span class="muted date">{shortDate(c.at)}</span>
            </span>
          </a>
          <button class="ghost del" class:danger={asking === c.id} onclick={() => remove(c)} aria-label={t('remove')}>
            {asking === c.id ? t('confirmShort') : '🗑️'}
          </button>
        </li>
      {/each}
    </ul>
    {#if mine.length > 3 && !all}
      <button class="ghost more" onclick={() => (all = true)}>{t('showAll', { n: mine.length })}</button>
    {/if}
  {/if}

  <h2 class="mine">{t('navBook')}</h2>
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
  .mine {
    margin-top: 1.2rem;
  }
  .more {
    width: 100%;
  }
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.6rem 0.8rem;
  }
  .what {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    text-decoration: none;
    color: inherit;
    min-width: 0;
  }
  .mini {
    width: 84px;
    flex: none;
  }
  .date {
    display: block;
    font-size: 0.9rem;
  }
  .del {
    flex: none;
    min-width: 3rem;
    padding: 0.5rem 0.7rem;
  }
  .danger {
    border-color: var(--warn);
    color: var(--warn);
    font-size: 0.9rem;
  }
  .tile:not(.got) {
    background: var(--card-dim);
  }
  .tile:not(.got) span {
    font-size: 1.4rem;
    color: var(--muted);
  }
</style>
