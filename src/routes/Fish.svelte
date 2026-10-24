<script>
  import { app, persist, activeProfile } from '../lib/app.svelte.js';
  import { t, tr } from '../lib/i18n.js';
  import { speciesById } from '../data/species.js';
  import { rigs, baits } from '../data/gear.js';
  import { closedSeasons, warningsFor } from '../data/rules.js';
  import { addCatch, catchCount, catchesOf, removeCatch, openSessionFor } from '../lib/model.js';
  import FishArt from '../components/FishArt.svelte';
  import Stars from '../components/Stars.svelte';
  import Speak from '../components/Speak.svelte';
  import RigArt from '../components/RigArt.svelte';

  let { id, kid } = $props();
  const fish = $derived(speciesById[id]);
  const profile = $derived(activeProfile());
  const count = $derived(profile && fish ? catchCount(app, profile.id, fish.id) : 0);
  const warnings = $derived(fish ? warningsFor(fish, new Date()) : []);
  const rig = $derived(fish ? rigs[fish.rig] : null);
  const thisMonth = new Date().getMonth();
  let celebrate = $state(false);
  let addedTo = $state(null);

  function caught() {
    if (!profile) return;
    const first = count === 0;
    const trip = openSessionFor(app, profile.id);
    addCatch(app, profile.id, fish.id, new Date(), { sessionId: trip?.id ?? null });
    addedTo = trip;
    persist();
    if (first) {
      celebrate = true;
      setTimeout(() => (celebrate = false), 2600);
    }
  }

  function undo() {
    const last = catchesOf(app, profile.id).find((c) => c.speciesId === fish.id);
    if (last) removeCatch(app, last.id);
    persist();
  }

  function warningText(w) {
    if (w.type === 'closed') return t('warnClosed', { season: tr(closedSeasons[w.season].name) });
    if (w.type === 'lureBan') return t('warnLureBan');
    if (w.type === 'release') return t('warnRelease');
    if (w.type === 'minSize') return t('warnMinSize', { cm: w.cm });
  }
</script>

