<script>
  import { app } from '../lib/app.svelte.js';
  import { t } from '../lib/i18n.js';
  import { sortedSessions, sessionCatches } from '../lib/model.js';
  import { longDate } from '../lib/dates.js';
  import Photo from '../components/Photo.svelte';

  let { kid } = $props();
  const sessions = $derived(sortedSessions(app));
  const byId = $derived(Object.fromEntries(app.profiles.map((p) => [p.id, p])));
</script>

<section class="page">
  <h1>{t('tripsTitle')}</h1>
  {#if !kid}<p class="muted">{t('tripsIntro')}</p>{/if}

  <a class="primary as-button wide" href="#/session-edit/new">＋ {t('newTrip')}</a>

  {#if sessions.length === 0}
    <p class="center muted empty">🛶<br />{t('noTrips')}</p>
  {/if}

  <ul class="trips">
    {#each sessions as s (s.id)}
      {@const n = sessionCatches(app, s.id).length}
      <li>
        <a class="card trip" href="#/session/{s.id}">
          <div class="pic">
            {#if s.photoIds.length}<Photo id={s.photoIds[0]} />{:else}<span class="water">🎣</span>{/if}
            {#if n}<span class="count">🐟 {n}</span>{/if}
          </div>
          <div class="info">
            <strong>{longDate(s.date)}</strong>
            {#if s.place}<span class="muted">📍 {s.place.name}</span>{/if}
            <span class="avs">{#each s.anglerIds as id}{#if byId[id]}<span title={byId[id].name}>{byId[id].avatar}</span>{/if}{/each}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .wide {
    display: block;
    font-size: 1.15rem;
    padding: 0.9rem;
    margin: 0.5rem 0 1rem;
  }
  .empty {
    font-size: 1.1rem;
    line-height: 2;
  }
  .trips {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .trip {
    display: block;
    padding: 0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }
  .pic {
    position: relative;
    height: 150px;
  }
  .water {
    display: grid;
    place-items: center;
    height: 100%;
    font-size: 2.6rem;
    background: linear-gradient(160deg, var(--water), var(--accent-soft));
  }
  .count {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 999px;
    padding: 0.2rem 0.65rem;
    font-weight: 700;
  }
  .info {
    display: grid;
    gap: 0.15rem;
    padding: 0.75rem 1rem 0.9rem;
  }
  .info strong::first-letter {
    text-transform: uppercase;
  }
  .avs {
    font-size: 1.4rem;
    letter-spacing: 0.15rem;
  }
</style>
