<script>
  import { app } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { fishForNow } from '../lib/season.js';
  import FishArt from '../components/FishArt.svelte';
  import Stars from '../components/Stars.svelte';

  let { kid } = $props();
  const now = new Date();
  const list = fishForNow(now);
  const month = $derived(t('months')[now.getMonth()]);
</script>

<section class="page">
  <h1>{t('nowTitle')} <span class="month">{month}</span></h1>
  {#if !kid}<p class="muted">{t('nowIntro')}</p>{/if}

  <ul class="fishlist">
    {#each list as { fish, score, closed } (fish.id)}
      <li>
        <a class="card fishrow" class:closed href="#/fish/{fish.id}">
          <div class="art"><FishArt art={fish.art} id={fish.id} /></div>
          <div class="info">
            <strong>{tr(fish.name)}</strong>
            <div class="meter" aria-label="{score}/3">
              {#each [1, 2, 3] as i}<span class:on={i <= score}></span>{/each}
            </div>
            {#if closed}
              <span class="badge warn">{t('closedNow')}</span>
            {:else if !kid}
              <Stars n={fish.stars} label={t('difficulty')} />
            {/if}
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .month {
    color: var(--accent);
  }
  .fishlist {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: grid;
    gap: 0.75rem;
  }
  .fishrow {
    display: grid;
    grid-template-columns: 44% 1fr;
    gap: 0.8rem;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
  .fishrow.closed {
    opacity: 0.6;
  }
  .info {
    display: grid;
    gap: 0.35rem;
  }
  strong {
    font-size: 1.2rem;
  }
  .meter {
    display: flex;
    gap: 4px;
  }
  .meter span {
    width: 22px;
    height: 10px;
    border-radius: 5px;
    background: var(--line);
  }
  .meter span.on {
    background: var(--good);
  }
</style>
