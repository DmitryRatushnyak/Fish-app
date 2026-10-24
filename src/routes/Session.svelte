<script>
  import { app, persist, activeProfile } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { rigs, baits } from '../data/gear.js';
  import { speciesById } from '../data/species.js';
  import { addCatch, removeCatch, sessionCatches } from '../lib/model.js';
  import { deletePhoto } from '../lib/photos.js';
  import { mapLink } from '../lib/place.js';
  import { longDate, time } from '../lib/dates.js';
  import FishArt from '../components/FishArt.svelte';
  import Photo from '../components/Photo.svelte';
  import CatchPicker from '../components/CatchPicker.svelte';

  let { id } = $props();
  const session = $derived(app.sessions.find((s) => s.id === id));
  const anglers = $derived(session ? app.profiles.filter((p) => session.anglerIds.includes(p.id)) : []);
  const catches = $derived(session ? sessionCatches(app, session.id) : []);
  const byId = $derived(Object.fromEntries(app.profiles.map((p) => [p.id, p])));
  const me = activeProfile();

  let adding = $state(false);
  let asking = $state(null);
  let big = $state(null);

  function saveCatch({ profileId, speciesId, photoId }) {
    // A catch on an earlier trip gets that day's date, at the current time of day.
    const at = new Date();
    const [y, m, d] = session.date.split('-').map(Number);
    at.setFullYear(y, m - 1, d);
    addCatch(app, profileId, speciesId, at, { sessionId: session.id, photoId });
    persist();
    adding = false;
  }

  function remove(c) {
    if (asking !== c.id) return (asking = c.id);
    asking = null;
    const gone = removeCatch(app, c.id);
    persist();
    if (gone?.photoId) deletePhoto(gone.photoId);
  }
</script>

{#if session}
  <section class="page">
    <a class="back" href="#/sessions">← {t('tripsTitle')}</a>

    {#if session.photoIds.length}
      <button class="cover" onclick={() => (big = session.photoIds[0])}><Photo id={session.photoIds[0]} /></button>
      {#if session.photoIds.length > 1}
        <div class="strip">
          {#each session.photoIds.slice(1) as pid (pid)}
            <button class="sthumb" onclick={() => (big = pid)}><Photo id={pid} /></button>
          {/each}
        </div>
      {/if}
    {/if}

    <div class="card head">
      <div class="title">
        <h1>{longDate(session.date)}</h1>
        <a class="ghost small" href="#/session-edit/{session.id}">✏️ {t('edit')}</a>
      </div>
      {#if session.place}
        <p class="place">
          📍 {session.place.name}
          {#if session.place.lat != null}· <a href={mapLink(session.place)} target="_blank" rel="noopener">{t('onMap')}</a>{/if}
        </p>
      {/if}
      <div class="anglers">
        {#each anglers as p (p.id)}<span class="who-pill on" style="--c:{p.color}"><span class="av">{p.avatar}</span>{p.name}</span>{/each}
      </div>
    </div>

    {#if session.rigs.length || session.baits.length || session.gearNote}
      <div class="card">
        <h2>🧰 {t('gearUsed')}</h2>
        <div class="chips">
          {#each session.rigs as r}{#if rigs[r]}<span class="chip">{tr(rigs[r].name)}</span>{/if}{/each}
          {#each session.baits as b}{#if baits[b]}<span class="chip">{baits[b].icon} {tr(baits[b])}</span>{/if}{/each}
        </div>
        {#if session.gearNote}<p class="note">{session.gearNote}</p>{/if}
      </div>
    {/if}

    {#if session.notes}
      <div class="card"><p class="note">{session.notes}</p></div>
    {/if}

    <h2 class="sect">🎣 {t('tripCatches')} {#if catches.length}<span class="muted">· {t('fishCount', { n: catches.length })}</span>{/if}</h2>
    <ul class="catches">
      {#each catches as c (c.id)}
        {@const fish = speciesById[c.speciesId]}
        {@const who = byId[c.profileId]}
        <li class="card crow">
          <a class="cimg" href="#/fish/{c.speciesId}">
            {#if c.photoId}<Photo id={c.photoId} />{:else if fish}<FishArt art={fish.art} id="tc-{c.id}" />{/if}
          </a>
          <div class="cinfo">
            <strong>{fish ? tr(fish.name) : c.speciesId}</strong>
            <span class="muted">{who?.avatar} {who?.name} · {time(c.at)}</span>
          </div>
          <button class="ghost del" class:danger={asking === c.id} onclick={() => remove(c)} aria-label={t('remove')}>
            {asking === c.id ? t('confirmShort') : '🗑️'}
          </button>
        </li>
      {/each}
    </ul>

    {#if adding}
      <CatchPicker anglerIds={session.anglerIds} defaultAngler={me?.id} onsave={saveCatch} oncancel={() => (adding = false)} />
    {:else if session.anglerIds.length}
      <button class="primary wide" onclick={() => (adding = true)}>＋ {t('addCatch')}</button>
    {/if}
  </section>

  {#if big}
    <button class="lightbox" onclick={() => (big = null)} aria-label={t('back')}><Photo id={big} /></button>
  {/if}
{/if}

<style>
  .back {
    display: inline-block;
    margin-bottom: 0.5rem;
    text-decoration: none;
    font-weight: 600;
  }
  .cover {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    border: none;
    padding: 0;
    border-radius: 22px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .strip {
    display: flex;
    gap: 0.4rem;
    overflow-x: auto;
    margin-bottom: 0.75rem;
  }
  .sthumb {
    flex: none;
    width: 76px;
    height: 76px;
    border: none;
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 0.5rem;
  }
  .title h1 {
    margin: 0;
    font-size: 1.4rem;
  }
  .small {
    flex: none;
    padding: 0.35rem 0.7rem;
    font-size: 0.9rem;
    text-decoration: none;
    color: var(--ink);
  }
  .place {
    margin: 0.4rem 0;
  }
  .anglers {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }
  .av {
    font-size: 1.3rem;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .note {
    white-space: pre-wrap;
    margin: 0.5rem 0 0;
  }
  .card > .note:first-child {
    margin: 0;
  }
  .sect {
    margin: 1.2rem 0 0.6rem;
  }
  .catches {
    list-style: none;
    padding: 0;
    margin: 0 0 0.75rem;
  }
  .crow {
    display: grid;
    grid-template-columns: 76px 1fr auto;
    gap: 0.7rem;
    align-items: center;
    padding: 0.5rem 0.7rem 0.5rem 0.5rem;
  }
  .cimg {
    width: 76px;
    height: 58px;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    place-items: center;
  }
  .cinfo {
    display: grid;
    min-width: 0;
  }
  .cinfo .muted {
    font-size: 0.9rem;
  }
  .del {
    min-width: 3rem;
    padding: 0.5rem 0.7rem;
  }
  .danger {
    border-color: var(--warn);
    color: var(--warn);
    font-size: 0.9rem;
  }
  .wide {
    width: 100%;
    font-size: 1.15rem;
    padding: 0.9rem;
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 30;
    border: none;
    padding: 0;
    background: #000;
  }
  .lightbox :global(img) {
    object-fit: contain;
  }
</style>
