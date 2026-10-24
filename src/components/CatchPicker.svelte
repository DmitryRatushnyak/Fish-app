<script>
  // Add a catch to a trip: who caught it, which fish, and optionally a photo.
  import { app } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { species } from '../data/species.js';
  import { savePhoto, deletePhoto } from '../lib/photos.js';
  import FishArt from './FishArt.svelte';
  import Photo from './Photo.svelte';

  let { anglerIds, defaultAngler, onsave, oncancel } = $props();

  const anglers = $derived(app.profiles.filter((p) => anglerIds.includes(p.id)));
  let who = $state(anglerIds.includes(defaultAngler) ? defaultAngler : anglerIds[0]);
  let fish = $state(null);
  let photoId = $state(null);
  let busy = $state(false);

  async function addPhoto(e) {
    const file = e.currentTarget.files[0];
    if (!file) return;
    busy = true;
    if (photoId) deletePhoto(photoId);
    photoId = await savePhoto(file);
    busy = false;
  }

  function cancel() {
    if (photoId) deletePhoto(photoId);
    oncancel();
  }
</script>

<div class="card picker">
  <h2>{t('catchPhoto')}</h2>
  <label class="shot" class:has={photoId}>
    <input type="file" accept="image/*" capture="environment" onchange={addPhoto} hidden />
    {#if photoId}
      <Photo id={photoId} />
    {:else}
      <span class="cam">{busy ? '…' : '📷'}</span>
      <small>{t('addPhoto')}</small>
    {/if}
  </label>

  {#if anglers.length > 1}
    <h2>{t('whoCaught')}</h2>
    <div class="people">
      {#each anglers as p (p.id)}
        <button type="button" class="person" class:on={who === p.id} style="--c:{p.color}" onclick={() => (who = p.id)}>
          <span class="av">{p.avatar}</span>{p.name}
        </button>
      {/each}
    </div>
  {/if}

  <h2>{t('whichFish')}</h2>
  <div class="fishgrid">
    {#each species as s (s.id)}
      <button type="button" class="fishpick" class:on={fish === s.id} onclick={() => (fish = s.id)}>
        <FishArt art={s.art} id="pick-{s.id}" />
        <span>{tr(s.name)}</span>
      </button>
    {/each}
  </div>

  <div class="actions">
    <button type="button" class="ghost" onclick={cancel}>{t('cancel')}</button>
    <button type="button" class="primary" disabled={!fish || !who || busy} onclick={() => onsave({ profileId: who, speciesId: fish, photoId })}>
      🎣 {t('save')}
    </button>
  </div>
</div>

<style>
  .picker h2 {
    margin-top: 0.8rem;
  }
  .picker h2:first-child {
    margin-top: 0;
  }
  .shot {
    display: grid;
    place-content: center;
    justify-items: center;
    height: 160px;
    border: 2px dashed var(--line);
    border-radius: 16px;
    color: var(--muted);
    overflow: hidden;
    cursor: pointer;
  }
  .shot.has {
    display: block;
    border: none;
  }
  .cam {
    font-size: 2.2rem;
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
    font-size: 1.5rem;
  }
  .fishgrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
    max-height: 340px;
    overflow-y: auto;
    padding: 2px;
  }
  .fishpick {
    display: grid;
    justify-items: center;
    gap: 0.1rem;
    background: var(--card-dim);
    border: 3px solid transparent;
    border-radius: 14px;
    padding: 0.4rem 0.2rem;
    font-size: 0.85rem;
    font-weight: 700;
  }
  .fishpick.on {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .actions {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.6rem;
    margin-top: 1rem;
  }
</style>