{#if fish}
  <section class="page">
    <a class="back" href="#/">← {t('back')}</a>
    <div class="hero card">
      <FishArt art={fish.art} id={fish.id} />
      <h1>{tr(fish.name)}</h1>
      {#if !kid}<p class="latin">{fish.latin}</p>{/if}
    </div>

    <div class="card story">
      <p class="fact">{tr(fish.fact)}</p>
      <p>{tr(fish.tip)}</p>
      <Speak big text="{tr(fish.name)}. {tr(fish.fact)} {tr(fish.tip)}" />
    </div>

    {#if warnings.length}
      <ul class="warnings">
        {#each warnings as w}<li class="badge {w.type === 'closed' || w.type === 'lureBan' ? 'warn' : 'info'}">{warningText(w)}</li>{/each}
      </ul>
    {/if}

    {#if profile}
      <button class="primary catch" onclick={caught} disabled={warnings.some((w) => w.type === 'closed')}>
        🎣 {t('iCaughtIt')}
      </button>
      {#if count > 0}
        <p class="center muted">
          {t('caughtTimes', { n: count })} · <button class="link" onclick={undo}>{t('undoCatch')}</button>
        </p>
        {#if addedTo}<p class="center"><a href="#/session/{addedTo.id}">🛶 {t('addedToTrip')}</a></p>{/if}
      {/if}
    {/if}

    <div class="grid">
      <div class="card stat">
        <span class="label">{t('size')}</span>
        <span class="value">{fish.sizeCm[0]} cm</span>
        <span class="muted">{t('upTo', { n: fish.sizeCm[1] })}</span>
      </div>
      <div class="card stat">
        <span class="label">{t('difficulty')}</span>
        <span class="value"><Stars n={fish.stars} /></span>
      </div>
    </div>

    <div class="card">
      <h2>{t('bestMonths')}</h2>
      <div class="months">
        {#each fish.months as m, i}
          <div class="mcol" class:now={i === thisMonth}>
            <div class="bar" style="height:{8 + m * 14}px" data-level={m}></div>
            <span>{t('months')[i].slice(0, 1)}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="card">
      <h2>{t('bestTime')}</h2>
      <div class="chips">{#each fish.times as time}<span class="chip">{t('times')[time]}</span>{/each}</div>
      <h2>{t('where')}</h2>
      <div class="chips">{#each fish.places as place}<span class="chip">{t('places')[place]}</span>{/each}</div>
      <h2>{t('bait')}</h2>
      <div class="chips">{#each fish.baits as b}<span class="chip">{baits[b].icon} {tr(baits[b])}</span>{/each}</div>
    </div>

    <div class="card howto">
      <h2>{t('howTo')}: {tr(rig.name)}</h2>
      <div class="rigrow">
        <RigArt rig={fish.rig} />
        <dl>
          <dt>{t('rod')}</dt><dd>{tr(rig.rod)}</dd>
          {#if !kid && fish.hook !== '-'}
            <dt>{t('hook')}</dt><dd>{fish.hook}</dd>
            <dt>{t('line')}</dt><dd>{fish.line}</dd>
          {/if}
        </dl>
      </div>
      <ol>{#each tr(rig.steps) as step}<li>{step}</li>{/each}</ol>
    </div>

    <div class="card">
      <h2>{t('rules')}</h2>
      {#if fish.rules.closed || fish.rules.release || fish.rules.minSizeCm}
        <ul>
          {#if fish.rules.closed}<li>{tr(closedSeasons[fish.rules.closed].name)}</li>{/if}
          {#if fish.rules.release}<li>{t('warnRelease')}</li>{/if}
          {#if fish.rules.minSizeCm}<li>{t('warnMinSize', { cm: fish.rules.minSizeCm })}</li>{/if}
        </ul>
      {:else}
        <p class="muted">{t('noSpecialRules')}</p>
      {/if}
      <a href="#/rules">{t('rulesTitle')} →</a>
    </div>
  </section>

  {#if celebrate}
    <div class="party" role="status">
      <div class="party-card">
        <div class="party-fish"><FishArt art={fish.art} id="party-{fish.id}" /></div>
        <strong>{t('newFish')}</strong>
      </div>
    </div>
  {/if}
{/if}

<style>
  .back {
    display: inline-block;
    margin-bottom: 0.5rem;
    text-decoration: none;
    font-weight: 600;
  }
  .hero {
    text-align: center;
    padding-top: 1.5rem;
  }
  .hero h1 {
    margin: 0.5rem 0 0;
  }
  .latin {
    font-style: italic;
    margin: 0.2rem 0 0;
    color: var(--muted);
  }
  .story .fact {
    font-size: 1.15rem;
    font-weight: 600;
  }
  .warnings {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.4rem;
  }
  .catch {
    width: 100%;
    font-size: 1.4rem;
    padding: 1rem;
    margin: 0.5rem 0;
  }
  .link {
    background: none;
    border: none;
    padding: 0;
    color: var(--accent);
    text-decoration: underline;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .stat {
    display: grid;
    gap: 0.2rem;
  }
  .label {
    font-size: 0.85rem;
    color: var(--muted);
    font-weight: 600;
  }
  .value {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .months {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 4px;
    align-items: end;
    height: 70px;
  }
  .mcol {
    display: grid;
    justify-items: center;
    align-content: end;
    gap: 3px;
    font-size: 0.75rem;
    color: var(--muted);
  }
  .mcol.now span {
    color: var(--ink);
    font-weight: 800;
  }
  .bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: var(--line);
  }
  .bar[data-level='2'] {
    background: var(--good-soft);
  }
  .bar[data-level='3'] {
    background: var(--good);
  }
  .mcol.now .bar {
    outline: 2px solid var(--ink);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.6rem;
  }
  .rigrow {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 0.8rem;
    align-items: start;
  }
  dl {
    margin: 0;
  }
  dt {
    font-size: 0.85rem;
    color: var(--muted);
    font-weight: 600;
  }
  dd {
    margin: 0 0 0.4rem;
  }
  ol {
    padding-left: 1.3rem;
  }
  ol li {
    margin-bottom: 0.3rem;
  }
  .party {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.35);
    z-index: 20;
    animation: fade 2.6s ease forwards;
  }
  .party-card {
    background: var(--card);
    border-radius: 28px;
    padding: 1.5rem;
    width: min(80vw, 320px);
    text-align: center;
    animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1);
  }
  .party-fish {
    animation: swim 1.2s ease-in-out infinite alternate;
  }
  .party-card strong {
    font-size: 1.3rem;
  }
  @keyframes pop {
    from { transform: scale(0.4); }
    to { transform: scale(1); }
  }
  @keyframes swim {
    from { transform: translateX(-8px) rotate(-3deg); }
    to { transform: translateX(8px) rotate(3deg); }
  }
  @keyframes fade {
    0%, 80% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
