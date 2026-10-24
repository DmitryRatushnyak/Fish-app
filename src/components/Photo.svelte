<script>
  import { photoUrl } from '../lib/photos.js';

  let { id, alt = '', class: cls = '' } = $props();
  let src = $state(null);

  $effect(() => {
    let live = true;
    src = null;
    if (id) photoUrl(id).then((u) => live && (src = u));
    return () => (live = false);
  });
</script>

{#if src}
  <img {src} {alt} class={cls} loading="lazy" />
{:else}
  <span class="ph {cls}" aria-hidden="true">📷</span>
{/if}

<style>
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ph {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background: var(--card-dim);
    font-size: 1.6rem;
    opacity: 0.6;
  }
</style>
