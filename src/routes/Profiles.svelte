<script>
  import { app, persist, go } from '../lib/app.svelte.js';
  import { t } from '../lib/i18n.js';
  import { addProfile, avatars, colors } from '../lib/model.js';

  let adding = $state(app.profiles.length === 0);
  let name = $state('');
  let kind = $state('child');
  let avatar = $state('👦');
  let color = $state(colors[1]);

  function pick(profile) {
    app.settings.activeProfileId = profile.id;
    persist();
    go('/');
  }

  function save(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const p = addProfile(app, { name, kind, avatar, color });
    persist();
    name = '';
    adding = false;
    pick(p);
  }
</script>

<section class="page">
  <h1 class="center">{t('whoIsFishing')}</h1>
  {#if app.profiles.length === 0}<p class="center muted">{t('welcome')}</p>{/if}

  <div class="who">
    {#each app.profiles as p (p.id)}
      <button class="person" style="--c:{p.color}" onclick={() => pick(p)}>
        <span class="avatar">{p.avatar}</span>
        <span class="pname">{p.name}</span>
      </button>
    {/each}
    {#if !adding}
      <button class="person add" onclick={() => (adding = true)}>
        <span class="avatar">＋</span>
        <span class="pname">{t('addProfile')}</span>
      </button>
    {/if}
  </div>

  {#if adding}
    <form class="card form" onsubmit={save}>
      <label>
        <span>{t('name')}</span>
        <input bind:value={name} maxlength="20" autocomplete="off" required />
      </label>
      <div class="seg" role="radiogroup">
        <button type="button" class:on={kind === 'child'} onclick={() => { kind = 'child'; avatar = '👦'; }}>{t('child')}</button>
        <button type="button" class:on={kind === 'adult'} onclick={() => { kind = 'adult'; avatar = '🧔'; }}>{t('adult')}</button>
      </div>
      <div class="pickrow">
        {#each avatars as a}
          <button type="button" class="pick" class:on={avatar === a} onclick={() => (avatar = a)}>{a}</button>
        {/each}
      </div>
      <div class="pickrow">
        {#each colors as c}
          <button type="button" class="dot" class:on={color === c} style="background:{c}" onclick={() => (color = c)} aria-label={c}></button>
        {/each}
      </div>
      <div class="actions">
        {#if app.profiles.length}<button type="button" class="ghost" onclick={() => (adding = false)}>{t('cancel')}</button>{/if}
        <button class="primary" type="submit">{t('save')}</button>
      </div>
    </form>
  {/if}
</section>

<style>
  .who {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .person {
    border: 3px solid var(--c, var(--line));
    background: var(--card);
    border-radius: 24px;
    padding: 1.2rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }
  .person.add {
    border-style: dashed;
    color: var(--muted);
  }
  .avatar {
    font-size: 3.4rem;
    line-height: 1;
  }
  .pname {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .form {
    display: grid;
    gap: 1rem;
  }
  label {
    display: grid;
    gap: 0.3rem;
    font-weight: 600;
  }
  input {
    font: inherit;
    padding: 0.7rem;
    border-radius: 12px;
    border: 2px solid var(--line);
    background: var(--bg);
    color: var(--ink);
  }
  .pickrow {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .pick {
    font-size: 1.8rem;
    background: none;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0.2rem;
  }
  .pick.on {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .dot {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 3px solid transparent;
  }
  .dot.on {
    border-color: var(--ink);
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
  }
</style>
