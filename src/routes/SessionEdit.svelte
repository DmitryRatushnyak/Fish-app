<script>
  import { app, persist, activeProfile, go } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { rigs, baits } from '../data/gear.js';
  import { addSession, updateSession, removeSession, knownPlaces, today } from '../lib/model.js';
  import { savePhoto, deletePhoto } from '../lib/photos.js';
  import { here, placeName } from '../lib/place.js';
  import Photo from '../components/Photo.svelte';

  let { id } = $props();
  const existing = app.sessions.find((s) => s.id === id);
  const me = activeProfile();

  let date = $state(existing?.date ?? today());
  let placeText = $state(existing?.place?.name ?? '');
  let coords = $state(existing?.place?.lat != null ? { lat: existing.place.lat, lng: existing.place.lng } : null);
  let anglerIds = $state(existing ? [...existing.anglerIds] : me ? [me.id] : []);
  let pickedRigs = $state(existing ? [...existing.rigs] : []);
  let pickedBaits = $state(existing ? [...existing.baits] : []);
  let gearNote = $state(existing?.gearNote ?? '');
  let notes = $state(existing?.notes ?? '');
  let photoIds = $state(existing ? [...existing.photoIds] : []);
  let gps = $state('idle');
  let busy = $state(false);
  let error = $state('');
  let asking = $state(false);
  // Photos added in this form and then dropped again, or added and never saved.
  const addedHere = new Set();
  const droppedHere = new Set();

  const places = knownPlaces(app).filter((p) => p.name !== placeText).slice(0, 5);

  const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  async function locate() {
    gps = 'busy';
    try {
      coords = await here();
      const name = await placeName(coords, app.settings.lang);
      if (name) placeText = name;
      gps = 'idle';
    } catch {
      gps = 'failed';
    }
  }

  function pickPlace(p) {
    placeText = p.name;
    coords = p.lat != null ? { lat: p.lat, lng: p.lng } : null;
  }

  async function addPhotos(e) {
    busy = true;
    for (const file of e.currentTarget.files) {
      const pid = await savePhoto(file);
      addedHere.add(pid);
      photoIds = [...photoIds, pid];
    }
    e.currentTarget.value = '';
    busy = false;
  }

  function dropPhoto(pid) {
    photoIds = photoIds.filter((p) => p !== pid);
    droppedHere.add(pid);
  }

  function save(e) {
    e.preventDefault();
    if (!anglerIds.length) {
      error = t('pickSomeone');
      return;
    }
    const place = placeText.trim() ? { name: placeText.trim(), ...(coords ?? {}) } : null;
    const fields = { date, place, anglerIds, rigs: pickedRigs, baits: pickedBaits, gearNote: gearNote.trim(), notes: notes.trim(), photoIds };
    const saved = existing ? updateSession(app, existing.id, fields) : addSession(app, fields);
    persist();
    for (const pid of droppedHere) deletePhoto(pid);
    go(`/session/${saved.id}`);
  }

  function cancel() {
    for (const pid of addedHere) deletePhoto(pid);
    history.back();
  }

  function remove() {
    if (!asking) return (asking = true);
    removeSession(app, existing.id);
    persist();
    for (const pid of existing.photoIds) deletePhoto(pid);
    go('/sessions');
  }
</script>

