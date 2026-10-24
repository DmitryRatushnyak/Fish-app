<script>
  import { app, persist, go } from '../lib/app.svelte.js';
  import { t } from '../lib/i18n.js';
  import { removeProfile } from '../lib/model.js';

  function setLang(lang) {
    app.settings.lang = lang;
    document.documentElement.lang = lang;
    persist();
  }

  function remove(p) {
    if (!confirm(`${p.name}: ${t('confirmRemove')}`)) return;
    removeProfile(app, p.id);
    persist();
    if (!app.settings.activeProfileId) go('/profiles');
  }
</script>

<section class="page">
  <h1>{t('settings')}</h1>

  <div class="card">
    <h2>{t('language')}</h2>
    <div class="seg">
      <button class:on={app.settings.lang === 'nl'} onclick={() => setLang('nl')}>Nederlands</button>
      <button class:on={app.settings.lang === 'en'} onclick={() => setLang('en')}>English</button>
    </div>
  </div>

  <div class="card">
    <h2>{t('switchProfile')}</h2>
    <ul class="people">
      {#each app.profiles as p (p.id)}
        <li>
          <span class="who"><span class="av">{p.avatar}</span> {p.name} <span class="muted">· {t(p.kind)}</span></span>
          <button class="ghost small" onclick={() => remove(p)}>{t('remove')}</button>
        </li>
      {/each}
    </ul>
    <a class="primary as-button" href="#/profiles">{t('switchProfile')}</a>
  </div>
</section>

<style>
  .people {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    display: grid;
    gap: 0.5rem;
  }
  .people li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .av {
    font-size: 1.6rem;
  }
  .small {
    padding: 0.35rem 0.7rem;
    font-size: 0.9rem;
  }
</style>
