<script>
  import { t, tr } from '../lib/i18n.js';
  import { closedSeasons, generalRules, rulesSources, isInSeason } from '../data/rules.js';
  import { app } from '../lib/app.svelte.js';

  const year = new Date().getFullYear();
  const fmt = (d) => d.toLocaleDateString(app.settings.lang === 'en' ? 'en-GB' : 'nl-NL', { day: 'numeric', month: 'long' });
</script>

<section class="page">
  <h1>{t('rulesTitle')}</h1>

  <div class="card">
    <h2>{t('closedSeasons', { year })}</h2>
    <ul class="seasons">
      {#each Object.entries(closedSeasons) as [id, s]}
        {@const [from, to] = s.range(year)}
        <li class:active={isInSeason(id)}>
          <strong>{tr(s.name)}</strong>
          <span>{fmt(from)} – {fmt(to)}</span>
        </li>
      {/each}
    </ul>
  </div>

  {#each generalRules as r}
    <div class="card">
      <h2>{tr(r.title)}</h2>
      <p>{tr(r.text)}</p>
    </div>
  {/each}

  <p class="muted">{t('rulesNote')}</p>
  <h2>{t('sources')}</h2>
  <ul class="sources">
    {#each rulesSources as s}<li><a href={s.url} target="_blank" rel="noopener">{s.label}</a></li>{/each}
  </ul>
</section>

<style>
  .seasons {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.6rem;
  }
  .seasons li {
    display: grid;
    padding: 0.5rem 0.7rem;
    border-radius: 12px;
    background: var(--bg);
  }
  .seasons li.active {
    background: var(--warn-soft);
    border-left: 5px solid var(--warn);
  }
  .sources {
    padding-left: 1.2rem;
    font-size: 0.9rem;
  }
</style>