<section class="page">
  <h1>{existing ? t('editTrip') : t('newTrip')}</h1>

  <form class="form" onsubmit={save}>
    <div class="card">
      <h2>{t('whoFished')}</h2>
      <div class="people">
        {#each app.profiles as p (p.id)}
          <button type="button" class="person" class:on={anglerIds.includes(p.id)} style="--c:{p.color}" onclick={() => (anglerIds = toggle(anglerIds, p.id))}>
            <span class="av">{p.avatar}</span>
            <span>{p.name}</span>
          </button>
        {/each}
      </div>
      {#if error}<p class="err">{error}</p>{/if}
    </div>

    <div class="card">
      <label>
        <h2>{t('date')}</h2>
        <input type="date" bind:value={date} required max={today()} />
      </label>
      <label>
        <h2>{t('place')}</h2>
        <input bind:value={placeText} placeholder={t('placeHint')} maxlength="80" />
      </label>
      <div class="chips">
        <button type="button" class="chip btn" onclick={locate} disabled={gps === 'busy'}>{gps === 'busy' ? t('gpsBusy') : t('useGps')}</button>
        {#each places as p}<button type="button" class="chip btn" onclick={() => pickPlace(p)}>{p.name}</button>{/each}
      </div>
      {#if gps === 'failed'}<p class="muted small">{t('gpsFailed')}</p>{/if}
    </div>

    <div class="card">
      <h2>{t('photos')}</h2>
      <div class="photos">
        {#each photoIds as pid (pid)}
          <div class="thumb">
            <Photo id={pid} />
            <button type="button" class="x" onclick={() => dropPhoto(pid)} aria-label={t('remove')}>✕</button>
          </div>
        {/each}
        <label class="thumb add" class:busy>
          <input type="file" accept="image/*" multiple onchange={addPhotos} hidden />
          <span>{busy ? '…' : '📷'}</span>
          <small>{t('addPhoto')}</small>
        </label>
      </div>
    </div>

    <div class="card">
      <h2>{t('rigUsed')}</h2>
      <div class="chips">
        {#each Object.entries(rigs) as [key, rig]}
          <button type="button" class="chip btn" class:on={pickedRigs.includes(key)} onclick={() => (pickedRigs = toggle(pickedRigs, key))}>{tr(rig.name)}</button>
        {/each}
      </div>
      <h2>{t('baitUsed')}</h2>
      <div class="chips">
        {#each Object.entries(baits) as [key, bait]}
          <button type="button" class="chip btn" class:on={pickedBaits.includes(key)} onclick={() => (pickedBaits = toggle(pickedBaits, key))}>{bait.icon} {tr(bait)}</button>
        {/each}
      </div>
      <label>
        <h2>{t('gearNote')}</h2>
        <input bind:value={gearNote} maxlength="120" />
      </label>
    </div>

    <div class="card">
      <label>
        <h2>{t('notes')}</h2>
        <textarea bind:value={notes} rows="3" maxlength="1000" placeholder={t('notesHint')}></textarea>
      </label>
    </div>

    <div class="actions">
      <button type="button" class="ghost" onclick={cancel}>{t('cancel')}</button>
      <button class="primary" disabled={busy}>{t('save')}</button>
    </div>

    {#if existing}
      <div class="danger-zone">
        <button type="button" class="ghost danger" onclick={remove}>{asking ? t('confirmShort') : t('deleteTrip')}</button>
        {#if asking}<p class="muted small">{t('deleteTripNote')}</p>{/if}
      </div>
    {/if}
  </form>
</section>

<style>
  label {
    display: block;
  }
  label + label,
  .chips + h2 {
    margin-top: 0.8rem;
  }
  .people {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .person {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 3px solid var(--line);
    background: var(--card);
    border-radius: 999px;
    padding: 0.3rem 0.9rem 0.3rem 0.4rem;
    font-weight: 700;
  }
  .person.on {
    border-color: var(--c);
    background: color-mix(in srgb, var(--c) 14%, var(--card));
  }
  .av {
    font-size: 1.6rem;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }
  .photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .thumb {
    position: relative;
    aspect-ratio: 1;
    border-radius: 14px;
    overflow: hidden;
  }
  .thumb.add {
    display: grid;
    place-content: center;
    justify-items: center;
    border: 2px dashed var(--line);
    color: var(--muted);
    cursor: pointer;
    text-align: center;
  }
  .thumb.add span {
    font-size: 1.8rem;
  }
  .x {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
  }
  .actions {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.6rem;
  }
  .danger-zone {
    margin-top: 1.5rem;
    text-align: center;
  }
  .danger {
    border-color: var(--warn);
    color: var(--warn);
  }
  .err {
    color: var(--warn);
    font-weight: 600;
    margin: 0.5rem 0 0;
  }
  .small {
    font-size: 0.9rem;
  }
</style>
