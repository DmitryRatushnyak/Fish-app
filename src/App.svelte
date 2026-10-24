<script>
  import { app, route, activeProfile, go } from './lib/app.svelte.js';
  import { t } from './lib/i18n.js';
  import Profiles from './routes/Profiles.svelte';
  import Now from './routes/Now.svelte';
  import Fish from './routes/Fish.svelte';
  import Book from './routes/Book.svelte';
  import Gear from './routes/Gear.svelte';
  import Rules from './routes/Rules.svelte';
  import Settings from './routes/Settings.svelte';
  import Sessions from './routes/Sessions.svelte';
  import Session from './routes/Session.svelte';
  import SessionEdit from './routes/SessionEdit.svelte';

  const profile = $derived(activeProfile());
  const kid = $derived(profile?.kind === 'child');

  // Without a chosen angler, always start on the profile picker.
  $effect(() => {
    if (!profile && route.path !== '/profiles') go('/profiles');
  });

  const tabs = [
    { path: '/', icon: '🎣', label: 'navNow' },
    { path: '/book', icon: '📖', label: 'navBook' },
    { path: '/sessions', icon: '🛶', label: 'navTrips', also: ['/session', '/session-edit'] },
    { path: '/gear', icon: '🧰', label: 'navGear' },
    { path: '/rules', icon: '📋', label: 'navRules' }
  ];
</script>

<div class="shell" class:kid style="--me:{profile?.color ?? 'var(--accent)'}">
  {#if profile && route.path !== '/profiles'}
    <header class="top">
      <span class="brand">🐟 {t('appName')}</span>
      <a class="me" href="#/settings" aria-label={t('settings')}>
        <span class="av">{profile.avatar}</span>
        <span>{profile.name}</span>
      </a>
    </header>
  {/if}

  <main>
    {#if route.path === '/profiles' || !profile}
      <Profiles />
    {:else if route.path === '/fish'}
      {#key route.params.id}<Fish id={route.params.id} {kid} />{/key}
    {:else if route.path === '/sessions'}
      <Sessions {kid} />
    {:else if route.path === '/session'}
      {#key route.params.id}<Session id={route.params.id} />{/key}
    {:else if route.path === '/session-edit'}
      {#key route.params.id}<SessionEdit id={route.params.id} />{/key}
    {:else if route.path === '/book'}
      <Book />
    {:else if route.path === '/gear'}
      <Gear {kid} />
    {:else if route.path === '/rules'}
      <Rules />
    {:else if route.path === '/settings'}
      <Settings />
    {:else}
      <Now {kid} />
    {/if}
  </main>

  {#if profile && route.path !== '/profiles'}
    <nav class="tabs">
      {#each tabs as tab}
        <a href="#{tab.path}" class:on={route.path === tab.path || tab.also?.includes(route.path) || (tab.path === '/' && route.path === '/fish')}>
          <span class="ti">{tab.icon}</span>
          <span>{t(tab.label)}</span>
        </a>
      {/each}
    </nav>
  {/if}
</div>

<style>
  .shell {
    min-height: 100dvh;
    max-width: 560px;
    margin: 0 auto;
    padding-bottom: calc(76px + env(safe-area-inset-bottom));
  }
  .top {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(0.6rem + env(safe-area-inset-top)) 1rem 0.6rem;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .brand {
    font-weight: 800;
    font-size: 1.15rem;
    color: var(--accent);
  }
  .me {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    color: var(--ink);
    font-weight: 700;
    border: 2px solid var(--me);
    border-radius: 999px;
    padding: 0.15rem 0.7rem 0.15rem 0.3rem;
  }
  .av {
    font-size: 1.4rem;
  }
  .tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background: var(--card);
    border-top: 1px solid var(--line);
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 10;
  }
  .tabs a {
    display: grid;
    justify-items: center;
    padding: 0.5rem 0 0.55rem;
    text-decoration: none;
    color: var(--muted);
    font-size: 0.8rem;
    font-weight: 600;
  }
  .tabs a.on {
    color: var(--accent);
  }
  .ti {
    font-size: 1.5rem;
  }
  .kid .tabs a {
    font-size: 0.95rem;
  }
  .kid .ti {
    font-size: 1.9rem;
  }
</style>
